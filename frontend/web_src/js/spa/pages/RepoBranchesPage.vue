<!-- Translated from: templates/repo/branch/list.tmpl -->
<template>
  <AppLayout :page-class="'repository branches'" :title="`Branches - ${owner}/${repoName}`">
    <RepoHeader :owner="owner" :repo-name="repoName"/>
    <div class="ui container">
      <BaseAlert :flash="flash"/>
      <h4 class="ui top attached header">Default Branch</h4>
      <div v-if="defaultBranch" class="ui attached segment">
        <div class="tw-flex tw-items-center tw-gap-2">
          <strong>{{ defaultBranch.name }}</strong>
          <span v-if="defaultBranch.protected" title="Protected">🛡️</span>
        </div>
      </div>

      <h4 class="ui top attached header tw-mt-4">
        Branches ({{ branches.length }})
      </h4>
      <div class="ui attached segment">
        <table class="ui very basic table">
          <tbody>
            <tr v-for="b in branches" :key="b.name">
              <td>
                <RouterLink :to="`/${owner}/${repoName}/src/branch/${b.name}`" class="tw-font-mono">{{ b.name }}</RouterLink>
                <span v-if="b.protected" class="tw-ml-1" title="Protected">🛡️</span>
              </td>
              <td class="tw-text-right tw-text-text-light">
                {{ formatDate(b.commit?.timestamp || b.commit?.committer?.date) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import RepoHeader from '../components/RepoHeader.vue';
import {apiBase} from '../spaconfig.ts';

const route = useRoute();
const owner = route.params.owner as string;
const repoName = route.params.repo as string;
const token = localStorage.getItem('gitea-spa-token') || '';
const headers: Record<string, string> = token ? {Authorization: `token ${token}`} : {};

const branches = ref<any[]>([]);
const defaultBranch = ref<any>(null);
const flash = ref<{error?: string}>({});

function formatDate(d: string) { return d ? new Date(d).toLocaleDateString() : ''; }

async function loadBranches() {
  try {
    const resp = await fetch(`${apiBase}/repos/${owner}/${repoName}/branches`, {headers});
    if (resp.ok) {
      const all = await resp.json();
      // Get repo to know default branch name
      const repoResp = await fetch(`${apiBase}/repos/${owner}/${repoName}`, {headers});
      let defName = 'main';
      if (repoResp.ok) {
        const repoData = await repoResp.json();
        defName = repoData.default_branch || 'main';
      }
      defaultBranch.value = all.find((b: any) => b.name === defName) || all[0];
      branches.value = all.filter((b: any) => b.name !== defName);
    }
  } catch { /* empty */ }
}

onMounted(() => loadBranches());
</script>
