<!-- Translated from: templates/repo/issue/list.tmpl + repo/issue/search.tmpl + repo/issue/filters.tmpl -->
<template>
  <AppLayout :page-class="'repository issue-list'" :title="`Issues - ${owner}/${repoName}`">
    <RepoHeader :owner="owner" :repo-name="repoName"/>
    <div class="ui container">
      <BaseAlert :flash="flash"/>
      <div class="list-header flex-text-block">
        <form class="ui form tw-flex-1" @submit.prevent="loadIssues">
          <div class="ui action input tw-w-full">
            <input v-model="keyword" type="text" placeholder="Search issues…">
            <button class="ui primary button" type="submit">Search</button>
          </div>
        </form>
        <RouterLink class="ui small button" :to="`/${owner}/${repoName}/labels`">Labels</RouterLink>
        <RouterLink class="ui small button" :to="`/${owner}/${repoName}/milestones`">Milestones</RouterLink>
        <RouterLink class="ui small primary button" :to="`/${owner}/${repoName}/issues/new`">New Issue</RouterLink>
      </div>
      <!-- State tabs -->
      <div class="small-menu-items ui compact tiny menu tw-my-4">
        <a :class="['item', {active: state === 'open'}]" @click="state='open'; loadIssues()">
          Open <span class="ui label">{{ openCount }}</span>
        </a>
        <a :class="['item', {active: state === 'closed'}]" @click="state='closed'; loadIssues()">
          Closed <span class="ui label">{{ closedCount }}</span>
        </a>
      </div>
      <!-- Issue list -->
      <div class="issue-list-container">
        <div v-for="issue in issues" :key="issue.number" class="flex-item tw-py-3">
          <div class="flex-item-leading">
            <span :class="issue.state === 'open' ? 'tw-text-green' : 'tw-text-red'">●</span>
          </div>
          <div class="flex-item-main">
            <div class="flex-item-title">
              <RouterLink :to="`/${owner}/${repoName}/issues/${issue.number}`">{{ issue.title }}</RouterLink>
              <span v-for="label in issue.labels" :key="label.id" class="ui label tw-ml-1" :style="{backgroundColor: '#' + label.color, color: '#fff'}">{{ label.name }}</span>
            </div>
            <div class="flex-item-body tw-text-text-light">
              #{{ issue.number }} opened {{ formatDate(issue.created_at) }} by {{ issue.user?.login }}
              <span v-if="issue.comments"> · {{ issue.comments }} comments</span>
            </div>
          </div>
        </div>
        <div v-if="!loading && !issues.length" class="tw-text-center tw-py-8 tw-text-text-light">No issues found</div>
      </div>
      <BasePaginate :total="total" :page="page" :limit="limit" @page-change="changePage"/>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import RepoHeader from '../components/RepoHeader.vue';
import BasePaginate from '../components/BasePaginate.vue';
import {apiBase} from '../spaconfig.ts';
import {getStoredToken} from '../api/index.ts';

const route = useRoute();
const owner = route.params.owner as string;
const repoName = route.params.repo as string;
const token = getStoredToken() ?? '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const issues = ref<any[]>([]);
const keyword = ref('');
const state = ref('open');
const page = ref(1);
const limit = ref(20);
const total = ref(0);
const openCount = ref(0);
const closedCount = ref(0);
const loading = ref(false);
const flash = ref<{error?: string}>({});

function formatDate(d: string) { return d ? new Date(d).toLocaleDateString() : ''; }

async function loadIssues() {
  loading.value = true;
  try {
    const params = new URLSearchParams({state: state.value, page: String(page.value), limit: String(limit.value), type: 'issues'});
    if (keyword.value) params.set('q', keyword.value);
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/issues?${params}`, {headers});
    if (resp.ok) {
      issues.value = await resp.json();
      total.value = Number(resp.headers.get('x-total-count')) || issues.value.length;
    }
  } catch { /* empty */ } finally { loading.value = false; }
}

async function loadCounts() {
  try {
    const [openResp, closedResp] = await Promise.all([
      fetch(`${apiBase}/repos/${owner}/${repoName}/issues?state=open&limit=1&type=issues`, {headers}),
      fetch(`${apiBase}/repos/${owner}/${repoName}/issues?state=closed&limit=1&type=issues`, {headers}),
    ]);
    openCount.value = Number(openResp.headers.get('x-total-count')) || 0;
    closedCount.value = Number(closedResp.headers.get('x-total-count')) || 0;
  } catch { /* empty */ }
}

function changePage(p: number) { page.value = p; loadIssues(); }

onMounted(async () => { await Promise.all([loadIssues(), loadCounts()]); });
</script>
