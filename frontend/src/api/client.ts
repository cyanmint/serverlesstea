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
  return request<{ repos: Array<{ id: string; name: string; description: string | null; is_private: number; default_branch: string; created_at: string; owner_username: string }> }>('/repos')
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
  return request<{ commits: Array<{ oid: string; message: string; author: { name: string; email: string; timestamp: number }; committer: { name: string; email: string; timestamp: number } }> }>(`/repos/${owner}/${repo}/commits/${ref}`)
}

export async function getDiff(owner: string, repo: string, sha: string) {
  return request<{ diff: Array<{ path: string; type: string }> }>(`/repos/${owner}/${repo}/diff/${sha}`)
}

export async function getMe() {
  return request<{ user: { id: string; username: string; email: string; display_name: string | null; bio: string | null; isAdmin: boolean; created_at: string }; repos: Array<{ id: string; name: string; description: string | null; is_private: number; default_branch: string; created_at: string }> }>('/users/me')
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

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface Issue {
  id: string
  number: number
  title: string
  body: string | null
  state: string
  creator_id: string
  creator_username: string
  assignee_id: string | null
  milestone_id: string | null
  is_pull: number
  created_at: string
  updated_at: string
  closed_at: string | null
}

export interface IssueComment {
  id: string
  issue_id: string
  user_id: string
  username: string
  body: string
  created_at: string
  updated_at: string
}

export interface Label {
  id: string
  repo_id: string
  name: string
  color: string
  description: string | null
}

export interface Milestone {
  id: string
  repo_id: string
  title: string
  description: string | null
  due_date: string | null
  state: string
  created_at: string
  updated_at?: string
  open_issues?: number
  closed_issues?: number
}

export interface Release {
  id: string
  repo_id: string
  tag_name: string
  name: string
  body: string | null
  is_draft: number
  is_prerelease: number
  creator_username: string
  created_at: string
}

export interface WikiPage {
  id: string
  title: string
  content: string
  creator_username: string
  updated_at: string
}

export interface Org {
  id: string
  name: string
  display_name: string | null
  description: string | null
  visibility: string
  created_at: string
}

export interface OrgMember {
  user_id: string
  username: string
  role: string
}

export interface SshKey {
  id: string
  title: string
  key_content: string
  created_at: string
}

export interface Notification {
  id: string
  subject_type: string
  subject_id: string
  subject_title: string
  repo_id: string | null
  is_read: number
  created_at: string
}

export interface Branch {
  name: string
  commit_sha: string
}

export interface Collaborator {
  user_id: string
  username: string
  role: string
}

// ── Issues ────────────────────────────────────────────────────────────────────

export async function listIssues(owner: string, repo: string, params?: { state?: string; type?: string; page?: number; milestone_id?: string }) {
  const q = new URLSearchParams()
  if (params?.state) q.set('state', params.state)
  if (params?.type) q.set('type', params.type)
  if (params?.page) q.set('page', String(params.page))
  if (params?.milestone_id) q.set('milestone_id', params.milestone_id)
  const qs = q.toString() ? `?${q.toString()}` : ''
  return request<{ issues: Issue[] }>(`/repos/${owner}/${repo}/issues${qs}`)
}

export async function createIssue(owner: string, repo: string, data: { title: string; body?: string; milestone_id?: string; assignee_id?: string }) {
  return request<{ id: string; number: number; title: string }>(`/repos/${owner}/${repo}/issues`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getIssue(owner: string, repo: string, number: number) {
  return request<{ issue: Issue; comments: IssueComment[] }>(`/repos/${owner}/${repo}/issues/${number}`)
}

export async function updateIssue(owner: string, repo: string, number: number, data: { title?: string; body?: string; state?: string; assignee_id?: string | null; milestone_id?: string | null }) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}/issues/${number}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export async function addIssueComment(owner: string, repo: string, number: number, body: string) {
  return request<{ id: string; body: string }>(`/repos/${owner}/${repo}/issues/${number}/comments`, {
    method: 'POST',
    body: JSON.stringify({ body }),
  })
}

export async function editIssueComment(owner: string, repo: string, number: number, commentId: string, body: string) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}/issues/${number}/comments/${commentId}`, {
    method: 'PATCH',
    body: JSON.stringify({ body }),
  })
}

export async function deleteIssueComment(owner: string, repo: string, number: number, commentId: string) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}/issues/${number}/comments/${commentId}`, {
    method: 'DELETE',
  })
}

// ── Labels ────────────────────────────────────────────────────────────────────

export async function listLabels(owner: string, repo: string) {
  return request<{ labels: Label[] }>(`/repos/${owner}/${repo}/labels`)
}

