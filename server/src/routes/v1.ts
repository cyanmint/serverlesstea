import { Hono } from 'hono'
import { v1Auth, v1OptionalAuth } from '../middleware/v1auth'
import { signToken } from '../auth/jwt'
import { hashPassword } from '../auth/password'
import { readBlob, listCommits, listDirectory } from '../git/introspect'
import { commitFileToBranch } from '../git/mutate'
import { Env } from '../index'
import git from 'isomorphic-git'
import { createR2Fs } from '../git/r2fs'
import type { JWTPayload } from 'jose'

const router = new Hono<{ Bindings: Env }>()

type UserRow = {
  id: string
  username: string
  email: string
  display_name: string | null
  bio: string | null
  is_admin: number
  created_at: string
}

function formatUser(u: UserRow) {
  return {
    id: u.id,
    login: u.username,
    full_name: u.display_name ?? '',
    email: u.email,
    avatar_url: '',
    html_url: `/${u.username}`,
    is_admin: u.is_admin === 1,
    created: u.created_at,
    description: u.bio ?? '',
  }
}

async function getRepo(db: D1Database, owner: string, repo: string) {
  return db
    .prepare(
      `SELECT r.id, r.owner_id FROM repositories r JOIN users u ON r.owner_id = u.id WHERE u.username = ? AND r.name = ?`,
    )
    .bind(owner, repo)
    .first<{ id: string; owner_id: string }>()
}

async function getRepoWithOwner(db: D1Database, owner: string, repo: string) {
  return db
    .prepare(
      `SELECT r.id, r.owner_id, r.default_branch, u.username as owner_username
       FROM repositories r
       JOIN users u ON r.owner_id = u.id
       WHERE u.username = ? AND r.name = ?`,
    )
    .bind(owner, repo)
    .first<{ id: string; owner_id: string; default_branch: string; owner_username: string }>()
}

function canWriteRepo(payload: JWTPayload | undefined, repoOwnerId: string): boolean {
  return Boolean(payload && (payload.sub === repoOwnerId || payload['isAdmin']))
}

async function getUser(db: D1Database, username: string) {
  return db
    .prepare('SELECT id, username, email, display_name, bio, is_admin, created_at FROM users WHERE username = ?')
    .bind(username)
    .first<UserRow>()
}

async function getUserById(db: D1Database, id: string) {
  return db
    .prepare('SELECT id, username, email, display_name, bio, is_admin, created_at FROM users WHERE id = ?')
    .bind(id)
    .first<UserRow>()
}

async function getRepoFull(db: D1Database, owner: string, repo: string) {
  return db
    .prepare(
      `SELECT r.id, r.name, r.description, r.is_private, r.default_branch, r.created_at, r.updated_at,
              r.owner_id, u.username as owner_username, u.display_name as owner_display_name,
              u.email as owner_email, u.bio as owner_bio, u.is_admin as owner_is_admin
       FROM repositories r JOIN users u ON r.owner_id = u.id
       WHERE u.username = ? AND r.name = ?`,
    )
    .bind(owner, repo)
    .first<{
      id: string; name: string; description: string | null; is_private: number
      default_branch: string; created_at: string; updated_at: string | null
      owner_id: string; owner_username: string; owner_display_name: string | null
      owner_email: string; owner_bio: string | null; owner_is_admin: number
    }>()
}

function formatRepo(r: {
  id: string; name: string; description: string | null; is_private: number
  default_branch: string; created_at: string; updated_at: string | null
  owner_username: string; owner_display_name: string | null
  owner_email: string; owner_bio: string | null; owner_is_admin: number; owner_id: string
}) {
  return {
    id: r.id,
    name: r.name,
    full_name: `${r.owner_username}/${r.name}`,
    description: r.description ?? '',
    html_url: `/${r.owner_username}/${r.name}`,
    ssh_url: `git@localhost:${r.owner_username}/${r.name}.git`,
    clone_url: `http://localhost/git/${r.owner_username}/${r.name}.git`,
    private: r.is_private === 1,
    fork: false,
    archived: false,
    mirror: false,
    template: false,
    stars_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    watchers_count: 0,
    default_branch: r.default_branch,
    updated_at: r.updated_at ?? r.created_at,
    language: '',
    owner: {
      id: r.owner_id,
      login: r.owner_username,
      full_name: r.owner_display_name ?? '',
      email: r.owner_email,
      avatar_url: '',
      html_url: `/${r.owner_username}`,
      is_admin: r.owner_is_admin === 1,
      created: r.created_at,
      description: r.owner_bio ?? '',
    },
  }
}

// ─── Settings ────────────────────────────────────────────────────────────────

router.get('/settings/api', (c) => {
  return c.json({ AppVer: '1.0.0', GitVersion: '', GoVersion: '', Version: '1', Links: {} })
})

// ─── Current user ────────────────────────────────────────────────────────────

router.get('/user', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const u = await db
    .prepare('SELECT id, username, email, display_name, bio, is_admin, created_at FROM users WHERE id = ?')
    .bind(payload.sub)
    .first<UserRow>()
  if (!u) return c.json({ message: 'User not found' }, 404)
  return c.json(formatUser(u))
})

router.delete('/user', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  await db.prepare('DELETE FROM users WHERE id = ?').bind(payload.sub).run()
  return c.body(null, 204)
})

router.post('/user/change_password', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const rawBody = await c.req.json<{ new_password?: string; password?: string }>().catch(() => ({ new_password: undefined, password: undefined }))
  const newPassword = rawBody.new_password ?? rawBody.password
  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
    return c.json({ message: 'Invalid password' }, 400)
  }
  const hash = await hashPassword(newPassword)
  await db.prepare("UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?").bind(hash, payload.sub).run()
  return c.json({})
})

// ─── User starred repos ───────────────────────────────────────────────────────

router.get('/user/starred/:owner/:repo', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.body(null, 404)
  const star = await db.prepare('SELECT 1 FROM starred_repos WHERE user_id = ? AND repo_id = ?')
    .bind(payload.sub, repoRow.id).first()
  return c.body(null, star ? 204 : 404)
})

router.put('/user/starred/:owner/:repo', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  await db.prepare('INSERT OR IGNORE INTO starred_repos (user_id, repo_id) VALUES (?, ?)').bind(payload.sub, repoRow.id).run()
  return c.body(null, 204)
})

router.delete('/user/starred/:owner/:repo', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  await db.prepare('DELETE FROM starred_repos WHERE user_id = ? AND repo_id = ?').bind(payload.sub, repoRow.id).run()
  return c.body(null, 204)
})

// ─── Create repo ─────────────────────────────────────────────────────────────

router.get('/user/repos', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const { limit = '20', page = '1' } = c.req.query()
  const offset = (parseInt(page) - 1) * parseInt(limit)
  const repos = await db.prepare(`
    SELECT r.id, r.name, r.description, r.is_private, r.default_branch, r.created_at, r.updated_at,
           r.owner_id, u.username as owner_username, u.display_name as owner_display_name,
           u.email as owner_email, u.bio as owner_bio, u.is_admin as owner_is_admin
    FROM repositories r JOIN users u ON r.owner_id = u.id
    WHERE r.owner_id = ?
    ORDER BY r.updated_at DESC LIMIT ? OFFSET ?
  `).bind(payload.sub, parseInt(limit), offset).all<Parameters<typeof formatRepo>[0]>()
  return c.json(repos.results.map(formatRepo))
})

router.get('/user/orgs', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const orgs = await db.prepare(`
    SELECT o.id, o.name, o.display_name, o.description, o.visibility
    FROM org_members m JOIN organizations o ON m.org_id = o.id
    WHERE m.user_id = ? ORDER BY o.name
  `).bind(payload.sub).all<{ id: string; name: string; display_name: string | null; description: string | null; visibility: string }>()
  return c.json(orgs.results.map((o) => ({ id: o.id, username: o.name, full_name: o.display_name ?? '', description: o.description ?? '', visibility: o.visibility, avatar_url: '' })))
})

