/**
 * Real git-over-HTTP integration test.
 *
 * Boots the Hono app on a local TCP port, then runs actual git push / clone
 * against it with GIT_TRACE_PACKET=1 so we can see every pkt-line exchanged
 * and pinpoint protocol bugs.
 */
import { createServer, IncomingMessage, ServerResponse } from 'node:http'
import { mkdtempSync, rmSync, writeFileSync, appendFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
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

// ── file-based log (vitest may swallow server-side console.log in worker threads) ──
const LOG_FILE = '/tmp/git-integration-test.log'
function log(msg: string) {
  const line = `${new Date().toISOString()} ${msg}\n`
  process.stdout.write(line)
  appendFileSync(LOG_FILE, line)
}

// ── HTTP bridge: Node HTTP → Hono fetch ───────────────────────────────────

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c: Buffer) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function honoHandler(req: IncomingMessage, res: ServerResponse): void {
  log(`→ ${req.method} ${req.url} [Expect: ${req.headers['expect'] ?? 'none'}]`)

  readBody(req).then(async (body) => {
    log(`  body ${body.length} bytes`)
    const url = `http://127.0.0.1${req.url}`
    const headers: Record<string, string> = {}
    for (let i = 0; i < req.rawHeaders.length; i += 2) {
      const name = req.rawHeaders[i].toLowerCase()
      // Suppress hop-by-hop headers that clash with the internal fetch call.
      if (name === 'transfer-encoding' || name === 'expect' || name === 'host') continue
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

    log(`  ← ${response.status} (${response.headers.get('content-type')})`)
    const respHeaders: Record<string, string> = {}
    response.headers.forEach((v, k) => { respHeaders[k] = v })
    res.writeHead(response.status, respHeaders)
    const buf = await response.arrayBuffer()
    log(`  ← body ${buf.byteLength} bytes`)
    res.end(Buffer.from(buf))
  }).catch((err) => {
    log(`Bridge error: ${err}`)
    if (!res.headersSent) res.writeHead(500)
    res.end(String(err))
  })
}

// ── server lifecycle ──────────────────────────────────────────────────────

let serverPort = 0
const httpServer = createServer(honoHandler)
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
  log(`\nTest server on http://127.0.0.1:${serverPort}`)
  httpServer.on('error', (e) => log(`Server error: ${e}`))
  // clear previous log
  writeFileSync(LOG_FILE, '')
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

/** Run git asynchronously so the HTTP server's event loop stays free. */
function runGit(args: string[], cwd: string, extraEnv: Record<string, string> = {}): Promise<{
  status: number; stdout: string; stderr: string; combined: string
}> {
  return new Promise((resolve) => {
    const child = spawn('git', args, {
      cwd,
      env: {
        ...process.env,
        GIT_TERMINAL_PROMPT: '0',
        GIT_TRACE: '1',
        GIT_TRACE_PACKET: '1',
        HOME: tmpdir(),
        ...extraEnv,
      },
    })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (d: Buffer) => { stdout += d.toString() })
    child.stderr.on('data', (d: Buffer) => { stderr += d.toString() })
    child.on('close', (code) => resolve({
      status: code ?? -1,
      stdout,
      stderr,
      combined: stdout + stderr,
    }))
    child.on('error', (err) => resolve({ status: -1, stdout, stderr, combined: stdout + stderr + String(err) }))
  })
}

// ── tests ─────────────────────────────────────────────────────────────────

describe('git smart-HTTP push + clone integration', () => {
  let workDir: string
  let authUrl: string

  beforeAll(() => {
    workDir = mktemp('work')
    authUrl = `http://alice:pass123@127.0.0.1:${serverPort}/git/alice/demo.git`
  })

  it('initialises a local repo and commits a file', async () => {
    await runGit(['init', '-b', 'main', workDir], tmpdir())
    await runGit(['config', 'user.email', 'alice@example.com'], workDir)
    await runGit(['config', 'user.name', 'alice'], workDir)
    writeFileSync(join(workDir, 'README.md'), 'hello\n')
    await runGit(['add', 'README.md'], workDir)
    const r = await runGit(['commit', '-m', 'init'], workDir)
    console.log('commit:', r.combined)
    expect(r.status).toBe(0)
  })

  it('pushes main to the server without sideband errors', async () => {
    await runGit(['remote', 'add', 'origin', authUrl], workDir)
    const r = await runGit(['push', '-v', 'origin', 'main'], workDir)
    const logContent = (() => { try { return require('node:fs').readFileSync(LOG_FILE, 'utf8') } catch { return '(no log)' } })()
    console.log('\n── server log ──\n', logContent)
    console.log('\n── git push output ──\n', r.combined)
    expect(r.status, `push failed:\n${r.combined}`).toBe(0)
  })

  it('clones the pushed repo without pack-header errors', async () => {
    const cloneDir = mktemp('clone')
    const r = await runGit(['clone', '-v', authUrl, join(cloneDir, 'repo')], tmpdir())
    const logContent = (() => { try { return require('node:fs').readFileSync(LOG_FILE, 'utf8') } catch { return '(no log)' } })()
    console.log('\n── server log ──\n', logContent)
    console.log('\n── git clone output ──\n', r.combined)
    expect(r.status, `clone failed:\n${r.combined}`).toBe(0)
  })
})
