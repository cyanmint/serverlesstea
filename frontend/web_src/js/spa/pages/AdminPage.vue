<!-- Translated from: templates/admin/dashboard.tmpl + admin/navbar.tmpl + admin/org/list.tmpl + admin/repo/list.tmpl + admin/user/list.tmpl -->
<template>
  <AppLayout page-class="admin" title="Site Administration">
    <div class="ui container">
      <div class="ui grid">
        <!-- Admin sidebar nav (admin/navbar.tmpl) -->
        <div class="four wide column">
          <div class="ui fluid vertical menu">
            <div class="header item">Administration</div>
            <details class="item" :open="section === 'dashboard'">
              <summary>Maintenance</summary>
              <div class="menu">
                <a :class="['item', {active: section === 'dashboard'}]" @click="section='dashboard'">Dashboard</a>
              </div>
            </details>
            <details class="item" :open="section === 'users' || section === 'orgs'">
              <summary>Identity &amp; Access</summary>
              <div class="menu">
                <a :class="['item', {active: section === 'orgs'}]" @click="section='orgs'">Organizations</a>
                <a :class="['item', {active: section === 'users'}]" @click="section='users'">User Accounts</a>
              </div>
            </details>
            <details class="item" :open="section === 'repos'">
              <summary>Assets</summary>
              <div class="menu">
                <a :class="['item', {active: section === 'repos'}]" @click="section='repos'">Repositories</a>
              </div>
            </details>
          </div>
        </div>

        <!-- Admin content -->
        <div class="twelve wide column">
          <!-- Dashboard (admin/dashboard.tmpl) -->
          <template v-if="section === 'dashboard'">
            <h4 class="ui top attached header">Maintenance Operations</h4>
            <div class="ui attached table segment">
              <table class="ui very basic table tw-mt-0 tw-px-4">
                <tbody>
                  <tr v-for="op in operations" :key="op.value">
                    <td>{{ op.label }}</td>
                    <td class="tw-text-right">
                      <button class="ui primary button" :disabled="runningOp === op.value" @click="runOperation(op.value)">
                        ▶ Run
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="opResult" class="ui positive message tw-mt-4">{{ opResult }}</div>

            <h4 class="ui top attached header tw-mt-4">System Status</h4>
            <div class="ui attached table segment">
              <table class="ui very basic table">
                <tbody>
                  <tr v-for="(value, key) in systemStatus" :key="key">
                    <td>{{ key }}</td>
                    <td>{{ value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>

          <!-- Users (admin/user/list.tmpl) -->
          <template v-if="section === 'users'">
            <h4 class="ui top attached header">
              User Accounts ({{ users.length }})
              <div class="ui right">
                <RouterLink class="ui primary tiny button" to="/-/admin/users/new">New User Account</RouterLink>
              </div>
            </h4>
            <div class="ui attached segment">
              <form class="ui form" @submit.prevent="loadUsers">
                <div class="ui action input tw-w-full">
                  <input v-model="userKeyword" type="text" placeholder="Search users…">
                  <button class="ui primary button" type="submit">Search</button>
                </div>
              </form>
            </div>
            <div class="ui attached table segment">
              <table class="ui very basic table unstackable">
                <thead>
                  <tr><th>ID</th><th>Username</th><th>Email</th><th>Active</th><th>Admin</th><th>Created</th></tr>
                </thead>
                <tbody>
                  <tr v-for="u in users" :key="u.id">
                    <td>{{ u.id }}</td>
                    <td><RouterLink :to="`/${u.login}`">{{ u.login }}</RouterLink></td>
                    <td>{{ u.email }}</td>
                    <td>{{ u.active ? '✓' : '✗' }}</td>
                    <td>{{ u.is_admin ? '✓' : '✗' }}</td>
                    <td>{{ formatDate(u.created) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>

          <!-- Organizations (admin/org/list.tmpl) -->
          <template v-if="section === 'orgs'">
            <h4 class="ui top attached header">
              Organizations ({{ orgs.length }})
              <div class="ui right">
                <RouterLink class="ui primary tiny button" to="/org/create">New Organization</RouterLink>
              </div>
            </h4>
            <div class="ui attached segment">
              <form class="ui form" @submit.prevent="loadOrgs">
                <div class="ui action input tw-w-full">
                  <input v-model="orgKeyword" type="text" placeholder="Search organizations…">
                  <button class="ui primary button" type="submit">Search</button>
                </div>
              </form>
            </div>
            <div class="ui attached table segment">
              <table class="ui very basic table unstackable">
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Teams</th><th>Members</th><th>Repos</th><th>Created</th></tr>
                </thead>
                <tbody>
                  <tr v-for="o in orgs" :key="o.id">
                    <td>{{ o.id }}</td>
                    <td><RouterLink :to="`/${o.username}`">{{ o.username }}</RouterLink></td>
                    <td>{{ o.teams_count || 0 }}</td>
                    <td>{{ o.members_count || 0 }}</td>
                    <td>{{ o.repo_count || 0 }}</td>
                    <td>{{ formatDate(o.created) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>

          <!-- Repositories (admin/repo/list.tmpl) -->
          <template v-if="section === 'repos'">
            <h4 class="ui top attached header">
              Repositories ({{ repos.length }})
            </h4>
            <div class="ui attached segment">
              <form class="ui form" @submit.prevent="loadRepos">
                <div class="ui action input tw-w-full">
                  <input v-model="repoKeyword" type="text" placeholder="Search repositories…">
                  <button class="ui primary button" type="submit">Search</button>
                </div>
              </form>
            </div>
            <div class="ui attached table segment">
              <table class="ui very basic table unstackable">
                <thead>
                  <tr><th>ID</th><th>Owner</th><th>Name</th><th>Stars</th><th>Forks</th><th>Issues</th><th>Size</th></tr>
                </thead>
                <tbody>
                  <tr v-for="r in repos" :key="r.id">
                    <td>{{ r.id }}</td>
                    <td><RouterLink :to="`/${r.owner?.login}`">{{ r.owner?.login }}</RouterLink></td>
                    <td><RouterLink :to="`/${r.full_name}`">{{ r.name }}</RouterLink></td>
                    <td>{{ r.stars_count }}</td>
                    <td>{{ r.forks_count }}</td>
                    <td>{{ r.open_issues_count }}</td>
                    <td>{{ formatSize(r.size) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {apiBase} from '../spaconfig.ts';
import {getStoredToken} from '../api/index.ts';

const token = getStoredToken() ?? '';
const headers = {Authorization: `token ${token}`};

const route = useRoute();
const section = ref((route.params['section'] as string) || 'dashboard');

watch(() => route.params['section'], (s) => {
  section.value = (s as string) || 'dashboard';
});
const users = ref<any[]>([]);
const orgs = ref<any[]>([]);
const repos = ref<any[]>([]);
const userKeyword = ref('');
const orgKeyword = ref('');
const repoKeyword = ref('');
const systemStatus = ref<Record<string, string>>({});
const runningOp = ref('');
const opResult = ref('');

const operations = [
  {value: 'delete_inactive_accounts', label: 'Delete all inactive accounts'},
  {value: 'delete_repo_archives', label: 'Delete all repository archives'},
  {value: 'delete_missing_repos', label: 'Delete repositories with missing Git files'},
  {value: 'git_gc_repos', label: 'Run garbage collection on repositories'},
  {value: 'resync_all_hooks', label: 'Resynchronize all pre-receive/update/post-receive hooks'},
  {value: 'reinit_missing_repos', label: 'Reinitialize all missing Git repositories'},
  {value: 'sync_external_users', label: 'Synchronize external user data'},
  {value: 'repo_health_check', label: 'Repository health check'},
  {value: 'sync_repo_branches', label: 'Synchronize missed branches from git data to database'},
  {value: 'sync_repo_tags', label: 'Synchronize tags from git data to database'},
];

function formatDate(d: string) { return d ? new Date(d).toLocaleDateString() : ''; }
function formatSize(kb: number) { return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`; }

async function runOperation(op: string) {
  runningOp.value = op;
  opResult.value = '';
  try {
    const resp = await fetch(`${apiBase}/admin/cron/run_${op}`, {method: 'POST', headers});
    opResult.value = resp.ok ? `Operation "${op}" completed.` : 'Operation failed.';
  } catch { opResult.value = 'Network error.'; }
  finally { runningOp.value = ''; }
}

async function loadUsers() {
  try {
    const q = userKeyword.value ? `?q=${encodeURIComponent(userKeyword.value)}` : '';
    const resp = await fetch(`${apiBase}/admin/users${q}`, {headers});
    if (resp.ok) users.value = await resp.json();
  } catch { /* empty */ }
}

async function loadOrgs() {
  try {
    const q = orgKeyword.value ? `?q=${encodeURIComponent(orgKeyword.value)}` : '';
    const resp = await fetch(`${apiBase}/admin/orgs${q}`, {headers});
    if (resp.ok) orgs.value = await resp.json();
  } catch { /* empty */ }
}

async function loadRepos() {
  try {
    const q = repoKeyword.value ? `?q=${encodeURIComponent(repoKeyword.value)}` : '';
    const resp = await fetch(`${apiBase}/repos/search${q}`, {headers});
    if (resp.ok) {
      const data = await resp.json();
      repos.value = data.data || data;
    }
  } catch { /* empty */ }
}

onMounted(async () => {
  await Promise.all([loadUsers(), loadOrgs(), loadRepos()]);
});
</script>