router.post('/user/repos', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const body = await c.req.json<{ name?: string; description?: string; private?: boolean }>()
    .catch(() => ({ name: undefined, description: undefined, private: undefined }))
  const { name, description, private: isPrivate = false } = body
  if (!name || typeof name !== 'string') return c.json({ message: 'Name required' }, 422)

  const existing = await db.prepare('SELECT id FROM repositories WHERE owner_id = ? AND name = ?').bind(payload.sub, name).first()
  if (existing) return c.json({ message: 'Repository already exists' }, 409)

  const id = crypto.randomUUID()
  await db.prepare('INSERT INTO repositories (id, owner_id, name, description, is_private) VALUES (?, ?, ?, ?, ?)')
    .bind(id, payload.sub, name, description ?? null, isPrivate ? 1 : 0).run()

  const owner = await db.prepare('SELECT id, username, email, display_name, bio, is_admin, created_at FROM users WHERE id = ?')
    .bind(payload.sub).first<UserRow>()

  // Initialise the bare git repository in R2 so the repo is clonable immediately.
  if (owner?.username) {
    await c.env.bucket.put(`${owner.username}/${name}.git/HEAD`, 'ref: refs/heads/main\n')
  }

  return c.json({
    id, name,
    full_name: `${owner?.username ?? ''}/${name}`,
    description: description ?? '',
    html_url: `/${owner?.username ?? ''}/${name}`,
    ssh_url: '',
    clone_url: '',
    private: isPrivate,
    fork: false, archived: false, mirror: false, template: false,
    stars_count: 0, forks_count: 0, open_issues_count: 0,
    default_branch: 'main',
    updated_at: new Date().toISOString(),
    language: '',
    owner: owner ? formatUser(owner) : null,
  }, 201)
})

// ─── SSH Keys ─────────────────────────────────────────────────────────────────

router.get('/user/keys', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const keys = await db.prepare(
    'SELECT id, title, key_content, created_at FROM ssh_keys WHERE user_id = ? ORDER BY created_at DESC',
  ).bind(payload.sub).all<{ id: string; title: string; key_content: string; created_at: string }>()
  return c.json(keys.results.map((k) => ({ id: k.id, key: k.key_content, title: k.title, created_at: k.created_at })))
})

router.post('/user/keys', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const body = await c.req.json<{ key?: string; title?: string }>()
    .catch(() => ({ key: undefined, title: undefined }))
  if (!body.key || !body.title) return c.json({ message: 'Key and title required' }, 422)
  const id = crypto.randomUUID()
  await db.prepare('INSERT INTO ssh_keys (id, user_id, title, key_content) VALUES (?, ?, ?, ?)')
    .bind(id, payload.sub, body.title, body.key).run()
  return c.json({ id, key: body.key, title: body.title, created_at: new Date().toISOString() }, 201)
})

router.delete('/user/keys/:id', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const { id } = c.req.param()
  const row = await db.prepare('SELECT user_id FROM ssh_keys WHERE id = ?').bind(id).first<{ user_id: string }>()
  if (!row) return c.json({ message: 'Key not found' }, 404)
  if (row.user_id !== (payload.sub as string)) return c.json({ message: 'Forbidden' }, 403)
  await db.prepare('DELETE FROM ssh_keys WHERE id = ?').bind(id).run()
  return c.body(null, 204)
})

// ─── GPG Keys ─────────────────────────────────────────────────────────────────

router.get('/user/gpg_keys', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const keys = await db.prepare(
    'SELECT id, key_id, raw_content, created_at, expires_at FROM gpg_keys WHERE user_id = ? ORDER BY created_at DESC',
  ).bind(payload.sub).all<{ id: string; key_id: string; raw_content: string; created_at: string; expires_at: string | null }>()
  return c.json(keys.results.map((k) => ({
    id: k.id, key_id: k.key_id, primary_key_id: '', emails: [], subkeys: [],
    created_at: k.created_at, expires_at: k.expires_at ?? null,
  })))
})

router.post('/user/gpg_keys', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const body = await c.req.json<{ armored_public_key?: string }>().catch(() => ({ armored_public_key: undefined }))
  if (!body.armored_public_key) return c.json({ message: 'armored_public_key required' }, 422)
  const id = crypto.randomUUID()
  const keyId = crypto.randomUUID().slice(0, 16).toUpperCase()
  await db.prepare('INSERT INTO gpg_keys (id, user_id, key_id, raw_content) VALUES (?, ?, ?, ?)')
    .bind(id, payload.sub, keyId, body.armored_public_key).run()
  return c.json({ id, key_id: keyId, primary_key_id: '', emails: [], subkeys: [], created_at: new Date().toISOString(), expires_at: null }, 201)
})

router.delete('/user/gpg_keys/:id', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const { id } = c.req.param()
  const db = c.env.database
  const row = await db.prepare('SELECT user_id FROM gpg_keys WHERE id = ?').bind(id).first<{ user_id: string }>()
  if (!row) return c.json({ message: 'GPG key not found' }, 404)
  if (row.user_id !== (payload.sub as string)) return c.json({ message: 'Forbidden' }, 403)
  await db.prepare('DELETE FROM gpg_keys WHERE id = ?').bind(id).run()
  return c.body(null, 204)
})

// ─── Emails (no backing table) ────────────────────────────────────────────────

router.get('/user/emails', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const u = await db.prepare('SELECT email FROM users WHERE id = ?').bind(payload.sub).first<{ email: string }>()
  return c.json(u ? [{ email: u.email, verified: true, primary: true }] : [])
})

router.post('/user/emails', v1Auth, async (c) => {
  return c.json([{ email: '', verified: false, primary: false }], 201)
})

router.delete('/user/emails', v1Auth, async (c) => {
  return c.body(null, 204)
})

// ─── Users: search BEFORE :username ──────────────────────────────────────────

router.get('/users/search', v1OptionalAuth, async (c) => {
  const { q = '', limit = '20', page = '1' } = c.req.query()
  const db = c.env.database
  const offset = (parseInt(page) - 1) * parseInt(limit)
  const users = await db.prepare(
    'SELECT id, username, email, display_name, bio, is_admin, created_at FROM users WHERE username LIKE ? OR display_name LIKE ? ORDER BY username LIMIT ? OFFSET ?',
  ).bind(`%${q}%`, `%${q}%`, parseInt(limit), offset).all<UserRow>()
  return c.json({ data: users.results.map(formatUser), ok: true })
})

router.get('/users/:username', v1OptionalAuth, async (c) => {
  const { username } = c.req.param()
  const db = c.env.database
  const u = await getUser(db, username)
  if (!u) return c.json({ message: 'User not found' }, 404)
  return c.json(formatUser(u))
})

router.get('/users/:username/repos', v1OptionalAuth, async (c) => {
  const { username } = c.req.param()
  const db = c.env.database
  const u = await getUser(db, username)
  if (!u) return c.json({ message: 'User not found' }, 404)

  const { limit = '20', page = '1' } = c.req.query()
  const offset = (parseInt(page) - 1) * parseInt(limit)
  const repos = await db.prepare(`
    SELECT r.id, r.name, r.description, r.is_private, r.default_branch, r.created_at, r.updated_at,
           r.owner_id, u.username as owner_username, u.display_name as owner_display_name,
           u.email as owner_email, u.bio as owner_bio, u.is_admin as owner_is_admin
    FROM repositories r JOIN users u ON r.owner_id = u.id
    WHERE r.owner_id = ? AND r.is_private = 0
    ORDER BY r.updated_at DESC LIMIT ? OFFSET ?
  `).bind(u.id, parseInt(limit), offset).all<Parameters<typeof formatRepo>[0]>()
  return c.json(repos.results.map(formatRepo))
})

router.get('/users/:username/orgs', v1OptionalAuth, async (c) => {
  const { username } = c.req.param()
  const db = c.env.database
  const u = await getUser(db, username)
  if (!u) return c.json({ message: 'User not found' }, 404)
  const orgs = await db.prepare(`
    SELECT o.id, o.name, o.display_name, o.description, o.visibility
    FROM org_members m JOIN organizations o ON m.org_id = o.id
    WHERE m.user_id = ? ORDER BY o.name
  `).bind(u.id).all<{ id: string; name: string; display_name: string | null; description: string | null; visibility: string }>()
  return c.json(orgs.results.map((o) => ({ id: o.id, username: o.name, full_name: o.display_name ?? '', description: o.description ?? '', visibility: o.visibility, avatar_url: '' })))
})

