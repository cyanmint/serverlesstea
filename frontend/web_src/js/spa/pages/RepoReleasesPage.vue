<template>
  <AppLayout page-class="repository releases">
    <RepoNav
      :owner="owner"
      :repo-name="repoName"
      active-tab="releases"
      :repo="repo"
      :current-user="currentUser"
      :starred="starred"
      :star-loading="starLoading"
      @toggle-star="toggleStar"
    />

    <div class="ui container">
      <div v-if="loading" class="tw-py-8">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message"><p>{{ error }}</p></div>
      <div v-else-if="releases.length === 0" class="ui placeholder segment">
        <div class="tw-text-center tw-py-8 tw-text-gray-500">No releases yet.</div>
      </div>
      <div v-else id="release-list">
        <div
          v-for="release in releases"
          :key="release.id"
          class="release-entry"
          :class="{'latest': !tagParam && !isLatest && releases.indexOf(release) === 0}"
        >
          <div class="release-left tw-hidden tw-md:tw-block">
            <img
              v-if="release.author?.avatar_url"
              :src="release.author.avatar_url"
              :alt="release.author.login"
              class="ui avatar image"
            >
          </div>
          <div class="release-right">
            <h4 class="release-tag">
              <RouterLink :to="`/${owner}/${repoName}/releases/tag/${release.tag_name}`">
                <SvgIcon name="octicon-tag" :size="16" class="tw-mr-1"/>{{ release.tag_name }}
              </RouterLink>
              <span v-if="release.prerelease" class="ui yellow label tw-ml-2">Pre-release</span>
              <span v-if="release.draft" class="ui grey label tw-ml-2">Draft</span>
            </h4>
            <div class="release-header">
              <div class="flex-text-block">
                <a :href="release.html_url" class="release-title">{{ release.name || release.tag_name }}</a>
              </div>
            </div>
            <div class="release-body markup">
              <p v-if="release.body" class="tw-text-sm tw-whitespace-pre-wrap">{{ release.body }}</p>
            </div>
            <details class="download">
              <summary>
                <SvgIcon name="octicon-package" :size="16" class="tw-mr-1"/>
                Assets
                <span class="ui label">{{ (release.assets?.length ?? 0) + 2 }}</span>
              </summary>
              <ul class="list">
                <li v-for="asset in release.assets" :key="asset.id">
                  <a :href="asset.browser_download_url" rel="nofollow">
                    <SvgIcon name="octicon-package" :size="16" class="tw-mr-1"/>
                    {{ asset.name }}
                  </a>
                  <span class="tw-text-gray-500 tw-text-sm tw-ml-2">{{ formatSize(asset.size) }}</span>
                </li>
                <li>
                  <a :href="release.zipball_url" rel="nofollow">
                    <SvgIcon name="octicon-file-zip" :size="16" class="tw-mr-1"/>Source code (zip)
                  </a>
                </li>
                <li>
                  <a :href="release.tarball_url" rel="nofollow">
                    <SvgIcon name="octicon-file-zip" :size="16" class="tw-mr-1"/>Source code (tar.gz)
                  </a>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>

      <div v-if="releases.length > 0 && !tagParam && !isLatest" class="ui pagination menu tw-my-4">
        <a class="item" :class="{disabled: page <= 1}" @click="page > 1 && changePage(page - 1)">Previous</a>
        <a class="item active">{{ page }}</a>
        <a class="item" :class="{disabled: releases.length < pageSize}" @click="releases.length >= pageSize && changePage(page + 1)">Next</a>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoNav from '../components/RepoNav.vue';
import {SvgIcon} from '../../svg.ts';
import {getRepo, getRepoReleases, getRepoReleaseByTag, getLatestRelease, getCurrentUser, isRepoStarred, starRepo, unstarRepo, type Release, type Repository, type User} from '../api/index.ts';

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
const repo = ref<Repository | null>(null);
const currentUser = ref<User | null>(null);
const starred = ref(false);
const starLoading = ref(false);

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function changePage(p: number) {
  page.value = p;
}

async function toggleStar() {
  if (!currentUser.value) return;
  starLoading.value = true;
  try {
    if (starred.value) {
      await unstarRepo(owner.value, repoName.value);
    } else {
      await starRepo(owner.value, repoName.value);
    }
    starred.value = !starred.value;
    if (repo.value) {
      repo.value = {...repo.value, stars_count: repo.value.stars_count + (starred.value ? 1 : -1)};
    }
  } catch {
    // ignore
  } finally {
    starLoading.value = false;
  }
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
onMounted(async () => {
  [repo.value, currentUser.value] = await Promise.all([
    getRepo(owner.value, repoName.value).catch(() => null),
    getCurrentUser(),
  ]);
  if (currentUser.value) {
    starred.value = await isRepoStarred(owner.value, repoName.value).catch(() => false);
  }
  await load();
});
</script>
