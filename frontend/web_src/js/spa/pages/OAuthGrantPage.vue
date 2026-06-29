<!-- Translated from: templates/user/auth/grant.tmpl -->
<template>
  <AppLayout page-class="oauth2-authorize-application-box" title="Authorize Application">
    <div class="ui container tw-max-w-[500px]">
      <h3 class="ui top attached header">
        Authorize "{{ appName }}"
      </h3>
      <div class="ui attached segment">
        <BaseAlert :flash="flash"/>
        <p>
          <b>The application requests access to your account.</b><br>
          Application created by: {{ appCreator }}<br>
          Requested scopes: <b>{{ scope }}</b>
        </p>
      </div>
      <div class="ui attached segment">
        <p>You will be redirected to: <code>{{ redirectDomain }}</code></p>
      </div>
      <div class="ui attached segment tw-text-center">
        <button class="ui red inline button" :disabled="submitting" @click="grant(true)">Authorize Application</button>
        <button class="ui basic primary inline button" :disabled="submitting" @click="grant(false)">Cancel</button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import {apiBase} from '../spaconfig.ts';

const route = useRoute();
const appName = ref('');
const appCreator = ref('');
const scope = ref('');
const redirectDomain = ref('');
const submitting = ref(false);
const flash = ref<{error?: string}>({});

onMounted(() => {
  appName.value = (route.query.client_name as string) || 'Unknown Application';
  scope.value = (route.query.scope as string) || 'read';
  redirectDomain.value = (route.query.redirect_uri as string) || '';
  appCreator.value = (route.query.creator as string) || '';
});

async function grant(granted: boolean) {
  submitting.value = true;
  try {
    const resp = await fetch(`${apiBase}/login/oauth/grant`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        client_id: route.query.client_id,
        state: route.query.state,
        scope: route.query.scope,
        nonce: route.query.nonce,
        redirect_uri: route.query.redirect_uri,
        granted,
      }),
    });
    if (resp.ok) {
      const data = await resp.json();
      if (data.redirect) window.location.href = data.redirect;
    } else {
      flash.value.error = 'Authorization failed.';
    }
  } catch {
    flash.value.error = 'Network error.';
  } finally {
    submitting.value = false;
  }
}
</script>
