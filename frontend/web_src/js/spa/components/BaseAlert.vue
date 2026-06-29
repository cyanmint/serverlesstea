<!-- Translates: base/alert.tmpl -->
<template>
  <div v-if="flash?.error" class="ui error message flash-message flash-error">
    <p>{{ flash.error }}</p>
  </div>
  <div v-if="flash?.warning" class="ui warning message flash-message flash-warning">
    <p>{{ flash.warning }}</p>
  </div>
  <div v-if="flash?.info" class="ui info message flash-message flash-info">
    <p>{{ flash.info }}</p>
  </div>
  <div v-if="flash?.success" class="ui success message flash-message flash-success">
    <p>{{ flash.success }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  flash?: {
    error?: string;
    warning?: string;
    info?: string;
    success?: string;
  };
}>();
</script>
