<template>
  <AppLayout>
    <div v-if="loading" class="ui container tw-py-8">
      <div class="ui active centered inline loader"/>
    </div>

    <div v-else-if="error" class="ui container tw-py-6">
      <div class="ui negative message">
        <h3>Repository not found</h3>
        <p>{{ error }}</p>
      </div>
    </div>

    <template v-else-if="repo">
      <!-- ── Secondary nav ──────────────────────────────────────────────── -->
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

      <!-- ── Main content ─────────────────────────────────────────────── -->
      <div class="ui container">
        <div class="repo-grid-filelist-sidebar">
          <!-- file list + README area -->
          <div class="repo-home-filelist">
            <!-- empty repo notice -->
            <div v-if="repo.empty" class="ui segment">
              <h3 class="tw-font-semibold tw-text-base tw-mb-3">This repository is empty.</h3>

              <div class="tw-mb-4">
                <p class="tw-text-sm tw-text-gray-600 tw-mb-1">Quick setup — clone URL</p>
                <div class="ui small action input tw-flex tw-w-full">
                  <input
                    type="text"
                    :value="httpCloneUrl"
                    readonly
                    class="tw-font-mono"
                    @focus="($event.target as HTMLInputElement).select()"
                  >
                  <button class="ui button" @click="copyUrl(httpCloneUrl)">Copy</button>
                </div>
              </div>

              <div class="tw-mb-4">
                <p class="tw-text-sm tw-font-medium tw-mb-1">…or push an existing repository from the command line</p>
                <pre class="tw-bg-gray-100 tw-rounded tw-p-3 tw-text-sm tw-font-mono tw-whitespace-pre-wrap">git remote add origin {{ httpCloneUrl }}
git branch -M {{ repo.default_branch || 'main' }}
git push -u origin {{ repo.default_branch || 'main' }}</pre>
              </div>

              <div class="tw-mb-4">
                <p class="tw-text-sm tw-font-medium tw-mb-1">…or create a new repository on the command line</p>
                <pre class="tw-bg-gray-100 tw-rounded tw-p-3 tw-text-sm tw-font-mono tw-whitespace-pre-wrap">echo "# {{ repoName }}" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M {{ repo.default_branch || 'main' }}
git remote add origin {{ httpCloneUrl }}
git push -u origin {{ repo.default_branch || 'main' }}</pre>
              </div>
            </div>

            <template v-else>
              <!-- latest commit bar -->
              <div id="repo-files-table">
                <div v-if="contentsLoading" class="repo-file-line tw-py-2">
                  <div class="ui active inline loader"/>
                </div>
                <div v-else-if="contentsError" class="repo-file-line tw-text-red-600 tw-text-sm tw-px-3 tw-py-2">
                  {{ contentsError }}
                </div>
                <template v-else>
                  <div
                    v-for="item in dirContents"
                    :key="item.path"
                    class="repo-file-item"
                  >
                    <div class="repo-file-cell name muted-links">
                      <SvgIcon :name="item.type === 'dir' ? 'octicon-file-directory-fill' : 'octicon-file'" :size="16"/>
                      <RouterLink :to="contentItemUrl(item)" class="entry-name" :title="item.name">
                        {{ item.name }}
                      </RouterLink>
                    </div>
                    <div class="repo-file-cell message"/>
                    <div class="repo-file-cell age"/>
                  </div>
                </template>
              </div>
            </template>
          </div>

          <!-- right sidebar -->
          <div class="repo-home-sidebar-top flex-relaxed-list">
            <!-- description -->
            <div class="flex-relaxed-list">
              <div class="repo-home-sidebar-header">About</div>
              <div class="repo-description tw-break-anywhere">
                {{ repo.description || 'No description provided.' }}
              </div>
              <a v-if="repo.website" :href="repo.website" class="flex-text-block" target="_blank" rel="noopener">
                <SvgIcon name="octicon-link" :size="16"/> {{ repo.website }}
              </a>
            </div>

            <!-- stats -->
            <div class="flex-relaxed-list tw-mt-4">
              <RouterLink :to="`/${owner}/${repoName}/stargazers`" class="flex-text-block muted">
                <SvgIcon name="octicon-star" :size="16"/>
                <strong>{{ repo.stars_count }}</strong> Stars
              </RouterLink>
              <RouterLink :to="`/${owner}/${repoName}/forks`" class="flex-text-block muted">
                <SvgIcon name="octicon-repo-forked" :size="16"/>
                <strong>{{ repo.forks_count }}</strong> Forks
              </RouterLink>
              <RouterLink :to="`/${owner}/${repoName}/issues`" class="flex-text-block muted">
                <SvgIcon name="octicon-issue-opened" :size="16"/>
                <strong>{{ repo.open_issues_count }}</strong> Open Issues
              </RouterLink>
              <RouterLink :to="`/${owner}/${repoName}/watchers`" class="flex-text-block muted">
                <SvgIcon name="octicon-eye" :size="16"/>
                <strong>{{ repo.watchers_count }}</strong> Watchers
              </RouterLink>
            </div>

            <!-- clone panel -->
            <div class="tw-mt-4">
              <div class="ui small action input tw-flex tw-w-full">
                <input
                  type="text"
                  :value="httpCloneUrl"
                  readonly
                  class="tw-font-mono"
                  @focus="($event.target as HTMLInputElement).select()"
                >
                <button class="ui button" @click="copyUrl(httpCloneUrl)">Copy</button>
              </div>
              <div v-if="sshCloneUrl" class="ui small action input tw-flex tw-w-full tw-mt-2">
                <input
                  type="text"
                  :value="sshCloneUrl"
                  readonly
                  class="tw-font-mono"
                  @focus="($event.target as HTMLInputElement).select()"
                >
                <button class="ui button" @click="copyUrl(sshCloneUrl)">Copy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoNav from '../components/RepoNav.vue';
