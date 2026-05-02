import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { authMiddleware } from '../middleware/auth'
import { Env } from '../index'
import type { JWTPayload } from 'jose'

const router = new Hono<{ Bindings: Env }>()

const adminCheck = authMiddleware

router.get('/users', adminCheck, async (c) => {
  const user = c.get('user' as never) as JWTPayload
  if (!user['isAdmin']) {
    return c.json({ error: 'Forbidden' }, 403)
  }

  const db = c.env.DB
  const users = await db
    .prepare('SELECT id, username, email, display_name, bio, is_admin, created_at FROM users ORDER BY created_at DESC')
    .all()

  return c.json({ users: users.results })
})

const updateUserSchema = z.object({
  display_name: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
  is_admin: z.boolean().optional(),
})

router.put('/users/:id', adminCheck, zValidator('json', updateUserSchema), async (c) => {
  const currentUser = c.get('user' as never) as JWTPayload
  if (!currentUser['isAdmin']) {
    return c.json({ error: 'Forbidden' }, 403)
  }

  const { id } = c.req.param()
  const { display_name, bio, is_admin } = c.req.valid('json')
  const db = c.env.DB

  const target = await db.prepare('SELECT id FROM users WHERE id = ?').bind(id).first()
  if (!target) {
    return c.json({ error: 'User not found' }, 404)
  }

  const updates: string[] = []
  const bindings: unknown[] = []

  if (display_name !== undefined) { updates.push('display_name = ?'); bindings.push(display_name) }
  if (bio !== undefined) { updates.push('bio = ?'); bindings.push(bio) }
  if (is_admin !== undefined) { updates.push('is_admin = ?'); bindings.push(is_admin ? 1 : 0) }
  updates.push("updated_at = datetime('now')")

  if (updates.length > 1) {
    bindings.push(id)
    await db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).bind(...bindings).run()
  }

  return c.json({ success: true })
})

export default router
