<!-- Translated from: templates/user/profile.tmpl -->
<template>
  <AppLayout :page-class="'user profile'" :title="user?.full_name || user?.login || 'User Profile'">
    <div class="ui container">
      <div class="ui stackable grid">
        <!-- Left column - user info -->
        <div class="ui five wide column">
          <div class="user-profile-card">
            <img v-if="user?.avatar_url" :src="user.avatar_url" class="ui circular image" width="290"/>
            <div class="user-profile-name">
              <h2>{{ user?.full_name || user?.login }}</h2>
              <span v-if="user?.full_name && user?.login" class="tw-text-text-light">{{ user.login }}</span>
            </div>
            <div v-if="user?.description" class="user-profile-desc">{{ user.description }}</div>
            <ul class="user-profile-meta">
              <li v-if="user?.location"><i class="octicon-location"></i> {{ user.location }}</li>
              <li v-if="user?.website"><a :href="user.website" target="_blank" rel="nofollow noopener">{{ user.website }}</a></li>
              <li><i class="octicon-clock"></i> Joined {{ formatDate(user?.created) }}</li>
            </ul>
            <div class="user-profile-follow">
              <RouterLink :to="`/${user?.login}/followers`" class="muted">
                <strong>{{ user?.followers_count || 0 }}</strong> followers
              </RouterLink>
              ·
              <RouterLink :to="`/${user?.login}/following`" class="muted">
                <strong>{{ user?.following_count || 0 }}</strong> following
              </RouterLink>
              ·
              <strong>{{ user?.starred_repos_count || 0 }}</strong> starred
            </div>
          </div>
        </div>
        <!-- Right column - repos/activity -->
        <div class="ui eleven wide column">
          <div class="user-tab-header">
            <div class="small-menu-items ui compact tiny menu">
              <a :class="['item', {active: tab === 'repositories'}]" @click="tab='repositories'">Repositories</a>
              <a :class="['item', {active: tab === 'activity'}]" @click="tab='activity'">Activity</a>
              <a :class="['item', {active: tab === 'stars'}]" @click="tab='stars'">Stars</a>
            </div>
          </div>
          <div class="divider"></div>
          <SharedRepoList v-if="tab === 'repositories' || tab === 'stars'" :repos="repoList"/>
          <div v-if="tab === 'activity'" class="feed">
            <div v-for="feed in feeds" :key="feed.id" class="news tw-py-2">
              <span class="tw-text-text-light">{{ feed.op_type }}</span>
              <RouterLink v-if="feed.repo" :to="`/${feed.repo.full_name}`">{{ feed.repo.full_name }}</RouterLink>
              <span class="tw-text-text-light-3">{{ formatDate(feed.created) }}</span>
            </div>
            <div v-if="!feeds.length" class="tw-text-center tw-py-8 tw-text-text-light">No recent activity</div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import SharedRepoList from '../components/SharedRepoList.vue';
import {apiBase} from '../spaconfig.ts';

const route = useRoute();
const user = ref<any>(null);
const repoList = ref<any[]>([]);
const feeds = ref<any[]>([]);
const tab = ref('repositories');

function formatDate(d: string | undefined) {
  if (!d) return '';
  return new Date(d).toLocaleDateString();
}

async function loadUser() {
  const username = route.params.username as string;
  try {
    const resp = await fetch(`${apiBase}/users/${username}`);
    if (resp.ok) user.value = await resp.json();
  } catch { /* empty */ }
}

async function loadRepos() {
  const username = route.params.username as string;
  const endpoint = tab.value === 'stars' ? `${apiBase}/users/${username}/starred` : `${apiBase}/users/${username}/repos`;
  try {
    const resp = await fetch(endpoint);
    if (resp.ok) repoList.value = await resp.json();
  } catch { /* empty */ }
}

async function loadActivity() {
  const username = route.params.username as string;
  try {
    const resp = await fetch(`${apiBase}/users/${username}/heatmap`);
    if (resp.ok) feeds.value = await resp.json();
  } catch { /* empty */ }
}

watch(tab, () => {
  if (tab.value === 'activity') loadActivity();
  else loadRepos();
});

onMounted(async () => {
  await loadUser();
  await loadRepos();
});
</script>
