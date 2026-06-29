<!-- Translated from: templates/repo/view.tmpl + repo/view_content.tmpl + repo/view_file.tmpl + repo/view_file_tree.tmpl -->
<template>
  <AppLayout :page-class="'repository file list'" :title="`${owner}/${repoName}${treePath ? ` - ${treePath}` : ''}`">
    <RepoHeader :owner="owner" :repo-name="repoName" active-tab="code"/>
    <div class="ui container fluid padded">
      <BaseAlert :flash="flash"/>

      <!-- Sub-menu: branch selector + breadcrumb (repo/view_content.tmpl) -->
      <div class="repo-button-row tw-mb-3 tw-flex tw-flex-wrap tw-gap-2 tw-items-center">
        <div class="repo-button-row-left tw-flex tw-flex-wrap tw-gap-2 tw-items-center">
          <!-- Branch / tag / commit dropdown -->
          <div class="ui dropdown jump item tw-border tw-rounded tw-px-3 tw-py-1 tw-cursor-pointer tw-relative" ref="branchDropdownEl" @click.stop="toggleBranchDropdown">
            <span class="flex-text-block">
              <SvgIcon name="octicon-git-branch" :size="16"/>
              <span class="tw-ml-1 tw-max-w-[160px] tw-truncate">{{ branch }}</span>
              <SvgIcon name="octicon-triangle-down" :size="14" class="tw-ml-1"/>
            </span>
            <div v-show="branchDropdownOpen" class="menu visible tw-absolute tw-z-10 tw-bg-primary tw-border tw-rounded tw-shadow-md tw-min-w-[200px]" @click.stop>
              <div class="tw-p-2">
                <input v-model="branchSearch" class="ui input tw-w-full" placeholder="Find a branch or tag…" @click.stop>
              </div>
              <div class="tw-text-xs tw-px-4 tw-pt-1 tw-text-text-light tw-font-semibold">Branches</div>
              <div class="tw-max-h-52 tw-overflow-y-auto">
                <RouterLink
                  v-for="b in filteredBranches" :key="b.name"
                  class="item tw-block tw-px-4 tw-py-1"
                  :class="{active: b.name === branch}"
                  :to="`/${owner}/${repoName}/src/branch/${b.name}/${treePath}`"
                  @click="branchDropdownOpen = false; branchSearch = ''">
                  <SvgIcon v-if="b.name === branch" name="octicon-check" :size="14" class="tw-mr-1"/>
                  {{ b.name }}
                </RouterLink>
              </div>
              <div v-if="tags.length" class="tw-text-xs tw-px-4 tw-pt-1 tw-text-text-light tw-font-semibold">Tags</div>
              <div v-if="tags.length" class="tw-max-h-36 tw-overflow-y-auto">
                <RouterLink
                  v-for="t in filteredTags" :key="t.name"
                  class="item tw-block tw-px-4 tw-py-1"
                  :to="`/${owner}/${repoName}/src/tag/${t.name}/${treePath}`"
                  @click="branchDropdownOpen = false; branchSearch = ''">
                  {{ t.name }}
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Breadcrumb (repo/view_content.tmpl) -->
          <span v-if="pathParts.length" class="breadcrumb tw-flex tw-items-center tw-gap-1 tw-flex-wrap">
            <RouterLink :to="`/${owner}/${repoName}/src/${refType}/${branch}`" class="section muted">{{ repoName }}</RouterLink>
            <template v-for="(part, i) in pathParts" :key="i">
              <span class="breadcrumb-divider">/</span>
              <span v-if="i === pathParts.length - 1" class="active section">{{ part }}</span>
              <RouterLink v-else :to="`/${owner}/${repoName}/src/${refType}/${branch}/${pathParts.slice(0, i + 1).join('/')}`" class="section muted">{{ part }}</RouterLink>
            </template>
          </span>
        </div>
      </div>

      <!-- Directory listing -->
      <template v-if="isDir">
        <div class="repo-file-table tw-border tw-rounded">
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
              <tr v-if="pathParts.length" class="tw-border-b">
                <td class="tw-w-6 tw-py-2 tw-pl-4">
                  <SvgIcon name="octicon-file-directory-fill" :size="16" class="tw-text-primary"/>
                </td>
                <td class="tw-py-2" colspan="2"><RouterLink :to="parentPath">…</RouterLink></td>
              </tr>
              <tr v-for="entry in sortedEntries" :key="entry.sha + entry.name" class="tw-border-b last:tw-border-0">
                <td class="tw-w-6 tw-py-2 tw-pl-4">
                  <SvgIcon v-if="entry.type === 'dir'" name="octicon-file-directory-fill" :size="16" class="tw-text-primary"/>
                  <SvgIcon v-else name="octicon-file" :size="16" class="tw-text-text-light"/>
                </td>
                <td class="tw-py-2">
                  <RouterLink :to="entryLink(entry)">{{ entry.name }}</RouterLink>
                </td>
                <td class="tw-py-2 tw-text-right tw-pr-4 tw-text-sm tw-text-text-light-3"/>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <!-- File view (repo/view_file.tmpl) -->
      <template v-else>
        <div class="tw-border tw-rounded">
          <!-- File header -->
          <div class="file-header tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-2 tw-bg-input tw-border-b">
            <div class="flex-text-block tw-gap-2">
              <SvgIcon name="octicon-file" :size="16"/>
              <span class="tw-font-semibold">{{ fileName }}</span>
              <span v-if="fileSize" class="tw-text-text-light tw-text-sm">({{ fileSize }})</span>
            </div>
            <div class="tw-flex tw-gap-2">
              <a v-if="downloadUrl" :href="downloadUrl" class="ui compact small basic button" download>
                <SvgIcon name="octicon-download" :size="14"/>
              </a>
              <button v-if="fileContent" class="ui compact small basic button" @click="copyContent" :title="'Copy raw content'">
                <SvgIcon name="octicon-copy" :size="14"/>
              </button>
              <a v-if="rawUrl" :href="rawUrl" class="ui compact small basic button" target="_blank" rel="noopener">Raw</a>
            </div>
          </div>
          <!-- File body -->
          <div v-if="loading" class="tw-text-center tw-py-8 tw-text-text-light">Loading…</div>
          <div v-else-if="isBinary" class="tw-px-4 tw-py-8 tw-text-center tw-text-text-light">
            Binary file — <a v-if="downloadUrl" :href="downloadUrl">Download</a>
          </div>
          <div v-else-if="isImage" class="tw-text-center tw-p-4">
            <img :src="rawUrl" :alt="fileName" class="tw-max-w-full">
          </div>
          <pre v-else-if="fileContent" class="code-view tw-m-0 tw-overflow-auto tw-p-4 tw-text-sm"><code>{{ fileContent }}</code></pre>
          <div v-else class="tw-px-4 tw-py-8 tw-text-center tw-text-text-light">File is empty.</div>
        </div>
      </template>
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
import {apiBase, appSubUrl} from '../spaconfig.ts';
import {getStoredToken} from '../api/index.ts';

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);
const refType = computed(() => (route.params.refType as string) || 'branch');
const branch = computed(() => (route.params.ref as string) || 'main');
const treePath = computed(() => {
  const p = route.params.pathMatch ?? route.params.path;
  return Array.isArray(p) ? p.join('/') : (p || '');
});
const pathParts = computed(() => (treePath.value ? treePath.value.split('/') : []));
const fileName = computed(() => pathParts.value[pathParts.value.length - 1] || '');

