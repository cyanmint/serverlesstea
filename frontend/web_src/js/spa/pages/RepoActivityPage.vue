<template>
  <AppLayout page-class="repository activity">
    <RepoNav
      :owner="owner"
      :repo-name="repoName"
      active-tab="activity"
      :repo="repo"
      :current-user="currentUser"
      :starred="starred"
      :star-loading="starLoading"
      @toggle-star="toggleStar"
    />

    <div class="ui container">
      <!-- Period filter nav — matches templates/repo/activity.tmpl -->
      <div class="ui secondary pointing menu tw-mb-4">
        <a
          v-for="opt in periodOptions"
          :key="opt.value"
          class="item"
          :class="{active: period === opt.value}"
          @click="setPeriod(opt.value)"
        >{{ opt.label }}</a>
      </div>

      <div v-if="loading" class="tw-py-8">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message"><p>{{ error }}</p></div>
      <template v-else>
        <div v-if="feeds.length === 0" class="ui placeholder segment">
          <div class="tw-text-center tw-py-8 tw-text-gray-500">No recent activity.</div>
        </div>
        <div v-else class="flex-container">
          <div class="flex-container-main">
            <div class="ui segment">
              <div
                v-for="feed in feeds"
                :key="feed.id"
                class="activity-block-list"
              >
                <div class="ui items activity-list">
                  <div class="item">
                    <div class="item-leading">
                      <a :href="`/${feed.act_user?.login}`">
                        <img
                          v-if="feed.act_user"
                          :src="feed.act_user.avatar_url"
                          :alt="feed.act_user.login"
                          class="ui avatar image"
                        >
                      </a>
                    </div>
                    <div class="item-main">
                      <div class="item-header">
                        <RouterLink
                          v-if="feed.act_user"
                          :to="`/${feed.act_user.login}`"
                          class="author"
                        >
                          {{ feed.act_user.login }}
                        </RouterLink>
                        <span class="tw-ml-1 tw-text-gray-700">{{ opTypeLabel(feed.op_type) }}</span>
                        <span v-if="feed.ref_name" class="ui basic label tw-font-mono tw-text-xs tw-ml-1">
                          {{ feed.ref_name }}
                        </span>
                      </div>
                      <div class="item-body">
                        <span class="tw-text-xs tw-text-gray-500">{{ formatDate(feed.created) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ui pagination menu tw-my-4">
          <a class="item" :class="{disabled: page <= 1}" @click="page > 1 && changePage(page - 1)">Previous</a>
          <a class="item active">{{ page }}</a>
          <a class="item" :class="{disabled: feeds.length < pageSize}" @click="feeds.length >= pageSize && changePage(page + 1)">Next</a>
        </div>
      </template>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoNav from '../components/RepoNav.vue';
import {getRepo, getRepoActivityFeeds, getCurrentUser, isRepoStarred, starRepo, unstarRepo, type ActivityFeed, type Repository, type User} from '../api/index.ts';

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);

const feeds = ref<ActivityFeed[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const page = ref(1);
const pageSize = 20;
const period = ref<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semiyearly' | 'yearly'>('weekly');
const repo = ref<Repository | null>(null);
const currentUser = ref<User | null>(null);
const starred = ref(false);
const starLoading = ref(false);

const periodOptions = [
  {value: 'daily', label: 'Daily'},
  {value: 'weekly', label: 'Weekly'},
  {value: 'monthly', label: 'Monthly'},
  {value: 'quarterly', label: 'Quarterly'},
  {value: 'semiyearly', label: 'Semi-yearly'},
  {value: 'yearly', label: 'Yearly'},
] as const;

function opTypeLabel(op: string): string {
  const map: Record<string, string> = {
    create_repo: 'created repository',
    rename_repo: 'renamed repository',
    star_repo: 'starred',
    watch_repo: 'started watching',
    commit_repo: 'pushed to',
    create_issue: 'opened an issue in',
    create_pull_request: 'opened a pull request in',
    transfer_repo: 'transferred repository',
    push_tag: 'pushed tag',
    comment_issue: 'commented on issue in',
    merge_pull_request: 'merged pull request in',
    close_issue: 'closed issue in',
    reopen_issue: 'reopened issue in',
    close_pull_request: 'closed pull request in',
    reopen_pull_request: 'reopened pull request in',
    delete_tag: 'deleted tag from',
    delete_branch: 'deleted branch from',
    publish_release: 'published release in',
  };
  return map[op] ?? op.replace(/_/g, ' ');
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString();
}

function setPeriod(p: typeof period.value) {
  period.value = p;
  page.value = 1;
  load();
}

function changePage(p: number) {
  page.value = p;
  load();
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
    feeds.value = await getRepoActivityFeeds(owner.value, repoName.value, {page: page.value, limit: pageSize});
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

watch([owner, repoName], () => {
  page.value = 1;
  load();
});
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
