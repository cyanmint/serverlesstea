<!-- Translates: base/paginate.tmpl -->
<template>
  <div v-if="totalPages > 1" class="center page buttons">
    <div class="ui borderless pagination menu">
      <!-- First page -->
      <a class="item navigation" :class="{disabled: currentPage <= 1}" @click.prevent="goTo(1)">
        <SvgIcon name="gitea-double-chevron-left" :size="16" class="tw-mr-1"/>
        <span class="navigation_label">First</span>
      </a>
      <!-- Previous page -->
      <a class="item navigation" :class="{disabled: currentPage <= 1}" @click.prevent="goTo(currentPage - 1)">
        <SvgIcon name="octicon-chevron-left" :size="16" class="tw-mr-1"/>
        <span class="navigation_label">Previous</span>
      </a>
      <!-- Page numbers -->
      <template v-for="page in pageNumbers" :key="page">
        <a v-if="page === -1" class="disabled item">...</a>
        <a v-else class="item" :class="{active: page === currentPage}" @click.prevent="goTo(page)">{{ page }}</a>
      </template>
      <!-- Next page -->
      <a class="item navigation" :class="{disabled: currentPage >= totalPages}" @click.prevent="goTo(currentPage + 1)">
        <span class="navigation_label">Next</span>
        <SvgIcon name="octicon-chevron-right" :size="16" class="tw-ml-1"/>
      </a>
      <!-- Last page -->
      <a class="item navigation" :class="{disabled: currentPage >= totalPages}" @click.prevent="goTo(totalPages)">
        <span class="navigation_label">Last</span>
        <SvgIcon name="gitea-double-chevron-right" :size="16" class="tw-ml-1"/>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {SvgIcon} from '../../svg.ts';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'change', page: number): void;
}>();

const pageNumbers = computed(() => {
  const pages: number[] = [];
  const total = props.totalPages;
  const current = props.currentPage;
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push(-1);
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push(-1);
    pages.push(total);
  }
  return pages;
});

function goTo(page: number) {
  if (page < 1 || page > props.totalPages || page === props.currentPage) return;
  emit('change', page);
}
</script>
