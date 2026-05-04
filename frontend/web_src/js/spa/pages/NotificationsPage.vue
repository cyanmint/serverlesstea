<template>
  <AppLayout>
    <div class="ui container tw-py-4">
      <div class="tw-flex tw-items-center tw-justify-between tw-mb-4">
        <h1 class="tw-text-2xl tw-font-bold">Notifications</h1>
        <button
          class="ui small primary button"
          :disabled="markingAll"
          @click="markAll"
        >
          {{ markingAll ? 'Marking…' : 'Mark all as read' }}
        </button>
      </div>

      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="notifications.length === 0" class="ui placeholder segment">
        <div class="tw-text-center tw-py-8 tw-text-gray-500">
          No notifications.
        </div>
      </div>
      <div v-else class="tw-border tw-rounded">
        <div
          v-for="n in notifications"
          :key="n.id"
          class="tw-flex tw-items-start tw-gap-3 tw-px-4 tw-py-3 tw-border-b last:tw-border-b-0 hover:tw-bg-gray-50"
          :class="{'tw-bg-blue-50': n.unread}"
        >
          <span class="tw-text-sm tw-mt-0.5">
            {{ typeIcon(n.subject.type) }}
          </span>
          <div class="tw-flex-1 tw-min-w-0">
            <RouterLink
              :to="notifToPath(n)"
              class="tw-font-medium hover:tw-underline tw-text-gray-900 hover:tw-text-blue-600"
            >
              {{ n.subject.title }}
            </RouterLink>
            <div class="tw-text-xs tw-text-gray-500 tw-mt-0.5">
              {{ n.repository.full_name }}
              · {{ formatDate(n.updated_at) }}
            </div>
          </div>
          <button
            v-if="n.unread"
            class="ui tiny basic button tw-whitespace-nowrap"
            @click="markRead(n)"
          >
            Mark read
          </button>
        </div>
      </div>

      <div v-if="notifications.length > 0" class="tw-flex tw-justify-center tw-mt-4 tw-gap-2">
        <button class="ui button" :disabled="page <= 1" @click="page--">Previous</button>
        <span class="ui label tw-self-center">Page {{ page }}</span>
        <button class="ui button" :disabled="notifications.length < pageSize" @click="page++">Next</button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, watch, onMounted} from 'vue';
import {RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getNotifications, markAllNotificationsRead, markNotificationRead, type Notification} from '../api/index.ts';

const notifications = ref<Notification[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const markingAll = ref(false);
const page = ref(1);
const pageSize = 20;

function notifToPath(n: Notification): string {
  try {
    const u = new URL(n.subject.url);
    const m = u.pathname.match(/\/api\/v1\/repos\/([^/]+)\/([^/]+)\/(issues|pulls)\/(\d+)/);
    if (m) return `/${m[1]}/${m[2]}/${m[3]}/${m[4]}`;
    return `/${n.repository.full_name}`;
  } catch {
    return `/${n.repository.full_name}`;
  }
}

function typeIcon(type: Notification['subject']['type']): string {
  switch (type) {
    case 'Issue': return '🔴';
    case 'Pull': return '🟣';
    case 'Commit': return '📝';
    default: return '📁';
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString();
}

async function load() {
  loading.value = true;
  error.value = null;
  try {
    notifications.value = await getNotifications({all: true, page: page.value, limit: pageSize});
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

async function markAll() {
  markingAll.value = true;
  try {
    await markAllNotificationsRead();
    await load();
  } catch (e) {
    error.value = String(e);
  } finally {
    markingAll.value = false;
  }
}

async function markRead(n: Notification) {
  try {
    await markNotificationRead(n.id);
    n.unread = false;
  } catch (e) {
    error.value = String(e);
  }
}

watch(page, load);
onMounted(load);
</script>
