<template>
  <!-- Signed-out landing page — matches templates/home.tmpl -->
  <AppLayout v-if="!loading && !currentUser" page-class="home">
    <div class="tw-mb-8 tw-px-8">
      <div class="center">
        <img class="logo" width="220" height="220" :src="`${assetUrlPrefix}/img/logo.svg`" alt="Gitea">
        <div class="hero">
          <h1 class="ui icon header title tw-text-balance">Gitea</h1>
          <h2 class="tw-text-balance">Painless self-hosted all-in-one software development service</h2>
        </div>
      </div>
    </div>
    <div class="ui stackable middle very relaxed page grid">
      <div class="eight wide center column">
        <h1 class="hero ui icon header">
          <SvgIcon name="octicon-flame" :size="32"/> Install
        </h1>
        <p class="large tw-text-balance">
          Easy to install, available as a binary,
          <a href="https://docs.gitea.com/installation/install-from-binary" target="_blank" rel="noopener">binary</a>,
          <a href="https://github.com/go-gitea/gitea/tree/master/docker" target="_blank" rel="noopener">Docker</a>,
          or from <a href="https://docs.gitea.com/installation/install-from-package" target="_blank" rel="noopener">packages</a>.
        </p>
      </div>
      <div class="eight wide center column">
        <h1 class="hero ui icon header">
          <SvgIcon name="octicon-device-desktop" :size="32"/> Platform
        </h1>
        <p class="large tw-text-balance">
          Gitea runs anywhere <a href="https://go.dev/" target="_blank" rel="noopener">Go</a> can compile:
          Windows, macOS, Linux, ARM, and more.
        </p>
      </div>
    </div>
    <div class="ui stackable middle very relaxed page grid">
      <div class="eight wide center column">
        <h1 class="hero ui icon header">
          <SvgIcon name="octicon-rocket" :size="32"/> Lightweight
        </h1>
        <p class="large tw-text-balance">
          Gitea has low minimal requirements and can run on an inexpensive Raspberry Pi.
          Save your machine's energy!
        </p>
      </div>
      <div class="eight wide center column">
        <h1 class="hero ui icon header">
          <SvgIcon name="octicon-code" :size="32"/> License
        </h1>
        <p class="large tw-text-balance">
          All source code is licensed under the
          <a href="https://code.gitea.io/gitea" target="_blank" rel="noopener">MIT License</a>.
        </p>
      </div>
    </div>
  </AppLayout>

  <!-- Signed-in dashboard — matches templates/user/dashboard/dashboard.tmpl -->
  <AppLayout v-else page-class="dashboard feeds">
    <div v-if="loading" class="ui container tw-py-8">
      <div class="ui active centered inline loader"/>
    </div>
    <template v-else-if="currentUser">
      <DashboardNav :current-user="currentUser" mode="dashboard"/>
      <div class="ui container flex-container">
        <!-- Main feed -->
        <div class="flex-container-main">
          <div v-if="feedsLoading" class="tw-py-8 tw-text-center">
            <div class="ui active centered inline loader"/>
          </div>
          <!-- Empty feed guide — matches templates/user/dashboard/guide.tmpl -->
          <div v-else-if="feeds.length === 0" class="tw-text-center tw-p-8">
            <SvgIcon name="octicon-package" :size="24" class="tw-text-placeholder-text"/>
            <h3 class="tw-my-4">Welcome to Gitea</h3>
            <p class="tw-text-placeholder-text">There is nothing to see here yet! Either you haven't created any repos, or you haven't followed anyone.</p>
            <div>
              <RouterLink to="/explore/repos">Explore repos</RouterLink>
              <span>·</span>
              <RouterLink to="/explore/users">Explore users</RouterLink>
            </div>
          </div>
          <!-- Activity feed -->
          <div v-else id="activity-feed" class="flex-divided-list items-with-main">
            <div v-for="feed in feeds" :key="feed.id" class="item">
              <div class="item-leading">
                <img class="ui avatar image" :src="feed.act_user.avatar_url" :alt="feed.act_user.login">
              </div>
              <div class="item-main tw-gap-2">
                <div>
                  <RouterLink :to="`/${feed.act_user.login}`">{{ feed.act_user.login }}</RouterLink>
                  <span> {{ describeAction(feed) }}</span>
                  <template v-if="feed.repo">
                    <RouterLink :to="`/${feed.repo.full_name}`" class="tw-ml-1 tw-font-semibold">{{ feed.repo.full_name }}</RouterLink>
                  </template>
                </div>
                <div class="time-since">{{ formatTimeAgo(feed.created) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar repo list — matches templates/user/dashboard/repolist.tmpl -->
        <div id="dashboard-repo-list" class="flex-container-sidebar">
          <div class="tw-flex tw-items-center tw-justify-between tw-mb-2">
            <h4 class="ui header tw-mb-0">My Repos</h4>
            <RouterLink to="/repo/create" class="ui mini primary button">
              <SvgIcon name="octicon-plus" :size="12"/>
            </RouterLink>
          </div>
          <div class="ui fluid small search input tw-mb-3">
            <input
              v-model="repoSearch"
              type="search"
              placeholder="Search repos…"
              class="prompt"
            >
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
              <div class="tw-text-xs tw-text-placeholder-text tw-mt-1 tw-flex tw-gap-2">
                <span v-if="repo.language" class="flex-text-inline">{{ repo.language }}</span>
                <span class="flex-text-inline">{{ formatTimeAgo(repo.updated_at) }}</span>
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
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

function describeAction(feed: ActivityFeed): string {
  switch (feed.op_type) {
    case 'create_repo': return 'created repository';
    case 'rename_repo': return 'renamed repository';
    case 'star_repo': return 'starred';
    case 'watch_repo': return 'started watching';
    case 'commit_repo': return 'pushed to';
    case 'create_issue': return 'opened issue in';
    case 'close_issue': return 'closed issue in';
    case 'reopen_issue': return 'reopened issue in';
    case 'create_pull_request': return 'opened pull request in';
    case 'close_pull_request': return 'closed pull request in';
    case 'reopen_pull_request': return 'reopened pull request in';
    case 'merge_pull_request': return 'merged pull request in';
    case 'comment_issue': return 'commented on issue in';
    case 'comment_pull': return 'commented on pull request in';
    case 'fork_repo': return 'forked';
    case 'mirror_sync_push': return 'synced mirror';
    case 'publish_release': return 'published release in';
    default: return feed.op_type.replace(/_/g, ' ');
  }
}

onMounted(async () => {
  try {
    currentUser.value = await getCurrentUser();
    if (currentUser.value) {
      reposLoading.value = true;
      feedsLoading.value = true;
      const [repoResult, feedResult] = await Promise.allSettled([
        searchRepos('', {limit: 50, sort: 'newest'}),
        getUserActivityFeeds(currentUser.value.login, {limit: 20}),
      ]);
      if (repoResult.status === 'fulfilled') repos.value = repoResult.value.data ?? [];
      if (feedResult.status === 'fulfilled') feeds.value = feedResult.value;
    }
  } catch (err) {
    console.error('HomePage: failed to load data', err);
  } finally {
    loading.value = false;
    reposLoading.value = false;
    feedsLoading.value = false;
  }
});
</script>
