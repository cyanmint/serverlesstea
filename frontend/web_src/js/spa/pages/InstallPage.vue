<!-- Translated from: templates/install.tmpl -->
<template>
  <AppLayout page-class="install" title="Installation">
    <div class="ui container medium-width">
      <h3 class="ui top attached header">Initial Configuration</h3>
      <div class="ui attached segment">
        <BaseAlert :flash="flash"/>
        <form class="ui form left-right-form" @submit.prevent="handleInstall">
          <!-- Database Settings -->
          <h4 class="ui dividing header">Database Settings</h4>
          <div class="inline required field">
            <label for="db_type">Database Type</label>
            <select id="db_type" v-model="form.db_type" name="db_type">
              <option value="sqlite3">SQLite3</option>
              <option value="mysql">MySQL</option>
              <option value="postgres">PostgreSQL</option>
            </select>
          </div>
          <div v-if="form.db_type !== 'sqlite3'" class="inline required field">
            <label for="db_host">Host</label>
            <input id="db_host" v-model="form.db_host" name="db_host">
          </div>
          <div class="inline required field">
            <label for="db_name">Database Name</label>
            <input id="db_name" v-model="form.db_name" name="db_name">
          </div>

          <!-- General Settings -->
          <h4 class="ui dividing header">General Settings</h4>
          <div class="inline required field">
            <label for="app_name">Site Title</label>
            <input id="app_name" v-model="form.app_name" name="app_name">
          </div>
          <div class="inline required field">
            <label for="app_url">Server Domain</label>
            <input id="app_url" v-model="form.app_url" name="app_url">
          </div>

          <!-- Admin Account -->
          <h4 class="ui dividing header">Admin Account</h4>
          <div class="inline required field">
            <label for="admin_name">Username</label>
            <input id="admin_name" v-model="form.admin_name" name="admin_name" autocomplete="username">
          </div>
          <div class="inline required field">
            <label for="admin_passwd">Password</label>
            <input id="admin_passwd" v-model="form.admin_passwd" name="admin_passwd" type="password" autocomplete="new-password">
          </div>
          <div class="inline required field">
            <label for="admin_email">Email</label>
            <input id="admin_email" v-model="form.admin_email" name="admin_email" type="email">
          </div>

          <div class="divider"></div>
          <div class="inline field">
            <button class="ui primary button" type="submit" :disabled="submitting">Install Gitea</button>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import {apiBase} from '../spaconfig.ts';

const submitting = ref(false);
const flash = ref<{error?: string; success?: string}>({});
const form = ref({
  db_type: 'sqlite3',
  db_host: '127.0.0.1:3306',
  db_name: 'gitea',
  app_name: 'Gitea: Git with a cup of tea',
  app_url: window.location.origin,
  admin_name: '',
  admin_passwd: '',
  admin_email: '',
});

async function handleInstall() {
  submitting.value = true;
  flash.value = {};
  try {
    const resp = await fetch(`${apiBase}/../install`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form.value),
    });
    if (resp.ok) {
      flash.value.success = 'Installation complete! Redirecting…';
      setTimeout(() => { window.location.href = '/'; }, 2000);
    } else {
      const body = await resp.json().catch(() => ({}));
      flash.value.error = body.message || 'Installation failed.';
    }
  } catch {
    flash.value.error = 'Network error.';
  } finally {
    submitting.value = false;
  }
}
</script>
