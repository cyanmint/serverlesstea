import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth'
import { Env } from '../index'
import type { JWTPayload } from 'jose'

const router = new Hono<{ Bindings: Env }>()

router.get('/issues', authMiddleware, async (c) => {
  const user = c.get('user' as never) as JWTPayload
  const { type = 'issues', state = 'open' } = c.req.query()
  const db = c.env.database

  const isPull = type === 'pulls' ? 1 : 0
  let query = `
    SELECT i.id, i.number, i.title, i.state, i.is_pull, i.created_at,
           u.username as creator_username,
           r.name as repo_name, ru.username as repo_owner
    FROM issues i
    JOIN users u ON i.creator_id = u.id
    JOIN repositories r ON i.repo_id = r.id
    JOIN users ru ON r.owner_id = ru.id
    WHERE (i.creator_id = ? OR i.assignee_id = ?) AND i.is_pull = ?
  `
  const bindings: unknown[] = [user.sub, user.sub, isPull]
  if (state !== 'all') { query += ' AND i.state = ?'; bindings.push(state) }
  query += ' ORDER BY i.created_at DESC LIMIT 50'

  const issues = await db.prepare(query).bind(...bindings).all()
  return c.json({ issues: issues.results })
})

router.get('/milestones', authMiddleware, async (c) => {
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const milestones = await db.prepare(`
    SELECT m.id, m.title, m.description, m.due_date, m.state, m.created_at,
           r.name as repo_name, u.username as repo_owner
    FROM milestones m
    JOIN repositories r ON m.repo_id = r.id
    JOIN users u ON r.owner_id = u.id
    WHERE r.owner_id = ?
    ORDER BY m.created_at DESC LIMIT 50
  `).bind(user.sub).all()
  return c.json({ milestones: milestones.results })
})

export default router
