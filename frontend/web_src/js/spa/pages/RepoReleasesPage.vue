<template>
  <AppLayout>
    <div class="ui container tw-py-4">
      <div class="tw-flex tw-items-center tw-gap-2 tw-mb-4">
        <RouterLink :to="`/${owner}/${repoName}`" class="tw-text-blue-600 hover:tw-underline tw-font-medium">
          {{ owner }}/{{ repoName }}
        </RouterLink>
        <span class="tw-text-gray-400">/</span>
        <span class="tw-font-semibold">Releases</span>
      </div>

      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="releases.length === 0" class="ui placeholder segment">
        <div class="tw-text-center tw-py-8 tw-text-gray-500">No releases yet.</div>
      </div>
      <div v-else>
        <div
          v-for="release in releases"
          :key="release.id"
          class="tw-border tw-rounded tw-mb-4 tw-p-4"
          :class="{'tw-border-blue-300 tw-bg-blue-50': isCurrentTag(release)}"
        >
          <div class="tw-flex tw-items-start tw-justify-between tw-gap-4">
            <div class="tw-flex-1 tw-min-w-0">
              <h3 class="tw-text-lg tw-font-bold">
                <a :href="release.html_url" class="hover:tw-underline tw-text-gray-900">
                  {{ release.name || release.tag_name }}
                </a>
                <span v-if="release.prerelease" class="ui tiny yellow label tw-ml-2">pre-release</span>
                <span v-if="release.draft" class="ui tiny grey label tw-ml-2">draft</span>
              </h3>
              <div class="tw-text-sm tw-text-gray-600 tw-mb-2">
                🏷️ <code>{{ release.tag_name }}</code>
                · by {{ release.author.login }}
                · {{ formatDate(release.published_at || release.created_at) }}
              </div>
              <p v-if="release.body" class="tw-text-sm tw-text-gray-700 tw-whitespace-pre-wrap tw-truncate tw-max-h-20 tw-overflow-hidden">
                {{ release.body }}
              </p>
            </div>
          </div>
          <div v-if="release.assets?.length" class="tw-mt-3 tw-border-t tw-pt-3">
            <div class="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-1">Assets:</div>
            <div v-for="asset in release.assets" :key="asset.id" class="tw-text-sm">
              <a :href="asset.browser_download_url" class="hover:tw-underline tw-text-blue-600">
                📎 {{ asset.name }}
              </a>
              <span class="tw-text-gray-400 tw-ml-2">({{ formatSize(asset.size) }})</span>
            </div>
            <div class="tw-mt-1 tw-text-sm">
              <a :href="release.zipball_url" class="tw-text-blue-600 hover:tw-underline tw-mr-4">📦 Source (zip)</a>
              <a :href="release.tarball_url" class="tw-text-blue-600 hover:tw-underline">📦 Source (tar.gz)</a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="releases.length > 0 && !tagParam && !isLatest" class="tw-flex tw-justify-center tw-mt-4 tw-gap-2">
        <button class="ui button" :disabled="page <= 1" @click="page--">Previous</button>
        <span class="ui label tw-self-center">Page {{ page }}</span>
        <button class="ui button" :disabled="releases.length < pageSize" @click="page++">Next</button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getRepoReleases, getRepoReleaseByTag, getLatestRelease, type Release} from '../api/index.ts';

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);
const tagParam = computed(() => route.params.tag as string | undefined);
const isLatest = computed(() => route.path.endsWith('/releases/latest'));

const releases = ref<Release[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const page = ref(1);
const pageSize = 20;

function isCurrentTag(release: Release): boolean {
  return tagParam.value ? release.tag_name === tagParam.value : false;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function load() {
  if (!owner.value || !repoName.value) return;
  loading.value = true;
  error.value = null;
  try {
    if (isLatest.value) {
      const r = await getLatestRelease(owner.value, repoName.value);
      releases.value = [r];
    } else if (tagParam.value) {
      const r = await getRepoReleaseByTag(owner.value, repoName.value, tagParam.value);
      releases.value = [r];
    } else {
      releases.value = await getRepoReleases(owner.value, repoName.value, {page: page.value, limit: pageSize});
    }
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

watch([owner, repoName, tagParam, isLatest, page], load);
onMounted(load);
</script>
