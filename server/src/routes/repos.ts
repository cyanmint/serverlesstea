import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { authMiddleware } from '../middleware/auth'
import { Env } from '../index'
import { listFiles, readBlob, listCommits, getCommitDiff } from '../git/introspect'
import { verifyToken } from '../auth/jwt'
import type { JWTPayload } from 'jose'

const router = new Hono<{ Bindings: Env }>()

router.get('/', async (c) => {
  const db = c.env.database

  // Check for authenticated user to also return their private repos
  let userId: string | null = null
  const authHeader = c.req.header('Authorization')
  if (authHeader?.startsWith('Bearer ')) {
    try {
      const payload = await verifyToken(authHeader.slice(7), c.env.JWT_SECRET)
      userId = payload.sub as string
    } catch {
      // invalid token — treat as anonymous
    }
  }

  const repos = userId
    ? await db
        .prepare(`
          SELECT r.id, r.name, r.description, r.is_private, r.default_branch, r.created_at,
                 u.username as owner_username, u.display_name as owner_display_name
          FROM repositories r
          JOIN users u ON r.owner_id = u.id
          WHERE r.is_private = 0 OR r.owner_id = ?
          ORDER BY r.created_at DESC
        `)
        .bind(userId)
        .all()
    : await db
        .prepare(`
          SELECT r.id, r.name, r.description, r.is_private, r.default_branch, r.created_at,
                 u.username as owner_username, u.display_name as owner_display_name
          FROM repositories r
          JOIN users u ON r.owner_id = u.id
          WHERE r.is_private = 0
          ORDER BY r.created_at DESC
        `)
        .all()

  return c.json({ repos: repos.results })
})

const createRepoSchema = z.object({
  name: z.string().min(1).max(100).regex(/^[a-zA-Z0-9_.-]+$/),
  description: z.string().max(500).optional(),
  is_private: z.boolean().optional().default(false),
})

router.post('/', authMiddleware, zValidator('json', createRepoSchema), async (c) => {
  const user = c.get('user' as never) as JWTPayload
  const { name, description, is_private } = c.req.valid('json')
  const db = c.env.database

  const existing = await db
    .prepare('SELECT id FROM repositories WHERE owner_id = ? AND name = ?')
    .bind(user.sub, name)
    .first()

  if (existing) {
    return c.json({ error: 'Repository already exists' }, 409)
  }

  const id = crypto.randomUUID()
  await db
    .prepare('INSERT INTO repositories (id, owner_id, name, description, is_private) VALUES (?, ?, ?, ?, ?)')
    .bind(id, user.sub, name, description ?? null, is_private ? 1 : 0)
    .run()

  return c.json({ id, name, description, is_private, owner: user['username'] }, 201)
})

router.get('/:owner/:repo', async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database

  const result = await db
    .prepare(`
      SELECT r.id, r.name, r.description, r.is_private, r.default_branch, r.created_at,
             u.username as owner_username, u.display_name as owner_display_name
      FROM repositories r
      JOIN users u ON r.owner_id = u.id
      WHERE u.username = ? AND r.name = ?
    `)
    .bind(owner, repo)
    .first<{
      id: string; name: string; description: string | null; is_private: number;
      default_branch: string; created_at: string; owner_username: string; owner_display_name: string | null;
    }>()

  if (!result) {
    return c.json({ error: 'Repository not found' }, 404)
  }

  if (result.is_private) {
    // Check if the requester is the owner or an admin
    const authHeader = c.req.header('Authorization')
    let allowed = false
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const payload = await verifyToken(authHeader.slice(7), c.env.JWT_SECRET)
        const ownerRow = await db
          .prepare('SELECT id FROM users WHERE username = ?')
          .bind(owner)
          .first<{ id: string }>()
        allowed = payload.sub === ownerRow?.id || payload['isAdmin'] === true
      } catch {
        // invalid token
      }
    }
    if (!allowed) {
      return c.json({ error: 'Repository not found' }, 404)
    }
  }

  return c.json({ repo: result })
})

router.delete('/:owner/:repo', authMiddleware, async (c) => {
  const { owner, repo } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const result = await db
    .prepare(`
      SELECT r.id, r.owner_id FROM repositories r
      JOIN users u ON r.owner_id = u.id
      WHERE u.username = ? AND r.name = ?
    `)
    .bind(owner, repo)
    .first<{ id: string; owner_id: string }>()

  if (!result) {
    return c.json({ error: 'Repository not found' }, 404)
  }

  if (result.owner_id !== user.sub && !user['isAdmin']) {
    return c.json({ error: 'Forbidden' }, 403)
  }

  await db.prepare('DELETE FROM repositories WHERE id = ?').bind(result.id).run()
  return c.json({ success: true })
})

router.get('/:owner/:repo/tree/:ref', async (c) => {
  const { owner, repo, ref } = c.req.param()
  try {
    const files = await listFiles(owner, repo, ref, c.env.bucket)
    return c.json({ files })
  } catch (e) {
    return c.json({ error: String(e) }, 500)
  }
})