router.get('/users/:username/tokens', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const { username } = c.req.param()
  const db = c.env.database
  const u = await getUser(db, username)
  if (!u) return c.json({ message: 'User not found' }, 404)
  if (u.id !== (payload.sub as string) && !payload['isAdmin']) return c.json({ message: 'Forbidden' }, 403)
  const tokens = await db.prepare(
    'SELECT id, name, last_eight, created_at FROM access_tokens WHERE user_id = ? ORDER BY created_at DESC',
  ).bind(u.id).all<{ id: string; name: string; last_eight: string; created_at: string }>()
  return c.json(tokens.results.map((t) => ({ id: t.id, name: t.name, token_last_eight: t.last_eight, created_at: t.created_at })))
})

router.post('/users/:username/tokens', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const body = await c.req.json<{ name?: string }>().catch(() => ({ name: undefined }))
  const tokenName = body.name ?? 'default'
  const sha1 = await signToken(
    { sub: payload.sub, username: payload['username'], email: payload['email'], isAdmin: payload['isAdmin'] },
    c.env.JWT_SECRET,
  )
  const id = crypto.randomUUID()
  const lastEight = sha1.slice(-8)
  const db = c.env.database
  await db.prepare('INSERT INTO access_tokens (id, user_id, name, sha1, last_eight) VALUES (?, ?, ?, ?, ?)')
    .bind(id, payload.sub, tokenName, sha1, lastEight).run()
  return c.json({ id, name: tokenName, sha1, token_last_eight: lastEight }, 201)
})

router.delete('/users/:username/tokens/:id', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const { id } = c.req.param()
  const db = c.env.database
  const row = await db.prepare('SELECT user_id FROM access_tokens WHERE id = ?').bind(id).first<{ user_id: string }>()
  if (!row) return c.json({ message: 'Token not found' }, 404)
  if (row.user_id !== (payload.sub as string) && !payload['isAdmin']) return c.json({ message: 'Forbidden' }, 403)
  await db.prepare('DELETE FROM access_tokens WHERE id = ?').bind(id).run()
  return c.body(null, 204)
})

// ─── Repos: specific paths BEFORE :owner/:repo ───────────────────────────────

router.get('/repos/search', v1OptionalAuth, async (c) => {
  const { q = '', limit = '20', page = '1' } = c.req.query()
  const db = c.env.database
  const offset = (parseInt(page) - 1) * parseInt(limit)
  const repos = await db.prepare(`
    SELECT r.id, r.name, r.description, r.is_private, r.default_branch, r.created_at, r.updated_at,
           r.owner_id, u.username as owner_username, u.display_name as owner_display_name,
           u.email as owner_email, u.bio as owner_bio, u.is_admin as owner_is_admin
    FROM repositories r JOIN users u ON r.owner_id = u.id
    WHERE r.is_private = 0 AND (r.name LIKE ? OR r.description LIKE ?)
    ORDER BY r.updated_at DESC LIMIT ? OFFSET ?
  `).bind(`%${q}%`, `%${q}%`, parseInt(limit), offset).all<Parameters<typeof formatRepo>[0]>()
  return c.json({ data: repos.results.map(formatRepo), ok: true })
})

router.get('/repos/issues/search', v1OptionalAuth, async (c) => {
  const { q = '', type = 'issues', state = 'open', limit = '20', page = '1' } = c.req.query()
  const db = c.env.database
  const offset = (parseInt(page) - 1) * parseInt(limit)
  const isPull = type === 'pulls' ? 1 : 0
  const issues = await db.prepare(`
    SELECT i.id, i.number, i.title, i.body, i.state, i.created_at, i.updated_at, i.closed_at,
           u.id as user_id, u.username as user_username, u.email as user_email,
           u.display_name as user_display_name, u.bio as user_bio, u.is_admin as user_is_admin,
           u.created_at as user_created_at
    FROM issues i
    JOIN users u ON i.creator_id = u.id
    JOIN repositories r ON i.repo_id = r.id
    WHERE i.is_pull = ? AND i.state = ? AND (i.title LIKE ? OR i.body LIKE ?) AND r.is_private = 0
    ORDER BY i.created_at DESC LIMIT ? OFFSET ?
  `).bind(isPull, state, `%${q}%`, `%${q}%`, parseInt(limit), offset).all()
  return c.json((issues.results as Array<Record<string, unknown>>).map((i) => formatIssueRow(i)))
})

// ─── Repo ─────────────────────────────────────────────────────────────────────

router.get('/repos/:owner/:repo', v1OptionalAuth, async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const r = await getRepoFull(db, owner, repo)
  if (!r) return c.json({ message: 'Repository not found' }, 404)
  if (r.is_private) {
    const payload = c.get('user' as never) as JWTPayload | undefined
    if (!payload || (payload.sub !== r.owner_id && !payload['isAdmin'])) {
      return c.json({ message: 'Repository not found' }, 404)
    }
  }

  // Detect whether the repository has been initialised with any content by
  // checking for the default branch ref in R2 (loose ref file or packed-refs).
  const looseRef = await c.env.bucket.head(
    `${r.owner_username}/${r.name}.git/refs/heads/${r.default_branch}`
  )
  let empty = !looseRef
  if (empty) {
    const packedObj = await c.env.bucket.get(`${r.owner_username}/${r.name}.git/packed-refs`)
    if (packedObj) {
      const text = await packedObj.text()
      empty = !text.split('\n').some((line) => {
        const parts = line.trim().split(' ')
        return parts.length >= 2 && parts[1] === `refs/heads/${r.default_branch}`
      })
    }
  }

  return c.json({ ...formatRepo(r), empty })
})

router.patch('/repos/:owner/:repo', v1Auth, async (c) => {
  const { owner, repo } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepoWithOwner(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  if (!canWriteRepo(payload, repoRow.owner_id)) return c.json({ message: 'Forbidden' }, 403)

  const body: {
    name?: string
    description?: string
    website?: string
    private?: boolean
    archived?: boolean
    default_branch?: string
  } = await c.req.json().catch(() => ({}))

  const updates: string[] = [`updated_at = datetime('now')`]
  const binds: unknown[] = []
  if (typeof body.name === 'string' && body.name.trim()) {
    updates.push('name = ?')
    binds.push(body.name.trim())
  }
  if (typeof body.description === 'string') {
    updates.push('description = ?')
    binds.push(body.description)
  }
  if (typeof body.private === 'boolean') {
    updates.push('is_private = ?')
    binds.push(body.private ? 1 : 0)
  }
  if (typeof body.default_branch === 'string' && body.default_branch.trim()) {
    updates.push('default_branch = ?')
    binds.push(body.default_branch.trim())
  }
  binds.push(repoRow.id)
  await db.prepare(`UPDATE repositories SET ${updates.join(', ')} WHERE id = ?`).bind(...binds).run()

  const updatedRepoName = (typeof body.name === 'string' && body.name.trim()) ? body.name.trim() : repo
  const full = await getRepoFull(db, owner, updatedRepoName)
  if (!full) return c.json({ message: 'Repository not found' }, 404)
  return c.json(formatRepo(full))
})

router.delete('/repos/:owner/:repo', v1Auth, async (c) => {
  const { owner, repo } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepoWithOwner(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  if (!canWriteRepo(payload, repoRow.owner_id)) return c.json({ message: 'Forbidden' }, 403)
  await db.prepare('DELETE FROM repositories WHERE id = ?').bind(repoRow.id).run()
  return c.body(null, 204)
})

router.get('/repos/:owner/:repo/branches', v1OptionalAuth, async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  try {
    const fs = createR2Fs(c.env.bucket, owner, repo)
    const gitdir = `/${owner}/${repo}.git`
    const branches = await git.listBranches({ fs: fs as unknown as Parameters<typeof git.listBranches>[0]['fs'], gitdir })
    const result = await Promise.all(branches.map(async (name) => {
      try {
        const sha = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: name })
        return { name, commit: { id: sha, message: '', added: null, removed: null, modified: null, author: { name: '', email: '', date: '' } } }
      } catch {
        return { name, commit: null }
      }
    }))
    return c.json(result)
  } catch {
    return c.json([])
  }
})

