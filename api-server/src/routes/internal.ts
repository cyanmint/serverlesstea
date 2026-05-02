import { Hono } from 'hono'
import { verifyPassword } from '../auth/password'
import { Env } from '../index'

const router = new Hono<{ Bindings: Env }>()

router.get('/check-access', async (c) => {
  const owner = c.req.query('owner')
  const repoName = c.req.query('repo')
  const action = c.req.query('action') === 'write' ? 'write' : 'read'
  const authHeader = c.req.header('Authorization')
  const db = c.env.DB

  const repo = owner && repoName
    ? await db
        .prepare(`
          SELECT r.id, r.owner_id, r.is_private
          FROM repositories r
          JOIN users u ON r.owner_id = u.id
          WHERE u.username = ? AND r.name = ?
        `)
        .bind(owner, repoName)
        .first<{ id: string; owner_id: string; is_private: number }>()
    : null

  if (owner && repoName && !repo) {
    return c.json({ error: 'Repository not found' }, 404)
  }

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    if (repo && action === 'read' && repo.is_private === 0) {
      return c.json({ valid: true, username: 'anonymous', userId: null, action, access: 'public' })
    }
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const base64 = authHeader.slice(6)
  let decoded: string
  try {
    decoded = atob(base64)
  } catch {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const colonIdx = decoded.indexOf(':')
  if (colonIdx === -1) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const username = decoded.slice(0, colonIdx)
  const password = decoded.slice(colonIdx + 1)

  const user = await db
    .prepare('SELECT id, username, password_hash FROM users WHERE username = ?')
    .bind(username)
    .first<{ id: string; username: string; password_hash: string }>()

  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const valid = await verifyPassword(password, user.password_hash)
  if (!valid) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  if (!repo) {
    return c.json({ valid: true, userId: user.id, username: user.username })
  }

  if (repo.owner_id === user.id) {
    return c.json({ valid: true, userId: user.id, username: user.username, action, access: 'owner' })
  }

  const collaborator = await db
    .prepare('SELECT role FROM repo_collaborators WHERE repo_id = ? AND user_id = ?')
    .bind(repo.id, user.id)
    .first<{ role: string }>()

  if (action === 'read') {
    if (repo.is_private === 0 || collaborator) {
      return c.json({ valid: true, userId: user.id, username: user.username, action, access: collaborator ? 'collaborator' : 'public' })
    }
    return c.json({ error: 'Forbidden' }, 403)
  }

  if (collaborator && collaborator.role !== 'read') {
    return c.json({ valid: true, userId: user.id, username: user.username, action, access: 'collaborator' })
  }

  return c.json({ error: 'Forbidden' }, 403)
})

export default router
