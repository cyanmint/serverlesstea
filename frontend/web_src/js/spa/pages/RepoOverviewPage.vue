<!-- Translated from: templates/repo/home.tmpl + repo/view_content.tmpl + repo/home_sidebar_top.tmpl + repo/home_sidebar_bottom.tmpl -->
<template>
  <AppLayout :page-class="'repository file list'" :title="repo?.full_name || `${owner}/${repoName}`">
    <RepoHeader :owner="owner" :repo-name="repoName" :repo="repo" active-tab="code" :has-settings-access="hasSettingsAccess"/>
    <div class="ui container">
      <BaseAlert :flash="flash"/>
      <div v-if="repo?.archived" class="ui warning message tw-text-center">
        This repository has been archived. It is read-only.
      </div>
      <div v-if="loading && !repo" class="tw-text-center tw-py-8">
        <span class="tw-text-text-light">Loading…</span>
      </div>
      <div v-else-if="repo?.empty" class="ui info message">
        <p>This repository is empty.
          <RouterLink v-if="hasSettingsAccess" :to="`/${owner}/${repoName}/settings`">Initialize it</RouterLink>
          to get started.
        </p>
      </div>
      <div v-else class="repo-grid-filelist-sidebar">
        <!-- File list / README (repo/view_content.tmpl) -->
        <div class="repo-home-filelist">
          <!-- Branch selector + action row -->
          <div class="repo-button-row tw-mb-2 tw-flex tw-flex-wrap tw-gap-2 tw-items-center">
            <div class="repo-button-row-left tw-flex tw-gap-2 tw-items-center">
              <!-- Branch dropdown -->
              <div class="ui dropdown jump item tw-border tw-rounded tw-px-3 tw-py-1 tw-cursor-pointer tw-relative" ref="branchDropdownEl" @click.stop="toggleBranchDropdown">
                <span class="flex-text-block">
                  <SvgIcon name="octicon-git-branch" :size="16"/>
                  <span class="tw-ml-1 tw-max-w-[180px] tw-truncate">{{ currentBranch }}</span>
                  <SvgIcon name="octicon-triangle-down" :size="14" class="tw-ml-1"/>
                </span>
                <div v-show="branchDropdownOpen" class="menu visible tw-absolute tw-z-10 tw-bg-primary tw-border tw-rounded tw-shadow-md tw-min-w-[200px]" @click.stop>
                  <div class="tw-p-2">
                    <input v-model="branchSearch" class="ui input tw-w-full" placeholder="Find a branch…" @click.stop>
                  </div>
                  <div class="tw-max-h-60 tw-overflow-y-auto">
                    <RouterLink
                      v-for="b in filteredBranches" :key="b.name"
                      class="item tw-block tw-px-4 tw-py-2 hover:tw-bg-hover"
                      :class="{active: b.name === currentBranch}"
                      :to="`/${owner}/${repoName}/src/branch/${b.name}`"
                      @click="branchDropdownOpen = false; branchSearch = ''">
                      <SvgIcon v-if="b.name === currentBranch" name="octicon-check" :size="16" class="tw-mr-1"/>
                      {{ b.name }}
                    </RouterLink>
                  </div>
                </div>
              </div>
              <!-- Commits count -->
              <RouterLink v-if="commitsCount" :to="`/${owner}/${repoName}/commits/branch/${currentBranch}`" class="ui compact small basic button">
                <SvgIcon name="octicon-history" :size="16"/>
                <span class="tw-ml-1">{{ commitsCount }} commits</span>
              </RouterLink>
            </div>
            <div class="repo-button-row-right tw-flex tw-gap-2 tw-ml-auto">
              <a v-if="cloneUrl" class="ui compact small basic button" :href="cloneUrl">
                <SvgIcon name="octicon-code" :size="16"/> Clone
              </a>
            </div>
          </div>

          <!-- File table -->
          <div class="repo-file-table tw-border tw-rounded">
            <!-- Last commit summary -->
            <div v-if="lastCommit" class="repo-file-last-commit tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-border-b tw-bg-input">
              <img v-if="lastCommit.author?.avatar_url" :src="lastCommit.author.avatar_url" class="ui avatar image" style="width:20px;height:20px" alt="">
              <RouterLink v-if="lastCommit.author?.login" :to="`/${lastCommit.author.login}`" class="muted tw-font-semibold">{{ lastCommit.author.login }}</RouterLink>
              <span v-else class="tw-font-semibold tw-text-text-light">{{ lastCommit.commit?.author?.name }}</span>
              <RouterLink :to="`/${owner}/${repoName}/commit/${lastCommit.sha}`" class="tw-text-text-light tw-truncate">
                {{ lastCommit.commit?.message?.split('\n')[0] }}
              </RouterLink>
              <span class="tw-text-text-light-3 tw-ml-auto tw-shrink-0 tw-text-sm">{{ formatRelativeDate(lastCommit.commit?.author?.date) }}</span>
            </div>
            <table class="ui very basic table tw-m-0">
              <tbody>
                <tr v-if="treePathParts.length" class="tw-border-b">
                  <td class="tw-w-6 tw-py-2 tw-pl-4">
                    <SvgIcon name="octicon-file-directory-fill" :size="16" class="tw-text-primary"/>
                  </td>
                  <td class="tw-py-2" colspan="2">
                    <RouterLink :to="parentPath">…</RouterLink>
                  </td>
                </tr>
                <tr v-for="entry in sortedEntries" :key="entry.sha + entry.name" class="tw-border-b last:tw-border-0">
                  <td class="tw-w-6 tw-py-2 tw-pl-4">
                    <SvgIcon v-if="entry.type === 'dir'" name="octicon-file-directory-fill" :size="16" class="tw-text-primary"/>
                    <SvgIcon v-else name="octicon-file" :size="16" class="tw-text-text-light"/>
                  </td>
                  <td class="tw-py-2">
                    <RouterLink :to="entryLink(entry)">{{ entry.name }}</RouterLink>
                  </td>
                  <td class="tw-py-2 tw-text-right tw-text-text-light-3 tw-text-sm tw-pr-4"/>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- README -->
          <div v-if="readme" class="file-content tw-mt-4 tw-border tw-rounded">
            <div class="file-header tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-border-b tw-bg-input">
              <SvgIcon name="octicon-book" :size="16"/>
              <span class="tw-font-semibold">README</span>
            </div>
            <div class="file-body markup tw-p-4" v-html="readme"/>
          </div>
        </div>

        <!-- Sidebar (repo/home_sidebar_top.tmpl + repo/home_sidebar_bottom.tmpl) -->
        <div class="repo-home-sidebar">
          <!-- About section -->
          <div class="flex-relaxed-list">
            <div class="repo-home-sidebar-header">About</div>
            <div v-if="repo?.description" class="repo-description tw-break-anywhere">{{ repo.description }}</div>
            <div v-else class="tw-text-text-light tw-text-sm">No description provided.</div>
            <a v-if="repo?.website" class="flex-text-block muted tw-break-all" :href="repo.website" target="_blank" rel="noopener nofollow">
              <SvgIcon name="octicon-link" :size="16"/>
              <span class="tw-text-primary tw-ml-1">{{ repo.website }}</span>
            </a>
            <!-- Topics -->
            <div v-if="topics.length" class="flex-text-block tw-flex-wrap tw-gap-1 tw-my-1">
              <RouterLink v-for="t in topics" :key="t" class="repo-topic ui large label gt-ellipsis" :to="`/explore/repos?q=${encodeURIComponent(t)}&topic=1`">{{ t }}</RouterLink>
            </div>
          </div>

          <!-- Stats row -->
          <div class="flex-text-block tw-gap-4 tw-mt-2">
            <RouterLink :to="`/${owner}/${repoName}/stargazers`" class="muted flex-text-block">
              <SvgIcon name="octicon-star" :size="16"/>
              <strong class="tw-mx-1">{{ repo?.stars_count ?? 0 }}</strong>
              <span class="tw-text-text-light">stars</span>
            </RouterLink>
            <RouterLink :to="`/${owner}/${repoName}/watchers`" class="muted flex-text-block">
              <SvgIcon name="octicon-eye" :size="16"/>
              <strong class="tw-mx-1">{{ repo?.watchers_count ?? 0 }}</strong>
              <span class="tw-text-text-light">watching</span>
            </RouterLink>
            <RouterLink :to="`/${owner}/${repoName}/forks`" class="muted flex-text-block">
              <SvgIcon name="octicon-repo-forked" :size="16"/>
              <strong class="tw-mx-1">{{ repo?.forks_count ?? 0 }}</strong>
              <span class="tw-text-text-light">forks</span>
            </RouterLink>
          </div>

          <!-- Releases (repo/home_sidebar_bottom.tmpl) -->
          <template v-if="releases.length">
            <div class="divider"/>
            <div class="repo-home-sidebar-header">
              <RouterLink :to="`/${owner}/${repoName}/releases`" class="muted item">Releases</RouterLink>
              <span class="ui small label">{{ releases.length }}</span>
            </div>
            <div class="flex-relaxed-list">
              <div v-for="r in releases.slice(0, 3)" :key="r.id" class="flex-text-block">
                <SvgIcon name="octicon-tag" :size="16"/>
                <RouterLink :to="`/${owner}/${repoName}/releases/tag/${r.tag_name}`" class="muted gt-ellipsis">{{ r.name || r.tag_name }}</RouterLink>
                <span v-if="r.prerelease" class="ui mini orange label tw-shrink-0">Pre-release</span>
              </div>
            </div>
          </template>

          <!-- Language stats (repo/home_sidebar_bottom.tmpl) -->
          <template v-if="languages.length">
            <div class="divider"/>
            <div class="repo-home-sidebar-header">Languages</div>
            <div>
              <div class="language-stats tw-flex tw-h-2 tw-rounded tw-overflow-hidden tw-mb-2">
                <div
                  v-for="lang in languages" :key="lang.name"
                  class="bar"
                  :style="{width: `${lang.percentage}%`, backgroundColor: lang.color || '#888'}"
                  :title="`${lang.name} ${lang.percentage}%`"
                />
              </div>
              <div class="language-stats-details tw-flex tw-flex-col tw-gap-1">
                <div v-for="lang in languages" :key="lang.name" class="item flex-text-block">
                  <i class="color-icon" :style="{backgroundColor: lang.color || '#888'}"/>
                  <strong class="tw-font-semibold">{{ lang.name }}</strong>
                  <span class="tw-text-text-light tw-ml-1">{{ lang.percentage }}%</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, watch} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import RepoHeader from '../components/RepoHeader.vue';
