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

router.get('/:owner/:repo/issues', async (c) => {
  const { owner, repo } = c.req.param()
  const { state = 'open', type = 'issues', page = '1', limit = '20', milestone_id } = c.req.query()
  const db = c.env.database

  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)

  const offset = (parseInt(page) - 1) * parseInt(limit)
  const isPull = type === 'pulls' ? 1 : 0

  let query = `
    SELECT i.id, i.number, i.title, i.body, i.state, i.creator_id, i.assignee_id, i.milestone_id,
           i.is_pull, i.created_at, i.updated_at, i.closed_at,
           u.username as creator_username
    FROM issues i
    JOIN users u ON i.creator_id = u.id
    WHERE i.repo_id = ? AND i.is_pull = ?
  `
  const bindings: unknown[] = [repoRow.id, isPull]

  if (state !== 'all') {
    query += ' AND i.state = ?'
    bindings.push(state)
  }
  if (milestone_id) {
    query += ' AND i.milestone_id = ?'
    bindings.push(milestone_id)
  }
  query += ' ORDER BY i.created_at DESC LIMIT ? OFFSET ?'
  bindings.push(parseInt(limit), offset)

  const issues = await db.prepare(query).bind(...bindings).all()
  return c.json({ issues: issues.results })
})

const createIssueSchema = z.object({
  title: z.string().min(1).max(500),
  body: z.string().max(65535).optional(),
  milestone_id: z.string().optional(),
  assignee_id: z.string().optional(),
  is_pull: z.number().optional().default(0),
  head_branch: z.string().optional(),
  base_branch: z.string().optional(),
})

router.post('/:owner/:repo/issues', authMiddleware, zValidator('json', createIssueSchema), async (c) => {
  const { owner, repo } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)

  const { title, body, milestone_id, assignee_id, is_pull, head_branch, base_branch } = c.req.valid('json')

  const maxRow = await db.prepare('SELECT MAX(number) as max FROM issues WHERE repo_id = ?').bind(repoRow.id).first<{ max: number | null }>()
  const number = (maxRow?.max ?? 0) + 1

  const id = crypto.randomUUID()
  await db.prepare(`
    INSERT INTO issues (id, repo_id, number, title, body, creator_id, assignee_id, milestone_id, is_pull, head_branch, base_branch)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(id, repoRow.id, number, title, body ?? null, user.sub, assignee_id ?? null, milestone_id ?? null, is_pull ?? 0, head_branch ?? null, base_branch ?? null).run()

  return c.json({ id, number, title }, 201)
})

router.get('/:owner/:repo/issues/:number', async (c) => {
  const { owner, repo, number } = c.req.param()
  const db = c.env.database

  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)

  const issue = await db.prepare(`
    SELECT i.id, i.number, i.title, i.body, i.state, i.creator_id, i.assignee_id, i.milestone_id,
           i.is_pull, i.created_at, i.updated_at, i.closed_at,
           u.username as creator_username
    FROM issues i
    JOIN users u ON i.creator_id = u.id
    WHERE i.repo_id = ? AND i.number = ?
  `).bind(repoRow.id, parseInt(number)).first()

  if (!issue) return c.json({ error: 'Issue not found' }, 404)

  const comments = await db.prepare(`
    SELECT ic.id, ic.body, ic.created_at, ic.updated_at, u.username
    FROM issue_comments ic
    JOIN users u ON ic.user_id = u.id
    WHERE ic.issue_id = ?
    ORDER BY ic.created_at ASC
  `).bind((issue as { id: string }).id).all()

  return c.json({ issue, comments: comments.results })
})

const updateIssueSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  body: z.string().max(65535).optional(),
  state: z.enum(['open', 'closed']).optional(),
  assignee_id: z.string().nullable().optional(),
  milestone_id: z.string().nullable().optional(),
})

router.patch('/:owner/:repo/issues/:number', authMiddleware, zValidator('json', updateIssueSchema), async (c) => {
  const { owner, repo, number } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)

  const issue = await db.prepare('SELECT id, creator_id FROM issues WHERE repo_id = ? AND number = ?')
    .bind(repoRow.id, parseInt(number)).first<{ id: string; creator_id: string }>()
  if (!issue) return c.json({ error: 'Issue not found' }, 404)

  if (issue.creator_id !== user.sub && repoRow.owner_id !== user.sub && !user['isAdmin']) {
    return c.json({ error: 'Forbidden' }, 403)
  }

  const { title, body, state, assignee_id, milestone_id } = c.req.valid('json')
  const updates: string[] = ["updated_at = datetime('now')"]
  const bindings: unknown[] = []

  if (title !== undefined) { updates.push('title = ?'); bindings.push(title) }
  if (body !== undefined) { updates.push('body = ?'); bindings.push(body) }
  if (state !== undefined) {
    updates.push('state = ?'); bindings.push(state)
    if (state === 'closed') { updates.push("closed_at = datetime('now')") }
    else { updates.push('closed_at = NULL') }
  }
  if (assignee_id !== undefined) { updates.push('assignee_id = ?'); bindings.push(assignee_id) }
  if (milestone_id !== undefined) { updates.push('milestone_id = ?'); bindings.push(milestone_id) }

  bindings.push(issue.id)
  await db.prepare(`UPDATE issues SET ${updates.join(', ')} WHERE id = ?`).bind(...bindings).run()
  return c.json({ success: true })
})

const addCommentSchema = z.object({ body: z.string().min(1).max(65535) })

router.post('/:owner/:repo/issues/:number/comments', authMiddleware, zValidator('json', addCommentSchema), async (c) => {
  const { owner, repo, number } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)

  const issue = await db.prepare('SELECT id FROM issues WHERE repo_id = ? AND number = ?')
    .bind(repoRow.id, parseInt(number)).first<{ id: string }>()
  if (!issue) return c.json({ error: 'Issue not found' }, 404)

  const { body } = c.req.valid('json')
  const id = crypto.randomUUID()
  await db.prepare('INSERT INTO issue_comments (id, issue_id, user_id, body) VALUES (?, ?, ?, ?)')
    .bind(id, issue.id, user.sub, body).run()

  return c.json({ id, body }, 201)
})

const editCommentSchema = z.object({ body: z.string().min(1).max(65535) })

router.patch('/:owner/:repo/issues/:number/comments/:id', authMiddleware, zValidator('json', editCommentSchema), async (c) => {
  const { owner, repo, number, id } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)

  const comment = await db.prepare('SELECT id, user_id FROM issue_comments WHERE id = ?')
    .bind(id).first<{ id: string; user_id: string }>()
  if (!comment) return c.json({ error: 'Comment not found' }, 404)
  if (comment.user_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const { body } = c.req.valid('json')
  await db.prepare("UPDATE issue_comments SET body = ?, updated_at = datetime('now') WHERE id = ?")
    .bind(body, id).run()
  return c.json({ success: true })
})

router.delete('/:owner/:repo/issues/:number/comments/:id', authMiddleware, async (c) => {
  const { owner, repo, number: _number, id } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const repoRow = await getRepo(db, owner, repo)
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)

  const comment = await db.prepare('SELECT id, user_id FROM issue_comments WHERE id = ?')
    .bind(id).first<{ id: string; user_id: string }>()
  if (!comment) return c.json({ error: 'Comment not found' }, 404)
  if (comment.user_id !== user.sub && repoRow.owner_id !== user.sub && !user['isAdmin']) {
    return c.json({ error: 'Forbidden' }, 403)
  }

  await db.prepare('DELETE FROM issue_comments WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

export default router
