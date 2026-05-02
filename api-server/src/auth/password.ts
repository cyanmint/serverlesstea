async function bufferToHex(buffer: ArrayBuffer): Promise<string> {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function hexToBuffer(hex: string): Uint8Array {
  const matches = hex.match(/.{1,2}/g) ?? []
  return new Uint8Array(matches.map((byte) => parseInt(byte, 16)))
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )

  const hashBuffer = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, hash: 'SHA-256', iterations: 100000 },
    keyMaterial,
    256
  )

  const hashHex = await bufferToHex(hashBuffer)
  return `pbkdf2:${saltHex}:${hashHex}`
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const parts = hash.split(':')
  if (parts.length !== 3 || parts[0] !== 'pbkdf2') return false

  const saltHex = parts[1]
  const storedHash = parts[2]
  const salt = hexToBuffer(saltHex)

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )

  const hashBuffer = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, hash: 'SHA-256', iterations: 100000 },
    keyMaterial,
    256
  )

  const hashHex = await bufferToHex(hashBuffer)
  return hashHex === storedHash
}
