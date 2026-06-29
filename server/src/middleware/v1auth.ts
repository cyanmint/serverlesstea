import { MiddlewareHandler } from 'hono'
import { verifyToken, signToken } from '../auth/jwt'
import { verifyPassword } from '../auth/password'
import { Env } from '../index'
import type { JWTPayload } from 'jose'

export type V1UserPayload = JWTPayload & {
  username: string
  email: string
  isAdmin: boolean
}

async function resolveAuth(c: Parameters<MiddlewareHandler<{ Bindings: Env }>>[0]): Promise<V1UserPayload | null> {
  const authHeader = c.req.header('Authorization')
  if (!authHeader) return null

  if (authHeader.startsWith('Basic ')) {
    const encoded = authHeader.slice(6)
    let decoded: string
    try {
      decoded = atob(encoded)
    } catch {
      return null
    }
    const colonIdx = decoded.indexOf(':')
    if (colonIdx === -1) return null
    const username = decoded.slice(0, colonIdx)
    const password = decoded.slice(colonIdx + 1)

    const db = c.env.database
    const user = await db
      .prepare('SELECT id, username, email, password_hash, is_admin FROM users WHERE username = ?')
      .bind(username)
      .first<{ id: string; username: string; email: string; password_hash: string; is_admin: number }>()

    if (!user) return null
    const valid = await verifyPassword(password, user.password_hash)
    if (!valid) return null

    const token = await signToken(
      { sub: user.id, username: user.username, email: user.email, isAdmin: user.is_admin === 1 },
      c.env.JWT_SECRET,
    )
    const payload = await verifyToken(token, c.env.JWT_SECRET)
    return {
      ...payload,
      username: user.username,
      email: user.email,
      isAdmin: user.is_admin === 1,
    } as V1UserPayload
  }

  let token: string | null = null
  if (authHeader.startsWith('token ')) {
    token = authHeader.slice(6)
  } else if (authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7)
  }

  if (!token) return null

  // First try to look up the token in the access_tokens table (opaque tokens
  // created via POST /users/:username/tokens).
  try {
    const db = c.env.database
    const row = await db
      .prepare(
        `SELECT at.sha1, u.id, u.username, u.email, u.is_admin
         FROM access_tokens at JOIN users u ON at.user_id = u.id
         WHERE at.sha1 = ?`,
      )
      .bind(token)
      .first<{ sha1: string; id: string; username: string; email: string; is_admin: number }>()

    if (row) {
      return {
        sub: row.id,
        username: row.username,
        email: row.email,
        isAdmin: row.is_admin === 1,
      } as V1UserPayload
    }
  } catch {
    // access_tokens table may not exist yet; fall through to JWT verification
  }

  // Fall back to JWT verification (for short-lived session tokens).
  try {
    const payload = await verifyToken(token, c.env.JWT_SECRET)
    return {
      ...payload,
      username: payload['username'] as string,
      email: payload['email'] as string,
      isAdmin: Boolean(payload['isAdmin']),
    } as V1UserPayload
  } catch {
    return null
  }
}

export const v1Auth: MiddlewareHandler<{ Bindings: Env }> = async (c, next) => {
  const payload = await resolveAuth(c)
  if (!payload) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  c.set('user' as never, payload)
  await next()
}

export const v1OptionalAuth: MiddlewareHandler<{ Bindings: Env }> = async (c, next) => {
  const payload = await resolveAuth(c)
  if (payload) {
    c.set('user' as never, payload)
  }
  await next()
}
