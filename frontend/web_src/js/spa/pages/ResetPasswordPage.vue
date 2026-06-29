<!-- Translated from: templates/user/auth/reset_passwd.tmpl -->
<template>
  <AppLayout page-class="user reset password" title="Reset Password">
    <div class="ui middle very relaxed page grid">
      <div class="column">
        <form class="ui form ignore-dirty tw-max-w-2xl tw-m-auto" @submit.prevent="handleReset">
          <h2 class="ui top attached header">Reset Password</h2>
          <div class="ui attached segment">
            <BaseAlert :flash="flash"/>
            <div v-if="success" class="ui positive message">
              <p>Password has been reset successfully.</p>
              <RouterLink to="/user/login" class="ui small primary button tw-mt-2">Sign In</RouterLink>
            </div>
            <template v-else-if="validCode">
              <div class="required field" :class="{error: !!flash.error}">
                <label for="password">New Password</label>
                <input id="password" v-model="password" name="password" type="password" autocomplete="new-password" autofocus required>
              </div>
              <div class="divider"></div>
              <div class="inline field">
                <button class="ui primary button" type="submit" :disabled="submitting">Reset Password</button>
              </div>
            </template>
            <template v-else>
              <p class="center">Invalid or expired password reset link. <RouterLink to="/user/forgot_password">Request a new one</RouterLink>.</p>
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
const success = ref(false);
const validCode = ref(false);
const flash = ref<{error?: string}>({});

onMounted(() => {
  const code = route.query.code as string;
  validCode.value = !!code;
});

async function handleReset() {
  submitting.value = true;
  flash.value = {};
  try {
    const code = route.query.code as string;
    const resp = await fetch(`${apiBase}/user/reset_password`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({code, password: password.value}),
    });
    if (resp.ok) {
      success.value = true;
    } else {
      const body = await resp.json().catch(() => ({}));
      flash.value.error = body.message || 'Failed to reset password.';
    }
  } catch {
    flash.value.error = 'Network error. Please try again.';
  } finally {
    submitting.value = false;
  }
}
</script>
