<template>
  <!-- ── Navbar ─────────────────────────────────────────────────────────── -->
  <nav id="navbar" aria-label="navigation">
    <div class="navbar-left">
      <!-- logo -->
      <RouterLink to="/" class="item" id="navbar-logo" :aria-label="currentUser ? 'Dashboard' : 'Home'">
        <img width="30" height="30" :src="`${assetUrlPrefix}/img/logo.svg`" alt="Gitea" aria-hidden="true">
      </RouterLink>

      <!-- main nav links (signed-in) -->
      <template v-if="currentUser">
        <RouterLink to="/issues" class="item" :class="{active: isPath('/issues')}">Issues</RouterLink>
        <RouterLink to="/pulls" class="item" :class="{active: isPath('/pulls')}">Pull Requests</RouterLink>
        <RouterLink to="/milestones" class="item" :class="{active: isPath('/milestones')}">Milestones</RouterLink>
        <RouterLink to="/explore/repos" class="item" :class="{active: isPath('/explore')}">Explore</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/explore/repos" class="item" :class="{active: isPath('/explore')}">Explore</RouterLink>
      </template>
    </div>

    <div class="navbar-right">
      <!-- guest -->
      <template v-if="!authLoading && !currentUser">
        <RouterLink to="/user/sign_up" class="item" :class="{active: isPath('/user/sign_up')}">
          <SvgIcon name="octicon-person" :size="16"/>
          <span class="tw-ml-1">Register</span>
        </RouterLink>
        <RouterLink to="/user/login" class="item" rel="nofollow" :class="{active: isPath('/user/login')}">
          <SvgIcon name="octicon-sign-in" :size="16"/>
          <span class="tw-ml-1">Sign In</span>
        </RouterLink>
      </template>

      <!-- signed-in: notifications bell -->
      <template v-if="currentUser">
        <RouterLink to="/notifications" class="item" :class="{active: isPath('/notifications')}" aria-label="Notifications">
          <SvgIcon name="octicon-bell" :size="16"/>
        </RouterLink>

        <!-- "Create new" dropdown -->
        <div class="ui dropdown jump item" :class="{active: createMenuOpen}" ref="createDropdownEl" @click.stop="toggleCreateMenu">
          <span class="flex-text-block">
            <SvgIcon name="octicon-plus" :size="16"/>
            <span class="not-mobile flex-text-block">
              <SvgIcon name="octicon-triangle-down" :size="14"/>
            </span>
            <span class="only-mobile">Create</span>
          </span>
          <div class="menu" :class="{visible: createMenuOpen}" v-show="createMenuOpen">
            <RouterLink to="/repo/create" class="item">
              <SvgIcon name="octicon-plus" :size="16"/> New repository
            </RouterLink>
            <RouterLink to="/repo/migrate" class="item">
              <SvgIcon name="octicon-repo-push" :size="16"/> Migrate repository
            </RouterLink>
            <RouterLink v-if="currentUser.can_create_organization !== false" to="/org/create" class="item">
              <SvgIcon name="octicon-organization" :size="16"/> New organisation
            </RouterLink>
          </div>
        </div>

        <!-- user avatar dropdown -->
        <div class="ui dropdown jump item" :class="{active: userMenuOpen}" ref="userDropdownEl" @click.stop="toggleUserMenu">
          <span class="text tw-flex tw-items-center">
            <span class="navbar-avatar">
              <img :src="currentUser.avatar_url" :alt="currentUser.login" width="24" height="24" class="ui avatar image tw-mr-2">
              <SvgIcon v-if="currentUser.is_admin" name="octicon-shield-check" :size="16" class="navbar-admin-badge"/>
            </span>
            <span class="only-mobile">{{ currentUser.login }}</span>
            <span class="not-mobile flex-text-block">
              <SvgIcon name="octicon-triangle-down" :size="14"/>
            </span>
          </span>
          <div class="menu user-menu" :class="{visible: userMenuOpen}" v-show="userMenuOpen">
            <div class="header">
              Signed in as <strong>{{ currentUser.login }}</strong>
            </div>
            <div class="divider"/>
            <RouterLink :to="`/${currentUser.login}`" class="item">
              <SvgIcon name="octicon-person" :size="16"/> Your profile
            </RouterLink>
            <RouterLink :to="`/${currentUser.login}?tab=stars`" class="item">
              <SvgIcon name="octicon-star" :size="16"/> Your starred repos
            </RouterLink>
            <RouterLink to="/notifications/subscriptions" class="item">
              <SvgIcon name="octicon-bell" :size="16"/> Subscriptions
            </RouterLink>
            <RouterLink to="/user/settings" class="item" :class="{active: isPath('/user/settings')}">
              <SvgIcon name="octicon-tools" :size="16"/> Settings
            </RouterLink>
            <a class="item" href="https://docs.gitea.com" target="_blank" rel="noopener">
              <SvgIcon name="octicon-question" :size="16"/> Help
            </a>
            <template v-if="currentUser.is_admin">
              <div class="divider"/>
              <RouterLink to="/-/admin" class="item" :class="{active: isPath('/-/admin')}">
                <SvgIcon name="octicon-server" :size="16"/> Administration
              </RouterLink>
            </template>
            <div class="divider"/>
            <a class="item" href="#" @click.prevent="doSignOut">
              <SvgIcon name="octicon-sign-out" :size="16"/> Sign out
            </a>
          </div>
        </div>
      </template>
    </div>
  </nav>

  <!-- ── Page content ───────────────────────────────────────────────────── -->
  <div role="main" :class="pageClass ? `page-content ${pageClass}` : 'page-content'">
    <slot/>
  </div>

  <!-- ── Footer ─────────────────────────────────────────────────────────── -->
  <footer class="page-footer" role="group" aria-label="footer">
    <div class="left-links" role="contentinfo">
      <a target="_blank" href="https://about.gitea.com" rel="noopener">Powered by Gitea</a>
      <span>Version: {{ giteaVersion || '–' }}</span>
    </div>
    <div class="right-links" role="group">
      <a :href="`${assetUrlPrefix}/licenses.txt`">Licenses</a>
      <a :href="`${apiBase}/swagger`">API</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import {getCurrentUser, logout, type User} from '../api/index.ts';
