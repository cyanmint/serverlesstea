<!-- Translates: base/head.tmpl + base/head_navbar.tmpl + base/footer_content.tmpl -->
<template>
  <!-- base/head.tmpl: full height wrapper -->
  <div class="full height">
    <noscript>This site requires JavaScript to function. Please enable JavaScript in your browser.</noscript>

    <!-- base/head_navbar.tmpl: navigation bar -->
    <nav v-if="!pageIsInstall" id="navbar" aria-label="Navigation">
      <div class="navbar-left">
        <!-- logo -->
        <RouterLink class="item" id="navbar-logo" to="/" :aria-label="currentUser ? 'Dashboard' : 'Home'">
          <img width="30" height="30" :src="`${assetUrlPrefix}/img/logo.svg`" alt="Logo" aria-hidden="true">
        </RouterLink>

        <!-- mobile right menu -->
        <div class="ui secondary menu navbar-mobile-right only-mobile">
          <button class="item ui icon mini button tw-m-0" id="navbar-expand-toggle" aria-label="Navigation Menu" @click="mobileMenuOpen = !mobileMenuOpen">
            <SvgIcon name="octicon-three-bars" :size="16"/>
          </button>
        </div>

        <!-- navbar links (signed-in) -->
        <template v-if="currentUser">
          <RouterLink class="item" :class="{active: isActive('/issues')}" to="/issues">Issues</RouterLink>
          <RouterLink class="item" :class="{active: isActive('/pulls')}" to="/pulls">Pull Requests</RouterLink>
          <RouterLink class="item" :class="{active: isActive('/milestones')}" to="/milestones">Milestones</RouterLink>
          <RouterLink class="item" :class="{active: isActive('/explore')}" to="/explore/repos">Explore</RouterLink>
        </template>
        <template v-else>
          <RouterLink class="item" :class="{active: isActive('/explore')}" to="/explore/repos">Explore</RouterLink>
        </template>
      </div>

      <!-- right side -->
      <div class="navbar-right">
        <!-- guest links -->
        <template v-if="!authLoading && !currentUser">
          <RouterLink class="item" to="/user/sign_up">
            <SvgIcon name="octicon-person" :size="16"/>
            <span class="tw-ml-1">Register</span>
          </RouterLink>
          <RouterLink class="item" to="/user/login" rel="nofollow">
            <SvgIcon name="octicon-sign-in" :size="16"/>
            <span class="tw-ml-1">Sign In</span>
          </RouterLink>
        </template>

        <!-- signed-in: notifications + create menu + user menu -->
        <template v-if="currentUser">
          <!-- notifications -->
          <RouterLink class="item" to="/notifications" aria-label="Notifications">
            <SvgIcon name="octicon-bell" :size="16"/>
            <span v-if="notificationCount > 0" class="notification-count ui mini label">{{ notificationCount }}</span>
          </RouterLink>

          <!-- Create new dropdown -->
          <div class="ui dropdown jump item" :class="{active: createMenuOpen}" ref="createDropdownEl" @click.stop="toggleCreateMenu">
            <span class="flex-text-block">
              <SvgIcon name="octicon-plus" :size="16"/>
              <span class="not-mobile flex-text-block"><SvgIcon name="octicon-triangle-down" :size="14"/></span>
            </span>
            <div class="menu" :class="{visible: createMenuOpen}" v-show="createMenuOpen">
              <RouterLink to="/repo/create" class="item" @click="closeMenus">
                <SvgIcon name="octicon-plus" :size="16"/> New Repository
              </RouterLink>
              <RouterLink to="/repo/migrate" class="item" @click="closeMenus">
                <SvgIcon name="octicon-repo-push" :size="16"/> New Migration
              </RouterLink>
              <RouterLink v-if="currentUser.can_create_organization !== false" to="/org/create" class="item" @click="closeMenus">
                <SvgIcon name="octicon-organization" :size="16"/> New Organization
              </RouterLink>
            </div>
          </div>

          <!-- User avatar dropdown -->
          <div class="ui dropdown jump item" :class="{active: userMenuOpen}" ref="userDropdownEl" @click.stop="toggleUserMenu">
            <span class="text tw-flex tw-items-center" :data-tooltip-content="`Signed in as ${currentUser.login}`">
              <span class="navbar-avatar">
                <img :src="currentUser.avatar_url" :alt="currentUser.login" width="24" height="24" class="ui avatar image tw-mr-1">
              </span>
              <span class="only-mobile">{{ currentUser.login }}</span>
              <span class="not-mobile flex-text-block"><SvgIcon name="octicon-triangle-down" :size="14"/></span>
            </span>
            <div class="menu user-menu" :class="{visible: userMenuOpen}" v-show="userMenuOpen">
              <div class="header">Signed in as <strong>{{ currentUser.login }}</strong></div>
              <div class="divider"/>
              <RouterLink :to="`/${currentUser.login}`" class="item" @click="closeMenus">
                <SvgIcon name="octicon-person" :size="16"/> Your profile
              </RouterLink>
              <RouterLink :to="`/${currentUser.login}?tab=stars`" class="item" @click="closeMenus">
                <SvgIcon name="octicon-star" :size="16"/> Your starred
              </RouterLink>
              <RouterLink to="/user/settings" class="item" @click="closeMenus">
                <SvgIcon name="octicon-tools" :size="16"/> Settings
              </RouterLink>
              <a class="item" href="https://docs.gitea.com" target="_blank" rel="noopener">
                <SvgIcon name="octicon-question" :size="16"/> Help
              </a>
              <template v-if="currentUser.is_admin">
                <div class="divider"/>
                <RouterLink to="/-/admin" class="item" @click="closeMenus">
                  <SvgIcon name="octicon-server" :size="16"/> Site Administration
                </RouterLink>
              </template>
              <div class="divider"/>
              <a class="item" href="#" @click.prevent="doSignOut">
                <SvgIcon name="octicon-sign-out" :size="16"/> Sign Out
              </a>
            </div>
          </div>
        </template>
      </div>
    </nav>

    <!-- page-content slot -->
    <div role="main" :aria-label="title" :class="'page-content ' + (pageClass || '')">
      <slot/>
    </div>

    <!-- base/footer_content.tmpl -->
    <footer class="page-footer" role="group" aria-label="Footer">
      <div class="left-links" role="contentinfo" aria-label="About Software">
        <a target="_blank" href="https://about.gitea.com" rel="noopener">Powered by Gitea</a>
        <span v-if="giteaVersion">Version: {{ giteaVersion }}</span>
      </div>
      <div class="right-links" role="group" aria-label="Links">
        <a :href="`${assetUrlPrefix}/licenses.txt`">Licenses</a>
        <a :href="`${appSubUrl}/api/swagger`">API</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import {getStoredToken, logout} from '../api/index.ts';
