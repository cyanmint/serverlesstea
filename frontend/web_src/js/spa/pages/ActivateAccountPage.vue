<template>
  <AppLayout>
    <div role="main" class="page-content user activate">
      <div class="ui middle very relaxed page grid">
        <div class="column">
          <form class="ui form tw-max-w-2xl tw-m-auto" @submit.prevent="handleSubmit">
            <h2 class="ui top attached header">Activate Your Account</h2>
            <div class="ui attached segment">
              <div v-if="error" class="ui negative message"><p>{{ error }}</p></div>
              <div v-if="success" class="ui success message"><p>Account activated. <RouterLink to="/user/login">Sign in</RouterLink></p></div>

              <template v-if="!success">
                <p>Your account requires email confirmation. Please check your inbox or resend the activation email.</p>
                <details>
                  <summary>Change your unconfirmed email address</summary>
                  <div class="tw-py-2">
                    <label for="change-email">New Email</label>
                    <input id="change-email" v-model="changeEmail" name="change_email" type="email">
                  </div>
                </details>
                <div class="divider"/>
                <div class="text">
                  <button class="ui primary button" type="submit" :disabled="loading">
                    <span v-if="loading">Sending…</span>
                    <span v-else>Resend Activation Email</span>
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
const changeEmail = ref('');
const loading = ref(false);
const error = ref('');
const success = ref(false);

async function handleSubmit() {
  loading.value = true;
  error.value = '';
  try {
    const code = route.query['code'] as string ?? '';
    const body = new URLSearchParams({code});
    if (changeEmail.value) body.set('change_email', changeEmail.value);
    const resp = await fetch(`${appSubUrl}/user/activate`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body,
      redirect: 'manual',
    });
    if (resp.ok || resp.type === 'opaqueredirect' || resp.status === 302) {
      success.value = true;
    } else {
      error.value = 'Could not activate account. The link may have expired.';
    }
  } catch {
    error.value = 'Network error. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>
