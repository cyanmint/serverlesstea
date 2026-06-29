<!-- Translates: user/dashboard/navbar.tmpl -->
<template>
  <div class="secondary-nav tw-border-b tw-border-b-secondary">
    <div class="ui secondary stackable menu">
      <div class="item">
        <div class="ui floating dropdown jump">
          <span class="text">
            <img v-if="currentUser" :src="currentUser.avatar_url" :alt="currentUser.login" width="24" height="24" class="ui avatar image tw-mr-1">
            <span class="gt-ellipsis">{{ currentUser?.login }}</span>
            <SvgIcon name="octicon-triangle-down" :size="14" class="dropdown icon tw-ml-1"/>
          </span>
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
import {RouterLink, useRoute} from 'vue-router';
import {SvgIcon} from '../../svg.ts';
import type {User} from '../api/index.ts';

defineProps<{
  currentUser: User | null;
  mode?: string;
}>();

const route = useRoute();

function isActive(prefix: string): boolean {
  return (route.path ?? '/').startsWith(prefix) && (prefix !== '/' || route.path === '/');
}
</script>
