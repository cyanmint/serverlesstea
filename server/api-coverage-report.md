# API Coverage Report

**Total endpoints:** 53 | **Correct:** 53 | **Stub:** 0 | **Malfunction:** 0 | **Missing:** 0

| Endpoint | Method | Path | Status | Note |
|----------|--------|------|--------|------|
| installCheck | `GET` | `/api/v1/settings/api` | **correct** | DB-backed implementation |
| getCurrentUser | `GET` | `/api/v1/user` | **correct** | DB-backed implementation |
| createToken | `POST` | `/api/v1/users/{username}/tokens` | **correct** | DB-backed implementation |
| getUser | `GET` | `/api/v1/users/{username}` | **correct** | DB-backed implementation |
| getUserRepos | `GET` | `/api/v1/users/{username}/repos` | **correct** | DB-backed implementation |
| getUserOrgs | `GET` | `/api/v1/users/{username}/orgs` | **correct** | DB-backed implementation |
| searchUsers | `GET` | `/api/v1/users/search` | **correct** | DB-backed implementation |
| searchRepos | `GET` | `/api/v1/repos/search` | **correct** | DB-backed implementation |
| getRepo | `GET` | `/api/v1/repos/{owner}/{repo}` | **correct** | DB-backed implementation |
| getRepoBranches | `GET` | `/api/v1/repos/{owner}/{repo}/branches` | **correct** | DB-backed implementation |
| getRepoContents | `GET` | `/api/v1/repos/{owner}/{repo}/contents/{path}` | **correct** | DB-backed implementation |
| getRepoIssues | `GET` | `/api/v1/repos/{owner}/{repo}/issues` | **correct** | DB-backed implementation |
| getIssue | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}` | **correct** | DB-backed implementation |
| getIssueComments | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}/comments` | **correct** | DB-backed implementation |
| createIssue | `POST` | `/api/v1/repos/{owner}/{repo}/issues` | **correct** | DB-backed implementation |
| createIssueComment | `POST` | `/api/v1/repos/{owner}/{repo}/issues/{index}/comments` | **correct** | DB-backed implementation |
| getPullRequests | `GET` | `/api/v1/repos/{owner}/{repo}/pulls` | **correct** | DB-backed implementation |
| getRepoReleases | `GET` | `/api/v1/repos/{owner}/{repo}/releases` | **correct** | DB-backed implementation |
| getRepoRelease | `GET` | `/api/v1/repos/{owner}/{repo}/releases/{id}` | **correct** | DB-backed implementation |
| getRepoReleaseByTag | `GET` | `/api/v1/repos/{owner}/{repo}/releases/tags/{tag}` | **correct** | DB-backed implementation |
| getLatestRelease | `GET` | `/api/v1/repos/{owner}/{repo}/releases/latest` | **correct** | DB-backed implementation |
| getRepoCommits | `GET` | `/api/v1/repos/{owner}/{repo}/commits` | **correct** | DB-backed implementation |
| getRepoTags | `GET` | `/api/v1/repos/{owner}/{repo}/tags` | **correct** | DB-backed implementation |
| getRepoLabels | `GET` | `/api/v1/repos/{owner}/{repo}/labels` | **correct** | DB-backed implementation |
| getRepoMilestones | `GET` | `/api/v1/repos/{owner}/{repo}/milestones` | **correct** | DB-backed implementation |
| getRepoMilestone | `GET` | `/api/v1/repos/{owner}/{repo}/milestones/{id}` | **correct** | DB-backed implementation |
| getRepoActivityFeeds | `GET` | `/api/v1/repos/{owner}/{repo}/activities/feeds` | **correct** | DB-backed implementation |
| isRepoStarred | `GET` | `/api/v1/user/starred/{owner}/{repo}` | **correct** | DB-backed implementation |
| starRepo | `PUT` | `/api/v1/user/starred/{owner}/{repo}` | **correct** | DB-backed implementation |
| unstarRepo | `DELETE` | `/api/v1/user/starred/{owner}/{repo}` | **correct** | DB-backed implementation |
| createRepo | `POST` | `/api/v1/user/repos` | **correct** | DB-backed implementation |
| getWikiPage | `GET` | `/api/v1/repos/{owner}/{repo}/wiki/page/{pageName}` | **correct** | DB-backed implementation |
| listWikiPages | `GET` | `/api/v1/repos/{owner}/{repo}/wiki/pages` | **correct** | DB-backed implementation |
| getUserIssues | `GET` | `/api/v1/repos/issues/search` | **correct** | DB-backed implementation |
| getNotifications | `GET` | `/api/v1/notifications` | **correct** | DB-backed implementation |
| markAllNotificationsRead | `PUT` | `/api/v1/notifications` | **correct** | DB-backed implementation |
| markNotificationRead | `PATCH` | `/api/v1/notifications/threads/{id}` | **correct** | DB-backed implementation |
| listOrgs | `GET` | `/api/v1/admin/orgs` | **correct** | DB-backed implementation |
| listAdminUsers | `GET` | `/api/v1/admin/users` | **correct** | DB-backed implementation |
| listSSHKeys | `GET` | `/api/v1/user/keys` | **correct** | DB-backed implementation |
| createSSHKey | `POST` | `/api/v1/user/keys` | **correct** | DB-backed implementation |
| deleteSSHKey | `DELETE` | `/api/v1/user/keys/{id}` | **correct** | DB-backed implementation |
| listGPGKeys | `GET` | `/api/v1/user/gpg_keys` | **correct** | DB-backed implementation |
| createGPGKey | `POST` | `/api/v1/user/gpg_keys` | **correct** | DB-backed implementation |
| deleteGPGKey | `DELETE` | `/api/v1/user/gpg_keys/{id}` | **correct** | DB-backed implementation |
| listAccessTokens | `GET` | `/api/v1/users/{username}/tokens` | **correct** | DB-backed implementation |
| createAccessToken | `POST` | `/api/v1/users/{username}/tokens` | **correct** | DB-backed implementation |
| deleteAccessToken | `DELETE` | `/api/v1/users/{username}/tokens/{id}` | **correct** | DB-backed implementation |
| listEmails | `GET` | `/api/v1/user/emails` | **correct** | DB-backed implementation |
| addEmail | `POST` | `/api/v1/user/emails` | **correct** | DB-backed implementation |
| deleteEmail | `DELETE` | `/api/v1/user/emails` | **correct** | DB-backed implementation |
| changePassword | `POST` | `/api/v1/user/change_password` | **correct** | DB-backed implementation |
| deleteSelf | `DELETE` | `/api/v1/user` | **correct** | DB-backed implementation |