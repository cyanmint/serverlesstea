<!-- Translated from: templates/user/auth/activate.tmpl -->
<template>
  <AppLayout page-class="user activate" title="Activate Account">
    <div class="ui middle very relaxed page grid">
      <div class="column">
        <form class="ui form ignore-dirty tw-max-w-2xl tw-m-auto" @submit.prevent="handleActivate">
          <h2 class="ui top attached header">Activate Your Account</h2>
          <div class="ui attached segment">
            <BaseAlert :flash="flash"/>
            <div v-if="activated" class="ui positive message">
              <p>Your account has been activated successfully!</p>
              <RouterLink to="/user/login" class="ui small primary button tw-mt-2">Sign In</RouterLink>
            </div>
            <template v-else-if="needPassword">
              <div class="required field">
                <label for="verify-password">Password</label>
                <input id="verify-password" v-model="password" name="password" type="password" autocomplete="off" required>
              </div>
              <div class="inline field">
                <button class="ui primary button" type="submit" :disabled="submitting">Confirm</button>
              </div>
            </template>
            <template v-else>
              <p>A confirmation email has been sent. Please check your inbox and click the activation link.</p>
              <div class="divider"></div>
              <div class="text">
                <button class="ui primary button" type="submit" :disabled="submitting">Resend activation email</button>
              </div>
            </template>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import {apiBase} from '../spaconfig.ts';

const route = useRoute();
const password = ref('');
const submitting = ref(false);
const activated = ref(false);
const needPassword = ref(false);
const flash = ref<{error?: string; success?: string}>({});

onMounted(() => {
  const code = route.query.code as string;
  if (code) {
    needPassword.value = true;
  }
});

async function handleActivate() {
  submitting.value = true;
  flash.value = {};
  try {
    const code = route.query.code as string;
    const resp = await fetch(`${apiBase}/user/activate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code, password: password.value || undefined}),
    });
    if (resp.ok) {
      activated.value = true;
    } else {
      const body = await resp.json().catch(() => ({}));
      flash.value.error = body.message || 'Activation failed.';
    }
  } catch {
    flash.value.error = 'Network error. Please try again.';
  } finally {
    submitting.value = false;
  }
}
</script>
