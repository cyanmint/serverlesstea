<!-- Translated from: templates/explore/repos.tmpl + explore/navbar.tmpl -->
<template>
  <AppLayout page-class="explore" title="Explore">
    <div class="ui container">
      <ExploreNavbar active="repos"/>
      <SharedRepoSearch v-model:search="keyword" v-model:sort="sort" :loading="loading" @search="loadRepos"/>
      <div class="divider"></div>
      <SharedRepoList :repos="repos"/>
      <BasePaginate :total="total" :page="page" :limit="limit" @page-change="changePage"/>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import ExploreNavbar from '../components/ExploreNavbar.vue';
import SharedRepoSearch from '../components/SharedRepoSearch.vue';
import SharedRepoList from '../components/SharedRepoList.vue';
import BasePaginate from '../components/BasePaginate.vue';
import {searchRepos} from '../api/index.ts';

const route = useRoute();
const router = useRouter();
const keyword = ref((route.query.q as string) || '');
const sort = ref((route.query.sort as string) || 'newest');
const page = ref(Number(route.query.page) || 1);
const limit = ref(20);
const total = ref(0);
const repos = ref<any[]>([]);
const loading = ref(false);

async function loadRepos() {
  loading.value = true;
  try {
    const data = await searchRepos({q: keyword.value, sort: sort.value, page: page.value, limit: limit.value});
    repos.value = data.data || [];
    total.value = data.headers?.['x-total-count'] ? Number(data.headers['x-total-count']) : repos.value.length;
  } catch { /* empty */ } finally {
    loading.value = false;
  }
}

function changePage(p: number) {
  page.value = p;
  router.replace({query: {...route.query, page: String(p)}});
  loadRepos();
}

onMounted(() => loadRepos());
</script>
