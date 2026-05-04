<template>
  <AppLayout>
    <div class="ui container tw-py-8">
      <h1 class="ui header">
        <i class="settings icon"/>
        <div class="content">
          Site Administration
          <div class="sub header">{{ sectionTitle }}</div>
        </div>
      </h1>

      <div class="ui four stackable cards tw-mb-6">
        <RouterLink to="/-/admin/users" class="ui card">
          <div class="content">
            <div class="header"><i class="users icon"/> Users</div>
            <div class="description">Manage user accounts</div>
          </div>
        </RouterLink>
        <RouterLink to="/-/admin/repos" class="ui card">
          <div class="content">
            <div class="header"><i class="book icon"/> Repositories</div>
            <div class="description">Manage repositories</div>
          </div>
        </RouterLink>
        <RouterLink to="/-/admin/orgs" class="ui card">
          <div class="content">
            <div class="header"><i class="building icon"/> Organizations</div>
            <div class="description">Manage organizations</div>
          </div>
        </RouterLink>
        <RouterLink to="/-/admin/config" class="ui card">
          <div class="content">
            <div class="header"><i class="cog icon"/> Configuration</div>
            <div class="description">Site settings</div>
          </div>
        </RouterLink>
      </div>

      <!-- Users section -->
      <div v-if="subPath === 'users'" class="ui segment">
        <div v-if="adminLoading" class="ui active centered inline loader"/>
        <div v-else-if="adminError" class="ui negative message"><p>{{ adminError }}</p></div>
        <div v-else>
          <h2 class="tw-text-lg tw-font-bold tw-mb-3">Users ({{ adminTotalCount }})</h2>
          <table class="ui celled table">
            <thead>
              <tr><th>Username</th><th>Email</th><th>Admin</th><th>Joined</th></tr>
            </thead>
            <tbody>
              <tr v-for="u in adminItems as User[]" :key="u.id">
                <td>
                  <RouterLink :to="`/${u.login}`" class="tw-text-blue-600 hover:tw-underline">
                    <img :src="u.avatar_url" :alt="u.login" class="ui mini circular image tw-inline-block tw-mr-2">
                    {{ u.login }}
                  </RouterLink>
                </td>
                <td>{{ u.email }}</td>
                <td>{{ u.is_admin ? '✓' : '' }}</td>
                <td>{{ formatDate(u.created) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-if="adminTotalPages > 1" class="ui pagination menu tw-mt-4">
            <button class="item" :class="{disabled: adminPage <= 1}" @click="changePage(-1)">Previous</button>
            <div class="item">Page {{ adminPage }} of {{ adminTotalPages }}</div>
            <button class="item" :class="{disabled: adminPage >= adminTotalPages}" @click="changePage(1)">Next</button>
          </div>
        </div>
      </div>

      <!-- Repos section -->
      <div v-else-if="subPath === 'repos'" class="ui segment">
        <div v-if="adminLoading" class="ui active centered inline loader"/>
        <div v-else-if="adminError" class="ui negative message"><p>{{ adminError }}</p></div>
        <div v-else>
          <h2 class="tw-text-lg tw-font-bold tw-mb-3">Repositories ({{ adminTotalCount }})</h2>
          <div class="ui list">
            <div v-for="r in adminItems as Repository[]" :key="r.id" class="item tw-py-2 tw-border-b last:tw-border-0">
              <RouterLink :to="`/${r.full_name}`" class="tw-font-semibold tw-text-blue-600 hover:tw-underline">
                {{ r.full_name }}
              </RouterLink>
              <span v-if="r.private" class="ui mini label tw-ml-2">Private</span>
              <p v-if="r.description" class="tw-text-gray-600 tw-text-sm tw-mt-0.5">{{ r.description }}</p>
            </div>
          </div>
          <div v-if="adminTotalPages > 1" class="ui pagination menu tw-mt-4">
            <button class="item" :class="{disabled: adminPage <= 1}" @click="changePage(-1)">Previous</button>
            <div class="item">Page {{ adminPage }} of {{ adminTotalPages }}</div>
            <button class="item" :class="{disabled: adminPage >= adminTotalPages}" @click="changePage(1)">Next</button>
          </div>
        </div>
      </div>

      <!-- Orgs section -->
      <div v-else-if="subPath === 'orgs'" class="ui segment">
        <div v-if="adminLoading" class="ui active centered inline loader"/>
        <div v-else-if="adminError" class="ui negative message"><p>{{ adminError }}</p></div>
        <div v-else>
          <h2 class="tw-text-lg tw-font-bold tw-mb-3">Organizations ({{ adminTotalCount }})</h2>
          <div class="ui list">
            <div v-for="o in adminItems as User[]" :key="o.id" class="item tw-py-2 tw-flex tw-items-center tw-gap-3 tw-border-b last:tw-border-0">
              <img :src="o.avatar_url" :alt="o.login" class="ui mini circular image">
              <RouterLink :to="`/${o.login}`" class="tw-font-semibold tw-text-blue-600 hover:tw-underline">
                {{ o.login }}
              </RouterLink>
            </div>
          </div>
          <div v-if="adminTotalPages > 1" class="ui pagination menu tw-mt-4">
            <button class="item" :class="{disabled: adminPage <= 1}" @click="changePage(-1)">Previous</button>
            <div class="item">Page {{ adminPage }} of {{ adminTotalPages }}</div>
            <button class="item" :class="{disabled: adminPage >= adminTotalPages}" @click="changePage(1)">Next</button>
          </div>
        </div>
      </div>

      <!-- Other sub-sections placeholder -->
      <div v-else-if="subPath && subPath !== 'users' && subPath !== 'repos' && subPath !== 'orgs'" class="ui segment">
        <p>
          The <strong>{{ subPath }}</strong> admin section is not yet fully implemented
          in the standalone SPA. Use the Gitea API at
          <a :href="`${appSubUrl}/api/v1`" target="_blank" rel="noopener">{{ appSubUrl }}/api/v1</a>
          for programmatic access.
        </p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {appSubUrl} from '../spaconfig.ts';
import {listAdminUsers, listAdminOrgs, listAdminRepos, type User, type Repository} from '../api/index.ts';

const route = useRoute();

const subPath = computed(() => route.path.replace(/^\/-\/admin\/?/, ''));
const sectionTitle = computed(() => {
  if (!subPath.value) return 'Dashboard';
  return subPath.value.split('/').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' › ');
});

const adminLoading = ref(false);
const adminError = ref('');
const adminItems = ref<User[] | Repository[]>([]);
const adminPage = ref(1);
const adminTotalCount = ref(0);
const adminPageSize = 20;
const adminTotalPages = computed(() => Math.max(1, Math.ceil(adminTotalCount.value / adminPageSize)));

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString();
}

async function loadSection() {
  const section = subPath.value;
  if (!section || section === 'config') return;
  adminLoading.value = true;
  adminError.value = '';
  try {
    if (section === 'users') {
      const result = await listAdminUsers({page: adminPage.value, limit: adminPageSize});
      adminItems.value = result.data;
      adminTotalCount.value = result.totalCount;
    } else if (section === 'orgs') {
      const result = await listAdminOrgs({page: adminPage.value, limit: adminPageSize});
      adminItems.value = result.data;
      adminTotalCount.value = result.totalCount;
    } else if (section === 'repos') {
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

watch(subPath, () => {
  adminPage.value = 1;
  void loadSection();
});

onMounted(() => { void loadSection(); });
</script>
