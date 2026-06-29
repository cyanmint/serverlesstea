<!-- Translated from: templates/user/settings/profile.tmpl + user/settings/navbar.tmpl + user/settings/applications.tmpl -->
<template>
  <AppLayout page-class="user settings" title="User Settings">
    <div class="ui container">
      <div class="ui grid">
        <!-- Settings navbar (user/settings/navbar.tmpl) -->
        <div class="four wide column">
          <div class="ui fluid vertical menu">
            <div class="header item">User Settings</div>
            <a :class="['item', {active: section === 'profile'}]" @click="section='profile'">Profile</a>
            <a :class="['item', {active: section === 'account'}]" @click="section='account'">Account</a>
            <a :class="['item', {active: section === 'appearance'}]" @click="section='appearance'">Appearance</a>
            <a :class="['item', {active: section === 'security'}]" @click="section='security'">Security</a>
            <a :class="['item', {active: section === 'applications'}]" @click="section='applications'">Applications</a>
            <a :class="['item', {active: section === 'keys'}]" @click="section='keys'">SSH / GPG Keys</a>
          </div>
        </div>

        <!-- Content -->
        <div class="twelve wide column">
          <!-- Profile (user/settings/profile.tmpl) -->
          <template v-if="section === 'profile'">
            <h4 class="ui top attached header">Public Profile</h4>
            <div class="ui attached segment">
              <BaseAlert :flash="flash"/>
              <form class="ui form" @submit.prevent="saveProfile">
                <div class="required field">
                  <label>Username</label>
                  <input v-model="profile.login" disabled>
                </div>
                <div class="field">
                  <label>Full Name</label>
                  <input v-model="profile.full_name" maxlength="100">
                </div>
                <div class="field">
                  <label>Email</label>
                  <input :value="profile.email" disabled>
                </div>
                <div class="field">
                  <label>Biography</label>
                  <textarea v-model="profile.description" rows="2" maxlength="255"></textarea>
                </div>
                <div class="field">
                  <label>Website</label>
                  <input v-model="profile.website" type="url" maxlength="255">
                </div>
                <div class="field">
                  <label>Location</label>
                  <input v-model="profile.location" maxlength="50">
                </div>
                <div class="field">
                  <button class="ui primary button" type="submit" :disabled="submitting">Update Profile</button>
                </div>
              </form>
            </div>
          </template>

          <!-- Applications (user/settings/applications.tmpl) -->
          <template v-if="section === 'applications'">
            <h4 class="ui top attached header">Manage Access Tokens</h4>
            <div class="ui attached segment">
              <p>Tokens can be used to access the API.</p>
              <div v-for="t in tokens" :key="t.id" class="tw-flex tw-justify-between tw-items-center tw-border-b tw-py-2">
                <div>
                  <strong>{{ t.name }}</strong>
                  <span class="tw-text-text-light tw-ml-2">Created {{ formatDate(t.created_at) }}</span>
                </div>
                <button class="ui red tiny button" @click="deleteToken(t.id)">Delete</button>
              </div>
              <div class="divider"></div>
              <h5>Generate New Token</h5>
              <form class="ui form" @submit.prevent="createToken">
                <div class="required field">
                  <label>Token Name</label>
                  <input v-model="newTokenName" required>
                </div>
                <button class="ui primary button" type="submit">Generate Token</button>
              </form>
              <div v-if="newTokenValue" class="ui positive message tw-mt-4">
                <p>Please copy this token now. You won't see it again!</p>
                <code class="tw-break-all">{{ newTokenValue }}</code>
              </div>
            </div>
          </template>

          <!-- Account -->
          <template v-if="section === 'account'">
            <h4 class="ui top attached header">Account Settings</h4>
            <div class="ui attached segment">
              <h5>Change Password</h5>
              <form class="ui form" @submit.prevent="changePassword">
                <div class="required field">
                  <label>Old Password</label>
                  <input v-model="passwordForm.old" type="password" required>
                </div>
                <div class="required field">
                  <label>New Password</label>
                  <input v-model="passwordForm.new" type="password" required>
                </div>
                <div class="required field">
                  <label>Confirm New Password</label>
                  <input v-model="passwordForm.confirm" type="password" required>
                </div>
                <button class="ui primary button" type="submit">Update Password</button>
              </form>
              <div class="divider"></div>
              <h5>Delete Account</h5>
              <button class="ui red button" @click="deleteConfirm=true">Delete My Account</button>
            </div>
          </template>

          <!-- Placeholder for other sections -->
          <template v-if="section === 'appearance' || section === 'security' || section === 'keys'">
            <h4 class="ui top attached header">{{ section.charAt(0).toUpperCase() + section.slice(1) }}</h4>
            <div class="ui attached segment">
              <p class="tw-text-text-light">This section is available through the API.</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import {apiBase} from '../spaconfig.ts';

