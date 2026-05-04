<template>
  <AppLayout>
    <div class="ui container tw-py-12 tw-text-center">
      <h1 class="tw-text-6xl tw-font-bold tw-text-gray-300 tw-mb-4">404</h1>
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-2">Page Not Found</h2>
      <p class="tw-text-gray-600 tw-mb-6">
        The page <code class="tw-font-mono tw-bg-gray-100 tw-px-1 tw-rounded">{{ path }}</code> does not exist.
      </p>
      <RouterLink to="/" class="ui primary button">Go Home</RouterLink>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';

const route = useRoute();
const path = computed(() => route.path);
</script>
