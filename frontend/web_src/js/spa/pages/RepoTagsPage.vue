<template>
  <AppLayout page-class="repository tags">
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
      <div v-else-if="tags.length === 0" class="ui placeholder segment">
        <div class="tw-text-center tw-py-8 tw-text-gray-500">No tags yet.</div>
      </div>
      <div v-else id="tags-table" class="ui segment">
        <table class="ui very basic table">
          <tbody>
            <tr v-for="tag in tags" :key="tag.name" class="tag-list-row">
              <td class="tag-name">
                <div class="flex-text-block">
                  <SvgIcon name="octicon-tag" :size="16" class="tw-mr-2 tw-text-gray-500"/>
                  <RouterLink
                    :to="`/${owner}/${repoName}/releases/tag/${tag.name}`"
                    class="tw-font-mono"
                  >
                    {{ tag.name }}
                  </RouterLink>
                </div>
                <p v-if="tag.message" class="tw-text-xs tw-text-gray-500 tw-mt-0.5 tw-pl-6">{{ tag.message }}</p>
              </td>
              <td class="tag-hash tw-text-right">
                <RouterLink
                  :to="`/${owner}/${repoName}/src/commit/${tag.commit.sha}`"
                  class="ui basic label tw-font-mono"
                >
                  {{ tag.commit.sha.slice(0, 7) }}
                </RouterLink>
              </td>
              <td class="tag-download tw-text-right">
                <a :href="tag.zipball_url" class="tw-text-blue-600 hover:tw-underline tw-mr-3">zip</a>
                <a :href="tag.tarball_url" class="tw-text-blue-600 hover:tw-underline">tar.gz</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="tags.length > 0" class="ui pagination menu tw-my-4">
        <a class="item" :class="{disabled: page <= 1}" @click="page > 1 && changePage(page - 1)">Previous</a>
        <a class="item active">{{ page }}</a>
        <a class="item" :class="{disabled: tags.length < pageSize}" @click="tags.length >= pageSize && changePage(page + 1)">Next</a>
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
import {getRepo, getRepoTags, getCurrentUser, isRepoStarred, starRepo, unstarRepo, type Tag, type Repository, type User} from '../api/index.ts';

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);

const tags = ref<Tag[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const page = ref(1);
const pageSize = 20;
const repo = ref<Repository | null>(null);
const currentUser = ref<User | null>(null);
const starred = ref(false);
const starLoading = ref(false);

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
    tags.value = await getRepoTags(owner.value, repoName.value, {page: page.value, limit: pageSize});
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

watch([owner, repoName, page], load);
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
