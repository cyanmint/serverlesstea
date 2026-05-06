# API Coverage Report

**Total endpoints:** 498 | **Correct:** 55 | **Stub:** 8 | **Malfunction:** 0 | **Missing:** 435

| Endpoint | Method | Path | Status | Note |
|----------|--------|------|--------|------|
| GET /api/v1/admin/actions/jobs | `GET` | `/api/v1/admin/actions/jobs` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/actions/runners | `GET` | `/api/v1/admin/actions/runners` | **missing** | Route not registered — returns 404 |
| POST /api/v1/admin/actions/runners/registration-token | `POST` | `/api/v1/admin/actions/runners/registration-token` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/actions/runners/{runner_id} | `GET` | `/api/v1/admin/actions/runners/{runner_id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/admin/actions/runners/{runner_id} | `DELETE` | `/api/v1/admin/actions/runners/{runner_id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/admin/actions/runners/{runner_id} | `PATCH` | `/api/v1/admin/actions/runners/{runner_id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/actions/runs | `GET` | `/api/v1/admin/actions/runs` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/auths | `GET` | `/api/v1/admin/auths` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/config/settings | `GET` | `/api/v1/admin/config/settings` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/admin/config/settings | `PATCH` | `/api/v1/admin/config/settings` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/cron | `GET` | `/api/v1/admin/cron` | **missing** | Route not registered — returns 404 |
| POST /api/v1/admin/cron/{task} | `POST` | `/api/v1/admin/cron/{task}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/emails | `GET` | `/api/v1/admin/emails` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/emails/search | `GET` | `/api/v1/admin/emails/search` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/hooks | `GET` | `/api/v1/admin/hooks` | **missing** | Route not registered — returns 404 |
| POST /api/v1/admin/hooks | `POST` | `/api/v1/admin/hooks` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/hooks/{id} | `GET` | `/api/v1/admin/hooks/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/admin/hooks/{id} | `DELETE` | `/api/v1/admin/hooks/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/admin/hooks/{id} | `PATCH` | `/api/v1/admin/hooks/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/monitor/queues | `GET` | `/api/v1/admin/monitor/queues` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/monitor/stacktrace | `GET` | `/api/v1/admin/monitor/stacktrace` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/orgs | `GET` | `/api/v1/admin/orgs` | **correct** | DB/git-backed implementation |
| GET /api/v1/admin/self_check | `GET` | `/api/v1/admin/self_check` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/unadopted | `GET` | `/api/v1/admin/unadopted` | **missing** | Route not registered — returns 404 |
| POST /api/v1/admin/unadopted/{owner}/{repo} | `POST` | `/api/v1/admin/unadopted/{owner}/{repo}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/admin/unadopted/{owner}/{repo} | `DELETE` | `/api/v1/admin/unadopted/{owner}/{repo}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/users | `GET` | `/api/v1/admin/users` | **correct** | DB/git-backed implementation |
| POST /api/v1/admin/users | `POST` | `/api/v1/admin/users` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/admin/users/{username} | `DELETE` | `/api/v1/admin/users/{username}` | **correct** | DB/git-backed implementation |
| PATCH /api/v1/admin/users/{username} | `PATCH` | `/api/v1/admin/users/{username}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/admin/users/{username}/badges | `GET` | `/api/v1/admin/users/{username}/badges` | **missing** | Route not registered — returns 404 |
| POST /api/v1/admin/users/{username}/badges | `POST` | `/api/v1/admin/users/{username}/badges` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/admin/users/{username}/badges | `DELETE` | `/api/v1/admin/users/{username}/badges` | **missing** | Route not registered — returns 404 |
| POST /api/v1/admin/users/{username}/keys | `POST` | `/api/v1/admin/users/{username}/keys` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/admin/users/{username}/keys/{id} | `DELETE` | `/api/v1/admin/users/{username}/keys/{id}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/admin/users/{username}/orgs | `POST` | `/api/v1/admin/users/{username}/orgs` | **missing** | Route not registered — returns 404 |
| POST /api/v1/admin/users/{username}/rename | `POST` | `/api/v1/admin/users/{username}/rename` | **missing** | Route not registered — returns 404 |
| POST /api/v1/admin/users/{username}/repos | `POST` | `/api/v1/admin/users/{username}/repos` | **missing** | Route not registered — returns 404 |
| GET /api/v1/gitignore/templates | `GET` | `/api/v1/gitignore/templates` | **missing** | Route not registered — returns 404 |
| GET /api/v1/gitignore/templates/{name} | `GET` | `/api/v1/gitignore/templates/{name}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/label/templates | `GET` | `/api/v1/label/templates` | **missing** | Route not registered — returns 404 |
| GET /api/v1/label/templates/{name} | `GET` | `/api/v1/label/templates/{name}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/licenses | `GET` | `/api/v1/licenses` | **missing** | Route not registered — returns 404 |
| GET /api/v1/licenses/{name} | `GET` | `/api/v1/licenses/{name}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/markdown | `POST` | `/api/v1/markdown` | **missing** | Route not registered — returns 404 |
| POST /api/v1/markdown/raw | `POST` | `/api/v1/markdown/raw` | **missing** | Route not registered — returns 404 |
| POST /api/v1/markup | `POST` | `/api/v1/markup` | **missing** | Route not registered — returns 404 |
| GET /api/v1/notifications | `GET` | `/api/v1/notifications` | **stub** | No DB/git operations — returns minimal data |
| PUT /api/v1/notifications | `PUT` | `/api/v1/notifications` | **stub** | No DB/git operations — returns minimal data |
| GET /api/v1/notifications/new | `GET` | `/api/v1/notifications/new` | **missing** | Route not registered — returns 404 |
| GET /api/v1/notifications/threads/{id} | `GET` | `/api/v1/notifications/threads/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/notifications/threads/{id} | `PATCH` | `/api/v1/notifications/threads/{id}` | **correct** | DB/git-backed implementation |
| POST /api/v1/org/{org}/repos | `POST` | `/api/v1/org/{org}/repos` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs | `GET` | `/api/v1/orgs` | **missing** | Route not registered — returns 404 |
| POST /api/v1/orgs | `POST` | `/api/v1/orgs` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org} | `GET` | `/api/v1/orgs/{org}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/orgs/{org} | `DELETE` | `/api/v1/orgs/{org}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/orgs/{org} | `PATCH` | `/api/v1/orgs/{org}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/actions/jobs | `GET` | `/api/v1/orgs/{org}/actions/jobs` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/actions/runners | `GET` | `/api/v1/orgs/{org}/actions/runners` | **missing** | Route not registered — returns 404 |
| POST /api/v1/orgs/{org}/actions/runners/registration-token | `POST` | `/api/v1/orgs/{org}/actions/runners/registration-token` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/actions/runners/{runner_id} | `GET` | `/api/v1/orgs/{org}/actions/runners/{runner_id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/orgs/{org}/actions/runners/{runner_id} | `DELETE` | `/api/v1/orgs/{org}/actions/runners/{runner_id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/orgs/{org}/actions/runners/{runner_id} | `PATCH` | `/api/v1/orgs/{org}/actions/runners/{runner_id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/actions/runs | `GET` | `/api/v1/orgs/{org}/actions/runs` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/actions/secrets | `GET` | `/api/v1/orgs/{org}/actions/secrets` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/orgs/{org}/actions/secrets/{secretname} | `PUT` | `/api/v1/orgs/{org}/actions/secrets/{secretname}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/orgs/{org}/actions/secrets/{secretname} | `DELETE` | `/api/v1/orgs/{org}/actions/secrets/{secretname}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/actions/variables | `GET` | `/api/v1/orgs/{org}/actions/variables` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/actions/variables/{variablename} | `GET` | `/api/v1/orgs/{org}/actions/variables/{variablename}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/orgs/{org}/actions/variables/{variablename} | `PUT` | `/api/v1/orgs/{org}/actions/variables/{variablename}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/orgs/{org}/actions/variables/{variablename} | `POST` | `/api/v1/orgs/{org}/actions/variables/{variablename}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/orgs/{org}/actions/variables/{variablename} | `DELETE` | `/api/v1/orgs/{org}/actions/variables/{variablename}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/activities/feeds | `GET` | `/api/v1/orgs/{org}/activities/feeds` | **missing** | Route not registered — returns 404 |
| POST /api/v1/orgs/{org}/avatar | `POST` | `/api/v1/orgs/{org}/avatar` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/orgs/{org}/avatar | `DELETE` | `/api/v1/orgs/{org}/avatar` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/blocks | `GET` | `/api/v1/orgs/{org}/blocks` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/blocks/{username} | `GET` | `/api/v1/orgs/{org}/blocks/{username}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/orgs/{org}/blocks/{username} | `PUT` | `/api/v1/orgs/{org}/blocks/{username}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/orgs/{org}/blocks/{username} | `DELETE` | `/api/v1/orgs/{org}/blocks/{username}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/hooks | `GET` | `/api/v1/orgs/{org}/hooks` | **missing** | Route not registered — returns 404 |
| POST /api/v1/orgs/{org}/hooks | `POST` | `/api/v1/orgs/{org}/hooks` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/hooks/{id} | `GET` | `/api/v1/orgs/{org}/hooks/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/orgs/{org}/hooks/{id} | `DELETE` | `/api/v1/orgs/{org}/hooks/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/orgs/{org}/hooks/{id} | `PATCH` | `/api/v1/orgs/{org}/hooks/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/labels | `GET` | `/api/v1/orgs/{org}/labels` | **missing** | Route not registered — returns 404 |
| POST /api/v1/orgs/{org}/labels | `POST` | `/api/v1/orgs/{org}/labels` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/labels/{id} | `GET` | `/api/v1/orgs/{org}/labels/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/orgs/{org}/labels/{id} | `DELETE` | `/api/v1/orgs/{org}/labels/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/orgs/{org}/labels/{id} | `PATCH` | `/api/v1/orgs/{org}/labels/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/members | `GET` | `/api/v1/orgs/{org}/members` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/members/{username} | `GET` | `/api/v1/orgs/{org}/members/{username}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/orgs/{org}/members/{username} | `DELETE` | `/api/v1/orgs/{org}/members/{username}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/public_members | `GET` | `/api/v1/orgs/{org}/public_members` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/public_members/{username} | `GET` | `/api/v1/orgs/{org}/public_members/{username}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/orgs/{org}/public_members/{username} | `PUT` | `/api/v1/orgs/{org}/public_members/{username}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/orgs/{org}/public_members/{username} | `DELETE` | `/api/v1/orgs/{org}/public_members/{username}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/orgs/{org}/rename | `POST` | `/api/v1/orgs/{org}/rename` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/repos | `GET` | `/api/v1/orgs/{org}/repos` | **missing** | Route not registered — returns 404 |
| POST /api/v1/orgs/{org}/repos | `POST` | `/api/v1/orgs/{org}/repos` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/orgs/{org}/repos | `DELETE` | `/api/v1/orgs/{org}/repos` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/teams | `GET` | `/api/v1/orgs/{org}/teams` | **missing** | Route not registered — returns 404 |
| POST /api/v1/orgs/{org}/teams | `POST` | `/api/v1/orgs/{org}/teams` | **missing** | Route not registered — returns 404 |
| GET /api/v1/orgs/{org}/teams/search | `GET` | `/api/v1/orgs/{org}/teams/search` | **missing** | Route not registered — returns 404 |
| GET /api/v1/packages/{owner} | `GET` | `/api/v1/packages/{owner}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/packages/{owner}/{type}/{name} | `GET` | `/api/v1/packages/{owner}/{type}/{name}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/packages/{owner}/{type}/{name} | `DELETE` | `/api/v1/packages/{owner}/{type}/{name}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/packages/{owner}/{type}/{name}/-/latest | `GET` | `/api/v1/packages/{owner}/{type}/{name}/-/latest` | **missing** | Route not registered — returns 404 |
| POST /api/v1/packages/{owner}/{type}/{name}/-/link/{repo_name} | `POST` | `/api/v1/packages/{owner}/{type}/{name}/-/link/{repo_name}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/packages/{owner}/{type}/{name}/-/unlink | `POST` | `/api/v1/packages/{owner}/{type}/{name}/-/unlink` | **missing** | Route not registered — returns 404 |
| GET /api/v1/packages/{owner}/{type}/{name}/{version} | `GET` | `/api/v1/packages/{owner}/{type}/{name}/{version}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/packages/{owner}/{type}/{name}/{version} | `DELETE` | `/api/v1/packages/{owner}/{type}/{name}/{version}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/packages/{owner}/{type}/{name}/{version}/files | `GET` | `/api/v1/packages/{owner}/{type}/{name}/{version}/files` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/issues/search | `GET` | `/api/v1/repos/issues/search` | **correct** | DB/git-backed implementation |
| POST /api/v1/repos/migrate | `POST` | `/api/v1/repos/migrate` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/search | `GET` | `/api/v1/repos/search` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo} | `GET` | `/api/v1/repos/{owner}/{repo}` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/repos/{owner}/{repo} | `DELETE` | `/api/v1/repos/{owner}/{repo}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo} | `PATCH` | `/api/v1/repos/{owner}/{repo}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/artifacts | `GET` | `/api/v1/repos/{owner}/{repo}/actions/artifacts` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/artifacts/{artifact_id} | `GET` | `/api/v1/repos/{owner}/{repo}/actions/artifacts/{artifact_id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/actions/artifacts/{artifact_id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/actions/artifacts/{artifact_id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/artifacts/{artifact_id}/zip | `GET` | `/api/v1/repos/{owner}/{repo}/actions/artifacts/{artifact_id}/zip` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/jobs | `GET` | `/api/v1/repos/{owner}/{repo}/actions/jobs` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/jobs/{job_id} | `GET` | `/api/v1/repos/{owner}/{repo}/actions/jobs/{job_id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/jobs/{job_id}/logs | `GET` | `/api/v1/repos/{owner}/{repo}/actions/jobs/{job_id}/logs` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/runners | `GET` | `/api/v1/repos/{owner}/{repo}/actions/runners` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/actions/runners/registration-token | `POST` | `/api/v1/repos/{owner}/{repo}/actions/runners/registration-token` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/runners/{runner_id} | `GET` | `/api/v1/repos/{owner}/{repo}/actions/runners/{runner_id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/actions/runners/{runner_id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/actions/runners/{runner_id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/actions/runners/{runner_id} | `PATCH` | `/api/v1/repos/{owner}/{repo}/actions/runners/{runner_id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/runs | `GET` | `/api/v1/repos/{owner}/{repo}/actions/runs` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/runs/{run} | `GET` | `/api/v1/repos/{owner}/{repo}/actions/runs/{run}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/actions/runs/{run} | `DELETE` | `/api/v1/repos/{owner}/{repo}/actions/runs/{run}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/runs/{run}/artifacts | `GET` | `/api/v1/repos/{owner}/{repo}/actions/runs/{run}/artifacts` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/runs/{run}/attempts/{attempt} | `GET` | `/api/v1/repos/{owner}/{repo}/actions/runs/{run}/attempts/{attempt}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/runs/{run}/attempts/{attempt}/jobs | `GET` | `/api/v1/repos/{owner}/{repo}/actions/runs/{run}/attempts/{attempt}/jobs` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/runs/{run}/jobs | `GET` | `/api/v1/repos/{owner}/{repo}/actions/runs/{run}/jobs` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/actions/runs/{run}/jobs/{job_id}/rerun | `POST` | `/api/v1/repos/{owner}/{repo}/actions/runs/{run}/jobs/{job_id}/rerun` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/actions/runs/{run}/rerun | `POST` | `/api/v1/repos/{owner}/{repo}/actions/runs/{run}/rerun` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/actions/runs/{run}/rerun-failed-jobs | `POST` | `/api/v1/repos/{owner}/{repo}/actions/runs/{run}/rerun-failed-jobs` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/secrets | `GET` | `/api/v1/repos/{owner}/{repo}/actions/secrets` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/actions/secrets/{secretname} | `PUT` | `/api/v1/repos/{owner}/{repo}/actions/secrets/{secretname}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/actions/secrets/{secretname} | `DELETE` | `/api/v1/repos/{owner}/{repo}/actions/secrets/{secretname}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/tasks | `GET` | `/api/v1/repos/{owner}/{repo}/actions/tasks` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/variables | `GET` | `/api/v1/repos/{owner}/{repo}/actions/variables` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/variables/{variablename} | `GET` | `/api/v1/repos/{owner}/{repo}/actions/variables/{variablename}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/actions/variables/{variablename} | `PUT` | `/api/v1/repos/{owner}/{repo}/actions/variables/{variablename}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/actions/variables/{variablename} | `POST` | `/api/v1/repos/{owner}/{repo}/actions/variables/{variablename}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/actions/variables/{variablename} | `DELETE` | `/api/v1/repos/{owner}/{repo}/actions/variables/{variablename}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/workflows | `GET` | `/api/v1/repos/{owner}/{repo}/actions/workflows` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/actions/workflows/{workflow_id} | `GET` | `/api/v1/repos/{owner}/{repo}/actions/workflows/{workflow_id}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable | `PUT` | `/api/v1/repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches | `POST` | `/api/v1/repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable | `PUT` | `/api/v1/repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/activities/feeds | `GET` | `/api/v1/repos/{owner}/{repo}/activities/feeds` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/archive/{archive} | `GET` | `/api/v1/repos/{owner}/{repo}/archive/{archive}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/assignees | `GET` | `/api/v1/repos/{owner}/{repo}/assignees` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/avatar | `POST` | `/api/v1/repos/{owner}/{repo}/avatar` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/avatar | `DELETE` | `/api/v1/repos/{owner}/{repo}/avatar` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/branch_protections | `GET` | `/api/v1/repos/{owner}/{repo}/branch_protections` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/branch_protections | `POST` | `/api/v1/repos/{owner}/{repo}/branch_protections` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/branch_protections/priority | `POST` | `/api/v1/repos/{owner}/{repo}/branch_protections/priority` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/branch_protections/{name} | `GET` | `/api/v1/repos/{owner}/{repo}/branch_protections/{name}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/branch_protections/{name} | `DELETE` | `/api/v1/repos/{owner}/{repo}/branch_protections/{name}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/branch_protections/{name} | `PATCH` | `/api/v1/repos/{owner}/{repo}/branch_protections/{name}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/branches | `GET` | `/api/v1/repos/{owner}/{repo}/branches` | **correct** | DB/git-backed implementation |
| POST /api/v1/repos/{owner}/{repo}/branches | `POST` | `/api/v1/repos/{owner}/{repo}/branches` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/branches/{branch} | `GET` | `/api/v1/repos/{owner}/{repo}/branches/{branch}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/branches/{branch} | `PUT` | `/api/v1/repos/{owner}/{repo}/branches/{branch}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/branches/{branch} | `DELETE` | `/api/v1/repos/{owner}/{repo}/branches/{branch}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/branches/{branch} | `PATCH` | `/api/v1/repos/{owner}/{repo}/branches/{branch}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/collaborators | `GET` | `/api/v1/repos/{owner}/{repo}/collaborators` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/collaborators/{collaborator} | `GET` | `/api/v1/repos/{owner}/{repo}/collaborators/{collaborator}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/collaborators/{collaborator} | `PUT` | `/api/v1/repos/{owner}/{repo}/collaborators/{collaborator}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/collaborators/{collaborator} | `DELETE` | `/api/v1/repos/{owner}/{repo}/collaborators/{collaborator}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/collaborators/{collaborator}/permission | `GET` | `/api/v1/repos/{owner}/{repo}/collaborators/{collaborator}/permission` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/commits | `GET` | `/api/v1/repos/{owner}/{repo}/commits` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/commits/{ref}/status | `GET` | `/api/v1/repos/{owner}/{repo}/commits/{ref}/status` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/commits/{ref}/statuses | `GET` | `/api/v1/repos/{owner}/{repo}/commits/{ref}/statuses` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/commits/{sha}/pull | `GET` | `/api/v1/repos/{owner}/{repo}/commits/{sha}/pull` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/compare/{basehead} | `GET` | `/api/v1/repos/{owner}/{repo}/compare/{basehead}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/contents | `GET` | `/api/v1/repos/{owner}/{repo}/contents` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/contents | `POST` | `/api/v1/repos/{owner}/{repo}/contents` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/contents-ext/{filepath} | `GET` | `/api/v1/repos/{owner}/{repo}/contents-ext/{filepath}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/contents/{filepath} | `GET` | `/api/v1/repos/{owner}/{repo}/contents/{filepath}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/contents/{filepath} | `PUT` | `/api/v1/repos/{owner}/{repo}/contents/{filepath}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/contents/{filepath} | `POST` | `/api/v1/repos/{owner}/{repo}/contents/{filepath}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/contents/{filepath} | `DELETE` | `/api/v1/repos/{owner}/{repo}/contents/{filepath}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/diffpatch | `POST` | `/api/v1/repos/{owner}/{repo}/diffpatch` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/editorconfig/{filepath} | `GET` | `/api/v1/repos/{owner}/{repo}/editorconfig/{filepath}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/file-contents | `GET` | `/api/v1/repos/{owner}/{repo}/file-contents` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/file-contents | `POST` | `/api/v1/repos/{owner}/{repo}/file-contents` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/forks | `GET` | `/api/v1/repos/{owner}/{repo}/forks` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/forks | `POST` | `/api/v1/repos/{owner}/{repo}/forks` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/git/blobs/{sha} | `GET` | `/api/v1/repos/{owner}/{repo}/git/blobs/{sha}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/git/commits/{sha} | `GET` | `/api/v1/repos/{owner}/{repo}/git/commits/{sha}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/git/commits/{sha}.{diffType} | `GET` | `/api/v1/repos/{owner}/{repo}/git/commits/{sha}.{diffType}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/git/notes/{sha} | `GET` | `/api/v1/repos/{owner}/{repo}/git/notes/{sha}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/git/refs | `GET` | `/api/v1/repos/{owner}/{repo}/git/refs` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/git/refs/{ref} | `GET` | `/api/v1/repos/{owner}/{repo}/git/refs/{ref}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/git/tags/{sha} | `GET` | `/api/v1/repos/{owner}/{repo}/git/tags/{sha}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/git/trees/{sha} | `GET` | `/api/v1/repos/{owner}/{repo}/git/trees/{sha}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/hooks | `GET` | `/api/v1/repos/{owner}/{repo}/hooks` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/hooks | `POST` | `/api/v1/repos/{owner}/{repo}/hooks` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/hooks/git | `GET` | `/api/v1/repos/{owner}/{repo}/hooks/git` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/hooks/git/{id} | `GET` | `/api/v1/repos/{owner}/{repo}/hooks/git/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/hooks/git/{id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/hooks/git/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/hooks/git/{id} | `PATCH` | `/api/v1/repos/{owner}/{repo}/hooks/git/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/hooks/{id} | `GET` | `/api/v1/repos/{owner}/{repo}/hooks/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/hooks/{id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/hooks/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/hooks/{id} | `PATCH` | `/api/v1/repos/{owner}/{repo}/hooks/{id}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/hooks/{id}/tests | `POST` | `/api/v1/repos/{owner}/{repo}/hooks/{id}/tests` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issue_config | `GET` | `/api/v1/repos/{owner}/{repo}/issue_config` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issue_config/validate | `GET` | `/api/v1/repos/{owner}/{repo}/issue_config/validate` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issue_templates | `GET` | `/api/v1/repos/{owner}/{repo}/issue_templates` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues | `GET` | `/api/v1/repos/{owner}/{repo}/issues` | **correct** | DB/git-backed implementation |
| POST /api/v1/repos/{owner}/{repo}/issues | `POST` | `/api/v1/repos/{owner}/{repo}/issues` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/issues/comments | `GET` | `/api/v1/repos/{owner}/{repo}/issues/comments` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/comments/{id} | `GET` | `/api/v1/repos/{owner}/{repo}/issues/comments/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/comments/{id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/comments/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/issues/comments/{id} | `PATCH` | `/api/v1/repos/{owner}/{repo}/issues/comments/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/comments/{id}/assets | `GET` | `/api/v1/repos/{owner}/{repo}/issues/comments/{id}/assets` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/issues/comments/{id}/assets | `POST` | `/api/v1/repos/{owner}/{repo}/issues/comments/{id}/assets` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/comments/{id}/assets/{attachment_id} | `GET` | `/api/v1/repos/{owner}/{repo}/issues/comments/{id}/assets/{attachment_id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/comments/{id}/assets/{attachment_id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/comments/{id}/assets/{attachment_id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/issues/comments/{id}/assets/{attachment_id} | `PATCH` | `/api/v1/repos/{owner}/{repo}/issues/comments/{id}/assets/{attachment_id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/comments/{id}/reactions | `GET` | `/api/v1/repos/{owner}/{repo}/issues/comments/{id}/reactions` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/issues/comments/{id}/reactions | `POST` | `/api/v1/repos/{owner}/{repo}/issues/comments/{id}/reactions` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/comments/{id}/reactions | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/comments/{id}/reactions` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/pinned | `GET` | `/api/v1/repos/{owner}/{repo}/issues/pinned` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/{index} | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index} | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/issues/{index} | `PATCH` | `/api/v1/repos/{owner}/{repo}/issues/{index}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/{index}/assets | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}/assets` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/issues/{index}/assets | `POST` | `/api/v1/repos/{owner}/{repo}/issues/{index}/assets` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/{index}/assets/{attachment_id} | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}/assets/{attachment_id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index}/assets/{attachment_id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}/assets/{attachment_id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/issues/{index}/assets/{attachment_id} | `PATCH` | `/api/v1/repos/{owner}/{repo}/issues/{index}/assets/{attachment_id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/{index}/blocks | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}/blocks` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/issues/{index}/blocks | `POST` | `/api/v1/repos/{owner}/{repo}/issues/{index}/blocks` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index}/blocks | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}/blocks` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/{index}/comments | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}/comments` | **correct** | DB/git-backed implementation |
| POST /api/v1/repos/{owner}/{repo}/issues/{index}/comments | `POST` | `/api/v1/repos/{owner}/{repo}/issues/{index}/comments` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index}/comments/{id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}/comments/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/issues/{index}/comments/{id} | `PATCH` | `/api/v1/repos/{owner}/{repo}/issues/{index}/comments/{id}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/issues/{index}/deadline | `POST` | `/api/v1/repos/{owner}/{repo}/issues/{index}/deadline` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/{index}/dependencies | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}/dependencies` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/issues/{index}/dependencies | `POST` | `/api/v1/repos/{owner}/{repo}/issues/{index}/dependencies` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index}/dependencies | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}/dependencies` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/{index}/labels | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}/labels` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/issues/{index}/labels | `PUT` | `/api/v1/repos/{owner}/{repo}/issues/{index}/labels` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/issues/{index}/labels | `POST` | `/api/v1/repos/{owner}/{repo}/issues/{index}/labels` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index}/labels | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}/labels` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index}/labels/{id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}/labels/{id}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/issues/{index}/lock | `PUT` | `/api/v1/repos/{owner}/{repo}/issues/{index}/lock` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index}/lock | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}/lock` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/issues/{index}/pin | `POST` | `/api/v1/repos/{owner}/{repo}/issues/{index}/pin` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index}/pin | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}/pin` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/issues/{index}/pin/{position} | `PATCH` | `/api/v1/repos/{owner}/{repo}/issues/{index}/pin/{position}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/{index}/reactions | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}/reactions` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/issues/{index}/reactions | `POST` | `/api/v1/repos/{owner}/{repo}/issues/{index}/reactions` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index}/reactions | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}/reactions` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index}/stopwatch/delete | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}/stopwatch/delete` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/issues/{index}/stopwatch/start | `POST` | `/api/v1/repos/{owner}/{repo}/issues/{index}/stopwatch/start` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/issues/{index}/stopwatch/stop | `POST` | `/api/v1/repos/{owner}/{repo}/issues/{index}/stopwatch/stop` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/{index}/subscriptions | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}/subscriptions` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/{index}/subscriptions/check | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}/subscriptions/check` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/issues/{index}/subscriptions/{user} | `PUT` | `/api/v1/repos/{owner}/{repo}/issues/{index}/subscriptions/{user}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index}/subscriptions/{user} | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}/subscriptions/{user}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/{index}/timeline | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}/timeline` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/issues/{index}/times | `GET` | `/api/v1/repos/{owner}/{repo}/issues/{index}/times` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/issues/{index}/times | `POST` | `/api/v1/repos/{owner}/{repo}/issues/{index}/times` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index}/times | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}/times` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/issues/{index}/times/{id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/issues/{index}/times/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/keys | `GET` | `/api/v1/repos/{owner}/{repo}/keys` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/keys | `POST` | `/api/v1/repos/{owner}/{repo}/keys` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/keys/{id} | `GET` | `/api/v1/repos/{owner}/{repo}/keys/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/keys/{id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/keys/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/labels | `GET` | `/api/v1/repos/{owner}/{repo}/labels` | **correct** | DB/git-backed implementation |
| POST /api/v1/repos/{owner}/{repo}/labels | `POST` | `/api/v1/repos/{owner}/{repo}/labels` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/labels/{id} | `GET` | `/api/v1/repos/{owner}/{repo}/labels/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/labels/{id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/labels/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/labels/{id} | `PATCH` | `/api/v1/repos/{owner}/{repo}/labels/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/languages | `GET` | `/api/v1/repos/{owner}/{repo}/languages` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/licenses | `GET` | `/api/v1/repos/{owner}/{repo}/licenses` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/media/{filepath} | `GET` | `/api/v1/repos/{owner}/{repo}/media/{filepath}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/merge-upstream | `POST` | `/api/v1/repos/{owner}/{repo}/merge-upstream` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/milestones | `GET` | `/api/v1/repos/{owner}/{repo}/milestones` | **correct** | DB/git-backed implementation |
| POST /api/v1/repos/{owner}/{repo}/milestones | `POST` | `/api/v1/repos/{owner}/{repo}/milestones` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/milestones/{id} | `GET` | `/api/v1/repos/{owner}/{repo}/milestones/{id}` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/repos/{owner}/{repo}/milestones/{id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/milestones/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/milestones/{id} | `PATCH` | `/api/v1/repos/{owner}/{repo}/milestones/{id}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/mirror-sync | `POST` | `/api/v1/repos/{owner}/{repo}/mirror-sync` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/new_pin_allowed | `GET` | `/api/v1/repos/{owner}/{repo}/new_pin_allowed` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/notifications | `GET` | `/api/v1/repos/{owner}/{repo}/notifications` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/notifications | `PUT` | `/api/v1/repos/{owner}/{repo}/notifications` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/pulls | `GET` | `/api/v1/repos/{owner}/{repo}/pulls` | **correct** | DB/git-backed implementation |
| POST /api/v1/repos/{owner}/{repo}/pulls | `POST` | `/api/v1/repos/{owner}/{repo}/pulls` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/pulls/comments/{id}/resolve | `POST` | `/api/v1/repos/{owner}/{repo}/pulls/comments/{id}/resolve` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/pulls/comments/{id}/unresolve | `POST` | `/api/v1/repos/{owner}/{repo}/pulls/comments/{id}/unresolve` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/pulls/pinned | `GET` | `/api/v1/repos/{owner}/{repo}/pulls/pinned` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/pulls/{base}/{head} | `GET` | `/api/v1/repos/{owner}/{repo}/pulls/{base}/{head}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/pulls/{index} | `GET` | `/api/v1/repos/{owner}/{repo}/pulls/{index}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/pulls/{index} | `PATCH` | `/api/v1/repos/{owner}/{repo}/pulls/{index}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/pulls/{index}.{diffType} | `GET` | `/api/v1/repos/{owner}/{repo}/pulls/{index}.{diffType}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/pulls/{index}/comments/{id}/replies | `POST` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/comments/{id}/replies` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/pulls/{index}/commits | `GET` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/commits` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/pulls/{index}/files | `GET` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/files` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/pulls/{index}/merge | `GET` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/merge` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/pulls/{index}/merge | `POST` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/merge` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/pulls/{index}/merge | `DELETE` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/merge` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/pulls/{index}/requested_reviewers | `POST` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/requested_reviewers` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/pulls/{index}/requested_reviewers | `DELETE` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/requested_reviewers` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/pulls/{index}/reviews | `GET` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/reviews` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/pulls/{index}/reviews | `POST` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/reviews` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/pulls/{index}/reviews/{id} | `GET` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/reviews/{id}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/pulls/{index}/reviews/{id} | `POST` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/reviews/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/pulls/{index}/reviews/{id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/reviews/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/pulls/{index}/reviews/{id}/comments | `GET` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/reviews/{id}/comments` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/pulls/{index}/reviews/{id}/dismissals | `POST` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/reviews/{id}/dismissals` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/pulls/{index}/reviews/{id}/undismissals | `POST` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/reviews/{id}/undismissals` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/pulls/{index}/update | `POST` | `/api/v1/repos/{owner}/{repo}/pulls/{index}/update` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/push_mirrors | `GET` | `/api/v1/repos/{owner}/{repo}/push_mirrors` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/push_mirrors | `POST` | `/api/v1/repos/{owner}/{repo}/push_mirrors` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/push_mirrors-sync | `POST` | `/api/v1/repos/{owner}/{repo}/push_mirrors-sync` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/push_mirrors/{name} | `GET` | `/api/v1/repos/{owner}/{repo}/push_mirrors/{name}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/push_mirrors/{name} | `DELETE` | `/api/v1/repos/{owner}/{repo}/push_mirrors/{name}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/raw/{filepath} | `GET` | `/api/v1/repos/{owner}/{repo}/raw/{filepath}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/releases | `GET` | `/api/v1/repos/{owner}/{repo}/releases` | **correct** | DB/git-backed implementation |
| POST /api/v1/repos/{owner}/{repo}/releases | `POST` | `/api/v1/repos/{owner}/{repo}/releases` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/releases/latest | `GET` | `/api/v1/repos/{owner}/{repo}/releases/latest` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/releases/tags/{tag} | `GET` | `/api/v1/repos/{owner}/{repo}/releases/tags/{tag}` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/repos/{owner}/{repo}/releases/tags/{tag} | `DELETE` | `/api/v1/repos/{owner}/{repo}/releases/tags/{tag}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/releases/{id} | `GET` | `/api/v1/repos/{owner}/{repo}/releases/{id}` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/repos/{owner}/{repo}/releases/{id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/releases/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/releases/{id} | `PATCH` | `/api/v1/repos/{owner}/{repo}/releases/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/releases/{id}/assets | `GET` | `/api/v1/repos/{owner}/{repo}/releases/{id}/assets` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/releases/{id}/assets | `POST` | `/api/v1/repos/{owner}/{repo}/releases/{id}/assets` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/releases/{id}/assets/{attachment_id} | `GET` | `/api/v1/repos/{owner}/{repo}/releases/{id}/assets/{attachment_id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/releases/{id}/assets/{attachment_id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/releases/{id}/assets/{attachment_id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/releases/{id}/assets/{attachment_id} | `PATCH` | `/api/v1/repos/{owner}/{repo}/releases/{id}/assets/{attachment_id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/reviewers | `GET` | `/api/v1/repos/{owner}/{repo}/reviewers` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/signing-key.gpg | `GET` | `/api/v1/repos/{owner}/{repo}/signing-key.gpg` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/signing-key.pub | `GET` | `/api/v1/repos/{owner}/{repo}/signing-key.pub` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/stargazers | `GET` | `/api/v1/repos/{owner}/{repo}/stargazers` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/statuses/{sha} | `GET` | `/api/v1/repos/{owner}/{repo}/statuses/{sha}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/statuses/{sha} | `POST` | `/api/v1/repos/{owner}/{repo}/statuses/{sha}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/subscribers | `GET` | `/api/v1/repos/{owner}/{repo}/subscribers` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/subscription | `GET` | `/api/v1/repos/{owner}/{repo}/subscription` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/subscription | `PUT` | `/api/v1/repos/{owner}/{repo}/subscription` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/subscription | `DELETE` | `/api/v1/repos/{owner}/{repo}/subscription` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/tag_protections | `GET` | `/api/v1/repos/{owner}/{repo}/tag_protections` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/tag_protections | `POST` | `/api/v1/repos/{owner}/{repo}/tag_protections` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/tag_protections/{id} | `GET` | `/api/v1/repos/{owner}/{repo}/tag_protections/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/tag_protections/{id} | `DELETE` | `/api/v1/repos/{owner}/{repo}/tag_protections/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/tag_protections/{id} | `PATCH` | `/api/v1/repos/{owner}/{repo}/tag_protections/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/tags | `GET` | `/api/v1/repos/{owner}/{repo}/tags` | **correct** | DB/git-backed implementation |
| POST /api/v1/repos/{owner}/{repo}/tags | `POST` | `/api/v1/repos/{owner}/{repo}/tags` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/tags/{tag} | `GET` | `/api/v1/repos/{owner}/{repo}/tags/{tag}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/tags/{tag} | `DELETE` | `/api/v1/repos/{owner}/{repo}/tags/{tag}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/teams | `GET` | `/api/v1/repos/{owner}/{repo}/teams` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/teams/{team} | `GET` | `/api/v1/repos/{owner}/{repo}/teams/{team}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/teams/{team} | `PUT` | `/api/v1/repos/{owner}/{repo}/teams/{team}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/teams/{team} | `DELETE` | `/api/v1/repos/{owner}/{repo}/teams/{team}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/times | `GET` | `/api/v1/repos/{owner}/{repo}/times` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/times/{user} | `GET` | `/api/v1/repos/{owner}/{repo}/times/{user}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/topics | `GET` | `/api/v1/repos/{owner}/{repo}/topics` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/topics | `PUT` | `/api/v1/repos/{owner}/{repo}/topics` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/repos/{owner}/{repo}/topics/{topic} | `PUT` | `/api/v1/repos/{owner}/{repo}/topics/{topic}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/repos/{owner}/{repo}/topics/{topic} | `DELETE` | `/api/v1/repos/{owner}/{repo}/topics/{topic}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/transfer | `POST` | `/api/v1/repos/{owner}/{repo}/transfer` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/transfer/accept | `POST` | `/api/v1/repos/{owner}/{repo}/transfer/accept` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/transfer/reject | `POST` | `/api/v1/repos/{owner}/{repo}/transfer/reject` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{owner}/{repo}/wiki/new | `POST` | `/api/v1/repos/{owner}/{repo}/wiki/new` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/wiki/page/{pageName} | `GET` | `/api/v1/repos/{owner}/{repo}/wiki/page/{pageName}` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/repos/{owner}/{repo}/wiki/page/{pageName} | `DELETE` | `/api/v1/repos/{owner}/{repo}/wiki/page/{pageName}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/repos/{owner}/{repo}/wiki/page/{pageName} | `PATCH` | `/api/v1/repos/{owner}/{repo}/wiki/page/{pageName}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repos/{owner}/{repo}/wiki/pages | `GET` | `/api/v1/repos/{owner}/{repo}/wiki/pages` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/wiki/revisions/{pageName} | `GET` | `/api/v1/repos/{owner}/{repo}/wiki/revisions/{pageName}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/repos/{template_owner}/{template_repo}/generate | `POST` | `/api/v1/repos/{template_owner}/{template_repo}/generate` | **missing** | Route not registered — returns 404 |
| GET /api/v1/repositories/{id} | `GET` | `/api/v1/repositories/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/settings/api | `GET` | `/api/v1/settings/api` | **correct** | DB/git-backed implementation |
| GET /api/v1/settings/attachment | `GET` | `/api/v1/settings/attachment` | **missing** | Route not registered — returns 404 |
| GET /api/v1/settings/repository | `GET` | `/api/v1/settings/repository` | **missing** | Route not registered — returns 404 |
| GET /api/v1/settings/ui | `GET` | `/api/v1/settings/ui` | **missing** | Route not registered — returns 404 |
| GET /api/v1/signing-key.gpg | `GET` | `/api/v1/signing-key.gpg` | **missing** | Route not registered — returns 404 |
| GET /api/v1/signing-key.pub | `GET` | `/api/v1/signing-key.pub` | **missing** | Route not registered — returns 404 |
| GET /api/v1/teams/{id} | `GET` | `/api/v1/teams/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/teams/{id} | `DELETE` | `/api/v1/teams/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/teams/{id} | `PATCH` | `/api/v1/teams/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/teams/{id}/activities/feeds | `GET` | `/api/v1/teams/{id}/activities/feeds` | **missing** | Route not registered — returns 404 |
| GET /api/v1/teams/{id}/members | `GET` | `/api/v1/teams/{id}/members` | **missing** | Route not registered — returns 404 |
| GET /api/v1/teams/{id}/members/{username} | `GET` | `/api/v1/teams/{id}/members/{username}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/teams/{id}/members/{username} | `PUT` | `/api/v1/teams/{id}/members/{username}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/teams/{id}/members/{username} | `DELETE` | `/api/v1/teams/{id}/members/{username}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/teams/{id}/repos | `GET` | `/api/v1/teams/{id}/repos` | **missing** | Route not registered — returns 404 |
| GET /api/v1/teams/{id}/repos/{org}/{repo} | `GET` | `/api/v1/teams/{id}/repos/{org}/{repo}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/teams/{id}/repos/{org}/{repo} | `PUT` | `/api/v1/teams/{id}/repos/{org}/{repo}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/teams/{id}/repos/{org}/{repo} | `DELETE` | `/api/v1/teams/{id}/repos/{org}/{repo}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/topics/search | `GET` | `/api/v1/topics/search` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user | `GET` | `/api/v1/user` | **stub** | No DB/git operations — returns minimal data |
| DELETE /api/v1/user | `DELETE` | `/api/v1/user` | **stub** | No DB/git operations — returns minimal data |
| GET /api/v1/user/actions/jobs | `GET` | `/api/v1/user/actions/jobs` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/actions/permissions | `GET` | `/api/v1/user/actions/permissions` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/user/actions/permissions | `PUT` | `/api/v1/user/actions/permissions` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/actions/runners | `GET` | `/api/v1/user/actions/runners` | **missing** | Route not registered — returns 404 |
| POST /api/v1/user/actions/runners/registration-token | `POST` | `/api/v1/user/actions/runners/registration-token` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/actions/runners/{runner_id} | `GET` | `/api/v1/user/actions/runners/{runner_id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/user/actions/runners/{runner_id} | `DELETE` | `/api/v1/user/actions/runners/{runner_id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/user/actions/runners/{runner_id} | `PATCH` | `/api/v1/user/actions/runners/{runner_id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/actions/runs | `GET` | `/api/v1/user/actions/runs` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/actions/secrets | `GET` | `/api/v1/user/actions/secrets` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/user/actions/secrets/{secretname} | `PUT` | `/api/v1/user/actions/secrets/{secretname}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/user/actions/secrets/{secretname} | `DELETE` | `/api/v1/user/actions/secrets/{secretname}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/actions/variables | `GET` | `/api/v1/user/actions/variables` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/actions/variables/{variablename} | `GET` | `/api/v1/user/actions/variables/{variablename}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/user/actions/variables/{variablename} | `PUT` | `/api/v1/user/actions/variables/{variablename}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/user/actions/variables/{variablename} | `POST` | `/api/v1/user/actions/variables/{variablename}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/user/actions/variables/{variablename} | `DELETE` | `/api/v1/user/actions/variables/{variablename}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/applications/grants | `GET` | `/api/v1/user/applications/grants` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/user/applications/grants/{id} | `DELETE` | `/api/v1/user/applications/grants/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/applications/oauth2 | `GET` | `/api/v1/user/applications/oauth2` | **missing** | Route not registered — returns 404 |
| POST /api/v1/user/applications/oauth2 | `POST` | `/api/v1/user/applications/oauth2` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/applications/oauth2/{id} | `GET` | `/api/v1/user/applications/oauth2/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/user/applications/oauth2/{id} | `DELETE` | `/api/v1/user/applications/oauth2/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/user/applications/oauth2/{id} | `PATCH` | `/api/v1/user/applications/oauth2/{id}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/user/avatar | `POST` | `/api/v1/user/avatar` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/user/avatar | `DELETE` | `/api/v1/user/avatar` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/blocks | `GET` | `/api/v1/user/blocks` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/blocks/{username} | `GET` | `/api/v1/user/blocks/{username}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/user/blocks/{username} | `PUT` | `/api/v1/user/blocks/{username}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/user/blocks/{username} | `DELETE` | `/api/v1/user/blocks/{username}` | **missing** | Route not registered — returns 404 |
| POST /api/v1/user/change_password | `POST` | `/api/v1/user/change_password` | **correct** | DB/git-backed implementation |
| GET /api/v1/user/emails | `GET` | `/api/v1/user/emails` | **correct** | DB/git-backed implementation |
| POST /api/v1/user/emails | `POST` | `/api/v1/user/emails` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/user/emails | `DELETE` | `/api/v1/user/emails` | **correct** | DB/git-backed implementation |
| GET /api/v1/user/followers | `GET` | `/api/v1/user/followers` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/following | `GET` | `/api/v1/user/following` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/following/{username} | `GET` | `/api/v1/user/following/{username}` | **missing** | Route not registered — returns 404 |
| PUT /api/v1/user/following/{username} | `PUT` | `/api/v1/user/following/{username}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/user/following/{username} | `DELETE` | `/api/v1/user/following/{username}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/gpg_key_token | `GET` | `/api/v1/user/gpg_key_token` | **missing** | Route not registered — returns 404 |
| POST /api/v1/user/gpg_key_verify | `POST` | `/api/v1/user/gpg_key_verify` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/gpg_keys | `GET` | `/api/v1/user/gpg_keys` | **correct** | DB/git-backed implementation |
| POST /api/v1/user/gpg_keys | `POST` | `/api/v1/user/gpg_keys` | **correct** | DB/git-backed implementation |
| GET /api/v1/user/gpg_keys/{id} | `GET` | `/api/v1/user/gpg_keys/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/user/gpg_keys/{id} | `DELETE` | `/api/v1/user/gpg_keys/{id}` | **correct** | DB/git-backed implementation |
| GET /api/v1/user/hooks | `GET` | `/api/v1/user/hooks` | **missing** | Route not registered — returns 404 |
| POST /api/v1/user/hooks | `POST` | `/api/v1/user/hooks` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/hooks/{id} | `GET` | `/api/v1/user/hooks/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/user/hooks/{id} | `DELETE` | `/api/v1/user/hooks/{id}` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/user/hooks/{id} | `PATCH` | `/api/v1/user/hooks/{id}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/keys | `GET` | `/api/v1/user/keys` | **stub** | No DB/git operations — returns minimal data |
| POST /api/v1/user/keys | `POST` | `/api/v1/user/keys` | **stub** | No DB/git operations — returns minimal data |
| GET /api/v1/user/keys/{id} | `GET` | `/api/v1/user/keys/{id}` | **missing** | Route not registered — returns 404 |
| DELETE /api/v1/user/keys/{id} | `DELETE` | `/api/v1/user/keys/{id}` | **correct** | DB/git-backed implementation |
| GET /api/v1/user/orgs | `GET` | `/api/v1/user/orgs` | **correct** | DB/git-backed implementation |
| POST /api/v1/user/register | `POST` | `/api/v1/user/register` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/repos | `GET` | `/api/v1/user/repos` | **correct** | DB/git-backed implementation |
| POST /api/v1/user/repos | `POST` | `/api/v1/user/repos` | **correct** | DB/git-backed implementation |
| GET /api/v1/user/settings | `GET` | `/api/v1/user/settings` | **missing** | Route not registered — returns 404 |
| PATCH /api/v1/user/settings | `PATCH` | `/api/v1/user/settings` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/starred | `GET` | `/api/v1/user/starred` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/starred/{owner}/{repo} | `GET` | `/api/v1/user/starred/{owner}/{repo}` | **correct** | DB/git-backed implementation |
| PUT /api/v1/user/starred/{owner}/{repo} | `PUT` | `/api/v1/user/starred/{owner}/{repo}` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/user/starred/{owner}/{repo} | `DELETE` | `/api/v1/user/starred/{owner}/{repo}` | **correct** | DB/git-backed implementation |
| GET /api/v1/user/stopwatches | `GET` | `/api/v1/user/stopwatches` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/subscriptions | `GET` | `/api/v1/user/subscriptions` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/teams | `GET` | `/api/v1/user/teams` | **missing** | Route not registered — returns 404 |
| GET /api/v1/user/times | `GET` | `/api/v1/user/times` | **missing** | Route not registered — returns 404 |
| GET /api/v1/users/search | `GET` | `/api/v1/users/search` | **correct** | DB/git-backed implementation |
| GET /api/v1/users/{username} | `GET` | `/api/v1/users/{username}` | **correct** | DB/git-backed implementation |
| GET /api/v1/users/{username}/activities/feeds | `GET` | `/api/v1/users/{username}/activities/feeds` | **missing** | Route not registered — returns 404 |
| GET /api/v1/users/{username}/followers | `GET` | `/api/v1/users/{username}/followers` | **missing** | Route not registered — returns 404 |
| GET /api/v1/users/{username}/following | `GET` | `/api/v1/users/{username}/following` | **missing** | Route not registered — returns 404 |
| GET /api/v1/users/{username}/following/{target} | `GET` | `/api/v1/users/{username}/following/{target}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/users/{username}/gpg_keys | `GET` | `/api/v1/users/{username}/gpg_keys` | **missing** | Route not registered — returns 404 |
| GET /api/v1/users/{username}/heatmap | `GET` | `/api/v1/users/{username}/heatmap` | **missing** | Route not registered — returns 404 |
| GET /api/v1/users/{username}/keys | `GET` | `/api/v1/users/{username}/keys` | **missing** | Route not registered — returns 404 |
| GET /api/v1/users/{username}/orgs | `GET` | `/api/v1/users/{username}/orgs` | **correct** | DB/git-backed implementation |
| GET /api/v1/users/{username}/orgs/{org}/permissions | `GET` | `/api/v1/users/{username}/orgs/{org}/permissions` | **missing** | Route not registered — returns 404 |
| GET /api/v1/users/{username}/repos | `GET` | `/api/v1/users/{username}/repos` | **correct** | DB/git-backed implementation |
| GET /api/v1/users/{username}/starred | `GET` | `/api/v1/users/{username}/starred` | **missing** | Route not registered — returns 404 |
| GET /api/v1/users/{username}/subscriptions | `GET` | `/api/v1/users/{username}/subscriptions` | **missing** | Route not registered — returns 404 |
| GET /api/v1/users/{username}/tokens | `GET` | `/api/v1/users/{username}/tokens` | **correct** | DB/git-backed implementation |
| POST /api/v1/users/{username}/tokens | `POST` | `/api/v1/users/{username}/tokens` | **correct** | DB/git-backed implementation |
| DELETE /api/v1/users/{username}/tokens/{token} | `DELETE` | `/api/v1/users/{username}/tokens/{token}` | **missing** | Route not registered — returns 404 |
| GET /api/v1/version | `GET` | `/api/v1/version` | **missing** | Route not registered — returns 404 |
| POST /api/auth/register | `POST` | `/api/auth/register` | **stub** | No DB/git operations — returns minimal data |
| POST /api/auth/login | `POST` | `/api/auth/login` | **stub** | No DB/git operations — returns minimal data |
| DELETE /api/v1/users/{username}/tokens/{id} | `DELETE` | `/api/v1/users/{username}/tokens/{id}` | **correct** | DB/git-backed implementation |
| GET /api/v1/repos/{owner}/{repo}/contents/{path} | `GET` | `/api/v1/repos/{owner}/{repo}/contents/{path}` | **correct** | DB/git-backed implementation |
| GET /api/v1/admin/users/{username} | `GET` | `/api/v1/admin/users/{username}` | **correct** | DB/git-backed implementation |
| PUT /api/v1/admin/users/{username} | `PUT` | `/api/v1/admin/users/{username}` | **correct** | DB/git-backed implementation |
| GET /git/{owner}/{repo}.git/info/refs | `GET` | `/git/{owner}/{repo}.git/info/refs` | **correct** | DB/git-backed implementation |
| POST /git/{owner}/{repo}.git/git-receive-pack | `POST` | `/git/{owner}/{repo}.git/git-receive-pack` | **correct** | DB/git-backed implementation |
| POST /git/{owner}/{repo}.git/git-upload-pack | `POST` | `/git/{owner}/{repo}.git/git-upload-pack` | **correct** | DB/git-backed implementation |