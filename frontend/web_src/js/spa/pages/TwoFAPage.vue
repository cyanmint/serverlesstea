<template>
  <AppLayout>
    <div role="main" class="page-content user signin">
      <div class="ui middle very relaxed page grid">
        <div class="column">
          <form class="ui form tw-max-w-2xl tw-m-auto" @submit.prevent="handleSubmit">
            <h3 class="ui top attached header">Two-Factor Authentication</h3>
            <div class="ui attached segment">
              <div v-if="error" class="ui negative message"><p>{{ error }}</p></div>

              <div class="required field">
                <label for="passcode">Authentication Code</label>
                <input
                  id="passcode"
                  v-model="passcode"
                  name="passcode"
                  type="text"
                  autocomplete="one-time-code"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  autofocus
                  required
                >
              </div>

              <div class="inline field">
                <button class="ui primary button" type="submit" :disabled="loading">
                  <span v-if="loading">Verifying…</span>
                  <span v-else>Verify</span>
                </button>
                <RouterLink :to="`/user/two_factor/scratch`">Use a scratch code</RouterLink>
              </div>
            </div>
          </form>
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

const passcode = ref('');
const loading = ref(false);
const error = ref('');

async function handleSubmit() {
  loading.value = true;
  error.value = '';
  try {
    const body = new URLSearchParams({passcode: passcode.value});
    const resp = await fetch(`${appSubUrl}/user/two_factor`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body,
      redirect: 'manual',
    });
    if (resp.ok || resp.type === 'opaqueredirect' || resp.status === 302) {
      window.location.href = `${appSubUrl}/`;
    } else {
      error.value = 'Invalid authentication code. Please try again.';
    }
  } catch {
    error.value = 'Network error. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>
