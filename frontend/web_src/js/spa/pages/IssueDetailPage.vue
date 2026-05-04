<template>
  <AppLayout>
    <div class="ui container tw-py-4">
      <!-- Loading / error -->
      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <h3>{{ notFound ? 'Issue not found' : 'Error loading issue' }}</h3>
        <p>{{ error }}</p>
        <RouterLink :to="`/${owner}/${repoName}/issues`" class="ui button tw-mt-2">Back to Issues</RouterLink>
      </div>

      <template v-else-if="issue">
        <!-- Issue header -->
        <div class="tw-mb-4">
          <div class="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-500 tw-mb-2">
            <RouterLink :to="`/${owner}/${repoName}`" class="hover:tw-underline tw-text-blue-600">{{ owner }}/{{ repoName }}</RouterLink>
            <span>/</span>
            <RouterLink :to="`/${owner}/${repoName}/issues`" class="hover:tw-underline tw-text-blue-600">Issues</RouterLink>
            <span>/</span>
            <span>#{{ issue.number }}</span>
          </div>

          <h1 class="tw-text-2xl tw-font-bold tw-mb-2">
            {{ issue.title }}
            <span class="tw-text-gray-400 tw-font-normal">#{{ issue.number }}</span>
          </h1>

          <div class="tw-flex tw-items-center tw-gap-3">
            <span
              class="ui label"
              :class="issue.state === 'open' ? 'green' : 'red'"
            >
              {{ issue.state === 'open' ? '🟢 Open' : '✅ Closed' }}
            </span>
            <span class="tw-text-sm tw-text-gray-500">
              Opened {{ timeAgo(issue.created_at) }} by
              <a :href="`${appSubUrl}/${issue.user.login}`" class="tw-text-blue-600 hover:tw-underline tw-font-medium">{{ issue.user.login }}</a>
              · {{ issue.comments }} comment{{ issue.comments === 1 ? '' : 's' }}
            </span>
          </div>
        </div>

        <div class="tw-flex tw-gap-6">
          <!-- Main content -->
          <div class="tw-flex-1">
            <!-- Issue body -->
            <div class="tw-border tw-rounded tw-mb-4">
              <div class="tw-bg-gray-50 tw-px-4 tw-py-2 tw-border-b tw-flex tw-items-center tw-gap-2 tw-text-sm">
                <img :src="issue.user.avatar_url" :alt="issue.user.login" class="tw-w-6 tw-h-6 tw-rounded-full">
                <a :href="`${appSubUrl}/${issue.user.login}`" class="tw-font-medium tw-text-blue-600 hover:tw-underline">{{ issue.user.login }}</a>
                <span class="tw-text-gray-400">commented {{ timeAgo(issue.created_at) }}</span>
              </div>
              <div class="tw-px-4 tw-py-4 tw-text-sm tw-leading-relaxed tw-whitespace-pre-wrap">
                {{ issue.body || '_No description provided._' }}
              </div>
            </div>

            <!-- Comments -->
            <div v-for="comment in comments" :key="comment.id" class="tw-border tw-rounded tw-mb-4">
              <div class="tw-bg-gray-50 tw-px-4 tw-py-2 tw-border-b tw-flex tw-items-center tw-gap-2 tw-text-sm">
                <img :src="comment.user.avatar_url" :alt="comment.user.login" class="tw-w-6 tw-h-6 tw-rounded-full">
                <a :href="`${appSubUrl}/${comment.user.login}`" class="tw-font-medium tw-text-blue-600 hover:tw-underline">{{ comment.user.login }}</a>
                <span class="tw-text-gray-400">commented {{ timeAgo(comment.created_at) }}</span>
              </div>
              <div class="tw-px-4 tw-py-4 tw-text-sm tw-leading-relaxed tw-whitespace-pre-wrap">
                {{ comment.body || '_Empty comment._' }}
              </div>
            </div>

            <div v-if="commentsLoading" class="tw-text-center tw-py-4">
              <div class="ui active centered inline loader"/>
            </div>

            <!-- Add comment form (only for signed-in users) -->
            <div v-if="currentUser" class="tw-border tw-rounded tw-mt-4">
              <div class="tw-bg-gray-50 tw-px-4 tw-py-2 tw-border-b tw-flex tw-items-center tw-gap-2 tw-text-sm">
                <img :src="currentUser.avatar_url" :alt="currentUser.login" class="tw-w-6 tw-h-6 tw-rounded-full">
                <span class="tw-font-medium">{{ currentUser.login }}</span>
              </div>
              <div class="tw-px-4 tw-py-4">
                <div v-if="commentError" class="ui negative message tw-mb-3">
                  <p>{{ commentError }}</p>
                </div>
                <textarea
                  v-model="newComment"
                  class="tw-w-full tw-border tw-rounded tw-p-3 tw-text-sm tw-resize-y tw-min-h-24 focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-blue-400"
                  placeholder="Leave a comment…"
                  rows="4"
                />
                <div class="tw-mt-3 tw-flex tw-justify-end">
                  <button
                    class="ui primary button"
                    :class="{loading: submittingComment}"
                    :disabled="submittingComment || !newComment.trim()"
                    @click="submitComment"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="tw-w-64 tw-shrink-0">
            <!-- Labels -->
            <div class="tw-mb-4">
              <h4 class="tw-text-xs tw-font-semibold tw-text-gray-500 tw-uppercase tw-mb-2">Labels</h4>
              <div v-if="issue.labels.length === 0" class="tw-text-sm tw-text-gray-400">None yet</div>
              <div v-else class="tw-flex tw-flex-wrap tw-gap-1">
                <span
                  v-for="label in issue.labels"
                  :key="label.id"
                  class="ui mini label"
                  :style="{background: '#' + label.color}"
                >
                  {{ label.name }}
                </span>
              </div>
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
import {getIssue, getIssueComments, getCurrentUser, createIssueComment, type Issue, type Comment, type User} from '../api/index.ts';

import {appSubUrl} from '../spaconfig.ts';

const route = useRoute();
const owner = String(route.params.owner);
const repoName = String(route.params.repo);
const issueIndex = Number(route.params.id || route.params.index);

const loading = ref(true);
const error = ref('');
const notFound = ref(false);
const issue = ref<Issue | null>(null);
const comments = ref<Comment[]>([]);
const commentsLoading = ref(false);
const currentUser = ref<User | null>(null);

const newComment = ref('');
const submittingComment = ref(false);
const commentError = ref('');

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

async function submitComment() {
  if (!newComment.value.trim()) return;
  submittingComment.value = true;
  commentError.value = '';
  try {
    const comment = await createIssueComment(owner, repoName, issueIndex, newComment.value.trim());
    comments.value.push(comment);
    newComment.value = '';
    issue.value!.comments += 1;
  } catch (err) {
    commentError.value = err instanceof Error ? err.message : 'Failed to post comment';
  } finally {
    submittingComment.value = false;
  }
}

onMounted(async () => {
  currentUser.value = await getCurrentUser();

  try {
    issue.value = await getIssue(owner, repoName, issueIndex);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    notFound.value = msg.includes('404') || msg.toLowerCase().includes('not found');
    error.value = msg;
    loading.value = false;
    return;
  }
  loading.value = false;

  if (issue.value!.comments > 0) {
    commentsLoading.value = true;
    try {
      comments.value = await getIssueComments(owner, repoName, issueIndex);
    } finally {
      commentsLoading.value = false;
    }
  }
});
</script>
