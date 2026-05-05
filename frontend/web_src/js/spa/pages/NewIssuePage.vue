<template>
  <AppLayout page-class="repository new issue">
    <RepoNav
      :owner="owner"
      :repo-name="repoName"
      active-tab="issues"
      :repo="repo"
      :current-user="currentUser"
    />
    <div class="ui container">
      <div v-if="!currentUser" class="ui warning message">
        <p>You must be signed in to create an issue.</p>
        <RouterLink to="/user/login" class="ui small primary button tw-mt-2">Sign In</RouterLink>
      </div>

      <form v-else class="issue-content ui comment form" id="new-issue" @submit.prevent="handleSubmit">
        <div v-if="errorMessage" class="ui negative message tw-mb-4">
          <p>{{ errorMessage }}</p>
        </div>

        <div class="issue-content-left">
          <div class="ui comments">
            <div class="comment">
              <div class="tw-mr-4 not-mobile">
                <img
                  v-if="currentUser"
                  :src="currentUser.avatar_url"
                  :alt="currentUser.login"
                  class="ui avatar image"
                  width="40"
                  height="40"
                >
              </div>
              <div class="ui segment content tw-my-0 avatar-content-left-arrow">
                <div class="field" :class="{error: !!titleError}">
                  <input
                    id="issue_title"
                    v-model="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    maxlength="255"
                    autocomplete="off"
                    required
                    @input="titleError = ''"
                  >
                  <div v-if="titleError" class="ui pointing red label">{{ titleError }}</div>
                </div>
                <div class="field">
                  <textarea
                    v-model="body"
                    class="markdown-text-editor"
                    rows="10"
                    placeholder="Leave a comment"
                  />
                </div>
                <div class="flex-text-block tw-justify-end">
                  <button
                    type="submit"
                    class="ui primary button"
                    :class="{loading: submitting}"
                    :disabled="submitting || !title.trim()"
                  >
                    Submit New Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="issue-content-right ui segment">
          <div class="ui header">Labels</div>
          <div class="tw-text-placeholder-text tw-text-sm">No labels</div>
          <div class="divider"/>
          <div class="ui header">Milestone</div>
          <div class="tw-text-placeholder-text tw-text-sm">No milestone</div>
          <div class="divider"/>
          <div class="ui header">Assignees</div>
          <div class="tw-text-placeholder-text tw-text-sm">No assignees</div>
        </div>
      </form>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {RouterLink, useRoute, useRouter} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoNav from '../components/RepoNav.vue';
import {getCurrentUser, getRepo, createIssue, type User, type Repository} from '../api/index.ts';

const route = useRoute();
const router = useRouter();

const owner = String(route.params.owner);
const repoName = String(route.params.repo);

const currentUser = ref<User | null>(null);
const repo = ref<Repository | null>(null);
const title = ref('');
const body = ref('');
const titleError = ref('');
const errorMessage = ref('');
const submitting = ref(false);

async function handleSubmit() {
  titleError.value = '';
  errorMessage.value = '';

  if (!title.value.trim()) {
    titleError.value = 'Title is required.';
    return;
  }

  submitting.value = true;
  try {
    const issue = await createIssue(owner, repoName, {
      title: title.value.trim(),
      body: body.value.trim() || undefined,
    });
    router.push(`/${owner}/${repoName}/issues/${issue.number}`);
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Failed to create issue.';
  } finally {
    submitting.value = false;
  }
}

onMounted(async () => {
  [currentUser.value, repo.value] = await Promise.all([
    getCurrentUser(),
    getRepo(owner, repoName).catch(() => null),
  ]);
});
</script>
