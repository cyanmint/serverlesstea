import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { hashPassword, verifyPassword } from '../auth/password'
import { signToken, signRefreshToken, verifyToken } from '../auth/jwt'
import { Env } from '../index'

const router = new Hono<{ Bindings: Env }>()

const registerSchema = z.object({
  username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_-]+$/),
  email: z.string().email(),
  password: z.string().min(8),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

router.post('/register', zValidator('json', registerSchema), async (c) => {
  const { username, email, password } = c.req.valid('json')
  const db = c.env.database

  const existing = await db
    .prepare('SELECT id FROM users WHERE username = ? OR email = ?')
    .bind(username, email)
    .first()

  if (existing) {
    return c.json({ error: 'Username or email already taken' }, 409)
  }

  const id = crypto.randomUUID()
  const passwordHash = await hashPassword(password)

  await db
    .prepare(
      'INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)'
    )
    .bind(id, username, email, passwordHash)
    .run()

  const token = await signToken({ sub: id, username, email }, c.env.JWT_SECRET)
  const refreshToken = await signRefreshToken({ sub: id, username, email, type: 'refresh' }, c.env.JWT_SECRET)

  return c.json({ token, refreshToken, user: { id, username, email } }, 201)
})

router.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json')
  const db = c.env.database

  const user = await db
    .prepare('SELECT id, username, email, password_hash, is_admin FROM users WHERE email = ?')
    .bind(email)
    .first<{ id: string; username: string; email: string; password_hash: string; is_admin: number }>()

  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const valid = await verifyPassword(password, user.password_hash)
  if (!valid) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const token = await signToken(
    { sub: user.id, username: user.username, email: user.email, isAdmin: user.is_admin === 1 },
    c.env.JWT_SECRET
  )
  const refreshToken = await signRefreshToken(
    { sub: user.id, username: user.username, email: user.email, type: 'refresh' },
    c.env.JWT_SECRET
  )

  return c.json({
    token,
    refreshToken,
    user: { id: user.id, username: user.username, email: user.email, isAdmin: user.is_admin === 1 },
  })
})

router.post('/refresh', async (c) => {
  const body = await c.req.json<{ refreshToken?: string }>().catch(() => ({ refreshToken: undefined }))
  if (!body.refreshToken) {
    return c.json({ error: 'Missing refresh token' }, 400)
  }

  try {
    const payload = await verifyToken(body.refreshToken, c.env.JWT_SECRET)
    if (payload['type'] !== 'refresh') {
      return c.json({ error: 'Invalid token type' }, 401)
    }

    const token = await signToken(
      { sub: payload.sub, username: payload['username'], email: payload['email'] },
      c.env.JWT_SECRET
    )
    return c.json({ token })
  } catch {
    return c.json({ error: 'Invalid refresh token' }, 401)
  }
})

export default router
