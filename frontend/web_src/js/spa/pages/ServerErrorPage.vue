<!-- Translated from: templates/status/500.tmpl -->
<template>
  <AppLayout page-class="" title="Internal Server Error">
    <div class="ui container">
      <div class="status-page-error">
        <div class="status-page-error-title">500 Internal Server Error</div>
        <div v-if="errorMsg" class="tw-mt-8">
          <p>An error occurred:</p>
          <pre class="tw-whitespace-pre-wrap tw-wrap-anywhere">{{ errorMsg }}</pre>
        </div>
        <div class="tw-mt-8 tw-text-center">
          <RouterLink class="tw-block tw-my-4" to="/">Go back to home page</RouterLink>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';

const route = useRoute();
const errorMsg = ref((route.query.error as string) || '');
</script>
