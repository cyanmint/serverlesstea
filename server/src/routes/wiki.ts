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

router.get('/:owner/:repo/wiki', async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  const pages = await db.prepare(`
    SELECT w.id, w.title, w.updated_at, u.username as creator_username
    FROM wiki_pages w JOIN users u ON w.creator_id = u.id
    WHERE w.repo_id = ? ORDER BY w.updated_at DESC
  `).bind(repoRow.id).all()
  return c.json({ pages: pages.results })
})

const wikiPageSchema = z.object({
  title: z.string().min(1).max(500),
  content: z.string().max(1048576),
})

router.post('/:owner/:repo/wiki', authMiddleware, zValidator('json', wikiPageSchema), async (c) => {
  const { owner, repo } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)

  const { title, content } = c.req.valid('json')
  const existing = await db.prepare('SELECT id FROM wiki_pages WHERE repo_id = ? AND title = ?').bind(repoRow.id, title).first<{ id: string }>()

  if (existing) {
    await db.prepare("UPDATE wiki_pages SET content = ?, updated_by = ?, updated_at = datetime('now') WHERE id = ?")
      .bind(content, user.sub, existing.id).run()
    return c.json({ id: existing.id, title })
  }

  const id = crypto.randomUUID()
  await db.prepare('INSERT INTO wiki_pages (id, repo_id, title, content, creator_id) VALUES (?, ?, ?, ?, ?)')
    .bind(id, repoRow.id, title, content, user.sub).run()
  return c.json({ id, title }, 201)
})

router.get('/:owner/:repo/wiki/:title', async (c) => {
  const { owner, repo, title } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  const page = await db.prepare(`
    SELECT w.id, w.title, w.content, w.created_at, w.updated_at, u.username as creator_username
    FROM wiki_pages w JOIN users u ON w.creator_id = u.id
    WHERE w.repo_id = ? AND w.title = ?
  `).bind(repoRow.id, decodeURIComponent(title)).first()
  if (!page) return c.json({ error: 'Wiki page not found' }, 404)
  return c.json({ page })
})

router.delete('/:owner/:repo/wiki/:title', authMiddleware, async (c) => {
  const { owner, repo, title } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  if (repoRow.owner_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)
  await db.prepare('DELETE FROM wiki_pages WHERE repo_id = ? AND title = ?').bind(repoRow.id, decodeURIComponent(title)).run()
  return c.json({ success: true })
})

export default router
