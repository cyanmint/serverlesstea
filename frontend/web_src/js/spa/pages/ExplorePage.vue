<template>
  <AppLayout>
    <div class="ui container tw-py-6">
      <!-- Tab navigation -->
      <div class="ui tabular menu tw-mb-6">
        <RouterLink to="/explore/repos" class="item" :class="{active: activeTab === 'repos'}">
          Repositories
        </RouterLink>
        <RouterLink to="/explore/users" class="item" :class="{active: activeTab === 'users'}">
          Users
        </RouterLink>
        <RouterLink to="/explore/organizations" class="item" :class="{active: activeTab === 'orgs'}">
          Organizations
        </RouterLink>
      </div>

      <!-- Search bar -->
      <div class="ui icon input fluid tw-mb-4">
        <input
          v-model="query"
          type="search"
          :placeholder="searchPlaceholder"
          @input="onQueryInput"
        >
        <i class="search icon"/>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="ui active centered inline loader"/>

      <!-- Error state -->
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>

      <!-- Repos tab -->
      <div v-else-if="activeTab === 'repos'">
        <p v-if="repos.length === 0" class="tw-text-gray-500">No repositories found.</p>
        <div v-else class="ui list">
          <div v-for="repo in repos" :key="repo.id" class="item tw-py-4 tw-border-b last:tw-border-0">
            <div class="tw-flex tw-items-start tw-justify-between">
              <div>
                <a :href="repo.html_url" class="tw-font-semibold tw-text-blue-600 hover:tw-underline">
                  {{ repo.full_name }}
                </a>
                <p v-if="repo.description" class="tw-text-gray-600 tw-text-sm tw-mt-1">{{ repo.description }}</p>
                <div class="tw-flex tw-items-center tw-gap-4 tw-mt-2 tw-text-xs tw-text-gray-500">
                  <span v-if="repo.language">{{ repo.language }}</span>
                  <span>⭐ {{ repo.stars_count }}</span>
                  <span>🍴 {{ repo.forks_count }}</span>
                </div>
              </div>
              <div class="tw-flex tw-gap-1 tw-flex-shrink-0">
                <span v-if="repo.private" class="ui mini label">Private</span>
                <span v-if="repo.archived" class="ui mini label">Archived</span>
                <span v-if="repo.fork" class="ui mini label">Fork</span>
                <span v-if="repo.mirror" class="ui mini label">Mirror</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="ui pagination menu tw-mt-4">
          <button
            class="item"
            :class="{disabled: page <= 1}"
            @click="changePage(page - 1)"
          >
            Previous
          </button>
          <div class="item">Page {{ page }} of {{ totalPages }}</div>
          <button
            class="item"
            :class="{disabled: page >= totalPages}"
            @click="changePage(page + 1)"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Users tab -->
      <div v-else-if="activeTab === 'users'">
        <p v-if="users.length === 0" class="tw-text-gray-500">No users found.</p>
        <div v-else class="ui list">
          <div v-for="user in users" :key="user.id" class="item tw-py-3 tw-flex tw-items-center tw-gap-3 tw-border-b last:tw-border-0">
            <img :src="user.avatar_url" :alt="user.login" class="ui avatar image tw-w-10 tw-h-10">
            <div>
              <a :href="user.html_url" class="tw-font-semibold tw-text-blue-600 hover:tw-underline">
                {{ user.login }}
              </a>
              <p v-if="user.full_name" class="tw-text-gray-600 tw-text-sm">{{ user.full_name }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Organizations tab -->
      <div v-else-if="activeTab === 'orgs'">
        <p v-if="orgs.length === 0" class="tw-text-gray-500">No organizations found.</p>
        <div v-else class="ui list">
          <div v-for="org in orgs" :key="org.id" class="item tw-py-3 tw-flex tw-items-center tw-gap-3 tw-border-b last:tw-border-0">
            <img :src="org.avatar_url" :alt="org.login" class="ui avatar image tw-w-10 tw-h-10">
            <div>
              <RouterLink :to="`/${org.login}`" class="tw-font-semibold tw-text-blue-600 hover:tw-underline">
                {{ org.login }}
              </RouterLink>
              <p v-if="org.full_name" class="tw-text-gray-600 tw-text-sm">{{ org.full_name }}</p>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="ui pagination menu tw-mt-4">
          <button
            class="item"
            :class="{disabled: page <= 1}"
            @click="changePage(page - 1)"
          >
            Previous
          </button>
          <div class="item">Page {{ page }} of {{ totalPages }}</div>
          <button
            class="item"
            :class="{disabled: page >= totalPages}"
            @click="changePage(page + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {searchRepos, searchUsers, listOrgs, type Repository, type User} from '../api/index.ts';

const route = useRoute();

const activeTab = computed(() => String(route.meta.tab ?? 'repos'));
const searchPlaceholder = computed(() => {
  if (activeTab.value === 'users') return 'Search users…';
  if (activeTab.value === 'orgs') return 'Search organizations…';
  return 'Search repositories…';
});

const query = ref('');
const loading = ref(false);
const error = ref('');
const repos = ref<Repository[]>([]);
const users = ref<User[]>([]);
const orgs = ref<User[]>([]);
const page = ref(1);
const totalPages = ref(1);
const pageSize = 20;

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function onQueryInput() {
  page.value = 1;
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => loadData(), 300);
}

function changePage(newPage: number) {
  page.value = newPage;
  loadData();
}

async function loadData() {
  loading.value = true;
  error.value = '';
  try {
    if (activeTab.value === 'repos') {
      const result = await searchRepos(query.value, {page: page.value, limit: pageSize});
      repos.value = result.data ?? [];
      totalPages.value = Math.max(1, Math.ceil(result.totalCount / pageSize));
    } else if (activeTab.value === 'users') {
      const result = await searchUsers(query.value, {page: page.value, limit: pageSize});
      users.value = result.data ?? [];
      totalPages.value = Math.max(1, Math.ceil(result.totalCount / pageSize));
    } else if (activeTab.value === 'orgs') {
      const result = await listOrgs({page: page.value, limit: pageSize, query: query.value || undefined});
      orgs.value = result.data ?? [];
      totalPages.value = Math.max(1, Math.ceil(result.totalCount / pageSize));
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred';
  } finally {
    loading.value = false;
  }
}

watch(() => activeTab.value, () => {
  query.value = '';
  page.value = 1;
  loadData();
});

onMounted(() => loadData());
</script>
