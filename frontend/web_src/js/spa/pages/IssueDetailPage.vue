<template>
  <AppLayout page-class="repository view issue pull">
    <RepoNav
      :owner="owner"
      :repo-name="repoName"
      active-tab="issues"
      :repo="repo"
      :current-user="currentUser"
      :starred="starred"
      :star-loading="starLoading"
      @toggle-star="toggleStar"
    />

    <div class="ui container">
      <!-- Loading / error -->
      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <h3>{{ notFound ? 'Issue not found' : 'Error loading issue' }}</h3>
        <p>{{ error }}</p>
        <RouterLink :to="`/${owner}/${repoName}/issues`" class="ui button tw-mt-2">Back to Issues</RouterLink>
      </div>

      <!-- Issue view — matches templates/repo/issue/view_title.tmpl + view_content.tmpl -->
      <template v-else-if="issue">
        <!-- Issue title header -->
        <div class="issue-title">
          <h1 class="tw-text-2xl">
            {{ issue.title }}
            <span class="index tw-font-normal">#{{ issue.number }}</span>
          </h1>
          <div class="issue-title-meta">
            <span
              class="ui label"
              :class="issue.state === 'open' ? 'green' : 'purple'"
            >
              <SvgIcon :name="issue.state === 'open' ? 'octicon-issue-opened' : 'octicon-issue-closed'" :size="16"/>
              {{ issue.state === 'open' ? 'Open' : 'Closed' }}
            </span>
            <span class="tw-ml-2">
              <RouterLink :to="`/${issue.user.login}`" class="author">{{ issue.user.login }}</RouterLink>
              opened this issue {{ timeAgo(issue.created_at) }}
              · {{ issue.comments }} comment{{ issue.comments === 1 ? '' : 's' }}
            </span>
          </div>
        </div>

        <div class="ui divider"/>

        <!-- Content + sidebar layout -->
        <div class="issue-content">
          <!-- Main: timeline of comments — matches .issue-content-left -->
          <div class="issue-content-left comment-list prevent-before-timeline">
            <div class="ui timeline">
              <!-- Issue body as first timeline comment -->
              <div class="timeline-item comment first">
                <a class="timeline-avatar" :href="`/${issue.user.login}`">
                  <img :src="issue.user.avatar_url" :alt="issue.user.login" width="40" height="40">
                </a>
                <div class="content comment-container">
                  <div class="comment-header avatar-content-left-arrow">
                    <div class="comment-header-left">
                      <a class="inline-timeline-avatar" :href="`/${issue.user.login}`">
                        <img :src="issue.user.avatar_url" :alt="issue.user.login" width="24" height="24">
                      </a>
                      <span class="tw-text-text-light muted-links">
                        <RouterLink :to="`/${issue.user.login}`">{{ issue.user.login }}</RouterLink>
                        opened {{ timeAgo(issue.created_at) }}
                      </span>
                    </div>
                  </div>
                  <div class="ui attached segment comment-body">
                    <div class="render-content markup">
                      <p>{{ issue.body || 'No description provided.' }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reply comments -->
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="timeline-item comment"
              >
                <a class="timeline-avatar" :href="`/${comment.user.login}`">
                  <img :src="comment.user.avatar_url" :alt="comment.user.login" width="40" height="40">
                </a>
                <div class="content comment-container">
                  <div class="comment-header avatar-content-left-arrow">
                    <div class="comment-header-left">
                      <a class="inline-timeline-avatar" :href="`/${comment.user.login}`">
                        <img :src="comment.user.avatar_url" :alt="comment.user.login" width="24" height="24">
                      </a>
                      <span class="tw-text-text-light muted-links">
                        <RouterLink :to="`/${comment.user.login}`">{{ comment.user.login }}</RouterLink>
                        commented {{ timeAgo(comment.created_at) }}
                      </span>
                    </div>
                  </div>
                  <div class="ui attached segment comment-body">
                    <div class="render-content markup">
                      <p>{{ comment.body || 'Empty comment.' }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="commentsLoading" class="timeline-item tw-text-center tw-py-4">
                <div class="ui active centered inline loader"/>
              </div>

              <!-- Add comment form (signed-in only) -->
              <div v-if="currentUser" class="timeline-item comment form">
                <a class="timeline-avatar" :href="`/${currentUser.login}`">
                  <img :src="currentUser.avatar_url" :alt="currentUser.login" width="40" height="40">
                </a>
                <div class="content">
                  <div v-if="commentError" class="ui negative message tw-mb-3">
                    <p>{{ commentError }}</p>
                  </div>
                  <div class="ui segment">
                    <textarea
                      v-model="newComment"
                      class="ui fluid textarea"
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
            </div>
          </div>

          <!-- Sidebar — matches .issue-content-right -->
          <div class="issue-content-right">
            <div class="sidebar-item-container">
              <div class="sidebar-item">
                <div class="header tw-font-semibold tw-mb-2">Labels</div>
                <div v-if="issue.labels.length === 0" class="text muted">None yet</div>
                <div v-else class="ui list labels-list">
                  <span
                    v-for="label in issue.labels"
                    :key="label.id"
                    class="ui label"
                    :style="{background: '#' + label.color}"
                  >
                    {{ label.name }}
                  </span>
                </div>
              </div>
              <div class="sidebar-item tw-mt-4">
                <div class="header tw-font-semibold tw-mb-2">Milestone</div>
                <div v-if="issue.milestone" class="text">
                  <RouterLink :to="`/${owner}/${repoName}/milestone/${issue.milestone.id}`">
                    {{ issue.milestone.title }}
                  </RouterLink>
                </div>
                <div v-else class="text muted">None yet</div>
              </div>
              <div class="sidebar-item tw-mt-4">
                <div class="header tw-font-semibold tw-mb-2">Assignees</div>
                <div v-if="issue.assignees && issue.assignees.length" class="text">
                  <div v-for="a in issue.assignees" :key="a.id" class="flex-text-block tw-gap-1 tw-mb-1">
                    <img :src="a.avatar_url" :alt="a.login" class="ui avatar image" width="20" height="20">
                    <RouterLink :to="`/${a.login}`">{{ a.login }}</RouterLink>
                  </div>
                </div>
                <div v-else class="text muted">None yet</div>
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
import RepoNav from '../components/RepoNav.vue';
import {SvgIcon} from '../../svg.ts';
import {
  getIssue, getIssueComments, getCurrentUser, createIssueComment,
  getRepo, isRepoStarred, starRepo, unstarRepo,
  type Issue, type Comment, type User, type Repository,
} from '../api/index.ts';

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
const repo = ref<Repository | null>(null);
const starred = ref(false);
const starLoading = ref(false);

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

async function toggleStar() {
  if (!currentUser.value || starLoading.value) return;
  starLoading.value = true;
  try {
    if (starred.value) {
      await unstarRepo(owner, repoName);
      starred.value = false;
      if (repo.value) repo.value.stars_count = (repo.value.stars_count ?? 1) - 1;
    } else {
      await starRepo(owner, repoName);
      starred.value = true;
      if (repo.value) repo.value.stars_count = (repo.value.stars_count ?? 0) + 1;
    }
  } finally {
    starLoading.value = false;
  }
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
  const user = await getCurrentUser();
  currentUser.value = user;

  const [repoData] = await Promise.all([
    getRepo(owner, repoName).catch(() => null),
    user ? isRepoStarred(owner, repoName).then((s) => { starred.value = s; }).catch(() => {}) : Promise.resolve(),
  ]);
  repo.value = repoData;

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
