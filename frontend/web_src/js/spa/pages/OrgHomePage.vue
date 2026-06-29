<!-- Translated from: templates/org/home.tmpl + org/header.tmpl -->
<template>
  <AppLayout :page-class="'organization profile'" :title="org?.full_name || org?.username || 'Organization'">
    <div class="ui container">
      <div class="ui mobile reversed stackable grid">
        <!-- Main content column -->
        <div class="ui eleven wide column">
          <div v-if="org?.description" id="readme_profile" class="render-content markup">{{ org.description }}</div>
          <SharedRepoSearch v-model:search="keyword" v-model:sort="sort" :loading="loading" @search="loadRepos"/>
          <div class="divider"></div>
          <div v-if="!repos.length" class="empty-placeholder tw-text-center tw-py-8">
            <h2>No repositories</h2>
            <p>This organization doesn't have any repositories yet.</p>
          </div>
          <SharedRepoList v-else :repos="repos"/>
          <BasePaginate :total="total" :page="page" :limit="limit" @page-change="changePage"/>
        </div>
        <!-- Sidebar -->
        <div class="ui five wide column">
          <div v-if="org?.avatar_url" class="tw-text-center tw-mb-4">
            <img :src="org.avatar_url" class="ui circular image" width="100">
          </div>
          <h2>{{ org?.full_name || org?.username }}</h2>
          <div v-if="org?.location" class="tw-my-2"><i class="octicon-location"></i> {{ org.location }}</div>
          <div v-if="org?.website" class="tw-my-2"><a :href="org.website" target="_blank" rel="nofollow noopener">{{ org.website }}</a></div>
          <div class="divider"></div>
          <div v-if="members.length">
            <h4 class="ui top attached header flex-left-right">
              <strong>Members</strong>
              <RouterLink :to="`/${orgName}/members`" class="tw-text-text-light">{{ members.length }}</RouterLink>
            </h4>
            <div class="ui attached segment tw-flex tw-flex-wrap tw-gap-2">
              <RouterLink v-for="m in members" :key="m.id" :to="`/${m.login}`">
                <img :src="m.avatar_url" :alt="m.login" width="32" height="32" class="ui circular image" :title="m.login">
              </RouterLink>
            </div>
          </div>
          <div v-if="teams.length" class="tw-mt-4">
            <h4 class="ui top attached header flex-left-right">
              <strong>Teams</strong>
              <RouterLink :to="`/${orgName}/teams`" class="tw-text-text-light">{{ teams.length }}</RouterLink>
            </h4>
            <div class="ui attached segment">
              <div v-for="t in teams" :key="t.id" class="tw-mb-2">
                <RouterLink :to="`/${orgName}/teams/${t.name?.toLowerCase()}`"><strong>{{ t.name }}</strong></RouterLink>
                <p class="tw-text-text-light">{{ t.members_count || 0 }} members · {{ t.repo_count || 0 }} repos</p>
              </div>
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
import SharedRepoSearch from '../components/SharedRepoSearch.vue';
import SharedRepoList from '../components/SharedRepoList.vue';
import BasePaginate from '../components/BasePaginate.vue';
import {apiBase} from '../spaconfig.ts';

const route = useRoute();
const orgName = route.params.orgname as string;
const token = localStorage.getItem('gitea-spa-token') || '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const org = ref<any>(null);
const repos = ref<any[]>([]);
const members = ref<any[]>([]);
const teams = ref<any[]>([]);
const keyword = ref('');
const sort = ref('newest');
const page = ref(1);
const limit = ref(20);
const total = ref(0);
const loading = ref(false);

async function loadOrg() {
  try {
    const resp = await fetch(`${apiBase}/orgs/${orgName}`, {headers});
    if (resp.ok) org.value = await resp.json();
  } catch { /* empty */ }
}

async function loadRepos() {
  loading.value = true;
  try {
    const params = new URLSearchParams({page: String(page.value), limit: String(limit.value), sort: sort.value});
    if (keyword.value) params.set('q', keyword.value);
    const resp = await fetch(`${apiBase}/orgs/${orgName}/repos?${params}`, {headers});
    if (resp.ok) repos.value = await resp.json();
    total.value = Number(resp.headers.get('x-total-count')) || repos.value.length;
  } catch { /* empty */ } finally { loading.value = false; }
}

async function loadMembers() {
  try {
    const resp = await fetch(`${apiBase}/orgs/${orgName}/members`, {headers});
    if (resp.ok) members.value = await resp.json();
  } catch { /* empty */ }
}

async function loadTeams() {
  try {
    const resp = await fetch(`${apiBase}/orgs/${orgName}/teams`, {headers});
    if (resp.ok) teams.value = await resp.json();
  } catch { /* empty */ }
}

function changePage(p: number) { page.value = p; loadRepos(); }

onMounted(async () => {
  await Promise.all([loadOrg(), loadRepos(), loadMembers(), loadTeams()]);
});
</script>
