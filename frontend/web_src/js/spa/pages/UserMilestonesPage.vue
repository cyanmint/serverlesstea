<template>
  <AppLayout page-class="dashboard issues repository milestones">
    <div v-if="!currentUser" class="ui container tw-py-8">
      <div class="ui active centered inline loader"/>
    </div>
    <template v-else>
      <DashboardNav :current-user="currentUser" mode="milestones"/>
      <div class="ui container">
        <div class="flex-container">
          <!-- Sidebar: repo filter -->
          <div class="flex-container-nav">
            <div class="ui secondary vertical filter menu tw-bg-transparent">
              <div class="item">
                Your Repositories
                <strong>{{ totalCount }}</strong>
              </div>
              <div class="divider"/>
              <a
                v-for="repo in sidebarRepos"
                :key="repo.id"
                class="item"
                :class="{active: selectedRepoId === repo.id}"
                @click="toggleRepo(repo.id)"
              >
                <span class="tw-inline-block tw-truncate tw-w-3/4">{{ repo.full_name }}</span>
                <div class="ui" :class="[state === 'closed' ? 'red' : 'green', 'label']">
                  {{ repoMilestoneCount[repo.id] ?? 0 }}
                </div>
              </a>
            </div>
          </div>

          <!-- Main content -->
          <div class="flex-container-main">
            <div class="list-header">
              <div class="small-menu-items ui compact tiny menu list-header-toggle">
                <a class="item" :class="{active: state === 'open'}" @click="setFilter('open')">
                  <SvgIcon name="octicon-milestone" :size="16" class="tw-mr-2"/>
                  {{ openCount }}&nbsp;Open
                </a>
                <a class="item" :class="{active: state === 'closed'}" @click="setFilter('closed')">
                  <SvgIcon name="octicon-check" :size="16" class="tw-mr-2"/>
                  {{ closedCount }}&nbsp;Closed
                </a>
              </div>
              <div class="list-header-search ui form ignore-dirty">
                <div class="ui small fluid input">
                  <input v-model="keyword" type="text" placeholder="Search…" @keydown.enter="load">
                </div>
              </div>
              <div class="list-header-filters ui secondary menu tw-m-0">
                <div
                  class="item ui small dropdown jump"
                  :class="{active: sortMenuOpen}"
                  ref="sortDropdownEl"
                  @click.stop="toggleSortMenu"
                >
                  <span class="text tw-whitespace-nowrap">
                    Sort <SvgIcon name="octicon-triangle-down" :size="14" class="dropdown icon"/>
                  </span>
                  <div class="menu left" v-show="sortMenuOpen">
                    <a class="item" :class="{active: sortType === 'closestduedate'}" @click="setSort('closestduedate')">Earliest due date</a>
                    <a class="item" :class="{active: sortType === 'furthestduedate'}" @click="setSort('furthestduedate')">Latest due date</a>
                    <a class="item" :class="{active: sortType === 'leastcomplete'}" @click="setSort('leastcomplete')">Least complete</a>
                    <a class="item" :class="{active: sortType === 'mostcomplete'}" @click="setSort('mostcomplete')">Most complete</a>
                    <a class="item" :class="{active: sortType === 'mostissues'}" @click="setSort('mostissues')">Most issues</a>
                    <a class="item" :class="{active: sortType === 'leastissues'}" @click="setSort('leastissues')">Least issues</a>
                    <a class="item" :class="{active: sortType === 'name'}" @click="setSort('name')">Name</a>
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
            <div v-else-if="displayedMilestones.length === 0" class="tw-px-4 tw-py-12 tw-text-center">
              No {{ state }} milestones found.
            </div>
            <div v-else class="milestone-list">
              <li v-for="m in displayedMilestones" :key="`${m.repoFullName}/${m.milestone.id}`" class="milestone-card">
                <div class="milestone-header">
                  <h3 class="flex-text-block tw-m-0">
                    <span class="ui large label">{{ m.repoFullName }}</span>
                    <SvgIcon name="octicon-milestone" :size="16"/>
                    <RouterLink class="muted" :to="`/${m.repoFullName}/milestone/${m.milestone.id}`">{{ m.milestone.title }}</RouterLink>
                  </h3>
                  <div class="tw-flex tw-items-center">
                    <span class="tw-mr-2">{{ completeness(m.milestone) }}%</span>
                    <progress :value="completeness(m.milestone)" max="100"/>
                  </div>
                </div>
                <div class="milestone-toolbar">
                  <div class="group">
                    <div class="flex-text-block">
                      <SvgIcon name="octicon-issue-opened" :size="14"/>
                      {{ m.milestone.open_issues }}&nbsp;Open
                    </div>
                    <div class="flex-text-block">
                      <SvgIcon name="octicon-check" :size="14"/>
                      {{ m.milestone.closed_issues }}&nbsp;Closed
                    </div>
                    <div class="flex-text-block">
                      <template v-if="m.milestone.state === 'closed' && m.milestone.due_on">
                        <SvgIcon name="octicon-clock" :size="14"/>
                        Closed {{ timeAgo(m.milestone.due_on) }}
                      </template>
                      <template v-else-if="m.milestone.due_on">
                        <span class="flex-text-inline" :class="{' tw-text-red': isOverdue(m.milestone)}">
                          <SvgIcon name="octicon-calendar" :size="14"/>
                          {{ formatDate(m.milestone.due_on) }}
                        </span>
                      </template>
                      <template v-else>
                        <SvgIcon name="octicon-calendar" :size="14"/>
                        No due date
                      </template>
                    </div>
                  </div>
                </div>
                <div v-if="m.milestone.description" class="render-content markup">
                  <p>{{ m.milestone.description }}</p>
                </div>
              </li>
            </div>

            <!-- Pagination -->
            <div v-if="displayedMilestones.length > 0" class="tw-flex tw-justify-center tw-mt-4 tw-gap-2">
              <button class="ui button" :disabled="page <= 1" @click="page--; applySort()">Previous</button>
              <span class="ui label tw-self-center">Page {{ page }}</span>
              <button class="ui button" :disabled="displayedMilestones.length < pageSize" @click="page++; applySort()">Next</button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted} from 'vue';
