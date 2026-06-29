# Frontend Rework Summary

## Overview

Complete client-side rendered Vue 3 SPA replacing all server-side Go HTML templates. The frontend is fully decoupled from the backend and fetches all data from the Gitea API (`/api/v1`).

## Architecture

- **Framework**: Vue 3 + TypeScript + Vite
- **Routing**: Query-string based navigation (`/?/user/login`, `/?/admin`, `/?/owner/repo`)
- **State**: Composable pattern with `localStorage` token (`gitea-spa-token`)
- **API Client**: Centralized in `spa/api/index.ts` (~57KB, all Gitea API v1 endpoints)
- **Build Output**: `frontend/frontend-dist/` (static assets, deployable to any CDN/CF Workers)

## Template Translation Map

All 52 Go HTML templates from `vendor.zip/templates/` have been translated 1:1 into Vue Single File Components:

### Page Components (`spa/pages/`)

| Original Template | Vue Component | Description |
|---|---|---|
| `home.tmpl` + `user/dashboard/dashboard.tmpl` + `user/dashboard/feeds.tmpl` + `user/dashboard/guide.tmpl` + `user/dashboard/repolist.tmpl` | `HomePage.vue` | Landing page (unsigned) + Dashboard (signed in) |
| `user/auth/signin.tmpl` + `user/auth/signin_inner.tmpl` | `LoginPage.vue` | Sign in form with OAuth support |
| `user/auth/signup.tmpl` + `user/auth/signup_inner.tmpl` | `RegisterPage.vue` | Registration form |
| `user/auth/forgot_passwd.tmpl` | `ForgotPasswordPage.vue` | Password recovery request |
| `user/auth/reset_passwd.tmpl` | `ResetPasswordPage.vue` | Password reset with code |
| `user/auth/activate.tmpl` | `ActivateAccountPage.vue` | Account activation |
| `user/auth/twofa.tmpl` | `TwoFAPage.vue` | Two-factor authentication |
| `user/auth/grant.tmpl` | `OAuthGrantPage.vue` | OAuth2 authorization grant |
| `install.tmpl` | `InstallPage.vue` | Initial installation wizard |
| `status/404.tmpl` | `NotFoundPage.vue` | 404 Not Found |
| `status/500.tmpl` | `ServerErrorPage.vue` | 500 Internal Server Error |
| `explore/repos.tmpl` | `ExplorePage.vue` | Explore repositories |
| `explore/users.tmpl` + `explore/user_list.tmpl` | `ExploreUsersPage.vue` | Explore users |
| `explore/code.tmpl` | `ExploreCodePage.vue` | Code search |
| `explore/users.tmpl` (orgs variant) | `ExploreOrgsPage.vue` | Explore organizations |
| `user/profile.tmpl` | `UserProfilePage.vue` | User profile with repos/activity/stars |
| `user/notification/notification.tmpl` + `user/notification/notification_div.tmpl` | `NotificationsPage.vue` | Notifications inbox |
| `user/dashboard/issues.tmpl` | `UserIssuesPage.vue` | Dashboard issues/pulls |
| `user/dashboard/milestones.tmpl` | `UserMilestonesPage.vue` | Dashboard milestones |
| `user/settings/profile.tmpl` + `user/settings/navbar.tmpl` + `user/settings/applications.tmpl` | `UserSettingsPage.vue` | User settings (profile, account, tokens) |
| `user/settings/applications_oauth2_edit.tmpl` | `UserSettingsOAuth2EditPage.vue` | OAuth2 app editor |
| `admin/dashboard.tmpl` + `admin/navbar.tmpl` + `admin/org/list.tmpl` + `admin/repo/list.tmpl` + `admin/user/list.tmpl` | `AdminPage.vue` | Site administration |
| `org/create.tmpl` | `OrgCreatePage.vue` | Create organization |
| `org/home.tmpl` | `OrgHomePage.vue` | Organization profile |
| `repo/create.tmpl` | `RepoCreatePage.vue` | Create repository |
| `repo/home.tmpl` | `RepoOverviewPage.vue` | Repository overview (files + sidebar) |
| `repo/view.tmpl` | `RepoSourcePage.vue` | Source file browser |
| `repo/issue/list.tmpl` | `IssueListPage.vue` | Issue list |
| `repo/issue/view.tmpl` | `IssueDetailPage.vue` | Issue detail + comments |
| `repo/issue/new.tmpl` | `NewIssuePage.vue` | New issue form |
| `repo/issue/list.tmpl` (pulls) | `PullRequestListPage.vue` | Pull request list |
| `repo/commits.tmpl` | `RepoCommitsPage.vue` | Commit log |
| `repo/branch/list.tmpl` | `RepoBranchesPage.vue` | Branch list |
| `repo/release/list.tmpl` | `RepoReleasesPage.vue` | Releases list |
| `repo/tag/list.tmpl` | `RepoTagsPage.vue` | Tags list |
| `repo/wiki/view.tmpl` | `RepoWikiPage.vue` | Wiki viewer |
| `repo/activity.tmpl` | `RepoActivityPage.vue` | Repository activity/pulse |
| `repo/settings/options.tmpl` | `RepoSettingsPage.vue` | Repository settings |
| `repo/user_cards.tmpl` | `UserCardsPage.vue` | Stargazers/watchers/followers |
| `repo/pulls/fork.tmpl` | `ForkRepoPage.vue` | Fork repository |

