import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/git/introspect', () => ({
  listFiles: vi.fn(async () => [{ path: 'README.md', type: 'blob' }]),
  readBlob: vi.fn(async () => 'hello world'),
  listCommits: vi.fn(async () => [{ oid: 'a'.repeat(40), message: 'init' }]),
  getCommitDiff: vi.fn(async () => [{ path: 'README.md', diff: '+hello' }]),
}))

import app from '../src/index'

type UserRow = {
  id: string
  username: string
  email: string
  password_hash: string
  display_name: string | null
  bio: string | null
  is_admin: number
  created_at: string
  updated_at: string
}

type RepoRow = {
  id: string
  owner_id: string
  name: string
  description: string | null
  is_private: number
  default_branch: string
  created_at: string
}

class MockD1 {
  users: UserRow[] = []
  repos: RepoRow[] = []
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
    return this.execute<T>('first')
  }

  async all() {
    const results = await this.execute<unknown[]>('all')
    return { results: results ?? [] }
  }

  async run() {
    await this.execute('run')
    return { success: true }
  }

  private async execute<T>(mode: 'first' | 'all' | 'run'): Promise<T | null> {
    const sql = this.normalizedSql

    if (sql.startsWith('SELECT id FROM users WHERE username = ? OR email = ?')) {
      const [username, email] = this.args as [string, string]
      return (
        this.db.users.find((u) => u.username === username || u.email === email)?.id
          ? { id: 'exists' }
          : null
      ) as T | null
    }

    if (sql.startsWith('INSERT INTO users (id, username, email, password_hash)')) {
      const [id, username, email, passwordHash] = this.args as [string, string, string, string]
      const now = new Date().toISOString()
      this.db.users.push({
        id,
        username,
        email,
        password_hash: passwordHash,
        display_name: null,
        bio: null,
        is_admin: 0,
        created_at: now,
        updated_at: now,
      })
      return null
    }

    if (sql.startsWith('SELECT id, username, email, password_hash, is_admin FROM users WHERE email = ?')) {
      const [email] = this.args as [string]
      const user = this.db.users.find((u) => u.email === email)
      return (user
        ? {
            id: user.id,
            username: user.username,
            email: user.email,
            password_hash: user.password_hash,
            is_admin: user.is_admin,
          }
        : null) as T | null
    }

    if (sql.startsWith('SELECT id, username, display_name, bio, created_at FROM users WHERE username = ?')) {
      const [username] = this.args as [string]
      const user = this.db.users.find((u) => u.username === username)
      return (user
        ? {
            id: user.id,
            username: user.username,
            display_name: user.display_name,
            bio: user.bio,
            created_at: user.created_at,
          }
        : null) as T | null
    }

    if (sql.startsWith('SELECT id, name, description, is_private, default_branch, created_at FROM repositories WHERE owner_id = ? AND is_private = 0')) {
      const [ownerId] = this.args as [string]
      const repos = this.db.repos
        .filter((r) => r.owner_id === ownerId && r.is_private === 0)
        .map((r) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          is_private: r.is_private,
          default_branch: r.default_branch,
          created_at: r.created_at,
        }))
      return repos as T
    }

    if (sql.startsWith('SELECT id FROM users WHERE username = ?')) {
      const [username] = this.args as [string]
      const user = this.db.users.find((u) => u.username === username)
      return (user ? { id: user.id } : null) as T | null
    }

    if (sql.startsWith("UPDATE users SET display_name = ?, bio = ?, updated_at = datetime('now') WHERE id = ?")) {
      const [displayName, bio, id] = this.args as [string | null, string | null, string]
      const user = this.db.users.find((u) => u.id === id)
      if (user) {
        user.display_name = displayName
        user.bio = bio
        user.updated_at = new Date().toISOString()
      }
      return null
    }

    if (sql.includes('FROM repositories r JOIN users u ON r.owner_id = u.id WHERE r.is_private = 0 ORDER BY')) {
      const repos = this.db.repos
        .filter((r) => r.is_private === 0)
        .map((r) => {
          const owner = this.db.users.find((u) => u.id === r.owner_id)!
          return {
            id: r.id,
            name: r.name,
            description: r.description,
            default_branch: r.default_branch,
            created_at: r.created_at,
            owner_username: owner.username,
            owner_display_name: owner.display_name,
          }
        })
      return repos as T
    }

    if (sql.startsWith('SELECT id FROM repositories WHERE owner_id = ? AND name = ?')) {
      const [ownerId, name] = this.args as [string, string]
      const repo = this.db.repos.find((r) => r.owner_id === ownerId && r.name === name)
      return (repo ? { id: repo.id } : null) as T | null
    }

    if (sql.startsWith('INSERT INTO repositories (id, owner_id, name, description, is_private) VALUES (?, ?, ?, ?, ?)')) {
      const [id, ownerId, name, description, isPrivate] = this.args as [string, string, string, string | null, number]
      this.db.repos.push({
        id,
        owner_id: ownerId,
        name,
        description,
        is_private: isPrivate,
        default_branch: 'main',
        created_at: new Date().toISOString(),
      })
      return null
    }

    if (sql.includes('FROM repositories r JOIN users u ON r.owner_id = u.id WHERE u.username = ? AND r.name = ?')) {
      const [ownerUsername, repoName] = this.args as [string, string]
      const owner = this.db.users.find((u) => u.username === ownerUsername)
      if (!owner) return null
      const repo = this.db.repos.find((r) => r.owner_id === owner.id && r.name === repoName)
      if (!repo) return null

      if (sql.includes('SELECT r.id, r.owner_id, r.is_private')) {
        return { id: repo.id, owner_id: repo.owner_id, is_private: repo.is_private } as T
      }

      if (sql.includes('SELECT r.id, r.owner_id')) {
        return { id: repo.id, owner_id: repo.owner_id } as T
      }

      return {
        id: repo.id,
        name: repo.name,
        description: repo.description,
        is_private: repo.is_private,
        default_branch: repo.default_branch,
        created_at: repo.created_at,
        owner_username: owner.username,
        owner_display_name: owner.display_name,
      } as T
    }

    if (sql.startsWith('DELETE FROM repositories WHERE id = ?')) {
      const [id] = this.args as [string]
      this.db.repos = this.db.repos.filter((r) => r.id !== id)
      this.db.collaborators = this.db.collaborators.filter((c) => c.repo_id !== id)
      return null
    }

    if (sql.startsWith('SELECT id, username, email, display_name, bio, is_admin, created_at FROM users ORDER BY created_at DESC')) {
      return this.db.users.map((u) => ({
        id: u.id,
        username: u.username,
        email: u.email,
        display_name: u.display_name,
        bio: u.bio,
        is_admin: u.is_admin,
        created_at: u.created_at,
      })) as T
    }

    if (sql.startsWith('SELECT id FROM users WHERE id = ?')) {
      const [id] = this.args as [string]
      const user = this.db.users.find((u) => u.id === id)
      return (user ? { id: user.id } : null) as T | null
    }

    if (sql.startsWith('UPDATE users SET')) {
      const id = this.args[this.args.length - 1] as string
      const user = this.db.users.find((u) => u.id === id)
      if (!user) return null

      let argIndex = 0
      if (sql.includes('display_name = ?')) user.display_name = this.args[argIndex++] as string | null
      if (sql.includes('bio = ?')) user.bio = this.args[argIndex++] as string | null
      if (sql.includes('is_admin = ?')) user.is_admin = this.args[argIndex++] as number
      user.updated_at = new Date().toISOString()
      return null
    }

    if (sql.startsWith('SELECT id, username, password_hash FROM users WHERE username = ?')) {
      const [username] = this.args as [string]
      const user = this.db.users.find((u) => u.username === username)
      return (user
        ? { id: user.id, username: user.username, password_hash: user.password_hash }
        : null) as T | null
    }

    if (sql.startsWith('SELECT role FROM repo_collaborators WHERE repo_id = ? AND user_id = ?')) {
      const [repoId, userId] = this.args as [string, string]
      const collaborator = this.db.collaborators.find((c) => c.repo_id === repoId && c.user_id === userId)
      return (collaborator ? { role: collaborator.role } : null) as T | null
    }

    if (mode === 'all') return [] as T
    return null
  }
}