import {assetUrlPrefix, apiBase, appSubUrl} from '../spaconfig.ts';
import {SvgIcon} from '../../svg.ts';

defineProps<{pageClass?: string}>();

const authLoading = ref(true);
const currentUser = ref<User | null>(null);
const giteaVersion = ref('');

const createMenuOpen = ref(false);
const userMenuOpen = ref(false);
const createDropdownEl = ref<HTMLElement | null>(null);
const userDropdownEl = ref<HTMLElement | null>(null);

const route = useRoute();

function isPath(prefix: string): boolean {
  return (route.path ?? '/').startsWith(prefix);
}

function toggleCreateMenu() {
  createMenuOpen.value = !createMenuOpen.value;
  if (createMenuOpen.value) userMenuOpen.value = false;
}

function toggleUserMenu() {
  userMenuOpen.value = !userMenuOpen.value;
  if (userMenuOpen.value) createMenuOpen.value = false;
}

function closeMenus() {
  createMenuOpen.value = false;
  userMenuOpen.value = false;
}

function onDocClick(e: MouseEvent) {
  const target = e.target as Node;
  if (createDropdownEl.value && !createDropdownEl.value.contains(target)) createMenuOpen.value = false;
  if (userDropdownEl.value && !userDropdownEl.value.contains(target)) userMenuOpen.value = false;
}

async function doSignOut() {
  closeMenus();
  logout();
  // Redirect to login
  window.location.hash = '';
  window.location.replace(`${window.location.pathname}?user/login`);
}

onMounted(async () => {
  try {
    currentUser.value = await getCurrentUser();
  } catch {
    // not signed in
  } finally {
    authLoading.value = false;
  }
  // fetch server version for footer
  try {
    const resp = await fetch(`${appSubUrl}/api/v1/version`);
    if (resp.ok) {
      const data = await resp.json();
      giteaVersion.value = data.version ?? '';
    }
  } catch {
    // non-critical
  }
  document.addEventListener('click', onDocClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocClick);
});
</script>
