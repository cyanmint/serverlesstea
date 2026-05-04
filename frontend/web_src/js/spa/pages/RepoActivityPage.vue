<template>
  <AppLayout>
    <div class="ui container tw-py-4">
      <div class="tw-flex tw-items-center tw-gap-2 tw-mb-4">
        <RouterLink :to="`/${owner}/${repoName}`" class="tw-text-blue-600 hover:tw-underline tw-font-medium">
          {{ owner }}/{{ repoName }}
        </RouterLink>
        <span class="tw-text-gray-400">/</span>
        <span class="tw-font-semibold">Activity</span>
      </div>

      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>
      <template v-else>
        <div v-if="feeds.length === 0" class="ui placeholder segment">
          <div class="tw-text-center tw-py-8 tw-text-gray-500">No recent activity.</div>
        </div>
        <div v-else class="tw-border tw-rounded">
          <div
            v-for="feed in feeds"
            :key="feed.id"
            class="tw-flex tw-items-start tw-gap-3 tw-px-4 tw-py-3 tw-border-b last:tw-border-b-0 hover:tw-bg-gray-50"
          >
            <img
              v-if="feed.act_user"
              :src="feed.act_user.avatar_url"
              :alt="feed.act_user.login"
              class="ui avatar image tw-w-8 tw-h-8 tw-shrink-0 tw-mt-0.5"
            >
            <div class="tw-flex-1 tw-min-w-0">
              <div class="tw-text-sm">
                <RouterLink
                  v-if="feed.act_user"
                  :to="`/${feed.act_user.login}`"
                  class="tw-font-semibold hover:tw-underline"
                >{{ feed.act_user.login }}</RouterLink>
                <span class="tw-ml-1 tw-text-gray-700">{{ opTypeLabel(feed.op_type) }}</span>
                <span v-if="feed.ref_name" class="tw-ml-1 tw-font-mono tw-text-xs tw-bg-gray-100 tw-px-1 tw-rounded">
                  {{ feed.ref_name }}
                </span>
              </div>
              <div class="tw-text-xs tw-text-gray-500 tw-mt-0.5">
                {{ formatDate(feed.created) }}
              </div>
            </div>
          </div>
        </div>

        <div class="tw-flex tw-justify-center tw-mt-4 tw-gap-2">
          <button class="ui button" :disabled="page <= 1" @click="page--">Previous</button>
          <span class="ui label tw-self-center">Page {{ page }}</span>
          <button class="ui button" :disabled="feeds.length < pageSize" @click="page++">Next</button>
        </div>
      </template>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getRepoActivityFeeds, type ActivityFeed} from '../api/index.ts';

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);

const feeds = ref<ActivityFeed[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const page = ref(1);
const pageSize = 20;

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

watch([owner, repoName, page], load);
onMounted(load);
</script>
