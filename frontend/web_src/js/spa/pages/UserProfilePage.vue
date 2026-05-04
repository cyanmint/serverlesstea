<template>
  <AppLayout>
    <div class="ui container tw-py-6">
      <!-- Loading / error -->
      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <h3>User not found</h3>
        <p>{{ error }}</p>
      </div>

      <template v-else-if="user">
        <div class="tw-flex tw-gap-8">
          <!-- Left: profile card -->
          <div class="tw-w-64 tw-shrink-0">
            <img
              :src="user.avatar_url"
              :alt="user.login"
              class="tw-w-full tw-rounded-full tw-border tw-mb-4"
            >
            <h1 class="tw-text-2xl tw-font-bold">{{ user.full_name || user.login }}</h1>
            <p v-if="user.full_name" class="tw-text-gray-500 tw-text-lg tw-mt-0.5">{{ user.login }}</p>

            <div class="tw-mt-4 tw-space-y-2 tw-text-sm tw-text-gray-600">
              <div v-if="user.email" class="tw-flex tw-items-center tw-gap-2">
                <span>✉️</span> <a :href="`mailto:${user.email}`" class="hover:tw-underline">{{ user.email }}</a>
              </div>
              <div class="tw-flex tw-items-center tw-gap-2">
                <span>📅</span> Joined {{ joinedDate }}
              </div>
            </div>

            <!-- Orgs -->
            <div v-if="orgs.length > 0" class="tw-mt-4">
              <h4 class="tw-text-xs tw-font-semibold tw-text-gray-500 tw-uppercase tw-mb-2">Organizations</h4>
              <div class="tw-flex tw-flex-wrap tw-gap-2">
                <a
                  v-for="org in orgs"
                  :key="org.id"
                  :href="`${appSubUrl}/${org.login}`"
                  :title="org.login"
                >
                  <img :src="org.avatar_url" :alt="org.login" class="tw-w-8 tw-h-8 tw-rounded tw-border">
                </a>
              </div>
            </div>
          </div>

          <!-- Right: repositories -->
          <div class="tw-flex-1">
            <div class="tw-flex tw-items-center tw-mb-4">
              <h2 class="tw-text-xl tw-font-semibold">Repositories</h2>
              <span class="ui label tw-ml-2">{{ repos.length }}</span>
            </div>

            <div v-if="reposLoading" class="tw-py-8 tw-text-center">
              <div class="ui active centered inline loader"/>
            </div>
            <div v-else-if="repos.length === 0" class="tw-text-gray-500 tw-text-sm">
              No public repositories.
            </div>
            <div v-else class="tw-space-y-3">
              <div
                v-for="repo in repos"
                :key="repo.id"
                class="tw-border tw-rounded tw-px-4 tw-py-3 hover:tw-bg-gray-50"
              >
                <div class="tw-flex tw-items-start tw-justify-between">
                  <div>
                    <RouterLink
                      :to="`/${user.login}/${repo.name}`"
                      class="tw-font-semibold tw-text-blue-600 hover:tw-underline"
                    >
                      {{ repo.name }}
                    </RouterLink>
                    <span v-if="repo.private" class="ui mini label tw-ml-1">Private</span>
                    <span v-if="repo.fork" class="ui mini label tw-ml-1">Fork</span>
                    <span v-if="repo.archived" class="ui mini label tw-ml-1">Archived</span>
                    <p v-if="repo.description" class="tw-text-sm tw-text-gray-600 tw-mt-1">
                      {{ repo.description }}
                    </p>
                  </div>
                  <div class="tw-text-right tw-text-sm tw-text-gray-500 tw-shrink-0 tw-ml-4">
                    <div v-if="repo.language" class="tw-mb-1">{{ repo.language }}</div>
                    <div class="tw-flex tw-items-center tw-gap-2 tw-justify-end">
                      <span>⭐ {{ repo.stars_count }}</span>
                      <span>🍴 {{ repo.forks_count }}</span>
                    </div>
                    <div class="tw-text-xs tw-mt-1">Updated {{ timeAgo(repo.updated_at) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getUser, getUserRepos, getUserOrgs, type User, type Repository} from '../api/index.ts';

import {appSubUrl} from '../spaconfig.ts';

const route = useRoute();
const username = String(route.params.username);

const loading = ref(true);
const error = ref('');
const user = ref<User | null>(null);
const repos = ref<Repository[]>([]);
const orgs = ref<User[]>([]);
const reposLoading = ref(false);

const joinedDate = computed(() => {
  if (!user.value) return '';
  return new Date(user.value.created).toLocaleDateString(navigator.language || 'en-US', {year: 'numeric', month: 'long'});
});

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

onMounted(async () => {
  try {
    user.value = await getUser(username);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'User not found';
    loading.value = false;
    return;
  }
  loading.value = false;

  reposLoading.value = true;
  const [userRepos, userOrgs] = await Promise.all([
    getUserRepos(username, {limit: 30}).catch(() => []),
    getUserOrgs(username).catch(() => []),
  ]);
  repos.value = userRepos.sort((a, b) => b.stars_count - a.stars_count);
  orgs.value = userOrgs;
  reposLoading.value = false;
});
</script>
