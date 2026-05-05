<template>
  <AppLayout page-class="repository issue-list">
    <!-- Secondary nav (repo header + tabs) — matches templates/repo/header.tmpl -->
    <RepoNav
      :owner="owner"
      :repo-name="repoName"
      active-tab="pulls"
      :repo="repo"
      :current-user="currentUser"
    />

    <div class="ui container">
      <!-- List header -->
      <div class="list-header flex-text-block">
        <h2 class="ui compact small menu small-menu-items issue-list-navbar">
          <a class="item" :class="{active: state === 'open'}" @click="setStateFilter('open')">
            <SvgIcon name="octicon-git-pull-request" :size="16"/>
            Open
            <span class="ui label tw-ml-1">{{ openCount }}</span>
          </a>
          <a class="item" :class="{active: state === 'closed'}" @click="setStateFilter('closed')">
            <SvgIcon name="octicon-git-merge" :size="16"/>
            Closed
            <span class="ui label tw-ml-1">{{ closedCount }}</span>
          </a>
        </h2>
      </div>

      <!-- Loading / error states -->
      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>

      <!-- PR list — matches templates/shared/issuelist.tmpl -->
      <div v-else>
        <div v-if="prs.length === 0" class="tw-px-4 tw-py-12 tw-text-center">
          No {{ state }} pull requests found.
        </div>
        <div v-else class="flex-divided-list items-with-main">
          <div v-for="pr in prs" :key="pr.id" class="item">
            <div class="item-leading">
              <span v-if="pr.merged" class="tw-text-purple-600">
                <SvgIcon name="octicon-git-merge" :size="16"/>
              </span>
              <span v-else-if="pr.state === 'open'" class="tw-text-green-600">
                <SvgIcon name="octicon-git-pull-request" :size="16"/>
              </span>
              <span v-else class="tw-text-red-600">
                <SvgIcon name="octicon-git-pull-request-closed" :size="16"/>
              </span>
            </div>
            <div class="item-main">
              <div class="item-header">
                <div class="item-title">
                  <RouterLink
                    :to="`/${owner}/${repoName}/pulls/${pr.number}`"
                    class="tw-text-primary"
                  >
                    {{ pr.title }}
                  </RouterLink>
                  <span class="label-list">
                    <span
                      v-for="label in pr.labels"
                      :key="label.id"
                      class="ui label"
                      :style="{background: '#' + label.color, color: labelTextColor(label.color)}"
                    >{{ label.name }}</span>
                  </span>
                </div>
                <div v-if="pr.comments" class="item-trailing muted-links">
                  <RouterLink class="flex-text-inline" :to="`/${owner}/${repoName}/pulls/${pr.number}`">
                    <SvgIcon name="octicon-comment" :size="16"/>
                    {{ pr.comments }}
                  </RouterLink>
                </div>
              </div>
              <div class="item-body">
                #{{ pr.number }}
                <template v-if="pr.merged">
                  merged {{ timeAgo(pr.merged_at ?? '') }} by
                </template>
                <template v-else>
                  opened {{ timeAgo(pr.created_at) }} by
                </template>
                <RouterLink :to="`/${pr.user.login}`">{{ pr.user.login }}</RouterLink>
                <template v-if="pr.head && pr.base">
                  · <span class="tw-font-mono tw-text-xs">{{ pr.head.ref }} → {{ pr.base.ref }}</span>
                </template>
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
import {ref, computed, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoNav from '../components/RepoNav.vue';
import {SvgIcon} from '../../svg.ts';
import {getRepo, getPullRequests, getRepoIssueCount, getCurrentUser, type PullRequest, type Repository, type User} from '../api/index.ts';

const route = useRoute();
const owner = String(route.params.owner);
const repoName = String(route.params.repo);

const loading = ref(true);
const error = ref('');
const prs = ref<PullRequest[]>([]);
const state = ref<'open' | 'closed'>('open');
const page = ref(1);
const pageSize = 20;
const totalPages = ref(1);
const openCount = ref(0);
const closedCount = ref(0);
const repo = ref<Repository | null>(null);
const currentUser = ref<User | null>(null);

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
  loadPRs();
}

function goToPage(p: number) {
  page.value = p;
  loadPRs();
}

async function loadPRs() {
  loading.value = true;
  error.value = '';
  try {
    const [result, total] = await Promise.all([
      getPullRequests(owner, repoName, {state: state.value, page: page.value, limit: pageSize}),
      getRepoIssueCount(owner, repoName, state.value, 'pulls'),
    ]);
    prs.value = result;
    totalPages.value = Math.max(1, Math.ceil(total / pageSize));
    if (state.value === 'open') {
      openCount.value = total;
    } else {
      closedCount.value = total;
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load pull requests';
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  const [openTotal, closedTotal] = await Promise.all([
    getRepoIssueCount(owner, repoName, 'open', 'pulls'),
    getRepoIssueCount(owner, repoName, 'closed', 'pulls'),
  ]);
  openCount.value = openTotal;
  closedCount.value = closedTotal;
  [repo.value, currentUser.value] = await Promise.all([
    getRepo(owner, repoName).catch(() => null),
    getCurrentUser(),
  ]);
  await loadPRs();
});
</script>

