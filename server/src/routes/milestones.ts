import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { authMiddleware } from '../middleware/auth'
import { Env } from '../index'
import type { JWTPayload } from 'jose'

const router = new Hono<{ Bindings: Env }>()

async function getRepo(db: D1Database, owner: string, repo: string) {
  return db.prepare(`
    SELECT r.id, r.owner_id FROM repositories r
    JOIN users u ON r.owner_id = u.id
    WHERE u.username = ? AND r.name = ?
  `).bind(owner, repo).first<{ id: string; owner_id: string }>()
}

router.get('/:owner/:repo/milestones', async (c) => {
  const { owner, repo } = c.req.param()
  const { state = 'open' } = c.req.query()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)

  let query = 'SELECT id, title, description, due_date, state, created_at, updated_at, closed_at FROM milestones WHERE repo_id = ?'
  const bindings: unknown[] = [repoRow.id]
  if (state !== 'all') { query += ' AND state = ?'; bindings.push(state) }
  query += ' ORDER BY created_at DESC'

  const milestones = await db.prepare(query).bind(...bindings).all()
  return c.json({ milestones: milestones.results })
})

const createMilestoneSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(65535).optional(),
  due_date: z.string().optional(),
})

router.post('/:owner/:repo/milestones', authMiddleware, zValidator('json', createMilestoneSchema), async (c) => {
  const { owner, repo } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  if (repoRow.owner_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const { title, description, due_date } = c.req.valid('json')
  const id = crypto.randomUUID()
  await db.prepare('INSERT INTO milestones (id, repo_id, title, description, due_date) VALUES (?, ?, ?, ?, ?)')
    .bind(id, repoRow.id, title, description ?? null, due_date ?? null).run()
  return c.json({ id, title }, 201)
})

router.get('/:owner/:repo/milestones/:id', async (c) => {
  const { owner, repo, id } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  const m = await db.prepare('SELECT id, title, description, due_date, state, created_at, updated_at, closed_at FROM milestones WHERE id = ? AND repo_id = ?').bind(id, repoRow.id).first()
  if (!m) return c.json({ error: 'Milestone not found' }, 404)
  return c.json({ milestone: m })
})

const updateMilestoneSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  description: z.string().max(65535).nullable().optional(),
  due_date: z.string().nullable().optional(),
  state: z.enum(['open', 'closed']).optional(),
})

router.patch('/:owner/:repo/milestones/:id', authMiddleware, zValidator('json', updateMilestoneSchema), async (c) => {
  const { owner, repo, id } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  if (repoRow.owner_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const { title, description, due_date, state } = c.req.valid('json')
  const updates: string[] = ["updated_at = datetime('now')"]
  const bindings: unknown[] = []
  if (title !== undefined) { updates.push('title = ?'); bindings.push(title) }
  if (description !== undefined) { updates.push('description = ?'); bindings.push(description) }
  if (due_date !== undefined) { updates.push('due_date = ?'); bindings.push(due_date) }
  if (state !== undefined) {
    updates.push('state = ?'); bindings.push(state)
    if (state === 'closed') updates.push("closed_at = datetime('now')")
    else updates.push('closed_at = NULL')
  }
  bindings.push(id, repoRow.id)
  await db.prepare(`UPDATE milestones SET ${updates.join(', ')} WHERE id = ? AND repo_id = ?`).bind(...bindings).run()
  return c.json({ success: true })
})

router.delete('/:owner/:repo/milestones/:id', authMiddleware, async (c) => {
  const { owner, repo, id } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  if (repoRow.owner_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)
  await db.prepare('DELETE FROM milestones WHERE id = ? AND repo_id = ?').bind(id, repoRow.id).run()
  return c.json({ success: true })
})

export default router
