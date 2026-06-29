<template>
  <AppLayout>
    <div role="main" class="page-content organization profile">
      <div v-if="loading" class="ui container tw-py-8">
        <div class="ui active centered inline loader"/>
      </div>

      <div v-else-if="error" class="ui container tw-py-6">
        <div class="ui negative message"><p>{{ error }}</p></div>
      </div>

      <template v-else-if="org">
        <!-- Org header -->
        <div class="ui container tw-flex tw-gap-4 tw-py-4">
          <div>
            <img :src="org.avatar_url" :alt="org.login" class="ui avatar image" style="width:100px;height:100px;border-radius:4px">
          </div>
          <div class="flex-relaxed-list">
            <div class="ui header tw-m-0">
              <span class="tw-text-2xl">{{ org.full_name || org.login }}</span>
            </div>
            <div v-if="org.description" class="tw-mt-1">{{ org.description }}</div>
          </div>
        </div>

        <!-- Repos list -->
        <div class="ui container">
          <div class="ui mobile reversed stackable grid">
            <div class="ui eleven wide column">
              <h4 class="ui top attached header">Repositories</h4>
              <div v-if="reposLoading" class="ui active centered inline loader"/>
              <div v-else-if="!repos.length" class="empty-placeholder">
                <h2>No repositories</h2>
                <p>This organization has no public repositories.</p>
              </div>
              <div v-else class="repository-list">
                <div v-for="r in repos" :key="r.id" class="item tw-py-2 tw-border-b last:tw-border-0">
                  <div class="tw-flex tw-justify-between tw-items-center">
                    <div>
                      <RouterLink :to="`/${r.full_name}`" class="tw-font-semibold">{{ r.name }}</RouterLink>
                      <span v-if="r.private" class="ui mini label tw-ml-1">Private</span>
                      <span v-if="r.fork" class="ui mini label tw-ml-1">Fork</span>
                      <p v-if="r.description" class="tw-text-sm tw-text-gray-600 tw-mt-0.5">{{ r.description }}</p>
                    </div>
                    <div class="tw-text-sm tw-text-gray-500">
                      <span v-if="r.language" class="tw-mr-2">{{ r.language }}</span>
                      ☆ {{ r.stars_count }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="ui five wide column">
              <RouterLink :to="`/repo/create?org=${org.id}`" class="ui primary button tw-mb-4 tw-block tw-text-center">
                New Repository
              </RouterLink>
            </div>
          </div>
        </div>
      </template>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getUser, getUserRepos, type User, type Repository} from '../api/index.ts';

const route = useRoute();
const orgName = route.params['org'] as string;

const org = ref<User | null>(null);
const repos = ref<Repository[]>([]);
const loading = ref(true);
const reposLoading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    org.value = await getUser(orgName);
    loading.value = false;
    repos.value = await getUserRepos(orgName, {limit: 20});
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load organization';
    loading.value = false;
  } finally {
    reposLoading.value = false;
  }
});
</script>
