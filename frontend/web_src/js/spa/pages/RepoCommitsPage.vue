<template>
  <AppLayout>
    <div class="ui container tw-py-4">
      <div class="tw-flex tw-items-center tw-gap-2 tw-mb-4">
        <RouterLink :to="`/${owner}/${repoName}`" class="tw-text-blue-600 hover:tw-underline tw-font-medium">
          {{ owner }}/{{ repoName }}
        </RouterLink>
        <span class="tw-text-gray-400">/</span>
        <span class="tw-font-semibold">Commits</span>
        <span class="tw-text-gray-500 tw-text-sm">· {{ refType }}:{{ branchRef }}</span>
      </div>

      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="commits.length === 0" class="ui placeholder segment">
        <div class="tw-text-center tw-py-8 tw-text-gray-500">No commits found.</div>
      </div>
      <div v-else class="tw-border tw-rounded">
        <div
          v-for="c in commits"
          :key="c.sha"
          class="tw-flex tw-items-start tw-gap-3 tw-px-4 tw-py-3 tw-border-b last:tw-border-b-0 hover:tw-bg-gray-50"
        >
          <div class="tw-flex-1 tw-min-w-0">
            <a :href="c.html_url" class="tw-font-medium hover:tw-underline tw-text-gray-900">
              {{ firstLine(c.commit.message) }}
            </a>
            <div class="tw-text-xs tw-text-gray-500 tw-mt-0.5">
              {{ c.commit.author.name }} · {{ formatDate(c.commit.author.date) }}
            </div>
          </div>
          <a :href="c.html_url" class="tw-font-mono tw-text-xs tw-text-blue-600 hover:tw-underline tw-whitespace-nowrap">
            {{ c.sha.slice(0, 7) }}
          </a>
        </div>
      </div>

      <div v-if="commits.length > 0" class="tw-flex tw-justify-center tw-mt-4 tw-gap-2">
        <button class="ui button" :disabled="page <= 1" @click="page--">Previous</button>
        <span class="ui label tw-self-center">Page {{ page }}</span>
        <button class="ui button" :disabled="commits.length < pageSize" @click="page++">Next</button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getRepoCommits, type Commit} from '../api/index.ts';

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);
const refType = computed(() => route.params.refType as string);
const branchRef = computed(() => route.params.ref as string);

const commits = ref<Commit[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const page = ref(1);
const pageSize = 20;

function firstLine(msg: string): string {
  return msg.split('\n')[0] ?? msg;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
}

async function load() {
  if (!owner.value || !repoName.value || !branchRef.value) return;
  loading.value = true;
  error.value = null;
  try {
    commits.value = await getRepoCommits(owner.value, repoName.value, {sha: branchRef.value, page: page.value, limit: pageSize});
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

watch([owner, repoName, branchRef, page], load);
onMounted(load);
</script>
