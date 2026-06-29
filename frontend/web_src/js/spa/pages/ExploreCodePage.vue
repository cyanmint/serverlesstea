<!-- Translated from: templates/explore/code.tmpl -->
<template>
  <AppLayout page-class="explore users" title="Explore Code">
    <div class="ui container">
      <ExploreNavbar active="code"/>
      <form class="ui form tw-mb-4" @submit.prevent="searchCode">
        <div class="ui action input tw-w-full">
          <input v-model="keyword" type="text" placeholder="Search code…" autofocus>
          <button class="ui primary button" type="submit">Search</button>
        </div>
      </form>
      <div v-if="results.length" class="code-search-results">
        <div v-for="result in results" :key="result.sha || result.path" class="tw-border-b tw-pb-4 tw-mb-4">
          <div class="tw-font-bold tw-mb-1">
            <RouterLink :to="`/${result.repository?.full_name}/src/branch/main/${result.path}`">
              {{ result.repository?.full_name }}/{{ result.path }}
            </RouterLink>
          </div>
          <pre v-if="result.content" class="tw-bg-gray-50 tw-p-2 tw-rounded tw-text-sm tw-overflow-x-auto"><code>{{ result.content }}</code></pre>
        </div>
      </div>
      <div v-else-if="searched && !loading" class="tw-text-center tw-py-8 tw-text-text-light">
        {{ keyword ? 'No code matches found' : 'Enter a search query to find code' }}
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import ExploreNavbar from '../components/ExploreNavbar.vue';
import {apiBase} from '../spaconfig.ts';

const keyword = ref('');
const results = ref<any[]>([]);
const loading = ref(false);
const searched = ref(false);

async function searchCode() {
  if (!keyword.value.trim()) return;
  loading.value = true;
  searched.value = true;
  try {
    const resp = await fetch(`${apiBase}/repos/search?q=${encodeURIComponent(keyword.value)}&type=code`);
    if (resp.ok) {
      const data = await resp.json();
      results.value = data.data || data || [];
    }
  } catch { /* empty */ } finally { loading.value = false; }
}
</script>
