<template>
  <AppLayout>
    <div v-if="repoLoading" class="ui container tw-py-8">
      <div class="ui active centered inline loader"/>
    </div>
    <div v-else-if="repoError" class="ui container tw-py-6">
      <div class="ui negative message"><p>{{ repoError }}</p></div>
    </div>
    <template v-else-if="repo">
      <!-- Repo secondary nav -->
      <div class="secondary-nav">
        <div class="ui container">
          <div class="repo-header flex-left-right">
            <div class="flex-text-block tw-flex-wrap tw-text-18">
              <RouterLink class="muted tw-font-normal" :to="`/${owner}`">{{ owner }}</RouterLink>/<RouterLink class="muted" :to="`/${owner}/${repoName}`">{{ repoName }}</RouterLink>
            </div>
          </div>
        </div>
        <div class="ui container">
          <div class="ui secondary pointing menu">
            <RouterLink :to="`/${owner}/${repoName}`" class="item">Code</RouterLink>
            <RouterLink :to="`/${owner}/${repoName}/issues`" class="item">Issues</RouterLink>
            <RouterLink :to="`/${owner}/${repoName}/pulls`" class="item">Pull Requests</RouterLink>
          </div>
        </div>
        <div class="ui tabs divider"/>
      </div>

      <!-- Page content -->
      <div role="main" class="page-content repository forks">
        <div class="ui container">
          <h2 class="ui dividing header">{{ pageTitle }}</h2>

          <div v-if="loading" class="ui active centered inline loader tw-my-8"/>
          <div v-else-if="error" class="ui negative message"><p>{{ error }}</p></div>
          <div v-else>
            <!-- User cards -->
            <div class="user-cards" id="user-cards-container">
              <ul class="list">
                <li v-for="user in users" :key="user.login" class="item ui segment">
                  <RouterLink :to="`/${user.login}`">
                    <img :src="user.avatar_url" :alt="user.login" class="ui avatar image" style="width:48px;height:48px">
                  </RouterLink>
                  <h3 class="name">
                    <RouterLink :to="`/${user.login}`">{{ user.full_name || user.login }}</RouterLink>
                  </h3>
                  <div class="meta">
                    <span class="muted">@{{ user.login }}</span>
                  </div>
                </li>
              </ul>
              <div v-if="!users.length" class="empty-placeholder">
                <p>No {{ cardType }} yet.</p>
              </div>
              <div v-if="totalPages > 1" class="ui pagination menu tw-mt-4">
                <button class="item" :class="{disabled: page <= 1}" @click="changePage(-1)">Previous</button>
                <div class="item">Page {{ page }} of {{ totalPages }}</div>
                <button class="item" :class="{disabled: page >= totalPages}" @click="changePage(1)">Next</button>
              </div>
            </div>

            <!-- Forks: also show repos -->
            <div v-if="cardType === 'forks' && forks.length" class="tw-mt-6">
              <h3 class="ui dividing header">Fork Repositories</h3>
              <div v-for="fork in forks" :key="fork.id" class="item tw-py-2 tw-border-b last:tw-border-0">
                <RouterLink :to="`/${fork.full_name}`" class="tw-font-semibold">{{ fork.full_name }}</RouterLink>
                <p v-if="fork.description" class="tw-text-sm tw-text-gray-600 tw-mt-0.5">{{ fork.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getRepo, type Repository, type User} from '../api/index.ts';
import {apiBase} from '../spaconfig.ts';
import {getStoredToken} from '../api/index.ts';

const route = useRoute();
const owner = computed(() => route.params['owner'] as string);
const repoName = computed(() => route.params['repo'] as string);

const cardType = computed(() => {
  const p = route.path;
  if (p.endsWith('/forks')) return 'forks';
  if (p.endsWith('/watchers')) return 'watchers';
  return 'stargazers';
});

const pageTitle = computed(() => {
  if (cardType.value === 'forks') return 'Forks';
  if (cardType.value === 'watchers') return 'Watchers';
  return 'Stargazers';
});

const repo = ref<Repository | null>(null);
const repoLoading = ref(true);
const repoError = ref('');
const users = ref<User[]>([]);
const forks = ref<Repository[]>([]);
const loading = ref(true);
const error = ref('');
const page = ref(1);
const totalPages = ref(1);
const limit = 30;

function authHeaders(): Record<string, string> {
  const token = getStoredToken();
  return token ? {Authorization: `token ${token}`} : {};
}

onMounted(async () => {
  repo.value = await getRepo(owner.value, repoName.value).catch((e) => {
    repoError.value = String(e);
    return null;
  });
  repoLoading.value = false;
  if (repo.value) await loadData();
});

async function loadData() {
  loading.value = true;
  error.value = '';
  try {
    const params = new URLSearchParams({page: String(page.value), limit: String(limit)});
    let endpoint = '';
    if (cardType.value === 'forks') {
      endpoint = `${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}/forks?${params}`;
      const resp = await fetch(endpoint, {headers: authHeaders()});
      if (!resp.ok) throw new Error(`Failed to load forks: ${resp.status}`);
      const data = await resp.json() as Repository[];
      forks.value = data;
      users.value = data.map((r) => r.owner);
      const total = parseInt(resp.headers.get('X-Total-Count') ?? String(data.length), 10);
      totalPages.value = Math.ceil(total / limit);
    } else if (cardType.value === 'stargazers') {
      endpoint = `${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}/stargazers?${params}`;
      const resp = await fetch(endpoint, {headers: authHeaders()});
      if (!resp.ok) throw new Error(`Failed to load stargazers: ${resp.status}`);
      users.value = await resp.json() as User[];
      const total = parseInt(resp.headers.get('X-Total-Count') ?? String(users.value.length), 10);
      totalPages.value = Math.ceil(total / limit);
    } else {
      endpoint = `${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}/subscribers?${params}`;
      const resp = await fetch(endpoint, {headers: authHeaders()});
      if (!resp.ok) throw new Error(`Failed to load watchers: ${resp.status}`);
      users.value = await resp.json() as User[];
      const total = parseInt(resp.headers.get('X-Total-Count') ?? String(users.value.length), 10);
      totalPages.value = Math.ceil(total / limit);
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load';
  } finally {
    loading.value = false;
  }
}

async function changePage(delta: number) {
  page.value += delta;
  await loadData();
}
</script>
