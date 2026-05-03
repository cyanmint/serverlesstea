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

router.get('/:owner/:repo/labels', async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  const labels = await db.prepare('SELECT id, name, color, description FROM labels WHERE repo_id = ? ORDER BY name').bind(repoRow.id).all()
  return c.json({ labels: labels.results })
})

const labelSchema = z.object({
  name: z.string().min(1).max(100),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#0075ca'),
  description: z.string().max(500).optional(),
})

router.post('/:owner/:repo/labels', authMiddleware, zValidator('json', labelSchema), async (c) => {
  const { owner, repo } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  if (repoRow.owner_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const { name, color, description } = c.req.valid('json')
  const id = crypto.randomUUID()
  await db.prepare('INSERT INTO labels (id, repo_id, name, color, description) VALUES (?, ?, ?, ?, ?)')
    .bind(id, repoRow.id, name, color, description ?? null).run()
  return c.json({ id, name, color, description }, 201)
})

const updateLabelSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  description: z.string().max(500).nullable().optional(),
})

router.patch('/:owner/:repo/labels/:id', authMiddleware, zValidator('json', updateLabelSchema), async (c) => {
  const { owner, repo, id } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  if (repoRow.owner_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const { name, color, description } = c.req.valid('json')
  const updates: string[] = []
  const bindings: unknown[] = []
  if (name !== undefined) { updates.push('name = ?'); bindings.push(name) }
  if (color !== undefined) { updates.push('color = ?'); bindings.push(color) }
  if (description !== undefined) { updates.push('description = ?'); bindings.push(description) }
  if (updates.length === 0) return c.json({ success: true })
  bindings.push(id, repoRow.id)
  await db.prepare(`UPDATE labels SET ${updates.join(', ')} WHERE id = ? AND repo_id = ?`).bind(...bindings).run()
  return c.json({ success: true })
})

router.delete('/:owner/:repo/labels/:id', authMiddleware, async (c) => {
  const { owner, repo, id } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  if (repoRow.owner_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)
  await db.prepare('DELETE FROM labels WHERE id = ? AND repo_id = ?').bind(id, repoRow.id).run()
  return c.json({ success: true })
})

export default router
