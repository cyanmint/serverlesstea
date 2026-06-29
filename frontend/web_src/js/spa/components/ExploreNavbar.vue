<!-- Translates: explore/navbar.tmpl -->
<template>
  <overflow-menu class="ui secondary pointing tabular top attached borderless menu secondary-nav">
    <div class="overflow-menu-items tw-justify-center">
      <RouterLink class="item" :class="{active: tab === 'repos'}" to="/explore/repos">
        <SvgIcon name="octicon-repo" :size="16"/> Repositories
      </RouterLink>
      <RouterLink class="item" :class="{active: tab === 'users'}" to="/explore/users">
        <SvgIcon name="octicon-person" :size="16"/> Users
      </RouterLink>
      <RouterLink class="item" :class="{active: tab === 'orgs'}" to="/explore/organizations">
        <SvgIcon name="octicon-organization" :size="16"/> Organizations
      </RouterLink>
      <RouterLink class="item" :class="{active: tab === 'code'}" to="/explore/code">
        <SvgIcon name="octicon-code" :size="16"/> Code
      </RouterLink>
    </div>
  </overflow-menu>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router';
import {SvgIcon} from '../../svg.ts';

defineProps<{
  tab: string;
}>();
</script>