router.post('/repos/:owner/:repo/branches', v1Auth, async (c) => {
  const { owner, repo } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepoWithOwner(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  if (!canWriteRepo(payload, repoRow.owner_id)) return c.json({ message: 'Forbidden' }, 403)

  const body: { new_branch_name?: string; old_ref_name?: string } = await c.req.json().catch(() => ({}))
  const newBranch = body.new_branch_name?.trim()
  if (!newBranch) return c.json({ message: 'new_branch_name required' }, 422)
  const fromRef = body.old_ref_name?.trim() || repoRow.default_branch

  try {
    const fs = createR2Fs(c.env.bucket, owner, repo)
    const gitdir = `/${owner}/${repo}.git`
    const sourceOid = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: fromRef })
    await git.writeRef({
      fs: fs as unknown as Parameters<typeof git.writeRef>[0]['fs'],
      gitdir,
      ref: `refs/heads/${newBranch}`,
      value: sourceOid,
      force: false,
    })
    return c.json({ name: newBranch, commit: { id: sourceOid } }, 201)
  } catch {
    return c.json({ message: 'Failed to create branch' }, 400)
  }
})

router.patch('/repos/:owner/:repo/branches/:branch', v1Auth, async (c) => {
  const { owner, repo, branch } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepoWithOwner(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  if (!canWriteRepo(payload, repoRow.owner_id)) return c.json({ message: 'Forbidden' }, 403)

  const body: { new_name?: string } = await c.req.json().catch(() => ({}))
  const newName = body.new_name?.trim()
  if (!newName) return c.json({ message: 'new_name required' }, 422)

  try {
    const fs = createR2Fs(c.env.bucket, owner, repo)
    const gitdir = `/${owner}/${repo}.git`
    const oid = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: branch })
    await git.writeRef({
      fs: fs as unknown as Parameters<typeof git.writeRef>[0]['fs'],
      gitdir,
      ref: `refs/heads/${newName}`,
      value: oid,
      force: false,
    })
    await git.deleteRef({
      fs: fs as unknown as Parameters<typeof git.deleteRef>[0]['fs'],
      gitdir,
      ref: `refs/heads/${branch}`,
    })
    if (branch === repoRow.default_branch) {
      await db.prepare('UPDATE repositories SET default_branch = ?, updated_at = datetime(\'now\') WHERE id = ?')
        .bind(newName, repoRow.id).run()
    }
    return c.json({ name: newName, commit: { id: oid } })
  } catch {
    return c.json({ message: 'Failed to rename branch' }, 400)
  }
})

router.delete('/repos/:owner/:repo/branches/:branch', v1Auth, async (c) => {
  const { owner, repo, branch } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepoWithOwner(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  if (!canWriteRepo(payload, repoRow.owner_id)) return c.json({ message: 'Forbidden' }, 403)
  if (branch === repoRow.default_branch) return c.json({ message: 'Cannot delete default branch' }, 400)

  try {
    const fs = createR2Fs(c.env.bucket, owner, repo)
    const gitdir = `/${owner}/${repo}.git`
    await git.deleteRef({
      fs: fs as unknown as Parameters<typeof git.deleteRef>[0]['fs'],
      gitdir,
      ref: `refs/heads/${branch}`,
    })
    return c.body(null, 204)
  } catch {
    return c.json({ message: 'Failed to delete branch' }, 400)
  }
})

router.get('/repos/:owner/:repo/contents/:path{.*}', v1OptionalAuth, async (c) => {
  const { owner, repo, path } = c.req.param()
  const ref = c.req.query('ref') ?? 'HEAD'

  // Try to serve as a directory listing first (empty path or explicit dir request).
  // Fall back to a blob read if that fails with ENOTDIR.
  if (!path || path.endsWith('/')) {
    try {
      const entries = await listDirectory(owner, repo, ref, path.replace(/\/$/, ''), c.env.bucket)
      return c.json(entries.map((e) => ({
        name: e.name,
        path: e.path,
        type: e.type === 'dir' ? 'dir' : 'file',
        sha: e.sha,
        download_url: null,
      })))
    } catch {
      return c.json({ message: 'Not found' }, 404)
    }
  }

  // Try blob first; if the object is a tree, fall back to directory listing.
  try {
    const content = await readBlob(owner, repo, ref, path, c.env.bucket)
    const encoded = btoa(unescape(encodeURIComponent(content)))
    const parts = path.split('/')
    const name = parts[parts.length - 1]
    return c.json({ name, path, type: 'file', encoding: 'base64', content: encoded, size: content.length, download_url: null })
  } catch (err) {
    // If the path is a directory (tree), serve a directory listing.
    const code = (err as { code?: string }).code
    if (code === 'ENOTDIR' || (err instanceof Error && err.message?.includes('ENOTDIR'))) {
      try {
        const entries = await listDirectory(owner, repo, ref, path, c.env.bucket)
        return c.json(entries.map((e) => ({
          name: e.name,
          path: e.path,
          type: e.type === 'dir' ? 'dir' : 'file',
          sha: e.sha,
          download_url: null,
        })))
      } catch {
        return c.json({ message: 'Not found' }, 404)
      }
    }
    // Also try as a directory without an explicit ENOTDIR (some isomorphic-git paths)
    try {
      const entries = await listDirectory(owner, repo, ref, path, c.env.bucket)
      return c.json(entries.map((e) => ({
        name: e.name,
        path: e.path,
        type: e.type === 'dir' ? 'dir' : 'file',
        sha: e.sha,
        download_url: null,
      })))
    } catch {
      return c.json({ message: 'Not found' }, 404)
    }
  }
})

router.put('/repos/:owner/:repo/contents/:path{.*}', v1Auth, async (c) => {
  const { owner, repo, path } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepoWithOwner(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  if (!canWriteRepo(payload, repoRow.owner_id)) return c.json({ message: 'Forbidden' }, 403)

  const body: {
    content?: string
    message?: string
    branch?: string
    new_branch?: string
  } = await c.req.json().catch(() => ({}))
  if (!body.content) return c.json({ message: 'content required' }, 422)

  const user = await getUserById(db, payload.sub as string)
  if (!user) return c.json({ message: 'User not found' }, 404)

  const fs = createR2Fs(c.env.bucket, owner, repo)
  const gitdir = `/${owner}/${repo}.git`
  const sourceRef = body.branch?.trim() || repoRow.default_branch
  const targetBranch = body.new_branch?.trim() || sourceRef

  try {
    if (body.new_branch?.trim()) {
      const sourceOid = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: sourceRef })
      await git.writeRef({
        fs: fs as unknown as Parameters<typeof git.writeRef>[0]['fs'],
        gitdir,
        ref: `refs/heads/${targetBranch}`,
        value: sourceOid,
        force: false,
      })
    }

    const bytes = Uint8Array.from(atob(body.content), (ch) => ch.charCodeAt(0))
    const result = await commitFileToBranch(owner, repo, c.env.bucket, {
      branch: targetBranch,
      filePath: path,
      contentBytes: bytes,
      message: body.message?.trim() || `Update ${path}`,
      authorName: user.display_name ?? user.username,
      authorEmail: user.email,
    })
    const name = path.split('/').filter(Boolean).at(-1) ?? path
    return c.json({
      content: { name, path, sha: result.blobSha },
      commit: { sha: result.commitSha },
      branch: targetBranch,
    })
  } catch {
    return c.json({ message: 'Failed to write file' }, 400)
  }
})

router.get('/repos/:owner/:repo/commits', v1OptionalAuth, async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const sha = c.req.query('sha') ?? c.req.query('branch') ?? 'HEAD'
  try {
    const commits = await listCommits(owner, repo, sha, c.env.bucket)
    return c.json(commits.map((cm) => ({
      sha: cm.oid,
      commit: {
        message: cm.message,
        author: { name: cm.author.name, date: new Date(cm.author.timestamp * 1000).toISOString() },
        committer: null,
      },
      author: null,
      committer: null,
    })))
  } catch {
    return c.json([])
  }
})

router.get('/repos/:owner/:repo/tags', v1OptionalAuth, async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  try {
    const fs = createR2Fs(c.env.bucket, owner, repo)
    const gitdir = `/${owner}/${repo}.git`
    const tags = await git.listTags({ fs: fs as unknown as Parameters<typeof git.listTags>[0]['fs'], gitdir })
    const result = await Promise.all(tags.map(async (name) => {
      try {
        const sha = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: name })
        return { name, message: '', id: sha, commit: { sha, created: '' }, zipball_url: '', tarball_url: '' }
      } catch {
        return { name, message: '', id: '', commit: { sha: '', created: '' }, zipball_url: '', tarball_url: '' }
      }
    }))
    return c.json(result)
  } catch {
    return c.json([])
  }
})

