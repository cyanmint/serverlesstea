<!-- Translated from: templates/explore/users.tmpl + explore/user_list.tmpl -->
<template>
  <AppLayout page-class="explore users" title="Explore Users">
    <div class="ui container">
      <ExploreNavbar active="users"/>
      <form class="ui form tw-mb-4" @submit.prevent="loadUsers">
        <div class="ui action input tw-w-full">
          <input v-model="keyword" type="text" placeholder="Search users…">
          <button class="ui primary button" type="submit">Search</button>
        </div>
      </form>
      <div class="flex-divided-list items-with-main">
        <div v-for="user in users" :key="user.id" class="item tw-flex tw-items-center tw-gap-4 tw-py-3">
          <img :src="user.avatar_url" width="48" height="48" class="ui circular image">
          <div class="item-main">
            <div class="item-title">
              <RouterLink :to="`/${user.login}`"><strong>{{ user.full_name || user.login }}</strong></RouterLink>
              <span v-if="user.login && user.full_name" class="tw-text-text-light tw-ml-1">{{ user.login }}</span>
            </div>
            <div class="item-body tw-text-text-light">
              <span v-if="user.location" class="tw-mr-3">📍 {{ user.location }}</span>
              <span v-if="user.email" class="tw-mr-3">✉️ {{ user.email }}</span>
              <span>📅 Joined {{ formatDate(user.created) }}</span>
            </div>
          </div>
        </div>
        <div v-if="!loading && !users.length" class="item tw-py-4 tw-text-center tw-text-text-light">No results</div>
      </div>
      <BasePaginate :total="total" :page="page" :limit="limit" @page-change="changePage"/>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import ExploreNavbar from '../components/ExploreNavbar.vue';
import BasePaginate from '../components/BasePaginate.vue';
import {apiBase} from '../spaconfig.ts';

const users = ref<any[]>([]);
const keyword = ref('');
const page = ref(1);
const limit = ref(20);
const total = ref(0);
const loading = ref(false);

function formatDate(d: string) { return d ? new Date(d).toLocaleDateString() : ''; }

async function loadUsers() {
  loading.value = true;
  try {
    const params = new URLSearchParams({page: String(page.value), limit: String(limit.value)});
    if (keyword.value) params.set('q', keyword.value);
    const resp = await fetch(`${apiBase}/users/search?${params}`);
    if (resp.ok) {
      const data = await resp.json();
      users.value = data.data || data;
      total.value = Number(resp.headers.get('x-total-count')) || users.value.length;
    }
  } catch { /* empty */ } finally { loading.value = false; }
}

function changePage(p: number) { page.value = p; loadUsers(); }

onMounted(() => loadUsers());
</script>
