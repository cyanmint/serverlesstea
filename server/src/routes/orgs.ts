import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { authMiddleware } from '../middleware/auth'
import { Env } from '../index'
import type { JWTPayload } from 'jose'

const router = new Hono<{ Bindings: Env }>()

const createOrgSchema = z.object({
  name: z.string().min(1).max(64).regex(/^[a-zA-Z0-9_-]+$/),
  display_name: z.string().max(100).optional(),
  description: z.string().max(500).optional(),
  visibility: z.enum(['public', 'private']).optional().default('public'),
})

router.post('/', authMiddleware, zValidator('json', createOrgSchema), async (c) => {
  const user = c.get('user' as never) as JWTPayload
  const { name, display_name, description, visibility } = c.req.valid('json')
  const db = c.env.database

  const existing = await db.prepare('SELECT id FROM organizations WHERE name = ?').bind(name).first()
  if (existing) return c.json({ error: 'Organization name already taken' }, 409)

  const id = crypto.randomUUID()
  await db.prepare('INSERT INTO organizations (id, name, display_name, description, visibility) VALUES (?, ?, ?, ?, ?)')
    .bind(id, name, display_name ?? null, description ?? null, visibility).run()
  await db.prepare('INSERT INTO org_members (org_id, user_id, role) VALUES (?, ?, ?)').bind(id, user.sub, 'owner').run()

  return c.json({ id, name }, 201)
})

router.get('/:orgname', async (c) => {
  const { orgname } = c.req.param()
  const db = c.env.database
  const org = await db.prepare('SELECT id, name, display_name, description, visibility, created_at FROM organizations WHERE name = ?').bind(orgname).first()
  if (!org) return c.json({ error: 'Organization not found' }, 404)

  const members = await db.prepare(`
    SELECT u.id, u.username, m.role FROM org_members m
    JOIN users u ON m.user_id = u.id
    WHERE m.org_id = ?
  `).bind((org as { id: string }).id).all()

  return c.json({ org, members: members.results })
})

const updateOrgSchema = z.object({
  display_name: z.string().max(100).nullable().optional(),
  description: z.string().max(500).nullable().optional(),
  visibility: z.enum(['public', 'private']).optional(),
})