router.get('/:owner/:repo/blob/:ref/:path{.*}', async (c) => {
  const { owner, repo, ref, path } = c.req.param()
  try {
    const content = await readBlob(owner, repo, ref, path, c.env.bucket)
    return c.json({ content, path })
  } catch (e) {
    return c.json({ error: String(e) }, 404)
  }
})

router.get('/:owner/:repo/commits/:ref', async (c) => {
  const { owner, repo, ref } = c.req.param()
  try {
    const commits = await listCommits(owner, repo, ref, c.env.bucket)
    return c.json({ commits })
  } catch (e) {
    return c.json({ error: String(e) }, 500)
  }
})

router.get('/:owner/:repo/diff/:sha', async (c) => {
  const { owner, repo, sha } = c.req.param()
  try {
    const diff = await getCommitDiff(owner, repo, sha, c.env.bucket)
    return c.json({ diff })
  } catch (e) {
    return c.json({ error: String(e) }, 500)
  }
})

const updateRepoSchema = z.object({
  name: z.string().min(1).max(100).regex(/^[a-zA-Z0-9_.-]+$/).optional(),
  description: z.string().max(500).nullable().optional(),
  is_private: z.boolean().optional(),
  default_branch: z.string().max(100).optional(),
})

router.patch('/:owner/:repo', authMiddleware, zValidator('json', updateRepoSchema), async (c) => {
  const { owner, repo } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const result = await db.prepare(`
    SELECT r.id, r.owner_id FROM repositories r
    JOIN users u ON r.owner_id = u.id WHERE u.username = ? AND r.name = ?
  `).bind(owner, repo).first<{ id: string; owner_id: string }>()
  if (!result) return c.json({ error: 'Repository not found' }, 404)
  if (result.owner_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const { name, description, is_private, default_branch } = c.req.valid('json')
  const updates: string[] = ["updated_at = datetime('now')"]
  const bindings: unknown[] = []
  if (name !== undefined) { updates.push('name = ?'); bindings.push(name) }
  if (description !== undefined) { updates.push('description = ?'); bindings.push(description) }
  if (is_private !== undefined) { updates.push('is_private = ?'); bindings.push(is_private ? 1 : 0) }
  if (default_branch !== undefined) { updates.push('default_branch = ?'); bindings.push(default_branch) }
  bindings.push(result.id)
  await db.prepare(`UPDATE repositories SET ${updates.join(', ')} WHERE id = ?`).bind(...bindings).run()
  return c.json({ success: true })
})

router.get('/:owner/:repo/collaborators', async (c) => {
  const { owner, repo } = c.req.param()
  const db = c.env.database

  const repoRow = await db.prepare(`
    SELECT r.id FROM repositories r
    JOIN users u ON r.owner_id = u.id WHERE u.username = ? AND r.name = ?
  `).bind(owner, repo).first<{ id: string }>()
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)

  const collabs = await db.prepare(`
    SELECT u.id as user_id, u.username, rc.role
    FROM repo_collaborators rc JOIN users u ON rc.user_id = u.id
    WHERE rc.repo_id = ?
  `).bind(repoRow.id).all()
  return c.json({ collaborators: collabs.results })
})

const addCollabSchema = z.object({ role: z.enum(['read', 'write', 'admin']).optional().default('read') })

router.put('/:owner/:repo/collaborators/:username', authMiddleware, zValidator('json', addCollabSchema), async (c) => {
  const { owner, repo, username } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const repoRow = await db.prepare(`
    SELECT r.id, r.owner_id FROM repositories r
    JOIN users u ON r.owner_id = u.id WHERE u.username = ? AND r.name = ?
  `).bind(owner, repo).first<{ id: string; owner_id: string }>()
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  if (repoRow.owner_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const targetUser = await db.prepare('SELECT id FROM users WHERE username = ?').bind(username).first<{ id: string }>()
  if (!targetUser) return c.json({ error: 'User not found' }, 404)

  const { role } = c.req.valid('json')
  await db.prepare('INSERT OR REPLACE INTO repo_collaborators (repo_id, user_id, role) VALUES (?, ?, ?)')
    .bind(repoRow.id, targetUser.id, role).run()
  return c.json({ success: true })
})

router.delete('/:owner/:repo/collaborators/:username', authMiddleware, async (c) => {
  const { owner, repo, username } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const repoRow = await db.prepare(`
    SELECT r.id, r.owner_id FROM repositories r
    JOIN users u ON r.owner_id = u.id WHERE u.username = ? AND r.name = ?
  `).bind(owner, repo).first<{ id: string; owner_id: string }>()
  if (!repoRow) return c.json({ error: 'Repository not found' }, 404)
  if (repoRow.owner_id !== user.sub && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const targetUser = await db.prepare('SELECT id FROM users WHERE username = ?').bind(username).first<{ id: string }>()
  if (!targetUser) return c.json({ error: 'User not found' }, 404)

  await db.prepare('DELETE FROM repo_collaborators WHERE repo_id = ? AND user_id = ?').bind(repoRow.id, targetUser.id).run()
  return c.json({ success: true })
})

export default router