import {SvgIcon} from '../../svg.ts';
import {apiBase} from '../spaconfig.ts';
import {getStoredToken, type Repository} from '../api/index.ts';

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);
const treePath = computed(() => {
  const p = route.params.path;
  return Array.isArray(p) ? p.join('/') : (p || '');
});
const treePathParts = computed(() => (treePath.value ? treePath.value.split('/') : []));

function authHeaders(): Record<string, string> {
  const token = getStoredToken();
  return token ? {Authorization: `token ${token}`} : {};
}

const repo = ref<Repository | null>(null);
const treeEntries = ref<any[]>([]);
const lastCommit = ref<any>(null);
const readme = ref('');
const topics = ref<string[]>([]);
const releases = ref<any[]>([]);
const languages = ref<Array<{name: string; percentage: number; color?: string}>>([]);
const currentBranch = ref('main');
const branches = ref<any[]>([]);
const commitsCount = ref(0);
const cloneUrl = ref('');
const hasSettingsAccess = ref(false);
const loading = ref(true);
const flash = ref<{error?: string}>({});

const branchDropdownOpen = ref(false);
const branchDropdownEl = ref<HTMLElement | null>(null);
const branchSearch = ref('');

const filteredBranches = computed(() =>
  branches.value.filter(b => !branchSearch.value || b.name.toLowerCase().includes(branchSearch.value.toLowerCase())));

