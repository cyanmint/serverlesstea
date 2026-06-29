<!-- Translates: repo/header.tmpl + repo/navbar.tmpl -->
<template>
  <div class="secondary-nav">
    <div class="ui container">
      <!-- repo/header.tmpl: repo header line -->
      <div v-if="repoData" class="repo-header flex-left-right">
        <div class="flex-text-block">
          <SvgIcon v-if="repoData.fork" name="octicon-repo-forked" :size="16"/>
          <SvgIcon v-else-if="repoData.mirror" name="octicon-mirror" :size="16"/>
          <SvgIcon v-else-if="repoData.private" name="octicon-lock" :size="16"/>
          <SvgIcon v-else name="octicon-repo" :size="16"/>
          <div class="flex-text-block tw-flex-wrap tw-text-18">
            <RouterLink class="muted tw-font-normal" :to="`/${repoData.owner?.login}`">{{ repoData.owner?.login }}</RouterLink>/<RouterLink class="muted" :to="`/${repoData.full_name}`">{{ repoData.name }}</RouterLink>
          </div>
          <div class="flex-text-block tw-flex-wrap">
            <span v-if="repoData.archived" class="ui basic label not-mobile">Archived</span>
            <span v-if="repoData.private" class="ui basic label not-mobile">Private</span>
            <span v-if="repoData.template" class="ui basic label not-mobile">Template</span>
          </div>
        </div>
        <div class="flex-text-block tw-flex-wrap">
          <!-- star/watch/fork buttons -->
          <RouterLink class="ui compact small basic button" :to="`/${repoData.full_name}/stargazers`">
            <SvgIcon name="octicon-star" :size="16"/>
            <span class="tw-ml-1">{{ repoData.stars_count ?? 0 }}</span>
          </RouterLink>
          <RouterLink class="ui compact small basic button" :to="`/${repoData.full_name}/watchers`">
            <SvgIcon name="octicon-eye" :size="16"/>
            <span class="tw-ml-1">{{ repoData.watchers_count ?? 0 }}</span>
          </RouterLink>
          <RouterLink class="ui compact small basic button" :to="`/${repoData.full_name}/forks`">
            <SvgIcon name="octicon-repo-forked" :size="16"/>
            <span class="tw-ml-1">{{ repoData.forks_count ?? 0 }}</span>
          </RouterLink>
        </div>
      </div>
      <div v-else class="repo-header flex-left-right tw-py-2">
        <!-- skeleton while loading -->
        <div class="flex-text-block">
          <SvgIcon name="octicon-repo" :size="16"/>
          <div class="flex-text-block tw-flex-wrap tw-text-18">
            <RouterLink class="muted tw-font-normal" :to="`/${resolvedOwner}`">{{ resolvedOwner }}</RouterLink>/<RouterLink class="muted" :to="`/${resolvedOwner}/${resolvedRepoName}`">{{ resolvedRepoName }}</RouterLink>
          </div>
        </div>
      </div>

      <!-- repo/navbar.tmpl: tab navigation -->
      <div class="ui secondary pointing tabular menu tw-flex-wrap">
        <RouterLink class="item" :class="{active: currentTab === 'code'}" :to="`/${resolvedOwner}/${resolvedRepoName}`">
          <SvgIcon name="octicon-code" :size="16"/> Code
        </RouterLink>
        <RouterLink class="item" :class="{active: currentTab === 'issues'}" :to="`/${resolvedOwner}/${resolvedRepoName}/issues`">
          <SvgIcon name="octicon-issue-opened" :size="16"/> Issues
          <span v-if="repoData?.open_issues_count" class="ui small label">{{ repoData.open_issues_count }}</span>
        </RouterLink>
        <RouterLink class="item" :class="{active: currentTab === 'pulls'}" :to="`/${resolvedOwner}/${resolvedRepoName}/pulls`">
          <SvgIcon name="octicon-git-pull-request" :size="16"/> Pull Requests
        </RouterLink>
        <RouterLink class="item" :class="{active: currentTab === 'actions'}" :to="`/${resolvedOwner}/${resolvedRepoName}/actions`">
          <SvgIcon name="octicon-play" :size="16"/> Actions
        </RouterLink>
        <RouterLink class="item" :class="{active: currentTab === 'projects'}" :to="`/${resolvedOwner}/${resolvedRepoName}/projects`">
          <SvgIcon name="octicon-project" :size="16"/> Projects
        </RouterLink>
        <RouterLink class="item" :class="{active: currentTab === 'releases'}" :to="`/${resolvedOwner}/${resolvedRepoName}/releases`">
          <SvgIcon name="octicon-tag" :size="16"/> Releases
        </RouterLink>
        <RouterLink v-if="repoData?.has_wiki !== false" class="item" :class="{active: currentTab === 'wiki'}" :to="`/${resolvedOwner}/${resolvedRepoName}/wiki`">
          <SvgIcon name="octicon-book" :size="16"/> Wiki
        </RouterLink>
        <RouterLink class="item" :class="{active: currentTab === 'activity'}" :to="`/${resolvedOwner}/${resolvedRepoName}/activity`">
          <SvgIcon name="octicon-pulse" :size="16"/> Activity
        </RouterLink>
        <RouterLink v-if="resolvedHasSettingsAccess" class="item" :class="{active: currentTab === 'settings'}" :to="`/${resolvedOwner}/${resolvedRepoName}/settings`">
          <SvgIcon name="octicon-tools" :size="16"/> Settings
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import {SvgIcon} from '../../svg.ts';
import {getRepo, getStoredToken, type Repository} from '../api/index.ts';
import {currentUser, initAuth} from '../stores/auth.ts';

