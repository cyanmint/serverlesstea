<template>
  <AppLayout>
    <div role="main" class="page-content oauth2-authorize-application-box">
      <div class="ui container tw-max-w-[500px]">
        <h3 class="ui top attached header">
          Authorize Application
        </h3>
        <div class="ui attached segment">
          <div v-if="error" class="ui negative message"><p>{{ error }}</p></div>
          <p v-if="appName">
            <strong>{{ appName }}</strong> wants to access your Gitea account.
          </p>
          <p v-if="scope">
            Requested permissions: <strong>{{ scope }}</strong>
          </p>
        </div>
        <div class="ui attached segment">
          <p v-if="redirectUri">
            You will be redirected to: <strong>{{ redirectUri }}</strong>
          </p>
        </div>
        <div class="ui attached segment tw-text-center">
          <form method="post" :action="`${appSubUrl}/login/oauth/grant`">
            <input type="hidden" name="client_id" :value="clientId">
            <input type="hidden" name="state" :value="state">
            <input type="hidden" name="scope" :value="scope">
            <input type="hidden" name="nonce" :value="nonce">
            <input type="hidden" name="redirect_uri" :value="redirectUri">
            <button type="submit" name="granted" value="true" class="ui red inline button">
              Authorize Application
            </button>
            <button type="submit" name="granted" value="false" class="ui basic primary inline button">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {appSubUrl} from '../spaconfig.ts';

const route = useRoute();
const error = computed(() => route.query['error'] as string ?? '');
const clientId = computed(() => route.query['client_id'] as string ?? '');
const state = computed(() => route.query['state'] as string ?? '');
const scope = computed(() => route.query['scope'] as string ?? '');
const nonce = computed(() => route.query['nonce'] as string ?? '');
const redirectUri = computed(() => route.query['redirect_uri'] as string ?? '');
const appName = computed(() => route.query['app_name'] as string ?? 'An application');
</script>