const sortedEntries = computed(() =>
  [...treeEntries.value].sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'dir' ? -1 : 1;
  }));

const parentPath = computed(() => {
  if (!treePathParts.value.length) return `/${owner.value}/${repoName.value}`;
  const parent = treePathParts.value.slice(0, -1).join('/');
  return parent
    ? `/${owner.value}/${repoName.value}/src/branch/${currentBranch.value}/${parent}`
    : `/${owner.value}/${repoName.value}`;
});

function entryLink(entry: any): string {
  const base = `/${owner.value}/${repoName.value}/src/branch/${currentBranch.value}`;
  return entry.path ? `${base}/${entry.path}` : `${base}/${entry.name}`;
}

function toggleBranchDropdown() { branchDropdownOpen.value = !branchDropdownOpen.value; }

function onDocClick(e: MouseEvent) {
  if (branchDropdownEl.value && !branchDropdownEl.value.contains(e.target as Node)) {
    branchDropdownOpen.value = false;
  }
}

function formatRelativeDate(d: string): string {
  if (!d) return '';
  const diff = Date.now() - new Date(d).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(d).toLocaleDateString();
}

async function loadRepo() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner.value}/${repoName.value}`, {headers: authHeaders()});
    if (!resp.ok) {
      flash.value.error = resp.status === 404 ? 'Repository not found.' : 'Failed to load repository.';
      return;
    }
    repo.value = await resp.json() as Repository;
    currentBranch.value = repo.value.default_branch || 'main';
    topics.value = (repo.value as any).topics || [];
    cloneUrl.value = (repo.value as any).clone_url || '';
    hasSettingsAccess.value = !!(
      (repo.value as any).permissions?.admin ||
      (repo.value as any).permissions?.push
    );
  } catch { flash.value.error = 'Failed to load repository.'; }
}

async function loadBranches() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner.value}/${repoName.value}/branches?limit=100`, {headers: authHeaders()});
    if (resp.ok) branches.value = await resp.json();
  } catch { /* empty */ }
}

