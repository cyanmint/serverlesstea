<template>
  <AppLayout>
    <div class="ui container tw-py-4">
      <!-- Header -->
      <div class="tw-flex tw-items-center tw-gap-2 tw-mb-4">
        <RouterLink :to="`/${owner}/${repoName}`" class="tw-text-blue-600 hover:tw-underline tw-font-medium">
          {{ owner }}/{{ repoName }}
        </RouterLink>
        <span class="tw-text-gray-400">/</span>
        <span class="tw-font-semibold">Pull Requests</span>
      </div>

      <!-- State filter tabs -->
      <div class="ui secondary pointing menu tw-mb-4">
        <a class="item" :class="{active: state === 'open'}" @click="setStateFilter('open')">
          🔀 Open <span class="ui label tw-ml-1">{{ openCount }}</span>
        </a>
        <a class="item" :class="{active: state === 'closed'}" @click="setStateFilter('closed')">
          ✅ Closed <span class="ui label tw-ml-1">{{ closedCount }}</span>
        </a>
      </div>

      <!-- Loading / error -->
      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>

      <!-- PR list -->
      <div v-else class="tw-border tw-rounded">
        <div v-if="prs.length === 0" class="tw-px-4 tw-py-12 tw-text-center tw-text-gray-500">
          No {{ state }} pull requests.
        </div>
        <div
          v-for="pr in prs"
          :key="pr.id"
          class="tw-px-4 tw-py-4 tw-border-b last:tw-border-0 hover:tw-bg-gray-50"
        >
          <div class="tw-flex tw-items-start tw-gap-3">
            <span class="tw-mt-0.5">
              {{ pr.merged ? '🟣' : pr.state === 'open' ? '🔀' : '🚫' }}
            </span>
            <div class="tw-flex-1">
              <a :href="pr.html_url" class="tw-font-semibold tw-text-blue-700 hover:tw-underline">
                {{ pr.title }}
              </a>
              <span
                v-for="label in pr.labels"
                :key="label.id"
                class="ui mini label tw-ml-1"
                :style="{background: '#' + label.color}"
              >
                {{ label.name }}
              </span>
              <p class="tw-text-xs tw-text-gray-500 tw-mt-1">
                #{{ pr.number }}
                <template v-if="pr.merged">
                  merged {{ timeAgo(pr.merged_at ?? '') }} by
                  <a :href="`${appSubUrl}/${pr.user.login}`" class="hover:tw-underline">{{ pr.user.login }}</a>
                </template>
                <template v-else>
                  opened {{ timeAgo(pr.created_at) }} by
                  <a :href="`${appSubUrl}/${pr.user.login}`" class="hover:tw-underline">{{ pr.user.login }}</a>
                </template>
                <span v-if="pr.comments" class="tw-ml-2">💬 {{ pr.comments }}</span>
              </p>
              <p v-if="pr.head && pr.base" class="tw-text-xs tw-font-mono tw-text-gray-400 tw-mt-1">
                {{ pr.head.label }} → {{ pr.base.label }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="tw-flex tw-justify-center tw-mt-6 tw-gap-2">
        <button
          v-for="p in totalPages"
          :key="p"
          class="ui button"
          :class="{primary: p === page}"
          @click="goToPage(p)"
        >
          {{ p }}
        </button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getPullRequests, getRepoIssueCount, type PullRequest} from '../api/index.ts';

import {appSubUrl} from '../spaconfig.ts';

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
  await loadPRs();
});
</script>
