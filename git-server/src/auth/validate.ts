export interface AuthResult {
  valid: boolean
  userId?: string
  username?: string
}

export async function validateBasicAuth(request: Request, apiBaseUrl: string): Promise<AuthResult> {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return { valid: false }
  }

  try {
    const response = await fetch(`${apiBaseUrl}/api/internal/check-access`, {
      headers: { Authorization: authHeader },
    })

    if (!response.ok) {
      return { valid: false }
    }

    const data = await response.json() as { valid: boolean; userId: string; username: string }
    return data
  } catch {
    return { valid: false }
  }
}
