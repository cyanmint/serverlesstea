<!-- Translated from: templates/repo/create.tmpl -->
<template>
  <AppLayout page-class="repository new-repo" title="New Repository">
    <div class="ui container medium-width">
      <h3 class="ui top attached header">New Repository</h3>
      <div class="ui attached segment">
        <BaseAlert :flash="flash"/>
        <form class="ui form left-right-form" @submit.prevent="handleCreate">
          <div class="inline required field">
            <label>Owner</label>
            <select v-model="form.owner" class="ui dropdown">
              <option v-if="currentUser" :value="currentUser.login">{{ currentUser.login }}</option>
              <option v-for="o in orgs" :key="o.id" :value="o.username">{{ o.username }}</option>
            </select>
          </div>
          <div class="inline required field">
            <label for="repo_name">Repository Name</label>
            <input id="repo_name" v-model="form.name" name="repo_name" autofocus required maxlength="100">
          </div>
          <div class="inline field">
            <label>Visibility</label>
            <div class="ui checkbox">
              <input v-model="form.private" type="checkbox">
              <label>Make this repository private</label>
            </div>
          </div>
          <div class="inline field">
            <label for="description">Description</label>
            <textarea id="description" v-model="form.description" rows="2" maxlength="2048"></textarea>
          </div>
          <div class="inline field">
            <label>Initialize</label>
            <div class="ui checkbox">
              <input v-model="form.auto_init" type="checkbox">
              <label>Initialize this repository with a README</label>
            </div>
          </div>
          <div class="inline field">
            <label for="gitignores">.gitignore</label>
            <select id="gitignores" v-model="form.gitignores" class="ui dropdown">
              <option value="">None</option>
              <option v-for="gi in gitignoreList" :key="gi" :value="gi">{{ gi }}</option>
            </select>
          </div>
          <div class="inline field">
            <label for="license">License</label>
            <select id="license" v-model="form.license" class="ui dropdown">
              <option value="">None</option>
              <option v-for="l in licenseList" :key="l" :value="l">{{ l }}</option>
            </select>
          </div>
          <div class="inline field">
            <label for="default_branch">Default Branch</label>
            <input id="default_branch" v-model="form.default_branch" placeholder="main">
          </div>
          <div class="divider"></div>
          <div class="inline field">
            <button class="ui primary button" type="submit" :disabled="submitting">Create Repository</button>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import {apiBase} from '../spaconfig.ts';
import {getCurrentUser} from '../api/index.ts';

const router = useRouter();
const token = localStorage.getItem('gitea-spa-token') || '';
const headers = {'Content-Type': 'application/json', Authorization: `token ${token}`};

const currentUser = ref<any>(null);
const orgs = ref<any[]>([]);
const gitignoreList = ref<string[]>([]);
const licenseList = ref<string[]>([]);
const submitting = ref(false);
const flash = ref<{error?: string}>({});
const form = ref({
  owner: '',
  name: '',
  private: false,
  description: '',
  auto_init: true,
  gitignores: '',
  license: '',
  default_branch: 'main',
});

async function loadMeta() {
  try {
    currentUser.value = await getCurrentUser();
    form.value.owner = currentUser.value?.login || '';
    const [orgResp, giResp, licResp] = await Promise.all([
      fetch(`${apiBase}/user/orgs`, {headers: {Authorization: `token ${token}`}}),
      fetch(`${apiBase}/gitignore/templates`),
      fetch(`${apiBase}/licenses`),
    ]);
    if (orgResp.ok) orgs.value = await orgResp.json();
    if (giResp.ok) gitignoreList.value = await giResp.json();
    if (licResp.ok) licenseList.value = (await licResp.json()).map((l: any) => l.name || l);
  } catch { /* empty */ }
}

async function handleCreate() {
  submitting.value = true;
  flash.value = {};
  try {
    const resp = await fetch(`${apiBase}/user/repos`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: form.value.name,
        description: form.value.description,
        private: form.value.private,
        auto_init: form.value.auto_init,
        gitignores: form.value.gitignores,
        license: form.value.license,
        default_branch: form.value.default_branch || 'main',
      }),
    });
    if (resp.ok || resp.status === 201) {
      const data = await resp.json();
      router.push(`/${data.full_name}`);
    } else {
      const body = await resp.json().catch(() => ({}));
      flash.value.error = body.message || 'Failed to create repository.';
    }
  } catch {
    flash.value.error = 'Network error.';
  } finally {
    submitting.value = false;
  }
}

onMounted(() => loadMeta());
</script>
