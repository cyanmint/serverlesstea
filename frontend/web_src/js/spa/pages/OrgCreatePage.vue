<template>
  <AppLayout>
    <div role="main" class="page-content organization new org">
      <div class="ui container medium-width">
        <div v-if="error" class="ui negative message"><p>{{ error }}</p></div>
        <h3 class="ui top attached header">New Organization</h3>
        <div class="ui attached segment">
          <form class="ui form left-right-form" @submit.prevent="handleSubmit">
            <div class="inline required field" :class="{error: !!error}">
              <label for="org_name">Organization Name</label>
              <input id="org_name" v-model="orgName" name="org_name" autofocus required maxlength="40">
              <span class="help">Name must consist of alphanumeric characters, '-', or '_'.</span>
            </div>

            <div class="inline field required">
              <label>Visibility</label>
              <div class="inline-right">
                <div class="ui radio checkbox">
                  <input v-model="visibility" class="enable-system-radio" name="visibility" type="radio" value="0">
                  <label>Public</label>
                </div>
                <div class="ui radio checkbox">
                  <input v-model="visibility" class="enable-system-radio" name="visibility" type="radio" value="1">
                  <label>Limited</label>
                </div>
                <div class="ui radio checkbox">
                  <input v-model="visibility" class="enable-system-radio" name="visibility" type="radio" value="2">
                  <label>Private</label>
                </div>
              </div>
            </div>

            <div class="inline field">
              <label>Permission</label>
              <div class="ui checkbox">
                <input v-model="repoAdminChangeTeamAccess" type="checkbox" name="repo_admin_change_team_access">
                <label>Allow repo admins to change team access</label>
              </div>
            </div>

            <div class="inline field">
              <label/>
              <button class="ui primary button" type="submit" :disabled="loading">
                <span v-if="loading">Creating…</span>
                <span v-else>Create Organization</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {apiBase} from '../spaconfig.ts';
import {getStoredToken} from '../api/index.ts';

const router = useRouter();
const orgName = ref('');
const visibility = ref('0');
const repoAdminChangeTeamAccess = ref(false);
const loading = ref(false);
const error = ref('');

async function handleSubmit() {
  loading.value = true;
  error.value = '';
  try {
    const token = getStoredToken();
    const resp = await fetch(`${apiBase}/orgs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? {Authorization: `token ${token}`} : {}),
      },
      body: JSON.stringify({
        username: orgName.value,
        visibility: ['public', 'limited', 'private'][parseInt(visibility.value)],
        repo_admin_change_team_access: repoAdminChangeTeamAccess.value,
      }),
    });
    if (!resp.ok) {
      const body = await resp.json().catch(() => ({message: 'Unknown error'})) as {message: string};
      throw new Error(body.message ?? 'Failed to create organization');
    }
    const org = await resp.json() as {name: string};
    router.push(`/org/${org.name}`);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to create organization';
  } finally {
    loading.value = false;
  }
}
</script>
