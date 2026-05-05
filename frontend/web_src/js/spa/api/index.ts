import {request, GET as _GET, POST as _POST, PATCH as _PATCH, PUT as _PUT, DELETE as _DELETE} from '../../modules/fetch.ts';
import {localUserSettings} from '../../modules/user-settings.ts';
import type {RequestOpts} from '../../types.ts';
import {apiBase} from '../spaconfig.ts';

// ---- Token storage ----

const TOKEN_KEY = 'gitea-spa-token';

/** Returns the stored API token, or null when not signed in. */
export function getStoredToken(): string | null {
  return localUserSettings.getString(TOKEN_KEY) || null;
}

/** Persists an API token to localStorage, or removes it when token is null. */
export function setStoredToken(token: string | null): void {
  if (token) {
    localUserSettings.setString(TOKEN_KEY, token);
  } else {
    localUserSettings.setString(TOKEN_KEY, '');
  }
}

// ---- Token-aware fetch wrappers ----
// These shadow the raw fetch helpers so all api/index.ts calls automatically
// carry Authorization: token <token> when a token is stored.

function withToken(opts: RequestOpts = {}): RequestOpts {
  const token = getStoredToken();
  if (!token) return opts;
  const headers = new Headers((opts.headers ?? {}));
  if (!headers.has('Authorization')) headers.set('Authorization', `token ${token}`);
  return {...opts, headers};
}

const GET = (url: string, opts?: RequestOpts) => _GET(url, withToken(opts));
const POST = (url: string, opts?: RequestOpts) => _POST(url, withToken(opts));
const PATCH = (url: string, opts?: RequestOpts) => _PATCH(url, withToken(opts));
const PUT = (url: string, opts?: RequestOpts) => _PUT(url, withToken(opts));
const DELETE = (url: string, opts?: RequestOpts) => _DELETE(url, withToken(opts));

// ---- Shared types (subset of Gitea API v1 swagger) ----

export type User = {
  id: number;
  login: string;
  full_name: string;
  email: string;
  avatar_url: string;
  html_url: string;
  is_admin: boolean;
  created: string;
  website?: string;
  location?: string;
};

export type Repository = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  ssh_url: string;
  clone_url: string;
  private: boolean;
  fork: boolean;
  archived: boolean;
  mirror: boolean;
  template: boolean;
  stars_count: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  updated_at: string;
  owner: User;
  language: string;
  size: number;
};

export type Issue = {
  id: number;
  number: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  html_url: string;
  user: User;
  created_at: string;
  updated_at: string;
  comments: number;
  labels: Label[];
  milestone?: {id: number; title: string} | null;
  assignees?: User[];
};

export type Label = {
  id: number;
  name: string;
  color: string;
};

export type Branch = {
  name: string;
  commit: {
    id: string;
    message: string;
    added: string[] | null;
    removed: string[] | null;
    modified: string[] | null;
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    url: string;
  };
  protected: boolean;
};

export type Comment = {
  id: number;
  html_url: string;
  body: string;
  user: User;
  created_at: string;
  updated_at: string;
};

export type PullRequest = Issue & {
  merged: boolean;
  merged_at: string | null;
  merge_commit_sha: string | null;
  head: {label: string; ref: string; sha: string; repo: Repository | null};
  base: {label: string; ref: string; sha: string; repo: Repository | null};
};

export type ContentsResponse = {
  type: 'file' | 'dir' | 'symlink' | 'submodule';
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  content: string;
  encoding: string;
};

export type RepoSearchResult = {
  data: Repository[];
  ok: boolean;
  totalCount: number;
};

export type UserSearchResult = {
  data: User[];
  ok: boolean;
  totalCount: number;
};

export type PaginationOpts = {
  page?: number;
  limit?: number;
};

// ---- Authentication ----

/**
 * Sign in using username + password.
 * Verifies credentials via Basic auth, then exchanges them for a named API
 * token that is persisted to localStorage so subsequent API calls are
 * authenticated without re-sending the password.
 *
 * Throws on bad credentials or network errors.
 */
