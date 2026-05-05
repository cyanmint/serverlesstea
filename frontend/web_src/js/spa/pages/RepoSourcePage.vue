<template>
  <AppLayout page-class="repository">
    <!-- Secondary nav — matches templates/repo/header.tmpl -->
    <RepoNav
      :owner="owner"
      :repo-name="repoName"
      active-tab="code"
      :repo="repo"
      :current-user="currentUser"
      :starred="starred"
      :star-loading="starLoading"
      @toggle-star="toggleStar"
    />

    <div v-if="loading" class="ui container tw-py-8">
      <div class="ui active centered inline loader"/>
    </div>
    <div v-else-if="error" class="ui container tw-py-6">
      <div class="ui negative message"><p>{{ error }}</p></div>
    </div>

    <!-- Directory listing — matches templates/repo/view_list.tmpl -->
    <div v-else-if="Array.isArray(contents)" class="ui container">
      <div id="repo-files-table" class="ui segment">
        <div class="ui attached table segment">
          <table class="ui very basic fixed table single line">
            <tbody>
              <tr
                v-for="entry in sortedContents"
                :key="entry.name"
                class="repo-file-item"
              >
                <td class="repo-file-cell name">
                  <div class="flex-text-block">
                    <SvgIcon
                      :name="entry.type === 'dir' ? 'octicon-file-directory-fill' : 'octicon-file'"
                      :size="16"
                      class="tw-mr-2"
                    />
                    <RouterLink :to="buildEntryPath(entry)" class="muted">{{ entry.name }}</RouterLink>
                  </div>
                </td>
                <td class="repo-file-cell message"/>
                <td class="repo-file-cell age"/>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- File view — matches templates/repo/view_file.tmpl -->
    <div v-else-if="contents" class="ui container">
      <div class="non-diff-file-content">
        <div class="file-header">
          <div class="file-info">
            <div class="file-info-entry">{{ contents.name }}</div>
          </div>
          <div class="file-actions">
            <a
              v-if="contents.download_url"
              :href="contents.download_url"
              class="ui tiny basic button"
              rel="nofollow"
            >Raw</a>
          </div>
        </div>
        <div class="file-view code-view">
          <table>
            <tbody>
              <tr
                v-for="(line, idx) in fileLines"
                :key="idx"
              >
                <td class="lines-num" :id="`L${idx + 1}`">
                  <span>{{ idx + 1 }}</span>
                </td>
                <td class="lines-code">
                  <code>{{ line }}</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted} from 'vue';
import {useRoute, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoNav from '../components/RepoNav.vue';
import {SvgIcon} from '../../svg.ts';
import {getRepo, getRepoContents, getCurrentUser, isRepoStarred, starRepo, unstarRepo, type ContentsResponse, type Repository, type User} from '../api/index.ts';

const route = useRoute();

const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);
const refType = computed(() => route.params.refType as string);
const branchRef = computed(() => route.params.ref as string);
const filePath = computed(() => {
  const pm = route.params.pathMatch;
  return Array.isArray(pm) ? pm.join('/') : (pm ?? '');
});

const contents = ref<ContentsResponse | ContentsResponse[] | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const repo = ref<Repository | null>(null);
const currentUser = ref<User | null>(null);
const starred = ref(false);
const starLoading = ref(false);

const sortedContents = computed(() => {
  if (!Array.isArray(contents.value)) return [];
  return [...contents.value].sort((a, b) => {
    if (a.type === 'dir' && b.type !== 'dir') return -1;
    if (a.type !== 'dir' && b.type === 'dir') return 1;
    return a.name.localeCompare(b.name);
  });
});

const fileContent = computed(() => {
  if (Array.isArray(contents.value) || !contents.value) return '';
  try {
    return atob(contents.value.content.replace(/\s/g, ''));
  } catch {
    return contents.value.content;
  }
});

const fileLines = computed(() => fileContent.value.split('\n'));

function buildEntryPath(entry: ContentsResponse): string {
  const base = `/${owner.value}/${repoName.value}/src/${refType.value}/${branchRef.value}`;
  return entry.path ? `${base}/${entry.path}` : base;
}

async function toggleStar() {
  if (!currentUser.value) return;
  starLoading.value = true;
  try {
    if (starred.value) {
      await unstarRepo(owner.value, repoName.value);
    } else {
      await starRepo(owner.value, repoName.value);
    }
    starred.value = !starred.value;
    if (repo.value) {
      repo.value = {...repo.value, stars_count: repo.value.stars_count + (starred.value ? 1 : -1)};
    }
  } catch {
    // ignore
  } finally {
    starLoading.value = false;
  }
}

async function load() {
  if (!owner.value || !repoName.value || !branchRef.value) return;
  loading.value = true;
  error.value = null;
  contents.value = null;
  try {
    contents.value = await getRepoContents(owner.value, repoName.value, filePath.value, branchRef.value);
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

watch([owner, repoName, branchRef, filePath], load);
onMounted(async () => {
  [repo.value, currentUser.value] = await Promise.all([
    getRepo(owner.value, repoName.value).catch(() => null),
    getCurrentUser(),
  ]);
  if (currentUser.value) {
    starred.value = await isRepoStarred(owner.value, repoName.value).catch(() => false);
  }
  await load();
});
</script>