const mockBucket = {
  get: vi.fn(),
  put: vi.fn(),
  list: vi.fn(),
}

describe('api endpoints', () => {
  let db: MockD1

  beforeEach(() => {
    db = new MockD1()
  })

  function env() {
    return { DB: db as unknown as D1Database, GIT_BUCKET: mockBucket as unknown as R2Bucket, JWT_SECRET: 'test-secret' }
  }

  async function registerAndLogin() {
    await app.request(
      '/api/auth/register',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username: 'alice', email: 'alice@example.com', password: 'password123' }),
      },
      env()
    )

    let loginRes = await app.request(
      '/api/auth/login',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: 'alice@example.com', password: 'password123' }),
      },
      env()
    )
    const loginBody = await loginRes.json() as { token: string; refreshToken: string; user: { id: string } }
    return loginBody
  }

  it('covers all api endpoints with successful behavior', async () => {
    const rootRes = await app.request('/', {}, env())
    expect(rootRes.status).toBe(200)

    const registerRes = await app.request(
      '/api/auth/register',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username: 'admin', email: 'admin@example.com', password: 'password123' }),
      },
      env()
    )
    expect(registerRes.status).toBe(201)

    let loginRes = await app.request(
      '/api/auth/login',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: 'admin@example.com', password: 'password123' }),
      },
      env()
    )
    expect(loginRes.status).toBe(200)
    let loginBody = await loginRes.json() as { token: string; refreshToken: string; user: { id: string } }
    db.users.find((u) => u.id === loginBody.user.id)!.is_admin = 1
    loginRes = await app.request(
      '/api/auth/login',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: 'admin@example.com', password: 'password123' }),
      },
      env()
    )
    loginBody = await loginRes.json() as { token: string; refreshToken: string; user: { id: string } }

    const refreshRes = await app.request(
      '/api/auth/refresh',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ refreshToken: loginBody.refreshToken }),
      },
      env()
    )
    expect(refreshRes.status).toBe(200)

    const createRepoRes = await app.request(
      '/api/repos',
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${loginBody.token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ name: 'demo', description: 'demo repo', is_private: false }),
      },
      env()
    )
    expect(createRepoRes.status).toBe(201)

    const reposRes = await app.request('/api/repos', {}, env())
    expect(reposRes.status).toBe(200)

    const getRepoRes = await app.request('/api/repos/admin/demo', {}, env())
    expect(getRepoRes.status).toBe(200)

    const treeRes = await app.request('/api/repos/admin/demo/tree/main', {}, env())
    expect(treeRes.status).toBe(200)

    const blobRes = await app.request('/api/repos/admin/demo/blob/main/README.md', {}, env())
    expect(blobRes.status).toBe(200)

    const commitsRes = await app.request('/api/repos/admin/demo/commits/main', {}, env())
    expect(commitsRes.status).toBe(200)

    const diffRes = await app.request('/api/repos/admin/demo/diff/123456', {}, env())
    expect(diffRes.status).toBe(200)

    const userRes = await app.request('/api/users/admin', {}, env())
    expect(userRes.status).toBe(200)

    const updateUserRes = await app.request(
      '/api/users/admin',
      {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${loginBody.token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ display_name: 'Admin', bio: 'owner' }),
      },
      env()
    )
    expect(updateUserRes.status).toBe(200)

    const adminUsersRes = await app.request(
      '/api/admin/users',
      { headers: { authorization: `Bearer ${loginBody.token}` } },
      env()
    )
    expect(adminUsersRes.status).toBe(200)

    const adminUpdateRes = await app.request(
      `/api/admin/users/${loginBody.user.id}`,
      {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${loginBody.token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ is_admin: true }),
      },
      env()
    )
    expect(adminUpdateRes.status).toBe(200)

    const internalAuth = `Basic ${Buffer.from('admin:password123').toString('base64')}`
    const internalRes = await app.request(
      '/api/internal/check-access?owner=admin&repo=demo&action=read',
      { headers: { authorization: internalAuth } },
      env()
    )
    expect(internalRes.status).toBe(200)

    const deleteRepoRes = await app.request(
      '/api/repos/admin/demo',
      {
        method: 'DELETE',
        headers: { authorization: `Bearer ${loginBody.token}` },
      },
      env()
    )
    expect(deleteRepoRes.status).toBe(200)
  })

  it('enforces git permission semantics via internal access checks', async () => {
    const admin = await registerAndLogin()
    const adminUser = db.users.find((u) => u.id === admin.user.id)!
    adminUser.is_admin = 1

    await app.request(
      '/api/auth/register',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username: 'bob', email: 'bob@example.com', password: 'password123' }),
      },
      env()
    )
    const bob = db.users.find((u) => u.username === 'bob')!

    const privateRepoId = crypto.randomUUID()
    db.repos.push({
      id: privateRepoId,
      owner_id: admin.user.id,
      name: 'private-repo',
      description: 'private',
      is_private: 1,
      default_branch: 'main',
      created_at: new Date().toISOString(),
    })
    db.collaborators.push({ repo_id: privateRepoId, user_id: bob.id, role: 'read' })

    const publicRepoId = crypto.randomUUID()
    db.repos.push({
      id: publicRepoId,
      owner_id: admin.user.id,
      name: 'public-repo',
      description: 'public',
      is_private: 0,
      default_branch: 'main',
      created_at: new Date().toISOString(),
    })

    const noAuthPublicRead = await app.request('/api/internal/check-access?owner=alice&repo=public-repo&action=read', {}, env())
    expect(noAuthPublicRead.status).toBe(200)

    const bobAuth = `Basic ${Buffer.from('bob:password123').toString('base64')}`
    const privateRead = await app.request(
      '/api/internal/check-access?owner=alice&repo=private-repo&action=read',
      { headers: { authorization: bobAuth } },
      env()
    )
    expect(privateRead.status).toBe(200)

    const writeDenied = await app.request(
      '/api/internal/check-access?owner=alice&repo=private-repo&action=write',
      { headers: { authorization: bobAuth } },
      env()
    )
    expect(writeDenied.status).toBe(403)
  })
})