router.post('/repos/:owner/:repo/tags', v1Auth, async (c) => {
  const { owner, repo } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepoWithOwner(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  if (!canWriteRepo(payload, repoRow.owner_id)) return c.json({ message: 'Forbidden' }, 403)

  const body: { tag_name?: string; target?: string } = await c.req.json().catch(() => ({}))
  const tagName = body.tag_name?.trim()
  const target = body.target?.trim() || repoRow.default_branch
  if (!tagName) return c.json({ message: 'tag_name required' }, 422)

  try {
    const fs = createR2Fs(c.env.bucket, owner, repo)
    const gitdir = `/${owner}/${repo}.git`
    const oid = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: target })
    await git.writeRef({
      fs: fs as unknown as Parameters<typeof git.writeRef>[0]['fs'],
      gitdir,
      ref: `refs/tags/${tagName}`,
      value: oid,
      force: false,
    })
    return c.json({ name: tagName, message: '', id: oid, commit: { sha: oid, created: '' }, zipball_url: '', tarball_url: '' }, 201)
  } catch {
    return c.json({ message: 'Failed to create tag' }, 400)
  }
})

router.patch('/repos/:owner/:repo/tags/:tag', v1Auth, async (c) => {
  const { owner, repo, tag } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepoWithOwner(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  if (!canWriteRepo(payload, repoRow.owner_id)) return c.json({ message: 'Forbidden' }, 403)

  const body: { new_name?: string } = await c.req.json().catch(() => ({}))
  const newName = body.new_name?.trim()
  if (!newName) return c.json({ message: 'new_name required' }, 422)

  try {
    const fs = createR2Fs(c.env.bucket, owner, repo)
    const gitdir = `/${owner}/${repo}.git`
    const oid = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: `refs/tags/${tag}` })
    await git.writeRef({
      fs: fs as unknown as Parameters<typeof git.writeRef>[0]['fs'],
      gitdir,
      ref: `refs/tags/${newName}`,
      value: oid,
      force: false,
    })
    await git.deleteRef({
      fs: fs as unknown as Parameters<typeof git.deleteRef>[0]['fs'],
      gitdir,
      ref: `refs/tags/${tag}`,
    })
    return c.json({ name: newName, message: '', id: oid, commit: { sha: oid, created: '' }, zipball_url: '', tarball_url: '' })
  } catch {
    return c.json({ message: 'Failed to rename tag' }, 400)
  }
})

router.delete('/repos/:owner/:repo/tags/:tag', v1Auth, async (c) => {
  const { owner, repo, tag } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepoWithOwner(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  if (!canWriteRepo(payload, repoRow.owner_id)) return c.json({ message: 'Forbidden' }, 403)

  try {
    const fs = createR2Fs(c.env.bucket, owner, repo)
    const gitdir = `/${owner}/${repo}.git`
    await git.deleteRef({
      fs: fs as unknown as Parameters<typeof git.deleteRef>[0]['fs'],
      gitdir,
      ref: `refs/tags/${tag}`,
    })
    return c.body(null, 204)
  } catch {
    return c.json({ message: 'Failed to delete tag' }, 400)
  }
})

router.get('/repos/:owner/:repo/labels', v1OptionalAuth, async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const labels = await db.prepare(
    'SELECT id, name, color, description FROM labels WHERE repo_id = ? ORDER BY name',
  ).bind(repoRow.id).all<{ id: string; name: string; color: string; description: string | null }>()
  return c.json(labels.results.map((l) => ({ id: l.id, name: l.name, color: l.color.replace('#', ''), description: l.description ?? '' })))
})

router.get('/repos/:owner/:repo/milestones', v1OptionalAuth, async (c) => {
  const { owner, repo } = c.req.param()
  const { state = 'open' } = c.req.query()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  let query = 'SELECT id, title, description, due_date, state, created_at, updated_at, closed_at FROM milestones WHERE repo_id = ?'
  const bindings: unknown[] = [repoRow.id]
  if (state !== 'all') { query += ' AND state = ?'; bindings.push(state) }
  query += ' ORDER BY created_at DESC'
  const ms = await db.prepare(query).bind(...bindings).all<{ id: string; title: string; description: string | null; due_date: string | null; state: string; created_at: string; updated_at: string; closed_at: string | null }>()
  return c.json(ms.results.map((m) => ({
    id: m.id, title: m.title, description: m.description ?? '', due_on: m.due_date,
    state: m.state, open_issues: 0, closed_issues: 0,
    created_at: m.created_at, updated_at: m.updated_at, closed_at: m.closed_at,
  })))
})

router.get('/repos/:owner/:repo/milestones/:id', v1OptionalAuth, async (c) => {
  const { owner, repo, id } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const m = await db.prepare(
    'SELECT id, title, description, due_date, state, created_at, updated_at, closed_at FROM milestones WHERE id = ? AND repo_id = ?',
  ).bind(id, repoRow.id).first<{ id: string; title: string; description: string | null; due_date: string | null; state: string; created_at: string; updated_at: string; closed_at: string | null }>()
  if (!m) return c.json({ message: 'Milestone not found' }, 404)
  return c.json({ id: m.id, title: m.title, description: m.description ?? '', due_on: m.due_date, state: m.state, open_issues: 0, closed_issues: 0, created_at: m.created_at, updated_at: m.updated_at, closed_at: m.closed_at })
})

router.get('/repos/:owner/:repo/activities/feeds', v1OptionalAuth, async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const { limit = '20', page = '1' } = c.req.query()
  const offset = (parseInt(page) - 1) * parseInt(limit)
  const rows = await db.prepare(`
    SELECT i.id, i.number, i.title, i.state, i.is_pull, i.created_at,
           u.id as user_id, u.username as user_username, u.email as user_email,
           u.display_name as user_display_name, u.bio as user_bio,
           u.is_admin as user_is_admin, u.created_at as user_created_at
    FROM issues i JOIN users u ON i.creator_id = u.id
    WHERE i.repo_id = ?
    ORDER BY i.created_at DESC LIMIT ? OFFSET ?
  `).bind(repoRow.id, parseInt(limit), offset).all<Record<string, unknown>>()
  return c.json(rows.results.map((i) => ({
    id: i.id,
    op_type: i.is_pull ? 'create_pull_request' : 'create_issue',
    act_user: {
      id: i.user_id, login: i.user_username, full_name: i.user_display_name ?? '',
      email: i.user_email, avatar_url: '', html_url: `/${i.user_username}`,
      is_admin: i.user_is_admin === 1, created: i.user_created_at, description: i.user_bio ?? '',
    },
    repo: null,
    ref_name: '',
    content: JSON.stringify({ Number: i.number, Title: i.title }),
    created: i.created_at,
  })))
})

// ─── Releases ─────────────────────────────────────────────────────────────────

router.get('/repos/:owner/:repo/releases', v1OptionalAuth, async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const releases = await db.prepare(`
    SELECT r.id, r.tag_name, r.name, r.body, r.is_draft, r.is_prerelease, r.created_at,
           u.id as author_id, u.username as author_username, u.email as author_email,
           u.display_name as author_display_name, u.bio as author_bio, u.is_admin as author_is_admin,
           u.created_at as author_created_at
    FROM releases r JOIN users u ON r.creator_id = u.id
    WHERE r.repo_id = ? ORDER BY r.created_at DESC
  `).bind(repoRow.id).all<ReleaseRow>()
  return c.json(releases.results.map(formatRelease))
})

router.get('/repos/:owner/:repo/releases/tags/:tag', v1OptionalAuth, async (c) => {
  const { owner, repo, tag } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const r = await db.prepare(`
    SELECT r.id, r.tag_name, r.name, r.body, r.is_draft, r.is_prerelease, r.created_at,
           u.id as author_id, u.username as author_username, u.email as author_email,
           u.display_name as author_display_name, u.bio as author_bio, u.is_admin as author_is_admin,
           u.created_at as author_created_at
    FROM releases r JOIN users u ON r.creator_id = u.id
    WHERE r.repo_id = ? AND r.tag_name = ?
  `).bind(repoRow.id, tag).first<ReleaseRow>()
  if (!r) return c.json({ message: 'Release not found' }, 404)
  return c.json(formatRelease(r))
})

