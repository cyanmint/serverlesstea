<!-- Translated from: templates/repo/settings/options.tmpl -->
<template>
  <AppLayout :page-class="'repository settings options'" :title="`Settings - ${owner}/${repoName}`">
    <RepoHeader :owner="owner" :repo-name="repoName"/>
    <div class="ui container">
      <h4 class="ui top attached header">Basic Settings</h4>
      <div class="ui attached segment">
        <BaseAlert :flash="flash"/>
        <form class="ui form" @submit.prevent="saveSettings">
          <div class="required field">
            <label>Repository Name</label>
            <input v-model="form.name" required>
          </div>
          <div class="field">
            <label>Description</label>
            <textarea v-model="form.description" rows="2" maxlength="2048"></textarea>
          </div>
          <div class="field">
            <label>Website</label>
            <input v-model="form.website" type="url" maxlength="1024">
          </div>
          <div class="inline field">
            <div class="ui checkbox">
              <input v-model="form.private" type="checkbox">
              <label>Private</label>
            </div>
          </div>
          <div class="inline field">
            <div class="ui checkbox">
              <input v-model="form.template" type="checkbox">
              <label>Template repository</label>
            </div>
          </div>
          <div class="inline field">
            <div class="ui checkbox">
              <input v-model="form.has_issues" type="checkbox">
              <label>Issues</label>
            </div>
          </div>
          <div class="inline field">
            <div class="ui checkbox">
              <input v-model="form.has_wiki" type="checkbox">
              <label>Wiki</label>
            </div>
          </div>
          <div class="inline field">
            <div class="ui checkbox">
              <input v-model="form.has_pull_requests" type="checkbox">
              <label>Pull Requests</label>
            </div>
          </div>
          <div class="field">
            <button class="ui primary button" type="submit" :disabled="submitting">Update Settings</button>
          </div>
        </form>
      </div>

      <h4 class="ui top attached header tw-mt-4">Danger Zone</h4>
      <div class="ui attached segment">
        <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
          <div>
            <strong>Transfer Repository</strong>
            <p class="tw-text-text-light">Transfer this repository to another owner.</p>
          </div>
          <button class="ui yellow button" @click="transferConfirm = true">Transfer</button>
        </div>
        <div class="divider"></div>
        <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
          <div>
            <strong v-if="!repo?.archived">Archive Repository</strong>
            <strong v-else>Unarchive Repository</strong>
          </div>
          <button class="ui orange button" @click="toggleArchive">{{ repo?.archived ? 'Unarchive' : 'Archive' }}</button>
        </div>
        <div class="divider"></div>
        <div class="tw-flex tw-justify-between tw-items-center">
          <div>
            <strong>Delete This Repository</strong>
            <p class="tw-text-text-light">Once deleted, it cannot be recovered.</p>
          </div>
          <button class="ui red button" @click="deleteConfirm = true">Delete this repository</button>
        </div>
      </div>

      <!-- Delete confirmation -->
      <div v-if="deleteConfirm" class="ui small modal active">
        <div class="header">Delete Repository</div>
        <div class="content">
          <p>This action is irreversible. Type <strong>{{ owner }}/{{ repoName }}</strong> to confirm:</p>
          <div class="ui input tw-w-full"><input v-model="deleteInput" type="text"></div>
        </div>
        <div class="actions">
          <button class="ui button" @click="deleteConfirm=false">Cancel</button>
          <button class="ui red button" :disabled="deleteInput !== `${owner}/${repoName}`" @click="deleteRepo">Delete</button>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import RepoHeader from '../components/RepoHeader.vue';
import {apiBase} from '../spaconfig.ts';
import {getStoredToken} from '../api/index.ts';

const route = useRoute();
const router = useRouter();
const owner = route.params.owner as string;
const repoName = route.params.repo as string;
const token = getStoredToken() ?? '';
const headers = {'Content-Type': 'application/json', Authorization: `token ${token}`};

const repo = ref<any>(null);
const form = ref({name: '', description: '', website: '', private: false, template: false, has_issues: true, has_wiki: true, has_pull_requests: true});
const submitting = ref(false);
const flash = ref<{error?: string; success?: string}>({});
const deleteConfirm = ref(false);
const transferConfirm = ref(false);
const deleteInput = ref('');

async function loadRepo() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}`, {headers: {Authorization: `token ${token}`}});
    if (resp.ok) {
      repo.value = await resp.json();
      form.value = {
        name: repo.value.name,
        description: repo.value.description || '',
        website: repo.value.website || '',
        private: repo.value.private,
        template: repo.value.template || false,
        has_issues: repo.value.has_issues,
        has_wiki: repo.value.has_wiki,
        has_pull_requests: repo.value.has_pull_requests,
      };
    }
  } catch { /* empty */ }
}

async function saveSettings() {
  submitting.value = true;
  flash.value = {};
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}`, {method: 'PATCH', headers, body: JSON.stringify(form.value)});
    if (resp.ok) flash.value.success = 'Settings updated successfully.';
    else { const body = await resp.json().catch(() => ({})); flash.value.error = body.message || 'Failed to update.'; }
  } catch { flash.value.error = 'Network error.'; }
  finally { submitting.value = false; }
}

async function toggleArchive() {
  const action = repo.value?.archived ? 'unarchive' : 'archive';
  await fetch(`${apiBase}/repos/${owner}/${repoName}`, {method: 'PATCH', headers, body: JSON.stringify({archived: !repo.value?.archived})});
  await loadRepo();
}

async function deleteRepo() {
  const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}`, {method: 'DELETE', headers: {Authorization: `token ${token}`}});
  if (resp.ok || resp.status === 204) router.push('/');
}

onMounted(() => loadRepo());
</script>
