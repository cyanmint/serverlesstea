import { MiddlewareHandler } from 'hono'
import { verifyToken } from '../auth/jwt'
import { Env } from '../index'

export const authMiddleware: MiddlewareHandler<{ Bindings: Env }> = async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  const token = authHeader.slice(7)
  try {
    const payload = await verifyToken(token, c.env.JWT_SECRET)
    c.set('user' as never, payload)
    await next()
  } catch {
    return c.json({ error: 'Unauthorized' }, 401)
  }
}
