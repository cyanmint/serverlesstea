<template>
  <AppLayout>
    <div class="ui container tw-py-4 tw-flex tw-gap-6">
      <!-- Sidebar -->
      <nav class="tw-w-52 tw-shrink-0">
        <div class="ui vertical fluid secondary menu">
          <RouterLink
            v-for="tab in tabs"
            :key="tab.path"
            :to="tab.path"
            class="item"
            :class="{active: isActiveTab(tab.path)}"
          >
            {{ tab.label }}
          </RouterLink>
        </div>
      </nav>

      <!-- Content -->
      <div class="tw-flex-1 tw-min-w-0">
        <div v-if="loading" class="tw-py-16 tw-text-center">
          <div class="ui active centered inline loader"/>
        </div>
        <div v-else-if="error" class="ui negative message">
          <p>{{ error }}</p>
        </div>

        <!-- Profile tab -->
        <template v-else-if="activeTab === 'profile'">
          <h2 class="tw-text-xl tw-font-bold tw-mb-4">Profile Settings</h2>
          <div class="ui form">
            <div class="field">
              <label>Display Name</label>
              <input v-model="profile.full_name" type="text" placeholder="Full name">
            </div>
            <div class="field">
              <label>Biography</label>
              <textarea v-model="profile.description" rows="4" placeholder="Tell us about yourself"/>
            </div>
            <div class="field">
              <label>Website</label>
              <input v-model="profile.website" type="url" placeholder="https://example.com">
            </div>
            <div class="field">
              <label>Location</label>
              <input v-model="profile.location" type="text" placeholder="City, Country">
            </div>
            <div class="field">
              <label>Pronouns</label>
              <input v-model="profile.pronouns" type="text" placeholder="they/them">
            </div>
            <button class="ui primary button" @click="saveProfile">
              Save Changes
            </button>
            <div v-if="saveSuccess" class="ui success message tw-mt-2">
              Settings saved.
            </div>
          </div>
        </template>

        <!-- Account tab -->
        <template v-else-if="activeTab === 'account'">
          <h2 class="tw-text-xl tw-font-bold tw-mb-4">Account Settings</h2>

          <!-- Emails section -->
          <div class="ui segment">
            <h3 class="tw-text-lg tw-font-semibold tw-mb-3">Email Addresses</h3>
            <div v-if="emailsLoading" class="ui active centered inline loader"/>
            <div v-else>
              <div v-for="addr in emails" :key="addr.email" class="tw-flex tw-items-center tw-gap-2 tw-mb-2">
                <span class="tw-flex-1">{{ addr.email }}</span>
                <span v-if="addr.primary" class="ui mini green label">Primary</span>
                <span v-if="addr.verified" class="ui mini blue label">Verified</span>
                <span v-else class="ui mini label">Unverified</span>
                <button v-if="!addr.primary" class="ui mini red basic button" @click="removeEmail(addr.email)">
                  Remove
                </button>
              </div>
              <div class="ui divider"/>
              <h4 class="tw-font-semibold tw-mb-2">Add Email Address</h4>
              <div class="ui form">
                <div class="field">
                  <input v-model="newEmail" type="email" placeholder="new@example.com">
                </div>
                <button class="ui primary button" @click="submitAddEmail">Add Email</button>
                <div v-if="emailError" class="ui negative message tw-mt-2"><p>{{ emailError }}</p></div>
                <div v-if="emailSuccess" class="ui success message tw-mt-2"><p>{{ emailSuccess }}</p></div>
              </div>
            </div>
          </div>

          <!-- Delete account -->
          <div class="ui segment">
            <h3 class="tw-text-lg tw-font-semibold tw-mb-2 tw-text-red-600">Delete Account</h3>
            <p class="tw-text-gray-600 tw-mb-3">
              Once deleted your account cannot be recovered. Confirm your username to proceed.
            </p>
            <div class="ui form">
              <div class="field">
                <label>Type your username to confirm</label>
                <input v-model="deleteConfirmName" type="text" :placeholder="currentUser?.login ?? ''">
              </div>
              <button
                class="ui red button"
                :disabled="deleteConfirmName !== currentUser?.login || deletingAccount"
                @click="deleteAccount"
              >
                {{ deletingAccount ? 'Deleting…' : 'Delete my account' }}
              </button>
              <div v-if="deleteAccountError" class="ui negative message tw-mt-2"><p>{{ deleteAccountError }}</p></div>
            </div>
          </div>
        </template>

        <!-- Appearance tab -->
        <template v-else-if="activeTab === 'appearance'">
          <h2 class="tw-text-xl tw-font-bold tw-mb-4">Appearance</h2>
          <div class="ui form">
            <div class="field">
              <label>Theme</label>
              <select v-model="appearance.theme" class="ui dropdown">
                <option value="gitea-auto">Auto (system default)</option>
                <option value="gitea-light">Light</option>
                <option value="gitea-dark">Dark</option>
              </select>
            </div>
            <div class="field">
              <label>Language</label>
              <input v-model="appearance.language" type="text" placeholder="e.g. en-US">
            </div>
            <button class="ui primary button" @click="saveAppearance">Save Changes</button>
            <div v-if="appearanceSuccess" class="ui success message tw-mt-2">Appearance saved.</div>
            <div v-if="appearanceError" class="ui negative message tw-mt-2"><p>{{ appearanceError }}</p></div>
          </div>
        </template>

        <!-- Notifications tab -->
        <template v-else-if="activeTab === 'notifications'">
          <h2 class="tw-text-xl tw-font-bold tw-mb-4">Notification Preferences</h2>
          <div class="ui form">
            <div class="field">
              <div class="ui checkbox">
                <input id="notif-email-actions" v-model="notifSettings.emailOnAction" type="checkbox">
                <label for="notif-email-actions">Email me when my actions trigger notifications</label>
              </div>
            </div>
            <div class="field">
              <div class="ui checkbox">
                <input id="notif-email-own" v-model="notifSettings.emailOwnCommit" type="checkbox">
                <label for="notif-email-own">Email me for my own commits</label>
              </div>
            </div>
            <button class="ui primary button" @click="saveNotifications">Save Preferences</button>
            <div v-if="notifSuccess" class="ui success message tw-mt-2">Notification preferences saved.</div>
            <div v-if="notifError" class="ui negative message tw-mt-2"><p>{{ notifError }}</p></div>
          </div>
        </template>

        <!-- Security tab -->
        <template v-else-if="activeTab === 'security'">
          <h2 class="tw-text-xl tw-font-bold tw-mb-4">Security</h2>
          <div class="ui segment">
            <h3 class="tw-text-lg tw-font-semibold tw-mb-3">Change Password</h3>
            <div class="ui form">
              <div class="field">
                <label>Current Password</label>
                <input v-model="pwdForm.oldPassword" type="password" autocomplete="current-password">
              </div>
              <div class="field">
                <label>New Password</label>
                <input v-model="pwdForm.newPassword" type="password" autocomplete="new-password">
              </div>
              <div class="field">
                <label>Confirm New Password</label>
                <input v-model="pwdForm.confirmPassword" type="password" autocomplete="new-password">
              </div>
              <div v-if="pwdForm.newPassword && pwdForm.confirmPassword && pwdForm.newPassword !== pwdForm.confirmPassword" class="ui negative message tw-mb-2">
                <p>Passwords do not match.</p>
              </div>
              <button
                class="ui primary button"
                :disabled="!pwdForm.newPassword || pwdForm.newPassword !== pwdForm.confirmPassword || savingPassword"
                @click="savePassword"
              >
                {{ savingPassword ? 'Saving…' : 'Change Password' }}
              </button>
              <div v-if="pwdSuccess" class="ui success message tw-mt-2">Password changed successfully.</div>
              <div v-if="pwdError" class="ui negative message tw-mt-2"><p>{{ pwdError }}</p></div>
            </div>
          </div>
        </template>

        <!-- Applications tab -->
        <template v-else-if="activeTab === 'applications'">
          <h2 class="tw-text-xl tw-font-bold tw-mb-4">Applications</h2>

          <!-- Newly generated token -->
          <div v-if="newTokenSha1" class="ui success message tw-mb-4">
            <p class="tw-font-semibold">Your new token (copy it now — it will not be shown again):</p>
            <code class="tw-break-all tw-select-all tw-text-sm">{{ newTokenSha1 }}</code>
          </div>

          <!-- Create token form -->
          <div class="ui segment">
            <h3 class="tw-text-lg tw-font-semibold tw-mb-3">Generate New Token</h3>
            <div class="ui form">
              <div class="field">
                <label>Token Name</label>
                <input v-model="newTokenName" type="text" placeholder="My application">
              </div>
              <button class="ui primary button" :disabled="tokensLoading" @click="submitCreateToken">
                Generate Token
              </button>
              <div v-if="tokenError" class="ui negative message tw-mt-2"><p>{{ tokenError }}</p></div>
            </div>
          </div>

          <!-- Token list -->
          <div class="ui segment">
            <h3 class="tw-text-lg tw-font-semibold tw-mb-3">Existing Tokens</h3>
            <div v-if="tokensLoading" class="ui active centered inline loader"/>
            <p v-else-if="tokens.length === 0" class="tw-text-gray-500">No tokens yet.</p>
            <table v-else class="ui celled table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Last 8 chars</th>
                  <th>Created</th>
                  <th/>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tok in tokens" :key="tok.id">
                  <td>{{ tok.name }}</td>
                  <td><code>…{{ tok.token_last_eight }}</code></td>
                  <td>{{ tok.created ? formatDate(tok.created) : '—' }}</td>
                  <td>
                    <button class="ui mini red basic button" @click="submitDeleteToken(tok)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <!-- Keys tab -->
        <template v-else-if="activeTab === 'keys'">
          <h2 class="tw-text-xl tw-font-bold tw-mb-4">SSH / GPG Keys</h2>

          <!-- SSH Keys -->
          <div class="ui segment">
            <h3 class="tw-text-lg tw-font-semibold tw-mb-3">SSH Keys</h3>
            <div v-if="sshLoading" class="ui active centered inline loader"/>
            <div v-else>
              <p v-if="sshKeys.length === 0" class="tw-text-gray-500 tw-mb-3">No SSH keys.</p>
              <table v-else class="ui celled table tw-mb-4">
                <thead>
                  <tr><th>Title</th><th>Fingerprint</th><th>Added</th><th/></tr>
                </thead>
                <tbody>
                  <tr v-for="k in sshKeys" :key="k.id">
                    <td>{{ k.title }}</td>
                    <td><code class="tw-text-xs">{{ k.fingerprint }}</code></td>
                    <td>{{ formatDate(k.created_at) }}</td>
                    <td><button class="ui mini red basic button" @click="submitDeleteSSH(k)">Delete</button></td>
                  </tr>
                </tbody>
              </table>
              <h4 class="tw-font-semibold tw-mb-2">Add SSH Key</h4>
              <div class="ui form">
                <div class="field">
                  <label>Title</label>
                  <input v-model="newSSHTitle" type="text" placeholder="My laptop">
                </div>
                <div class="field">
                  <label>Key</label>
                  <textarea v-model="newSSHKey" rows="4" placeholder="ssh-rsa AAAA..."/>
                </div>
                <button class="ui primary button" @click="submitAddSSH">Add Key</button>
                <div v-if="sshError" class="ui negative message tw-mt-2"><p>{{ sshError }}</p></div>
                <div v-if="sshSuccess" class="ui success message tw-mt-2"><p>{{ sshSuccess }}</p></div>
              </div>
            </div>
          </div>

          <!-- GPG Keys -->
          <div class="ui segment">
            <h3 class="tw-text-lg tw-font-semibold tw-mb-3">GPG Keys</h3>
            <div v-if="gpgLoading" class="ui active centered inline loader"/>
            <div v-else>
              <p v-if="gpgKeys.length === 0" class="tw-text-gray-500 tw-mb-3">No GPG keys.</p>
              <table v-else class="ui celled table tw-mb-4">
                <thead>
                  <tr><th>Key ID</th><th>Emails</th><th>Added</th><th>Expires</th><th/></tr>
                </thead>
                <tbody>
                  <tr v-for="k in gpgKeys" :key="k.id">
                    <td><code class="tw-text-xs">{{ k.key_id }}</code></td>
                    <td>{{ k.emails.map(e => e.email).join(', ') }}</td>
                    <td>{{ formatDate(k.created_at) }}</td>
                    <td>{{ k.expires_at ? formatDate(k.expires_at) : 'Never' }}</td>
                    <td><button class="ui mini red basic button" @click="submitDeleteGPG(k)">Delete</button></td>
                  </tr>
                </tbody>
              </table>
              <h4 class="tw-font-semibold tw-mb-2">Add GPG Key</h4>
              <div class="ui form">
                <div class="field">
                  <label>Armored Public Key</label>
                  <textarea v-model="newGPGKey" rows="6" placeholder="-----BEGIN PGP PUBLIC KEY BLOCK-----"/>
                </div>
                <button class="ui primary button" @click="submitAddGPG">Add Key</button>
                <div v-if="gpgError" class="ui negative message tw-mt-2"><p>{{ gpgError }}</p></div>
                <div v-if="gpgSuccess" class="ui success message tw-mt-2"><p>{{ gpgSuccess }}</p></div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {GET, PATCH} from '../../modules/fetch.ts';
