<!-- Translated from: templates/status/404.tmpl -->
<template>
  <AppLayout page-class="" title="Page Not Found">
    <div class="ui container">
      <div class="status-page-error">
        <div class="status-page-error-title">404 Not Found</div>
        <div class="tw-text-center">
          <div class="tw-my-4">The page you are looking for either does not exist or you don't have permission to view it.</div>
          <RouterLink class="tw-block tw-my-4" to="/">Go back to home page</RouterLink>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
</script>
