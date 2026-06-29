<!-- Translates: repo/header.tmpl + repo/navbar.tmpl -->
<template>
  <div class="secondary-nav">
    <div class="ui container">
      <!-- repo/header.tmpl: repo header line -->
      <div class="repo-header flex-left-right">
        <div class="flex-text-block">
          <SvgIcon v-if="repo.fork" name="octicon-repo-forked" :size="16"/>
          <SvgIcon v-else-if="repo.mirror" name="octicon-mirror" :size="16"/>
          <SvgIcon v-else-if="repo.private" name="octicon-lock" :size="16"/>
          <SvgIcon v-else name="octicon-repo" :size="16"/>
          <div class="flex-text-block tw-flex-wrap tw-text-18">
            <RouterLink class="muted tw-font-normal" :to="`/${repo.owner?.login}`">{{ repo.owner?.login }}</RouterLink>/<RouterLink class="muted" :to="`/${repo.full_name}`">{{ repo.name }}</RouterLink>
          </div>
          <div class="flex-text-block tw-flex-wrap">
            <span v-if="repo.archived" class="ui basic label not-mobile">Archived</span>
            <span v-if="repo.private" class="ui basic label not-mobile">Private</span>
            <span v-if="repo.template" class="ui basic label not-mobile">Template</span>
          </div>
        </div>
        <div class="flex-text-block tw-flex-wrap">
          <!-- star/watch/fork buttons -->
          <a class="ui compact small basic button" :href="`/?${repo.full_name}/stargazers`">
            <SvgIcon name="octicon-star" :size="16"/>
            <span class="tw-ml-1">{{ repo.stars_count ?? 0 }}</span>
          </a>
          <a class="ui compact small basic button" :href="`/?${repo.full_name}/watchers`">
            <SvgIcon name="octicon-eye" :size="16"/>
            <span class="tw-ml-1">{{ repo.watchers_count ?? 0 }}</span>
          </a>
          <a class="ui compact small basic button" :href="`/?${repo.full_name}/forks`">
            <SvgIcon name="octicon-repo-forked" :size="16"/>
            <span class="tw-ml-1">{{ repo.forks_count ?? 0 }}</span>
          </a>
        </div>
      </div>

      <!-- repo/navbar.tmpl: tab navigation -->
      <overflow-menu class="ui secondary pointing tabular menu">
        <div class="overflow-menu-items">
          <RouterLink class="item" :class="{active: activeTab === 'code'}" :to="`/${repo.full_name}`">
            <SvgIcon name="octicon-code" :size="16"/> Code
          </RouterLink>
          <RouterLink class="item" :class="{active: activeTab === 'issues'}" :to="`/${repo.full_name}/issues`">
            <SvgIcon name="octicon-issue-opened" :size="16"/> Issues
            <span v-if="repo.open_issues_count" class="ui small label">{{ repo.open_issues_count }}</span>
          </RouterLink>
          <RouterLink class="item" :class="{active: activeTab === 'pulls'}" :to="`/${repo.full_name}/pulls`">
            <SvgIcon name="octicon-git-pull-request" :size="16"/> Pull Requests
          </RouterLink>
          <RouterLink v-if="repo.has_actions" class="item" :class="{active: activeTab === 'actions'}" :to="`/${repo.full_name}/actions`">
            <SvgIcon name="octicon-play" :size="16"/> Actions
          </RouterLink>
          <RouterLink v-if="repo.has_projects" class="item" :class="{active: activeTab === 'projects'}" :to="`/${repo.full_name}/projects`">
            <SvgIcon name="octicon-project" :size="16"/> Projects
          </RouterLink>
          <RouterLink v-if="repo.has_releases" class="item" :class="{active: activeTab === 'releases'}" :to="`/${repo.full_name}/releases`">
            <SvgIcon name="octicon-tag" :size="16"/> Releases
          </RouterLink>
          <RouterLink v-if="repo.has_wiki" class="item" :class="{active: activeTab === 'wiki'}" :to="`/${repo.full_name}/wiki`">
            <SvgIcon name="octicon-book" :size="16"/> Wiki
          </RouterLink>
          <RouterLink class="item" :class="{active: activeTab === 'activity'}" :to="`/${repo.full_name}/activity`">
            <SvgIcon name="octicon-pulse" :size="16"/> Activity
          </RouterLink>
          <RouterLink v-if="hasSettingsAccess" class="item" :class="{active: activeTab === 'settings'}" :to="`/${repo.full_name}/settings`">
            <SvgIcon name="octicon-tools" :size="16"/> Settings
          </RouterLink>
        </div>
      </overflow-menu>
    </div>
  </div>

  <!-- repo description (from repo/home.tmpl) -->
  <div v-if="repo.description || repo.website" class="ui container tw-mt-2">
    <p v-if="repo.description" class="tw-break-anywhere">{{ repo.description }}</p>
    <p v-if="repo.website"><a :href="repo.website" target="_blank" rel="noopener nofollow">{{ repo.website }}</a></p>
  </div>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router';
import {SvgIcon} from '../../svg.ts';
import type {Repository} from '../api/index.ts';

defineProps<{
  repo: Repository;
  activeTab: string;
  hasSettingsAccess?: boolean;
}>();
</script>
