import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { authMiddleware } from '../middleware/auth'
import { Env } from '../index'
import type { JWTPayload } from 'jose'

const router = new Hono<{ Bindings: Env }>()

router.get('/', authMiddleware, async (c) => {
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const keys = await db.prepare('SELECT id, title, key_content, created_at FROM ssh_keys WHERE user_id = ? ORDER BY created_at DESC').bind(user.sub).all()
  return c.json({ keys: keys.results })
})

const addKeySchema = z.object({
  title: z.string().min(1).max(200),
  key: z.string().min(1),
})

router.post('/', authMiddleware, zValidator('json', addKeySchema), async (c) => {
  const user = c.get('user' as never) as JWTPayload
  const { title, key } = c.req.valid('json')
  const db = c.env.database

  const id = crypto.randomUUID()
  await db.prepare('INSERT INTO ssh_keys (id, user_id, title, key_content) VALUES (?, ?, ?, ?)')
    .bind(id, user.sub, title, key).run()
  return c.json({ id, title }, 201)
})

router.delete('/:id', authMiddleware, async (c) => {
  const { id } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const keyRow = await db.prepare('SELECT user_id FROM ssh_keys WHERE id = ?').bind(id).first<{ user_id: string }>()
  if (!keyRow) return c.json({ error: 'Key not found' }, 404)
  if (keyRow.user_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  await db.prepare('DELETE FROM ssh_keys WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

export default router
