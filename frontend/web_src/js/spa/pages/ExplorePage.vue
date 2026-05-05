<template>
  <AppLayout :page-class="`explore ${activeTab === 'repos' ? 'repositories' : activeTab === 'users' ? 'users' : 'organizations'}`">
    <!-- Explore top nav — matches templates/explore/navbar.tmpl -->
    <div class="ui secondary pointing tabular top attached borderless menu secondary-nav">
      <div class="overflow-menu-items tw-justify-center">
        <RouterLink to="/explore/repos" class="item" :class="{active: activeTab === 'repos'}">
          <SvgIcon name="octicon-repo" :size="16"/> Repositories
        </RouterLink>
        <RouterLink to="/explore/users" class="item" :class="{active: activeTab === 'users'}">
          <SvgIcon name="octicon-person" :size="16"/> Users
        </RouterLink>
        <RouterLink to="/explore/organizations" class="item" :class="{active: activeTab === 'orgs'}">
          <SvgIcon name="octicon-organization" :size="16"/> Organizations
        </RouterLink>
      </div>
    </div>

    <div class="ui container">
      <!-- Search bar — matches templates/shared/repo/search.tmpl -->
      <div class="ui small secondary filter menu">
        <div class="ui small fluid action input tw-flex-1">
          <input
            v-model="query"
            type="search"
            :placeholder="searchPlaceholder"
            class="tw-flex-1"
            @input="onQueryInput"
            @keydown.enter="loadData"
          >
          <button class="ui icon button" @click="loadData">
            <SvgIcon name="octicon-search" :size="16"/>
          </button>
        </div>
        <!-- Sort dropdown -->
        <div class="item ui small dropdown jump" :class="{active: sortMenuOpen}" ref="sortDropdownEl" @click.stop="toggleSortMenu">
          <span class="text">Sort: {{ sortLabel }}</span>
          <SvgIcon name="octicon-triangle-down" :size="14" class="dropdown icon"/>
          <div class="menu left" :class="{visible: sortMenuOpen}" v-show="sortMenuOpen">
            <a class="item" :class="{active: sort === 'newest'}" @click="setSort('newest')">Newest</a>
            <a class="item" :class="{active: sort === 'oldest'}" @click="setSort('oldest')">Oldest</a>
            <a class="item" :class="{active: sort === 'recentupdate'}" @click="setSort('recentupdate')">Recently Updated</a>
            <a class="item" :class="{active: sort === 'moststars'}" @click="setSort('moststars')">Most Stars</a>
            <a class="item" :class="{active: sort === 'mostforks'}" @click="setSort('mostforks')">Most Forks</a>
          </div>
        </div>
      </div>
      <div class="divider"/>

      <!-- Loading / error states -->
      <div v-if="loading" class="tw-py-8 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>

      <!-- Repositories list — matches templates/shared/repo/list.tmpl -->
      <template v-else-if="activeTab === 'repos'">
        <div v-if="repos.length === 0" class="flex-divided-list items-with-main">
          <div>No results found.</div>
        </div>
        <div v-else class="flex-divided-list items-with-main">
          <div v-for="repo in repos" :key="repo.id" class="item">
            <div class="item-main">
              <div class="item-header">
                <div class="item-title">
                  <RouterLink class="tw-text-primary name" :to="`/${repo.full_name}`">{{ repo.full_name }}</RouterLink>
                  <span class="label-list">
                    <span v-if="repo.archived" class="ui basic label">Archived</span>
                    <span v-if="repo.private" class="ui basic label">Private</span>
                    <span v-if="repo.fork" class="ui basic label">Fork</span>
                    <span v-if="repo.mirror" class="ui basic label">Mirror</span>
                  </span>
                </div>
                <div class="item-trailing muted-links">
                  <span v-if="repo.language" class="flex-text-inline">
                    <i class="color-icon tw-mr-2"/>
                    {{ repo.language }}
                  </span>
                  <RouterLink class="flex-text-inline" :to="`/${repo.full_name}/stars`">
                    <span class="tw-contents" aria-label="Stars"><SvgIcon name="octicon-star" :size="16"/></span>
                    <span>{{ repo.stars_count }}</span>
                  </RouterLink>
                  <RouterLink class="flex-text-inline" :to="`/${repo.full_name}/forks`">
                    <span class="tw-contents" aria-label="Forks"><SvgIcon name="octicon-git-branch" :size="16"/></span>
                    <span>{{ repo.forks_count }}</span>
                  </RouterLink>
                </div>
              </div>
              <div v-if="repo.description" class="item-body">{{ repo.description }}</div>
            </div>
          </div>
        </div>
      </template>

      <!-- Users list -->
      <template v-else-if="activeTab === 'users'">
        <div v-if="users.length === 0" class="flex-divided-list items-with-main">
          <div>No users found.</div>
        </div>
        <div v-else class="flex-divided-list items-with-main">
          <div v-for="user in users" :key="user.id" class="item">
            <div class="item-leading">
              <img :src="user.avatar_url" :alt="user.login" class="ui avatar image" width="24" height="24">
            </div>
            <div class="item-main">
              <div class="item-header">
                <div class="item-title">
                  <RouterLink class="tw-text-primary name" :to="`/${user.login}`">{{ user.login }}</RouterLink>
                </div>
              </div>
              <div v-if="user.full_name" class="item-body">{{ user.full_name }}</div>
            </div>
          </div>
        </div>
      </template>

      <!-- Organizations list -->
      <template v-else-if="activeTab === 'orgs'">
        <div v-if="orgs.length === 0" class="flex-divided-list items-with-main">
          <div>No organizations found.</div>
        </div>
        <div v-else class="flex-divided-list items-with-main">
          <div v-for="org in orgs" :key="org.id" class="item">
            <div class="item-leading">
              <img :src="org.avatar_url" :alt="org.login" class="ui avatar image" width="24" height="24">
            </div>
            <div class="item-main">
              <div class="item-header">
                <div class="item-title">
                  <RouterLink class="tw-text-primary name" :to="`/${org.login}`">{{ org.login }}</RouterLink>
                </div>
              </div>
              <div v-if="org.full_name" class="item-body">{{ org.full_name }}</div>
            </div>
          </div>
        </div>
      </template>

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
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted, onUnmounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {SvgIcon} from '../../svg.ts';
import {searchRepos, searchUsers, listOrgs, type Repository, type User} from '../api/index.ts';