router.get('/repos/:owner/:repo/releases/latest', v1OptionalAuth, async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const r = await db.prepare(`
    SELECT r.id, r.tag_name, r.name, r.body, r.is_draft, r.is_prerelease, r.created_at,
           u.id as author_id, u.username as author_username, u.email as author_email,
           u.display_name as author_display_name, u.bio as author_bio, u.is_admin as author_is_admin,
           u.created_at as author_created_at
    FROM releases r JOIN users u ON r.creator_id = u.id
    WHERE r.repo_id = ? AND r.is_draft = 0
    ORDER BY r.created_at DESC LIMIT 1
  `).bind(repoRow.id).first<ReleaseRow>()
  if (!r) return c.json({ message: 'Release not found' }, 404)
  return c.json(formatRelease(r))
})

router.get('/repos/:owner/:repo/releases/:id', v1OptionalAuth, async (c) => {
  const { owner, repo, id } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const r = await db.prepare(`
    SELECT r.id, r.tag_name, r.name, r.body, r.is_draft, r.is_prerelease, r.created_at,
           u.id as author_id, u.username as author_username, u.email as author_email,
           u.display_name as author_display_name, u.bio as author_bio, u.is_admin as author_is_admin,
           u.created_at as author_created_at
    FROM releases r JOIN users u ON r.creator_id = u.id
    WHERE r.id = ? AND r.repo_id = ?
  `).bind(id, repoRow.id).first<ReleaseRow>()
  if (!r) return c.json({ message: 'Release not found' }, 404)
  return c.json(formatRelease(r))
})

type ReleaseRow = {
  id: string; tag_name: string; name: string; body: string | null
  is_draft: number; is_prerelease: number; created_at: string
  author_id: string; author_username: string; author_email: string
  author_display_name: string | null; author_bio: string | null
  author_is_admin: number; author_created_at: string
}

function formatRelease(r: ReleaseRow) {
  return {
    id: r.id,
    tag_name: r.tag_name,
    name: r.name,
    body: r.body ?? '',
    draft: r.is_draft === 1,
    prerelease: r.is_prerelease === 1,
    created_at: r.created_at,
    author: {
      id: r.author_id, login: r.author_username, full_name: r.author_display_name ?? '',
      email: r.author_email, avatar_url: '', html_url: `/${r.author_username}`,
      is_admin: r.author_is_admin === 1, created: r.author_created_at, description: r.author_bio ?? '',
    },
  }
}

// ─── Issues ───────────────────────────────────────────────────────────────────

type IssueRow = {
  id: string; number: number; title: string; body: string | null; state: string
  created_at: string; updated_at: string; closed_at: string | null
  user_id: string; user_username: string; user_email: string
  user_display_name: string | null; user_bio: string | null
  user_is_admin: number; user_created_at: string
}

function formatIssueRow(i: Record<string, unknown>) {
  return {
    id: i.id, number: i.number, title: i.title, body: i.body ?? '',
    state: i.state, pull_request: null, labels: [], assignee: null, milestone: null,
    created_at: i.created_at, updated_at: i.updated_at, closed_at: i.closed_at ?? null,
    user: {
      id: i.user_id, login: i.user_username, full_name: i.user_display_name ?? '',
      email: i.user_email, avatar_url: '', html_url: `/${i.user_username}`,
      is_admin: i.user_is_admin === 1, created: i.user_created_at, description: i.user_bio ?? '',
    },
  }
}

function issueQuery() {
  return `
    SELECT i.id, i.number, i.title, i.body, i.state, i.created_at, i.updated_at, i.closed_at,
           i.head_branch, i.base_branch,
           u.id as user_id, u.username as user_username, u.email as user_email,
           u.display_name as user_display_name, u.bio as user_bio,
           u.is_admin as user_is_admin, u.created_at as user_created_at
    FROM issues i JOIN users u ON i.creator_id = u.id
  `
}

type PullIssueRow = Record<string, unknown> & {
  id: string
  number: number
  title: string
  body: string | null
  state: string
  created_at: string
  updated_at: string
  closed_at: string | null
  user_id: string
  user_username: string
  user_email: string
  user_display_name: string | null
  user_bio: string | null
  user_is_admin: number
  user_created_at: string
  head_branch: string | null
  base_branch: string | null
}

async function formatPullRequestRow(
  row: PullIssueRow,
  owner: string,
  repo: string,
  bucket: R2Bucket,
) {
  const headRef = row.head_branch ?? ''
  const baseRef = row.base_branch ?? ''
  const fs = createR2Fs(bucket, owner, repo)
  const gitdir = `/${owner}/${repo}.git`

  let headSha = ''
  let baseSha = ''
  try {
    if (headRef) headSha = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: headRef })
  } catch {}
  try {
    if (baseRef) baseSha = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: baseRef })
  } catch {}

  let mergeable: boolean | null = null
  if (row.state === 'open' && headRef && baseRef) {
    try {
      await git.merge({
        fs: fs as unknown as Parameters<typeof git.merge>[0]['fs'],
        gitdir,
        ours: baseRef,
        theirs: headRef,
        dryRun: true,
        abortOnConflict: true,
      })
      mergeable = true
    } catch {
      mergeable = false
    }
  }

  const merged = row.state === 'closed' && !row.head_branch
  return {
    ...formatIssueRow(row),
    merged,
    merged_at: merged ? row.closed_at : null,
    merge_commit_sha: merged ? baseSha || null : null,
    mergeable,
    head: { label: headRef ? `${owner}:${headRef}` : '', ref: headRef, sha: headSha, repo: null },
    base: { label: baseRef ? `${owner}:${baseRef}` : '', ref: baseRef, sha: baseSha, repo: null },
  }
}

router.get('/repos/:owner/:repo/issues', v1OptionalAuth, async (c) => {
  const { owner, repo } = c.req.param()
  const { state = 'open', type = 'issues', page = '1', limit = '20' } = c.req.query()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const offset = (parseInt(page) - 1) * parseInt(limit)
  const isPull = type === 'pulls' ? 1 : 0
  const issues = await db.prepare(
    issueQuery() + ' WHERE i.repo_id = ? AND i.is_pull = ? AND i.state = ? ORDER BY i.created_at DESC LIMIT ? OFFSET ?',
  ).bind(repoRow.id, isPull, state, parseInt(limit), offset).all()
  return c.json((issues.results as Array<Record<string, unknown>>).map(formatIssueRow))
})

router.get('/repos/:owner/:repo/issues/:index', v1OptionalAuth, async (c) => {
  const { owner, repo, index } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const issue = await db.prepare(
    issueQuery() + ' WHERE i.repo_id = ? AND i.number = ?',
  ).bind(repoRow.id, parseInt(index)).first()
  if (!issue) return c.json({ message: 'Issue not found' }, 404)
  return c.json(formatIssueRow(issue as Record<string, unknown>))
})

router.patch('/repos/:owner/:repo/issues/:index', v1Auth, async (c) => {
  const { owner, repo, index } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)

  const issue = await db.prepare('SELECT id, creator_id FROM issues WHERE repo_id = ? AND number = ?')
    .bind(repoRow.id, parseInt(index)).first<{ id: string; creator_id: string }>()
  if (!issue) return c.json({ message: 'Issue not found' }, 404)
  if (issue.creator_id !== payload.sub && repoRow.owner_id !== payload.sub && !payload['isAdmin']) {
    return c.json({ message: 'Forbidden' }, 403)
  }

  const body: {
    title?: string
    body?: string
    state?: 'open' | 'closed'
    assignees?: string[]
    milestone?: number | string | null
  } = await c.req.json().catch(() => ({}))

  const updates: string[] = [`updated_at = datetime('now')`]
  const bindings: unknown[] = []
  if (typeof body.title === 'string' && body.title.trim()) {
    updates.push('title = ?')
    bindings.push(body.title.trim())
  }
  if (typeof body.body === 'string') {
    updates.push('body = ?')
    bindings.push(body.body)
  }
  if (body.state === 'open' || body.state === 'closed') {
    updates.push('state = ?')
    bindings.push(body.state)
    updates.push(body.state === 'closed' ? "closed_at = datetime('now')" : 'closed_at = NULL')
  }
  if (Object.hasOwn(body, 'assignees')) {
    const assignee = Array.isArray(body.assignees) && body.assignees.length > 0
      ? await getUser(db, body.assignees[0] as string)
      : null
    updates.push('assignee_id = ?')
    bindings.push(assignee?.id ?? null)
  }
  if (Object.hasOwn(body, 'milestone')) {
    updates.push('milestone_id = ?')
    bindings.push(body.milestone ? String(body.milestone) : null)
  }
  bindings.push(issue.id)
  await db.prepare(`UPDATE issues SET ${updates.join(', ')} WHERE id = ?`).bind(...bindings).run()

  const updated = await db.prepare(
    issueQuery() + ' WHERE i.repo_id = ? AND i.number = ?',
  ).bind(repoRow.id, parseInt(index)).first()
  return c.json(formatIssueRow(updated as Record<string, unknown>))
})