### Shared Components (`spa/components/`)

| Original Template(s) | Vue Component | Description |
|---|---|---|
| `base/head.tmpl` + `base/head_navbar.tmpl` + `base/footer_content.tmpl` | `AppLayout.vue` | Main layout (navbar + footer) |
| `base/alert.tmpl` | `BaseAlert.vue` | Flash message display |
| `base/paginate.tmpl` | `BasePaginate.vue` | Pagination controls |
| `shared/repo/list.tmpl` | `SharedRepoList.vue` | Repository list card |
| `shared/repo/search.tmpl` | `SharedRepoSearch.vue` | Repository search + sort |
| `user/dashboard/navbar.tmpl` | `DashboardNav.vue` | Dashboard navigation tabs |
| `explore/navbar.tmpl` | `ExploreNavbar.vue` | Explore section tabs |
| `repo/header.tmpl` + `repo/navbar.tmpl` | `RepoHeader.vue` | Repository page header |

### Infrastructure Files

| File | Purpose |
|---|---|
| `spa/router/index.ts` | All route definitions (60+ routes) |
| `spa/router/queryHistory.ts` | Query-string based history adapter (`?path` navigation) |
| `spa/spaconfig.ts` | API base URL, app config |
| `spa/api/index.ts` | Full Gitea API v1 client |
| `spa/main.ts` | Vue app bootstrap |
| `spa/App.vue` | Root component (RouterView) |
| `frontend/index.html` | SPA entry HTML |
| `frontend/spa-entry.ts` | SPA entry point |
| `frontend/vite.config.ts` | Vite build configuration |

## Translation Patterns

| Go Template Pattern | Vue Equivalent |
|---|---|
| `{{template "base/head" .}}` | `<AppLayout>` wrapper component |
| `{{template "base/footer" .}}` | Closing `</AppLayout>` |
| `{{template "base/alert" .}}` | `<BaseAlert :flash="flash"/>` |
| `{{template "base/paginate" .}}` | `<BasePaginate :total="total" :page="page" .../>` |
| `{{ctx.Locale.Tr "key"}}` | Hardcoded English strings |
| `{{.Variable}}` | `{{ variable }}` (Vue reactivity from API fetch) |
| `{{if .Condition}}...{{end}}` | `v-if="condition"` |
| `{{range .Items}}...{{end}}` | `v-for="item in items"` |
| `{{svg "octicon-xxx"}}` | Inline emoji or SVG component |
| `{{AppSubUrl}}/path` | `RouterLink :to="/path"` |
| `method="post" action="..."` | `@submit.prevent="handler"` + `fetch()` |
| Server-side template data | Client-side API fetch in `onMounted()` |

## Routing

Navigation uses query-string encoding:
- Browser URL: `https://example.com/?/user/login`
- Vue Router path: `/user/login`
- Handled by `queryHistory.ts` which maps between the two

## Build & Deploy

```bash
# Install dependencies
npm install

# Development
npm run dev:frontend

# Production build
npm run build:frontend
# Output: frontend/frontend-dist/
```

The built SPA can be deployed to any static hosting (Cloudflare Workers, Netlify, Vercel, etc.) with the `VITE_DEFAULT_API_URL` env var pointing to the Gitea API server.
