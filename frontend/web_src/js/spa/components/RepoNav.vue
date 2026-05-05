<template>
  <div class="secondary-nav">
    <div class="ui container">
      <div class="repo-header flex-left-right">
        <div class="flex-text-block">
          <div class="flex-text-block tw-flex-wrap tw-text-18">
            <RouterLink class="muted tw-font-normal" :to="`/${owner}`">{{ owner }}</RouterLink>/<RouterLink class="muted" :to="`/${owner}/${repoName}`">{{ repoName }}</RouterLink>
          </div>
          <div class="flex-text-block tw-flex-wrap">
            <span v-if="repo?.archived" class="ui basic label not-mobile">Archived</span>
            <span v-if="repo?.private" class="ui basic label not-mobile">Private</span>
            <span v-if="repo?.fork" class="ui basic label not-mobile">Fork</span>
          </div>
        </div>
        <div class="flex-text-block tw-flex-wrap">
          <div v-if="currentUser" class="ui buttons">
            <button
              class="ui compact small basic button"
              :class="{loading: starLoading}"
              :disabled="starLoading"
              @click="emit('toggleStar')"
            >
              <SvgIcon name="octicon-star" :size="16"/>
              {{ starred ? 'Unstar' : 'Star' }}
            </button>
            <RouterLink :to="`/${owner}/${repoName}/stargazers`" class="ui compact small basic button">
              {{ repo?.stars_count ?? 0 }}
            </RouterLink>
          </div>
          <div v-else class="ui buttons">
            <RouterLink to="/user/login" class="ui compact small basic button" rel="nofollow">
              <SvgIcon name="octicon-star" :size="16"/> Star
            </RouterLink>
            <RouterLink :to="`/${owner}/${repoName}/stargazers`" class="ui compact small basic button">
              {{ repo?.stars_count ?? 0 }}
            </RouterLink>
          </div>
          <div class="ui buttons tw-ml-1">
            <RouterLink :to="`/${owner}/${repoName}`" class="ui compact small basic button">
              <SvgIcon name="octicon-repo-forked" :size="16"/> Fork
            </RouterLink>
            <RouterLink :to="`/${owner}/${repoName}/forks`" class="ui compact small basic button">
              {{ repo?.forks_count ?? 0 }}
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="repo?.fork && (repo as any).parent" class="secondary-info">
        Forked from <RouterLink :to="`/${(repo as any).parent.full_name}`">{{ (repo as any).parent.full_name }}</RouterLink>
      </div>
    </div>
    <div class="ui container">
      <overflow-menu class="ui secondary pointing menu">
        <div class="overflow-menu-items">
          <RouterLink :to="`/${owner}/${repoName}`" class="item" :class="{active: activeTab === 'code'}">
            <SvgIcon name="octicon-code" :size="16"/> Code
          </RouterLink>
          <RouterLink :to="`/${owner}/${repoName}/issues`" class="item" :class="{active: activeTab === 'issues'}">
            <SvgIcon name="octicon-issue-opened" :size="16"/> Issues
            <span v-if="repo?.open_issues_count" class="ui small label">{{ repo.open_issues_count }}</span>
          </RouterLink>
          <RouterLink :to="`/${owner}/${repoName}/pulls`" class="item" :class="{active: activeTab === 'pulls'}">
            <SvgIcon name="octicon-git-pull-request" :size="16"/> Pull Requests
          </RouterLink>
          <RouterLink :to="`/${owner}/${repoName}/releases`" class="item" :class="{active: activeTab === 'releases'}">
            <SvgIcon name="octicon-tag" :size="16"/> Releases
          </RouterLink>
          <RouterLink :to="`/${owner}/${repoName}/wiki`" class="item" :class="{active: activeTab === 'wiki'}">
            <SvgIcon name="octicon-book" :size="16"/> Wiki
          </RouterLink>
          <RouterLink :to="`/${owner}/${repoName}/activity`" class="item" :class="{active: activeTab === 'activity'}">
            <SvgIcon name="octicon-pulse" :size="16"/> Activity
          </RouterLink>
          <template v-if="currentUser && (currentUser.login === owner || currentUser.is_admin)">
            <span class="item-flex-space"/>
            <RouterLink :to="`/${owner}/${repoName}/settings`" class="item" :class="{active: activeTab === 'settings'}">
              <SvgIcon name="octicon-tools" :size="16"/> Settings
            </RouterLink>
          </template>
        </div>
      </overflow-menu>
    </div>
    <div class="ui tabs divider"/>
  </div>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router';
import {SvgIcon} from '../../svg.ts';
import type {Repository, User} from '../api/index.ts';

defineProps<{
  owner: string;
  repoName: string;
  activeTab: string;
  repo?: Repository | null;
  currentUser?: User | null;
  starred?: boolean;
  starLoading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggleStar'): void;
}>();
</script>
