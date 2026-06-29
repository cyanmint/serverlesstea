<!-- Translated from: templates/user/notification/notification.tmpl + notification_div.tmpl -->
<template>
  <AppLayout page-class="user notification" title="Notifications">
    <div class="ui container">
      <div class="flex-left-right tw-mb-4">
        <div class="small-menu-items ui compact tiny menu">
          <a :class="['item', {active: pageType === 'unread'}]" @click="pageType='unread'">
            Unread
            <span v-if="unreadCount" class="ui label">{{ unreadCount }}</span>
          </a>
          <a :class="['item', {active: pageType === 'read'}]" @click="pageType='read'">Read</a>
        </div>
        <button v-if="pageType === 'unread' && unreadCount" class="ui mini button primary" @click="markAllRead">
          Mark all as read
        </button>
      </div>
      <div id="notification_table">
        <div v-for="n in notifications" :key="n.id" class="notifications-item">
          <div class="tw-self-start tw-mt-0.5">
            <span class="tw-text-text-light">●</span>
          </div>
          <a class="notifications-link silenced tw-flex-1" :href="n.subject?.html_url || '#'">
            <div class="flex-text-block tw-text-sm">
              {{ n.repository?.full_name }}
              <span v-if="n.subject?.type === 'Issue' || n.subject?.type === 'Pull'" class="tw-text-text-light-3">#{{ subjectIndex(n) }}</span>
            </div>
            <div class="tw-text-base tw-py-0.5">{{ n.subject?.title || n.repository?.full_name }}</div>
          </a>
          <div class="notifications-updated tw-text-text-light-3">{{ formatDate(n.updated_at) }}</div>
          <div class="notifications-buttons">
            <button v-if="pageType === 'unread'" class="ui mini icon button" title="Mark as read" @click="markRead(n.id)">✓</button>
            <button v-if="pageType === 'read'" class="ui mini icon button" title="Mark as unread" @click="markUnread(n.id)">↩</button>
          </div>
        </div>
        <div v-if="!loading && !notifications.length" class="tw-text-center tw-py-8 tw-text-text-light">
          {{ pageType === 'unread' ? 'No unread notifications' : 'No read notifications' }}
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import {apiBase} from '../spaconfig.ts';

const pageType = ref<'unread'|'read'>('unread');
const notifications = ref<any[]>([]);
const unreadCount = ref(0);
const loading = ref(false);

const token = localStorage.getItem('gitea-spa-token') || '';

function formatDate(d: string) {
  if (!d) return '';
  return new Date(d).toLocaleDateString();
}

function subjectIndex(n: any) {
  const url = n.subject?.url || '';
  return url.split('/').pop() || '';
}

async function loadNotifications() {
  loading.value = true;
  try {
    const status = pageType.value === 'unread' ? 'unread' : 'read';
    const resp = await fetch(`${apiBase}/notifications?status-types=${status}`, {
      headers: {Authorization: `token ${token}`},
    });
    if (resp.ok) notifications.value = await resp.json();
    // Count unread
    const countResp = await fetch(`${apiBase}/notifications/new`, {
      headers: {Authorization: `token ${token}`},
    });
    if (countResp.ok) {
      const data = await countResp.json();
      unreadCount.value = data.new || 0;
    }
  } catch { /* empty */ } finally {
    loading.value = false;
  }
}

async function markRead(id: string) {
  await fetch(`${apiBase}/notifications/threads/${id}`, {
    method: 'PATCH',
    headers: {Authorization: `token ${token}`, 'Content-Type': 'application/json'},
  });
  loadNotifications();
}

async function markUnread(id: string) {
  await fetch(`${apiBase}/notifications/threads/${id}`, {
    method: 'PATCH',
    headers: {Authorization: `token ${token}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({status: 'unread'}),
  });
  loadNotifications();
}

async function markAllRead() {
  await fetch(`${apiBase}/notifications`, {
    method: 'PUT',
    headers: {Authorization: `token ${token}`, 'Content-Type': 'application/json'},
  });
  loadNotifications();
}

watch(pageType, () => loadNotifications());
onMounted(() => loadNotifications());
</script>
