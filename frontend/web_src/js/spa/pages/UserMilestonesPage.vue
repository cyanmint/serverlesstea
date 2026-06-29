<!-- Translated from: templates/user/dashboard/milestones.tmpl -->
<template>
  <AppLayout page-class="dashboard issues repository milestones" title="Milestones">
    <DashboardNav/>
    <div class="ui container">
      <div class="flex-container">
        <div class="flex-container-nav">
          <div class="ui secondary vertical filter menu tw-bg-transparent">
            <div class="item">
              Milestones <strong>{{ totalMilestones }}</strong>
            </div>
          </div>
        </div>
        <div class="flex-container-main">
          <div class="list-header">
            <div class="small-menu-items ui compact tiny menu">
              <a :class="['item', {active: state === 'open'}]" @click="state='open'; loadMilestones()">
                Open {{ openCount }}
              </a>
              <a :class="['item', {active: state === 'closed'}]" @click="state='closed'; loadMilestones()">
                Closed {{ closedCount }}
              </a>
            </div>
            <form class="ui form tw-ml-auto" @submit.prevent="loadMilestones">
              <div class="ui action input">
                <input v-model="keyword" type="text" placeholder="Search milestones…">
                <button class="ui button" type="submit">Search</button>
              </div>
            </form>
          </div>
          <div class="milestone-list tw-mt-4">
            <div v-for="ms in milestones" :key="ms.id" class="milestone-item tw-border-b tw-pb-4 tw-mb-4">
              <h3><RouterLink :to="`/${ms.repo?.full_name || ''}/milestone/${ms.id}`">{{ ms.title }}</RouterLink></h3>
              <div class="tw-flex tw-gap-4 tw-text-text-light tw-text-sm">
                <span v-if="ms.due_on">Due: {{ formatDate(ms.due_on) }}</span>
                <span>{{ ms.open_issues || 0 }} open / {{ ms.closed_issues || 0 }} closed</span>
              </div>
              <div v-if="ms.open_issues || ms.closed_issues" class="ui progress tw-mt-2">
                <div class="bar" :style="{width: `${(ms.open_issues + ms.closed_issues) > 0 ? Math.round((ms.closed_issues / (ms.open_issues + ms.closed_issues)) * 100) : 0}%`}"></div>
              </div>
            </div>
            <div v-if="!loading && !milestones.length" class="tw-text-center tw-py-8 tw-text-text-light">No milestones found</div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import DashboardNav from '../components/DashboardNav.vue';
import {apiBase} from '../spaconfig.ts';

const token = localStorage.getItem('gitea-spa-token') || '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const milestones = ref<any[]>([]);
const state = ref('open');
const keyword = ref('');
const totalMilestones = ref(0);
const openCount = ref(0);
const closedCount = ref(0);
const loading = ref(false);

function formatDate(d: string) { return d ? new Date(d).toLocaleDateString() : ''; }

async function loadMilestones() {
  loading.value = true;
  try {
    // Note: Gitea API doesn't have a global milestones endpoint; use user's repos milestones
    const resp = await fetch(`${apiBase}/user/repos`, {headers});
    if (resp.ok) {
      const repos = await resp.json();
      const allMs: any[] = [];
      for (const repo of repos.slice(0, 10)) {
        const msResp = await fetch(`${apiBase}/repos/${repo.full_name}/milestones?state=${state.value}`, {headers});
        if (msResp.ok) {
          const ms = await msResp.json();
          allMs.push(...ms.map((m: any) => ({...m, repo})));
        }
      }
      milestones.value = keyword.value
        ? allMs.filter(m => m.title.toLowerCase().includes(keyword.value.toLowerCase()))
        : allMs;
      totalMilestones.value = milestones.value.length;
    }
  } catch { /* empty */ } finally { loading.value = false; }
}

onMounted(() => loadMilestones());
</script>
