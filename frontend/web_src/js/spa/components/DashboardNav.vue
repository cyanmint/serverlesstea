<!-- Translates: user/dashboard/navbar.tmpl -->
<template>
  <div class="secondary-nav tw-border-b tw-border-b-secondary">
    <div class="ui secondary stackable menu">
      <div class="item" ref="dropdownEl">
        <div class="ui floating dropdown jump" :class="{active: dropdownOpen}" @click.stop="toggleDropdown">
          <span class="text">
            <img v-if="currentUser" :src="currentUser.avatar_url" :alt="currentUser.login" width="24" height="24" class="ui avatar image tw-mr-1">
            <span class="gt-ellipsis">{{ currentUser?.login }}</span>
            <SvgIcon name="octicon-triangle-down" :size="14" class="dropdown icon tw-ml-1"/>
          </span>
          <div class="menu" v-show="dropdownOpen" @click.stop>
            <RouterLink :to="`/${currentUser?.login}`" class="item" @click="dropdownOpen = false">
              <img v-if="currentUser" :src="currentUser.avatar_url" :alt="currentUser.login" width="20" height="20" class="ui avatar image tw-mr-2">
              {{ currentUser?.login }}
            </RouterLink>
            <template v-if="orgs.length">
              <div class="divider"/>
              <RouterLink v-for="org in orgs" :key="org.id" :to="`/${org.username}`" class="item" @click="dropdownOpen = false">
                <img :src="org.avatar_url" :alt="org.username" width="20" height="20" class="ui avatar image tw-mr-2">
                {{ org.username }}
              </RouterLink>
            </template>
          </div>
        </div>
      </div>

      <!-- Navigation tabs for org mode -->
      <div class="right menu tw-flex-wrap tw-justify-end">
        <RouterLink v-if="mode === 'dashboard'" class="item" :class="{active: isActive('/')}" to="/">
          <SvgIcon name="octicon-rss" :size="16"/>&nbsp;Activities
        </RouterLink>
        <RouterLink class="item" :class="{active: isActive('/issues')}" to="/issues">
          <SvgIcon name="octicon-issue-opened" :size="16"/>&nbsp;Issues
        </RouterLink>
        <RouterLink class="item" :class="{active: isActive('/pulls')}" to="/pulls">
          <SvgIcon name="octicon-git-pull-request" :size="16"/>&nbsp;Pull Requests
        </RouterLink>
        <RouterLink class="item" :class="{active: isActive('/milestones')}" to="/milestones">
          <SvgIcon name="octicon-milestone" :size="16"/>&nbsp;Milestones
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import {SvgIcon} from '../../svg.ts';
import type {User, Organization} from '../api/index.ts';
import {getMyOrgs} from '../api/index.ts';

const props = defineProps<{
  currentUser: User | null;
  mode?: string;
}>();

const route = useRoute();
const dropdownOpen = ref(false);
const dropdownEl = ref<HTMLElement | null>(null);
const orgs = ref<Organization[]>([]);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function onDocClick(e: MouseEvent) {
  if (dropdownEl.value && !dropdownEl.value.contains(e.target as Node)) {
    dropdownOpen.value = false;
  }
}

function isActive(prefix: string): boolean {
  return (route.path ?? '/').startsWith(prefix) && (prefix !== '/' || route.path === '/');
}

watch(() => props.currentUser, async (user) => {
  if (user) {
    try {
      orgs.value = await getMyOrgs();
    } catch { /* silently ignore org fetch errors */ }
  }
}, {immediate: true});

onMounted(() => {
  document.addEventListener('click', onDocClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocClick);
});
</script>
