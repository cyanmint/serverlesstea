<!-- Translated from: templates/repo/issue/new.tmpl + repo/issue/new_form.tmpl -->
<template>
  <AppLayout :page-class="'repository new issue'" :title="`New Issue - ${owner}/${repoName}`">
    <RepoHeader :owner="owner" :repo-name="repoName"/>
    <div class="ui container">
      <form class="ui form" @submit.prevent="handleSubmit">
        <BaseAlert :flash="flash"/>
        <div class="required field">
          <label for="issue_title">Title</label>
          <input id="issue_title" v-model="form.title" type="text" autofocus required placeholder="Title">
        </div>
        <div class="field">
          <label>Write</label>
          <textarea v-model="form.body" rows="10" placeholder="Leave a comment"></textarea>
        </div>
        <div class="ui grid">
          <div class="twelve wide column">
            <button class="ui primary button" type="submit" :disabled="submitting">Submit New Issue</button>
          </div>
          <div class="four wide column">
            <div v-if="labels.length" class="tw-mb-4">
              <label class="tw-font-bold">Labels</label>
              <div v-for="label in labels" :key="label.id" class="ui checkbox tw-block tw-my-1">
                <input v-model="selectedLabels" :value="label.id" type="checkbox">
                <label :style="{color: '#' + label.color}">{{ label.name }}</label>
              </div>
            </div>
            <div v-if="milestones.length" class="tw-mb-4">
              <label class="tw-font-bold">Milestone</label>
              <select v-model="form.milestone" class="ui dropdown tw-w-full">
                <option value="">None</option>
                <option v-for="m in milestones" :key="m.id" :value="m.id">{{ m.title }}</option>
              </select>
            </div>
            <div v-if="assignees.length" class="tw-mb-4">
              <label class="tw-font-bold">Assignees</label>
              <div v-for="a in assignees" :key="a.id" class="ui checkbox tw-block tw-my-1">
                <input v-model="selectedAssignees" :value="a.login" type="checkbox">
                <label>{{ a.login }}</label>
              </div>
            </div>
          </div>
        </div>
      </form>
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

const route = useRoute();
const router = useRouter();
const owner = route.params.owner as string;
const repoName = route.params.repo as string;
const token = localStorage.getItem('gitea-spa-token') || '';
const headers = {'Content-Type': 'application/json', Authorization: `token ${token}`};

const form = ref({title: '', body: '', milestone: ''});
const labels = ref<any[]>([]);
const milestones = ref<any[]>([]);
const assignees = ref<any[]>([]);
const selectedLabels = ref<number[]>([]);
const selectedAssignees = ref<string[]>([]);
const submitting = ref(false);
const flash = ref<{error?: string}>({});

async function loadMeta() {
  try {
    const [labelsResp, msResp, assigneesResp] = await Promise.all([
      fetch(`${apiBase}/repos/${owner}/${repoName}/labels`, {headers: {Authorization: `token ${token}`}}),
      fetch(`${apiBase}/repos/${owner}/${repoName}/milestones`, {headers: {Authorization: `token ${token}`}}),
      fetch(`${apiBase}/repos/${owner}/${repoName}/assignees`, {headers: {Authorization: `token ${token}`}}),
    ]);
    if (labelsResp.ok) labels.value = await labelsResp.json();
    if (msResp.ok) milestones.value = await msResp.json();
    if (assigneesResp.ok) assignees.value = await assigneesResp.json();
  } catch { /* empty */ }
}

async function handleSubmit() {
  submitting.value = true;
  flash.value = {};
  try {
    const body: any = {
      title: form.value.title,
      body: form.value.body,
    };
    if (selectedLabels.value.length) body.labels = selectedLabels.value;
    if (form.value.milestone) body.milestone = Number(form.value.milestone);
    if (selectedAssignees.value.length) body.assignees = selectedAssignees.value;
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/issues`, {method: 'POST', headers, body: JSON.stringify(body)});
    if (resp.ok || resp.status === 201) {
      const issue = await resp.json();
      router.push(`/${owner}/${repoName}/issues/${issue.number}`);
    } else {
      const data = await resp.json().catch(() => ({}));
      flash.value.error = data.message || 'Failed to create issue.';
    }
  } catch { flash.value.error = 'Network error.'; }
  finally { submitting.value = false; }
}

onMounted(() => loadMeta());
</script>
