<template>
  <AppLayout>
    <div v-if="loading" class="ui container tw-py-8">
      <div class="ui active centered inline loader"/>
    </div>

    <!-- Signed-in dashboard -->
    <div v-else-if="currentUser" class="ui container tw-py-4">
      <h1 class="ui header">
        {{ currentUser.full_name || currentUser.login }}'s Dashboard
      </h1>

      <div class="ui two column stackable grid">
        <!-- Recent repositories -->
        <div class="column">
          <h2 class="ui dividing header">Repositories</h2>
          <div v-if="reposLoading" class="ui active centered inline loader"/>
          <div v-else-if="repos.length === 0" class="ui placeholder segment">
            <p>You have no repositories yet.</p>
            <a :href="`${appSubUrl}/repo/create`" class="ui primary button">
              Create a repository
            </a>
          </div>
          <div v-else class="ui list">
            <a
              v-for="repo in repos"
              :key="repo.id"
              :href="repo.html_url"
              class="item tw-py-2 tw-flex tw-items-center tw-gap-2"
            >
              <span class="tw-font-medium">{{ repo.full_name }}</span>
              <span v-if="repo.private" class="ui mini label">Private</span>
              <span v-if="repo.archived" class="ui mini label">Archived</span>
            </a>
          </div>
        </div>

        <!-- Profile summary -->
        <div class="column">
          <h2 class="ui dividing header">Your Profile</h2>
          <div class="tw-flex tw-items-center tw-gap-4 tw-mb-4">
            <img :src="currentUser.avatar_url" :alt="currentUser.login" class="ui avatar image tw-w-16 tw-h-16">
            <div>
              <p class="tw-font-semibold tw-text-lg">{{ currentUser.full_name || currentUser.login }}</p>
              <p class="tw-text-gray-600">@{{ currentUser.login }}</p>
            </div>
          </div>
          <a :href="`${appSubUrl}/${currentUser.login}`" class="ui button">View Profile</a>
        </div>
      </div>
    </div>

    <!-- Signed-out landing -->
    <div v-else class="tw-mb-8 tw-px-8">
      <div class="center tw-py-12 tw-text-center">
        <img class="logo" width="180" height="180" :src="`${assetUrlPrefix}/img/logo.svg`" alt="Gitea">
        <div class="hero tw-mt-6">
          <h1 class="ui icon header title tw-text-4xl tw-font-bold">
            Git with a cup of tea
          </h1>
          <p class="tw-text-xl tw-text-gray-600 tw-mt-2">Painless self-hosted all-in-one software development service</p>
          <div class="tw-mt-6 tw-flex tw-gap-4 tw-justify-center">
            <RouterLink to="/explore/repos" class="ui primary large button">Explore</RouterLink>
            <RouterLink to="/user/login" class="ui large button">Sign In</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getCurrentUser, searchRepos, type User, type Repository} from '../api/index.ts';

import {appSubUrl, assetUrlPrefix} from '../spaconfig.ts';

const loading = ref(true);
const reposLoading = ref(false);
const currentUser = ref<User | null>(null);
const repos = ref<Repository[]>([]);

onMounted(async () => {
  try {
    currentUser.value = await getCurrentUser();
    if (currentUser.value) {
      reposLoading.value = true;
      const result = await searchRepos('', {limit: 30, sort: 'newest'});
      repos.value = result.data ?? [];
    }
  } catch (err) {
    console.error('HomePage: failed to load data', err);
  } finally {
    loading.value = false;
    reposLoading.value = false;
  }
});
</script>