function authHeaders(): Record<string, string> {
  const token = getStoredToken();
  return token ? {Authorization: `token ${token}`} : {};
}

const entries = ref<any[]>([]);
const lastCommit = ref<any>(null);
const fileContent = ref('');
const fileSize = ref('');
const downloadUrl = ref('');
const rawUrl = ref('');
const isBinary = ref(false);
const isImage = ref(false);
const isDir = ref(true);
const loading = ref(false);
const flash = ref<{error?: string}>({});

const branches = ref<any[]>([]);
const tags = ref<any[]>([]);
const branchDropdownOpen = ref(false);
const branchDropdownEl = ref<HTMLElement | null>(null);
const branchSearch = ref('');

const filteredBranches = computed(() =>
  branches.value.filter(b => !branchSearch.value || b.name.toLowerCase().includes(branchSearch.value.toLowerCase())));
const filteredTags = computed(() =>
  tags.value.filter(t => !branchSearch.value || t.name.toLowerCase().includes(branchSearch.value.toLowerCase())));

const sortedEntries = computed(() =>
  [...entries.value].sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === 'dir' ? -1 : 1;
  }));

const parentPath = computed(() => {
  if (!pathParts.value.length) return `/${owner.value}/${repoName.value}`;
  const parent = pathParts.value.slice(0, -1).join('/');
  return parent
    ? `/${owner.value}/${repoName.value}/src/${refType.value}/${branch.value}/${parent}`
    : `/${owner.value}/${repoName.value}`;
});