export async function createLabel(owner: string, repo: string, data: { name: string; color: string; description?: string }) {
  return request<{ id: string; name: string; color: string }>(`/repos/${owner}/${repo}/labels`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateLabel(owner: string, repo: string, id: string, data: { name?: string; color?: string; description?: string | null }) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}/labels/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export async function deleteLabel(owner: string, repo: string, id: string) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}/labels/${id}`, { method: 'DELETE' })
}

// ── Milestones ────────────────────────────────────────────────────────────────

export async function listMilestones(owner: string, repo: string, state?: string) {
  const qs = state ? `?state=${state}` : ''
  return request<{ milestones: Milestone[] }>(`/repos/${owner}/${repo}/milestones${qs}`)
}

export async function createMilestone(owner: string, repo: string, data: { title: string; description?: string; due_date?: string }) {
  return request<{ id: string; title: string }>(`/repos/${owner}/${repo}/milestones`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getMilestone(owner: string, repo: string, id: string) {
  return request<{ milestone: Milestone }>(`/repos/${owner}/${repo}/milestones/${id}`)
}

export async function updateMilestone(owner: string, repo: string, id: string, data: { title?: string; description?: string | null; due_date?: string | null; state?: string }) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}/milestones/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export async function deleteMilestone(owner: string, repo: string, id: string) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}/milestones/${id}`, { method: 'DELETE' })
}

// ── Releases ──────────────────────────────────────────────────────────────────

export async function listReleases(owner: string, repo: string) {
  return request<{ releases: Release[] }>(`/repos/${owner}/${repo}/releases`)
}

export async function createRelease(owner: string, repo: string, data: { tag_name: string; name: string; body?: string; is_draft?: boolean; is_prerelease?: boolean }) {
  return request<{ id: string; tag_name: string; name: string }>(`/repos/${owner}/${repo}/releases`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getRelease(owner: string, repo: string, id: string) {
  return request<{ release: Release }>(`/repos/${owner}/${repo}/releases/${id}`)
}

export async function updateRelease(owner: string, repo: string, id: string, data: { tag_name?: string; name?: string; body?: string | null; is_draft?: boolean; is_prerelease?: boolean }) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}/releases/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export async function deleteRelease(owner: string, repo: string, id: string) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}/releases/${id}`, { method: 'DELETE' })
}

// ── Wiki ──────────────────────────────────────────────────────────────────────

export async function listWikiPages(owner: string, repo: string) {
  return request<{ pages: WikiPage[] }>(`/repos/${owner}/${repo}/wiki`)
}

export async function createWikiPage(owner: string, repo: string, data: { title: string; content: string }) {
  return request<{ id: string; title: string }>(`/repos/${owner}/${repo}/wiki`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getWikiPage(owner: string, repo: string, title: string) {
  return request<{ page: WikiPage }>(`/repos/${owner}/${repo}/wiki/${encodeURIComponent(title)}`)
}

export async function deleteWikiPage(owner: string, repo: string, title: string) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}/wiki/${encodeURIComponent(title)}`, { method: 'DELETE' })
}

// ── Branches & Tags ───────────────────────────────────────────────────────────

export async function listBranches(owner: string, repo: string) {
  return request<{ branches: Branch[] }>(`/repos/${owner}/${repo}/branches`)
}

export async function listTags(owner: string, repo: string) {
  return request<{ tags: Branch[] }>(`/repos/${owner}/${repo}/tags`)
}

// ── Repo management ───────────────────────────────────────────────────────────

export async function updateRepo(owner: string, repo: string, data: { name?: string; description?: string | null; is_private?: boolean; default_branch?: string }) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export async function listCollaborators(owner: string, repo: string) {
  return request<{ collaborators: Collaborator[] }>(`/repos/${owner}/${repo}/collaborators`)
}

export async function addCollaborator(owner: string, repo: string, username: string, role?: string) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}/collaborators/${username}`, {
    method: 'PUT',
    body: JSON.stringify({ role: role ?? 'read' }),
  })
}

export async function removeCollaborator(owner: string, repo: string, username: string) {
  return request<{ success: boolean }>(`/repos/${owner}/${repo}/collaborators/${username}`, { method: 'DELETE' })
}

// ── Orgs ──────────────────────────────────────────────────────────────────────

export async function createOrg(data: { name: string; display_name?: string; description?: string; visibility?: string }) {
  return request<{ id: string; name: string }>('/orgs', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getOrg(orgname: string) {
  return request<{ org: Org; members: OrgMember[] }>(`/orgs/${orgname}`)
}

export async function updateOrg(orgname: string, data: { display_name?: string | null; description?: string | null; visibility?: string }) {
  return request<{ success: boolean }>(`/orgs/${orgname}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export async function deleteOrg(orgname: string) {
  return request<{ success: boolean }>(`/orgs/${orgname}`, { method: 'DELETE' })
}

export async function listOrgMembers(orgname: string) {
  return request<{ members: OrgMember[] }>(`/orgs/${orgname}/members`)
}

