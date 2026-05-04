<template>
  <AppLayout>
    <div class="ui container tw-py-4">
      <!-- Breadcrumb / header -->
      <div class="tw-flex tw-items-center tw-gap-2 tw-mb-4">
        <RouterLink :to="`/${owner}/${repoName}`" class="tw-text-blue-600 hover:tw-underline tw-font-medium">
          {{ owner }}/{{ repoName }}
        </RouterLink>
        <span class="tw-text-gray-400">/</span>
        <span class="tw-font-semibold">Issues</span>
        <div class="tw-ml-auto tw-flex tw-items-center tw-gap-2">
          <RouterLink
            v-if="currentUser"
            :to="`/${owner}/${repoName}/issues/new`"
            class="ui small primary button"
          >
            New Issue
          </RouterLink>
        </div>
      </div>

      <!-- State filter tabs -->
      <div class="ui secondary pointing menu tw-mb-4">
        <a
          class="item"
          :class="{active: state === 'open'}"
          @click="setStateFilter('open')"
        >
          🟢 Open <span class="ui label tw-ml-1">{{ openCount }}</span>
        </a>
        <a
          class="item"
          :class="{active: state === 'closed'}"
          @click="setStateFilter('closed')"
        >
          ✅ Closed <span class="ui label tw-ml-1">{{ closedCount }}</span>
        </a>
      </div>

      <!-- Loading / error states -->
      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>

      <!-- Issue list -->
      <div v-else class="tw-border tw-rounded">
        <div v-if="issues.length === 0" class="tw-px-4 tw-py-12 tw-text-center tw-text-gray-500">
          No {{ state }} issues found.
        </div>
        <div
          v-for="issue in issues"
          :key="issue.id"
          class="tw-px-4 tw-py-4 tw-border-b last:tw-border-0 hover:tw-bg-gray-50"
        >
          <div class="tw-flex tw-items-start tw-gap-3">
            <span class="tw-mt-0.5">{{ issue.state === 'open' ? '🟢' : '✅' }}</span>
            <div class="tw-flex-1">
              <RouterLink
                :to="`/${owner}/${repoName}/issues/${issue.number}`"
                class="tw-font-semibold tw-text-blue-700 hover:tw-underline"
              >
                {{ issue.title }}
              </RouterLink>
              <span
                v-for="label in issue.labels"
                :key="label.id"
                class="ui mini label tw-ml-1"
                :style="{background: '#' + label.color, color: labelTextColor(label.color)}"
              >
                {{ label.name }}
              </span>
              <p class="tw-text-xs tw-text-gray-500 tw-mt-1">
                #{{ issue.number }} opened {{ timeAgo(issue.created_at) }} by
                <a :href="`${appSubUrl}/${issue.user.login}`" class="hover:tw-underline">{{ issue.user.login }}</a>
                <span v-if="issue.comments" class="tw-ml-2">
                  💬 {{ issue.comments }}
                </span>
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
import {ref, computed, onMounted, watch} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getRepoIssues, getRepoIssueCount, getCurrentUser, type Issue, type User} from '../api/index.ts';

import {appSubUrl} from '../spaconfig.ts';

const route = useRoute();
const owner = String(route.params.owner);
const repoName = String(route.params.repo);

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

const labelTextColor = computed(() => (hex: string) => {
  // Determine whether to use black or white text based on background luminance
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
  currentUser.value = await getCurrentUser();
  // Load counts for both states
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
</script>
