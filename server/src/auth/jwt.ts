import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

function getKey(secret: string): Uint8Array {
  if (!secret) {
    throw new Error('JWT_SECRET is not configured. Set it as a Worker secret with: wrangler secret put JWT_SECRET')
  }
  return new TextEncoder().encode(secret)
}

export async function signToken(payload: Record<string, unknown>, secret: string): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getKey(secret))
}

export async function signRefreshToken(payload: Record<string, unknown>, secret: string): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(getKey(secret))
}

export async function verifyToken(token: string, secret: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, getKey(secret))
  return payload
}
