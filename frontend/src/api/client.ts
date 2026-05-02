const baseURL = (import.meta.env.VITE_API_URL as string | undefined) ?? ''

function getToken(): string | null {
  return localStorage.getItem('token')
}

function setToken(token: string): void {
  localStorage.setItem('token', token)
}

function clearToken(): void {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> ?? {}),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const response = await fetch(`${baseURL}/api${path}`, { ...options, headers })

  if (response.status === 401) {
    clearToken()
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({})) as { error?: string }
    throw new Error(error.error ?? `HTTP ${response.status}`)
  }

  return response.json() as Promise<T>
}

export { getToken, setToken, clearToken }

export async function login(email: string, password: string) {
  const data = await request<{ token: string; refreshToken: string; user: { id: string; username: string; email: string; isAdmin: boolean } }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  setToken(data.token)
  localStorage.setItem('refreshToken', data.refreshToken)
  localStorage.setItem('user', JSON.stringify(data.user))
  return data
}

export async function register(username: string, email: string, password: string) {
  const data = await request<{ token: string; refreshToken: string; user: { id: string; username: string; email: string } }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  })
  setToken(data.token)
  localStorage.setItem('refreshToken', data.refreshToken)
  localStorage.setItem('user', JSON.stringify(data.user))
  return data
}

export function logout() {
  clearToken()
  localStorage.removeItem('user')
}

export function getCurrentUser(): { id: string; username: string; email: string; isAdmin?: boolean } | null {
  const raw = localStorage.getItem('user')
  if (!raw) return null
  try { return JSON.parse(raw) as { id: string; username: string; email: string; isAdmin?: boolean } } catch { return null }
}

export async function listRepos() {
  return request<{ repos: Array<{ id: string; name: string; description: string | null; default_branch: string; created_at: string; owner_username: string }> }>('/repos')
}

export async function getRepo(owner: string, repo: string) {
  return request<{ repo: { id: string; name: string; description: string | null; is_private: number; default_branch: string; created_at: string; owner_username: string } }>(`/repos/${owner}/${repo}`)
}

export async function createRepo(name: string, description: string, is_private: boolean) {
  return request<{ id: string; name: string }>('/repos', {
    method: 'POST',
    body: JSON.stringify({ name, description, is_private }),
  })
}

export async function deleteRepo(owner: string, repo: string) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}`, { method: 'DELETE' })
}

export async function getRepoTree(owner: string, repo: string, ref: string) {
  return request<{ files: Array<{ path: string; type: string; oid: string }> }>(`/repos/${owner}/${repo}/tree/${ref}`)
}

export async function getBlob(owner: string, repo: string, ref: string, path: string) {
  return request<{ content: string; path: string }>(`/repos/${owner}/${repo}/blob/${ref}/${path}`)
}

export async function getCommits(owner: string, repo: string, ref: string) {
  return request<{ commits: Array<{ oid: string; message: string; author: { name: string; email: string; timestamp: number } }> }>(`/repos/${owner}/${repo}/commits/${ref}`)
}

export async function getDiff(owner: string, repo: string, sha: string) {
  return request<{ diff: Array<{ path: string; type: string }> }>(`/repos/${owner}/${repo}/diff/${sha}`)
}

export async function getUser(username: string) {
  return request<{ user: { id: string; username: string; display_name: string | null; bio: string | null; created_at: string }; repos: Array<{ id: string; name: string; description: string | null; default_branch: string }> }>(`/users/${username}`)
}

export async function updateUser(username: string, data: { display_name?: string; bio?: string }) {
  return request<{ success: boolean }>(`/users/${username}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function adminListUsers() {
  return request<{ users: Array<{ id: string; username: string; email: string; display_name: string | null; is_admin: number; created_at: string }> }>('/admin/users')
}

export async function adminUpdateUser(id: string, data: { display_name?: string; bio?: string; is_admin?: boolean }) {
  return request<{ success: boolean }>(`/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}
