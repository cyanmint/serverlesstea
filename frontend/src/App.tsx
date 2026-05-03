import { MemoryRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Layout from './components/Layout'

// ── existing pages ──────────────────────────────────────────────────────────
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import RepoPage from './pages/RepoPage'
import FileTree from './pages/FileTree'
import FileViewer from './pages/FileViewer'
import CommitHistory from './pages/CommitHistory'
import CommitDetail from './pages/CommitDetail'
import IssuesPage from './pages/IssuesPage'
import ReleasesPage from './pages/ReleasesPage'
import RepoSettings from './pages/RepoSettings'
import AdminPanel from './pages/AdminPanel'
import UserSettings from './pages/UserSettings'
import CreateRepo from './pages/CreateRepo'
import CreateOrg from './pages/CreateOrg'
import OrgHome from './pages/OrgHome'
import MilestonesPage from './pages/MilestonesPage'
import WikiPage from './pages/WikiPage'
import ExploreUsers from './pages/ExploreUsers'
import ExploreCode from './pages/ExploreCode'
import TemplatesIndex from './pages/TemplatesIndex'
import TemplateView from './pages/TemplateView'

// ── new template-derived pages ───────────────────────────────────────────────
import Install from './pages/Install'
import PostInstall from './pages/PostInstall'

// explore
import ExploreRepos from './pages/explore/Repos'
import ExploreOrgsPage from './pages/explore/Users'   // reuse user-list layout

// user/auth
import Signin from './pages/user/auth/Signin'
import Signup from './pages/user/auth/Signup'
import ForgotPasswd from './pages/user/auth/ForgotPasswd'
import ResetPasswd from './pages/user/auth/ResetPasswd'
import ChangePasswd from './pages/user/auth/ChangePasswd'
import Activate from './pages/user/auth/Activate'
import ActivatePrompt from './pages/user/auth/ActivatePrompt'
import ProhibitLogin from './pages/user/auth/ProhibitLogin'
import Twofa from './pages/user/auth/Twofa'
import TwofaScratch from './pages/user/auth/TwofaScratch'
import Webauthn from './pages/user/auth/Webauthn'
import Grant from './pages/user/auth/Grant'

// user/dashboard
import Dashboard from './pages/user/dashboard/Dashboard'
import DashboardIssues from './pages/user/dashboard/Issues'
import DashboardMilestones from './pages/user/dashboard/Milestones'

// user/notification
import Notification from './pages/user/notification/Notification'
import NotificationSubscriptions from './pages/user/notification/NotificationSubscriptions'

// user/settings
import SettingsProfile from './pages/user/settings/Profile'
import SettingsAccount from './pages/user/settings/Account'
import SettingsSecurity from './pages/user/settings/security/Security'
import SettingsTwofaEnroll from './pages/user/settings/security/TwofaEnroll'
import SettingsKeys from './pages/user/settings/Keys'
import SettingsKeysSsh from './pages/user/settings/KeysSsh'
import SettingsKeysGpg from './pages/user/settings/KeysGpg'
import SettingsKeysPrincipal from './pages/user/settings/KeysPrincipal'
import SettingsApplications from './pages/user/settings/Applications'
import SettingsApplicationsOauth2 from './pages/user/settings/ApplicationsOauth2'
import SettingsApplicationsOauth2Edit from './pages/user/settings/ApplicationsOauth2Edit'
import SettingsHooks from './pages/user/settings/Hooks'
import SettingsHookNew from './pages/user/settings/HookNew'
import SettingsNotifications from './pages/user/settings/Notifications'
import SettingsRepos from './pages/user/settings/Repos'
import SettingsOrganization from './pages/user/settings/Organization'
import SettingsAppearance from './pages/user/settings/Appearance'
import SettingsPackages from './pages/user/settings/Packages'
import SettingsBlockedUsers from './pages/user/settings/BlockedUsers'
import SettingsActions from './pages/user/settings/Actions'
import SettingsActionsGeneral from './pages/user/settings/ActionsGeneral'
import SettingsRunnerEdit from './pages/user/settings/RunnerEdit'
import SettingsGrantsOauth2 from './pages/user/settings/GrantsOauth2'

// org
import OrgCreate from './pages/org/Create'
import OrgMenu from './pages/org/Menu'
import OrgMemberMembers from './pages/org/member/Members'
import OrgTeamTeams from './pages/org/team/Teams'
import OrgTeamNew from './pages/org/team/New'
import OrgTeamMembers from './pages/org/team/Members'
import OrgTeamRepositories from './pages/org/team/Repositories'
import OrgTeamInvite from './pages/org/team/Invite'
import OrgProjectsList from './pages/org/projects/List'
import OrgProjectsNew from './pages/org/projects/New'
import OrgProjectsView from './pages/org/projects/View'
import OrgSettingsOptions from './pages/org/settings/Options'
import OrgSettingsHooks from './pages/org/settings/Hooks'
import OrgSettingsHookNew from './pages/org/settings/HookNew'
import OrgSettingsLabels from './pages/org/settings/Labels'
import OrgSettingsApplications from './pages/org/settings/Applications'
import OrgSettingsApplicationsOauth2Edit from './pages/org/settings/ApplicationsOauth2Edit'
import OrgSettingsPackages from './pages/org/settings/Packages'
import OrgSettingsPackagesCleanupEdit from './pages/org/settings/PackagesCleanupRulesEdit'
import OrgSettingsPackagesCleanupPreview from './pages/org/settings/PackagesCleanupRulesPreview'
import OrgSettingsRunnersEdit from './pages/org/settings/RunnersEdit'
import OrgSettingsBlockedUsers from './pages/org/settings/BlockedUsers'
import OrgSettingsActions from './pages/org/settings/Actions'
import OrgSettingsActionsGeneral from './pages/org/settings/ActionsGeneral'
import OrgWorktime from './pages/org/Worktime'

// repo pages
import RepoEmpty from './pages/repo/Empty'
import RepoBlame from './pages/repo/Blame'
import RepoActivity from './pages/repo/Activity'
import RepoPulse from './pages/repo/Pulse'
import RepoContributors from './pages/repo/Contributors'
import RepoForks from './pages/repo/Forks'
import RepoWatchers from './pages/repo/Watchers'
import RepoGraph from './pages/repo/Graph'
import RepoSearch from './pages/repo/Search'
import RepoCreate from './pages/repo/Create'
import RepoCodeFrequency from './pages/repo/CodeFrequency'

// repo/branch & tag
import RepoBranchList from './pages/repo/branch/List'
import RepoTagList from './pages/repo/tag/List'

// repo/issue
import RepoIssueList from './pages/repo/issue/List'
import RepoIssueView from './pages/repo/issue/View'
import RepoIssueNew from './pages/repo/issue/New'
import RepoIssueLabels from './pages/repo/issue/Labels'
import RepoIssueMilestones from './pages/repo/issue/Milestones'
import RepoIssueMilestoneNew from './pages/repo/issue/MilestoneNew'
import RepoIssueMilestoneIssues from './pages/repo/issue/MilestoneIssues'
import RepoIssueChoose from './pages/repo/issue/Choose'

// repo/release
import RepoReleaseList from './pages/repo/release/List'
import RepoReleaseNew from './pages/repo/release/New'

// repo/wiki
import RepoWikiView from './pages/repo/wiki/View'
import RepoWikiPages from './pages/repo/wiki/Pages'
import RepoWikiNew from './pages/repo/wiki/New'
import RepoWikiStart from './pages/repo/wiki/Start'
import RepoWikiRevision from './pages/repo/wiki/Revision'

// repo/diff
import RepoDiffCompare from './pages/repo/diff/Compare'

// repo/editor
import RepoEditorEdit from './pages/repo/editor/Edit'
import RepoEditorDelete from './pages/repo/editor/Delete'
import RepoEditorUpload from './pages/repo/editor/Upload'
import RepoEditorPatch from './pages/repo/editor/Patch'
import RepoEditorCherryPick from './pages/repo/editor/CherryPick'

// repo/actions
import RepoActionsList from './pages/repo/actions/List'
import RepoActionsView from './pages/repo/actions/View'

// repo/projects
import RepoProjectsList from './pages/repo/projects/List'
import RepoProjectsNew from './pages/repo/projects/New'
import RepoProjectsView from './pages/repo/projects/View'

// repo/migrate
import RepoMigrate from './pages/repo/migrate/Migrate'
import RepoMigrating from './pages/repo/migrate/Migrating'

// repo/settings (sub-pages)
import RepoSettingsOptions from './pages/repo/settings/Options'
import RepoSettingsBranches from './pages/repo/settings/Branches'
import RepoSettingsProtectedBranch from './pages/repo/settings/ProtectedBranch'
import RepoSettingsCollaboration from './pages/repo/settings/Collaboration'
import RepoSettingsWebhookList from './pages/repo/settings/webhook/BaseList'
import RepoSettingsWebhookNew from './pages/repo/settings/webhook/New'
import RepoSettingsWebhookSettings from './pages/repo/settings/webhook/Settings'
import RepoSettingsDeployKeys from './pages/repo/settings/DeployKeys'
import RepoSettingsSecrets from './pages/repo/settings/Secrets'
import RepoSettingsRunnerEdit from './pages/repo/settings/RunnerEdit'
import RepoSettingsActions from './pages/repo/settings/Actions'
import RepoSettingsActionsGeneral from './pages/repo/settings/ActionsGeneral'
import RepoSettingsLfs from './pages/repo/settings/Lfs'
import RepoSettingsGithooks from './pages/repo/settings/Githooks'
import RepoSettingsGithookEdit from './pages/repo/settings/GithookEdit'
import RepoSettingsTags from './pages/repo/settings/Tags'
import RepoSettingsPublicAccess from './pages/repo/settings/PublicAccess'

// admin
import AdminDashboard from './pages/admin/Dashboard'
import AdminUserList from './pages/admin/user/List'
import AdminUserNew from './pages/admin/user/New'
import AdminUserView from './pages/admin/user/View'
import AdminUserEdit from './pages/admin/user/Edit'
import AdminRepoList from './pages/admin/repo/List'
import AdminRepoUnadopted from './pages/admin/repo/Unadopted'
import AdminOrgList from './pages/admin/org/List'
import AdminConfig from './pages/admin/Config'
import AdminStats from './pages/admin/Stats'
import AdminHooks from './pages/admin/Hooks'
import AdminHookNew from './pages/admin/HookNew'
import AdminAuthList from './pages/admin/auth/List'
import AdminAuthNew from './pages/admin/auth/New'
import AdminAuthEdit from './pages/admin/auth/Edit'
import AdminEmailsList from './pages/admin/emails/List'
import AdminCron from './pages/admin/Cron'
import AdminQueue from './pages/admin/Queue'
import AdminQueueManage from './pages/admin/QueueManage'
import AdminSelfCheck from './pages/admin/SelfCheck'
import AdminNotice from './pages/admin/Notice'
import AdminPackagesList from './pages/admin/packages/List'
import AdminActions from './pages/admin/Actions'
import AdminBadgeList from './pages/admin/badge/List'
import AdminBadgeNew from './pages/admin/badge/New'
import AdminBadgeView from './pages/admin/badge/View'
import AdminBadgeEdit from './pages/admin/badge/Edit'
import AdminBadgeUsers from './pages/admin/badge/Users'
import AdminApplicationsList from './pages/admin/applications/List'
import AdminApplicationsOauth2Edit from './pages/admin/applications/Oauth2Edit'
import AdminRunnersEdit from './pages/admin/runners/Edit'
import AdminSystemStatus from './pages/admin/SystemStatus'
import AdminStacktrace from './pages/admin/Stacktrace'
import AdminPerftrace from './pages/admin/Perftrace'

// package registry
import PackageView from './pages/package/View'
import PackageSettings from './pages/package/Settings'
import PackageSharedList from './pages/package/shared/List'
import PackageSharedVersionList from './pages/package/shared/Versionlist'

// global projects
import ProjectsList from './pages/projects/List'
import ProjectsNew from './pages/projects/New'
import ProjectsView from './pages/projects/View'

// swagger / api docs
import SwaggerOpenapiViewer from './pages/swagger/OpenapiViewer'

// webhook
import WebhookNew from './pages/webhook/New'

// status
import NotFound from './pages/status/NotFound'
import ServerError from './pages/status/ServerError'
import ServiceUnavailable from './pages/status/503'

// Encode a router pathname into a query string:  / → ?   /login → ?login
function pathToQuery(pathname: string): string {
  return '?' + (pathname === '/' ? '' : pathname.slice(1))
}

// Decode the current window query string back to a router pathname
function queryToPath(): string {
  const s = window.location.search
  return (!s || s === '?') ? '/' : '/' + s.slice(1)
}

// Keeps window.location.search in sync with the in-memory router location,
// and drives the in-memory router when the user presses back/forward.
function QuerySync() {
  const location = useLocation()
  const navigate = useNavigate()
  const isFirst = useRef(true)

  useEffect(() => {
    const query = pathToQuery(location.pathname)
    if (window.location.search !== query) {
      if (isFirst.current) {
        history.replaceState(null, '', window.location.pathname + query)
      } else {
        history.pushState(null, '', window.location.pathname + query)
      }
    }
    isFirst.current = false
  })

  useEffect(() => {
    function onPopState() {
      navigate(queryToPath(), { replace: true })
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [navigate])

  return null
}

export default function App() {
  return (
    <MemoryRouter initialEntries={[queryToPath()]}>
      <QuerySync />
      <Routes>
        <Route element={<Layout />}>

          {/* ── install ─────────────────────────────────────────────────── */}
          <Route path="/install" element={<Install />} />
          <Route path="/post-install" element={<PostInstall />} />

          {/* ── home / dashboard ────────────────────────────────────────── */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ── explore ─────────────────────────────────────────────────── */}
          <Route path="/explore" element={<Navigate to="/explore/repos" replace />} />
          <Route path="/explore/repos" element={<ExploreRepos />} />
          <Route path="/explore/users" element={<ExploreUsers />} />
          <Route path="/explore/organizations" element={<ExploreOrgsPage />} />
          <Route path="/explore/code" element={<ExploreCode />} />

          {/* ── user auth ───────────────────────────────────────────────── */}
          <Route path="/login" element={<Login />} />
          <Route path="/user/login" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/sign_up" element={<Signup />} />
          <Route path="/user/forgot_password" element={<ForgotPasswd />} />
          <Route path="/user/reset_password" element={<ResetPasswd />} />
          <Route path="/user/change_password" element={<ChangePasswd />} />
          <Route path="/user/activate" element={<Activate />} />
          <Route path="/user/activate_email" element={<ActivatePrompt />} />
          <Route path="/user/prohibit_login" element={<ProhibitLogin />} />
          <Route path="/user/two_factor" element={<Twofa />} />
          <Route path="/user/two_factor_scratch" element={<TwofaScratch />} />
          <Route path="/user/webauthn" element={<Webauthn />} />
          <Route path="/user/oauth2/grant" element={<Grant />} />

          {/* ── user dashboard ──────────────────────────────────────────── */}
          <Route path="/issues" element={<DashboardIssues />} />
          <Route path="/pulls" element={<DashboardIssues />} />
          <Route path="/milestones" element={<DashboardMilestones />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/notifications/subscriptions" element={<NotificationSubscriptions />} />

          {/* ── user settings ───────────────────────────────────────────── */}
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/user/settings" element={<SettingsProfile />} />
          <Route path="/user/settings/account" element={<SettingsAccount />} />
          <Route path="/user/settings/security" element={<SettingsSecurity />} />
          <Route path="/user/settings/security/two_factor/enroll" element={<SettingsTwofaEnroll />} />
          <Route path="/user/settings/keys" element={<SettingsKeys />} />
          <Route path="/user/settings/keys/ssh" element={<SettingsKeysSsh />} />
          <Route path="/user/settings/keys/gpg" element={<SettingsKeysGpg />} />
          <Route path="/user/settings/keys/principal" element={<SettingsKeysPrincipal />} />
          <Route path="/user/settings/applications" element={<SettingsApplications />} />
          <Route path="/user/settings/applications/oauth2" element={<SettingsApplicationsOauth2 />} />
          <Route path="/user/settings/applications/oauth2/:id" element={<SettingsApplicationsOauth2Edit />} />
          <Route path="/user/settings/grants" element={<SettingsGrantsOauth2 />} />
          <Route path="/user/settings/hooks" element={<SettingsHooks />} />
          <Route path="/user/settings/hooks/new" element={<SettingsHookNew />} />
          <Route path="/user/settings/notifications" element={<SettingsNotifications />} />
          <Route path="/user/settings/repos" element={<SettingsRepos />} />
          <Route path="/user/settings/organizations" element={<SettingsOrganization />} />
          <Route path="/user/settings/appearance" element={<SettingsAppearance />} />
          <Route path="/user/settings/packages" element={<SettingsPackages />} />
          <Route path="/user/settings/blocked_users" element={<SettingsBlockedUsers />} />
          <Route path="/user/settings/actions" element={<SettingsActions />} />
          <Route path="/user/settings/actions/general" element={<SettingsActionsGeneral />} />
          <Route path="/user/settings/runners/:id" element={<SettingsRunnerEdit />} />

          {/* ── create pages ────────────────────────────────────────────── */}
          <Route path="/new" element={<CreateRepo />} />
          <Route path="/repo/create" element={<RepoCreate />} />
          <Route path="/repo/migrate" element={<RepoMigrate />} />
          <Route path="/repo/migrating" element={<RepoMigrating />} />
          <Route path="/org/create" element={<CreateOrg />} />
          <Route path="/org/new" element={<OrgCreate />} />

          {/* ── org pages ───────────────────────────────────────────────── */}
          <Route path="/org/:orgname" element={<OrgHome />} />
          <Route path="/org/:orgname/members" element={<OrgMemberMembers />} />
          <Route path="/org/:orgname/teams" element={<OrgTeamTeams />} />
          <Route path="/org/:orgname/teams/new" element={<OrgTeamNew />} />
          <Route path="/org/:orgname/teams/:teamname" element={<OrgTeamMembers />} />
          <Route path="/org/:orgname/teams/:teamname/repositories" element={<OrgTeamRepositories />} />
          <Route path="/org/:orgname/teams/:teamname/invite" element={<OrgTeamInvite />} />
          <Route path="/org/:orgname/projects" element={<OrgProjectsList />} />
          <Route path="/org/:orgname/projects/new" element={<OrgProjectsNew />} />
          <Route path="/org/:orgname/projects/:id" element={<OrgProjectsView />} />
          <Route path="/org/:orgname/settings" element={<OrgSettingsOptions />} />
          <Route path="/org/:orgname/settings/hooks" element={<OrgSettingsHooks />} />
          <Route path="/org/:orgname/settings/hooks/new" element={<OrgSettingsHookNew />} />
          <Route path="/org/:orgname/settings/labels" element={<OrgSettingsLabels />} />
          <Route path="/org/:orgname/settings/applications" element={<OrgSettingsApplications />} />
          <Route path="/org/:orgname/settings/applications/oauth2/:id" element={<OrgSettingsApplicationsOauth2Edit />} />
          <Route path="/org/:orgname/settings/packages" element={<OrgSettingsPackages />} />
          <Route path="/org/:orgname/settings/packages/cleanup_rules/:id/edit" element={<OrgSettingsPackagesCleanupEdit />} />
          <Route path="/org/:orgname/settings/packages/cleanup_rules/:id/preview" element={<OrgSettingsPackagesCleanupPreview />} />
          <Route path="/org/:orgname/settings/runners/:id" element={<OrgSettingsRunnersEdit />} />
          <Route path="/org/:orgname/settings/blocked_users" element={<OrgSettingsBlockedUsers />} />
          <Route path="/org/:orgname/settings/actions" element={<OrgSettingsActions />} />
          <Route path="/org/:orgname/settings/actions/general" element={<OrgSettingsActionsGeneral />} />
          <Route path="/org/:orgname/worktime" element={<OrgWorktime />} />
          <Route path="/org/:orgname/menu" element={<OrgMenu />} />

          {/* ── admin ───────────────────────────────────────────────────── */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/-/admin" element={<Navigate to="/-/admin/dashboard" replace />} />
          <Route path="/-/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/-/admin/users" element={<AdminUserList />} />
          <Route path="/-/admin/users/new" element={<AdminUserNew />} />
          <Route path="/-/admin/users/:id" element={<AdminUserView />} />
          <Route path="/-/admin/users/:id/edit" element={<AdminUserEdit />} />
          <Route path="/-/admin/repos" element={<AdminRepoList />} />
          <Route path="/-/admin/repos/unadopted" element={<AdminRepoUnadopted />} />
          <Route path="/-/admin/orgs" element={<AdminOrgList />} />
          <Route path="/-/admin/config" element={<AdminConfig />} />
          <Route path="/-/admin/stats" element={<AdminStats />} />
          <Route path="/-/admin/hooks" element={<AdminHooks />} />
          <Route path="/-/admin/hooks/new" element={<AdminHookNew />} />
          <Route path="/-/admin/auth" element={<AdminAuthList />} />
          <Route path="/-/admin/auth/new" element={<AdminAuthNew />} />
          <Route path="/-/admin/auth/:id/edit" element={<AdminAuthEdit />} />
          <Route path="/-/admin/emails" element={<AdminEmailsList />} />
          <Route path="/-/admin/cron" element={<AdminCron />} />
          <Route path="/-/admin/queues" element={<AdminQueue />} />
          <Route path="/-/admin/queues/:id" element={<AdminQueueManage />} />
          <Route path="/-/admin/self_check" element={<AdminSelfCheck />} />
          <Route path="/-/admin/notice" element={<AdminNotice />} />
          <Route path="/-/admin/packages" element={<AdminPackagesList />} />
          <Route path="/-/admin/actions" element={<AdminActions />} />
          <Route path="/-/admin/badges" element={<AdminBadgeList />} />
          <Route path="/-/admin/badges/new" element={<AdminBadgeNew />} />
          <Route path="/-/admin/badges/:id" element={<AdminBadgeView />} />
          <Route path="/-/admin/badges/:id/edit" element={<AdminBadgeEdit />} />
          <Route path="/-/admin/badges/:id/users" element={<AdminBadgeUsers />} />
          <Route path="/-/admin/applications" element={<AdminApplicationsList />} />
          <Route path="/-/admin/applications/oauth2/:id/edit" element={<AdminApplicationsOauth2Edit />} />
          <Route path="/-/admin/runners/:id" element={<AdminRunnersEdit />} />
          <Route path="/-/admin/system_status" element={<AdminSystemStatus />} />
          <Route path="/-/admin/stacktrace" element={<AdminStacktrace />} />
          <Route path="/-/admin/perftrace" element={<AdminPerftrace />} />

          {/* ── package registry ────────────────────────────────────────── */}
          <Route path="/-/packages" element={<PackageSharedList />} />
          <Route path="/:owner/packages" element={<PackageSharedList />} />
          <Route path="/:owner/packages/:type/:name" element={<PackageSharedVersionList />} />
          <Route path="/:owner/packages/:type/:name/:version" element={<PackageView />} />
          <Route path="/:owner/packages/:type/:name/settings" element={<PackageSettings />} />

          {/* ── global projects ─────────────────────────────────────────── */}
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/new" element={<ProjectsNew />} />
          <Route path="/projects/:id" element={<ProjectsView />} />

          {/* ── swagger / api docs ──────────────────────────────────────── */}
          <Route path="/api/swagger" element={<SwaggerOpenapiViewer />} />

          {/* ── webhook ─────────────────────────────────────────────────── */}
          <Route path="/-/webhooks/new" element={<WebhookNew />} />

          {/* ── template previews ────────────────────────────────────────── */}
          <Route path="/_templates" element={<TemplatesIndex />} />
          <Route path="/_templates/*" element={<TemplateView />} />

          {/* ── user profile ────────────────────────────────────────────── */}
          <Route path="/:username" element={<UserProfile />} />

          {/* ── repository — home / code view ───────────────────────────── */}
          <Route path="/:username/:repo" element={<RepoPage />} />
          <Route path="/:username/:repo/empty" element={<RepoEmpty />} />

          {/* Gitea-style source routes */}
          <Route path="/:username/:repo/src/branch/:ref" element={<FileTree />} />
          <Route path="/:username/:repo/src/branch/:ref/*" element={<FileTree />} />
          <Route path="/:username/:repo/src/tag/:ref" element={<FileTree />} />
          <Route path="/:username/:repo/src/tag/:ref/*" element={<FileTree />} />
          <Route path="/:username/:repo/src/commit/:ref" element={<FileTree />} />
          <Route path="/:username/:repo/src/commit/:ref/*" element={<FileTree />} />

          {/* Legacy tree/blob routes */}
          <Route path="/:username/:repo/tree/:ref/*" element={<FileTree />} />
          <Route path="/:username/:repo/blob/:ref/*" element={<FileViewer />} />

          {/* Blame */}
          <Route path="/:username/:repo/blame/:ref/*" element={<RepoBlame />} />

          {/* Commits */}
          <Route path="/:username/:repo/commits/:ref" element={<CommitHistory />} />
          <Route path="/:username/:repo/commit/:sha" element={<CommitDetail />} />

          {/* Repo stats / insights */}
          <Route path="/:username/:repo/activity" element={<RepoActivity />} />
          <Route path="/:username/:repo/pulse" element={<RepoPulse />} />
          <Route path="/:username/:repo/contributors" element={<RepoContributors />} />
          <Route path="/:username/:repo/code-frequency" element={<RepoCodeFrequency />} />
          <Route path="/:username/:repo/forks" element={<RepoForks />} />
          <Route path="/:username/:repo/watchers" element={<RepoWatchers />} />
          <Route path="/:username/:repo/graph" element={<RepoGraph />} />
          <Route path="/:username/:repo/search" element={<RepoSearch />} />
          <Route path="/:username/:repo/branches" element={<RepoBranchList />} />
          <Route path="/:username/:repo/tags" element={<RepoTagList />} />

          {/* Issues */}
          <Route path="/:username/:repo/issues" element={<RepoIssueList />} />
          <Route path="/:username/:repo/issues/new" element={<RepoIssueNew />} />
          <Route path="/:username/:repo/issues/new/choose" element={<RepoIssueChoose />} />
          <Route path="/:username/:repo/issues/:id" element={<RepoIssueView />} />
          <Route path="/:username/:repo/labels" element={<RepoIssueLabels />} />
          <Route path="/:username/:repo/milestones" element={<RepoIssueMilestones />} />
          <Route path="/:username/:repo/milestones/new" element={<RepoIssueMilestoneNew />} />
          <Route path="/:username/:repo/milestone/:id" element={<RepoIssueMilestoneIssues />} />

          {/* Pull Requests */}
          <Route path="/:username/:repo/pulls" element={<RepoIssueList />} />
          <Route path="/:username/:repo/pulls/:id" element={<RepoIssueView />} />
          <Route path="/:username/:repo/compare/*" element={<RepoDiffCompare />} />

          {/* Releases */}
          <Route path="/:username/:repo/releases" element={<RepoReleaseList />} />
          <Route path="/:username/:repo/releases/new" element={<RepoReleaseNew />} />
          <Route path="/:username/:repo/releases/edit/:tag" element={<RepoReleaseNew />} />
          <Route path="/:username/:repo/releases/tag/:tag" element={<RepoReleaseList />} />

          {/* Wiki */}
          <Route path="/:username/:repo/wiki" element={<WikiPage />} />
          <Route path="/:username/:repo/wiki/_pages" element={<RepoWikiPages />} />
          <Route path="/:username/:repo/wiki/_new" element={<RepoWikiNew />} />
          <Route path="/:username/:repo/wiki/_revision" element={<RepoWikiRevision />} />
          <Route path="/:username/:repo/wiki/start" element={<RepoWikiStart />} />
          <Route path="/:username/:repo/wiki/:page" element={<RepoWikiView />} />
          <Route path="/:username/:repo/wiki/:page/revision" element={<RepoWikiRevision />} />

          {/* Actions / CI */}
          <Route path="/:username/:repo/actions" element={<RepoActionsList />} />
          <Route path="/:username/:repo/actions/runs/:id" element={<RepoActionsView />} />

          {/* Projects */}
          <Route path="/:username/:repo/projects" element={<RepoProjectsList />} />
          <Route path="/:username/:repo/projects/new" element={<RepoProjectsNew />} />
          <Route path="/:username/:repo/projects/:id" element={<RepoProjectsView />} />

          {/* Web editor */}
          <Route path="/:username/:repo/_edit/:ref/*" element={<RepoEditorEdit />} />
          <Route path="/:username/:repo/_delete/:ref/*" element={<RepoEditorDelete />} />
          <Route path="/:username/:repo/_upload/:ref/*" element={<RepoEditorUpload />} />
          <Route path="/:username/:repo/_patch/:ref/*" element={<RepoEditorPatch />} />
          <Route path="/:username/:repo/_cherry-pick/:sha/onto/:ref" element={<RepoEditorCherryPick />} />

          {/* Repo settings sub-pages */}
          <Route path="/:username/:repo/settings" element={<RepoSettings />} />
          <Route path="/:username/:repo/settings/options" element={<RepoSettingsOptions />} />
          <Route path="/:username/:repo/settings/branches" element={<RepoSettingsBranches />} />
          <Route path="/:username/:repo/settings/branches/:name" element={<RepoSettingsProtectedBranch />} />
          <Route path="/:username/:repo/settings/collaboration" element={<RepoSettingsCollaboration />} />
          <Route path="/:username/:repo/settings/webhooks" element={<RepoSettingsWebhookList />} />
          <Route path="/:username/:repo/settings/webhooks/new" element={<RepoSettingsWebhookNew />} />
          <Route path="/:username/:repo/settings/webhooks/:id" element={<RepoSettingsWebhookSettings />} />
          <Route path="/:username/:repo/settings/keys" element={<RepoSettingsDeployKeys />} />
          <Route path="/:username/:repo/settings/secrets" element={<RepoSettingsSecrets />} />
          <Route path="/:username/:repo/settings/runners/:id" element={<RepoSettingsRunnerEdit />} />
          <Route path="/:username/:repo/settings/actions" element={<RepoSettingsActions />} />
          <Route path="/:username/:repo/settings/actions/general" element={<RepoSettingsActionsGeneral />} />
          <Route path="/:username/:repo/settings/lfs" element={<RepoSettingsLfs />} />
          <Route path="/:username/:repo/settings/githooks" element={<RepoSettingsGithooks />} />
          <Route path="/:username/:repo/settings/githooks/:name" element={<RepoSettingsGithookEdit />} />
          <Route path="/:username/:repo/settings/tags" element={<RepoSettingsTags />} />
          <Route path="/:username/:repo/settings/public_access" element={<RepoSettingsPublicAccess />} />

          {/* Milestones (kept for compat) */}
          <Route path="/:username/:repo/milestones-old" element={<MilestonesPage />} />

          {/* ── status pages ────────────────────────────────────────────── */}
          <Route path="/404" element={<NotFound />} />
          <Route path="/500" element={<ServerError />} />
          <Route path="/503" element={<ServiceUnavailable />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}
