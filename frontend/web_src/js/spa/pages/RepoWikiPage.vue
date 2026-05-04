<template>
  <AppLayout>
    <div class="ui container tw-py-4">
      <div class="tw-flex tw-items-center tw-gap-2 tw-mb-4">
        <RouterLink :to="`/${owner}/${repoName}`" class="tw-text-blue-600 hover:tw-underline tw-font-medium">
          {{ owner }}/{{ repoName }}
        </RouterLink>
        <span class="tw-text-gray-400">/</span>
        <span class="tw-font-semibold">Wiki</span>
        <template v-if="pageTitle">
          <span class="tw-text-gray-400">/</span>
          <span>{{ pageTitle }}</span>
        </template>
      </div>

      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>

      <!-- Single wiki page view -->
      <template v-else-if="currentPage">
        <div class="tw-border tw-rounded tw-p-4">
          <h2 class="tw-text-xl tw-font-bold tw-mb-2">{{ currentPage.title }}</h2>
          <div class="tw-text-xs tw-text-gray-500 tw-mb-4">
            Last updated by {{ currentPage.last_commit.author.name }}
            · {{ formatDate(currentPage.last_commit.author.date) }}
          </div>
          <pre class="tw-text-sm tw-font-mono tw-bg-gray-50 tw-p-4 tw-rounded tw-overflow-x-auto tw-whitespace-pre-wrap">{{ decodedContent }}</pre>
        </div>
      </template>

      <!-- Wiki page list -->
      <template v-else>
        <h2 class="tw-text-lg tw-font-semibold tw-mb-3">Wiki Pages</h2>
        <div v-if="pages.length === 0" class="ui placeholder segment">
          <div class="tw-text-center tw-py-8 tw-text-gray-500">No wiki pages yet.</div>
        </div>
        <div v-else class="tw-border tw-rounded">
          <div
            v-for="p in pages"
            :key="p.title"
            class="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-3 tw-border-b last:tw-border-b-0 hover:tw-bg-gray-50"
          >
            <RouterLink
              :to="`/${owner}/${repoName}/wiki/${encodeURIComponent(p.title)}`"
              class="tw-text-blue-600 hover:tw-underline tw-font-medium"
            >
              📄 {{ p.title }}
            </RouterLink>
            <span class="tw-text-xs tw-text-gray-500">
              {{ formatDate(p.last_commit.author.date) }}
            </span>
          </div>
        </div>
      </template>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getWikiPage, listWikiPages, type WikiPage} from '../api/index.ts';

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);
const pageTitle = computed(() => {
  const pm = route.params.pathMatch;
  return Array.isArray(pm) ? pm.join('/') : (pm ?? '');
});

const currentPage = ref<WikiPage | null>(null);
const pages = ref<WikiPage[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const decodedContent = computed(() => {
  if (!currentPage.value) return '';
  try {
    return atob(currentPage.value.content_base64.replace(/\s/g, ''));
  } catch {
    return currentPage.value.content_base64;
  }
});

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
}

async function load() {
  if (!owner.value || !repoName.value) return;
  loading.value = true;
  error.value = null;
  currentPage.value = null;
  pages.value = [];
  try {
    if (pageTitle.value) {
      currentPage.value = await getWikiPage(owner.value, repoName.value, pageTitle.value);
    } else {
      pages.value = await listWikiPages(owner.value, repoName.value);
    }
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

watch([owner, repoName, pageTitle], load);
onMounted(load);
</script>