router.patch('/:orgname', authMiddleware, zValidator('json', updateOrgSchema), async (c) => {
  const { orgname } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const org = await db.prepare('SELECT id FROM organizations WHERE name = ?').bind(orgname).first<{ id: string }>()
  if (!org) return c.json({ error: 'Organization not found' }, 404)

  const membership = await db.prepare('SELECT role FROM org_members WHERE org_id = ? AND user_id = ?').bind(org.id, user.sub).first<{ role: string }>()
  if (membership?.role !== 'owner' && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const { display_name, description, visibility } = c.req.valid('json')
  const updates: string[] = ["updated_at = datetime('now')"]
  const bindings: unknown[] = []
  if (display_name !== undefined) { updates.push('display_name = ?'); bindings.push(display_name) }
  if (description !== undefined) { updates.push('description = ?'); bindings.push(description) }
  if (visibility !== undefined) { updates.push('visibility = ?'); bindings.push(visibility) }
  bindings.push(org.id)
  await db.prepare(`UPDATE organizations SET ${updates.join(', ')} WHERE id = ?`).bind(...bindings).run()
  return c.json({ success: true })
})

router.delete('/:orgname', authMiddleware, async (c) => {
  const { orgname } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const org = await db.prepare('SELECT id FROM organizations WHERE name = ?').bind(orgname).first<{ id: string }>()
  if (!org) return c.json({ error: 'Organization not found' }, 404)

  const membership = await db.prepare('SELECT role FROM org_members WHERE org_id = ? AND user_id = ?').bind(org.id, user.sub).first<{ role: string }>()
  if (membership?.role !== 'owner' && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  await db.prepare('DELETE FROM organizations WHERE id = ?').bind(org.id).run()
  return c.json({ success: true })
})

router.get('/:orgname/members', async (c) => {
  const { orgname } = c.req.param()
  const db = c.env.database
  const org = await db.prepare('SELECT id FROM organizations WHERE name = ?').bind(orgname).first<{ id: string }>()
  if (!org) return c.json({ error: 'Organization not found' }, 404)

  const members = await db.prepare(`
    SELECT u.id as user_id, u.username, m.role FROM org_members m
    JOIN users u ON m.user_id = u.id WHERE m.org_id = ?
  `).bind(org.id).all()
  return c.json({ members: members.results })
})

const addMemberSchema = z.object({
  username: z.string(),
  role: z.enum(['member', 'owner']).optional().default('member'),
})

router.post('/:orgname/members', authMiddleware, zValidator('json', addMemberSchema), async (c) => {
  const { orgname } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const org = await db.prepare('SELECT id FROM organizations WHERE name = ?').bind(orgname).first<{ id: string }>()
  if (!org) return c.json({ error: 'Organization not found' }, 404)

  const membership = await db.prepare('SELECT role FROM org_members WHERE org_id = ? AND user_id = ?').bind(org.id, user.sub).first<{ role: string }>()
  if (membership?.role !== 'owner' && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const { username, role } = c.req.valid('json')
  const targetUser = await db.prepare('SELECT id FROM users WHERE username = ?').bind(username).first<{ id: string }>()
  if (!targetUser) return c.json({ error: 'User not found' }, 404)

  const existing = await db.prepare('SELECT 1 FROM org_members WHERE org_id = ? AND user_id = ?').bind(org.id, targetUser.id).first()
  if (existing) return c.json({ error: 'Already a member' }, 409)

  await db.prepare('INSERT INTO org_members (org_id, user_id, role) VALUES (?, ?, ?)').bind(org.id, targetUser.id, role).run()
  return c.json({ success: true }, 201)
})

router.delete('/:orgname/members/:username', authMiddleware, async (c) => {
  const { orgname, username } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const org = await db.prepare('SELECT id FROM organizations WHERE name = ?').bind(orgname).first<{ id: string }>()
  if (!org) return c.json({ error: 'Organization not found' }, 404)

  const membership = await db.prepare('SELECT role FROM org_members WHERE org_id = ? AND user_id = ?').bind(org.id, user.sub).first<{ role: string }>()
  const targetUser = await db.prepare('SELECT id FROM users WHERE username = ?').bind(username).first<{ id: string }>()
  if (!targetUser) return c.json({ error: 'User not found' }, 404)

  if (targetUser.id !== user.sub && membership?.role !== 'owner' && !user['isAdmin']) {
    return c.json({ error: 'Forbidden' }, 403)
  }

  await db.prepare('DELETE FROM org_members WHERE org_id = ? AND user_id = ?').bind(org.id, targetUser.id).run()
  return c.json({ success: true })
})

router.get('/:orgname/teams', async (c) => {
  const { orgname } = c.req.param()
  const db = c.env.database
  const org = await db.prepare('SELECT id FROM organizations WHERE name = ?').bind(orgname).first<{ id: string }>()
  if (!org) return c.json({ error: 'Organization not found' }, 404)
  const teams = await db.prepare('SELECT id, name, permission, created_at FROM org_teams WHERE org_id = ? ORDER BY name').bind(org.id).all()
  return c.json({ teams: teams.results })
})

const createTeamSchema = z.object({
  name: z.string().min(1).max(100),
  permission: z.enum(['read', 'write', 'admin']).optional().default('read'),
})

router.post('/:orgname/teams', authMiddleware, zValidator('json', createTeamSchema), async (c) => {
  const { orgname } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const org = await db.prepare('SELECT id FROM organizations WHERE name = ?').bind(orgname).first<{ id: string }>()
  if (!org) return c.json({ error: 'Organization not found' }, 404)

  const membership = await db.prepare('SELECT role FROM org_members WHERE org_id = ? AND user_id = ?').bind(org.id, user.sub).first<{ role: string }>()
  if (membership?.role !== 'owner' && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const { name, permission } = c.req.valid('json')
  const id = crypto.randomUUID()
  await db.prepare('INSERT INTO org_teams (id, org_id, name, permission) VALUES (?, ?, ?, ?)').bind(id, org.id, name, permission).run()
  return c.json({ id, name }, 201)
})

router.get('/:orgname/teams/:teamname', async (c) => {
  const { orgname, teamname } = c.req.param()
  const db = c.env.database
  const org = await db.prepare('SELECT id FROM organizations WHERE name = ?').bind(orgname).first<{ id: string }>()
  if (!org) return c.json({ error: 'Organization not found' }, 404)

  const team = await db.prepare('SELECT id, name, permission, created_at FROM org_teams WHERE org_id = ? AND name = ?').bind(org.id, teamname).first()
  if (!team) return c.json({ error: 'Team not found' }, 404)

  const members = await db.prepare(`
    SELECT u.id as user_id, u.username FROM team_members tm
    JOIN users u ON tm.user_id = u.id WHERE tm.team_id = ?
  `).bind((team as { id: string }).id).all()

  return c.json({ team, members: members.results })
})

const addTeamMemberSchema = z.object({ username: z.string() })

router.post('/:orgname/teams/:teamname/members', authMiddleware, zValidator('json', addTeamMemberSchema), async (c) => {
  const { orgname, teamname } = c.req.param()
  const user = c.get('user' as never) as JWTPayload
  const db = c.env.database

  const org = await db.prepare('SELECT id FROM organizations WHERE name = ?').bind(orgname).first<{ id: string }>()
  if (!org) return c.json({ error: 'Organization not found' }, 404)

  const membership = await db.prepare('SELECT role FROM org_members WHERE org_id = ? AND user_id = ?').bind(org.id, user.sub).first<{ role: string }>()
  if (membership?.role !== 'owner' && !user['isAdmin']) return c.json({ error: 'Forbidden' }, 403)

  const team = await db.prepare('SELECT id FROM org_teams WHERE org_id = ? AND name = ?').bind(org.id, teamname).first<{ id: string }>()
  if (!team) return c.json({ error: 'Team not found' }, 404)

  const { username } = c.req.valid('json')
  const targetUser = await db.prepare('SELECT id FROM users WHERE username = ?').bind(username).first<{ id: string }>()
  if (!targetUser) return c.json({ error: 'User not found' }, 404)

  const existing = await db.prepare('SELECT 1 FROM team_members WHERE team_id = ? AND user_id = ?').bind(team.id, targetUser.id).first()
  if (existing) return c.json({ error: 'Already a member' }, 409)

  await db.prepare('INSERT INTO team_members (team_id, user_id) VALUES (?, ?)').bind(team.id, targetUser.id).run()
  return c.json({ success: true }, 201)
})

export default router
