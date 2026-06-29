<template>
  <AppLayout page-class="repository commits">
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
      <div v-else-if="commits.length === 0" class="ui placeholder segment">
        <div class="tw-text-center tw-py-8 tw-text-gray-500">No commits found.</div>
      </div>
      <div v-else class="ui segment commits-table">
        <table class="ui very basic table commits-list">
          <tbody>
            <tr
              v-for="c in commits"
              :key="c.sha"
              class="commits-list-item"
            >
              <td class="message">
                <a :href="`/${owner}/${repoName}/commit/${c.sha}`" class="tw-font-medium">
                  {{ firstLine(c.commit.message) }}
                </a>
              </td>
              <td class="author">
                <a :href="`/${c.commit.author?.name}`" class="muted">{{ c.commit.author?.name }}</a>
              </td>
              <td class="date tw-text-right tw-text-sm tw-text-gray-500">
                {{ formatDate(c.commit.author.date) }}
              </td>
              <td class="hash tw-text-right">
                <a :href="`/${owner}/${repoName}/commit/${c.sha}`" class="ui basic label tw-font-mono">
                  {{ c.sha.slice(0, 7) }}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="commits.length > 0" class="ui pagination menu tw-my-4">
        <a class="item" :class="{disabled: page <= 1}" @click="page > 1 && changePage(page - 1)">Previous</a>
        <a class="item active">{{ page }}</a>
        <a class="item" :class="{disabled: commits.length < pageSize}" @click="commits.length >= pageSize && changePage(page + 1)">Next</a>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoNav from '../components/RepoNav.vue';
import {getRepo, getRepoCommits, getCurrentUser, isRepoStarred, starRepo, unstarRepo, type Commit, type Repository, type User} from '../api/index.ts';

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
const repo = ref<Repository | null>(null);
const currentUser = ref<User | null>(null);
const starred = ref(false);
const starLoading = ref(false);

function firstLine(msg: string): string {
  return msg.split('\n')[0] ?? msg;
}

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