router.get('/repos/:owner/:repo/issues/:index/comments', v1OptionalAuth, async (c) => {
  const { owner, repo, index } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const issue = await db.prepare('SELECT id FROM issues WHERE repo_id = ? AND number = ?').bind(repoRow.id, parseInt(index)).first<{ id: string }>()
  if (!issue) return c.json({ message: 'Issue not found' }, 404)
  const comments = await db.prepare(`
    SELECT ic.id, ic.body, ic.created_at, ic.updated_at,
           u.id as user_id, u.username as user_username, u.email as user_email,
           u.display_name as user_display_name, u.bio as user_bio,
           u.is_admin as user_is_admin, u.created_at as user_created_at
    FROM issue_comments ic JOIN users u ON ic.user_id = u.id
    WHERE ic.issue_id = ? ORDER BY ic.created_at ASC
  `).bind(issue.id).all()
  return c.json((comments.results as Array<Record<string, unknown>>).map((cm) => ({
    id: cm.id, body: cm.body,
    created_at: cm.created_at, updated_at: cm.updated_at,
    user: {
      id: cm.user_id, login: cm.user_username, full_name: cm.user_display_name ?? '',
      email: cm.user_email, avatar_url: '', html_url: `/${cm.user_username}`,
      is_admin: cm.user_is_admin === 1, created: cm.user_created_at, description: cm.user_bio ?? '',
    },
  })))
})

router.post('/repos/:owner/:repo/issues', v1Auth, async (c) => {
  const { owner, repo } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const body = await c.req.json<{ title?: string; body?: string; milestone_id?: string; assignee?: string }>()
    .catch(() => ({ title: undefined, body: undefined, milestone_id: undefined, assignee: undefined }))
  if (!body.title) return c.json({ message: 'Title required' }, 422)
  const maxRow = await db.prepare('SELECT MAX(number) as max FROM issues WHERE repo_id = ?').bind(repoRow.id).first<{ max: number | null }>()
  const number = (maxRow?.max ?? 0) + 1
  const id = crypto.randomUUID()
  await db.prepare('INSERT INTO issues (id, repo_id, number, title, body, creator_id) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(id, repoRow.id, number, body.title, body.body ?? null, payload.sub).run()
  const issue = await db.prepare(issueQuery() + ' WHERE i.id = ?').bind(id).first()
  return c.json(formatIssueRow(issue as Record<string, unknown>), 201)
})

router.post('/repos/:owner/:repo/issues/:index/comments', v1Auth, async (c) => {
  const { owner, repo, index } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const issue = await db.prepare('SELECT id FROM issues WHERE repo_id = ? AND number = ?').bind(repoRow.id, parseInt(index)).first<{ id: string }>()
  if (!issue) return c.json({ message: 'Issue not found' }, 404)
  const body = await c.req.json<{ body?: string }>().catch(() => ({ body: undefined }))
  if (!body.body) return c.json({ message: 'Body required' }, 422)
  const id = crypto.randomUUID()
  await db.prepare('INSERT INTO issue_comments (id, issue_id, user_id, body) VALUES (?, ?, ?, ?)').bind(id, issue.id, payload.sub, body.body).run()
  const u = await db.prepare('SELECT id, username, email, display_name, bio, is_admin, created_at FROM users WHERE id = ?').bind(payload.sub).first<UserRow>()
  return c.json({ id, body: body.body, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), user: u ? formatUser(u) : null }, 201)
})

// ─── Pull requests (alias for issues with is_pull=1) ──────────────────────────

router.get('/repos/:owner/:repo/pulls', v1OptionalAuth, async (c) => {
  const { owner, repo } = c.req.param()
  const { state = 'open', page = '1', limit = '20' } = c.req.query()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const offset = (parseInt(page) - 1) * parseInt(limit)
  const issues = await db.prepare(
    issueQuery() + ' WHERE i.repo_id = ? AND i.is_pull = 1 AND i.state = ? ORDER BY i.created_at DESC LIMIT ? OFFSET ?',
  ).bind(repoRow.id, state, parseInt(limit), offset).all()
  return c.json(await Promise.all((issues.results as PullIssueRow[]).map((row) => formatPullRequestRow(row, owner, repo, c.env.bucket))))
})

router.get('/repos/:owner/:repo/pulls/:index', v1OptionalAuth, async (c) => {
  const { owner, repo, index } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const pull = await db.prepare(
    issueQuery() + ' WHERE i.repo_id = ? AND i.number = ? AND i.is_pull = 1',
  ).bind(repoRow.id, parseInt(index)).first<PullIssueRow>()
  if (!pull) return c.json({ message: 'Pull request not found' }, 404)
  return c.json(await formatPullRequestRow(pull, owner, repo, c.env.bucket))
})

router.post('/repos/:owner/:repo/pulls', v1Auth, async (c) => {
  const { owner, repo } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)

  const body: { title?: string; body?: string; head?: string; base?: string } = await c.req.json().catch(() => ({}))
  if (!body.title?.trim() || !body.head?.trim() || !body.base?.trim()) {
    return c.json({ message: 'title, head and base are required' }, 422)
  }

  const maxRow = await db.prepare('SELECT MAX(number) as max FROM issues WHERE repo_id = ?').bind(repoRow.id).first<{ max: number | null }>()
  const number = (maxRow?.max ?? 0) + 1
  const id = crypto.randomUUID()
  await db.prepare(`
    INSERT INTO issues (id, repo_id, number, title, body, creator_id, is_pull, head_branch, base_branch)
    VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
  `).bind(id, repoRow.id, number, body.title.trim(), body.body ?? null, payload.sub, body.head.trim(), body.base.trim()).run()

  const pull = await db.prepare(`
    SELECT i.id, i.number, i.title, i.body, i.state, i.created_at, i.updated_at, i.closed_at,
           u.id as user_id, u.username as user_username, u.email as user_email,
           u.display_name as user_display_name, u.bio as user_bio,
           u.is_admin as user_is_admin, u.created_at as user_created_at,
           i.head_branch, i.base_branch
    FROM issues i JOIN users u ON i.creator_id = u.id
    WHERE i.id = ?
  `).bind(id).first<PullIssueRow>()
  return c.json(await formatPullRequestRow(pull as PullIssueRow, owner, repo, c.env.bucket), 201)
})

