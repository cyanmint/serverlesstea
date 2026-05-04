<template>
  <nav id="navbar">
    <div class="navbar-left">
      <RouterLink to="/" class="item brand tw-flex tw-items-center tw-gap-2">
        <img :src="`${assetUrlPrefix}/img/logo.svg`" alt="Gitea" width="28" height="28">
        <span class="tw-font-semibold">Gitea</span>
      </RouterLink>
      <RouterLink to="/explore/repos" class="item">Explore</RouterLink>
    </div>
    <div class="navbar-right">
      <template v-if="currentUser">
        <RouterLink to="/issues" class="item">Issues</RouterLink>
        <RouterLink to="/pulls" class="item">Pull Requests</RouterLink>
        <RouterLink to="/notifications" class="item">Notifications</RouterLink>
        <RouterLink v-if="currentUser.is_admin" to="/-/admin" class="item">Admin</RouterLink>
        <RouterLink :to="`/${currentUser.login}`" class="item tw-flex tw-items-center tw-gap-1">
          <img :src="currentUser.avatar_url" :alt="currentUser.login" width="24" height="24" class="ui avatar image">
          <span>{{ currentUser.login }}</span>
        </RouterLink>
      </template>
      <template v-else-if="!authLoading">
        <RouterLink to="/user/login" class="item">Sign In</RouterLink>
        <RouterLink to="/user/sign_up" class="item">Register</RouterLink>
      </template>
    </div>
  </nav>
  <div class="page-content">
    <slot/>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {RouterLink} from 'vue-router';
import {getCurrentUser, type User} from '../api/index.ts';
import {assetUrlPrefix} from '../spaconfig.ts';

const authLoading = ref(true);
const currentUser = ref<User | null>(null);

onMounted(async () => {
  try {
    currentUser.value = await getCurrentUser();
  } catch {
    // not signed in — leave currentUser null
  } finally {
    authLoading.value = false;
  }
});
</script>
