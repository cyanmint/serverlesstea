import { MiddlewareHandler } from 'hono'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
}

export const cors: MiddlewareHandler = async (c, next) => {
  if (c.req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }

  await next()

  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    c.header(key, value)
  }
}
