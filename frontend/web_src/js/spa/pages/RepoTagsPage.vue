<!-- Translated from: templates/repo/tag/list.tmpl -->
<template>
  <AppLayout :page-class="'repository tags'" :title="`Tags - ${owner}/${repoName}`">
    <RepoHeader :owner="owner" :repo-name="repoName"/>
    <div class="ui container">
      <BaseAlert :flash="flash"/>
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <h3>Tags ({{ tags.length }})</h3>
        <div class="tw-flex tw-gap-2">
          <RouterLink :to="`/${owner}/${repoName}/releases`" class="ui small button">Releases</RouterLink>
          <RouterLink :to="`/${owner}/${repoName}/tags`" class="ui small button active">Tags</RouterLink>
        </div>
      </div>
      <div class="ui attached segment">
        <form class="ui form" @submit.prevent="loadTags">
          <div class="ui action input tw-w-full">
            <input v-model="keyword" type="text" placeholder="Search tags…">
            <button class="ui primary button" type="submit">Search</button>
          </div>
        </form>
      </div>
      <div class="ui divided list">
        <div v-for="tag in tags" :key="tag.name" class="item tw-p-4">
          <h3 class="tw-mb-2">
            <RouterLink :to="`/${owner}/${repoName}/src/tag/${tag.name}`">{{ tag.name }}</RouterLink>
          </h3>
          <div class="tw-flex tw-gap-4 tw-text-text-light">
            <span v-if="tag.commit?.sha" class="tw-font-mono">{{ tag.commit.sha.substring(0, 10) }}</span>
            <a :href="`${apiBase}/repos/${owner}/${repoName}/archive/${tag.name}.zip`">ZIP</a>
            <a :href="`${apiBase}/repos/${owner}/${repoName}/archive/${tag.name}.tar.gz`">TAR.GZ</a>
          </div>
        </div>
      </div>
      <div v-if="!loading && !tags.length" class="tw-text-center tw-py-8 tw-text-text-light">No tags</div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import RepoHeader from '../components/RepoHeader.vue';
import {apiBase} from '../spaconfig.ts';
import {getStoredToken} from '../api/index.ts';

const route = useRoute();
const owner = route.params.owner as string;
const repoName = route.params.repo as string;
const token = getStoredToken() ?? '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const tags = ref<any[]>([]);
const keyword = ref('');
const loading = ref(false);
const flash = ref<{error?: string}>({});

async function loadTags() {
  loading.value = true;
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/tags`, {headers});
    if (resp.ok) {
      let all = await resp.json();
      if (keyword.value) {
        all = all.filter((t: any) => t.name.toLowerCase().includes(keyword.value.toLowerCase()));
      }
      tags.value = all;
    }
  } catch { /* empty */ } finally { loading.value = false; }
}

onMounted(() => loadTags());
</script>
