<template>
  <AppLayout>
    <div class="ui container tw-py-4 tw-max-w-3xl">
      <!-- Breadcrumb -->
      <div class="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-mb-4">
        <RouterLink :to="`/${owner}/${repoName}`" class="tw-text-blue-600 hover:tw-underline tw-font-medium">
          {{ owner }}/{{ repoName }}
        </RouterLink>
        <span class="tw-text-gray-400">/</span>
        <RouterLink :to="`/${owner}/${repoName}/issues`" class="tw-text-blue-600 hover:tw-underline">Issues</RouterLink>
        <span class="tw-text-gray-400">/</span>
        <span class="tw-font-semibold">New Issue</span>
      </div>

      <h1 class="tw-text-2xl tw-font-bold tw-mb-6">New Issue</h1>

      <div v-if="!currentUser" class="ui warning message">
        <p>You must be signed in to create an issue.</p>
        <RouterLink to="/user/login" class="ui small primary button tw-mt-2">Sign In</RouterLink>
      </div>

      <form v-else class="ui form" @submit.prevent="handleSubmit">
        <div v-if="errorMessage" class="ui negative message tw-mb-4">
          <p>{{ errorMessage }}</p>
        </div>

        <div class="field" :class="{error: titleError}">
          <label for="issue-title">Title <span class="tw-text-red-500">*</span></label>
          <input
            id="issue-title"
            v-model="title"
            type="text"
            placeholder="Brief description of the issue"
            maxlength="255"
            required
            @input="titleError = ''"
          >
          <div v-if="titleError" class="ui pointing red label">{{ titleError }}</div>
        </div>

        <div class="field">
          <label for="issue-body">Description</label>
          <textarea
            id="issue-body"
            v-model="body"
            rows="10"
            placeholder="Provide more details about the issue…"
          />
        </div>

        <div class="tw-flex tw-gap-3 tw-justify-end tw-mt-4">
          <RouterLink :to="`/${owner}/${repoName}/issues`" class="ui button">
            Cancel
          </RouterLink>
          <button
            type="submit"
            class="ui primary button"
            :class="{loading: submitting}"
            :disabled="submitting || !title.trim()"
          >
            Submit New Issue
          </button>
        </div>
      </form>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {RouterLink, useRoute, useRouter} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getCurrentUser, createIssue, type User} from '../api/index.ts';

const route = useRoute();
const router = useRouter();

const owner = String(route.params.owner);
const repoName = String(route.params.repo);

const currentUser = ref<User | null>(null);
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
  currentUser.value = await getCurrentUser();
});
</script>
