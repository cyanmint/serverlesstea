<!-- Translated from: templates/repo/commits.tmpl + repo/commits_table.tmpl -->
<template>
  <AppLayout :page-class="'repository commits'" :title="`Commits - ${owner}/${repoName}`">
    <RepoHeader :owner="owner" :repo-name="repoName"/>
    <div class="ui container">
      <div class="repo-button-row tw-mb-4 tw-flex tw-gap-2">
        <select v-model="branch" class="ui dropdown" @change="loadCommits">
          <option v-for="b in branches" :key="b.name" :value="b.name">{{ b.name }}</option>
        </select>
        <RouterLink :to="`/${owner}/${repoName}/graph`" class="ui basic small compact button">
          Commit Graph
        </RouterLink>
      </div>
      <!-- Commits table -->
      <div class="tw-flex tw-flex-col tw-gap-1">
        <div v-for="commit in commits" :key="commit.sha" class="flex-item tw-py-2">
          <div class="flex-item-main">
            <div class="flex-item-title">
              <RouterLink :to="`/${owner}/${repoName}/commit/${commit.sha}`">
                {{ commit.commit?.message?.split('\n')[0] }}
              </RouterLink>
            </div>
            <div class="flex-item-body tw-text-text-light">
              <span>{{ commit.commit?.author?.name }}</span>
              <span class="tw-ml-2">{{ formatDate(commit.commit?.author?.date) }}</span>
            </div>
          </div>
          <div class="flex-item-trailing tw-font-mono tw-text-sm">
            <RouterLink :to="`/${owner}/${repoName}/commit/${commit.sha}`" class="ui label">
              {{ commit.sha?.substring(0, 10) }}
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="!loading && !commits.length" class="tw-text-center tw-py-8 tw-text-text-light">No commits found</div>
      <BasePaginate :total="total" :page="page" :limit="limit" @page-change="changePage"/>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoHeader from '../components/RepoHeader.vue';
import BasePaginate from '../components/BasePaginate.vue';
import {apiBase} from '../spaconfig.ts';

const route = useRoute();
const owner = route.params.owner as string;
const repoName = route.params.repo as string;
const token = localStorage.getItem('gitea-spa-token') || '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const commits = ref<any[]>([]);
const branches = ref<any[]>([]);
const branch = ref((route.params.branch as string) || 'main');
const page = ref(1);
const limit = ref(30);
const total = ref(0);
const loading = ref(false);

function formatDate(d: string) { return d ? new Date(d).toLocaleDateString() : ''; }

async function loadBranches() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/branches`, {headers});
    if (resp.ok) branches.value = await resp.json();
    if (branches.value.length && !branches.value.find((b: any) => b.name === branch.value)) {
      branch.value = branches.value[0]?.name || 'main';
    }
  } catch { /* empty */ }
}

async function loadCommits() {
  loading.value = true;
  try {
    const params = new URLSearchParams({page: String(page.value), limit: String(limit.value), sha: branch.value});
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/commits?${params}`, {headers});
    if (resp.ok) {
      commits.value = await resp.json();
      total.value = Number(resp.headers.get('x-total-count')) || commits.value.length;
    }
  } catch { /* empty */ } finally { loading.value = false; }
}

function changePage(p: number) { page.value = p; loadCommits(); }

onMounted(async () => { await loadBranches(); await loadCommits(); });
</script>
