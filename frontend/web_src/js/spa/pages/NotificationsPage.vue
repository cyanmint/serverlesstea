<template>
  <AppLayout page-class="user notification">
    <div class="ui container">
      <div class="flex-left-right tw-mb-[--page-spacing]">
        <div class="small-menu-items ui compact tiny menu">
          <a class="item" :class="{active: pageType === 'unread'}" @click="setPageType('unread')">
            Unread
            <div v-if="unreadCount > 0" class="notifications-unread-count ui label">{{ unreadCount }}</div>
          </a>
          <a class="item" :class="{active: pageType === 'read'}" @click="setPageType('read')">
            Read
          </a>
        </div>
        <button
          v-if="pageType === 'unread' && unreadCount > 0"
          class="ui mini button primary tw-mr-0"
          :disabled="markingAll"
          title="Mark all as read"
          @click="markAll"
        >
          <SvgIcon name="octicon-checklist" :size="16"/>
        </button>
      </div>

      <div id="notification_table">
        <div v-if="loading" class="tw-py-16 tw-text-center">
          <div class="ui active centered inline loader"/>
        </div>
        <div v-else-if="error" class="ui negative message">
          <p>{{ error }}</p>
        </div>
        <div v-else-if="notifications.length === 0" class="tw-text-center tw-py-8 tw-text-placeholder-text">
          No {{ pageType }} notifications.
        </div>
        <div
          v-for="n in notifications"
          :key="n.id"
          class="notifications-item"
          :id="`notification_${n.id}`"
        >
          <div class="tw-self-start tw-mt-[2px]">
            <SvgIcon
              :name="n.subject.type === 'Issue' ? 'octicon-issue-opened' : n.subject.type === 'Pull' ? 'octicon-git-pull-request' : 'octicon-repo'"
              :size="16"
              class="tw-text-text-light"
            />
          </div>
          <RouterLink class="notifications-link silenced tw-flex-1" :to="notifToPath(n)">
            <div class="flex-text-block tw-text-[0.95em]">
              {{ n.repository.full_name }}
            </div>
            <div class="tw-text-16 tw-py-0.5">
              {{ n.subject.title }}
            </div>
          </RouterLink>
          <div class="notifications-updated flex-text-inline">
            {{ formatTimeAgo(n.updated_at) }}
          </div>
          <div class="notifications-buttons">
            <button
              v-if="n.unread"
              class="ui tiny basic button"
              @click="markRead(n)"
            >
              <SvgIcon name="octicon-check" :size="14"/>
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="notifications.length > 0" class="tw-flex tw-justify-center tw-mt-4 tw-gap-2">
        <button class="ui button" :disabled="page <= 1" @click="page--; load()">Previous</button>
        <span class="ui label tw-self-center">Page {{ page }}</span>
        <button class="ui button" :disabled="notifications.length < pageSize" @click="page++; load()">Next</button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {SvgIcon} from '../../svg.ts';
import {getNotifications, markAllNotificationsRead, markNotificationRead, type Notification} from '../api/index.ts';

const notifications = ref<Notification[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const markingAll = ref(false);
const page = ref(1);
const pageSize = 20;
const pageType = ref<'unread' | 'read'>('unread');

const unreadCount = computed(() => notifications.value.filter((n) => n.unread).length);

function notifToPath(n: Notification): string {
  try {
    const u = new URL(n.subject.url);
    const m = u.pathname.match(/\/api\/v1\/repos\/([^/]+)\/([^/]+)\/(issues|pulls)\/(\d+)/);
    if (m) return `/${m[1]}/${m[2]}/${m[3] === 'pulls' ? 'pulls' : 'issues'}/${m[4]}`;
    return `/${n.repository.full_name}`;
  } catch {
    return `/${n.repository.full_name}`;
  }
}

function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function setPageType(t: 'unread' | 'read') {
  pageType.value = t;
  page.value = 1;
  load();
}

async function load() {
  loading.value = true;
  error.value = null;
  try {
    const all = pageType.value === 'read';
    notifications.value = await getNotifications({all, page: page.value, limit: pageSize});
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

onMounted(load);
</script>