export async function login(username: string, password: string): Promise<User> {
  // btoa only handles Latin-1 code points. Encode via TextEncoder → percent
  // encoding so that non-ASCII usernames/passwords are transmitted safely.
  const encode = (s: string) => Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join('');
  const basic = btoa(`${encode(username)}:${encode(password)}`);
  const basicHeaders = {Authorization: `Basic ${basic}`};

  // Verify credentials by fetching the current user with Basic auth.
  const userResp = await request(`${apiBase}/user`, {
    method: 'GET',
    headers: basicHeaders,
  });
  if (!userResp.ok) throw new Error('Invalid username or password.');
  const user: User = await userResp.json();

  // Create a named API token so future requests use a token instead of password.
  const tokenResp = await request(`${apiBase}/users/${encodeURIComponent(username)}/tokens`, {
    method: 'POST',
    headers: basicHeaders,
    data: {name: `gitea-spa-${Date.now()}`},
  });
  if (tokenResp.ok) {
    const tokenData: {sha1: string} = await tokenResp.json();
    setStoredToken(tokenData.sha1);
  }

  return user;
}

/** Sign out: remove the stored API token. */
export function logout(): void {
  setStoredToken(null);
}

/** Returns the currently signed-in user, or null when not signed in. */
export async function getCurrentUser(): Promise<User | null> {
  const resp = await GET(`${apiBase}/user`);
  if (resp.status === 401 || resp.status === 403) return null;
  if (!resp.ok) throw new Error(`Failed to fetch current user: ${resp.status}`);
  return resp.json();
}

// ---- Users ----

/** Get a user's public profile. */
export async function getUser(username: string): Promise<User> {
  const resp = await GET(`${apiBase}/users/${encodeURIComponent(username)}`);
  if (!resp.ok) throw new Error(`User not found: ${resp.status}`);
  return resp.json();
}

/** List repositories owned by a user. */
export async function getUserRepos(username: string, opts: PaginationOpts = {}): Promise<Repository[]> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  const resp = await GET(`${apiBase}/users/${encodeURIComponent(username)}/repos?${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch user repos: ${resp.status}`);
  return resp.json();
}

/** List organizations a user belongs to (public membership). */
export async function getUserOrgs(username: string): Promise<User[]> {
  const resp = await GET(`${apiBase}/users/${encodeURIComponent(username)}/orgs`);
  if (!resp.ok) return [];
  return resp.json();
}

/** An organization (from Gitea API). */
export type Organization = {
  id: number;
  username: string;
  name?: string;
  full_name: string;
  avatar_url: string;
  description: string;
  website: string;
  location: string;
  visibility: string;
};

/** List all organizations the authenticated user is a member of (including private). */
export async function getMyOrgs(): Promise<Organization[]> {
  const resp = await GET(`${apiBase}/user/orgs?limit=50`);
  if (!resp.ok) return [];
  return resp.json();
}

/** List repos accessible by the authenticated user (including private). */
export async function getMyRepos(opts: PaginationOpts = {}): Promise<Repository[]> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 50)});
  const resp = await GET(`${apiBase}/user/repos?${params}`);
  if (!resp.ok) return [];
  return resp.json();
}

export async function searchUsers(query: string, opts: PaginationOpts = {}): Promise<UserSearchResult> {
  const params = new URLSearchParams({q: query, page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  const resp = await GET(`${apiBase}/users/search?${params}`);
  if (!resp.ok) throw new Error(`Failed to search users: ${resp.status}`);
  const body = await resp.json() as Omit<UserSearchResult, 'totalCount'>;
  return {...body, totalCount: parseInt(resp.headers.get('X-Total-Count') ?? '0', 10)};
}

// ---- Repositories ----

/** Search public repositories (or all repos when signed in). */
export async function searchRepos(query: string, opts: PaginationOpts & {sort?: string; order?: string} = {}): Promise<RepoSearchResult> {
  const params = new URLSearchParams({
    q: query,
    page: String(opts.page ?? 1),
    limit: String(opts.limit ?? 20),
    ...(opts.sort && {sort: opts.sort}),
    ...(opts.order && {order: opts.order}),
  });
  const resp = await GET(`${apiBase}/repos/search?${params}`);
  if (!resp.ok) throw new Error(`Failed to search repos: ${resp.status}`);
  const body = await resp.json() as Omit<RepoSearchResult, 'totalCount'>;
  return {...body, totalCount: parseInt(resp.headers.get('X-Total-Count') ?? '0', 10)};
}

/** Get a single repository. */
export async function getRepo(owner: string, repo: string): Promise<Repository> {
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
  if (!resp.ok) throw new Error(`Failed to fetch repo: ${resp.status}`);
  return resp.json();
}

/** List branches of a repository. */
export async function getRepoBranches(owner: string, repo: string, opts: PaginationOpts = {}): Promise<Branch[]> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/branches?${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch branches: ${resp.status}`);
  return resp.json();
}

/** Get contents of a path in a repository (file or directory listing). */
export async function getRepoContents(owner: string, repo: string, path: string, ref?: string): Promise<ContentsResponse | ContentsResponse[]> {
  const params = ref ? `?ref=${encodeURIComponent(ref)}` : '';
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path}${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch contents: ${resp.status}`);
  return resp.json();
}

/** List issues for a repository. */
export async function getRepoIssues(owner: string, repo: string, opts: PaginationOpts & {state?: 'open' | 'closed'; type?: 'issues' | 'pulls'} = {}): Promise<Issue[]> {
  const params = new URLSearchParams({
    page: String(opts.page ?? 1),
    limit: String(opts.limit ?? 20),
    state: opts.state ?? 'open',
    type: opts.type ?? 'issues',
  });
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues?${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch issues: ${resp.status}`);
  return resp.json();
}

/** Get a single issue by its index number. */
export async function getIssue(owner: string, repo: string, index: number): Promise<Issue> {
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/${index}`);
  if (!resp.ok) throw new Error(`Failed to fetch issue: ${resp.status}`);
  return resp.json();
}

/** List comments on an issue. */
export async function getIssueComments(owner: string, repo: string, index: number, opts: PaginationOpts = {}): Promise<Comment[]> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 50)});
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/${index}/comments?${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch comments: ${resp.status}`);
  return resp.json();
}

/** List pull requests for a repository. */
export async function getPullRequests(owner: string, repo: string, opts: PaginationOpts & {state?: 'open' | 'closed'} = {}): Promise<PullRequest[]> {
  const params = new URLSearchParams({
    page: String(opts.page ?? 1),
    limit: String(opts.limit ?? 20),
    state: opts.state ?? 'open',
    type: 'pulls',
  });
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/pulls?${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch pull requests: ${resp.status}`);
  return resp.json();
}

