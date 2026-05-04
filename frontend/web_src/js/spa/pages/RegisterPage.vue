<template>
  <AppLayout>
    <div class="ui container tw-py-8 tw-max-w-md tw-mx-auto">
      <h1 class="tw-text-2xl tw-font-bold tw-mb-6 tw-text-center">Create an Account</h1>

      <div v-if="successMessage" class="ui positive message tw-mb-4">
        <p>{{ successMessage }}</p>
        <RouterLink to="/user/login" class="ui small primary button tw-mt-2">Sign In</RouterLink>
      </div>

      <form v-else class="ui form" @submit.prevent="handleRegister">
        <div v-if="errorMessage" class="ui negative message tw-mb-4">
          <p>{{ errorMessage }}</p>
        </div>

        <div class="field" :class="{error: fieldErrors.username}">
          <label for="reg-username">Username</label>
          <input
            id="reg-username"
            v-model="form.username"
            type="text"
            name="user_name"
            autocomplete="username"
            required
            placeholder="Choose a username"
          >
          <div v-if="fieldErrors.username" class="ui pointing red label">
            {{ fieldErrors.username }}
          </div>
        </div>

        <div class="field" :class="{error: fieldErrors.email}">
          <label for="reg-email">Email Address</label>
          <input
            id="reg-email"
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            required
            placeholder="you@example.com"
          >
          <div v-if="fieldErrors.email" class="ui pointing red label">
            {{ fieldErrors.email }}
          </div>
        </div>

        <div class="field" :class="{error: fieldErrors.password}">
          <label for="reg-password">Password</label>
          <input
            id="reg-password"
            v-model="form.password"
            type="password"
            name="password"
            autocomplete="new-password"
            required
            placeholder="At least 8 characters"
          >
          <div v-if="fieldErrors.password" class="ui pointing red label">
            {{ fieldErrors.password }}
          </div>
        </div>

        <div class="field" :class="{error: fieldErrors.retype}">
          <label for="reg-retype">Confirm Password</label>
          <input
            id="reg-retype"
            v-model="form.retype"
            type="password"
            name="retype"
            autocomplete="new-password"
            required
            placeholder="Repeat your password"
          >
          <div v-if="fieldErrors.retype" class="ui pointing red label">
            {{ fieldErrors.retype }}
          </div>
        </div>

        <button
          type="submit"
          class="ui fluid primary button tw-mt-4"
          :class="{loading: submitting}"
          :disabled="submitting"
        >
          Register Account
        </button>

        <p class="tw-text-center tw-text-sm tw-text-gray-500 tw-mt-4">
          Already have an account?
          <RouterLink to="/user/login" class="tw-text-blue-600 hover:tw-underline">Sign in</RouterLink>
        </p>
      </form>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {login} from '../api/index.ts';
import {apiBase} from '../spaconfig.ts';

const form = ref({
  username: '',
  email: '',
  password: '',
  retype: '',
});

const submitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const fieldErrors = ref<Record<string, string>>({});

async function handleRegister() {
  fieldErrors.value = {};
  if (form.value.password !== form.value.retype) {
    fieldErrors.value.retype = 'Passwords do not match.';
    return;
  }
  // Let the server enforce the real minimum — do a basic sanity check only.
  if (form.value.password.length < 1) {
    fieldErrors.value.password = 'Password is required.';
    return;
  }

  submitting.value = true;
  errorMessage.value = '';

  try {
    const resp = await fetch(`${apiBase}/user/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: form.value.username,
        email: form.value.email,
        password: form.value.password,
      }),
    });

    if (resp.status === 201) {
      // Registration succeeded — sign in automatically.
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
    if (msg.toLowerCase().includes('already exist') || msg.toLowerCase().includes('already used')) {
      errorMessage.value = 'Username or email is already taken.';
    } else if (msg.toLowerCase().includes('disabled') || resp.status === 403) {
      errorMessage.value = 'Registration is disabled on this server.';
    } else {
      errorMessage.value = msg || 'Registration failed. Please try again.';
    }
  } catch {
    errorMessage.value = 'Network error. Please try again.';
  } finally {
    submitting.value = false;
  }
}
</script>
