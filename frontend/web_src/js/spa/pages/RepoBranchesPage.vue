<template>
  <AppLayout page-class="ui repository branches">
    <RepoNav
      :owner="owner"
      :repo-name="repoName"
      active-tab="code"
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
      <div v-else class="ui attached table segment">
        <table class="ui very basic table">
          <tbody>
            <tr v-for="branch in branches" :key="branch.name" class="branches-content">
              <td class="branch-name">
                <div class="flex-text-block">
                  <SvgIcon name="octicon-git-branch" :size="16" class="tw-mr-2 tw-text-gray-500"/>
                  <RouterLink
                    :to="`/${owner}/${repoName}/src/branch/${branch.name}`"
                    class="tw-font-mono"
                  >
                    {{ branch.name }}
                  </RouterLink>
                  <span v-if="branch.name === defaultBranch" class="ui green basic mini label tw-ml-2">default</span>
                </div>
              </td>
              <td class="branch-updated tw-text-right tw-text-sm tw-text-gray-500">
                {{ branch.commit.committer?.date ? formatDate(branch.commit.committer.date) : '' }}
              </td>
              <td class="branch-ops tw-text-right">
                <RouterLink
                  :to="`/${owner}/${repoName}/src/branch/${branch.name}`"
                  class="ui tiny compact basic button"
                >
                  Browse
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="branches.length > 0" class="ui pagination menu tw-my-4">
        <a class="item" :class="{disabled: page <= 1}" @click="page > 1 && changePage(page - 1)">Previous</a>
        <a class="item active">{{ page }}</a>
        <a class="item" :class="{disabled: branches.length < pageSize}" @click="branches.length >= pageSize && changePage(page + 1)">Next</a>
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
import {getRepo, getRepoBranches, getCurrentUser, isRepoStarred, starRepo, unstarRepo, type Branch, type Repository, type User} from '../api/index.ts';

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);

const branches = ref<Branch[]>([]);
const defaultBranch = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
const page = ref(1);
const pageSize = 20;
const repo = ref<Repository | null>(null);
const currentUser = ref<User | null>(null);
const starred = ref(false);
const starLoading = ref(false);

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
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
    const branchList = await getRepoBranches(owner.value, repoName.value, {page: page.value, limit: pageSize});
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
onMounted(async () => {
  [repo.value, currentUser.value] = await Promise.all([
    getRepo(owner.value, repoName.value).catch(() => null),
    getCurrentUser(),
  ]);
  defaultBranch.value = repo.value?.default_branch ?? '';
  if (currentUser.value) {
    starred.value = await isRepoStarred(owner.value, repoName.value).catch(() => false);
  }
  await load();
});
</script>
