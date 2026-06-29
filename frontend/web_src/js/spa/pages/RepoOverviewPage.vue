<!-- Translated from: templates/repo/home.tmpl + repo/view_content.tmpl + repo/home_sidebar_top.tmpl + repo/home_sidebar_bottom.tmpl -->
<template>
  <AppLayout :page-class="'repository file list'" :title="repo?.full_name || 'Repository'">
    <RepoHeader :owner="owner" :repo-name="repoName"/>
    <div class="ui container">
      <BaseAlert :flash="flash"/>
      <div v-if="repo?.archived" class="ui warning message tw-text-center">
        This repository has been archived. It is read-only.
      </div>
      <div class="repo-grid-filelist-sidebar">
        <!-- File list / readme -->
        <div class="repo-home-filelist">
          <div class="repo-file-table">
            <div class="repo-file-last-commit">
              <span v-if="lastCommit" class="tw-text-text-light">
                <strong>{{ lastCommit.commit?.author?.name }}</strong>:
                {{ lastCommit.commit?.message?.split('\n')[0] }}
              </span>
              <span v-if="lastCommit" class="tw-text-text-light-3 tw-ml-auto">{{ formatDate(lastCommit.commit?.author?.date) }}</span>
            </div>
            <table class="ui very basic table">
              <tbody>
                <tr v-for="entry in treeEntries" :key="entry.path">
                  <td class="tw-w-8">
                    <span v-if="entry.type === 'dir'">📁</span>
                    <span v-else>📄</span>
                  </td>
                  <td>
                    <RouterLink :to="`/${owner}/${repoName}/src/branch/${defaultBranch}/${entry.path}`">{{ entry.name }}</RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="readme" class="markup tw-mt-4" v-html="readme"></div>
        </div>
        <!-- Sidebar -->
        <div class="repo-home-sidebar">
          <p v-if="repo?.description" class="tw-mb-4">{{ repo.description }}</p>
          <div v-if="repo?.website" class="tw-mb-2"><a :href="repo.website" target="_blank" rel="nofollow noopener">{{ repo.website }}</a></div>
          <div class="tw-mb-4 tw-flex tw-gap-4">
            <span>⭐ {{ repo?.stars_count || 0 }} Stars</span>
            <span>🔀 {{ repo?.forks_count || 0 }} Forks</span>
            <span>👁 {{ repo?.watchers_count || 0 }} Watching</span>
          </div>
          <div v-if="topics.length" class="tw-mb-4">
            <span v-for="t in topics" :key="t" class="ui label tw-mr-1 tw-mb-1">{{ t }}</span>
          </div>
          <div v-if="releases.length" class="tw-mb-4">
            <h4>Releases</h4>
            <div v-for="r in releases.slice(0, 3)" :key="r.id" class="tw-mb-1">
              <RouterLink :to="`/${owner}/${repoName}/releases/tag/${r.tag_name}`">{{ r.name || r.tag_name }}</RouterLink>
            </div>
          </div>
          <div v-if="languages.length" class="tw-mb-4">
            <h4>Languages</h4>
            <div v-for="lang in languages" :key="lang.name" class="tw-flex tw-justify-between">
              <span>{{ lang.name }}</span>
              <span>{{ lang.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import RepoHeader from '../components/RepoHeader.vue';
import {apiBase} from '../spaconfig.ts';

const route = useRoute();
const owner = route.params.owner as string;
const repoName = route.params.repo as string;
const token = localStorage.getItem('gitea-spa-token') || '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const repo = ref<any>(null);
const treeEntries = ref<any[]>([]);
const lastCommit = ref<any>(null);
const readme = ref('');
const topics = ref<string[]>([]);
const releases = ref<any[]>([]);
const languages = ref<any[]>([]);
const defaultBranch = ref('main');
const flash = ref<{error?: string}>({});

function formatDate(d: string) { return d ? new Date(d).toLocaleDateString() : ''; }

async function loadRepo() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}`, {headers});
    if (resp.ok) {
      repo.value = await resp.json();
      defaultBranch.value = repo.value.default_branch || 'main';
      topics.value = repo.value.topics || [];
    }
  } catch { /* empty */ }
}

async function loadTree() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/contents/`, {headers});
    if (resp.ok) treeEntries.value = await resp.json();
  } catch { /* empty */ }
}

async function loadLastCommit() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/commits?limit=1`, {headers});
    if (resp.ok) {
      const commits = await resp.json();
      lastCommit.value = commits[0] || null;
    }
  } catch { /* empty */ }
}

async function loadReadme() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/raw/README.md`, {headers});
    if (resp.ok) {
      const md = await resp.text();
      const renderResp = await fetch(`${apiBase}/markdown`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', ...headers},
        body: JSON.stringify({Context: `${owner}/${repoName}`, Mode: 'gfm', Text: md}),
      });
      if (renderResp.ok) readme.value = await renderResp.text();
    }
  } catch { /* empty */ }
}

async function loadReleases() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/releases?limit=5`, {headers});
    if (resp.ok) releases.value = await resp.json();
  } catch { /* empty */ }
}

async function loadLanguages() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/languages`, {headers});
    if (resp.ok) {
      const data = await resp.json();
      const total = Object.values(data).reduce((s: number, v: any) => s + v, 0) as number;
      languages.value = Object.entries(data).map(([name, bytes]) => ({
        name,
        percentage: total > 0 ? Math.round(((bytes as number) / total) * 100) : 0,
      })).sort((a, b) => b.percentage - a.percentage);
    }
  } catch { /* empty */ }
}

onMounted(async () => {
  await loadRepo();
  await Promise.all([loadTree(), loadLastCommit(), loadReadme(), loadReleases(), loadLanguages()]);
});
</script>
