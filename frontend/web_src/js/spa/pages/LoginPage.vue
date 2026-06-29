<!-- Translated from: templates/user/auth/signin.tmpl + templates/user/auth/signin_inner.tmpl -->
<template>
  <AppLayout page-class="user signin" title="Sign In">
    <div class="ui middle very relaxed page grid">
      <div class="column tw-flex tw-flex-col tw-gap-4 tw-max-w-2xl tw-m-auto">
        <!-- signin_inner.tmpl -->
        <div class="ui container fluid">
          <BaseAlert :flash="flash"/>
          <h4 class="ui top attached header center">Sign in with username or email</h4>
          <div class="ui attached segment">
            <form class="ui form" @submit.prevent="handleLogin">
              <div class="required field" :class="{error: !!flash.error}">
                <label for="user_name">Username or email address</label>
                <input id="user_name" v-model="username" type="text" name="user_name" autofocus required tabindex="1">
              </div>
              <div class="required field" :class="{error: !!flash.error}">
                <div class="tw-flex tw-mb-1">
                  <label for="password" class="tw-flex-1">Password</label>
                  <RouterLink to="/user/forgot_password" tabindex="4">Forgot password?</RouterLink>
                </div>
                <input id="password" v-model="password" name="password" type="password" autocomplete="current-password" required tabindex="2">
              </div>
              <div class="inline field">
                <div class="ui checkbox">
                  <label>Remember this device</label>
                  <input v-model="remember" name="remember" type="checkbox" tabindex="5">
                </div>
              </div>
              <div class="field">
                <button class="ui primary button tw-w-full" type="submit" tabindex="3" :disabled="submitting">
                  {{ submitting ? 'Signing in…' : 'Sign In' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Registration prompt -->
        <div class="ui container fluid">
          <div class="ui attached segment header top tw-max-w-2xl tw-m-auto tw-flex tw-flex-col tw-items-center">
            <div class="field">
              <span>Need an account?</span>
              <RouterLink to="/user/sign_up">Register now</RouterLink>
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

const username = ref('');
const password = ref('');
const remember = ref(false);
const submitting = ref(false);
const flash = ref<{error?: string}>({});

async function handleLogin() {
  submitting.value = true;
  flash.value = {};
  try {
    await login(username.value, password.value);
    window.location.href = window.location.pathname;
  } catch (e) {
    flash.value.error = e instanceof Error ? e.message : 'Login failed. Please check your credentials.';
  } finally {
    submitting.value = false;
  }
}
</script>
