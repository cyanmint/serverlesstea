export interface AuthResult {
  allowed: boolean
  status: number
}

export async function validateGitAccess(
  request: Request,
  apiBaseUrl: string,
  owner: string,
  repo: string,
  action: 'read' | 'write'
): Promise<AuthResult> {
  const authHeader = request.headers.get('Authorization')

  try {
    const response = await fetch(`${apiBaseUrl}/api/internal/check-access?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}&action=${action}`, {
      headers: authHeader ? { Authorization: authHeader } : {},
    })

    if (response.ok) {
      return { allowed: true, status: 200 }
    }

    return { allowed: false, status: response.status }
  } catch {
    return { allowed: false, status: 503 }
  }
}
