import { beforeEach, describe, expect, it } from 'vitest'
import { hashPassword } from '../src/auth/password'
import app from '../src/index'

type User = { id: string; username: string; password_hash: string }
type Repo = { id: string; owner_id: string; name: string; is_private: number }

class MockR2ObjectBody {
  constructor(private value: string | Uint8Array) {}
  async text() {
    return typeof this.value === 'string' ? this.value : new TextDecoder().decode(this.value)
  }
  async arrayBuffer() {
    return typeof this.value === 'string' ? new TextEncoder().encode(this.value).buffer : this.value.buffer
  }
}

class MockR2Bucket {
  private store = new Map<string, string | Uint8Array>()

  async get(key: string) {
    const value = this.store.get(key)
    if (!value) return null
    return new MockR2ObjectBody(value)
  }

  async put(key: string, value: string | ArrayBuffer | Uint8Array) {
    if (typeof value === 'string') {
      this.store.set(key, value)
      return
    }
    const bytes = value instanceof Uint8Array ? value : new Uint8Array(value)
    this.store.set(key, bytes)
  }

  async list({ prefix }: { prefix: string }) {
    const objects = Array.from(this.store.keys())
      .filter((k) => k.startsWith(prefix))
      .map((key) => ({ key }))
    return { objects }
  }
}

class MockD1 {
  users: User[] = []
  repos: Repo[] = []
  collaborators: Array<{ repo_id: string; user_id: string; role: string }> = []

  prepare(sql: string) {
    return new MockStatement(this, sql)
  }
}

class MockStatement {
  private args: unknown[] = []
  private normalizedSql: string

  constructor(
    private db: MockD1,
    sql: string
  ) {
    this.normalizedSql = sql.replace(/\s+/g, ' ').trim()
  }

  bind(...args: unknown[]) {
    this.args = args
    return this
  }

  async first<T>() {
    const sql = this.normalizedSql

    if (sql.includes('SELECT r.id, r.owner_id, r.is_private') && sql.includes('WHERE u.username = ? AND r.name = ?')) {
      const [owner, repoName] = this.args as [string, string]
      const user = this.db.users.find((u) => u.username === owner)
      if (!user) return null
      const repo = this.db.repos.find((r) => r.owner_id === user.id && r.name === repoName)
      if (!repo) return null
      return { id: repo.id, owner_id: repo.owner_id, is_private: repo.is_private } as T
    }

    if (sql.startsWith('SELECT id, username, password_hash FROM users WHERE username = ?')) {
      const [username] = this.args as [string]
      const user = this.db.users.find((u) => u.username === username)
      if (!user) return null
      return { id: user.id, username: user.username, password_hash: user.password_hash } as T
    }

    if (sql.startsWith('SELECT role FROM repo_collaborators WHERE repo_id = ? AND user_id = ?')) {
      const [repoId, userId] = this.args as [string, string]
      const row = this.db.collaborators.find((r) => r.repo_id === repoId && r.user_id === userId)
      if (!row) return null
      return { role: row.role } as T
    }

    return null
  }
}

describe('git smart-http on api server', () => {
  let db: MockD1
  let bucket: MockR2Bucket

  beforeEach(async () => {
    db = new MockD1()
    bucket = new MockR2Bucket()

    const aliceId = crypto.randomUUID()
    const bobId = crypto.randomUUID()
    db.users.push({
      id: aliceId,
      username: 'alice',
      password_hash: await hashPassword('password123'),
    })
    db.users.push({
      id: bobId,
      username: 'bob',
      password_hash: await hashPassword('password123'),
    })
    db.repos.push({
      id: crypto.randomUUID(),
      owner_id: aliceId,
      name: 'repo',
      is_private: 1,
    })

    await bucket.put('alice/repo.git/HEAD', 'ref: refs/heads/main\n')
    await bucket.put('alice/repo.git/refs/heads/main', `${'a'.repeat(40)}\n`)
  })

  function env() {
    return {
      database: db as unknown as D1Database,
      bucket: bucket as unknown as R2Bucket,
      JWT_SECRET: 'test-secret',
    }
  }

  it('serves /git info refs for authenticated read', async () => {
    const auth = `Basic ${Buffer.from('alice:password123').toString('base64')}`
    const res = await app.request(
      '/git/alice/repo.git/info/refs?service=git-upload-pack',
      { headers: { authorization: auth } },
      env()
    )
    const body = await res.text()

    expect(res.status).toBe(200)
    expect(body).toContain('# service=git-upload-pack')
  })

  it('blocks write access for read-only collaborator and permits owner write', async () => {
    const alice = db.users.find((u) => u.username === 'alice')!
    const bob = db.users.find((u) => u.username === 'bob')!
    const repo = db.repos[0]
    db.collaborators.push({ repo_id: repo.id, user_id: bob.id, role: 'read' })

    const bobAuth = `Basic ${Buffer.from('bob:password123').toString('base64')}`
    const receiveLine = `${'0'.repeat(40)} ${'b'.repeat(40)} refs/heads/feature\0 report-status\n`
    const len = (new TextEncoder().encode(receiveLine).length + 4).toString(16).padStart(4, '0')

    const denied = await app.request(
      '/git/alice/repo.git/git-receive-pack',
      {
        method: 'POST',
        headers: { authorization: bobAuth },
        body: `${len}${receiveLine}0000`,
      },
      env()
    )
    expect(denied.status).toBe(403)

    const ownerAuth = `Basic ${Buffer.from('alice:password123').toString('base64')}`
    const allowed = await app.request(
      '/git/alice/repo.git/git-receive-pack',
      {
        method: 'POST',
        headers: { authorization: ownerAuth },
        body: `${len}${receiveLine}0000`,
      },
      env()
    )
    expect(allowed.status).toBe(200)

    const updatedRef = await bucket.get('alice/repo.git/refs/heads/feature')
    expect(await updatedRef?.text()).toContain('b'.repeat(40))
    expect(alice.id).toBeTruthy()
  })
})
