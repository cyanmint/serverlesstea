<!-- Translated from: templates/repo/release/list.tmpl -->
<template>
  <AppLayout :page-class="'repository releases'" :title="`Releases - ${owner}/${repoName}`">
    <RepoHeader :owner="owner" :repo-name="repoName"/>
    <div class="ui container">
      <BaseAlert :flash="flash"/>
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <h3>Releases</h3>
        <div class="tw-flex tw-gap-2">
          <RouterLink :to="`/${owner}/${repoName}/releases`" class="ui small button active">Releases</RouterLink>
          <RouterLink :to="`/${owner}/${repoName}/tags`" class="ui small button">Tags</RouterLink>
        </div>
      </div>
      <ul id="release-list" class="tw-list-none tw-p-0">
        <li v-for="release in releases" :key="release.id" class="release-entry tw-border-b tw-pb-4 tw-mb-4">
          <div class="meta tw-text-text-light tw-mb-2">
            <RouterLink :to="`/${owner}/${repoName}/src/tag/${release.tag_name}`" class="muted">🏷️ {{ release.tag_name }}</RouterLink>
            <span v-if="release.target_commitish" class="tw-ml-2 tw-font-mono tw-text-sm">{{ release.target_commitish?.substring(0, 10) }}</span>
          </div>
          <div class="detail">
            <h4>
              <RouterLink :to="`/${owner}/${repoName}/releases/tag/${release.tag_name}`">{{ release.name || release.tag_name }}</RouterLink>
              <span v-if="release.draft" class="ui yellow label">Draft</span>
              <span v-if="release.prerelease" class="ui orange label">Pre-release</span>
            </h4>
            <p class="tw-text-text-light">
              {{ release.author?.login }} released this {{ formatDate(release.published_at || release.created_at) }}
            </p>
            <div v-if="release.body" class="render-content markup tw-mt-2" v-html="release.body_html || release.body"></div>
            <div v-if="release.assets?.length" class="tw-mt-2">
              <details>
                <summary>Assets ({{ release.assets.length }})</summary>
                <ul class="tw-mt-1">
                  <li v-for="asset in release.assets" :key="asset.id">
                    <a :href="asset.browser_download_url">{{ asset.name }}</a>
                    <span class="tw-text-text-light tw-ml-1">({{ formatSize(asset.size) }})</span>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="!loading && !releases.length" class="tw-text-center tw-py-8 tw-text-text-light">No releases</div>
      <BasePaginate :total="total" :page="page" :limit="limit" @page-change="changePage"/>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import RepoHeader from '../components/RepoHeader.vue';
import BasePaginate from '../components/BasePaginate.vue';
import {apiBase} from '../spaconfig.ts';

const route = useRoute();
const owner = route.params.owner as string;
const repoName = route.params.repo as string;
const token = localStorage.getItem('gitea-spa-token') || '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const releases = ref<any[]>([]);
const page = ref(1);
const limit = ref(10);
const total = ref(0);
const loading = ref(false);
const flash = ref<{error?: string}>({});

function formatDate(d: string) { return d ? new Date(d).toLocaleDateString() : ''; }
function formatSize(bytes: number) { return bytes > 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`; }

async function loadReleases() {
  loading.value = true;
  try {
    const params = new URLSearchParams({page: String(page.value), limit: String(limit.value)});
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/releases?${params}`, {headers});
    if (resp.ok) {
      releases.value = await resp.json();
      total.value = Number(resp.headers.get('x-total-count')) || releases.value.length;
    }
  } catch { /* empty */ } finally { loading.value = false; }
}

function changePage(p: number) { page.value = p; loadReleases(); }

onMounted(() => loadReleases());
</script>