import {RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import DashboardNav from '../components/DashboardNav.vue';
import {SvgIcon} from '../../svg.ts';
import {getCurrentUser, getMyRepos, getRepoMilestones, type User, type Repository, type Milestone} from '../api/index.ts';

type MilestoneWithRepo = {
  repoFullName: string;
  repoId: number;
  milestone: Milestone;
};

const currentUser = ref<User | null>(null);
const repos = ref<Repository[]>([]);
const allMilestones = ref<MilestoneWithRepo[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const state = ref<'open' | 'closed'>('open');
const keyword = ref('');
const sortType = ref('closestduedate');
const sortMenuOpen = ref(false);
const sortDropdownEl = ref<HTMLElement | null>(null);
const page = ref(1);
const pageSize = 20;
const selectedRepoId = ref<number | null>(null);

// Per-repo counts for sidebar
const repoMilestoneCount = ref<Record<number, number>>({});

const openCount = computed(() => allMilestones.value.filter((m) => m.milestone.state === 'open').length);
const closedCount = computed(() => allMilestones.value.filter((m) => m.milestone.state === 'closed').length);
const totalCount = computed(() => (state.value === 'closed' ? closedCount.value : openCount.value));

// Repos that have at least one milestone in the current state
const sidebarRepos = computed(() => {
  const ids = new Set(
    allMilestones.value
      .filter((m) => m.milestone.state === state.value)
      .map((m) => m.repoId),
  );
  return repos.value.filter((r) => ids.has(r.id));
});

// Filtered + sorted + paginated milestones
const filteredMilestones = computed(() => {
  let list = allMilestones.value.filter((m) => m.milestone.state === state.value);
  if (selectedRepoId.value !== null) {
    list = list.filter((m) => m.repoId === selectedRepoId.value);
  }
  if (keyword.value.trim()) {
    const q = keyword.value.trim().toLowerCase();
    list = list.filter((m) => m.milestone.title.toLowerCase().includes(q));
  }
  return list;
});

const sortedMilestones = computed(() => {
  const list = [...filteredMilestones.value];
  list.sort((a, b) => {
    const ma = a.milestone;
    const mb = b.milestone;
    switch (sortType.value) {
      case 'furthestduedate': {
        const da = ma.due_on ? new Date(ma.due_on).getTime() : 0;
        const db = mb.due_on ? new Date(mb.due_on).getTime() : 0;
        return db - da;
      }
      case 'leastcomplete': return completeness(ma) - completeness(mb);
      case 'mostcomplete': return completeness(mb) - completeness(ma);
      case 'mostissues': return (mb.open_issues + mb.closed_issues) - (ma.open_issues + ma.closed_issues);
      case 'leastissues': return (ma.open_issues + ma.closed_issues) - (mb.open_issues + mb.closed_issues);
      case 'name': return ma.title.localeCompare(mb.title);
      default: { // closestduedate
        if (!ma.due_on && !mb.due_on) return 0;
        if (!ma.due_on) return 1;
        if (!mb.due_on) return -1;
        return new Date(ma.due_on).getTime() - new Date(mb.due_on).getTime();
      }
    }
  });
  return list;
});

const displayedMilestones = computed(() => {
  const start = (page.value - 1) * pageSize;
  return sortedMilestones.value.slice(start, start + pageSize);
});

function completeness(m: Milestone): number {
  const total = m.open_issues + m.closed_issues;
  if (total === 0) return 0;
  return Math.round((m.closed_issues / total) * 100);
}

function isOverdue(m: Milestone): boolean {
  if (!m.due_on || m.state === 'closed') return false;
  return new Date(m.due_on) < new Date();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'});
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return 'today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

function toggleContextMenu() { /* handled by DashboardNav */ }
void toggleContextMenu;

function toggleRepo(id: number) {
  selectedRepoId.value = selectedRepoId.value === id ? null : id;
  page.value = 1;
}

function setFilter(s: 'open' | 'closed') {
  state.value = s;
  selectedRepoId.value = null;
  page.value = 1;
  // Rebuild counts for new state
  updateRepoMilestoneCounts();
}

function setSort(s: string) {
  sortType.value = s;
  sortMenuOpen.value = false;
  page.value = 1;
}

function toggleSortMenu() {
  sortMenuOpen.value = !sortMenuOpen.value;
}

function onDocClick(e: MouseEvent) {
  const target = e.target as Node;
  if (sortDropdownEl.value && !sortDropdownEl.value.contains(target)) sortMenuOpen.value = false;
}

function updateRepoMilestoneCounts() {
  const counts: Record<number, number> = {};
  for (const m of allMilestones.value) {
    if (m.milestone.state === state.value) {
      counts[m.repoId] = (counts[m.repoId] ?? 0) + 1;
    }
  }
  repoMilestoneCount.value = counts;
}

async function load() {
  loading.value = true;
  error.value = null;
  try {
    // Fetch all user repos first (paginated up to 50)
    if (repos.value.length === 0) {
      repos.value = await getMyRepos({limit: 50});
    }
    // Fetch milestones for all repos in parallel (both states)
    const results = await Promise.allSettled(
      repos.value.map(async (repo) => {
        const [open, closed] = await Promise.all([
          getRepoMilestones(repo.owner.login, repo.name, {state: 'open', limit: 50}),
          getRepoMilestones(repo.owner.login, repo.name, {state: 'closed', limit: 50}),
        ]);
        return {repo, milestones: [...open, ...closed]};
      }),
    );
    const collected: MilestoneWithRepo[] = [];
    for (const result of results) {
      if (result.status === 'fulfilled') {
        const {repo, milestones} = result.value;
        for (const milestone of milestones) {
          collected.push({
            repoFullName: repo.full_name,
            repoId: repo.id,
            milestone,
          });
        }
      }
    }
    allMilestones.value = collected;
    updateRepoMilestoneCounts();
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  currentUser.value = await getCurrentUser();
  await load();
  document.addEventListener('click', onDocClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocClick);
});
</script>
