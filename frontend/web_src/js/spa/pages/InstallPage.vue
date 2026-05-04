<template>
  <div class="ui container tw-py-8 tw-max-w-2xl tw-mx-auto">
    <div class="tw-text-center tw-mb-8">
      <h1 class="tw-text-3xl tw-font-bold">Install Gitea</h1>
      <p class="tw-text-gray-500 tw-mt-1">Configure the server before first use</p>
    </div>

    <div v-if="success" class="ui success message tw-mb-6">
      <h3>Installation complete!</h3>
      <p>Gitea has been configured. <a :href="backendUrl" class="tw-underline">Go to your Gitea instance →</a></p>
    </div>

    <div v-else>
      <div v-if="submitError" class="ui negative message tw-mb-4">
        <p>{{ submitError }}</p>
      </div>

      <form class="ui form" @submit.prevent="submit">
        <!-- ── Database ──────────────────────────────────────────────────── -->
        <h3 class="ui dividing header">Database Settings</h3>

        <div class="field">
          <label>Database Type</label>
          <select v-model="form.db_type" class="ui fluid dropdown">
            <option value="sqlite3">SQLite3</option>
            <option value="mysql">MySQL</option>
            <option value="postgres">PostgreSQL</option>
            <option value="mssql">MSSQL</option>
          </select>
        </div>

        <template v-if="form.db_type === 'sqlite3'">
          <div class="field">
            <label>Database Path</label>
            <input v-model="form.db_path" type="text" placeholder="/data/gitea/data/gitea.db">
          </div>
        </template>

        <template v-else>
          <div class="two fields">
            <div class="field">
              <label>Host</label>
              <input v-model="form.db_host" type="text" placeholder="127.0.0.1:3306">
            </div>
            <div class="field">
              <label>Database Name</label>
              <input v-model="form.db_name" type="text" placeholder="gitea">
            </div>
          </div>
          <div class="two fields">
            <div class="field">
              <label>Username</label>
              <input v-model="form.db_user" type="text" placeholder="gitea">
            </div>
            <div class="field">
              <label>Password</label>
              <input v-model="form.db_passwd" type="password">
            </div>
          </div>
          <div class="two fields">
            <div class="field">
              <label>SSL Mode</label>
              <select v-model="form.ssl_mode" class="ui fluid dropdown">
                <option value="disable">Disable</option>
                <option value="require">Require</option>
                <option value="verify-full">Verify Full</option>
              </select>
            </div>
            <div class="field">
              <label>Schema (PostgreSQL only)</label>
              <input v-model="form.db_schema" type="text" placeholder="">
            </div>
          </div>
        </template>

        <!-- ── Application ─────────────────────────────────────────────── -->
        <h3 class="ui dividing header">Application Settings</h3>

        <div class="field">
          <label>Site Title</label>
          <input v-model="form.app_name" type="text" placeholder="Gitea: Git with a cup of tea">
        </div>

        <div class="two fields">
          <div class="field">
            <label>Application URL</label>
            <input v-model="form.app_url" type="url" placeholder="http://localhost:3000/">
          </div>
          <div class="field">
            <label>HTTP Port</label>
            <input v-model="form.http_port" type="text" placeholder="3000">
          </div>
        </div>

        <div class="two fields">
          <div class="field">
            <label>Domain</label>
            <input v-model="form.domain" type="text" placeholder="localhost">
          </div>
          <div class="field">
            <label>SSH Port</label>
            <input v-model="form.ssh_port" type="number" placeholder="22">
          </div>
        </div>

        <div class="field">
          <label>Repository Root Path</label>
          <input v-model="form.repo_root_path" type="text" placeholder="/home/git/repositories">
        </div>

        <div class="field">
          <label>Git LFS Root Path</label>
          <input v-model="form.lfs_root_path" type="text" placeholder="/data/gitea/lfs">
        </div>

        <div class="field">
          <label>Log Path</label>
          <input v-model="form.log_root_path" type="text" placeholder="/data/gitea/log">
        </div>

        <div class="field">
          <label>Run As Username</label>
          <input v-model="form.run_user" type="text" placeholder="git">
        </div>

        <!-- ── Optional ─────────────────────────────────────────────────── -->
        <h3 class="ui dividing header">Optional Settings</h3>

        <div class="field">
          <div class="ui checkbox">
            <input v-model="form.disable_registration" type="checkbox" id="disable_registration">
            <label for="disable_registration">Disable user self-registration</label>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input v-model="form.require_sign_in_view" type="checkbox" id="require_sign_in_view">
            <label for="require_sign_in_view">Require sign-in to view pages</label>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input v-model="form.default_allow_create_organization" type="checkbox" id="default_allow_create_organization">
            <label for="default_allow_create_organization">Allow users to create organisations</label>
          </div>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input v-model="form.enable_update_checker" type="checkbox" id="enable_update_checker">
            <label for="enable_update_checker">Enable update checker</label>
          </div>
        </div>

        <!-- ── Admin account ────────────────────────────────────────────── -->
        <h3 class="ui dividing header">Administrator Account</h3>
        <p class="tw-text-sm tw-text-gray-500 tw-mb-3">
          Leave blank to create the first user as administrator, or fill in to create an admin account now.
        </p>

        <div class="field">
          <label>Username</label>
          <input v-model="form.admin_name" type="text" autocomplete="username">
        </div>
        <div class="field">
          <label>Email</label>
          <input v-model="form.admin_email" type="email" autocomplete="email">
        </div>
        <div class="two fields">
          <div class="field">
            <label>Password</label>
            <input v-model="form.admin_passwd" type="password" autocomplete="new-password">
          </div>
          <div class="field">
            <label>Confirm Password</label>
            <input v-model="form.admin_confirm_passwd" type="password" autocomplete="new-password">
          </div>
        </div>

        <div v-if="adminPasswordMismatch" class="ui negative message tw-mb-2">
          <p>Admin passwords do not match.</p>
        </div>

        <button
          class="ui large primary button tw-mt-4"
          type="submit"
          :disabled="submitting"
        >
          {{ submitting ? 'Installing…' : 'Install Gitea' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {appSubUrl} from '../spaconfig.ts';

const backendUrl = appSubUrl || window.location.origin;

const form = ref({
  db_type: 'sqlite3',
  db_host: '127.0.0.1:3306',
  db_user: 'gitea',
  db_passwd: '',
  db_name: 'gitea',
  ssl_mode: 'disable',
  db_schema: '',
  db_path: '/data/gitea/data/gitea.db',

  app_name: 'Gitea',
  repo_root_path: '/home/git/repositories',
  lfs_root_path: '/data/gitea/lfs',
  run_user: 'git',
  domain: 'localhost',
  ssh_port: 22,
  http_port: '3000',
  app_url: 'http://localhost:3000/',
  log_root_path: '/data/gitea/log',

  disable_registration: false,
  require_sign_in_view: false,
  default_allow_create_organization: true,
  enable_update_checker: true,

  admin_name: '',
  admin_email: '',
  admin_passwd: '',
  admin_confirm_passwd: '',

  password_algorithm: 'pbkdf2',
});

const submitting = ref(false);
const submitError = ref('');
const success = ref(false);

const adminPasswordMismatch = computed(() =>
  Boolean(form.value.admin_passwd && form.value.admin_confirm_passwd &&
    form.value.admin_passwd !== form.value.admin_confirm_passwd),
);

async function submit() {
  if (adminPasswordMismatch.value) return;
  submitting.value = true;
  submitError.value = '';

  // Build a URLSearchParams from the form object, converting booleans to
  // the "on" string that Go's form binding expects for checkboxes.
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(form.value)) {
    if (typeof value === 'boolean') {
      if (value) params.set(key, 'on');
    } else {
      params.set(key, String(value));
    }
  }

  try {
    // POST to the Gitea backend's root install endpoint.
    const resp = await fetch(`${backendUrl}/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: params.toString(),
      redirect: 'follow',
    });

    // Gitea redirects to /post-install on success (200) or back to / with errors.
    if (resp.ok && (resp.url.includes('/post-install') || resp.url.endsWith('/'))) {
      success.value = true;
    } else if (resp.ok) {
      success.value = true;
    } else {
      submitError.value = `Installation failed (HTTP ${resp.status}). Check server logs for details.`;
    }
  } catch (e) {
    submitError.value = `Network error: ${e instanceof Error ? e.message : String(e)}`;
  } finally {
    submitting.value = false;
  }
}
</script>
