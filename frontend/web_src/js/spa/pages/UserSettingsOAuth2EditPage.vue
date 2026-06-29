<template>
  <AppLayout>
    <div role="main" class="page-content user-settings">
      <div class="ui container flex-container">
        <!-- Sidebar — same as UserSettingsPage -->
        <div class="flex-container-nav">
          <div class="ui fluid vertical menu">
            <div class="header item">User Settings</div>
            <RouterLink to="/user/settings" class="item">Profile</RouterLink>
            <RouterLink to="/user/settings/account" class="item">Account</RouterLink>
            <RouterLink to="/user/settings/security" class="item">Security</RouterLink>
            <RouterLink to="/user/settings/applications" class="item active">Applications</RouterLink>
            <RouterLink to="/user/settings/keys" class="item">SSH / GPG Keys</RouterLink>
          </div>
        </div>

        <!-- Main content -->
        <div class="flex-container-main">
          <div class="user-setting-content">
            <div v-if="loading" class="ui active centered inline loader tw-my-8"/>
            <div v-else-if="error" class="ui negative message"><p>{{ error }}</p></div>
            <template v-else-if="app">
              <!-- Edit form header -->
              <h4 class="ui top attached header">Edit OAuth2 Application</h4>
              <div class="ui attached segment">
                <p>You can register an OAuth2 application to use Gitea as an OAuth2 provider.</p>
              </div>

              <!-- Client ID / Secret display -->
              <div class="ui attached segment">
                <div class="ui form">
                  <div class="field">
                    <label>Client ID</label>
                    <div class="ui action input">
                      <input :value="app.client_id" readonly type="text">
                      <button class="ui button" @click="copyText(app.client_id)">Copy</button>
                    </div>
                  </div>
                  <div class="field">
                    <label>Client Secret</label>
                    <div v-if="newSecret" class="ui success message tw-mb-2">
                      <p><strong>Copy this secret now — it will not be shown again:</strong></p>
                      <code class="tw-break-all tw-select-all">{{ newSecret }}</code>
                    </div>
                    <div v-else>
                      <em class="tw-text-text-light">The client secret is hidden. Saving changes will regenerate it.</em>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Edit fields -->
              <div class="ui bottom attached segment">
                <div class="ui form">
                  <div class="field" :class="{error: nameError}">
                    <label for="app-name">Application Name</label>
                    <input id="app-name" v-model="form.name" type="text" maxlength="255" required>
                    <div v-if="nameError" class="ui pointing red basic label">{{ nameError }}</div>
                  </div>
                  <div class="field" :class="{error: uriError}">
                    <label for="redirect-uris">
                      Redirect URIs
                      <span class="tw-text-text-light tw-font-normal tw-ml-1">(one per line)</span>
                    </label>
                    <textarea id="redirect-uris" v-model="form.redirectUris" rows="4" required/>
                    <div v-if="uriError" class="ui pointing red basic label">{{ uriError }}</div>
                  </div>
                  <div class="field">
                    <div class="ui checkbox">
                      <input id="confidential" v-model="form.confidentialClient" type="checkbox">
                      <label for="confidential">Confidential Client</label>
                    </div>
                    <p class="tw-text-sm tw-text-text-light tw-mt-1">
                      A confidential client can securely store the client secret (e.g. a server-side application).
                      A public client cannot (e.g. a mobile app or SPA).
                    </p>
                  </div>
                  <div class="field" :class="{disabled: form.confidentialClient}">
                    <div class="ui checkbox">
                      <input
                        id="skip-secondary"
                        v-model="form.skipSecondaryAuthorization"
                        type="checkbox"
                        :disabled="form.confidentialClient"
                      >
                      <label for="skip-secondary">Skip Authorization</label>
                    </div>
                    <p class="tw-text-sm tw-text-text-light tw-mt-1">
                      If enabled, the authorization consent page is skipped for subsequent authorization requests
                      (only available for confidential clients).
                    </p>
                  </div>
                  <div v-if="saveError" class="ui negative message tw-mb-3"><p>{{ saveError }}</p></div>
                  <div v-if="saveSuccess" class="ui success message tw-mb-3"><p>Application saved successfully.</p></div>
                  <div class="tw-flex tw-gap-2">
                    <button
                      class="ui primary button"
                      :class="{loading: saving}"
                      :disabled="saving"
                      @click="saveApp"
                    >
                      Save Changes
                    </button>
                    <RouterLink to="/user/settings/applications" class="ui button">Cancel</RouterLink>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {
  getOAuth2Application, updateOAuth2Application,
  type OAuth2Application,
} from '../api/index.ts';

const route = useRoute();
const appId = Number(route.params['id']);

const loading = ref(true);
const error = ref('');
const app = ref<OAuth2Application | null>(null);
const newSecret = ref('');
const saving = ref(false);
const saveError = ref('');
const nameError = ref('');
const uriError = ref('');

const form = ref({
  name: '',
  redirectUris: '',
  confidentialClient: false,
  skipSecondaryAuthorization: false,
});

function copyText(text: string) {
  navigator.clipboard?.writeText(text).catch(() => {});
}

async function saveApp() {
  nameError.value = '';
  uriError.value = '';
  saveError.value = '';
  newSecret.value = '';

  if (!form.value.name.trim()) {
    nameError.value = 'Application name is required.';
    return;
  }
  const uris = form.value.redirectUris.split('\n').map((u) => u.trim()).filter(Boolean);
  if (uris.length === 0) {
    uriError.value = 'At least one redirect URI is required.';
    return;
  }

  saving.value = true;
  try {
    const updated = await updateOAuth2Application(appId, {
      name: form.value.name.trim(),
      redirect_uris: uris,
      confidential_client: form.value.confidentialClient,
      skip_secondary_authorization: form.value.skipSecondaryAuthorization,
    });
    app.value = updated;
    // The API always regenerates the secret on PATCH; show the new secret once
    newSecret.value = updated.client_secret || '';
  } catch (e) {
    saveError.value = e instanceof Error ? e.message : 'Failed to save application';
  } finally {
    saving.value = false;
  }
}

onMounted(async () => {
  try {
    const data = await getOAuth2Application(appId);
    app.value = data;
    form.value = {
      name: data.name,
      redirectUris: (data.redirect_uris ?? []).join('\n'),
      confidentialClient: data.confidential_client,
      skipSecondaryAuthorization: data.skip_secondary_authorization,
    };
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load application';
  } finally {
    loading.value = false;
  }
});
</script>
