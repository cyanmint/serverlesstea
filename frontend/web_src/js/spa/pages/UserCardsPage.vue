<!-- Translated from: templates/repo/user_cards.tmpl -->
<template>
  <AppLayout :page-class="'user-cards'" :title="title">
    <div class="ui container">
      <h2 v-if="title" class="ui dividing header">{{ title }}</h2>
      <ul class="list tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
        <li v-for="user in users" :key="user.id" class="item ui segment">
          <RouterLink :to="`/${user.login}`" class="tw-flex tw-items-center tw-gap-3">
            <img :src="user.avatar_url" width="48" height="48" class="ui circular image">
            <div>
              <h3 class="name">{{ user.full_name || user.login }}</h3>
              <div class="meta tw-text-text-light">
                <span v-if="user.website">{{ user.website }}</span>
                <span v-else-if="user.location">{{ user.location }}</span>
                <span v-else>Joined {{ formatDate(user.created) }}</span>
              </div>
            </div>
          </RouterLink>
        </li>
      </ul>
      <div v-if="!loading && !users.length" class="tw-text-center tw-py-8 tw-text-text-light">No users found</div>
      <BasePaginate :total="total" :page="page" :limit="limit" @page-change="changePage"/>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BasePaginate from '../components/BasePaginate.vue';
import {apiBase} from '../spaconfig.ts';

const route = useRoute();
const owner = route.params.owner as string;
const repoName = route.params.repo as string;
const cardType = route.params.type as string; // 'stargazers', 'watchers', 'followers', 'following'
const token = localStorage.getItem('gitea-spa-token') || '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const title = computed(() => {
  if (cardType === 'stargazers') return 'Stargazers';
  if (cardType === 'watchers') return 'Watchers';
  if (cardType === 'followers') return 'Followers';
  if (cardType === 'following') return 'Following';
  return 'Users';
});

const users = ref<any[]>([]);
const page = ref(1);
const limit = ref(30);
const total = ref(0);
const loading = ref(false);

function formatDate(d: string) { return d ? new Date(d).toLocaleDateString() : ''; }

async function loadUsers() {
  loading.value = true;
  try {
    let url = '';
    if (repoName) {
      url = `${apiBase}/repos/${owner}/${repoName}/${cardType}?page=${page.value}&limit=${limit.value}`;
    } else {
      url = `${apiBase}/users/${owner}/${cardType}?page=${page.value}&limit=${limit.value}`;
    }
    const resp = await fetch(url, {headers});
    if (resp.ok) {
      users.value = await resp.json();
      total.value = Number(resp.headers.get('x-total-count')) || users.value.length;
    }
  } catch { /* empty */ } finally { loading.value = false; }
}

function changePage(p: number) { page.value = p; loadUsers(); }

onMounted(() => loadUsers());
</script>
