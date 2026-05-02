import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { authMiddleware } from '../middleware/auth'
import { Env } from '../index'
import type { JWTPayload } from 'jose'

const router = new Hono<{ Bindings: Env }>()

router.get('/:username', async (c) => {
  const { username } = c.req.param()
  const db = c.env.DB

  const user = await db
    .prepare('SELECT id, username, display_name, bio, created_at FROM users WHERE username = ?')
    .bind(username)
    .first<{ id: string; username: string; display_name: string | null; bio: string | null; created_at: string }>()

  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }

  const repos = await db
    .prepare('SELECT id, name, description, is_private, default_branch, created_at FROM repositories WHERE owner_id = ? AND is_private = 0')
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
  const db = c.env.DB

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
