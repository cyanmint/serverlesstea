<template>
  <AppLayout>
    <div class="ui container tw-py-4">
      <!-- Breadcrumb -->
      <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-mb-4 tw-text-gray-600">
        <RouterLink :to="`/${owner}/${repoName}`" class="hover:tw-underline tw-text-blue-600 tw-font-medium">
          {{ owner }}/{{ repoName }}
        </RouterLink>
        <span>/</span>
        <span>{{ refType }}:{{ branchRef }}</span>
        <template v-if="filePath">
          <span v-for="(part, i) in pathParts" :key="i">/{{ part }}</span>
        </template>
      </div>

      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>

      <!-- Directory listing -->
      <template v-else-if="Array.isArray(contents)">
        <table class="ui celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in sortedContents" :key="entry.name">
              <td>
                <RouterLink :to="buildEntryPath(entry)" class="hover:tw-underline tw-text-blue-600">
                  {{ entry.type === 'dir' ? '📁' : '📄' }} {{ entry.name }}
                </RouterLink>
              </td>
              <td class="tw-text-gray-500 tw-text-sm">{{ entry.type }}</td>
            </tr>
          </tbody>
        </table>
      </template>

      <!-- File view -->
      <template v-else-if="contents">
        <div class="tw-border tw-rounded tw-overflow-hidden">
          <div class="tw-bg-gray-100 tw-px-4 tw-py-2 tw-flex tw-items-center tw-justify-between tw-border-b">
            <span class="tw-font-mono tw-text-sm">{{ contents.name }}</span>
            <a
              v-if="contents.download_url"
              :href="contents.download_url"
              class="tw-text-sm tw-text-blue-600 hover:tw-underline"
            >
              Raw
            </a>
          </div>
          <pre class="tw-p-4 tw-overflow-x-auto tw-text-sm tw-font-mono tw-bg-white tw-m-0">{{ fileContent }}</pre>
        </div>
      </template>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getRepoContents, type ContentsResponse} from '../api/index.ts';

const route = useRoute();

const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);
const refType = computed(() => route.params.refType as string);
const branchRef = computed(() => route.params.ref as string);
const filePath = computed(() => {
  const pm = route.params.pathMatch;
  return Array.isArray(pm) ? pm.join('/') : (pm ?? '');
});

const pathParts = computed(() => filePath.value ? filePath.value.split('/').filter(Boolean) : []);

const contents = ref<ContentsResponse | ContentsResponse[] | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const sortedContents = computed(() => {
  if (!Array.isArray(contents.value)) return [];
  return [...contents.value].sort((a, b) => {
    if (a.type === 'dir' && b.type !== 'dir') return -1;
    if (a.type !== 'dir' && b.type === 'dir') return 1;
    return a.name.localeCompare(b.name);
  });
});

const fileContent = computed(() => {
  if (Array.isArray(contents.value) || !contents.value) return '';
  try {
    return atob(contents.value.content.replace(/\s/g, ''));
  } catch {
    return contents.value.content;
  }
});

function buildEntryPath(entry: ContentsResponse): string {
  const base = `/${owner.value}/${repoName.value}/src/${refType.value}/${branchRef.value}`;
  return entry.path ? `${base}/${entry.path}` : base;
}

async function load() {
  if (!owner.value || !repoName.value || !branchRef.value) return;
  loading.value = true;
  error.value = null;
  contents.value = null;
  try {
    contents.value = await getRepoContents(owner.value, repoName.value, filePath.value, branchRef.value);
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

watch([owner, repoName, branchRef, filePath], load);
onMounted(load);
</script>
