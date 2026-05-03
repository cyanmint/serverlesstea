import { afterEach, describe, expect, it } from 'vitest'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import app from '../src/index'
import { createMockEnv } from './helpers/mock-env'

describe('CI user/repo and git flow', () => {
  const tempDirs: string[] = []

  afterEach(() => {
    for (const dir of tempDirs) {
      rmSync(dir, { recursive: true, force: true })
    }
    tempDirs.length = 0
  })

  it('creates account/repo, checks git endpoints, and runs clone/push/pull commands', async () => {
    const env = createMockEnv()

    const registerRes = await app.request('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'alice',
        email: 'alice@example.com',
        password: 'password123',
      }),
    }, env)
    expect(registerRes.status).toBe(201)
    const registerData = await registerRes.json() as { token: string }

    const createRepoRes = await app.request('/api/repos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${registerData.token}`,
      },
      body: JSON.stringify({
        name: 'demo',
        description: 'demo repository',
        is_private: false,
      }),
    }, env)
    expect(createRepoRes.status).toBe(201)

    const infoRefsRead = await app.request('/git/alice/demo.git/info/refs?service=git-upload-pack', {}, env)
    expect(infoRefsRead.status).toBe(200)
    const infoRefsWriteNoAuth = await app.request('/git/alice/demo.git/info/refs?service=git-receive-pack', {}, env)
    expect(infoRefsWriteNoAuth.status).toBe(401)

    const remoteDir = mkdtempSync(path.join(tmpdir(), 'serverlesstea-remote-'))
    const cloneDir = mkdtempSync(path.join(tmpdir(), 'serverlesstea-clone-'))
    tempDirs.push(remoteDir, cloneDir)

    const gitEnv = { ...process.env, GIT_TERMINAL_PROMPT: '0' }
    execFileSync('git', ['init', '--bare', remoteDir], { env: gitEnv })
    execFileSync('git', ['clone', remoteDir, cloneDir], { env: gitEnv })
    execFileSync('git', ['-C', cloneDir, 'config', 'user.email', 'alice@example.com'], { env: gitEnv })
    execFileSync('git', ['-C', cloneDir, 'config', 'user.name', 'alice'], { env: gitEnv })
    writeFileSync(path.join(cloneDir, 'README.md'), 'hello\n')
    execFileSync('git', ['-C', cloneDir, 'add', 'README.md'], { env: gitEnv })
    execFileSync('git', ['-C', cloneDir, 'commit', '-m', 'init'], { env: gitEnv })
    execFileSync('git', ['-C', cloneDir, 'push', 'origin', 'HEAD:main'], { env: gitEnv })
    execFileSync('git', ['-C', cloneDir, 'pull', '--ff-only', 'origin', 'main'], { env: gitEnv })
  })
})
