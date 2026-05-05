<template>
  <AppLayout>
    <div role="main" class="page-content admin-dashboard">
      <div class="ui container fluid padded flex-container">
        <!-- Sidebar nav (matches admin/navbar.tmpl) -->
        <div class="flex-container-nav">
          <div class="ui fluid vertical menu">
            <div class="header item">Administration</div>

            <details class="item toggleable-item" :open="isInSection('') || isInSection('self_check')">
              <summary>Maintenance</summary>
              <div class="menu">
                <RouterLink to="/-/admin" class="item" :class="{active: !section}">Dashboard</RouterLink>
                <RouterLink to="/-/admin/self_check" class="item" :class="{active: section === 'self_check'}">Self Check</RouterLink>
              </div>
            </details>

            <details class="item toggleable-item" :open="isInSection('auths') || isInSection('orgs') || isInSection('users') || isInSection('emails')">
              <summary>Identity &amp; Access</summary>
              <div class="menu">
                <RouterLink to="/-/admin/auths" class="item" :class="{active: section === 'auths'}">Authentication</RouterLink>
                <RouterLink to="/-/admin/orgs" class="item" :class="{active: section === 'orgs'}">Organizations</RouterLink>
                <RouterLink to="/-/admin/users" class="item" :class="{active: section === 'users'}">Users</RouterLink>
                <RouterLink to="/-/admin/emails" class="item" :class="{active: section === 'emails'}">Emails</RouterLink>
              </div>
            </details>

            <details class="item toggleable-item" :open="isInSection('packages') || isInSection('repos')">
              <summary>Assets</summary>
              <div class="menu">
                <RouterLink to="/-/admin/packages" class="item" :class="{active: section === 'packages'}">Packages</RouterLink>
                <RouterLink to="/-/admin/repos" class="item" :class="{active: section === 'repos'}">Repositories</RouterLink>
              </div>
            </details>

            <details class="item toggleable-item" :open="isInSection('applications') || isInSection('hooks')">
              <summary>Integrations</summary>
              <div class="menu">
                <RouterLink to="/-/admin/applications" class="item" :class="{active: section === 'applications'}">Applications</RouterLink>
                <RouterLink to="/-/admin/hooks" class="item" :class="{active: section === 'hooks'}">Webhooks</RouterLink>
              </div>
            </details>

            <details class="item toggleable-item" :open="section === 'actions'">
              <summary>Actions</summary>
              <div class="menu">
                <RouterLink to="/-/admin/actions/runners" class="item" :class="{active: section === 'actions' && subsection === 'runners'}">Runners</RouterLink>
                <RouterLink to="/-/admin/actions/variables" class="item" :class="{active: section === 'actions' && subsection === 'variables'}">Variables</RouterLink>
              </div>
            </details>

            <details class="item toggleable-item" :open="section === 'config'">
              <summary>Config</summary>
              <div class="menu">
                <RouterLink to="/-/admin/config" class="item" :class="{active: section === 'config' && !subsection}">Summary</RouterLink>
                <RouterLink to="/-/admin/config/settings" class="item" :class="{active: section === 'config' && subsection === 'settings'}">Settings</RouterLink>
              </div>
            </details>

            <RouterLink to="/-/admin/notices" class="item" :class="{active: section === 'notices'}">Notices</RouterLink>

            <details class="item toggleable-item" :open="section === 'monitor'">
              <summary>Monitor</summary>
              <div class="menu">
                <RouterLink to="/-/admin/monitor/stats" class="item" :class="{active: section === 'monitor' && subsection === 'stats'}">Stats</RouterLink>
                <RouterLink to="/-/admin/monitor/cron" class="item" :class="{active: section === 'monitor' && subsection === 'cron'}">Cron Tasks</RouterLink>
                <RouterLink to="/-/admin/monitor/queues" class="item" :class="{active: section === 'monitor' && subsection === 'queues'}">Queues</RouterLink>
                <RouterLink to="/-/admin/monitor/stacktrace" class="item" :class="{active: section === 'monitor' && subsection === 'stacktrace'}">Trace</RouterLink>
              </div>
            </details>
          </div>
        </div>

        <!-- Main content -->
        <div class="flex-container-main">
          <!-- Dashboard -->
          <template v-if="!section">
            <div class="admin-setting-content">
              <h4 class="ui top attached header">Maintenance Operations</h4>
              <div class="ui attached table segment">
                <table class="ui very basic table tw-mt-0 tw-px-4">
                  <tbody>
                    <tr>
                      <td>Delete inactive accounts</td>
                      <td class="tw-text-right"><button class="ui primary button" disabled>Run</button></td>
                    </tr>
                    <tr>
                      <td>Delete repository archives</td>
                      <td class="tw-text-right"><button class="ui primary button" disabled>Run</button></td>
                    </tr>
                    <tr>
                      <td>Delete missing repositories</td>
                      <td class="tw-text-right"><button class="ui primary button" disabled>Run</button></td>
                    </tr>
                    <tr>
                      <td>Git garbage collect repositories</td>
                      <td class="tw-text-right"><button class="ui primary button" disabled>Run</button></td>
                    </tr>
                    <tr>
                      <td>Resync all SSH keys</td>
                      <td class="tw-text-right"><button class="ui primary button" disabled>Run</button></td>
                    </tr>
                    <tr>
                      <td>Resync all hooks</td>
                      <td class="tw-text-right"><button class="ui primary button" disabled>Run</button></td>
                    </tr>
                    <tr>
                      <td>Reinitialize missing repositories</td>
                      <td class="tw-text-right"><button class="ui primary button" disabled>Run</button></td>
                    </tr>
                    <tr>
                      <td>Sync external users</td>
                      <td class="tw-text-right"><button class="ui primary button" disabled>Run</button></td>
                    </tr>
                    <tr>
                      <td>Repository health check</td>
                      <td class="tw-text-right"><button class="ui primary button" disabled>Run</button></td>
                    </tr>
                    <tr>
                      <td>Delete generated repository avatars</td>
                      <td class="tw-text-right"><button class="ui primary button" disabled>Run</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h4 class="ui top attached header">System Status</h4>
              <div class="ui attached table segment">
                <div v-if="statsLoading" class="ui active centered inline loader tw-my-4"/>
                <div v-else-if="statsError" class="ui negative message"><p>{{ statsError }}</p></div>
                <table v-else class="ui very basic table unstackable">
                  <tbody>
                    <tr v-for="(val, key) in systemStats" :key="key">
                      <td width="200">{{ key }}</td>
                      <td>{{ val }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>

          <!-- Monitor / Stats -->
          <template v-else-if="section === 'monitor' && subsection === 'stats'">
            <div class="admin-setting-content">
              <h4 class="ui top attached header">Statistics</h4>
              <div class="ui attached table segment">
                <div v-if="statsLoading" class="ui active centered inline loader tw-my-4"/>
                <div v-else-if="statsError" class="ui negative message"><p>{{ statsError }}</p></div>
                <table v-else class="ui very basic table unstackable">
                  <tbody>
                    <tr v-for="(val, key) in systemStats" :key="key">
                      <td width="200">{{ key }}</td>
                      <td>{{ val }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>

          <!-- Users -->
          <template v-else-if="section === 'users'">
            <div class="admin-setting-content">
              <h4 class="ui top attached header">
                User Management ({{ adminTotalCount }} total)
                <div class="ui right">
                  <RouterLink to="/-/admin/users/new" class="ui primary tiny button">Create User Account</RouterLink>
                </div>
              </h4>
              <div v-if="adminLoading" class="ui active centered inline loader tw-my-4"/>
              <div v-else-if="adminError" class="ui negative message"><p>{{ adminError }}</p></div>
              <template v-else>
                <div class="ui attached table segment">
                  <table class="ui very basic selectable table unstackable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Activated</th>
                        <th>Admin</th>
                        <th>Created</th>
                        <th/>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="u in adminItems as User[]" :key="u.id">
                        <td>{{ u.id }}</td>
                        <td>
                          <RouterLink :to="`/${u.login}`">{{ u.login }}</RouterLink>
                          <span v-if="u.is_admin" class="ui mini label">Admin</span>
                        </td>
                        <td class="gt-ellipsis">{{ u.email }}</td>
                        <td>—</td>
                        <td>{{ u.is_admin ? '✓' : '' }}</td>
                        <td>{{ formatDate(u.created) }}</td>
                        <td>
                          <RouterLink :to="`/-/admin/users/${u.id}/edit`">Edit</RouterLink>
                        </td>
                      </tr>
                      <tr v-if="!adminItems.length">
                        <td class="tw-text-center" colspan="7">No results found.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="adminTotalPages > 1" class="ui pagination menu tw-mt-4">
                  <button class="item" :class="{disabled: adminPage <= 1}" @click="changePage(-1)">Previous</button>
                  <div class="item">Page {{ adminPage }} of {{ adminTotalPages }}</div>
                  <button class="item" :class="{disabled: adminPage >= adminTotalPages}" @click="changePage(1)">Next</button>
                </div>
              </template>
            </div>
          </template>

          <!-- Repos -->
          <template v-else-if="section === 'repos'">
            <div class="admin-setting-content">
              <h4 class="ui top attached header">
                Repository Management ({{ adminTotalCount }} total)
              </h4>
              <div v-if="adminLoading" class="ui active centered inline loader tw-my-4"/>
              <div v-else-if="adminError" class="ui negative message"><p>{{ adminError }}</p></div>
              <template v-else>
                <div class="ui attached table segment">
                  <table class="ui very basic table selectable unstackable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Owner</th>
                        <th>Name</th>
                        <th>Stars</th>
                        <th>Forks</th>
                        <th>Issues</th>
                        <th>Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="r in adminItems as Repository[]" :key="r.id">
                        <td>{{ r.id }}</td>
                        <td>
                          <RouterLink :to="`/${r.owner.login}`">{{ r.owner.login }}</RouterLink>
                        </td>
                        <td>
                          <RouterLink :to="`/${r.full_name}`">{{ r.name }}</RouterLink>
                          <span v-if="r.archived" class="ui basic label">Archived</span>
                          <span v-if="r.private" class="ui basic label">Private</span>
                          <span v-if="r.fork" class="ui basic label">Fork</span>
                        </td>
                        <td>{{ r.stars_count }}</td>
                        <td>{{ r.forks_count }}</td>
                        <td>{{ r.open_issues_count }}</td>
                        <td>{{ formatDate(r.updated_at) }}</td>
                      </tr>
                      <tr v-if="!adminItems.length">
                        <td class="tw-text-center" colspan="7">No results found.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="adminTotalPages > 1" class="ui pagination menu tw-mt-4">
                  <button class="item" :class="{disabled: adminPage <= 1}" @click="changePage(-1)">Previous</button>
                  <div class="item">Page {{ adminPage }} of {{ adminTotalPages }}</div>
                  <button class="item" :class="{disabled: adminPage >= adminTotalPages}" @click="changePage(1)">Next</button>
                </div>
              </template>
            </div>
          </template>

          <!-- Orgs -->
          <template v-else-if="section === 'orgs'">
            <div class="admin-setting-content">
              <h4 class="ui top attached header">
                Organization Management ({{ adminTotalCount }} total)
                <div class="ui right">
                  <RouterLink to="/org/create" class="ui primary tiny button">Create Organization</RouterLink>
                </div>
              </h4>
              <div v-if="adminLoading" class="ui active centered inline loader tw-my-4"/>
              <div v-else-if="adminError" class="ui negative message"><p>{{ adminError }}</p></div>
              <template v-else>
                <div class="ui attached table segment">
                  <table class="ui very basic table unstackable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Created</th>
                        <th/>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="o in adminItems as User[]" :key="o.id">
                        <td>{{ o.id }}</td>
                        <td>
                          <img :src="o.avatar_url" :alt="o.login" class="ui avatar image">
                          <RouterLink :to="`/${o.login}`">{{ o.login }}</RouterLink>
                          <span v-if="o.full_name" class="tw-text-secondary"> ({{ o.full_name }})</span>
                        </td>
                        <td>{{ formatDate(o.created) }}</td>
                        <td>
                          <RouterLink :to="`/${o.login}/settings`">Edit</RouterLink>
                        </td>
                      </tr>
                      <tr v-if="!adminItems.length">
                        <td class="tw-text-center" colspan="4">No results found.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="adminTotalPages > 1" class="ui pagination menu tw-mt-4">
                  <button class="item" :class="{disabled: adminPage <= 1}" @click="changePage(-1)">Previous</button>
                  <div class="item">Page {{ adminPage }} of {{ adminTotalPages }}</div>
                  <button class="item" :class="{disabled: adminPage >= adminTotalPages}" @click="changePage(1)">Next</button>
                </div>
              </template>
            </div>
          </template>

          <!-- Fallback for unimplemented sections -->
          <template v-else>
            <div class="admin-setting-content">
              <div class="ui segment">
                <p>
                  The <strong>{{ section }}{{ subsection ? `/${subsection}` : '' }}</strong> admin section is not yet fully implemented
                  in the standalone SPA. Use the Gitea API at
                  <a :href="`${appSubUrl}/api/v1`" target="_blank" rel="noopener">{{ appSubUrl }}/api/v1</a>
                  for programmatic access.
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {appSubUrl, apiBase} from '../spaconfig.ts';
import {listAdminUsers, listAdminOrgs, listAdminRepos, getStoredToken, type User, type Repository} from '../api/index.ts';

const route = useRoute();

const section = computed(() => (route.params.section as string | undefined) ?? '');
const subsection = computed(() => (route.params.subsection as string | undefined) ?? '');

function isInSection(s: string): boolean {
  return section.value === s;
}

const adminLoading = ref(false);
const adminError = ref('');
const adminItems = ref<User[] | Repository[]>([]);
const adminPage = ref(1);
const adminTotalCount = ref(0);
const adminPageSize = 20;
const adminTotalPages = computed(() => Math.max(1, Math.ceil(adminTotalCount.value / adminPageSize)));

const statsLoading = ref(false);
const statsError = ref('');
const systemStats = ref<Record<string, number>>({});

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString();
}

async function loadStats() {
  statsLoading.value = true;
  statsError.value = '';
  try {
    const token = getStoredToken();
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `token ${token}`;
    const resp = await fetch(`${apiBase}/admin/stats`, {headers});
    if (!resp.ok) throw new Error(`Failed to load stats: ${resp.status}`);
    systemStats.value = await resp.json() as Record<string, number>;
  } catch (e) {
    statsError.value = String(e);
  } finally {
    statsLoading.value = false;
  }
}

async function loadSection() {
  const sec = section.value;
  const sub = subsection.value;

  if (!sec || (sec === 'monitor' && sub === 'stats')) {
    await loadStats();
  }

  if (!sec || sec === 'config' || sec === 'monitor' || sec === 'actions' || sec === 'notices' || sec === 'self_check' || sec === 'auths' || sec === 'emails' || sec === 'packages' || sec === 'hooks' || sec === 'applications') {
    return;
  }

  adminLoading.value = true;
  adminError.value = '';
  try {
    if (sec === 'users') {
      const result = await listAdminUsers({page: adminPage.value, limit: adminPageSize});
      adminItems.value = result.data;
      adminTotalCount.value = result.totalCount;
    } else if (sec === 'orgs') {
      const result = await listAdminOrgs({page: adminPage.value, limit: adminPageSize});
      adminItems.value = result.data;
      adminTotalCount.value = result.totalCount;
    } else if (sec === 'repos') {
      const result = await listAdminRepos({page: adminPage.value, limit: adminPageSize});
      adminItems.value = result.data;
      adminTotalCount.value = result.totalCount;
    }
  } catch (e) {
    const msg = String(e);
    adminError.value = msg.includes('403') || msg.includes('401')
      ? 'Access denied. You must be a site administrator to view this section.'
      : msg;
  } finally {
    adminLoading.value = false;
  }
}

function changePage(delta: number) {
  adminPage.value += delta;
  void loadSection();
}

watch([section, subsection], () => {
  adminPage.value = 1;
  void loadSection();
});

onMounted(() => { void loadSection(); });
</script>
