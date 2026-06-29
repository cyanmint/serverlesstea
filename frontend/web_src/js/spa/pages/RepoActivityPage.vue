<!-- Translated from: templates/repo/activity.tmpl -->
<template>
  <AppLayout :page-class="'repository commits'" :title="`Activity - ${owner}/${repoName}`">
    <RepoHeader :owner="owner" :repo-name="repoName"/>
    <div class="ui container">
      <h3>Activity</h3>
      <div class="tw-flex tw-gap-4 tw-mb-4">
        <a v-for="period in periods" :key="period.value" :class="['ui small button', {primary: activePeriod === period.value}]" @click="activePeriod = period.value; loadActivity()">
          {{ period.label }}
        </a>
      </div>
      <div v-if="activity" class="ui grid">
        <div class="eight wide column">
          <div class="ui segment">
            <h4>Overview</h4>
            <ul>
              <li v-if="activity.active_prs !== undefined">{{ activity.active_prs }} Active Pull Requests</li>
              <li v-if="activity.merged_prs !== undefined">{{ activity.merged_prs }} Merged Pull Requests</li>
              <li v-if="activity.active_issues !== undefined">{{ activity.active_issues }} Active Issues</li>
              <li v-if="activity.closed_issues !== undefined">{{ activity.closed_issues }} Closed Issues</li>
            </ul>
          </div>
        </div>
        <div class="eight wide column">
          <div class="ui segment">
            <h4>Commits</h4>
            <ul>
              <li v-for="author in activity.authors || []" :key="author.login || author.name">
                {{ author.name || author.login }}: {{ author.commits }} commits
              </li>
            </ul>
            <p v-if="!activity.authors?.length" class="tw-text-text-light">No commit activity this period</p>
          </div>
        </div>
      </div>
      <div v-else-if="loading" class="tw-text-center tw-py-8">Loading…</div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoHeader from '../components/RepoHeader.vue';
import {apiBase} from '../spaconfig.ts';
import {getStoredToken} from '../api/index.ts';

const route = useRoute();
const owner = route.params.owner as string;
const repoName = route.params.repo as string;
const token = getStoredToken() ?? '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const periods = [{value: 'weekly', label: 'Week'}, {value: 'monthly', label: 'Month'}, {value: 'yearly', label: 'Year'}];
const activePeriod = ref('weekly');
const activity = ref<any>(null);
const loading = ref(false);

async function loadActivity() {
  loading.value = true;
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/activities/feeds`, {headers});
    if (resp.ok) activity.value = await resp.json();
    else activity.value = {active_prs: 0, merged_prs: 0, active_issues: 0, closed_issues: 0, authors: []};
  } catch { activity.value = {}; }
  finally { loading.value = false; }
}

onMounted(() => loadActivity());
</script>