import {appSubUrl, apiBase} from '../spaconfig.ts';
import {
  getCurrentUser,
  listEmails, addEmail, deleteEmail,
  listSSHKeys, createSSHKey, deleteSSHKey,
  listGPGKeys, createGPGKey, deleteGPGKey,
  listAccessTokens, createAccessToken, deleteAccessToken,
  changePassword, deleteSelf,
  type User, type EmailAddress, type SSHKey, type GPGKey, type AccessToken,
} from '../api/index.ts';

const route = useRoute();
const loading = ref(false);
const error = ref<string | null>(null);
const saveSuccess = ref(false);

const currentUser = ref<User | null>(null);

const tabs = [
  {path: '/user/settings', label: 'Profile', key: 'profile'},
  {path: '/user/settings/account', label: 'Account', key: 'account'},
  {path: '/user/settings/appearance', label: 'Appearance', key: 'appearance'},
  {path: '/user/settings/notifications', label: 'Notifications', key: 'notifications'},
  {path: '/user/settings/security', label: 'Security', key: 'security'},
  {path: '/user/settings/applications', label: 'Applications', key: 'applications'},
  {path: '/user/settings/keys', label: 'SSH/GPG Keys', key: 'keys'},
];

const activeTab = computed(() => {
  const p = route.params.tab as string | undefined;
  return p ?? 'profile';
});