router.post('/repos/:owner/:repo/pulls/:index/merge', v1Auth, async (c) => {
  const { owner, repo, index } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)

  const pull = await db.prepare(`
    SELECT i.id, i.number, i.title, i.state, i.head_branch, i.base_branch
    FROM issues i
    WHERE i.repo_id = ? AND i.number = ? AND i.is_pull = 1
  `).bind(repoRow.id, parseInt(index)).first<{ id: string; number: number; title: string; state: string; head_branch: string | null; base_branch: string | null }>()
  if (!pull) return c.json({ message: 'Pull request not found' }, 404)
  if (pull.state !== 'open') return c.json({ message: 'Pull request is not open' }, 400)
  if (!pull.head_branch || !pull.base_branch) return c.json({ message: 'Pull request branches are missing' }, 400)

  const user = await getUserById(db, payload.sub as string)
  if (!user) return c.json({ message: 'User not found' }, 404)

  const body: { Do?: 'merge' | 'squash' | 'rebase' } = await c.req.json().catch(() => ({}))
  const method = body.Do ?? 'merge'

  try {
    const fs = createR2Fs(c.env.bucket, owner, repo)
    const gitdir = `/${owner}/${repo}.git`
    const headOid = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: pull.head_branch })
    const baseOid = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: pull.base_branch })
    const ffPossible = await git.isDescendent({
      fs: fs as unknown as Parameters<typeof git.isDescendent>[0]['fs'],
      gitdir,
      oid: headOid,
      ancestor: baseOid,
    })

    if (ffPossible) {
      await git.writeRef({
        fs: fs as unknown as Parameters<typeof git.writeRef>[0]['fs'],
        gitdir,
        ref: `refs/heads/${pull.base_branch}`,
        value: headOid,
        force: true,
      })
    } else {
      await git.merge({
        fs: fs as unknown as Parameters<typeof git.merge>[0]['fs'],
        gitdir,
        ours: pull.base_branch,
        theirs: pull.head_branch,
        message: `${method} pull request #${pull.number}: ${pull.title}`,
        author: { name: user.display_name ?? user.username, email: user.email, timestamp: Math.floor(Date.now() / 1000), timezoneOffset: 0 },
        committer: { name: user.display_name ?? user.username, email: user.email, timestamp: Math.floor(Date.now() / 1000), timezoneOffset: 0 },
      })
    }

    const mergedSha = await git.resolveRef({ fs: fs as unknown as Parameters<typeof git.resolveRef>[0]['fs'], gitdir, ref: pull.base_branch })
    await db.prepare("UPDATE issues SET state = 'closed', closed_at = datetime('now'), updated_at = datetime('now'), head_branch = NULL WHERE id = ?")
      .bind(pull.id).run()
    return c.json({ sha: mergedSha, merged: true, message: `Pull request ${method}d` })
  } catch {
    return c.json({ message: 'Failed to merge pull request' }, 400)
  }
})

// ─── Wiki ─────────────────────────────────────────────────────────────────────

router.get('/repos/:owner/:repo/wiki/page/:pageName', v1OptionalAuth, async (c) => {
  const { owner, repo, pageName } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const page = await db.prepare(
    'SELECT id, title, content, created_at, updated_at FROM wiki_pages WHERE repo_id = ? AND title = ?',
  ).bind(repoRow.id, decodeURIComponent(pageName)).first<{ id: string; title: string; content: string; created_at: string; updated_at: string }>()
  if (!page) return c.json({ message: 'Wiki page not found' }, 404)
  const encoded = btoa(unescape(encodeURIComponent(page.content)))
  return c.json({
    title: page.title,
    content_base64: encoded,
    last_commit: { message: '', author: { name: '', date: page.updated_at }, committer: null, sha: '' },
  })
})

router.get('/repos/:owner/:repo/wiki/pages', v1OptionalAuth, async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ message: 'Repository not found' }, 404)
  const pages = await db.prepare(
    'SELECT id, title, updated_at FROM wiki_pages WHERE repo_id = ? ORDER BY updated_at DESC',
  ).bind(repoRow.id).all<{ id: string; title: string; updated_at: string }>()
  return c.json(pages.results.map((p) => ({ title: p.title, last_commit: { message: '', author: { name: '', date: p.updated_at }, committer: null, sha: '' } })))
})

// ─── Notifications ────────────────────────────────────────────────────────────

router.get('/notifications', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const notifications = await db.prepare(
    'SELECT id, subject_type, subject_title, repo_id, is_read, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
  ).bind(payload.sub).all<{ id: string; subject_type: string; subject_title: string; repo_id: string | null; is_read: number; created_at: string }>()
  return c.json(notifications.results.map((n) => ({
    id: n.id, unread: n.is_read === 0, reason: 'subscribed',
    subject: { title: n.subject_title, type: n.subject_type },
    repository: null, updated_at: n.created_at,
  })))
})

router.put('/notifications', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  await db.prepare('UPDATE notifications SET is_read = 1 WHERE user_id = ?').bind(payload.sub).run()
  return c.body(null, 205)
})

router.patch('/notifications/threads/:id', v1Auth, async (c) => {
  const { id } = c.req.param()
  const payload = c.get('user' as never) as JWTPayload
  const db = c.env.database
  await db.prepare('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?').bind(id, payload.sub).run()
  return c.body(null, 205)
})

// ─── Admin ────────────────────────────────────────────────────────────────────

router.get('/admin/orgs', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  if (!payload['isAdmin']) return c.json({ message: 'Forbidden' }, 403)
  const db = c.env.database
  const orgs = await db.prepare(
    'SELECT id, name, display_name, description, visibility, created_at FROM organizations ORDER BY created_at DESC',
  ).all<{ id: string; name: string; display_name: string | null; description: string | null; visibility: string; created_at: string }>()
  return c.json(orgs.results.map((o) => ({ id: o.id, username: o.name, full_name: o.display_name ?? '', description: o.description ?? '', visibility: o.visibility, avatar_url: '', created: o.created_at })))
})

router.get('/admin/users', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  if (!payload['isAdmin']) return c.json({ message: 'Forbidden' }, 403)
  const db = c.env.database
  const users = await db.prepare(
    'SELECT id, username, email, display_name, bio, is_admin, created_at FROM users ORDER BY created_at DESC',
  ).all<UserRow>()
  return c.json(users.results.map(formatUser))
})

router.post('/admin/users', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  if (!payload['isAdmin']) return c.json({ message: 'Forbidden' }, 403)
  const db = c.env.database
  const body = await c.req.json<{ username?: string; email?: string; password?: string; is_admin?: boolean }>()
    .catch(() => ({ username: undefined, email: undefined, password: undefined, is_admin: undefined }))
  if (!body.username || !body.email || !body.password) return c.json({ message: 'username, email and password required' }, 422)
  const existing = await db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').bind(body.username, body.email).first()
  if (existing) return c.json({ message: 'User already exists' }, 409)
  const id = crypto.randomUUID()
  const hash = await hashPassword(body.password)
  await db.prepare('INSERT INTO users (id, username, email, password_hash, is_admin) VALUES (?, ?, ?, ?, ?)')
    .bind(id, body.username, body.email, hash, body.is_admin ? 1 : 0).run()
  const u = await db.prepare('SELECT id, username, email, display_name, bio, is_admin, created_at FROM users WHERE id = ?').bind(id).first<UserRow>()
  return c.json(formatUser(u!), 201)
})

router.get('/admin/users/:username', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  if (!payload['isAdmin']) return c.json({ message: 'Forbidden' }, 403)
  const { username } = c.req.param()
  const db = c.env.database
  const u = await getUser(db, username)
  if (!u) return c.json({ message: 'User not found' }, 404)
  return c.json(formatUser(u))
})

router.put('/admin/users/:username', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  if (!payload['isAdmin']) return c.json({ message: 'Forbidden' }, 403)
  const { username } = c.req.param()
  const db = c.env.database
  const u = await getUser(db, username)
  if (!u) return c.json({ message: 'User not found' }, 404)
  const body = await c.req.json<{ full_name?: string; description?: string; is_admin?: boolean; login_name?: string; source_id?: number }>()
    .catch((): { full_name?: string; description?: string; is_admin?: boolean; login_name?: string; source_id?: number } => ({}))
  if (body.full_name !== undefined || body.description !== undefined || body.is_admin !== undefined) {
    await db.prepare("UPDATE users SET display_name = ?, bio = ?, is_admin = ?, updated_at = datetime('now') WHERE id = ?")
      .bind(body.full_name ?? u.display_name, body.description ?? u.bio, body.is_admin !== undefined ? (body.is_admin ? 1 : 0) : u.is_admin, u.id).run()
  }
  const updated = await db.prepare('SELECT id, username, email, display_name, bio, is_admin, created_at FROM users WHERE id = ?').bind(u.id).first<UserRow>()
  return c.json(formatUser(updated!))
})

router.delete('/admin/users/:username', v1Auth, async (c) => {
  const payload = c.get('user' as never) as JWTPayload
  if (!payload['isAdmin']) return c.json({ message: 'Forbidden' }, 403)
  const { username } = c.req.param()
  const db = c.env.database
  const u = await getUser(db, username)
  if (!u) return c.json({ message: 'User not found' }, 404)
  await db.prepare('DELETE FROM users WHERE id = ?').bind(u.id).run()
  return c.body(null, 204)
})

export default router
