<!-- Translated from: templates/user/auth/twofa.tmpl -->
<template>
  <AppLayout page-class="user signin" title="Two-Factor Authentication">
    <div class="ui middle very relaxed page grid">
      <div class="column">
        <form class="ui form tw-max-w-2xl tw-m-auto" @submit.prevent="handleVerify">
          <h3 class="ui top attached header">Two-Factor Authentication</h3>
          <div class="ui attached segment">
            <BaseAlert :flash="flash"/>
            <div class="required field">
              <label for="passcode">Passcode</label>
              <input id="passcode" v-model="passcode" name="passcode" type="text" autocomplete="one-time-code" inputmode="numeric" pattern="[0-9]*" autofocus required>
            </div>
            <div class="inline field">
              <button class="ui primary button" type="submit" :disabled="submitting">Verify</button>
              <RouterLink to="/user/two_factor/scratch">Use a scratch code</RouterLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import {apiBase} from '../spaconfig.ts';

const passcode = ref('');
const submitting = ref(false);
const flash = ref<{error?: string}>({});

async function handleVerify() {
  submitting.value = true;
  flash.value = {};
  try {
    const resp = await fetch(`${apiBase}/user/two_factor`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({passcode: passcode.value}),
    });
    if (resp.ok) {
      window.location.href = window.location.pathname;
    } else {
      const body = await resp.json().catch(() => ({}));
      flash.value.error = body.message || 'Invalid passcode. Please try again.';
    }
  } catch {
    flash.value.error = 'Network error. Please try again.';
  } finally {
    submitting.value = false;
  }
}
</script>
