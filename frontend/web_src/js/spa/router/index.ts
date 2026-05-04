import {createRouter, type RouteRecordRaw} from 'vue-router';
import {createQueryHistory} from './queryHistory.ts';

// Pages
import InstallPage from '../pages/InstallPage.vue';
import HomePage from '../pages/HomePage.vue';
import ExplorePage from '../pages/ExplorePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import UserProfilePage from '../pages/UserProfilePage.vue';
import UserIssuesPage from '../pages/UserIssuesPage.vue';
import UserSettingsPage from '../pages/UserSettingsPage.vue';
import NotificationsPage from '../pages/NotificationsPage.vue';
import AdminPage from '../pages/AdminPage.vue';
import RepoOverviewPage from '../pages/RepoOverviewPage.vue';
import IssueListPage from '../pages/IssueListPage.vue';
import IssueDetailPage from '../pages/IssueDetailPage.vue';
import NewIssuePage from '../pages/NewIssuePage.vue';
import PullRequestListPage from '../pages/PullRequestListPage.vue';
import RepoSourcePage from '../pages/RepoSourcePage.vue';
import RepoCommitsPage from '../pages/RepoCommitsPage.vue';
import RepoBranchesPage from '../pages/RepoBranchesPage.vue';
import RepoReleasesPage from '../pages/RepoReleasesPage.vue';
import RepoTagsPage from '../pages/RepoTagsPage.vue';
import RepoWikiPage from '../pages/RepoWikiPage.vue';
import RepoActivityPage from '../pages/RepoActivityPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

// ---------------------------------------------------------------------------
// Route table
//
// Priority rules:
//   1. Literal path segments always win over dynamic ones at the same level.
//   2. All /-/ and /user/ routes are declared before /:owner/:repo and
//      /:username so the catchall dynamic segments never swallow them.
//   3. The /:username catch-all comes last among dynamic one-segment paths so
//      every repo, setting, and explore route wins first.
// ---------------------------------------------------------------------------

