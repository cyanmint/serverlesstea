import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { authMiddleware } from '../middleware/auth'
import { Env } from '../index'
import type { JWTPayload } from 'jose'
import { verifyToken } from '../auth/jwt'

const router = new Hono<{ Bindings: Env }>()

router.get('/me', authMiddleware, async (c) => {
  const currentUser = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const user = await db
    .prepare('SELECT id, username, email, display_name, bio, is_admin, created_at FROM users WHERE id = ?')
    .bind(currentUser.sub)
    .first<{ id: string; username: string; email: string; display_name: string | null; bio: string | null; is_admin: number; created_at: string }>()

  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }

  const repos = await db
    .prepare('SELECT id, name, description, is_private, default_branch, created_at FROM repositories WHERE owner_id = ? ORDER BY created_at DESC')
    .bind(user.id)
    .all()

  return c.json({ user: { ...user, isAdmin: user.is_admin === 1 }, repos: repos.results })
})

router.get('/:username', async (c) => {
  const { username } = c.req.param()
  const db = c.env.database

  const user = await db
    .prepare('SELECT id, username, display_name, bio, created_at FROM users WHERE username = ?')
    .bind(username)
    .first<{ id: string; username: string; display_name: string | null; bio: string | null; created_at: string }>()

  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }

  // Check if the requester is the owner or an admin — if so, include private repos
  let isOwnerOrAdmin = false
  const authHeader = c.req.header('Authorization')
  if (authHeader?.startsWith('Bearer ')) {
    try {
      const payload = await verifyToken(authHeader.slice(7), c.env.JWT_SECRET)
      isOwnerOrAdmin = payload.sub === user.id || payload['isAdmin'] === true
    } catch {
      // invalid token — treat as anonymous
    }
  }

  const repos = await db
    .prepare(
      isOwnerOrAdmin
        ? 'SELECT id, name, description, is_private, default_branch, created_at FROM repositories WHERE owner_id = ? ORDER BY created_at DESC'
        : 'SELECT id, name, description, is_private, default_branch, created_at FROM repositories WHERE owner_id = ? AND is_private = 0 ORDER BY created_at DESC'
    )
    .bind(user.id)
    .all()

  return c.json({ user, repos: repos.results })
})

const updateSchema = z.object({
  display_name: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
})

router.put('/:username', authMiddleware, zValidator('json', updateSchema), async (c) => {
  const { username } = c.req.param()
  const currentUser = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const target = await db
    .prepare('SELECT id FROM users WHERE username = ?')
    .bind(username)
    .first<{ id: string }>()

  if (!target) {
    return c.json({ error: 'User not found' }, 404)
  }

  if (currentUser.sub !== target.id && !currentUser['isAdmin']) {
    return c.json({ error: 'Forbidden' }, 403)
  }

  const { display_name, bio } = c.req.valid('json')

  await db
    .prepare("UPDATE users SET display_name = ?, bio = ?, updated_at = datetime('now') WHERE id = ?")
    .bind(display_name ?? null, bio ?? null, target.id)
    .run()

  return c.json({ success: true })
})

export default router
