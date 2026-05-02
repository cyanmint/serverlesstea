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

router.get('/:owner/:repo/releases', async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  const releases = await db.prepare(`
    SELECT r.id, r.tag_name, r.name, r.body, r.is_draft, r.is_prerelease, r.created_at, u.username as creator_username
    FROM releases r JOIN users u ON r.creator_id = u.id
    WHERE r.repo_id = ? ORDER BY r.created_at DESC
  `).bind(repoRow.id).all()
  return c.json({ releases: releases.results })
})

const createReleaseSchema = z.object({
  tag_name: z.string().min(1).max(100),
  name: z.string().min(1).max(500),
  body: z.string().max(65535).optional(),
  is_draft: z.boolean().optional().default(false),
  is_prerelease: z.boolean().optional().default(false),
})

router.post('/:owner/:repo/releases', authMiddleware, zValidator('json', createReleaseSchema), async (c) => {
  const { owner, repo } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  if (repoRow.owner_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const { tag_name, name, body, is_draft, is_prerelease } = c.req.valid('json')
  const id = crypto.randomUUID()
  await db.prepare('INSERT INTO releases (id, repo_id, tag_name, name, body, is_draft, is_prerelease, creator_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(id, repoRow.id, tag_name, name, body ?? null, is_draft ? 1 : 0, is_prerelease ? 1 : 0, user.sub).run()
  return c.json({ id, tag_name, name }, 201)
})

router.get('/:owner/:repo/releases/:id', async (c) => {
  const { owner, repo, id } = c.req.param()
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  const r = await db.prepare(`
    SELECT r.id, r.tag_name, r.name, r.body, r.is_draft, r.is_prerelease, r.created_at, u.username as creator_username
    FROM releases r JOIN users u ON r.creator_id = u.id
    WHERE r.id = ? AND r.repo_id = ?
  `).bind(id, repoRow.id).first()
  if (!r) return c.json({ error: 'Release not found' }, 404)
  return c.json({ release: r })
})

const updateReleaseSchema = z.object({
  tag_name: z.string().min(1).max(100).optional(),
  name: z.string().min(1).max(500).optional(),
  body: z.string().max(65535).nullable().optional(),
  is_draft: z.boolean().optional(),
  is_prerelease: z.boolean().optional(),
})

router.patch('/:owner/:repo/releases/:id', authMiddleware, zValidator('json', updateReleaseSchema), async (c) => {
  const { owner, repo, id } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  if (repoRow.owner_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const { tag_name, name, body, is_draft, is_prerelease } = c.req.valid('json')
  const updates: string[] = []
  const bindings: unknown[] = []
  if (tag_name !== undefined) { updates.push('tag_name = ?'); bindings.push(tag_name) }
  if (name !== undefined) { updates.push('name = ?'); bindings.push(name) }
  if (body !== undefined) { updates.push('body = ?'); bindings.push(body) }
  if (is_draft !== undefined) { updates.push('is_draft = ?'); bindings.push(is_draft ? 1 : 0) }
  if (is_prerelease !== undefined) { updates.push('is_prerelease = ?'); bindings.push(is_prerelease ? 1 : 0) }
  if (updates.length === 0) return c.json({ success: true })
  bindings.push(id, repoRow.id)
  await db.prepare(`UPDATE releases SET ${updates.join(', ')} WHERE id = ? AND repo_id = ?`).bind(...bindings).run()
  return c.json({ success: true })
})

router.delete('/:owner/:repo/releases/:id', authMiddleware, async (c) => {
  const { owner, repo, id } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database
  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  if (repoRow.owner_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)
  await db.prepare('DELETE FROM releases WHERE id = ? AND repo_id = ?').bind(id, repoRow.id).run()
  return c.json({ success: true })
})

export default router