import {assetUrlPrefix, apiBase, appSubUrl} from '../spaconfig.ts';
import {SvgIcon} from '../../svg.ts';
import {currentUser, authLoading, initAuth} from '../stores/auth.ts';

const props = defineProps<{
  pageClass?: string;
  title?: string;
  pageIsInstall?: boolean;
}>();

const giteaVersion = ref('');
const notificationCount = ref(0);

const createMenuOpen = ref(false);
const userMenuOpen = ref(false);
const mobileMenuOpen = ref(false);
const createDropdownEl = ref<HTMLElement | null>(null);
const userDropdownEl = ref<HTMLElement | null>(null);

const route = useRoute();

function isActive(prefix: string): boolean {
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
  window.location.replace(`${window.location.pathname}?user/login`);
}

onMounted(async () => {
  await initAuth();
  // fetch server version
  try {
    const resp = await fetch(`${apiBase}/version`);
    if (resp.ok) {
      const data = await resp.json();
      giteaVersion.value = data.version ?? '';
    }
  } catch { /* non-critical */ }
  // fetch notification count
  if (currentUser.value) {
    try {
      const resp = await fetch(`${apiBase}/notifications/new`, {
        headers: {'Authorization': `token ${getStoredToken()}`},
      });
      if (resp.ok) {
        const data = await resp.json();
        notificationCount.value = data.new ?? 0;
      }
    } catch { /* non-critical */ }
  }
  document.addEventListener('click', onDocClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocClick);
});

// Expose currentUser for child components
defineExpose({currentUser, authLoading});
</script>