const token = localStorage.getItem('gitea-spa-token') || '';
const headers = {'Content-Type': 'application/json', Authorization: `token ${token}`};

const section = ref('profile');
const profile = ref<any>({});
const tokens = ref<any[]>([]);
const newTokenName = ref('');
const newTokenValue = ref('');
const submitting = ref(false);
const flash = ref<{error?: string; success?: string}>({});
const passwordForm = ref({old: '', new: '', confirm: ''});
const deleteConfirm = ref(false);

function formatDate(d: string) { return d ? new Date(d).toLocaleDateString() : ''; }

async function loadProfile() {
  try {
    const resp = await fetch(`${apiBase}/user`, {headers: {Authorization: `token ${token}`}});
    if (resp.ok) profile.value = await resp.json();
  } catch { /* empty */ }
}

async function saveProfile() {
  submitting.value = true;
  flash.value = {};
  try {
    const resp = await fetch(`${apiBase}/user/settings`, {
      method: 'PATCH', headers,
      body: JSON.stringify({full_name: profile.value.full_name, description: profile.value.description, website: profile.value.website, location: profile.value.location}),
    });
    if (resp.ok) flash.value.success = 'Profile updated.';
    else { const b = await resp.json().catch(() => ({})); flash.value.error = b.message || 'Failed.'; }
  } catch { flash.value.error = 'Network error.'; }
  finally { submitting.value = false; }
}

async function loadTokens() {
  try {
    const resp = await fetch(`${apiBase}/users/${profile.value.login}/tokens`, {headers: {Authorization: `token ${token}`}});
    if (resp.ok) tokens.value = await resp.json();
  } catch { /* empty */ }
}

async function createToken() {
  try {
    const resp = await fetch(`${apiBase}/users/${profile.value.login}/tokens`, {
      method: 'POST', headers,
      body: JSON.stringify({name: newTokenName.value}),
    });
    if (resp.ok) {
      const data = await resp.json();
      newTokenValue.value = data.sha1 || data.token || '';
      newTokenName.value = '';
      await loadTokens();
    }
  } catch { /* empty */ }
}

async function deleteToken(id: number) {
  await fetch(`${apiBase}/users/${profile.value.login}/tokens/${id}`, {method: 'DELETE', headers: {Authorization: `token ${token}`}});
  await loadTokens();
}

async function changePassword() {
  if (passwordForm.value.new !== passwordForm.value.confirm) { flash.value.error = 'Passwords do not match.'; return; }
  try {
    const resp = await fetch(`${apiBase}/user/settings`, {
      method: 'PATCH', headers,
      body: JSON.stringify({old_password: passwordForm.value.old, password: passwordForm.value.new}),
    });
    if (resp.ok) flash.value.success = 'Password changed.';
    else flash.value.error = 'Failed to change password.';
  } catch { flash.value.error = 'Network error.'; }
}

onMounted(async () => { await loadProfile(); await loadTokens(); });
</script>
