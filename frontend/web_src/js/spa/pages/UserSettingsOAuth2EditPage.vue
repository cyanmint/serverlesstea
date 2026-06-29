<!-- Translated from: templates/user/settings/applications_oauth2_edit.tmpl -->
<template>
  <AppLayout page-class="user settings applications" title="Edit OAuth2 Application">
    <div class="ui container">
      <h4 class="ui top attached header">Edit OAuth2 Application</h4>
      <div class="ui attached segment">
        <BaseAlert :flash="flash"/>
        <form class="ui form" @submit.prevent="saveApp">
          <div class="required field">
            <label>Application Name</label>
            <input v-model="form.name" required>
          </div>
          <div class="required field">
            <label>Redirect URIs (one per line)</label>
            <textarea v-model="form.redirect_uris" rows="3" required></textarea>
          </div>
          <div class="field">
            <label>Client ID</label>
            <input :value="app?.client_id" disabled>
          </div>
          <div class="field">
            <label>Client Secret</label>
            <div class="tw-flex tw-gap-2">
              <input :value="clientSecret || '••••••••'" disabled class="tw-flex-1">
              <button type="button" class="ui button" @click="regenerateSecret">Regenerate Secret</button>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox">
              <input v-model="form.confidential_client" type="checkbox">
              <label>Confidential Client</label>
            </div>
          </div>
          <div class="field">
            <button class="ui primary button" type="submit" :disabled="submitting">Save</button>
            <button type="button" class="ui red button" @click="deleteApp">Delete</button>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import {apiBase} from '../spaconfig.ts';
import {getStoredToken} from '../api/index.ts';

const route = useRoute();
const router = useRouter();
const appId = route.params.id as string;
const token = getStoredToken() ?? '';
const headers = {'Content-Type': 'application/json', Authorization: `token ${token}`};

const app = ref<any>(null);
const form = ref({name: '', redirect_uris: '', confidential_client: true});
const clientSecret = ref('');
const submitting = ref(false);
const flash = ref<{error?: string; success?: string}>({});

async function loadApp() {
  try {
    const resp = await fetch(`${apiBase}/user/applications/oauth2/${appId}`, {headers: {Authorization: `token ${token}`}});
    if (resp.ok) {
      app.value = await resp.json();
      form.value.name = app.value.name;
      form.value.redirect_uris = (app.value.redirect_uris || []).join('\n');
      form.value.confidential_client = app.value.confidential_client ?? true;
    }
  } catch { /* empty */ }
}

async function saveApp() {
  submitting.value = true;
  flash.value = {};
  try {
    const resp = await fetch(`${apiBase}/user/applications/oauth2/${appId}`, {
      method: 'PATCH', headers,
      body: JSON.stringify({
        name: form.value.name,
        redirect_uris: form.value.redirect_uris.split('\n').map(s => s.trim()).filter(Boolean),
        confidential_client: form.value.confidential_client,
      }),
    });
    if (resp.ok) flash.value.success = 'Application updated.';
    else flash.value.error = 'Failed to save.';
  } catch { flash.value.error = 'Network error.'; }
  finally { submitting.value = false; }
}

async function regenerateSecret() {
  try {
    const resp = await fetch(`${apiBase}/user/applications/oauth2/${appId}`, {method: 'PATCH', headers, body: JSON.stringify({name: form.value.name, redirect_uris: form.value.redirect_uris.split('\n').filter(Boolean)})});
    if (resp.ok) {
      const data = await resp.json();
      clientSecret.value = data.client_secret || '';
    }
  } catch { /* empty */ }
}

async function deleteApp() {
  await fetch(`${apiBase}/user/applications/oauth2/${appId}`, {method: 'DELETE', headers: {Authorization: `token ${token}`}});
  router.push('/user/settings/applications');
}

onMounted(() => loadApp());
</script>