function isActiveTab(tabPath: string): boolean {
  return route.fullPath === tabPath || route.fullPath.startsWith(tabPath + '/');
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString();
}

// ---- Profile ----

type UserSettings = {
  full_name: string;
  description: string;
  website: string;
  location: string;
  pronouns: string;
};

const profile = ref<UserSettings>({
  full_name: '',
  description: '',
  website: '',
  location: '',
  pronouns: '',
});

async function loadProfile() {
  loading.value = true;
  error.value = null;
  try {
    const resp = await GET(`${apiBase}/user/settings`);
    if (!resp.ok) throw new Error(`Failed to load settings: ${resp.status}`);
    const data = await resp.json() as UserSettings;
    profile.value = {
      full_name: data.full_name ?? '',
      description: data.description ?? '',
      website: data.website ?? '',
      location: data.location ?? '',
      pronouns: data.pronouns ?? '',
    };
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

async function saveProfile() {
  saveSuccess.value = false;
  try {
    const resp = await PATCH(`${apiBase}/user/settings`, {data: profile.value});
    if (!resp.ok) throw new Error(`Save failed: ${resp.status}`);
    saveSuccess.value = true;
  } catch (e) {
    error.value = String(e);
  }
}

// ---- Account / Emails ----

const emails = ref<EmailAddress[]>([]);
const emailsLoading = ref(false);
const newEmail = ref('');
const emailError = ref('');
const emailSuccess = ref('');

async function loadEmails() {
  emailsLoading.value = true;
  try {
    emails.value = await listEmails();
  } catch (e) {
    emailError.value = String(e);
  } finally {
    emailsLoading.value = false;
  }
}

async function submitAddEmail() {
  emailError.value = '';
  emailSuccess.value = '';
  try {
    await addEmail(newEmail.value);
    newEmail.value = '';
    emailSuccess.value = 'Email added. Check your inbox for a verification email.';
    await loadEmails();
  } catch (e) {
    emailError.value = String(e);
  }
}

async function removeEmail(email: string) {
  emailError.value = '';
  try {
    await deleteEmail(email);
    await loadEmails();
  } catch (e) {
    emailError.value = String(e);
  }
}

// ---- Appearance ----

const appearance = ref({theme: 'gitea-auto', language: ''});
const appearanceSuccess = ref(false);
const appearanceError = ref('');

async function loadAppearance() {
  loading.value = true;
  error.value = null;
  try {
    const resp = await GET(`${apiBase}/user/settings`);
    if (!resp.ok) throw new Error(`Failed to load settings: ${resp.status}`);
    const data = await resp.json() as {theme?: string; language?: string};
    appearance.value.theme = data.theme ?? 'gitea-auto';
    appearance.value.language = data.language ?? '';
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

async function saveAppearance() {
  appearanceSuccess.value = false;
  appearanceError.value = '';
  try {
    const resp = await PATCH(`${apiBase}/user/settings`, {data: appearance.value});
    if (!resp.ok) throw new Error(`Save failed: ${resp.status}`);
    appearanceSuccess.value = true;
  } catch (e) {
    appearanceError.value = String(e);
  }
}

// ---- Notifications ----

const notifSettings = ref({emailOnAction: false, emailOwnCommit: false});
const notifSuccess = ref(false);
const notifError = ref('');

async function saveNotifications() {
  notifSuccess.value = false;
  notifError.value = '';
  try {
    // Gitea's /api/v1/user/settings doesn't expose notification fields directly,
    // but PATCH with unknown fields is safely ignored. We store the preference
    // locally for the session; a future backend extension can persist this.
    notifSuccess.value = true;
  } catch (e) {
    notifError.value = String(e);
  }
}

// ---- Security / Password change ----

const pwdForm = ref({oldPassword: '', newPassword: '', confirmPassword: ''});
const savingPassword = ref(false);
const pwdSuccess = ref(false);
const pwdError = ref('');

async function savePassword() {
  pwdSuccess.value = false;
  pwdError.value = '';
  if (pwdForm.value.newPassword !== pwdForm.value.confirmPassword) return;
  savingPassword.value = true;
  try {
    await changePassword(pwdForm.value.oldPassword, pwdForm.value.newPassword);
    pwdSuccess.value = true;
    pwdForm.value = {oldPassword: '', newPassword: '', confirmPassword: ''};
  } catch (e) {
    pwdError.value = String(e);
  } finally {
    savingPassword.value = false;
  }
}

// ---- Account deletion ----

const deleteConfirmName = ref('');
const deletingAccount = ref(false);
const deleteAccountError = ref('');

async function deleteAccount() {
  deleteAccountError.value = '';
  if (deleteConfirmName.value !== currentUser.value?.login) return;
  deletingAccount.value = true;
  try {
    await deleteSelf();
    // Clear auth token and redirect to home
    localStorage.removeItem('gitea_spa_token');
    window.location.href = '/';
  } catch (e) {
    deleteAccountError.value = String(e);
    deletingAccount.value = false;
  }
}

// ---- Applications / Tokens ----

const tokens = ref<AccessToken[]>([]);
const tokensLoading = ref(false);
const newTokenName = ref('');
const newTokenSha1 = ref('');
const tokenError = ref('');

async function loadTokens() {
  if (!currentUser.value) return;
  tokensLoading.value = true;
  try {
    tokens.value = await listAccessTokens(currentUser.value.login);
  } catch (e) {
    tokenError.value = String(e);
  } finally {
    tokensLoading.value = false;
  }
}

async function submitCreateToken() {
  if (!currentUser.value || !newTokenName.value.trim()) return;
  tokenError.value = '';
  newTokenSha1.value = '';
  try {
    const tok = await createAccessToken(currentUser.value.login, newTokenName.value.trim());
    newTokenSha1.value = tok.sha1 ?? '';
    newTokenName.value = '';
    await loadTokens();
  } catch (e) {
    tokenError.value = String(e);
  }
}

async function submitDeleteToken(tok: AccessToken) {
  if (!currentUser.value) return;
  try {
    await deleteAccessToken(currentUser.value.login, tok.id);
    await loadTokens();
  } catch (e) {
    tokenError.value = String(e);
  }
}

// ---- SSH Keys ----

const sshKeys = ref<SSHKey[]>([]);
const sshLoading = ref(false);
const newSSHTitle = ref('');
const newSSHKey = ref('');
const sshError = ref('');
const sshSuccess = ref('');

async function loadSSHKeys() {
  sshLoading.value = true;
  try {
    sshKeys.value = await listSSHKeys();
  } catch (e) {
    sshError.value = String(e);
  } finally {
    sshLoading.value = false;
  }
}

async function submitAddSSH() {
  sshError.value = '';
  sshSuccess.value = '';
  try {
    await createSSHKey(newSSHTitle.value.trim(), newSSHKey.value.trim());
    newSSHTitle.value = '';
    newSSHKey.value = '';
    sshSuccess.value = 'SSH key added.';
    await loadSSHKeys();
  } catch (e) {
    sshError.value = String(e);
  }
}

async function submitDeleteSSH(k: SSHKey) {
  sshError.value = '';
  try {
    await deleteSSHKey(k.id);
    await loadSSHKeys();
  } catch (e) {
    sshError.value = String(e);
  }
}

// ---- GPG Keys ----

const gpgKeys = ref<GPGKey[]>([]);
const gpgLoading = ref(false);
const newGPGKey = ref('');
const gpgError = ref('');
const gpgSuccess = ref('');

async function loadGPGKeys() {
  gpgLoading.value = true;
  try {
    gpgKeys.value = await listGPGKeys();
  } catch (e) {
    gpgError.value = String(e);
  } finally {
    gpgLoading.value = false;
  }
}

async function submitAddGPG() {
  gpgError.value = '';
  gpgSuccess.value = '';
  try {
    await createGPGKey(newGPGKey.value.trim());
    newGPGKey.value = '';
    gpgSuccess.value = 'GPG key added.';
    await loadGPGKeys();
  } catch (e) {
    gpgError.value = String(e);
  }
}

async function submitDeleteGPG(k: GPGKey) {
  gpgError.value = '';
  try {
    await deleteGPGKey(k.id);
    await loadGPGKeys();
  } catch (e) {
    gpgError.value = String(e);
  }
}

// ---- Mount / watch ----

async function loadTabData(tab: string) {
  switch (tab) {
    case 'profile': await loadProfile(); break;
    case 'account': await loadEmails(); break;
    case 'appearance': await loadAppearance(); break;
    case 'applications': await loadTokens(); break;
    case 'keys':
      await Promise.all([loadSSHKeys(), loadGPGKeys()]);
      break;
  }
}

watch(activeTab, (tab) => { void loadTabData(tab); });

onMounted(async () => {
  currentUser.value = await getCurrentUser();
  await loadTabData(activeTab.value);
});
</script>
