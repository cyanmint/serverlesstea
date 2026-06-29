<!-- Translated from: templates/explore/users.tmpl (orgs variant) -->
<template>
  <AppLayout page-class="explore users" title="Explore Organizations">
    <div class="ui container">
      <ExploreNavbar active="organizations"/>
      <form class="ui form tw-mb-4" @submit.prevent="loadOrgs">
        <div class="ui action input tw-w-full">
          <input v-model="keyword" type="text" placeholder="Search organizations…">
          <button class="ui primary button" type="submit">Search</button>
        </div>
      </form>
      <div class="flex-divided-list items-with-main">
        <div v-for="org in orgs" :key="org.id" class="item tw-flex tw-items-center tw-gap-4 tw-py-3">
          <img :src="org.avatar_url" width="48" height="48" class="ui circular image">
          <div class="item-main">
            <div class="item-title">
              <RouterLink :to="`/${org.username}`"><strong>{{ org.full_name || org.username }}</strong></RouterLink>
            </div>
            <div class="item-body tw-text-text-light">
              <span v-if="org.location" class="tw-mr-3">📍 {{ org.location }}</span>
              <span v-if="org.description">{{ org.description }}</span>
            </div>
          </div>
        </div>
        <div v-if="!loading && !orgs.length" class="item tw-py-4 tw-text-center tw-text-text-light">No results</div>
      </div>
      <BasePaginate :total="total" :page="page" :limit="limit" @page-change="changePage"/>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import ExploreNavbar from '../components/ExploreNavbar.vue';
import BasePaginate from '../components/BasePaginate.vue';
import {apiBase} from '../spaconfig.ts';

const orgs = ref<any[]>([]);
const keyword = ref('');
const page = ref(1);
const limit = ref(20);
const total = ref(0);
const loading = ref(false);

async function loadOrgs() {
  loading.value = true;
  try {
    const params = new URLSearchParams({page: String(page.value), limit: String(limit.value)});
    if (keyword.value) params.set('q', keyword.value);
    const resp = await fetch(`${apiBase}/orgs?${params}`);
    if (resp.ok) {
      orgs.value = await resp.json();
      total.value = Number(resp.headers.get('x-total-count')) || orgs.value.length;
    }
  } catch { /* empty */ } finally { loading.value = false; }
}

function changePage(p: number) { page.value = p; loadOrgs(); }

onMounted(() => loadOrgs());
</script>
