<template>
  <AppLayout>
    <div class="ui container tw-py-4">
      <div class="tw-flex tw-items-center tw-gap-2 tw-mb-4">
        <RouterLink :to="`/${owner}/${repoName}`" class="tw-text-blue-600 hover:tw-underline tw-font-medium">
          {{ owner }}/{{ repoName }}
        </RouterLink>
        <span class="tw-text-gray-400">/</span>
        <span class="tw-font-semibold">Branches</span>
      </div>

      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>
      <div v-else class="tw-border tw-rounded">
        <div
          v-for="branch in branches"
          :key="branch.name"
          class="tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-3 tw-border-b last:tw-border-b-0 hover:tw-bg-gray-50"
        >
          <span class="tw-font-mono tw-text-sm tw-flex-1">
            🌿 {{ branch.name }}
            <span v-if="branch.name === defaultBranch" class="tw-ml-2 ui tiny olive label">default</span>
          </span>
          <span class="tw-text-xs tw-text-gray-500">
            {{ branch.commit.committer?.date ? formatDate(branch.commit.committer.date) : '' }}
          </span>
          <RouterLink
            :to="`/${owner}/${repoName}/src/branch/${branch.name}`"
            class="ui tiny button"
          >
            Browse
          </RouterLink>
          <RouterLink
            :to="`/${owner}/${repoName}/commits/branch/${branch.name}`"
            class="ui tiny basic button"
          >
            Commits
          </RouterLink>
        </div>
      </div>

      <div v-if="branches.length > 0" class="tw-flex tw-justify-center tw-mt-4 tw-gap-2">
        <button class="ui button" :disabled="page <= 1" @click="page--">Previous</button>
        <span class="ui label tw-self-center">Page {{ page }}</span>
        <button class="ui button" :disabled="branches.length < pageSize" @click="page++">Next</button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getRepo, getRepoBranches, type Branch} from '../api/index.ts';

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);

const branches = ref<Branch[]>([]);
const defaultBranch = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
const page = ref(1);
const pageSize = 20;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
}

async function load() {
  if (!owner.value || !repoName.value) return;
  loading.value = true;
  error.value = null;
  try {
    const [repoData, branchList] = await Promise.all([
      getRepo(owner.value, repoName.value),
      getRepoBranches(owner.value, repoName.value, {page: page.value, limit: pageSize}),
    ]);
    defaultBranch.value = repoData.default_branch;
    // put default branch first
    branches.value = branchList.sort((a, b) => {
      if (a.name === defaultBranch.value) return -1;
      if (b.name === defaultBranch.value) return 1;
      return a.name.localeCompare(b.name);
    });
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

watch([owner, repoName, page], load);
onMounted(load);
</script>
