<!-- Translates: shared/repo/search.tmpl -->
<template>
  <div class="ui small secondary filter menu">
    <form class="ui form ignore-dirty tw-w-full flex-text-block tw-flex-wrap" @submit.prevent="$emit('search')">
      <div class="ui small fluid action input tw-flex-1">
        <input
          type="search"
          :value="keyword"
          @input="$emit('update:keyword', ($event.target as HTMLInputElement).value)"
          :placeholder="placeholder || 'Search repositories…'"
        >
        <button class="ui small icon button" type="submit">
          <SvgIcon name="octicon-search" :size="16"/>
        </button>
      </div>
      <!-- Sort dropdown -->
      <div class="item ui small dropdown" ref="sortDropdown" @click.stop="sortOpen = !sortOpen">
        <span>Sort</span>
        <SvgIcon name="octicon-triangle-down" :size="14" class="dropdown icon"/>
        <div class="menu" :class="{visible: sortOpen}" v-show="sortOpen">
          <label class="item" :class="{active: sort === 'newest'}" @click="setSort('newest')">Recently created</label>
          <label class="item" :class="{active: sort === 'oldest'}" @click="setSort('oldest')">Oldest</label>
          <label class="item" :class="{active: sort === 'alphabetically'}" @click="setSort('alphabetically')">A-Z</label>
          <label class="item" :class="{active: sort === 'reversealphabetically'}" @click="setSort('reversealphabetically')">Z-A</label>
          <label class="item" :class="{active: sort === 'recentupdate'}" @click="setSort('recentupdate')">Recently updated</label>
          <label class="item" :class="{active: sort === 'leastupdate'}" @click="setSort('leastupdate')">Least updated</label>
          <label class="item" :class="{active: sort === 'moststars'}" @click="setSort('moststars')">Most stars</label>
          <label class="item" :class="{active: sort === 'feweststars'}" @click="setSort('feweststars')">Fewest stars</label>
          <label class="item" :class="{active: sort === 'mostforks'}" @click="setSort('mostforks')">Most forks</label>
          <label class="item" :class="{active: sort === 'fewestforks'}" @click="setSort('fewestforks')">Fewest forks</label>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {SvgIcon} from '../../svg.ts';

defineProps<{
  keyword: string;
  sort: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:keyword', val: string): void;
  (e: 'update:sort', val: string): void;
  (e: 'search'): void;
}>();

const sortOpen = ref(false);

function setSort(val: string) {
  emit('update:sort', val);
  sortOpen.value = false;
  emit('search');
}
</script>