const routes: RouteRecordRaw[] = [

  // ── Installation wizard ───────────────────────────────────────────────────
  // Shown when the Gitea backend has not yet been configured.  Also reachable
  // directly via /?install.
  {path: '/install', component: InstallPage, meta: {title: 'Install Gitea', public: true}},

  // ── Dashboard / home ──────────────────────────────────────────────────────
  {path: '/', component: HomePage, meta: {title: 'Dashboard'}},

  // ── Explore ───────────────────────────────────────────────────────────────
  {path: '/explore', redirect: '/explore/repos'},
  {path: '/explore/repos', component: ExplorePage, meta: {title: 'Explore Repositories', tab: 'repos'}},
  {path: '/explore/users', component: ExplorePage, meta: {title: 'Explore Users', tab: 'users'}},
  {path: '/explore/organizations', component: ExplorePage, meta: {title: 'Explore Organizations', tab: 'orgs'}},

  // ── Auth ──────────────────────────────────────────────────────────────────
  {path: '/user/login', component: LoginPage, meta: {title: 'Sign In', public: true}},
  {path: '/user/sign_up', component: RegisterPage, meta: {title: 'Register', public: true}},
  // OAuth2 / external auth — rendered by login page; exact paths kept for
  // direct-link support (the page handles the provider param).
  {path: '/user/oauth2/:provider', component: LoginPage, meta: {title: 'Sign In', public: true}},
  {path: '/user/oauth2/:provider/callback', component: LoginPage, meta: {title: 'Sign In', public: true}},
  // Account activation & password reset
  {path: '/user/activate', component: LoginPage, meta: {title: 'Activate Account', public: true}},
  {path: '/user/forgot_password', component: LoginPage, meta: {title: 'Forgot Password', public: true}},
  {path: '/user/reset_password', component: LoginPage, meta: {title: 'Reset Password', public: true}},

  // ── User settings ─────────────────────────────────────────────────────────
  {path: '/user/settings', component: UserSettingsPage, meta: {title: 'Settings'}},
  {path: '/user/settings/:tab', component: UserSettingsPage, meta: {title: 'Settings'}},

  // ── User dashboard (issues / pulls / milestones) ──────────────────────────
  {path: '/issues', component: UserIssuesPage, meta: {title: 'Issues'}},
  {path: '/issues/:type(your_repositories|assigned|mentioned)', component: UserIssuesPage, meta: {title: 'Issues'}},
  {path: '/pulls', component: UserIssuesPage, meta: {title: 'Pull Requests'}},
  {path: '/milestones', component: UserIssuesPage, meta: {title: 'Milestones'}},

  // ── Notifications ─────────────────────────────────────────────────────────
  {path: '/notifications', component: NotificationsPage, meta: {title: 'Notifications'}},
  {path: '/notifications/subscriptions', component: NotificationsPage, meta: {title: 'Subscriptions'}},
  {path: '/notifications/watching', component: NotificationsPage, meta: {title: 'Watching'}},

  // ── Repository creation ───────────────────────────────────────────────────
  {path: '/repo/create', component: RepoOverviewPage, meta: {title: 'New Repository'}},
  {path: '/repo/migrate', component: RepoOverviewPage, meta: {title: 'Migrate Repository'}},

  // ── Organisation ──────────────────────────────────────────────────────────
  {path: '/org/create', component: UserProfilePage, meta: {title: 'New Organisation'}},
  {path: '/org/:org', component: UserProfilePage, meta: {title: 'Organisation'}},
  {path: '/org/:org/members', component: UserProfilePage, meta: {title: 'Organisation Members'}},
  {path: '/org/:org/teams', component: UserProfilePage, meta: {title: 'Teams'}},
  {path: '/org/:org/teams/:team', component: UserProfilePage, meta: {title: 'Team'}},
  {path: '/org/:org/settings', component: UserSettingsPage, meta: {title: 'Organisation Settings'}},
  {path: '/org/:org/settings/:tab', component: UserSettingsPage, meta: {title: 'Organisation Settings'}},

  // ── Site-admin (/-/admin/…) ───────────────────────────────────────────────
  // Legacy paths: /admin/... → /-/admin/... (old Gitea used /admin/, new uses /-/admin/)
  {path: '/admin', redirect: '/-/admin'},
  {path: '/admin/:section', redirect: (to) => `/-/admin/${to.params.section}`},
  {path: '/admin/:section/:subsection', redirect: (to) => `/-/admin/${to.params.section}/${to.params.subsection}`},
  {path: '/admin/:section/:subsection/:action', redirect: (to) => `/-/admin/${to.params.section}/${to.params.subsection}/${to.params.action}`},

  {path: '/-/admin', component: AdminPage, meta: {title: 'Administration'}},
  {path: '/-/admin/:section', component: AdminPage, meta: {title: 'Administration'}},
  {path: '/-/admin/:section/:subsection', component: AdminPage, meta: {title: 'Administration'}},
  {path: '/-/admin/:section/:subsection/:action', component: AdminPage, meta: {title: 'Administration'}},

  // ── Repository routes ─────────────────────────────────────────────────────
  // Must appear BEFORE the /:username catch-all.

  // Overview
  {path: '/:owner/:repo', component: RepoOverviewPage, meta: {title: 'Repository'}},

  // Issues
  {path: '/:owner/:repo/issues', component: IssueListPage, meta: {title: 'Issues'}},
  {path: '/:owner/:repo/issues/new', component: NewIssuePage, meta: {title: 'New Issue'}},
  {path: '/:owner/:repo/issues/:index(\\d+)', component: IssueDetailPage, meta: {title: 'Issue'}},
  {path: '/:owner/:repo/issues/:index(\\d+)/edit', component: IssueDetailPage, meta: {title: 'Edit Issue'}},

  // Pull requests
  {path: '/:owner/:repo/pulls', component: PullRequestListPage, meta: {title: 'Pull Requests'}},
  {path: '/:owner/:repo/pulls/:index(\\d+)', component: IssueDetailPage, meta: {title: 'Pull Request'}},
  {path: '/:owner/:repo/compare/:pathMatch(.*)', component: IssueDetailPage, meta: {title: 'Compare'}},

  // Source / file browser — two variants: with and without a trailing file path.
  // :refType is 'branch', 'tag', or 'commit'.
  {path: '/:owner/:repo/src/:refType/:ref', component: RepoSourcePage, meta: {title: 'Source'}},
  {path: '/:owner/:repo/src/:refType/:ref/:pathMatch(.*)', component: RepoSourcePage, meta: {title: 'Source'}},

  // Blame
  {path: '/:owner/:repo/blame/:refType/:ref/:pathMatch(.*)', component: RepoSourcePage, meta: {title: 'Blame'}},

  // Commits
  {path: '/:owner/:repo/commits/:refType/:ref', component: RepoCommitsPage, meta: {title: 'Commits'}},
  {path: '/:owner/:repo/commits/:refType/:ref/:pathMatch(.*)', component: RepoCommitsPage, meta: {title: 'Commits'}},
  {path: '/:owner/:repo/commit/:sha', component: RepoCommitsPage, meta: {title: 'Commit'}},

  // Branches
  {path: '/:owner/:repo/branches', component: RepoBranchesPage, meta: {title: 'Branches'}},

  // Releases & tags
  {path: '/:owner/:repo/releases', component: RepoReleasesPage, meta: {title: 'Releases'}},
  {path: '/:owner/:repo/releases/tag/:tag', component: RepoReleasesPage, meta: {title: 'Release'}},
  {path: '/:owner/:repo/releases/latest', component: RepoReleasesPage, meta: {title: 'Latest Release'}},
  {path: '/:owner/:repo/releases/new', component: RepoReleasesPage, meta: {title: 'New Release'}},
  {path: '/:owner/:repo/releases/edit/:tag', component: RepoReleasesPage, meta: {title: 'Edit Release'}},
  {path: '/:owner/:repo/tags', component: RepoTagsPage, meta: {title: 'Tags'}},

  // Wiki
  {path: '/:owner/:repo/wiki', component: RepoWikiPage, meta: {title: 'Wiki'}},
  {path: '/:owner/:repo/wiki/:pathMatch(.*)', component: RepoWikiPage, meta: {title: 'Wiki'}},

  // Activity / pulse
  {path: '/:owner/:repo/activity', component: RepoActivityPage, meta: {title: 'Activity'}},
  {path: '/:owner/:repo/activity/:period', component: RepoActivityPage, meta: {title: 'Activity'}},
  {path: '/:owner/:repo/pulse', component: RepoActivityPage, meta: {title: 'Activity'}},
  {path: '/:owner/:repo/pulse/:period', component: RepoActivityPage, meta: {title: 'Activity'}},

  // Graphs
  {path: '/:owner/:repo/graphs/:graph', component: RepoActivityPage, meta: {title: 'Graph'}},

  // Repository settings
  {path: '/:owner/:repo/settings', component: RepoOverviewPage, meta: {title: 'Settings'}},
  {path: '/:owner/:repo/settings/:tab', component: RepoOverviewPage, meta: {title: 'Settings'}},

  // Forks / watchers / stargazers
  {path: '/:owner/:repo/forks', component: RepoOverviewPage, meta: {title: 'Forks'}},
  {path: '/:owner/:repo/watchers', component: RepoOverviewPage, meta: {title: 'Watchers'}},
  {path: '/:owner/:repo/stargazers', component: RepoOverviewPage, meta: {title: 'Stargazers'}},

  // Actions (CI)
  {path: '/:owner/:repo/actions', component: RepoOverviewPage, meta: {title: 'Actions'}},
  {path: '/:owner/:repo/actions/runs/:runId', component: RepoOverviewPage, meta: {title: 'Action Run'}},
  {path: '/:owner/:repo/actions/workflows/:workflow', component: RepoOverviewPage, meta: {title: 'Workflow'}},

  // Packages
  {path: '/:owner/:repo/packages', component: RepoOverviewPage, meta: {title: 'Packages'}},

  // ── User / org profile — LAST dynamic single-segment path ─────────────────
  {path: '/:username', component: UserProfilePage, meta: {title: 'Profile', public: true}},

  // ── 404 catch-all ─────────────────────────────────────────────────────────
  {path: '/:pathMatch(.*)*', component: NotFoundPage, meta: {title: 'Page Not Found', public: true}},
];

export const router = createRouter({
  history: createQueryHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    return {top: 0};
  },
});

// Capture the application name once at startup.
const titleParts = document.title.split(' - ');
const appName = titleParts.at(-1) ?? titleParts[0] ?? 'Gitea';

// Update document title on every navigation.
router.afterEach((to) => {
  const title = to.meta.title as string | undefined;
  if (title) document.title = `${title} - ${appName}`;
});

// ---------------------------------------------------------------------------
// Auto-detect uninstalled state.
//
// When the Gitea backend returns HTTP 503 (Service Unavailable) it means the
// instance has not been set up yet.  On the first navigation to any page that
// is not already the install wizard, probe the API and redirect if needed.
// ---------------------------------------------------------------------------
import {apiBase} from '../spaconfig.ts';

let installCheckDone = false;

router.beforeEach(async (to) => {
  if (installCheckDone || to.path === '/install') return true;
  installCheckDone = true; // only probe once per SPA session
  try {
    const resp = await fetch(`${apiBase}/settings/api`, {method: 'GET'});
    if (resp.status === 503) {
      return {path: '/install', replace: true};
    }
  } catch {
    // Network error — cannot reach backend; let navigation proceed normally.
  }
  return true;
});
