<!-- Translated from: templates/home.tmpl + templates/user/dashboard/dashboard.tmpl -->
<template>
  <!-- Signed-out landing page (home.tmpl) -->
  <AppLayout v-if="!loading && !currentUser" page-class="home" title="Home">
    <div class="tw-mb-8 tw-px-8">
      <div class="center">
        <img class="logo" width="220" height="220" :src="`${assetUrlPrefix}/img/logo.svg`" alt="Logo">
        <div class="hero">
          <h1 class="ui icon header title tw-text-balance">Gitea</h1>
          <h2 class="tw-text-balance">Painless self-hosted all-in-one software development service</h2>
        </div>
      </div>
    </div>
    <div class="ui stackable middle very relaxed page grid">
      <div class="eight wide center column">
        <h1 class="hero ui icon header">
          <SvgIcon name="octicon-flame" :size="32"/> Easy to install
        </h1>
        <p class="large tw-text-balance">
          Simply <a href="https://docs.gitea.com/installation/install-from-binary" target="_blank" rel="noopener">run the binary</a> for your platform,
          ship it with <a href="https://github.com/go-gitea/gitea/tree/master/docker" target="_blank" rel="noopener">Docker</a>,
          or get it <a href="https://docs.gitea.com/installation/install-from-package" target="_blank" rel="noopener">packaged</a>.
        </p>
      </div>
      <div class="eight wide center column">
        <h1 class="hero ui icon header">
          <SvgIcon name="octicon-device-desktop" :size="32"/> Cross-platform
        </h1>
        <p class="large tw-text-balance">
          Gitea runs anywhere <a href="https://go.dev/" target="_blank" rel="noopener">Go</a> can compile for:
          Windows, macOS, Linux, ARM, etc.
        </p>
      </div>
    </div>
    <div class="ui stackable middle very relaxed page grid">
      <div class="eight wide center column">
        <h1 class="hero ui icon header">
          <SvgIcon name="octicon-rocket" :size="32"/> Lightweight
        </h1>
        <p class="large tw-text-balance">
          Gitea has low minimal requirements and can run on an inexpensive Raspberry Pi. Save your machine energy!
        </p>
      </div>
      <div class="eight wide center column">
        <h1 class="hero ui icon header">
          <SvgIcon name="octicon-code" :size="32"/> Open Source
        </h1>
        <p class="large tw-text-balance">
          Go get it from <a href="https://code.gitea.io/gitea" target="_blank" rel="noopener">code.gitea.io</a>!
          Join us by contributing to make this project even better.
        </p>
      </div>
    </div>
  </AppLayout>

  <!-- Signed-in dashboard (user/dashboard/dashboard.tmpl) -->
  <AppLayout v-else page-class="dashboard feeds" title="Dashboard">
    <div v-if="loading" class="ui container tw-py-8">
      <div class="ui active centered inline loader"/>
    </div>
    <template v-else-if="currentUser">
      <DashboardNav :current-user="currentUser" mode="dashboard"/>
      <div class="ui container flex-container">
        <div class="flex-container-main">
          <!-- user/dashboard/guide.tmpl or user/dashboard/feeds.tmpl -->
          <div v-if="feedsLoading" class="tw-py-8 tw-text-center">
            <div class="ui active centered inline loader"/>
          </div>
          <div v-else-if="feeds.length === 0" class="tw-text-center tw-p-8">
            <SvgIcon name="octicon-package" :size="24" class="tw-text-placeholder-text"/>
            <h3 class="tw-my-4">Welcome to Gitea</h3>
            <p class="tw-text-placeholder-text">There is no activity yet. Start by creating a repository or exploring existing ones.</p>
            <div>
              <RouterLink to="/explore/repos">Explore repositories</RouterLink>
              <span>·</span>
              <RouterLink to="/explore/users">Explore users</RouterLink>
            </div>
          </div>
          <!-- user/dashboard/feeds.tmpl -->
          <div v-else id="activity-feed" class="flex-divided-list items-with-main">
            <div v-for="feed in feeds" :key="feed.id" class="item">
              <div class="item-leading">
                <img class="ui avatar image" :src="feed.act_user?.avatar_url" :alt="feed.act_user?.login" width="32" height="32">
              </div>
              <div class="item-main tw-gap-2">
                <div>
                  <RouterLink :to="`/${feed.act_user?.login}`">{{ feed.act_user?.login }}</RouterLink>
                  <span> {{ describeAction(feed) }}</span>
                  <RouterLink v-if="feed.repo" :to="`/${feed.repo.full_name}`" class="tw-ml-1 tw-font-semibold">{{ feed.repo.full_name }}</RouterLink>
                </div>
                <div class="time-since">{{ formatTimeAgo(feed.created) }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- user/dashboard/repolist.tmpl -->
        <div id="dashboard-repo-list" class="flex-container-sidebar">
          <div class="tw-flex tw-items-center tw-justify-between tw-mb-2">
            <h4 class="ui header tw-mb-0">Repositories</h4>
            <RouterLink to="/repo/create" class="ui mini primary button">
              <SvgIcon name="octicon-plus" :size="12"/>
            </RouterLink>
          </div>
          <div class="ui fluid small search input tw-mb-3">
            <input v-model="repoSearch" type="search" placeholder="Search repositories…" class="prompt">
          </div>
          <div v-if="reposLoading" class="ui active centered inline loader"/>
          <div v-else-if="filteredRepos.length === 0" class="tw-text-placeholder-text tw-text-sm tw-py-4 tw-text-center">
            No repositories found.
          </div>
          <div v-else class="flex-divided-list">
            <div v-for="repo in filteredRepos" :key="repo.id" class="item">
              <div class="flex-text-block tw-gap-1">
                <SvgIcon :name="repo.private ? 'octicon-lock' : 'octicon-repo'" :size="14" class="tw-text-placeholder-text tw-shrink-0"/>
                <RouterLink :to="`/${repo.full_name}`" class="gt-ellipsis tw-flex-1">{{ repo.full_name }}</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import DashboardNav from '../components/DashboardNav.vue';
import {SvgIcon} from '../../svg.ts';
import {getCurrentUser, searchRepos, getUserActivityFeeds, type User, type Repository, type ActivityFeed} from '../api/index.ts';
import {assetUrlPrefix} from '../spaconfig.ts';

const loading = ref(true);
const reposLoading = ref(false);
const feedsLoading = ref(false);
const currentUser = ref<User | null>(null);
const repos = ref<Repository[]>([]);
const feeds = ref<ActivityFeed[]>([]);
const repoSearch = ref('');

const filteredRepos = computed(() => {
  const q = repoSearch.value.toLowerCase();
  if (!q) return repos.value;
  return repos.value.filter((r) => r.full_name.toLowerCase().includes(q));
});

function formatTimeAgo(dateStr: string): string {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function describeAction(feed: ActivityFeed): string {
  const actions: Record<string, string> = {
    create_repo: 'created repository',
    rename_repo: 'renamed repository',
    star_repo: 'starred',
    watch_repo: 'started watching',
    commit_repo: 'pushed to',
    create_issue: 'opened issue in',
    close_issue: 'closed issue in',
    reopen_issue: 'reopened issue in',
    create_pull_request: 'opened pull request in',
    close_pull_request: 'closed pull request in',
    merge_pull_request: 'merged pull request in',
    comment_issue: 'commented on issue in',
    comment_pull: 'commented on pull request in',
    fork_repo: 'forked',
    push_tag: 'pushed tag to',
    delete_tag: 'deleted tag from',
    delete_branch: 'deleted branch from',
    mirror_sync_push: 'synced mirror',
    publish_release: 'published release in',
    auto_merge_pull_request: 'auto-merged pull request in',
  };
  return actions[feed.op_type] ?? feed.op_type?.replace(/_/g, ' ') ?? '';
}

onMounted(async () => {
  try {
    currentUser.value = await getCurrentUser();
    if (currentUser.value) {
      reposLoading.value = true;
      feedsLoading.value = true;
      const [repoResult, feedResult] = await Promise.allSettled([
        searchRepos('', {limit: 30, sort: 'newest'}),
        getUserActivityFeeds(currentUser.value.login, {limit: 30}),
      ]);
      if (repoResult.status === 'fulfilled') repos.value = repoResult.value.data ?? [];
      if (feedResult.status === 'fulfilled') feeds.value = feedResult.value;
    }
  } catch { /* not signed in */ }
  finally {
    loading.value = false;
    reposLoading.value = false;
    feedsLoading.value = false;
  }
});
</script>
