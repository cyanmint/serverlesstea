<!-- Translated from: templates/repo/issue/list.tmpl (pulls variant) -->
<template>
  <AppLayout :page-class="'repository issue-list'" :title="`Pull Requests - ${owner}/${repoName}`">
    <RepoHeader :owner="owner" :repo-name="repoName"/>
    <div class="ui container">
      <BaseAlert :flash="flash"/>
      <div class="list-header flex-text-block">
        <form class="ui form tw-flex-1" @submit.prevent="loadPulls">
          <div class="ui action input tw-w-full">
            <input v-model="keyword" type="text" placeholder="Search pull requests…">
            <button class="ui primary button" type="submit">Search</button>
          </div>
        </form>
        <RouterLink class="ui small primary button" :to="`/${owner}/${repoName}/compare/main...main`">New Pull Request</RouterLink>
      </div>
      <div class="small-menu-items ui compact tiny menu tw-my-4">
        <a :class="['item', {active: state === 'open'}]" @click="state='open'; loadPulls()">
          Open <span class="ui label">{{ openCount }}</span>
        </a>
        <a :class="['item', {active: state === 'closed'}]" @click="state='closed'; loadPulls()">
          Closed <span class="ui label">{{ closedCount }}</span>
        </a>
      </div>
      <div class="issue-list-container">
        <div v-for="pr in pulls" :key="pr.number" class="flex-item tw-py-3">
          <div class="flex-item-leading">
            <span :class="pr.state === 'open' ? 'tw-text-green' : (pr.merged ? 'tw-text-purple' : 'tw-text-red')">●</span>
          </div>
          <div class="flex-item-main">
            <div class="flex-item-title">
              <RouterLink :to="`/${owner}/${repoName}/pulls/${pr.number}`">{{ pr.title }}</RouterLink>
            </div>
            <div class="flex-item-body tw-text-text-light">
              #{{ pr.number }} opened {{ formatDate(pr.created_at) }} by {{ pr.user?.login }}
            </div>
          </div>
        </div>
        <div v-if="!loading && !pulls.length" class="tw-text-center tw-py-8 tw-text-text-light">No pull requests found</div>
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

const route = useRoute();
const owner = route.params.owner as string;
const repoName = route.params.repo as string;
const token = localStorage.getItem('gitea-spa-token') || '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const pulls = ref<any[]>([]);
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

async function loadPulls() {
  loading.value = true;
  try {
    const params = new URLSearchParams({state: state.value, page: String(page.value), limit: String(limit.value), type: 'pulls'});
    if (keyword.value) params.set('q', keyword.value);
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/pulls?${params}`, {headers});
    if (resp.ok) {
      pulls.value = await resp.json();
      total.value = Number(resp.headers.get('x-total-count')) || pulls.value.length;
    }
  } catch { /* empty */ } finally { loading.value = false; }
}

async function loadCounts() {
  try {
    const [openResp, closedResp] = await Promise.all([
      fetch(`${apiBase}/repos/${owner}/${repoName}/pulls?state=open&limit=1`, {headers}),
      fetch(`${apiBase}/repos/${owner}/${repoName}/pulls?state=closed&limit=1`, {headers}),
    ]);
    openCount.value = Number(openResp.headers.get('x-total-count')) || 0;
    closedCount.value = Number(closedResp.headers.get('x-total-count')) || 0;
  } catch { /* empty */ }
}

function changePage(p: number) { page.value = p; loadPulls(); }

onMounted(async () => { await Promise.all([loadPulls(), loadCounts()]); });
</script>
