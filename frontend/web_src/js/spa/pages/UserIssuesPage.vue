<!-- Translated from: templates/user/dashboard/issues.tmpl -->
<template>
  <AppLayout page-class="dashboard issues" :title="isPulls ? 'Pull Requests' : 'Issues'">
    <DashboardNav/>
    <div class="ui container">
      <BaseAlert :flash="flash"/>
      <div class="flex-container">
        <!-- Left filter panel -->
        <div class="flex-container-nav">
          <div class="ui secondary vertical filter menu tw-bg-transparent">
            <a :class="['item', {active: viewType === 'your_repositories'}]" @click="viewType='your_repositories'; loadIssues()">
              In your repositories <strong>{{ counts.your_repositories || 0 }}</strong>
            </a>
            <a :class="['item', {active: viewType === 'assigned'}]" @click="viewType='assigned'; loadIssues()">
              Assigned to you <strong>{{ counts.assigned || 0 }}</strong>
            </a>
            <a :class="['item', {active: viewType === 'created_by'}]" @click="viewType='created_by'; loadIssues()">
              Created by you <strong>{{ counts.created_by || 0 }}</strong>
            </a>
            <a :class="['item', {active: viewType === 'mentioned'}]" @click="viewType='mentioned'; loadIssues()">
              Mentioning you <strong>{{ counts.mentioned || 0 }}</strong>
            </a>
          </div>
        </div>
        <!-- Main content -->
        <div class="flex-container-main content">
          <div class="list-header">
            <div class="small-menu-items ui compact tiny menu">
              <a :class="['item', {active: state === 'open'}]" @click="state='open'; loadIssues()">
                Open {{ openCount }}
              </a>
              <a :class="['item', {active: state === 'closed'}]" @click="state='closed'; loadIssues()">
                Closed {{ closedCount }}
              </a>
            </div>
            <form class="ui form tw-ml-auto" @submit.prevent="loadIssues">
              <div class="ui action input">
                <input v-model="keyword" type="text" :placeholder="isPulls ? 'Search pull requests…' : 'Search issues…'">
                <button class="ui button" type="submit">Search</button>
              </div>
            </form>
          </div>
          <div class="issue-list-container tw-mt-2">
            <div v-for="issue in issues" :key="issue.id" class="flex-item tw-py-2">
              <div class="flex-item-leading">
                <span :class="issue.state === 'open' ? 'tw-text-green' : 'tw-text-red'">●</span>
              </div>
              <div class="flex-item-main">
                <div class="flex-item-title">
                  <RouterLink :to="`/${issue.repository?.full_name || ''}/${isPulls ? 'pulls' : 'issues'}/${issue.number}`">
                    {{ issue.title }}
                  </RouterLink>
                </div>
                <div class="flex-item-body tw-text-text-light">
                  {{ issue.repository?.full_name }} #{{ issue.number }} · {{ formatDate(issue.created_at) }}
                </div>
              </div>
            </div>
            <div v-if="!loading && !issues.length" class="tw-text-center tw-py-8 tw-text-text-light">No results found</div>
          </div>
          <BasePaginate :total="total" :page="page" :limit="limit" @page-change="changePage"/>
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
import DashboardNav from '../components/DashboardNav.vue';
import BasePaginate from '../components/BasePaginate.vue';
import {apiBase} from '../spaconfig.ts';
import {getStoredToken} from '../api/index.ts';

const route = useRoute();
const isPulls = route.path.includes('pulls');
const token = getStoredToken() ?? '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const issues = ref<any[]>([]);
const viewType = ref('your_repositories');
const state = ref('open');
const keyword = ref('');
const page = ref(1);
const limit = ref(20);
const total = ref(0);
const openCount = ref(0);
const closedCount = ref(0);
const loading = ref(false);
const flash = ref<{error?: string}>({});
const counts = ref<Record<string, number>>({});

function formatDate(d: string) { return d ? new Date(d).toLocaleDateString() : ''; }

async function loadIssues() {
  loading.value = true;
  try {
    const type = isPulls ? 'pulls' : 'issues';
    const params = new URLSearchParams({type, state: state.value, page: String(page.value), limit: String(limit.value)});
    if (keyword.value) params.set('q', keyword.value);
    const resp = await fetch(`${apiBase}/repos/search?${params}`, {headers});
    if (resp.ok) {
      issues.value = await resp.json();
      total.value = Number(resp.headers.get('x-total-count')) || issues.value.length;
    }
  } catch { /* empty */ } finally { loading.value = false; }
}

function changePage(p: number) { page.value = p; loadIssues(); }

onMounted(() => loadIssues());
</script>