/** Get the total number of issues (or PRs) for a repository. */
export async function getRepoIssueCount(owner: string, repo: string, state: 'open' | 'closed', type: 'issues' | 'pulls'): Promise<number> {
  const params = new URLSearchParams({state, type, limit: '1', page: '1'});
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues?${params}`);
  return parseInt(resp.headers.get('X-Total-Count') ?? '0', 10);
}

// ---- Extended types ----

export type Release = {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  prerelease: boolean;
  draft: boolean;
  created_at: string;
  published_at: string;
  author: User;
  html_url: string;
  assets: Array<{id: number; name: string; size: number; download_count: number; browser_download_url: string}>;
  zipball_url: string;
  tarball_url: string;
};

export type Commit = {
  sha: string;
  created: string;
  commit: {
    message: string;
    author: {name: string; email: string; date: string};
    committer: {name: string; email: string; date: string};
    url: string;
  };
  author: User | null;
  committer: User | null;
  html_url: string;
};

export type Tag = {
  name: string;
  message: string;
  id: string;
  commit: {sha: string; created: string; url: string};
  zipball_url: string;
  tarball_url: string;
};

export type Notification = {
  id: number;
  repository: Repository;
  subject: {
    title: string;
    url: string;
    latest_comment_url: string;
    type: 'Issue' | 'Pull' | 'Commit' | 'Repository';
    state: 'open' | 'closed' | 'merged' | '';
  };
  unread: boolean;
  pinned: boolean;
  updated_at: string;
  url: string;
};

export type WikiPage = {
  title: string;
  content_base64: string;
  last_commit: {id: string; message: string; author: {name: string; email: string; date: string}};
  html_url: string;
  subtitle: string;
};

export type Milestone = {
  id: number;
  title: string;
  description: string;
  state: 'open' | 'closed';
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  due_on: string | null;
};

// ---- Releases ----

export async function getRepoReleases(owner: string, repo: string, opts: PaginationOpts = {}): Promise<Release[]> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases?${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch releases: ${resp.status}`);
  return resp.json();
}

export async function getRepoRelease(owner: string, repo: string, id: number): Promise<Release> {
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases/${id}`);
  if (!resp.ok) throw new Error(`Failed to fetch release: ${resp.status}`);
  return resp.json();
}

export async function getRepoReleaseByTag(owner: string, repo: string, tag: string): Promise<Release> {
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases/tags/${encodeURIComponent(tag)}`);
  if (!resp.ok) throw new Error(`Failed to fetch release by tag: ${resp.status}`);
  return resp.json();
}