const route = useRoute();

const activeTab = computed(() => String(route.meta.tab ?? 'repos'));
const searchPlaceholder = computed(() => {
  if (activeTab.value === 'users') return 'Search users…';
  if (activeTab.value === 'orgs') return 'Search organizations…';
  return 'Search repositories…';
});

const query = ref('');
const sort = ref('newest');
const sortMenuOpen = ref(false);
const sortDropdownEl = ref<HTMLElement | null>(null);
const loading = ref(false);
const error = ref('');
const repos = ref<Repository[]>([]);
const users = ref<User[]>([]);
const orgs = ref<User[]>([]);
const page = ref(1);
const totalPages = ref(1);
const pageSize = 20;

const sortLabel = computed(() => {
  const labels: Record<string, string> = {newest: 'Newest', oldest: 'Oldest', recentupdate: 'Recently Updated', moststars: 'Most Stars', mostforks: 'Most Forks'};
  return labels[sort.value] ?? 'Newest';
});

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

function toggleSortMenu() {
  sortMenuOpen.value = !sortMenuOpen.value;
}

function setSort(newSort: string) {
  sort.value = newSort;
  sortMenuOpen.value = false;
  page.value = 1;
  loadData();
}

function onDocClick(e: MouseEvent) {
  const target = e.target as Node;
  if (sortDropdownEl.value && !sortDropdownEl.value.contains(target)) sortMenuOpen.value = false;
}

async function loadData() {
  loading.value = true;
  error.value = '';
  try {
    if (activeTab.value === 'repos') {
      const result = await searchRepos(query.value, {page: page.value, limit: pageSize, sort: sort.value});
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

onMounted(() => {
  loadData();
  document.addEventListener('click', onDocClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocClick);
  if (debounceTimer) clearTimeout(debounceTimer);
});
</script>
