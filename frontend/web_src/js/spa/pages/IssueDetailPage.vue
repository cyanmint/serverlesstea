<!-- Translated from: templates/repo/issue/view.tmpl + repo/issue/view_title.tmpl + repo/issue/view_content.tmpl -->
<template>
  <AppLayout :page-class="'repository view issue'" :title="issue ? `${issue.title} · Issue #${issue.number}` : 'Issue'">
    <RepoHeader :owner="owner" :repo-name="repoName"/>
    <div class="ui container">
      <!-- Title -->
      <div v-if="issue" class="issue-title-header">
        <h1>
          {{ issue.title }}
          <span class="tw-text-text-light-3">#{{ issue.number }}</span>
        </h1>
        <div class="tw-flex tw-items-center tw-gap-2 tw-my-2">
          <span :class="['ui label', issue.state === 'open' ? 'green' : 'red']">{{ issue.state === 'open' ? 'Open' : 'Closed' }}</span>
          <span class="tw-text-text-light">
            {{ issue.user?.login }} opened this issue {{ formatDate(issue.created_at) }} · {{ issue.comments }} comments
          </span>
        </div>
      </div>
      <div class="divider"></div>
      <!-- Body -->
      <div v-if="issue" class="ui grid">
        <div class="twelve wide column">
          <!-- Issue body -->
          <div class="timeline-item comment first">
            <div class="content comment-container">
              <div class="header">
                <RouterLink :to="`/${issue.user?.login}`"><strong>{{ issue.user?.login }}</strong></RouterLink>
                <span class="tw-text-text-light"> commented {{ formatDate(issue.created_at) }}</span>
              </div>
              <div class="render-content markup" v-html="renderedBody"></div>
            </div>
          </div>
          <!-- Comments -->
          <div v-for="comment in comments" :key="comment.id" class="timeline-item comment tw-mt-4">
            <div class="content comment-container">
              <div class="header">
                <RouterLink :to="`/${comment.user?.login}`"><strong>{{ comment.user?.login }}</strong></RouterLink>
                <span class="tw-text-text-light"> commented {{ formatDate(comment.created_at) }}</span>
              </div>
              <div class="render-content markup" v-html="comment.body_html || comment.body"></div>
            </div>
          </div>
          <!-- New comment form -->
          <div v-if="canComment" class="tw-mt-4">
            <form class="ui form" @submit.prevent="postComment">
              <div class="field">
                <textarea v-model="newComment" rows="4" placeholder="Leave a comment…"></textarea>
              </div>
              <button class="ui primary button" type="submit" :disabled="!newComment.trim()">Comment</button>
            </form>
          </div>
        </div>
        <!-- Sidebar -->
        <div class="four wide column">
          <div v-if="issue.labels?.length" class="tw-mb-4">
            <h5>Labels</h5>
            <span v-for="label in issue.labels" :key="label.id" class="ui label tw-mr-1 tw-mb-1" :style="{backgroundColor: '#' + label.color}">{{ label.name }}</span>
          </div>
          <div v-if="issue.milestone" class="tw-mb-4">
            <h5>Milestone</h5>
            <span>{{ issue.milestone.title }}</span>
          </div>
          <div v-if="issue.assignees?.length" class="tw-mb-4">
            <h5>Assignees</h5>
            <div v-for="a in issue.assignees" :key="a.id" class="tw-flex tw-items-center tw-gap-1 tw-mb-1">
              <img :src="a.avatar_url" width="20" height="20" class="ui circular image">
              <RouterLink :to="`/${a.login}`">{{ a.login }}</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="loading" class="tw-text-center tw-py-8">Loading…</div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoHeader from '../components/RepoHeader.vue';
import {apiBase} from '../spaconfig.ts';
import {getStoredToken} from '../api/index.ts';

const route = useRoute();
const owner = route.params.owner as string;
const repoName = route.params.repo as string;
const issueNumber = route.params.index as string;
const token = getStoredToken() ?? '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const issue = ref<any>(null);
const comments = ref<any[]>([]);
const renderedBody = ref('');
const newComment = ref('');
const loading = ref(true);
const canComment = ref(!!token);

function formatDate(d: string) { return d ? new Date(d).toLocaleDateString() : ''; }

async function loadIssue() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/issues/${issueNumber}`, {headers});
    if (resp.ok) {
      issue.value = await resp.json();
      renderedBody.value = issue.value.body_html || issue.value.body || '';
    }
  } catch { /* empty */ }
}

async function loadComments() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/issues/${issueNumber}/comments`, {headers});
    if (resp.ok) comments.value = await resp.json();
  } catch { /* empty */ }
}

async function postComment() {
  if (!newComment.value.trim()) return;
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/issues/${issueNumber}/comments`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', ...headers},
      body: JSON.stringify({body: newComment.value}),
    });
    if (resp.ok) {
      const comment = await resp.json();
      comments.value.push(comment);
      newComment.value = '';
    }
  } catch { /* empty */ }
}

onMounted(async () => {
  await Promise.all([loadIssue(), loadComments()]);
  loading.value = false;
});
</script>