export async function getLatestRelease(owner: string, repo: string): Promise<Release> {
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases/latest`);
  if (!resp.ok) throw new Error(`Failed to fetch latest release: ${resp.status}`);
  return resp.json();
}

// ---- Commits ----

export async function getRepoCommits(owner: string, repo: string, opts: PaginationOpts & {sha?: string; path?: string} = {}): Promise<Commit[]> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  if (opts.sha) params.set('sha', opts.sha);
  if (opts.path) params.set('path', opts.path);
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch commits: ${resp.status}`);
  return resp.json();
}

// ---- Tags ----

export async function getRepoTags(owner: string, repo: string, opts: PaginationOpts = {}): Promise<Tag[]> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/tags?${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch tags: ${resp.status}`);
  return resp.json();
}

// ---- Notifications ----

export async function getNotifications(opts: {all?: boolean; page?: number; limit?: number} = {}): Promise<Notification[]> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  if (opts.all) params.set('all', 'true');
  const resp = await GET(`${apiBase}/notifications?${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch notifications: ${resp.status}`);
  return resp.json();
}

export async function markAllNotificationsRead(): Promise<void> {
  const resp = await PUT(`${apiBase}/notifications`);
  if (!resp.ok) throw new Error(`Failed to mark all notifications read: ${resp.status}`);
}

export async function markNotificationRead(id: number): Promise<void> {
  const resp = await PATCH(`${apiBase}/notifications/threads/${id}`);
  if (!resp.ok) throw new Error(`Failed to mark notification read: ${resp.status}`);
}

// ---- Wiki ----

export async function getWikiPage(owner: string, repo: string, pageName: string): Promise<WikiPage> {
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/wiki/page/${encodeURIComponent(pageName)}`);
  if (!resp.ok) throw new Error(`Failed to fetch wiki page: ${resp.status}`);
  return resp.json();
}

export async function listWikiPages(owner: string, repo: string, opts: PaginationOpts = {}): Promise<WikiPage[]> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/wiki/pages?${params}`);
  if (!resp.ok) throw new Error(`Failed to list wiki pages: ${resp.status}`);
  return resp.json();
}

// ---- User issues/pulls ----

export async function getUserIssues(opts: PaginationOpts & {state?: 'open' | 'closed'; type?: 'issues' | 'comment'; assigned?: boolean} = {}): Promise<Issue[]> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  if (opts.state) params.set('state', opts.state);
  if (opts.type) params.set('type', opts.type);
  if (opts.assigned) params.set('assigned', 'true');
  const resp = await GET(`${apiBase}/repos/issues/search?${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch user issues: ${resp.status}`);
  return resp.json();
}

// ---- Repo milestones ----

export async function getRepoMilestones(owner: string, repo: string, opts: PaginationOpts & {state?: 'open' | 'closed'} = {}): Promise<Milestone[]> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  if (opts.state) params.set('state', opts.state);
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/milestones?${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch milestones: ${resp.status}`);
  return resp.json();
}

export async function getRepoMilestone(owner: string, repo: string, id: number): Promise<Milestone> {
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/milestones/${id}`);
  if (!resp.ok) throw new Error(`Failed to fetch milestone: ${resp.status}`);
  return resp.json();
}

// ---- Repo labels ----

export async function getRepoLabels(owner: string, repo: string): Promise<Label[]> {
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/labels`);
  if (!resp.ok) throw new Error(`Failed to fetch labels: ${resp.status}`);
  return resp.json();
}

// ---- Issue mutations ----

export type CreateIssueOpts = {
  title: string;
  body?: string;
  assignees?: string[];
  labels?: number[];
  milestone?: number;
};

/** Create a new issue in a repository. */
export async function createIssue(owner: string, repo: string, data: CreateIssueOpts): Promise<Issue> {
  const resp = await POST(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues`, {data});
  if (!resp.ok) throw new Error(`Failed to create issue: ${resp.status}`);
  return resp.json();
}

/** Post a new comment on an issue or pull request. */
export async function createIssueComment(owner: string, repo: string, index: number, body: string): Promise<Comment> {
  const resp = await POST(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues/${index}/comments`, {data: {body}});
  if (!resp.ok) throw new Error(`Failed to post comment: ${resp.status}`);
  return resp.json();
}

// ---- Starring ----