import {SvgIcon} from '../../svg.ts';
import {
  getRepo, getRepoContents, getCurrentUser,
  isRepoStarred, starRepo, unstarRepo,
  type Repository, type ContentsResponse, type User,
} from '../api/index.ts';
import {rewriteToBackend} from '../spaconfig.ts';

const route = useRoute();
const owner = String(route.params['owner']);
const repoName = String(route.params['repo']);

const loading = ref(true);
const error = ref('');
const repo = ref<Repository | null>(null);
const currentUser = ref<User | null>(null);

const contentsLoading = ref(false);
const contentsError = ref('');
const dirContents = ref<ContentsResponse[]>([]);

const starred = ref(false);
const starLoading = ref(false);

const httpCloneUrl = computed(() => rewriteToBackend(repo.value?.clone_url ?? ''));
const sshCloneUrl = computed(() => repo.value?.ssh_url ?? '');

function contentItemUrl(item: ContentsResponse): string {
  const branch = repo.value?.default_branch ?? 'HEAD';
  return `/${owner}/${repoName}/src/branch/${branch}/${item.path}`;
}

function copyUrl(url: string) {
  navigator.clipboard?.writeText(url).catch(() => {});
}

async function toggleStar() {
  if (!repo.value) return;
  starLoading.value = true;
  try {
    if (starred.value) {
      await unstarRepo(owner, repoName);
      repo.value.stars_count = Math.max(0, repo.value.stars_count - 1);
      starred.value = false;
    } else {
      await starRepo(owner, repoName);
      repo.value.stars_count += 1;
      starred.value = true;
    }
  } catch {
    // silently ignore
  } finally {
    starLoading.value = false;
  }
}

onMounted(async () => {
  currentUser.value = await getCurrentUser();

  try {
    repo.value = await getRepo(owner, repoName);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Repository not found';
    loading.value = false;
    return;
  }
  loading.value = false;

  if (currentUser.value) {
    isRepoStarred(owner, repoName).then(v => { starred.value = v; }).catch(() => {});
  }

  contentsLoading.value = true;
  try {
    const contents = await getRepoContents(owner, repoName, '', repo.value!.default_branch);
    if (Array.isArray(contents)) {
      dirContents.value = (contents as ContentsResponse[]).sort((a, b) => {
        if (a.type === 'dir' && b.type !== 'dir') return -1;
        if (a.type !== 'dir' && b.type === 'dir') return 1;
        return a.name.localeCompare(b.name);
      });
    }
  } catch (err) {
    contentsError.value = err instanceof Error ? err.message : 'Failed to load files';
  } finally {
    contentsLoading.value = false;
  }
});
</script>
