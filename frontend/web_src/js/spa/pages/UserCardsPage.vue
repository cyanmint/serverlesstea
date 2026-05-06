<template>
  <AppLayout :page-class="`repository ${cardType}`">
    <div v-if="repoLoading" class="ui container tw-py-8">
      <div class="ui active centered inline loader"/>
    </div>
    <div v-else-if="repoError" class="ui container tw-py-6">
      <div class="ui negative message"><p>{{ repoError }}</p></div>
    </div>
    <template v-else-if="repo">
      <RepoNav
        :owner="owner"
        :repo-name="repoName"
        active-tab=""
        :repo="repo"
        :current-user="currentUser"
        :starred="starred"
        :star-loading="starLoading"
        @toggle-star="toggleStar"
      />

      <div role="main" class="page-content repository forks">
        <div class="ui container">

          <!-- Forks: show repository list matching templates/repo/forks.tmpl -->
          <template v-if="cardType === 'forks'">
            <h2 class="ui dividing header">Forks</h2>
            <div v-if="loading" class="ui active centered inline loader tw-my-8"/>
            <div v-else-if="error" class="ui negative message"><p>{{ error }}</p></div>
            <template v-else>
              <div class="flex-divided-list items-with-main">
                <div v-for="fork in forks" :key="fork.id" class="item">
                  <div class="item-leading">
                    <img :src="fork.owner.avatar_url" :alt="fork.owner.login" class="ui avatar image" width="24" height="24">
                  </div>
                  <div class="item-main">
                    <div class="item-header">
                      <div class="item-title">
                        <RouterLink class="tw-text-primary name" :to="`/${fork.owner.login}`">{{ fork.owner.login }}</RouterLink>/<RouterLink class="tw-text-primary name" :to="`/${fork.full_name}`">{{ fork.name }}</RouterLink>
                        <span class="label-list">
                          <span v-if="fork.archived" class="ui basic label">Archived</span>
                          <span v-if="fork.private" class="ui basic label">Private</span>
                        </span>
                      </div>
                      <div class="item-trailing muted-links">
                        <RouterLink class="flex-text-inline" :to="`/${fork.full_name}/stargazers`">
                          <SvgIcon name="octicon-star" :size="16"/>
                          {{ fork.stars_count }}
                        </RouterLink>
                        <RouterLink class="flex-text-inline" :to="`/${fork.full_name}/forks`">
                          <SvgIcon name="octicon-git-branch" :size="16"/>
                          {{ fork.forks_count }}
                        </RouterLink>
                      </div>
                    </div>
                    <p v-if="fork.description" class="tw-my-1 tw-text-sm">{{ fork.description }}</p>
                  </div>
                </div>
              </div>
              <div v-if="!forks.length" class="empty-placeholder">
                <p class="tw-text-center tw-py-6">No forks yet.</p>
              </div>
              <div v-if="totalPages > 1" class="ui pagination menu tw-mt-4">
                <button class="item" :class="{disabled: page <= 1}" @click="changePage(-1)">Previous</button>
                <div class="item">Page {{ page }} of {{ totalPages }}</div>
                <button class="item" :class="{disabled: page >= totalPages}" @click="changePage(1)">Next</button>
              </div>
            </template>
          </template>

          <!-- Stargazers / Watchers: show user cards matching templates/repo/user_cards.tmpl -->
          <template v-else>
            <div class="user-cards" id="user-cards-container">
              <h2 v-if="cardType === 'stargazers'" class="ui dividing header">Stargazers</h2>
              <h2 v-else class="ui dividing header">Watchers</h2>
              <div v-if="loading" class="ui active centered inline loader tw-my-8"/>
              <div v-else-if="error" class="ui negative message"><p>{{ error }}</p></div>
              <template v-else>
                <ul class="list">
                  <li v-for="user in users" :key="user.login" class="item ui segment">
                    <RouterLink :to="`/${user.login}`">
                      <img :src="user.avatar_url" :alt="user.login" class="ui avatar image" width="48" height="48">
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
                  <p class="tw-text-center tw-py-6">No {{ cardType }} yet.</p>
                </div>
                <div v-if="totalPages > 1" class="ui pagination menu tw-mt-4">
                  <button class="item" :class="{disabled: page <= 1}" @click="changePage(-1)">Previous</button>
                  <div class="item">Page {{ page }} of {{ totalPages }}</div>
                  <button class="item" :class="{disabled: page >= totalPages}" @click="changePage(1)">Next</button>
                </div>
              </template>
            </div>
          </template>

        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoNav from '../components/RepoNav.vue';
import {SvgIcon} from '../../svg.ts';
import {getRepo, getCurrentUser, isRepoStarred, starRepo, unstarRepo, getStoredToken, type Repository, type User} from '../api/index.ts';
import {apiBase} from '../spaconfig.ts';

const route = useRoute();
const owner = computed(() => route.params['owner'] as string);
const repoName = computed(() => route.params['repo'] as string);

const cardType = computed(() => {
  const p = route.path;
  if (p.endsWith('/forks')) return 'forks';
  if (p.endsWith('/watchers') || p.endsWith('/subscribers')) return 'watchers';
  return 'stargazers';
});

const repo = ref<Repository | null>(null);
const repoLoading = ref(true);
const repoError = ref('');
const currentUser = ref<User | null>(null);
const starred = ref(false);
const starLoading = ref(false);
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

async function toggleStar() {
  if (!currentUser.value || starLoading.value) return;
  starLoading.value = true;
  try {
    if (starred.value) {
      await unstarRepo(owner.value, repoName.value);
      starred.value = false;
    } else {
      await starRepo(owner.value, repoName.value);
      starred.value = true;
    }
  } finally {
    starLoading.value = false;
  }
}

onMounted(async () => {
  [repo.value, currentUser.value] = await Promise.all([
    getRepo(owner.value, repoName.value).catch((e) => { repoError.value = String(e); return null; }),
    getCurrentUser(),
  ]);
  repoLoading.value = false;
  if (currentUser.value) {
    isRepoStarred(owner.value, repoName.value).then((s) => { starred.value = s; }).catch(() => {});
  }
  if (repo.value) await loadData();
});

async function loadData() {
  loading.value = true;
  error.value = '';
  try {
    const params = new URLSearchParams({page: String(page.value), limit: String(limit)});
    const base = `${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}`;

    if (cardType.value === 'forks') {
      const resp = await fetch(`${base}/forks?${params}`, {headers: authHeaders()});
      if (!resp.ok) throw new Error(`Failed to load forks: ${resp.status}`);
      forks.value = await resp.json() as Repository[];
      const total = parseInt(resp.headers.get('X-Total-Count') ?? String(forks.value.length), 10);
      totalPages.value = Math.max(1, Math.ceil(total / limit));
    } else if (cardType.value === 'stargazers') {
      const resp = await fetch(`${base}/stargazers?${params}`, {headers: authHeaders()});
      if (!resp.ok) throw new Error(`Failed to load stargazers: ${resp.status}`);
      users.value = await resp.json() as User[];
      const total = parseInt(resp.headers.get('X-Total-Count') ?? String(users.value.length), 10);
      totalPages.value = Math.max(1, Math.ceil(total / limit));
    } else {
      const resp = await fetch(`${base}/subscribers?${params}`, {headers: authHeaders()});
      if (!resp.ok) throw new Error(`Failed to load watchers: ${resp.status}`);
      users.value = await resp.json() as User[];
      const total = parseInt(resp.headers.get('X-Total-Count') ?? String(users.value.length), 10);
      totalPages.value = Math.max(1, Math.ceil(total / limit));
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
