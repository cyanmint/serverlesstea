import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth'
import { Env } from '../index'
import type { JWTPayload } from 'jose'

const router = new Hono<{ Bindings: Env }>()

router.get('/', authMiddleware, async (c) => {
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const { is_read } = c.req.query()

  let query = 'SELECT id, subject_type, subject_id, subject_title, repo_id, is_read, created_at FROM notifications WHERE user_id = ?'
  const bindings: unknown[] = [user.sub]
  if (is_read !== undefined) {
    query += ' AND is_read = ?'
    bindings.push(is_read === '1' ? 1 : 0)
  }
  query += ' ORDER BY created_at DESC LIMIT 50'

  const notifications = await db.prepare(query).bind(...bindings).all()
  return c.json({ notifications: notifications.results })
})

router.patch('/:id', authMiddleware, async (c) => {
  const { id } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  await db.prepare('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?').bind(id, user.sub).run()
  return c.json({ success: true })
})

export default router