/** Check whether the currently authenticated user has starred a repository. */
export async function isRepoStarred(owner: string, repo: string): Promise<boolean> {
  const resp = await GET(`${apiBase}/user/starred/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
  return resp.status === 204;
}

/** Star a repository as the currently authenticated user. */
export async function starRepo(owner: string, repo: string): Promise<void> {
  const resp = await PUT(`${apiBase}/user/starred/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
  if (!resp.ok) throw new Error(`Failed to star repo: ${resp.status}`);
}

/** Unstar a repository as the currently authenticated user. */
export async function unstarRepo(owner: string, repo: string): Promise<void> {
  const resp = await DELETE(`${apiBase}/user/starred/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
  if (!resp.ok) throw new Error(`Failed to unstar repo: ${resp.status}`);
}

// ---- Repo creation ----

export type CreateRepoOpts = {
  name: string;
  description?: string;
  private?: boolean;
  auto_init?: boolean;
  default_branch?: string;
};

/** Create a new repository for the authenticated user. */
export async function createRepo(data: CreateRepoOpts): Promise<Repository> {
  const resp = await POST(`${apiBase}/user/repos`, {data});
  if (!resp.ok) throw new Error(`Failed to create repo: ${resp.status}`);
  return resp.json();
}

// ---- Organizations ----

/** List all public organizations. */
export async function listOrgs(opts: PaginationOpts & {query?: string} = {}): Promise<{data: User[]; totalCount: number}> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  if (opts.query) params.set('query', opts.query);
  const resp = await GET(`${apiBase}/admin/orgs?${params}`);
  if (!resp.ok) throw new Error(`Failed to list orgs: ${resp.status}`);
  const data: User[] = await resp.json();
  return {data, totalCount: parseInt(resp.headers.get('X-Total-Count') ?? String(data.length), 10)};
}

// ---- SSH Keys ----

export type SSHKey = {
  id: number;
  key_id: number;
  title: string;
  fingerprint: string;
  created_at: string;
};

export async function listSSHKeys(): Promise<SSHKey[]> {
  const resp = await GET(`${apiBase}/user/keys`);
  if (!resp.ok) throw new Error(`Failed to list SSH keys: ${resp.status}`);
  return resp.json();
}

export async function createSSHKey(title: string, key: string): Promise<SSHKey> {
  const resp = await POST(`${apiBase}/user/keys`, {data: {title, key, read_only: false}});
  if (!resp.ok) throw new Error(`Failed to create SSH key: ${resp.status}`);
  return resp.json();
}

export async function deleteSSHKey(id: number): Promise<void> {
  const resp = await DELETE(`${apiBase}/user/keys/${id}`);
  if (!resp.ok) throw new Error(`Failed to delete SSH key: ${resp.status}`);
}

// ---- GPG Keys ----

export type GPGKey = {
  id: number;
  key_id: string;
  primary_key_id: string;
  emails: {email: string; verified: boolean}[];
  subkeys: GPGKey[];
  created_at: string;
  expires_at: string | null;
};

export async function listGPGKeys(): Promise<GPGKey[]> {
  const resp = await GET(`${apiBase}/user/gpg_keys`);
  if (!resp.ok) throw new Error(`Failed to list GPG keys: ${resp.status}`);
  return resp.json();
}

export async function createGPGKey(armored_public_key: string): Promise<GPGKey> {
  const resp = await POST(`${apiBase}/user/gpg_keys`, {data: {armored_public_key}});
  if (!resp.ok) throw new Error(`Failed to create GPG key: ${resp.status}`);
  return resp.json();
}

export async function deleteGPGKey(id: number): Promise<void> {
  const resp = await DELETE(`${apiBase}/user/gpg_keys/${id}`);
  if (!resp.ok) throw new Error(`Failed to delete GPG key: ${resp.status}`);
}

// ---- Access Tokens ----

export type AccessToken = {
  id: number;
  name: string;
  sha1?: string;
  token_last_eight: string;
  created?: string;
};

export async function listAccessTokens(username: string): Promise<AccessToken[]> {
  const resp = await GET(`${apiBase}/users/${encodeURIComponent(username)}/tokens`);
  if (!resp.ok) throw new Error(`Failed to list access tokens: ${resp.status}`);
  return resp.json();
}

export async function createAccessToken(username: string, name: string, scopes?: string[]): Promise<AccessToken> {
  const resp = await POST(`${apiBase}/users/${encodeURIComponent(username)}/tokens`, {
    data: {name, ...(scopes && {scopes})},
  });
  if (!resp.ok) throw new Error(`Failed to create access token: ${resp.status}`);
  return resp.json();
}

export async function deleteAccessToken(username: string, id: number): Promise<void> {
  const resp = await DELETE(`${apiBase}/users/${encodeURIComponent(username)}/tokens/${id}`);
  if (!resp.ok) throw new Error(`Failed to delete access token: ${resp.status}`);
}

// ---- Email Addresses ----

export type EmailAddress = {
  email: string;
  verified: boolean;
  primary: boolean;
};

export async function listEmails(): Promise<EmailAddress[]> {
  const resp = await GET(`${apiBase}/user/emails`);
  if (!resp.ok) throw new Error(`Failed to list emails: ${resp.status}`);
  return resp.json();
}

export async function addEmail(email: string): Promise<EmailAddress[]> {
  const resp = await POST(`${apiBase}/user/emails`, {data: {emails: [email]}});
  if (!resp.ok) throw new Error(`Failed to add email: ${resp.status}`);
  return resp.json();
}

export async function deleteEmail(email: string): Promise<void> {
  const resp = await DELETE(`${apiBase}/user/emails`, {data: {emails: [email]}});
  if (!resp.ok) throw new Error(`Failed to delete email: ${resp.status}`);
}

// ---- Admin ----

export async function listAdminUsers(opts: PaginationOpts = {}): Promise<{data: User[]; totalCount: number}> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  const resp = await GET(`${apiBase}/admin/users?${params}`);
  if (!resp.ok) throw new Error(`Failed to list admin users: ${resp.status}`);
  const data: User[] = await resp.json();
  return {data, totalCount: parseInt(resp.headers.get('X-Total-Count') ?? String(data.length), 10)};
}

export async function listAdminOrgs(opts: PaginationOpts = {}): Promise<{data: User[]; totalCount: number}> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  const resp = await GET(`${apiBase}/admin/orgs?${params}`);
  if (!resp.ok) throw new Error(`Failed to list admin orgs: ${resp.status}`);
  const data: User[] = await resp.json();
  return {data, totalCount: parseInt(resp.headers.get('X-Total-Count') ?? String(data.length), 10)};
}

export async function listAdminRepos(opts: PaginationOpts = {}): Promise<{data: Repository[]; totalCount: number}> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  const resp = await GET(`${apiBase}/repos/search?${params}&limit=${opts.limit ?? 20}`);
  if (!resp.ok) throw new Error(`Failed to list repos: ${resp.status}`);
  const body = await resp.json() as {data: Repository[]};
  return {data: body.data ?? [], totalCount: parseInt(resp.headers.get('X-Total-Count') ?? String(body.data?.length ?? 0), 10)};
}

// ---- Activity feeds ----

export type ActivityFeed = {
  id: number;
  op_type: string;
  act_user: User;
  repo: Repository | null;
  ref_name: string;
  content: string;
  created: string;
};

export async function getRepoActivityFeeds(owner: string, repo: string, opts: PaginationOpts = {}): Promise<ActivityFeed[]> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/activities/feeds?${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch activity feeds: ${resp.status}`);
  return resp.json();
}

export async function getUserActivityFeeds(username: string, opts: PaginationOpts = {}): Promise<ActivityFeed[]> {
  const params = new URLSearchParams({page: String(opts.page ?? 1), limit: String(opts.limit ?? 20)});
  const resp = await GET(`${apiBase}/users/${encodeURIComponent(username)}/activities/feeds?${params}`);
  if (!resp.ok) throw new Error(`Failed to fetch user activity feeds: ${resp.status}`);
  return resp.json();
}

// ---- Password change / account deletion ----

export async function changePassword(oldPassword: string, newPassword: string): Promise<void> {
  const resp = await request(`${apiBase}/user/change_password`, {
    method: 'POST',
    data: {old_password: oldPassword, new_password: newPassword},
  });
  if (!resp.ok) {
    let body: {message: string} = {message: 'Unknown error'};
    try { body = await resp.json() as typeof body; } catch { /* ignore */ }
    throw new Error(body.message ?? `Failed to change password: ${resp.status}`);
  }
}

export async function deleteSelf(): Promise<void> {
  const resp = await request(`${apiBase}/user`, {method: 'DELETE'});
  if (!resp.ok) {
    let body: {message: string} = {message: 'Unknown error'};
    try { body = await resp.json() as typeof body; } catch { /* ignore */ }
    throw new Error(body.message ?? `Failed to delete account: ${resp.status}`);
  }
}

// ---- Blocked users ----

export type BlockedUser = User;

export async function listBlockedUsers(page = 1, limit = 50): Promise<BlockedUser[]> {
  const resp = await GET(`${apiBase}/user/blocks?page=${page}&limit=${limit}`);
  if (!resp.ok) throw new Error(`Failed to list blocked users: ${resp.status}`);
  return resp.json() as Promise<BlockedUser[]>;
}

export async function unblockUser(username: string): Promise<void> {
  const resp = await DELETE(`${apiBase}/user/blocks/${encodeURIComponent(username)}`);
  if (!resp.ok) throw new Error(`Failed to unblock user: ${resp.status}`);
}

// ---- User webhooks ----

export type WebhookConfig = {url?: string; content_type?: string};
export type Webhook = {
  id: number;
  type: string;
  active: boolean;
  config: WebhookConfig;
  events: string[];
  created: string;
};

export async function listUserHooks(page = 1, limit = 50): Promise<Webhook[]> {
  const resp = await GET(`${apiBase}/user/hooks?page=${page}&limit=${limit}`);
  if (!resp.ok) throw new Error(`Failed to list webhooks: ${resp.status}`);
  return resp.json() as Promise<Webhook[]>;
}

export async function createUserHook(url: string, contentType: string, events: string[]): Promise<Webhook> {
  const resp = await POST(`${apiBase}/user/hooks`, {
    data: {type: 'gitea', active: true, config: {url, content_type: contentType}, events},
  });
  if (!resp.ok) throw new Error(`Failed to create webhook: ${resp.status}`);
  return resp.json() as Promise<Webhook>;
}

export async function deleteUserHook(id: number): Promise<void> {
  const resp = await DELETE(`${apiBase}/user/hooks/${id}`);
  if (!resp.ok) throw new Error(`Failed to delete webhook: ${resp.status}`);
}

// ---- Actions permissions ----

export type UserActionsPermissions = {
  token_permission_mode: string;
  allowed_cross_repo_ids: number[];
};

export async function getUserActionsPermissions(): Promise<UserActionsPermissions> {
  const resp = await GET(`${apiBase}/user/actions/permissions`);
  if (!resp.ok) throw new Error(`Failed to get actions permissions: ${resp.status}`);
  return resp.json() as Promise<UserActionsPermissions>;
}

export async function setUserActionsPermissions(perms: UserActionsPermissions): Promise<UserActionsPermissions> {
  const resp = await PUT(`${apiBase}/user/actions/permissions`, {data: perms});
  if (!resp.ok) throw new Error(`Failed to update actions permissions: ${resp.status}`);
  return resp.json() as Promise<UserActionsPermissions>;
}

// ---- Leave organization ----

export async function leaveOrganization(orgName: string, username: string): Promise<void> {
  const resp = await DELETE(`${apiBase}/orgs/${encodeURIComponent(orgName)}/members/${encodeURIComponent(username)}`);
  if (!resp.ok) throw new Error(`Failed to leave organization: ${resp.status}`);
}

// ---- Actions Secrets (user-level) ----

export type ActionSecret = {
  name: string;
  description: string;
  created_at: string;
};

export async function listUserSecrets(): Promise<ActionSecret[]> {
  const resp = await GET(`${apiBase}/user/actions/secrets?limit=50`);
  if (!resp.ok) throw new Error(`Failed to list secrets: ${resp.status}`);
  return resp.json() as Promise<ActionSecret[]>;
}

export async function setUserSecret(name: string, data: string, description?: string): Promise<void> {
  const resp = await PUT(`${apiBase}/user/actions/secrets/${encodeURIComponent(name)}`, {data: {data, description: description ?? ''}});
  if (!resp.ok) throw new Error(`Failed to set secret: ${resp.status}`);
}

export async function deleteUserSecret(name: string): Promise<void> {
  const resp = await DELETE(`${apiBase}/user/actions/secrets/${encodeURIComponent(name)}`);
  if (!resp.ok) throw new Error(`Failed to delete secret: ${resp.status}`);
}

// ---- Actions Variables (user-level) ----

export type ActionVariable = {
  name: string;
  data: string;
  description: string;
};

export async function listUserVariables(): Promise<ActionVariable[]> {
  const resp = await GET(`${apiBase}/user/actions/variables?limit=50`);
  if (!resp.ok) throw new Error(`Failed to list variables: ${resp.status}`);
  return resp.json() as Promise<ActionVariable[]>;
}

export async function createUserVariable(name: string, value: string, description?: string): Promise<void> {
  const resp = await POST(`${apiBase}/user/actions/variables/${encodeURIComponent(name)}`, {data: {value, description: description ?? ''}});
  if (!resp.ok) throw new Error(`Failed to create variable: ${resp.status}`);
}

export async function updateUserVariable(name: string, value: string, description?: string): Promise<void> {
  const resp = await PUT(`${apiBase}/user/actions/variables/${encodeURIComponent(name)}`, {data: {value, description: description ?? ''}});
  if (!resp.ok) throw new Error(`Failed to update variable: ${resp.status}`);
}

export async function deleteUserVariable(name: string): Promise<void> {
  const resp = await DELETE(`${apiBase}/user/actions/variables/${encodeURIComponent(name)}`);
  if (!resp.ok) throw new Error(`Failed to delete variable: ${resp.status}`);
}

// ---- Actions Runners (user-level) ----

export type ActionRunner = {
  id: number;
  name: string;
  status: string;
  busy: boolean;
  disabled: boolean;
  labels: Array<{id: number; name: string; type: string}>;
};

export type ActionRunnerToken = {token: string; token_is_expired: boolean};

export async function listUserRunners(): Promise<ActionRunner[]> {
  const resp = await GET(`${apiBase}/user/actions/runners`);
  if (!resp.ok) throw new Error(`Failed to list runners: ${resp.status}`);
  const data = await resp.json() as {runners: ActionRunner[]};
  return data.runners ?? [];
}

export async function getUserRunnerRegistrationToken(): Promise<string> {
  const resp = await POST(`${apiBase}/user/actions/runners/registration-token`, {});
  if (!resp.ok) throw new Error(`Failed to get registration token: ${resp.status}`);
  const data = await resp.json() as ActionRunnerToken;
  return data.token;
}

export async function deleteUserRunner(id: number): Promise<void> {
  const resp = await DELETE(`${apiBase}/user/actions/runners/${id}`);
  if (!resp.ok) throw new Error(`Failed to delete runner: ${resp.status}`);
}

// ---- OAuth2 Applications ----

export type OAuth2Application = {
  id: number;
  name: string;
  client_id: string;
  client_secret: string;
  confidential_client: boolean;
  skip_secondary_authorization: boolean;
  redirect_uris: string[];
  created: string;
};

export async function listOAuth2Applications(): Promise<OAuth2Application[]> {
  const resp = await GET(`${apiBase}/user/applications/oauth2?limit=50`);
  if (!resp.ok) throw new Error(`Failed to list OAuth2 applications: ${resp.status}`);
  return resp.json() as Promise<OAuth2Application[]>;
}

export async function getOAuth2Application(id: number): Promise<OAuth2Application> {
  const resp = await GET(`${apiBase}/user/applications/oauth2/${id}`);
  if (!resp.ok) throw new Error(`Failed to get OAuth2 application: ${resp.status}`);
  return resp.json() as Promise<OAuth2Application>;
}

export type CreateOAuth2ApplicationOptions = {
  name: string;
  redirect_uris: string[];
  confidential_client?: boolean;
  skip_secondary_authorization?: boolean;
};

export async function createOAuth2Application(opts: CreateOAuth2ApplicationOptions): Promise<OAuth2Application> {
  const resp = await POST(`${apiBase}/user/applications/oauth2`, {data: opts});
  if (!resp.ok) throw new Error(`Failed to create OAuth2 application: ${resp.status}`);
  return resp.json() as Promise<OAuth2Application>;
}

export async function updateOAuth2Application(id: number, opts: CreateOAuth2ApplicationOptions): Promise<OAuth2Application> {
  const resp = await PATCH(`${apiBase}/user/applications/oauth2/${id}`, {data: opts});
  if (!resp.ok) throw new Error(`Failed to update OAuth2 application: ${resp.status}`);
  return resp.json() as Promise<OAuth2Application>;
}

export async function deleteOAuth2Application(id: number): Promise<void> {
  const resp = await DELETE(`${apiBase}/user/applications/oauth2/${id}`);
  if (!resp.ok) throw new Error(`Failed to delete OAuth2 application: ${resp.status}`);
}

// ---- OAuth2 Grants ----

export type OAuth2Grant = {
  id: number;
  user_id: number;
  application_id: number;
  application_name: string;
  scope: string;
  created: string;
};

export async function listOAuth2Grants(): Promise<OAuth2Grant[]> {
  const resp = await GET(`${apiBase}/user/applications/grants`);
  if (!resp.ok) throw new Error(`Failed to list OAuth2 grants: ${resp.status}`);
  return resp.json() as Promise<OAuth2Grant[]>;
}

export async function revokeOAuth2Grant(id: number): Promise<void> {
  const resp = await DELETE(`${apiBase}/user/applications/grants/${id}`);
  if (!resp.ok) throw new Error(`Failed to revoke OAuth2 grant: ${resp.status}`);
}
