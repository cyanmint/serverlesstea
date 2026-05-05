<template>
  <AppLayout page-class="repository wiki view">
    <RepoNav
      :owner="owner"
      :repo-name="repoName"
      active-tab="wiki"
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

      <!-- Single wiki page view — matches templates/repo/wiki/view.tmpl -->
      <div v-else-if="currentPage" class="flex-container">
        <div class="flex-container-main">
          <div class="ui segment wiki-content-main">
            <div class="wiki-content-header">
              <h2 class="ui medium header wiki-content-title">{{ currentPage.title }}</h2>
              <div class="wiki-content-actions">
                <span class="tw-text-sm tw-text-gray-500">
                  Last updated by
                  <a class="muted" :href="`/${currentPage.last_commit.author?.name}`">
                    {{ currentPage.last_commit.author?.name }}
                  </a>
                  · {{ formatDate(currentPage.last_commit.author.date) }}
                </span>
              </div>
            </div>
            <div class="wiki-content markup">
              <pre class="tw-text-sm tw-font-mono tw-bg-gray-50 tw-p-4 tw-rounded tw-overflow-x-auto tw-whitespace-pre-wrap">{{ decodedContent }}</pre>
            </div>
          </div>
        </div>
        <div class="flex-container-sidebar">
          <div class="ui segment wiki-sidebar">
            <h4 class="ui header">Pages</h4>
            <ul class="ui list">
              <li>
                <RouterLink :to="`/${owner}/${repoName}/wiki`" class="muted">Home</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Wiki page list -->
      <div v-else class="flex-container">
        <div class="flex-container-main">
          <div class="ui segment">
            <h2 class="ui medium header">Wiki Pages</h2>
            <div v-if="pages.length === 0" class="ui placeholder segment">
              <div class="tw-text-center tw-py-8 tw-text-gray-500">No wiki pages yet.</div>
            </div>
            <div v-else class="ui divided list">
              <div
                v-for="p in pages"
                :key="p.title"
                class="item"
              >
                <div class="content">
                  <RouterLink
                    :to="`/${owner}/${repoName}/wiki/${encodeURIComponent(p.title)}`"
                    class="header"
                  >
                    {{ p.title }}
                  </RouterLink>
                  <div class="description">{{ formatDate(p.last_commit.author.date) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoNav from '../components/RepoNav.vue';
import {getRepo, getWikiPage, listWikiPages, getCurrentUser, isRepoStarred, starRepo, unstarRepo, type WikiPage, type Repository, type User} from '../api/index.ts';

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
const repo = ref<Repository | null>(null);
const currentUser = ref<User | null>(null);
const starred = ref(false);
const starLoading = ref(false);

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
