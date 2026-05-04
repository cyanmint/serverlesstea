<template>
  <AppLayout>
    <div class="ui container tw-py-4">
      <div class="tw-flex tw-items-center tw-gap-2 tw-mb-4">
        <RouterLink :to="`/${owner}/${repoName}`" class="tw-text-blue-600 hover:tw-underline tw-font-medium">
          {{ owner }}/{{ repoName }}
        </RouterLink>
        <span class="tw-text-gray-400">/</span>
        <span class="tw-font-semibold">Tags</span>
      </div>

      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="tags.length === 0" class="ui placeholder segment">
        <div class="tw-text-center tw-py-8 tw-text-gray-500">No tags yet.</div>
      </div>
      <table v-else class="ui celled table">
        <thead>
          <tr>
            <th>Tag</th>
            <th>Commit</th>
            <th>Downloads</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tag in tags" :key="tag.name">
            <td>
              <RouterLink
                :to="`/${owner}/${repoName}/releases/tag/${tag.name}`"
                class="tw-font-mono tw-text-blue-600 hover:tw-underline"
              >
                🏷️ {{ tag.name }}
              </RouterLink>
              <p v-if="tag.message" class="tw-text-xs tw-text-gray-500 tw-mt-0.5">{{ tag.message }}</p>
            </td>
            <td class="tw-font-mono tw-text-sm">
              <RouterLink
                :to="`/${owner}/${repoName}/commits/commit/${tag.commit.sha}`"
                class="tw-text-blue-600 hover:tw-underline"
              >
                {{ tag.commit.sha.slice(0, 7) }}
              </RouterLink>
            </td>
            <td class="tw-text-sm">
              <a :href="tag.zipball_url" class="tw-text-blue-600 hover:tw-underline tw-mr-3">zip</a>
              <a :href="tag.tarball_url" class="tw-text-blue-600 hover:tw-underline">tar.gz</a>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="tags.length > 0" class="tw-flex tw-justify-center tw-mt-4 tw-gap-2">
        <button class="ui button" :disabled="page <= 1" @click="page--">Previous</button>
        <span class="ui label tw-self-center">Page {{ page }}</span>
        <button class="ui button" :disabled="tags.length < pageSize" @click="page++">Next</button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getRepoTags, type Tag} from '../api/index.ts';

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);

const tags = ref<Tag[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const page = ref(1);
const pageSize = 20;

async function load() {
  if (!owner.value || !repoName.value) return;
  loading.value = true;
  error.value = null;
  try {
    tags.value = await getRepoTags(owner.value, repoName.value, {page: page.value, limit: pageSize});
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

watch([owner, repoName, page], load);
onMounted(load);
</script>
