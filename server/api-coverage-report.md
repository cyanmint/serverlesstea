# API Coverage Report

**Total endpoints:** 63 | **Correct:** 55 | **Stub:** 8 | **Malfunction:** 0 | **Missing:** 0

| Endpoint | Method | Path | Status | Note |
|----------|--------|------|--------|------|
| POST /api/auth/register | `POST` | `/api/auth/register` | **stub** | No DB/git operations — returns minimal data |
| POST /api/auth/login | `POST` | `/api/auth/login` | **stub** | No DB/git operations — returns minimal data |
| GET /api/v1/settings/api | `GET` | `/api/v1/settings/api` | **correct** | DB/git-backed implementation |
| GET /api/v1/user | `GET` | `/api/v1/user` | **stub** | No DB/git operations — returns minimal data |
| DELETE /api/v1/user | `DELETE` | `/api/v1/user` | **stub** | No DB/git operations — returns minimal data |
| POST /api/v1/user/change_password | `POST` | `/api/v1/user/change_password` | **correct** | DB/git-backed implementation |
| GET /api/v1/user/starred/{owner}/{repo} | `GET` | `/api/v1/user/starred/{owner}/{repo}` | **correct** | DB/git-backed implementation |
| PUT /api/v1/user/starred/{owner}/{repo} | `PUT` | `/api/v1/user/starred/{owner}/{repo}` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/user/starred/{owner}/{repo} | `DELETE` | `/api/v1/user/starred/{owner}/{repo}` | **correct** | DB/git-backed implementation |
| GET /api/v1/user/repos | `GET` | `/api/v1/user/repos` | **correct** | DB/git-backed implementation |
| GET /api/v1/user/orgs | `GET` | `/api/v1/user/orgs` | **correct** | DB/git-backed implementation |
| POST /api/v1/user/repos | `POST` | `/api/v1/user/repos` | **correct** | DB/git-backed implementation |
| GET /api/v1/user/keys | `GET` | `/api/v1/user/keys` | **stub** | No DB/git operations — returns minimal data |
| POST /api/v1/user/keys | `POST` | `/api/v1/user/keys` | **stub** | No DB/git operations — returns minimal data |
| DELETE /api/v1/user/keys/{id} | `DELETE` | `/api/v1/user/keys/{id}` | **correct** | DB/git-backed implementation |
| GET /api/v1/user/gpg_keys | `GET` | `/api/v1/user/gpg_keys` | **correct** | DB/git-backed implementation |
| POST /api/v1/user/gpg_keys | `POST` | `/api/v1/user/gpg_keys` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/user/gpg_keys/{id} | `DELETE` | `/api/v1/user/gpg_keys/{id}` | **correct** | DB/git-backed implementation |
| GET /api/v1/user/emails | `GET` | `/api/v1/user/emails` | **correct** | DB/git-backed implementation |
| POST /api/v1/user/emails | `POST` | `/api/v1/user/emails` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/user/emails | `DELETE` | `/api/v1/user/emails` | **correct** | DB/git-backed implementation |
| GET /api/v1/users/search | `GET` | `/api/v1/users/search` | **correct** | DB/git-backed implementation |
| GET /api/v1/users/{username} | `GET` | `/api/v1/users/{username}` | **correct** | DB/git-backed implementation |
| GET /api/v1/users/{username}/repos | `GET` | `/api/v1/users/{username}/repos` | **correct** | DB/git-backed implementation |
| GET /api/v1/users/{username}/orgs | `GET` | `/api/v1/users/{username}/orgs` | **correct** | DB/git-backed implementation |
| GET /api/v1/users/{username}/tokens | `GET` | `/api/v1/users/{username}/tokens` | **correct** | DB/git-backed implementation |
| POST /api/v1/users/{username}/tokens | `POST` | `/api/v1/users/{username}/tokens` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/users/{username}/tokens/{id} | `DELETE` | `/api/v1/users/{username}/tokens/{id}` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/search | `GET` | `/api/v1/repos/search` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/issues/search | `GET` | `/api/v1/repos/issues/search` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo} | `GET` | `/api/v1/repos/{owner}/{repo}` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/branches | `GET` | `/api/v1/repos/{owner}/{repo}/branches` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/contents/{path} | `GET` | `/api/v1/repos/{owner}/{repo}/contents/{path}` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/commits | `GET` | `/api/v1/repos/{owner}/{repo}/commits` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/tags | `GET` | `/api/v1/repos/{owner}/{repo}/tags` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/labels | `GET` | `/api/v1/repos/{owner}/{repo}/labels` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/milestones | `GET` | `/api/v1/repos/{owner}/{repo}/milestones` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/milestones/{id} | `GET` | `/api/v1/repos/{owner}/{repo}/milestones/{id}` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/activities/feeds | `GET` | `/api/v1/repos/{owner}/{repo}/activities/feeds` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/releases | `GET` | `/api/v1/repos/{owner}/{repo}/releases` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/releases/tags/{tag} | `GET` | `/api/v1/repos/{owner}/{repo}/releases/tags/{tag}` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/releases/latest | `GET` | `/api/v1/repos/{owner}/{repo}/releases/latest` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/releases/{id} | `GET` | `/api/v1/repos/{owner}/{repo}/releases/{id}` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/issues | `GET` | `/api/v1/repos/{owner}/{repo}/issues` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/issues/{index} | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/issues/{index}/comments | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}/comments` | **correct** | DB/git-backed implementation |
| POST /api/v1/repos/{owner}/{repo}/issues | `POST` | `/api/v1/repos/{owner}/{repo}/issues` | **correct** | DB/git-backed implementation |
| POST /api/v1/repos/{owner}/{repo}/issues/{index}/comments | `POST` | `/api/v1/repos/{owner}/{repo}/issues/{index}/comments` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/pulls | `GET` | `/api/v1/repos/{owner}/{repo}/pulls` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/wiki/page/{pageName} | `GET` | `/api/v1/repos/{owner}/{repo}/wiki/page/{pageName}` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/wiki/pages | `GET` | `/api/v1/repos/{owner}/{repo}/wiki/pages` | **correct** | DB/git-backed implementation |
| GET /api/v1/notifications | `GET` | `/api/v1/notifications` | **stub** | No DB/git operations — returns minimal data |
| PUT /api/v1/notifications | `PUT` | `/api/v1/notifications` | **stub** | No DB/git operations — returns minimal data |
| PATCH /api/v1/notifications/threads/{id} | `PATCH` | `/api/v1/notifications/threads/{id}` | **correct** | DB/git-backed implementation |
| GET /api/v1/admin/orgs | `GET` | `/api/v1/admin/orgs` | **correct** | DB/git-backed implementation |
| GET /api/v1/admin/users | `GET` | `/api/v1/admin/users` | **correct** | DB/git-backed implementation |
| POST /api/v1/admin/users | `POST` | `/api/v1/admin/users` | **correct** | DB/git-backed implementation |
| GET /api/v1/admin/users/{username} | `GET` | `/api/v1/admin/users/{username}` | **correct** | DB/git-backed implementation |
| PUT /api/v1/admin/users/{username} | `PUT` | `/api/v1/admin/users/{username}` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/admin/users/{username} | `DELETE` | `/api/v1/admin/users/{username}` | **correct** | DB/git-backed implementation |
| GET /git/{owner}/{repo}.git/info/refs | `GET` | `/git/{owner}/{repo}.git/info/refs` | **correct** | DB/git-backed implementation |
| POST /git/{owner}/{repo}.git/git-receive-pack | `POST` | `/git/{owner}/{repo}.git/git-receive-pack` | **correct** | DB/git-backed implementation |
| POST /git/{owner}/{repo}.git/git-upload-pack | `POST` | `/git/{owner}/{repo}.git/git-upload-pack` | **correct** | DB/git-backed implementation |