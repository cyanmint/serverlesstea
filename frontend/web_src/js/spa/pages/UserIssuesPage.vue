<template>
  <AppLayout page-class="dashboard issues">
    <div v-if="!currentUser" class="ui container tw-py-8">
      <div class="ui active centered inline loader"/>
    </div>
    <template v-else>
      <DashboardNav :current-user="currentUser" :mode="mode"/>
      <div class="ui container">
        <div class="flex-container">
          <!-- Filter sidebar — matches templates/user/dashboard/issues.tmpl -->
          <div class="flex-container-nav">
            <div class="ui secondary vertical filter menu tw-bg-transparent">
              <a class="item" :class="{active: viewType === 'your_repositories'}" @click="setViewType('your_repositories')">
                Your Repositories
                <strong>{{ openCount }}</strong>
              </a>
              <a class="item" :class="{active: viewType === 'assigned'}" @click="setViewType('assigned')">
                Assigned to you
                <strong>{{ assignCount }}</strong>
              </a>
              <a class="item" :class="{active: viewType === 'created_by'}" @click="setViewType('created_by')">
                Created by you
                <strong>{{ createCount }}</strong>
              </a>
              <template v-if="mode === 'pulls'">
                <a class="item" :class="{active: viewType === 'review_requested'}" @click="setViewType('review_requested')">
                  Review requested
                  <strong>{{ reviewCount }}</strong>
                </a>
              </template>
              <a class="item" :class="{active: viewType === 'mentioned'}" @click="setViewType('mentioned')">
                Mentioning you
                <strong>{{ mentionCount }}</strong>
              </a>
            </div>
          </div>

          <!-- Main content -->
          <div class="flex-container-main content">
            <div class="list-header">
              <div class="small-menu-items ui compact tiny menu list-header-toggle flex-items-block">
                <a class="item" :class="{active: state === 'open'}" @click="setFilter('open')">
                  <SvgIcon name="octicon-issue-opened" :size="16"/>
                  {{ openCount }}&nbsp;Open
                </a>
                <a class="item" :class="{active: state === 'closed'}" @click="setFilter('closed')">
                  <SvgIcon name="octicon-issue-closed" :size="16"/>
                  {{ closedCount }}&nbsp;Closed
                </a>
              </div>
              <div class="list-header-search ui form ignore-dirty">
                <div class="ui small fluid input">
                  <input v-model="keyword" type="text" placeholder="Search…" @keydown.enter="load">
                </div>
              </div>
              <div class="list-header-filters ui secondary menu tw-m-0">
                <div class="item ui small dropdown jump" :class="{active: sortMenuOpen}" ref="sortDropdownEl" @click.stop="toggleSortMenu">
                  <span class="text tw-whitespace-nowrap">
                    Sort <SvgIcon name="octicon-triangle-down" :size="14" class="dropdown icon"/>
                  </span>
                  <div class="menu left" v-show="sortMenuOpen">
                    <a class="item" :class="{active: sortType === 'recentupdate'}" @click="setSort('recentupdate')">Recently updated</a>
                    <a class="item" :class="{active: sortType === 'latest'}" @click="setSort('latest')">Newest</a>
                    <a class="item" :class="{active: sortType === 'oldest'}" @click="setSort('oldest')">Oldest</a>
                    <a class="item" :class="{active: sortType === 'mostcomment'}" @click="setSort('mostcomment')">Most commented</a>
                    <a class="item" :class="{active: sortType === 'leastcomment'}" @click="setSort('leastcomment')">Least commented</a>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="loading" class="tw-py-16 tw-text-center">
              <div class="ui active centered inline loader"/>
            </div>
            <div v-else-if="error" class="ui negative message">
              <p>{{ error }}</p>
            </div>
            <div v-else-if="items.length === 0" class="tw-px-4 tw-py-12 tw-text-center">
              No {{ state }} {{ mode === 'pulls' ? 'pull requests' : 'issues' }} found.
            </div>
            <!-- Issue list — matches templates/shared/issuelist.tmpl -->
            <div v-else class="flex-divided-list items-with-main">
              <div v-for="item in items" :key="item.id" class="item">
                <div class="item-leading">
                  <span v-if="item.state === 'open'" class="tw-text-green-600">
                    <SvgIcon :name="mode === 'pulls' ? 'octicon-git-pull-request' : 'octicon-issue-opened'" :size="16"/>
                  </span>
                  <span v-else class="tw-text-purple-600">
                    <SvgIcon :name="mode === 'pulls' ? 'octicon-git-merge' : 'octicon-issue-closed'" :size="16"/>
                  </span>
                </div>
                <div class="item-main">
                  <div class="item-header">
                    <div class="item-title">
                      <RouterLink :to="issueToPath(item)" class="tw-text-primary">
                        {{ item.title }}
                      </RouterLink>
                      <span class="label-list">
                        <span
                          v-for="label in item.labels"
                          :key="label.id"
                          class="ui label"
                          :style="{background: '#' + label.color, color: labelTextColor(label.color)}"
                        >{{ label.name }}</span>
                      </span>
                    </div>
                    <div v-if="item.comments" class="item-trailing muted-links">
                      <span class="flex-text-inline">
                        <SvgIcon name="octicon-comment" :size="16"/>
                        {{ item.comments }}
                      </span>
                    </div>
                  </div>
                  <div class="item-body">
                    {{ repoFromUrl(item.html_url) }}
                    #{{ item.number }} opened {{ timeAgo(item.created_at) }} by
                    <RouterLink :to="`/${item.user.login}`">{{ item.user.login }}</RouterLink>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="items.length > 0" class="tw-flex tw-justify-center tw-mt-4 tw-gap-2">
              <button class="ui button" :disabled="page <= 1" @click="page--; load()">Previous</button>
              <span class="ui label tw-self-center">Page {{ page }}</span>
              <button class="ui button" :disabled="items.length < pageSize" @click="page++; load()">Next</button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted, onUnmounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import DashboardNav from '../components/DashboardNav.vue';
