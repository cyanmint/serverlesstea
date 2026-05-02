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

class MockR2ObjectBody {
  constructor(private value: string | Uint8Array) {}
  async text() {
    return typeof this.value === 'string' ? this.value : new TextDecoder().decode(this.value)
  }
  async arrayBuffer() {
    return typeof this.value === 'string' ? new TextEncoder().encode(this.value).buffer : this.value.buffer
  }
}

export class MockR2Bucket {
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
    this.store.set(key, value instanceof Uint8Array ? value : new Uint8Array(value))
  }

  async list({ prefix }: { prefix: string }) {
    const objects = Array.from(this.store.keys())
      .filter((k) => k.startsWith(prefix))
      .map((key) => ({ key }))
    return { objects }
  }
}

export class MockD1 {
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
      const exists = this.db.users.find((u) => u.username === username || u.email === email)
      return (exists ? { id: exists.id } : null) as T | null
    }

    if (sql.startsWith('INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)')) {
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
      return this.db.repos
        .filter((r) => r.owner_id === ownerId && r.is_private === 0)
        .map((r) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          is_private: r.is_private,
          default_branch: r.default_branch,
          created_at: r.created_at,
        })) as T
    }

    if (sql.includes('FROM repositories r JOIN users u ON r.owner_id = u.id WHERE r.is_private = 0 ORDER BY')) {
      return this.db.repos
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
        }) as T
    }

    if (sql.startsWith('SELECT id FROM repositories WHERE owner_id = ? AND name = ?')) {
      const [ownerId, repoName] = this.args as [string, string]
      const repo = this.db.repos.find((r) => r.owner_id === ownerId && r.name === repoName)
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

    if (sql.startsWith('SELECT id, username, password_hash FROM users WHERE username = ?')) {
      const [username] = this.args as [string]
      const user = this.db.users.find((u) => u.username === username)
      return (user ? { id: user.id, username: user.username, password_hash: user.password_hash } : null) as T | null
    }

    if (sql.startsWith('SELECT role FROM repo_collaborators WHERE repo_id = ? AND user_id = ?')) {
      const [repoId, userId] = this.args as [string, string]
      const row = this.db.collaborators.find((c) => c.repo_id === repoId && c.user_id === userId)
      return (row ? { role: row.role } : null) as T | null
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

    if (sql.startsWith('UPDATE users SET ') && sql.endsWith(' WHERE id = ?')) {
      const id = this.args[this.args.length - 1] as string
      const user = this.db.users.find((u) => u.id === id)
      if (!user) return null
      const values = this.args.slice(0, -1)
      let idx = 0
      if (sql.includes('display_name = ?')) user.display_name = values[idx++] as string | null
      if (sql.includes('bio = ?')) user.bio = values[idx++] as string | null
      if (sql.includes('is_admin = ?')) user.is_admin = values[idx++] as number
      user.updated_at = new Date().toISOString()
      return null
    }

    if (mode === 'all') return [] as T
    return null
  }
}

export class MockSendEmail {
  sent: Array<{ from: string; to: string; raw: string }> = []

  async send(message: { from: string; to: string; raw: string }) {
    this.sent.push({ from: message.from, to: message.to, raw: message.raw })
  }
}

export function createMockEnv() {
  return {
    database: new MockD1() as unknown as D1Database,
    bucket: new MockR2Bucket() as unknown as R2Bucket,
    JWT_SECRET: 'test-secret',
    R2_ACCESS_TOKEN: 'test-r2-token',
    SEND_EMAIL: new MockSendEmail() as unknown as SendEmail,
    EMAIL_FROM: 'no-reply@test.example',
  }
}
