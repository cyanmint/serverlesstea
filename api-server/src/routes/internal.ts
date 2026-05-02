import { Hono } from 'hono'
import { authorizeGitAccess } from '../auth/git-access'
import { Env } from '../index'

const router = new Hono<{ Bindings: Env }>()

router.get('/check-access', async (c) => {
  const owner = c.req.query('owner')
  const repoName = c.req.query('repo')
  const action = c.req.query('action') === 'write' ? 'write' : 'read'
  const authHeader = c.req.header('Authorization')
  if (!owner || !repoName) {
    return c.json({ error: 'Missing owner or repo' }, 400)
  }

  const result = await authorizeGitAccess(c.env.DB, authHeader, owner, repoName, action)
  if (!result.allowed) {
    if (result.status === 404) return c.json({ error: 'Repository not found' }, 404)
    if (result.status === 401) return c.json({ error: 'Unauthorized' }, 401)
    return c.json({ error: 'Forbidden' }, 403)
  }

  return c.json({
    valid: true,
    userId: result.userId ?? null,
    username: result.username ?? 'unknown',
    action: result.action,
    access: result.access,
  })
})

export default router
