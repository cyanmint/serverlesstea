<!-- Translated from: templates/user/auth/signup.tmpl + templates/user/auth/signup_inner.tmpl -->
<template>
  <AppLayout page-class="user signin" title="Register">
    <div class="ui middle very relaxed page grid">
      <div class="column tw-flex tw-flex-col tw-gap-4 tw-max-w-2xl tw-m-auto">
        <!-- signup_inner.tmpl -->
        <div class="ui container fluid">
          <h4 class="ui top attached header center">Register Account</h4>
          <div class="ui attached segment">
            <div v-if="successMessage" class="ui positive message tw-mb-4">
              <p>{{ successMessage }}</p>
              <RouterLink to="/user/login" class="ui small primary button tw-mt-2">Sign In</RouterLink>
            </div>
            <form v-else class="ui form" @submit.prevent="handleRegister">
              <BaseAlert :flash="flash"/>
              <div class="required field" :class="{error: fieldErrors.username}">
                <label for="user_name">Username</label>
                <input id="user_name" v-model="form.username" type="text" name="user_name" autofocus required>
                <div v-if="fieldErrors.username" class="ui pointing red label">{{ fieldErrors.username }}</div>
              </div>
              <div class="required field" :class="{error: fieldErrors.email}">
                <label for="email">Email</label>
                <input id="email" v-model="form.email" name="email" type="email" required>
                <div v-if="fieldErrors.email" class="ui pointing red label">{{ fieldErrors.email }}</div>
              </div>
              <div class="required field" :class="{error: fieldErrors.password}">
                <label for="password">Password</label>
                <input id="password" v-model="form.password" name="password" type="password" autocomplete="new-password" required>
                <div v-if="fieldErrors.password" class="ui pointing red label">{{ fieldErrors.password }}</div>
              </div>
              <div class="required field" :class="{error: fieldErrors.retype}">
                <label for="retype">Confirm Password</label>
                <input id="retype" v-model="form.retype" name="retype" type="password" autocomplete="new-password" required>
                <div v-if="fieldErrors.retype" class="ui pointing red label">{{ fieldErrors.retype }}</div>
              </div>
              <div class="inline field">
                <button class="ui primary button tw-w-full" type="submit" :class="{loading: submitting}" :disabled="submitting">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="ui container fluid">
          <div class="ui attached segment header top tw-flex tw-flex-col tw-items-center">
            <div class="field">
              <span>Already have an account?</span>
              <RouterLink to="/user/login">Sign in now</RouterLink>
            </div>
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
import BaseAlert from '../components/BaseAlert.vue';
import {login} from '../api/index.ts';
import {apiBase} from '../spaconfig.ts';

const form = ref({username: '', email: '', password: '', retype: ''});
const submitting = ref(false);
const flash = ref<{error?: string}>({});
const successMessage = ref('');
const fieldErrors = ref<Record<string, string>>({});

async function handleRegister() {
  fieldErrors.value = {};
  flash.value = {};
  if (form.value.password !== form.value.retype) {
    fieldErrors.value.retype = 'Passwords do not match.';
    return;
  }
  submitting.value = true;
  try {
    const resp = await fetch(`${apiBase}/user/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: form.value.username, email: form.value.email, password: form.value.password}),
    });
    if (resp.status === 201) {
      try {
        await login(form.value.username, form.value.password);
        window.location.href = window.location.pathname;
      } catch {
        successMessage.value = 'Account created! You can now sign in.';
      }
      return;
    }
    const body = await resp.json().catch(() => ({}));
    const msg: string = body.message ?? body.error ?? '';
    flash.value.error = msg || 'Registration failed. Please try again.';
  } catch {
    flash.value.error = 'Network error. Please try again.';
  } finally {
    submitting.value = false;
  }
}
</script>