const props = defineProps<{
  // Pass pre-fetched repo object (preferred when parent already loaded it)
  repo?: Repository | null;
  // OR pass owner + repoName strings (component fetches internally)
  owner?: string;
  repoName?: string;
  // Which tab is active – auto-detected from route when not provided
  activeTab?: string;
  hasSettingsAccess?: boolean;
}>();

const route = useRoute();

/** The repo owner resolved from props or route params */
const resolvedOwner = computed<string>(() =>
  props.owner ?? (props.repo?.owner?.login) ?? (route.params.owner as string) ?? '');

/** The repo name resolved from props or route params */
const resolvedRepoName = computed<string>(() =>
  props.repoName ?? props.repo?.name ?? (route.params.repo as string) ?? '');

/** Internally fetched repo (used when only owner/repoName strings are provided) */
const fetchedRepo = ref<Repository | null>(null);

/** The repo data to render – prefer the prop, fall back to internally fetched */
const repoData = computed<Repository | null>(() => props.repo ?? fetchedRepo.value);

/** Detect the active tab from the current route when not explicitly provided */
const currentTab = computed<string>(() => {
  if (props.activeTab) return props.activeTab;
  const path = route.path;
  const base = `/${resolvedOwner.value}/${resolvedRepoName.value}`;
  if (path === base || path.startsWith(`${base}/src`) || path.startsWith(`${base}/commit`)) return 'code';
  if (path.startsWith(`${base}/issues`)) return 'issues';
  if (path.startsWith(`${base}/pulls`) || path.startsWith(`${base}/compare`)) return 'pulls';
  if (path.startsWith(`${base}/actions`)) return 'actions';
  if (path.startsWith(`${base}/projects`)) return 'projects';
  if (path.startsWith(`${base}/releases`) || path.startsWith(`${base}/tags`)) return 'releases';
  if (path.startsWith(`${base}/wiki`)) return 'wiki';
  if (path.startsWith(`${base}/activity`) || path.startsWith(`${base}/pulse`) || path.startsWith(`${base}/graphs`)) return 'activity';
  if (path.startsWith(`${base}/settings`)) return 'settings';
  return 'code';
});

/** Settings access: use the prop if provided, otherwise determine from repo permissions */
const resolvedHasSettingsAccess = computed<boolean>(() => {
  if (props.hasSettingsAccess !== undefined) return props.hasSettingsAccess;
  const r = repoData.value as any;
  // Check API-reported permissions
  if (r?.permissions?.admin || r?.permissions?.push) return true;
  // Fallback: current user is the repo owner
  return !!(currentUser.value && r?.owner?.login &&
    currentUser.value.login === r.owner.login);
});

async function fetchRepo() {
  if (props.repo) return; // already provided
  const o = resolvedOwner.value;
  const n = resolvedRepoName.value;
  if (!o || !n) return;
  try {
    fetchedRepo.value = await getRepo(o, n);
    // Check if current user has settings access via permissions field
  } catch { /* non-critical; render without full repo data */ }
}

onMounted(() => {
  initAuth();
  fetchRepo();
});

// Re-fetch when owner/repoName change (route navigation)
watch([resolvedOwner, resolvedRepoName], fetchRepo);
</script>