export async function addOrgMember(orgname: string, username: string, role?: string) {
  return request<{ success: boolean }>(`/orgs/${orgname}/members`, {
    method: 'POST',
    body: JSON.stringify({ username, role: role ?? 'member' }),
  })
}

export async function removeOrgMember(orgname: string, username: string) {
  return request<{ success: boolean }>(`/orgs/${orgname}/members/${username}`, { method: 'DELETE' })
}

export async function listOrgTeams(orgname: string) {
  return request<{ teams: Array<{ id: string; name: string; permission: string; created_at: string }> }>(`/orgs/${orgname}/teams`)
}

export async function createOrgTeam(orgname: string, data: { name: string; permission?: string }) {
  return request<{ id: string; name: string }>(`/orgs/${orgname}/teams`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getOrgTeam(orgname: string, teamname: string) {
  return request<{ team: { id: string; name: string; permission: string }; members: OrgMember[] }>(`/orgs/${orgname}/teams/${teamname}`)
}

export async function addTeamMember(orgname: string, teamname: string, username: string) {
  return request<{ success: boolean }>(`/orgs/${orgname}/teams/${teamname}/members`, {
    method: 'POST',
    body: JSON.stringify({ username }),
  })
}

// ── SSH Keys ──────────────────────────────────────────────────────────────────

export async function listSshKeys() {
  return request<{ keys: SshKey[] }>('/user/keys')
}

export async function addSshKey(title: string, key: string) {
  return request<{ id: string; title: string }>('/user/keys', {
    method: 'POST',
    body: JSON.stringify({ title, key }),
  })
}

export async function deleteSshKey(id: string) {
  return request<{ success: boolean }>(`/user/keys/${id}`, { method: 'DELETE' })
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function changePassword(old_password: string, new_password: string) {
  return request<{ success: boolean }>('/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ old_password, new_password }),
  })
}

// ── Users ─────────────────────────────────────────────────────────────────────

export async function listUsers(params?: { q?: string; page?: number }) {
  const q = new URLSearchParams()
  if (params?.q) q.set('q', params.q)
  if (params?.page) q.set('page', String(params.page))
  const qs = q.toString() ? `?${q.toString()}` : ''
  return request<{ users: Array<{ id: string; username: string; display_name: string | null; bio: string | null; created_at: string }> }>(`/users${qs}`)
}

// ── Notifications ─────────────────────────────────────────────────────────────

export async function getNotifications(is_read?: boolean) {
  const qs = is_read !== undefined ? `?is_read=${is_read ? 1 : 0}` : ''
  return request<{ notifications: Notification[] }>(`/notifications${qs}`)
}

export async function markNotificationRead(id: string) {
  return request<{ success: boolean }>(`/notifications/${id}`, { method: 'PATCH' })
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export async function getDashboardIssues(type?: string, state?: string) {
  const q = new URLSearchParams()
  if (type) q.set('type', type)
  if (state) q.set('state', state)
  const qs = q.toString() ? `?${q.toString()}` : ''
  return request<{ issues: Array<Issue & { repo_name: string; repo_owner: string }> }>(`/dashboard/issues${qs}`)
}

export async function getDashboardMilestones() {
  return request<{ milestones: Array<Milestone & { repo_name: string; repo_owner: string }> }>('/dashboard/milestones')
}

// ── Admin ─────────────────────────────────────────────────────────────────────

export async function adminConfig() {
  return request<{ config: Record<string, unknown> }>('/admin/config')
}

export async function adminCreateUser(data: { username: string; email: string; password: string; is_admin?: boolean }) {
  return request<{ id: string; username: string; email: string }>('/admin/users', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function adminDeleteUser(id: string) {
  return request<{ success: boolean }>(`/admin/users/${id}`, { method: 'DELETE' })
}

// ── File contents ─────────────────────────────────────────────────────────────

export async function getFileContents(owner: string, repo: string, path: string, ref?: string) {
  const refPart = ref ?? 'HEAD'
  return request<{ content: string; path: string }>(`/repos/${owner}/${repo}/blob/${refPart}/${path}`)
}

export async function updateFile(owner: string, repo: string, path: string, content: string, message: string) {
  return request<{ message: string }>(`/repos/${owner}/${repo}/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify({ content, message }),
  })
}

export async function createFile(owner: string, repo: string, path: string, content: string, message: string) {
  return request<{ message: string }>(`/repos/${owner}/${repo}/contents/${path}`, {
    method: 'POST',
    body: JSON.stringify({ content, message }),
  })
}

export async function deleteFile(owner: string, repo: string, path: string, message: string) {
  return request<{ message: string }>(`/repos/${owner}/${repo}/contents/${path}`, {
    method: 'DELETE',
    body: JSON.stringify({ message }),
  })
}
