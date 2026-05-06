<template>
  <AppLayout page-class="repository issue-list">
    <RepoNav
      :owner="owner"
      :repo-name="repoName"
      active-tab="issues"
      :repo="repo"
      :current-user="currentUser"
      :starred="starred"
      :star-loading="starLoading"
      @toggle-star="toggleStar"
    />

    <div class="ui container">
      <!-- Issue list header -->
      <div class="list-header flex-text-block">
        <!-- Open/Closed state filter -->
        <h2 class="ui compact small menu small-menu-items issue-list-navbar">
          <a class="item" :class="{active: state === 'open'}" @click="setStateFilter('open')">
            <SvgIcon name="octicon-issue-opened" :size="16"/>
            Open
            <span class="ui label tw-ml-1">{{ openCount }}</span>
          </a>
          <a class="item" :class="{active: state === 'closed'}" @click="setStateFilter('closed')">
            <SvgIcon name="octicon-issue-closed" :size="16"/>
            Closed
            <span class="ui label tw-ml-1">{{ closedCount }}</span>
          </a>
        </h2>
        <RouterLink v-if="currentUser" :to="`/${owner}/${repoName}/issues/new`" class="ui compact small primary button">
          New Issue
        </RouterLink>
      </div>

      <!-- Loading / error states -->
      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>

      <!-- Issue list — matches templates/shared/issuelist.tmpl -->
      <div v-else>
        <div v-if="issues.length === 0" class="tw-px-4 tw-py-12 tw-text-center">
          No {{ state }} issues found.
        </div>
        <div v-else class="flex-divided-list items-with-main">
          <div v-for="issue in issues" :key="issue.id" class="item">
            <div class="item-leading">
              <span v-if="issue.state === 'open'" class="tw-text-green-600">
                <SvgIcon name="octicon-issue-opened" :size="16"/>
              </span>
              <span v-else class="tw-text-purple-600">
                <SvgIcon name="octicon-issue-closed" :size="16"/>
              </span>
            </div>
            <div class="item-main">
              <div class="item-header">
                <div class="item-title">
                  <RouterLink
                    :to="`/${owner}/${repoName}/issues/${issue.number}`"
                    class="tw-text-primary"
                  >
                    {{ issue.title }}
                  </RouterLink>
                  <span class="label-list">
                    <span
                      v-for="label in issue.labels"
                      :key="label.id"
                      class="ui label"
                      :style="{background: '#' + label.color, color: labelTextColor(label.color)}"
                    >
                      {{ label.name }}
                    </span>
                  </span>
                </div>
                <div v-if="issue.comments" class="item-trailing muted-links">
                  <RouterLink class="flex-text-inline" :to="`/${owner}/${repoName}/issues/${issue.number}`">
                    <SvgIcon name="octicon-comment" :size="16"/>
                    {{ issue.comments }}
                  </RouterLink>
                </div>
              </div>
              <div class="item-body">
                #{{ issue.number }} opened {{ timeAgo(issue.created_at) }} by
                <RouterLink :to="`/${issue.user.login}`">{{ issue.user.login }}</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="ui pagination menu tw-mt-4">
        <button class="item" :class="{disabled: page <= 1}" @click="goToPage(page - 1)">Previous</button>
        <button
          v-for="p in totalPages"
          :key="p"
          class="item"
          :class="{active: p === page}"
          @click="goToPage(p)"
        >
          {{ p }}
        </button>
        <button class="item" :class="{disabled: page >= totalPages}" @click="goToPage(page + 1)">Next</button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoNav from '../components/RepoNav.vue';
import {SvgIcon} from '../../svg.ts';
import {getRepo, getRepoIssues, getRepoIssueCount, getCurrentUser, isRepoStarred, starRepo, unstarRepo, type Issue, type User, type Repository} from '../api/index.ts';

const route = useRoute();
const owner = String(route.params['owner']);
const repoName = String(route.params['repo']);

const loading = ref(true);
const error = ref('');
const issues = ref<Issue[]>([]);
const state = ref<'open' | 'closed'>('open');
const page = ref(1);
const pageSize = 20;
const totalPages = ref(1);
const openCount = ref(0);
const closedCount = ref(0);
const currentUser = ref<User | null>(null);
const repo = ref<Repository | null>(null);
const starred = ref(false);
const starLoading = ref(false);

const labelTextColor = computed(() => (hex: string) => {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.5 ? '#000' : '#fff';
});

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

function setStateFilter(newState: 'open' | 'closed') {
  state.value = newState;
  page.value = 1;
  loadIssues();
}

function goToPage(p: number) {
  page.value = p;
  loadIssues();
}

async function loadIssues() {
  loading.value = true;
  error.value = '';
  try {
    const [result, total] = await Promise.all([
      getRepoIssues(owner, repoName, {state: state.value, type: 'issues', page: page.value, limit: pageSize}),
      getRepoIssueCount(owner, repoName, state.value, 'issues'),
    ]);
    issues.value = result;
    totalPages.value = Math.max(1, Math.ceil(total / pageSize));
    if (state.value === 'open') {
      openCount.value = total;
    } else {
      closedCount.value = total;
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load issues';
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  [currentUser.value, repo.value] = await Promise.all([
    getCurrentUser(),
    getRepo(owner, repoName).catch(() => null),
  ]);
  if (currentUser.value) {
    isRepoStarred(owner, repoName).then((s) => { starred.value = s; }).catch(() => {});
  }
  const [openTotal, closedTotal] = await Promise.all([
    getRepoIssueCount(owner, repoName, 'open', 'issues'),
    getRepoIssueCount(owner, repoName, 'closed', 'issues'),
  ]);
  openCount.value = openTotal;
  closedCount.value = closedTotal;
  await loadIssues();
});

watch(() => route.params, () => {
  loadIssues();
});

async function toggleStar() {
  if (!currentUser.value || starLoading.value) return;
  starLoading.value = true;
  try {
    if (starred.value) {
      await unstarRepo(owner, repoName);
      starred.value = false;
      if (repo.value) repo.value.stars_count = (repo.value.stars_count ?? 1) - 1;
    } else {
      await starRepo(owner, repoName);
      starred.value = true;
      if (repo.value) repo.value.stars_count = (repo.value.stars_count ?? 0) + 1;
    }
  } finally {
    starLoading.value = false;
  }
}
</script>
