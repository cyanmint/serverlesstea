<!-- Translates: shared/repo/list.tmpl -->
<template>
  <div class="flex-divided-list items-with-main">
    <template v-if="repos.length">
      <div v-for="repo in repos" :key="repo.id" class="item">
        <div class="item-leading">
          <SvgIcon v-if="repo.fork" name="octicon-repo-forked" :size="16"/>
          <SvgIcon v-else-if="repo.mirror" name="octicon-mirror" :size="16"/>
          <SvgIcon v-else-if="repo.private" name="octicon-lock" :size="16"/>
          <SvgIcon v-else name="octicon-repo" :size="16"/>
        </div>
        <div class="item-main">
          <div class="item-header">
            <div class="item-title">
              <RouterLink v-if="showOwner" class="tw-text-primary name" :to="`/${repo.owner?.login}`">{{ repo.owner?.login }}</RouterLink><span v-if="showOwner">/</span>
              <RouterLink class="tw-text-primary name" :to="`/${repo.full_name}`">{{ repo.name }}</RouterLink>
              <span class="label-list">
                <span v-if="repo.archived" class="ui basic label">Archived</span>
                <span v-if="repo.private" class="ui basic label">Private</span>
                <span v-if="repo.template" class="ui basic label">Template</span>
              </span>
            </div>
            <div class="item-trailing muted-links">
              <span v-if="repo.language" class="flex-text-block">
                <i class="color-icon" :style="{backgroundColor: repo.language_color || '#ccc'}"></i>
                {{ repo.language }}
              </span>
              <a class="flex-text-inline" :href="`/?${repo.full_name}/stargazers`">
                <SvgIcon name="octicon-star" :size="16"/>
                <span>{{ formatCount(repo.stars_count) }}</span>
              </a>
              <a class="flex-text-inline" :href="`/?${repo.full_name}/forks`">
                <SvgIcon name="octicon-repo-forked" :size="16"/>
                <span>{{ formatCount(repo.forks_count) }}</span>
              </a>
            </div>
          </div>
          <div v-if="repo.description" class="item-body">{{ repo.description }}</div>
          <div v-if="repo.topics?.length" class="label-list">
            <RouterLink v-for="topic in repo.topics" :key="topic" class="ui label" :to="`/explore/repos?q=${topic}&topic=1`">{{ topic }}</RouterLink>
          </div>
          <div class="item-body">Updated {{ formatTimeAgo(repo.updated_at) }}</div>
        </div>
      </div>
    </template>
    <div v-else>
      No results found.
    </div>
  </div>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router';
import {SvgIcon} from '../../svg.ts';
import type {Repository} from '../api/index.ts';

defineProps<{
  repos: Repository[];
  showOwner?: boolean;
}>();

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n ?? 0);
}

function formatTimeAgo(dateStr: string): string {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months === 1 ? '' : 's'} ago`;
}
</script>