import {SvgIcon} from '../../svg.ts';
import {getCurrentUser, getUserIssues, type Issue, type User} from '../api/index.ts';

const route = useRoute();
const mode = computed<'issues' | 'pulls'>(() => {
  if (route.path === '/pulls') return 'pulls';
  return 'issues';
});

const sortMenuOpen = ref(false);
const sortDropdownEl = ref<HTMLElement | null>(null);

function toggleSortMenu() {
  sortMenuOpen.value = !sortMenuOpen.value;
}

function onDocClick(e: MouseEvent) {
  const target = e.target as Node;
  if (sortDropdownEl.value && !sortDropdownEl.value.contains(target)) sortMenuOpen.value = false;
}

const currentUser = ref<User | null>(null);
const state = ref<'open' | 'closed'>('open');
const viewType = ref('your_repositories');
const sortType = ref('recentupdate');
const keyword = ref('');
const page = ref(1);
const pageSize = 20;
const items = ref<Issue[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const openCount = ref(0);
const closedCount = ref(0);
const assignCount = ref(0);
const createCount = ref(0);
const reviewCount = ref(0);
const mentionCount = ref(0);

function labelTextColor(hex: string): string {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.5 ? '#000' : '#fff';
}

function issueToPath(item: Issue): string {
  try {
    const u = new URL(item.html_url);
    return u.pathname;
  } catch {
    return item.html_url;
  }
}

function repoFromUrl(htmlUrl: string): string {
  try {
    const u = new URL(htmlUrl);
    const parts = u.pathname.split('/');
    if (parts.length >= 3) return `${parts[1]}/${parts[2]}`;
    return '';
  } catch {
    return '';
  }
}

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

function setFilter(s: 'open' | 'closed') {
  state.value = s;
  page.value = 1;
  load();
}

function setViewType(vt: string) {
  viewType.value = vt;
  page.value = 1;
  load();
}

function setSort(s: string) {
  sortType.value = s;
  page.value = 1;
  load();
}

async function load() {
  if (!currentUser.value) return;
  loading.value = true;
  error.value = null;
  try {
    const opts: Parameters<typeof getUserIssues>[0] = {
      state: state.value,
      page: page.value,
      limit: pageSize,
      type: mode.value === 'pulls' ? 'comment' : 'issues',
    };
    if (viewType.value === 'assigned') opts.assigned = true;
    items.value = await getUserIssues(opts);
    if (state.value === 'open') {
      openCount.value = items.value.length;
    } else {
      closedCount.value = items.value.length;
    }
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

watch(mode, () => {
  viewType.value = 'your_repositories';
  page.value = 1;
  load();
});

onMounted(async () => {
  currentUser.value = await getCurrentUser();
  await load();
  document.addEventListener('click', onDocClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocClick);
});
</script>
