<template>
  <AppLayout page-class="user profile">
    <div class="ui container">
      <!-- Loading / error -->
      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <h3>User not found</h3>
        <p>{{ error }}</p>
      </div>

      <!-- Profile layout — matches templates/user/profile.tmpl -->
      <template v-else-if="user">
        <div class="ui stackable grid">
          <!-- Left: profile sidebar (4-wide column) -->
          <div class="ui four wide column">
            <div id="profile-avatar-card" class="ui card">
              <div id="profile-avatar" class="content tw-flex">
                <span class="image">
                  <img :src="user.avatar_url" :alt="user.login" class="ui avatar image" style="width:256px">
                </span>
              </div>
              <div class="content tw-break-anywhere profile-avatar-name">
                <span v-if="user.full_name" class="header text center">{{ user.full_name }}</span>
                <span class="username text center">{{ user.login }}</span>
              </div>
              <div class="extra content tw-break-anywhere">
                <ul>
                  <li v-if="user.email">
                    <SvgIcon name="octicon-mail" :size="16"/>
                    <a :href="`mailto:${user.email}`" rel="nofollow">{{ user.email }}</a>
                  </li>
                  <li>
                    <SvgIcon name="octicon-calendar" :size="16"/>
                    <span>Joined {{ joinedDate }}</span>
                  </li>
                </ul>
              </div>
              <!-- Orgs -->
              <div v-if="orgs.length > 0" class="extra content">
                <div class="header">Organizations</div>
                <div class="ui list">
                  <div class="item" v-for="org in orgs" :key="org.id">
                    <RouterLink :to="`/${org.login}`" :title="org.login">
                      <img :src="org.avatar_url" :alt="org.login" class="ui avatar image">
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: content area (12-wide column) -->
          <div class="ui twelve wide column tw-mb-4">
            <div class="ui secondary pointing tabular top attached borderless menu">
              <RouterLink :to="`/${user.login}`" class="item" :class="{active: !activeTab || activeTab === 'repos'}">
                <SvgIcon name="octicon-repo" :size="16"/>
                Repositories
                <span class="ui label">{{ repos.length }}</span>
              </RouterLink>
            </div>

            <!-- Repos list -->
            <div v-if="reposLoading" class="tw-py-8 tw-text-center">
              <div class="ui active centered inline loader"/>
            </div>
            <div v-else-if="repos.length === 0" class="tw-text-center tw-py-8 tw-text-gray-500">
              No public repositories.
            </div>
            <div v-else class="flex-divided-list items-with-main">
              <div v-for="repo in repos" :key="repo.id" class="item">
                <div class="item-main">
                  <div class="item-header">
                    <div class="item-title">
                      <RouterLink class="tw-text-primary name" :to="`/${user.login}/${repo.name}`">{{ repo.name }}</RouterLink>
                      <span class="label-list">
                        <span v-if="repo.private" class="ui basic label">Private</span>
                        <span v-if="repo.fork" class="ui basic label">Fork</span>
                        <span v-if="repo.archived" class="ui basic label">Archived</span>
                      </span>
                    </div>
                    <div class="item-trailing muted-links">
                      <span v-if="repo.language" class="flex-text-inline">
                        <i class="color-icon tw-mr-2"/>{{ repo.language }}
                      </span>
                      <RouterLink class="flex-text-inline" :to="`/${user.login}/${repo.name}/stars`">
                        <span class="tw-contents" aria-label="Stars"><SvgIcon name="octicon-star" :size="16"/></span>
                        <span>{{ repo.stars_count }}</span>
                      </RouterLink>
                      <RouterLink class="flex-text-inline" :to="`/${user.login}/${repo.name}/forks`">
                        <span class="tw-contents" aria-label="Forks"><SvgIcon name="octicon-git-branch" :size="16"/></span>
                        <span>{{ repo.forks_count }}</span>
                      </RouterLink>
                    </div>
                  </div>
                  <div v-if="repo.description" class="item-body">{{ repo.description }}</div>
                  <div class="item-body">Updated {{ timeAgo(repo.updated_at) }}</div>
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
import {SvgIcon} from '../../svg.ts';
import {getUser, getUserRepos, getUserOrgs, type User, type Repository} from '../api/index.ts';

const route = useRoute();
const username = String(route.params.username);
const activeTab = computed(() => String(route.query.tab ?? ''));

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
