<!-- Translated from: templates/repo/wiki/view.tmpl -->
<template>
  <AppLayout :page-class="'repository wiki view'" :title="`Wiki - ${owner}/${repoName}`">
    <RepoHeader :owner="owner" :repo-name="repoName"/>
    <div class="ui container">
      <div class="repo-button-row tw-flex tw-items-center tw-gap-2 tw-mb-4">
        <div class="ui floating filter dropdown">
          <div class="ui basic small button">
            <span class="text">Page: <strong>{{ currentPage || 'Home' }}</strong></span>
          </div>
        </div>
        <div class="tw-ml-auto tw-flex tw-gap-2">
          <RouterLink v-if="canWrite" :to="`/${owner}/${repoName}/wiki/${currentPage || 'Home'}?action=_edit`" class="ui primary small button">
            Edit
          </RouterLink>
          <RouterLink :to="`/${owner}/${repoName}/wiki/?action=_pages`" class="ui small button">
            Pages
          </RouterLink>
          <RouterLink v-if="canWrite" :to="`/${owner}/${repoName}/wiki/?action=_new`" class="ui primary small button">
            New Page
          </RouterLink>
        </div>
      </div>
      <div class="ui dividing header">
        <h2>{{ currentPage || 'Home' }}</h2>
        <div v-if="lastCommit" class="ui sub header">
          Last edited {{ formatDate(lastCommit) }}
        </div>
      </div>
      <div v-if="wikiContent" class="render-content markup wiki-content-parts" v-html="wikiContent"></div>
      <div v-else-if="loading" class="tw-text-center tw-py-8">Loading…</div>
      <div v-else class="tw-text-center tw-py-8 tw-text-text-light">
        This wiki doesn't have any content yet.
        <RouterLink v-if="canWrite" :to="`/${owner}/${repoName}/wiki/?action=_new`">Create the first page</RouterLink>
      </div>
      <!-- Pages list -->
      <div v-if="showPages" class="tw-mt-4">
        <h3>All Pages</h3>
        <div class="ui divided list">
          <div v-for="p in pages" :key="p.title" class="item">
            <RouterLink :to="`/${owner}/${repoName}/wiki/${p.title}`">{{ p.title }}</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoHeader from '../components/RepoHeader.vue';
import {apiBase} from '../spaconfig.ts';

const route = useRoute();
const owner = route.params.owner as string;
const repoName = route.params.repo as string;
const token = localStorage.getItem('gitea-spa-token') || '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const currentPage = computed(() => (route.params.page as string) || 'Home');
const showPages = computed(() => route.query.action === '_pages');
const canWrite = ref(false);
const wikiContent = ref('');
const lastCommit = ref('');
const pages = ref<any[]>([]);
const loading = ref(false);

function formatDate(d: string) { return d ? new Date(d).toLocaleDateString() : ''; }

async function loadWikiPage() {
  if (showPages.value) { await loadPages(); return; }
  loading.value = true;
  wikiContent.value = '';
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/wiki/page/${encodeURIComponent(currentPage.value)}`, {headers});
    if (resp.ok) {
      const data = await resp.json();
      wikiContent.value = data.html_content || data.content_base64 ? atob(data.content_base64 || '') : '';
      lastCommit.value = data.last_commit?.date || '';
    }
  } catch { /* empty */ } finally { loading.value = false; }
}

async function loadPages() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/wiki/pages`, {headers});
    if (resp.ok) pages.value = await resp.json();
  } catch { /* empty */ }
}

async function checkPermissions() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}`, {headers});
    if (resp.ok) {
      const data = await resp.json();
      canWrite.value = data.permissions?.push || false;
    }
  } catch { /* empty */ }
}

watch(currentPage, () => loadWikiPage());
onMounted(async () => { await checkPermissions(); await loadWikiPage(); });
</script>
