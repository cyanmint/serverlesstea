import { verifyPassword } from './password'

export interface GitAccessResult {
  allowed: boolean
  status: number
  userId?: string | null
  username?: string
  access?: 'public' | 'owner' | 'collaborator'
  action?: 'read' | 'write'
}

export async function authorizeGitAccess(
  db: D1Database,
  authHeader: string | undefined,
  owner: string,
  repoName: string,
  action: 'read' | 'write'
): Promise<GitAccessResult> {
  const repo = await db
    .prepare(`
      SELECT r.id, r.owner_id, r.is_private
      FROM repositories r
      JOIN users u ON r.owner_id = u.id
      WHERE u.username = ? AND r.name = ?
    `)
    .bind(owner, repoName)
    .first<{ id: string; owner_id: string; is_private: number }>()

  if (!repo) {
    return { allowed: false, status: 404 }
  }

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    if (action === 'read' && repo.is_private === 0) {
      return {
        allowed: true,
        status: 200,
        userId: null,
        username: 'anonymous',
        access: 'public',
        action,
      }
    }
    return { allowed: false, status: 401 }
  }

  const base64 = authHeader.slice(6)
  let decoded: string
  try {
    decoded = atob(base64)
  } catch {
    return { allowed: false, status: 401 }
  }

  const colonIdx = decoded.indexOf(':')
  if (colonIdx === -1) {
    return { allowed: false, status: 401 }
  }

  const username = decoded.slice(0, colonIdx)
  const password = decoded.slice(colonIdx + 1)

  const user = await db
    .prepare('SELECT id, username, password_hash FROM users WHERE username = ?')
    .bind(username)
    .first<{ id: string; username: string; password_hash: string }>()

  if (!user) {
    return { allowed: false, status: 401 }
  }

  const valid = await verifyPassword(password, user.password_hash)
  if (!valid) {
    return { allowed: false, status: 401 }
  }

  if (repo.owner_id === user.id) {
    return {
      allowed: true,
      status: 200,
      userId: user.id,
      username: user.username,
      access: 'owner',
      action,
    }
  }

  const collaborator = await db
    .prepare('SELECT role FROM repo_collaborators WHERE repo_id = ? AND user_id = ?')
    .bind(repo.id, user.id)
    .first<{ role: string }>()

  if (action === 'read') {
    if (repo.is_private === 0 || collaborator) {
      return {
        allowed: true,
        status: 200,
        userId: user.id,
        username: user.username,
        access: collaborator ? 'collaborator' : 'public',
        action,
      }
    }

    return { allowed: false, status: 403 }
  }

  if (collaborator && collaborator.role !== 'read') {
    return {
      allowed: true,
      status: 200,
      userId: user.id,
      username: user.username,
      access: 'collaborator',
      action,
    }
  }

  return { allowed: false, status: 403 }
}
