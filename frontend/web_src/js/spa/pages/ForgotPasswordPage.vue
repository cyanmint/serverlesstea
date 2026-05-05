<template>
  <AppLayout>
    <div role="main" class="page-content user forgot password">
      <div class="ui middle very relaxed page grid">
        <div class="column">
          <form class="ui form" @submit.prevent="handleSubmit">
            <h2 class="ui top attached header">Forgot Password</h2>
            <div class="ui attached segment">
              <div v-if="message" class="ui success message"><p>{{ message }}</p></div>
              <div v-if="error" class="ui negative message"><p>{{ error }}</p></div>

              <template v-if="!sent">
                <div class="required field" :class="{error: !!error}">
                  <label for="email">Email Address</label>
                  <input id="email" v-model="email" name="email" type="email" autofocus required>
                </div>
                <div class="divider"/>
                <div class="inline field">
                  <button class="ui primary button" type="submit" :disabled="loading">
                    <span v-if="loading">Sending…</span>
                    <span v-else>Send Reset Email</span>
                  </button>
                </div>
              </template>
              <template v-else>
                <p>A password reset email has been sent to <strong>{{ email }}</strong>. Please check your inbox.</p>
              </template>
            </div>
          </form>
          <div class="ui message">
            Remember your password?
            <RouterLink to="/user/login">Sign in</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {appSubUrl} from '../spaconfig.ts';

const email = ref('');
const loading = ref(false);
const error = ref('');
const message = ref('');
const sent = ref(false);

async function handleSubmit() {
  loading.value = true;
  error.value = '';
  message.value = '';
  try {
    const resp = await fetch(`${appSubUrl}/user/forgot_password`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams({email: email.value}),
      redirect: 'manual',
    });
    if (resp.ok || resp.type === 'opaqueredirect' || resp.status === 302 || resp.status === 200) {
      sent.value = true;
    } else {
      error.value = 'Failed to send reset email. Please try again.';
    }
  } catch {
    error.value = 'Network error. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>
