<!-- Translated from: templates/repo/view.tmpl + repo/view_content.tmpl + repo/view_file_tree.tmpl -->
<template>
  <AppLayout :page-class="'repository file list'" :title="`${owner}/${repoName} - ${treePath || 'Source'}`">
    <RepoHeader :owner="owner" :repo-name="repoName"/>
    <div class="ui container fluid padded">
      <BaseAlert :flash="flash"/>
      <div class="repo-view-container">
        <!-- File tree / content -->
        <div class="repo-view-content">
          <!-- Breadcrumb -->
          <div class="tw-mb-4 tw-flex tw-items-center tw-gap-2">
            <RouterLink :to="`/${owner}/${repoName}/src/branch/${branch}`">{{ repoName }}</RouterLink>
            <template v-for="(part, i) in pathParts" :key="i">
              <span>/</span>
              <RouterLink :to="`/${owner}/${repoName}/src/branch/${branch}/${pathParts.slice(0, i+1).join('/')}`">{{ part }}</RouterLink>
            </template>
          </div>
          <!-- Directory listing -->
          <template v-if="isDir">
            <table class="ui very basic table">
              <tbody>
                <tr v-for="entry in entries" :key="entry.path">
                  <td class="tw-w-8">
                    <span v-if="entry.type === 'dir'">📁</span>
                    <span v-else>📄</span>
                  </td>
                  <td>
                    <RouterLink :to="`/${owner}/${repoName}/src/branch/${branch}/${entry.path}`">{{ entry.name }}</RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
          <!-- File content -->
          <template v-else>
            <div class="file-header tw-flex tw-items-center tw-justify-between tw-py-2">
              <span>{{ fileName }}</span>
              <span class="tw-text-text-light">{{ fileSize }}</span>
            </div>
            <div class="file-view">
              <pre v-if="fileContent" class="code-view"><code>{{ fileContent }}</code></pre>
              <div v-else-if="loading" class="tw-text-center tw-py-8">Loading…</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import RepoHeader from '../components/RepoHeader.vue';
import {apiBase} from '../spaconfig.ts';

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);
const branch = computed(() => (route.params.branch as string) || 'main');
const treePath = computed(() => {
  const p = route.params.path;
  return Array.isArray(p) ? p.join('/') : (p || '');
});
const pathParts = computed(() => treePath.value ? treePath.value.split('/') : []);
const fileName = computed(() => pathParts.value[pathParts.value.length - 1] || '');

const token = localStorage.getItem('gitea-spa-token') || '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const entries = ref<any[]>([]);
const fileContent = ref('');
const fileSize = ref('');
const isDir = ref(true);
const loading = ref(false);
const flash = ref<{error?: string}>({});

async function loadContent() {
  loading.value = true;
  fileContent.value = '';
  entries.value = [];
  try {
    const path = treePath.value || '';
    const resp = await fetch(`${apiBase}/repos/${owner.value}/${repoName.value}/contents/${path}?ref=${branch.value}`, {headers});
    if (resp.ok) {
      const data = await resp.json();
      if (Array.isArray(data)) {
        isDir.value = true;
        entries.value = data.sort((a: any, b: any) => {
          if (a.type === b.type) return a.name.localeCompare(b.name);
          return a.type === 'dir' ? -1 : 1;
        });
      } else {
        isDir.value = false;
        fileSize.value = `${(data.size / 1024).toFixed(1)} KB`;
        if (data.content) {
          fileContent.value = atob(data.content);
        } else if (data.download_url) {
          const rawResp = await fetch(data.download_url);
          if (rawResp.ok) fileContent.value = await rawResp.text();
        }
      }
    } else {
      flash.value.error = 'File not found.';
    }
  } catch {
    flash.value.error = 'Failed to load content.';
  } finally {
    loading.value = false;
  }
}

watch([owner, repoName, branch, treePath], () => loadContent());
onMounted(() => loadContent());
</script>
