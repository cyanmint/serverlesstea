<!-- Translated from: templates/org/create.tmpl -->
<template>
  <AppLayout page-class="organization new org" title="New Organization">
    <div class="ui container medium-width">
      <BaseAlert :flash="flash"/>
      <h3 class="ui top attached header">New Organization</h3>
      <div class="ui attached segment">
        <form class="ui form left-right-form" @submit.prevent="handleCreate">
          <div class="inline required field" :class="{error: !!errors.org_name}">
            <label for="org_name">Organization Name</label>
            <input id="org_name" v-model="form.org_name" name="org_name" autofocus required maxlength="40">
            <span class="help">Organization name cannot be changed later.</span>
          </div>
          <div class="inline field required">
            <label for="visibility">Visibility</label>
            <div class="inline-right">
              <div class="ui radio checkbox">
                <input v-model="form.visibility" name="visibility" type="radio" value="public">
                <label>Public</label>
              </div>
              <div class="ui radio checkbox">
                <input v-model="form.visibility" name="visibility" type="radio" value="limited">
                <label>Limited</label>
              </div>
              <div class="ui radio checkbox">
                <input v-model="form.visibility" name="visibility" type="radio" value="private">
                <label>Private</label>
              </div>
            </div>
          </div>
          <div class="inline field">
            <label>Permissions</label>
            <div class="ui checkbox">
              <input v-model="form.repo_admin_change_team_access" type="checkbox">
              <label>Allow repository administrators to change team access</label>
            </div>
          </div>
          <div class="inline field">
            <label></label>
            <button class="ui primary button" type="submit" :disabled="submitting">Create Organization</button>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import {apiBase} from '../spaconfig.ts';
import {getStoredToken} from '../api/index.ts';

const router = useRouter();
const token = getStoredToken() ?? '';
const submitting = ref(false);
const flash = ref<{error?: string}>({});
const errors = ref<{org_name?: string}>({});
const form = ref({
  org_name: '',
  visibility: 'public',
  repo_admin_change_team_access: true,
});

async function handleCreate() {
  submitting.value = true;
  flash.value = {};
  errors.value = {};
  try {
    const resp = await fetch(`${apiBase}/orgs`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: `token ${token}`},
      body: JSON.stringify({
        username: form.value.org_name,
        visibility: form.value.visibility,
        repo_admin_change_team_access: form.value.repo_admin_change_team_access,
      }),
    });
    if (resp.ok || resp.status === 201) {
      const data = await resp.json();
      router.push(`/${data.username || form.value.org_name}`);
    } else {
      const body = await resp.json().catch(() => ({}));
      flash.value.error = body.message || 'Failed to create organization.';
    }
  } catch {
    flash.value.error = 'Network error.';
  } finally {
    submitting.value = false;
  }
}
</script>