function entryLink(entry: any): string {
  const base = `/${owner.value}/${repoName.value}/src/${refType.value}/${branch.value}`;
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

async function copyContent() {
  try { await navigator.clipboard.writeText(fileContent.value); } catch { /* empty */ }
}

const IMAGE_EXTS = new Set(['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico', 'bmp']);

async function loadBranchesAndTags() {
  try {
    const [br, tg] = await Promise.all([
      fetch(`${apiBase}/repos/${owner.value}/${repoName.value}/branches?limit=100`, {headers: authHeaders()}),
      fetch(`${apiBase}/repos/${owner.value}/${repoName.value}/tags?limit=100`, {headers: authHeaders()}),
    ]);
    if (br.ok) branches.value = await br.json();
    if (tg.ok) tags.value = await tg.json();
  } catch { /* empty */ }
}

async function loadLastCommit() {
  try {
    const resp = await fetch(
      `${apiBase}/repos/${owner.value}/${repoName.value}/commits?limit=1&sha=${encodeURIComponent(branch.value)}`,
      {headers: authHeaders()},
    );
    if (resp.ok) {
      const commits = await resp.json();
      lastCommit.value = commits[0] ?? null;
    }
  } catch { /* empty */ }
}

async function loadContent() {
  loading.value = true;
  fileContent.value = '';
  entries.value = [];
  isBinary.value = false;
  isImage.value = false;
  flash.value = {};
  try {
    const path = treePath.value || '';
    const resp = await fetch(
      `${apiBase}/repos/${owner.value}/${repoName.value}/contents/${path}?ref=${encodeURIComponent(branch.value)}`,
      {headers: authHeaders()},
    );
    if (!resp.ok) {
      flash.value.error = resp.status === 404 ? 'Path not found.' : 'Failed to load content.';
      loading.value = false;
      return;
    }
    const data = await resp.json();
    if (Array.isArray(data)) {
      isDir.value = true;
      entries.value = data;
    } else {
      isDir.value = false;
      fileSize.value = data.size > 1048576 ? `${(data.size / 1048576).toFixed(1)} MB` : `${(data.size / 1024).toFixed(1)} KB`;
      downloadUrl.value = data.download_url || '';
      rawUrl.value = data.download_url || `${appSubUrl}/${owner.value}/${repoName.value}/raw/${refType.value}/${branch.value}/${path}`;

      const ext = fileName.value.split('.').pop()?.toLowerCase() ?? '';
      if (IMAGE_EXTS.has(ext)) {
        isImage.value = true;
      } else if (data.content) {
        try {
          const decoded = atob(data.content.replace(/\n/g, ''));
          // Check if binary by looking for null bytes
          if (decoded.includes('\0')) {
            isBinary.value = true;
          } else {
            fileContent.value = decoded;
          }
        } catch { isBinary.value = true; }
      } else if (data.download_url) {
        const rawResp = await fetch(data.download_url, {headers: authHeaders()});
        if (rawResp.ok) fileContent.value = await rawResp.text();
      }
    }
  } catch {
    flash.value.error = 'Failed to load content.';
  } finally {
    loading.value = false;
  }
}

watch([owner, repoName, branch, treePath], () => { loadContent(); loadLastCommit(); });

onMounted(() => {
  loadBranchesAndTags();
  loadContent();
  loadLastCommit();
  document.addEventListener('click', onDocClick);
});
onUnmounted(() => {
  document.removeEventListener('click', onDocClick);
});
</script>
