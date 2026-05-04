<template>
  <AppLayout>
    <div class="ui container tw-py-4">
      <div class="tw-flex tw-items-center tw-justify-between tw-mb-4">
        <h1 class="tw-text-2xl tw-font-bold">
          {{ mode === 'pulls' ? 'Pull Requests' : 'Issues' }}
        </h1>
      </div>

      <!-- Mode tabs -->
      <div class="ui secondary pointing menu tw-mb-4">
        <RouterLink class="item" :class="{active: mode === 'issues'}" to="/issues">
          Issues
        </RouterLink>
        <RouterLink class="item" :class="{active: mode === 'pulls'}" to="/pulls">
          Pull Requests
        </RouterLink>
      </div>

      <!-- State filter -->
      <div class="ui secondary menu tw-mb-4">
        <a class="item" :class="{active: state === 'open'}" @click="setFilter('open')">
          🟢 Open
        </a>
        <a class="item" :class="{active: state === 'closed'}" @click="setFilter('closed')">
          ✅ Closed
        </a>
      </div>

      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error" class="ui negative message">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="items.length === 0" class="ui placeholder segment">
        <div class="tw-text-center tw-py-8 tw-text-gray-500">
          No {{ mode === 'pulls' ? 'pull requests' : 'issues' }} found.
        </div>
      </div>
      <div v-else class="tw-border tw-rounded">
        <div
          v-for="item in items"
          :key="item.id"
          class="tw-flex tw-items-start tw-gap-3 tw-px-4 tw-py-3 tw-border-b last:tw-border-b-0 hover:tw-bg-gray-50"
        >
          <span class="tw-mt-0.5 tw-text-sm">{{ item.state === 'open' ? '🟢' : '✅' }}</span>
          <div class="tw-flex-1 tw-min-w-0">
            <RouterLink :to="issueToPath(item)" class="tw-font-medium hover:tw-text-blue-600 hover:tw-underline tw-text-gray-900">
              {{ item.title }}
            </RouterLink>
            <div class="tw-text-xs tw-text-gray-500 tw-mt-0.5">
              {{ item.html_url.replace(/\/issues\/\d+$/, '').replace(/^.*\//, '').replace(/.*github\.com\//, '') }}
              #{{ item.number }} opened {{ formatDate(item.created_at) }} by {{ item.user.login }}
            </div>
          </div>
          <span v-if="item.comments > 0" class="tw-text-xs tw-text-gray-500 tw-whitespace-nowrap">
            💬 {{ item.comments }}
          </span>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="items.length > 0" class="tw-flex tw-justify-center tw-mt-4 tw-gap-2">
        <button
          class="ui button"
          :disabled="page <= 1"
          @click="page--"
        >
          Previous
        </button>
        <span class="ui label tw-self-center">Page {{ page }}</span>
        <button
          class="ui button"
          :disabled="items.length < pageSize"
          @click="page++"
        >
          Next
        </button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getUserIssues, type Issue} from '../api/index.ts';

const route = useRoute();
const mode = computed(() => route.path === '/pulls' ? 'pulls' : 'issues');
const state = ref<'open' | 'closed'>('open');
const page = ref(1);
const pageSize = 20;
const items = ref<Issue[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

function issueToPath(item: Issue): string {
  try {
    const u = new URL(item.html_url);
    return u.pathname;
  } catch {
    return item.html_url;
  }
}

function setFilter(s: 'open' | 'closed') {
  state.value = s;
  page.value = 1;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
}

async function load() {
  loading.value = true;
  error.value = null;
  try {
    items.value = await getUserIssues({
      state: state.value,
      page: page.value,
      limit: pageSize,
      assigned: true,
    });
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

watch([mode, state, page], load);
onMounted(load);
</script>
