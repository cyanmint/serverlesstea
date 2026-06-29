<template>
  <AppLayout>
    <div role="main" class="page-content user reset password">
      <div class="ui middle very relaxed page grid">
        <div class="column">
          <form class="ui form" @submit.prevent="handleSubmit">
            <h2 class="ui top attached header">Reset Password</h2>
            <div class="ui attached segment">
              <div v-if="error" class="ui negative message"><p>{{ error }}</p></div>
              <div v-if="success" class="ui success message"><p>Password changed. <RouterLink to="/user/login">Sign in</RouterLink></p></div>

              <template v-if="!success">
                <div class="required field" :class="{error: !!error}">
                  <label for="password">New Password</label>
                  <input id="password" v-model="password" name="password" type="password" autocomplete="new-password" autofocus required>
                </div>
                <div class="divider"/>
                <div class="inline field">
                  <button class="ui primary button" type="submit" :disabled="loading">
                    <span v-if="loading">Resetting…</span>
                    <span v-else>Reset Password</span>
                  </button>
                </div>
              </template>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {appSubUrl} from '../spaconfig.ts';

const route = useRoute();
const password = ref('');
const loading = ref(false);
const error = ref('');
const success = ref(false);

async function handleSubmit() {
  loading.value = true;
  error.value = '';
  try {
    const code = route.query['code'] as string ?? '';
    const body = new URLSearchParams({password: password.value, code});
    const resp = await fetch(`${appSubUrl}/user/reset_password`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body,
      redirect: 'manual',
    });
    if (resp.ok || resp.type === 'opaqueredirect' || resp.status === 302) {
      success.value = true;
    } else {
      error.value = 'Invalid or expired reset link. Please request a new one.';
    }
  } catch {
    error.value = 'Network error. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>
