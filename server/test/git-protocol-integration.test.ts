/**
 * Real git-over-HTTP integration test.
 *
 * Boots the Hono app on a local TCP port, then runs actual git push / clone
 * against it with GIT_TRACE_PACKET=1 so we can see every pkt-line exchanged
 * and pinpoint protocol bugs.
 */
import { createServer, IncomingMessage, ServerResponse } from 'node:http'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import app from '../src/index'
import { MockD1, MockR2Bucket } from './helpers/mock-env'
import { hashPassword } from '../src/auth/password'

// ── mock env ──────────────────────────────────────────────────────────────

const db = new MockD1()
const bucket = new MockR2Bucket()

const mockEnv = {
  database: db as unknown as D1Database,
  bucket: bucket as unknown as R2Bucket,
  JWT_SECRET: 'test-secret',
}

// ── HTTP bridge: Node HTTP → Hono fetch ───────────────────────────────────

async function honoHandler(req: IncomingMessage, res: ServerResponse) {
  console.log(`→ ${req.method} ${req.url}`)
  // Collect body bytes (handles both normal and "Expect: 100-continue" flows)
  const body: Buffer = await new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c: Buffer) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
  console.log(`  body ${body.length} bytes`)

  const url = `http://127.0.0.1${req.url}`
  const headers: Record<string, string> = {}
  for (let i = 0; i < req.rawHeaders.length; i += 2) {
    const name = req.rawHeaders[i].toLowerCase()
    // Drop transfer-encoding / content-length; fetch API manages these internally
    if (name === 'transfer-encoding' || name === 'expect') continue
    headers[name] = req.rawHeaders[i + 1]
  }

  const request = new Request(url, {
    method: req.method ?? 'GET',
    headers,
    ...(body.length ? { body } : {}),
  } as RequestInit)

  let response: Response
  try {
    response = await app.fetch(request, mockEnv)
  } catch (e) {
    console.error('  App error:', e)
    res.writeHead(500)
    res.end(String(e))
    return
  }

  console.log(`  ← ${response.status} (${response.headers.get('content-type')})`)
  const respHeaders: Record<string, string> = {}
  response.headers.forEach((v, k) => { respHeaders[k] = v })
  res.writeHead(response.status, respHeaders)
  const buf = await response.arrayBuffer()
  console.log(`  ← body ${buf.byteLength} bytes`)
  res.end(Buffer.from(buf))
}

// ── server lifecycle ──────────────────────────────────────────────────────

let serverPort = 0
const httpServer = createServer(honoHandler)
httpServer.on('checkContinue', (req, res) => {
  res.writeContinue()
  honoHandler(req, res)
})
const tempDirs: string[] = []

beforeAll(async () => {
  // Seed a user + repo
  const aliceId = crypto.randomUUID()
  db.users.push({
    id: aliceId,
    username: 'alice',
    email: 'alice@example.com',
    password_hash: await hashPassword('pass123'),
    display_name: null,
    bio: null,
    is_admin: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })
  db.repos.push({
    id: crypto.randomUUID(),
    owner_id: aliceId,
    name: 'demo',
    description: null,
    is_private: 0,
    default_branch: 'main',
    created_at: new Date().toISOString(),
  })

  await new Promise<void>((resolve) => httpServer.listen(0, '127.0.0.1', resolve))
  serverPort = (httpServer.address() as { port: number }).port
  console.log(`\nTest server on http://127.0.0.1:${serverPort}`)
})

afterAll(() => {
  httpServer.close()
  for (const d of tempDirs) rmSync(d, { recursive: true, force: true })
})

// ── helpers ───────────────────────────────────────────────────────────────

function mktemp(label: string) {
  const dir = mkdtempSync(join(tmpdir(), `st-${label}-`))
  tempDirs.push(dir)
  return dir
}

function runGit(args: string[], cwd: string, extraEnv: Record<string, string> = {}) {
  const result = spawnSync('git', args, {
    cwd,
    env: {
      ...process.env,
      GIT_TERMINAL_PROMPT: '0',
      GIT_TRACE: '1',
      GIT_TRACE_PACKET: '1',
      HOME: tmpdir(),
      ...extraEnv,
    },
    encoding: 'utf8',
    timeout: 30_000,
  })
  return {
    status: result.status ?? -1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    combined: (result.stdout ?? '') + (result.stderr ?? ''),
  }
}

// ── tests ─────────────────────────────────────────────────────────────────

describe('git smart-HTTP push + clone integration', () => {
  let workDir: string
  let authUrl: string

  beforeAll(() => {
    workDir = mktemp('work')
    authUrl = `http://alice:pass123@127.0.0.1:${serverPort}/git/alice/demo.git`
  })

  it('initialises a local repo and commits a file', () => {
    runGit(['init', '-b', 'main', workDir], tmpdir())
    runGit(['config', 'user.email', 'alice@example.com'], workDir)
    runGit(['config', 'user.name', 'alice'], workDir)
    writeFileSync(join(workDir, 'README.md'), 'hello\n')
    runGit(['add', 'README.md'], workDir)
    const r = runGit(['commit', '-m', 'init'], workDir)
    console.log('commit:', r.combined)
    expect(r.status).toBe(0)
  })

  it('pushes main to the server without sideband errors', () => {
    runGit(['remote', 'add', 'origin', authUrl], workDir)
    const r = runGit(['push', '-v', 'origin', 'main'], workDir)
    console.log('\n── git push output ──\n', r.combined)
    expect(r.status, `push failed:\n${r.combined}`).toBe(0)
  })

  it('clones the pushed repo without pack-header errors', () => {
    const cloneDir = mktemp('clone')
    const r = runGit(['clone', '-v', authUrl, join(cloneDir, 'repo')], tmpdir())
    console.log('\n── git clone output ──\n', r.combined)
    expect(r.status, `clone failed:\n${r.combined}`).toBe(0)
  })
})
