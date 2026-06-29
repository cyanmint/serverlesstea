<!-- Translated from: templates/user/auth/forgot_passwd.tmpl -->
<template>
  <AppLayout page-class="user forgot password" title="Forgot Password">
    <div class="ui middle very relaxed page grid">
      <div class="column">
        <form class="ui form ignore-dirty tw-max-w-2xl tw-m-auto" @submit.prevent="handleSubmit">
          <h2 class="ui top attached header">Forgot Password</h2>
          <div class="ui attached segment">
            <BaseAlert :flash="flash"/>
            <div v-if="sent" class="ui positive message">
              <p>A password reset email has been sent to <strong>{{ email }}</strong>. Please check your inbox.</p>
            </div>
            <template v-else>
              <div class="required field" :class="{error: !!flash.error}">
                <label for="email">Email address</label>
                <input id="email" v-model="email" name="email" type="email" autofocus required>
              </div>
              <div class="divider"></div>
              <div class="inline field">
                <button class="ui primary button" type="submit" :disabled="submitting">
                  {{ submitting ? 'Sending…' : 'Send Recovery Email' }}
                </button>
              </div>
            </template>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import {apiBase} from '../spaconfig.ts';

const email = ref('');
const submitting = ref(false);
const sent = ref(false);
const flash = ref<{error?: string}>({});

async function handleSubmit() {
  submitting.value = true;
  flash.value = {};
  try {
    const resp = await fetch(`${apiBase}/user/forgot_password`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: email.value}),
    });
    if (resp.ok || resp.status === 201) {
      sent.value = true;
    } else {
      const body = await resp.json().catch(() => ({}));
      flash.value.error = body.message || 'Failed to send recovery email. Please try again.';
    }
  } catch {
    flash.value.error = 'Network error. Please try again.';
  } finally {
    submitting.value = false;
  }
}
</script>