async function loadTree() {
  try {
    const path = treePath.value || '';
    const resp = await fetch(
      `${apiBase}/repos/${owner.value}/${repoName.value}/contents/${path}?ref=${encodeURIComponent(currentBranch.value)}`,
      {headers: authHeaders()},
    );
    if (resp.ok) {
      const data = await resp.json();
      treeEntries.value = Array.isArray(data) ? data : [data];
    }
  } catch { /* empty */ }
}

async function loadLastCommit() {
  try {
    const resp = await fetch(
      `${apiBase}/repos/${owner.value}/${repoName.value}/commits?limit=1&sha=${encodeURIComponent(currentBranch.value)}`,
      {headers: authHeaders()},
    );
    if (resp.ok) {
      const commits = await resp.json();
      lastCommit.value = commits[0] ?? null;
      commitsCount.value = Number(resp.headers.get('x-total-count')) || 0;
    }
  } catch { /* empty */ }
}

async function loadReadme() {
  for (const name of ['README.md', 'readme.md', 'README']) {
    try {
      const resp = await fetch(
        `${apiBase}/repos/${owner.value}/${repoName.value}/raw/${encodeURIComponent(name)}?ref=${encodeURIComponent(currentBranch.value)}`,
        {headers: authHeaders()},
      );
      if (!resp.ok) continue;
      const text = await resp.text();
      if (!text) continue;
      if (name.endsWith('.md')) {
        const renderResp = await fetch(`${apiBase}/markdown`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', ...authHeaders()},
          body: JSON.stringify({Context: `${owner.value}/${repoName.value}`, Mode: 'gfm', Text: text}),
        });
        if (renderResp.ok) readme.value = await renderResp.text();
      } else {
        readme.value = `<pre>${text}</pre>`;
      }
      break;
    } catch { /* try next name */ }
  }
}

async function loadReleases() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner.value}/${repoName.value}/releases?limit=5`, {headers: authHeaders()});
    if (resp.ok) releases.value = await resp.json();
  } catch { /* empty */ }
}

async function loadLanguages() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner.value}/${repoName.value}/languages`, {headers: authHeaders()});
    if (resp.ok) {
      const data: Record<string, number> = await resp.json();
      const total = Object.values(data).reduce((s, v) => s + v, 0);
      languages.value = Object.entries(data)
        .map(([name, bytes]) => ({name, percentage: total > 0 ? Math.round((bytes / total) * 100) : 0}))
        .sort((a, b) => b.percentage - a.percentage);
    }
  } catch { /* empty */ }
}

async function loadAll() {
  loading.value = true;
  readme.value = '';
  treeEntries.value = [];
  lastCommit.value = null;
  flash.value = {};
  await loadRepo();
  if (repo.value && !(repo.value as any).empty) {
    await Promise.all([loadBranches(), loadTree(), loadLastCommit(), loadReadme(), loadReleases(), loadLanguages()]);
  }
  loading.value = false;
}

watch([owner, repoName], loadAll);

onMounted(() => {
  loadAll();
  document.addEventListener('click', onDocClick);
});
onUnmounted(() => {
  document.removeEventListener('click', onDocClick);
});
</script>
