import { Hono } from 'hono'
import { verifyPassword } from '../auth/password'
import { Env } from '../index'

const router = new Hono<{ Bindings: Env }>()

router.get('/check-access', async (c) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const base64 = authHeader.slice(6)
  let decoded: string
  try {
    decoded = atob(base64)
  } catch {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const colonIdx = decoded.indexOf(':')
  if (colonIdx === -1) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const username = decoded.slice(0, colonIdx)
  const password = decoded.slice(colonIdx + 1)

  const db = c.env.DB
  const user = await db
    .prepare('SELECT id, username, password_hash FROM users WHERE username = ?')
    .bind(username)
    .first<{ id: string; username: string; password_hash: string }>()

  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const valid = await verifyPassword(password, user.password_hash)
  if (!valid) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  return c.json({ valid: true, userId: user.id, username: user.username })
})

export default router
