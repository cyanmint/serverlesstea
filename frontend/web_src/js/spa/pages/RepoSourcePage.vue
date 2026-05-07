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
      <div class="ui segment tw-mt-4">
        <div v-if="actionError" class="ui negative message tw-mb-3"><p>{{ actionError }}</p></div>
        <div class="tw-flex tw-flex-wrap tw-gap-2 tw-items-center">
          <select v-model="selectedRef" class="ui dropdown" @change="switchRef">
            <option v-for="option in refOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          <button class="ui button" @click="createBranchFromCurrent">New Branch</button>
          <button class="ui button" @click="createTagFromCurrent">New Tag</button>
          <button v-if="currentRefType !== 'commit'" class="ui button" @click="renameCurrentRef">Rename {{ currentRefType }}</button>
          <button v-if="currentRefType !== 'commit'" class="ui red basic button" @click="deleteCurrentRef">Delete {{ currentRefType }}</button>
          <button class="ui button" @click="triggerUpload">Upload File</button>
          <input ref="uploadInput" type="file" class="tw-hidden" @change="handleUpload">
        </div>
      </div>
    </div>

    <div v-else-if="contents" class="ui container">
      <div class="ui segment tw-mb-4">
        <div v-if="actionError" class="ui negative message tw-mb-3"><p>{{ actionError }}</p></div>
        <div class="tw-flex tw-flex-wrap tw-gap-2 tw-items-center">
          <select v-model="selectedRef" class="ui dropdown" @change="switchRef">
            <option v-for="option in refOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          <button class="ui button" @click="createBranchFromCurrent">New Branch</button>
          <button class="ui button" @click="createTagFromCurrent">New Tag</button>
          <button v-if="currentRefType !== 'commit'" class="ui button" @click="renameCurrentRef">Rename {{ currentRefType }}</button>
          <button v-if="currentRefType !== 'commit'" class="ui red basic button" @click="deleteCurrentRef">Delete {{ currentRefType }}</button>
          <button class="ui button" @click="triggerUpload">Upload File</button>
          <button v-if="!Array.isArray(contents)" class="ui primary button" @click="editingFile = !editingFile">
            {{ editingFile ? 'Cancel Edit' : 'Edit File' }}
          </button>
          <input ref="uploadInput" type="file" class="tw-hidden" @change="handleUpload">
        </div>
        <div v-if="editingFile && !Array.isArray(contents)" class="tw-mt-4">
          <div class="ui form">
            <div class="field">
              <label>Commit message</label>
              <input v-model="commitMessage" type="text" :placeholder="`Update ${contents.path}`">
            </div>
            <div class="field">
              <label>Content</label>
              <textarea v-model="newFileContent" rows="16" class="ui fluid textarea"/>
            </div>
            <button class="ui primary button" :class="{loading: savingFile}" :disabled="savingFile" @click="saveFile">Save File</button>
          </div>
        </div>
      </div>

      <div v-if="Array.isArray(contents)" id="repo-files-table" class="ui segment">
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

      <div v-else class="non-diff-file-content">
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
import {useRoute, useRouter, RouterLink} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoNav from '../components/RepoNav.vue';
import {SvgIcon} from '../../svg.ts';
import {
  createRepoBranch, createRepoTag, deleteRepoBranch, deleteRepoTag, getRepo, getRepoBranches, getRepoContents, getRepoTags,
  getCurrentUser, isRepoStarred, starRepo, unstarRepo, writeRepoFile,
  renameRepoBranch, renameRepoTag,
  type Branch, type ContentsResponse, type Repository, type Tag, type User,
} from '../api/index.ts';

const route = useRoute();
const router = useRouter();

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
const branches = ref<Branch[]>([]);
const tags = ref<Tag[]>([]);
const selectedRef = ref('');
const uploadInput = ref<HTMLInputElement | null>(null);
const editingFile = ref(false);
const newFileContent = ref('');
const commitMessage = ref('');
const savingFile = ref(false);
const actionError = ref('');

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
const currentRefType = computed(() => (selectedRef.value.split(':')[0] || 'branch') as 'branch' | 'tag' | 'commit');
const currentRefName = computed(() => selectedRef.value.split(':').slice(1).join(':'));
const refOptions = computed(() => {
  const options = [
    ...branches.value.map((branch) => ({value: `branch:${branch.name}`, label: `Branch: ${branch.name}`})),
    ...tags.value.map((tag) => ({value: `tag:${tag.name}`, label: `Tag: ${tag.name}`})),
  ];
  const current = `${refType.value}:${branchRef.value}`;
  if (!options.some((o) => o.value === current)) {
    const prefix = refType.value === 'tag' ? 'Tag' : refType.value === 'commit' ? 'Commit' : 'Branch';
    options.unshift({value: current, label: `${prefix}: ${branchRef.value}`});
  }
  return options;
});

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
  selectedRef.value = `${refType.value}:${branchRef.value}`;
  try {
    contents.value = await getRepoContents(owner.value, repoName.value, filePath.value, branchRef.value);
    if (!Array.isArray(contents.value)) {
      newFileContent.value = fileContent.value;
      commitMessage.value = `Update ${contents.value.path}`;
    }
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

function toBase64(bytes: Uint8Array): string {
  return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''));
}

async function switchRef() {
  const [type, ...rest] = selectedRef.value.split(':');
  const ref = rest.join(':');
  const path = filePath.value ? `/${filePath.value}` : '';
  await router.push(`/${owner.value}/${repoName.value}/src/${type}/${encodeURIComponent(ref)}${path}`);
}

async function createBranchFromCurrent() {
  const name = window.prompt('New branch name');
  if (!name?.trim()) return;
  actionError.value = '';
  try {
    await createRepoBranch(owner.value, repoName.value, name.trim(), branchRef.value);
    await loadRefs();
  } catch (e) {
    actionError.value = e instanceof Error ? e.message : 'Failed to create branch';
  }
}

async function createTagFromCurrent() {
  const name = window.prompt('New tag name');
  if (!name?.trim()) return;
  actionError.value = '';
  try {
    await createRepoTag(owner.value, repoName.value, name.trim(), branchRef.value);
    await loadRefs();
  } catch (e) {
    actionError.value = e instanceof Error ? e.message : 'Failed to create tag';
  }
}

async function renameCurrentRef() {
  const type = currentRefType.value;
  const ref = currentRefName.value;
  if (!ref || type === 'commit') return;
  const newName = window.prompt(`Rename ${type}`, ref);
  if (!newName?.trim() || newName.trim() === ref) return;
  actionError.value = '';
  try {
    if (type === 'branch') {
      await renameRepoBranch(owner.value, repoName.value, ref, newName.trim());
    } else {
      await renameRepoTag(owner.value, repoName.value, ref, newName.trim());
    }
    await loadRefs();
    await router.push(`/${owner.value}/${repoName.value}/src/${type}/${encodeURIComponent(newName.trim())}`);
  } catch (e) {
    actionError.value = e instanceof Error ? e.message : `Failed to rename ${type}`;
  }
}

async function deleteCurrentRef() {
  const type = currentRefType.value;
  const ref = currentRefName.value;
  if (!ref || type === 'commit') return;
  if (!window.confirm(`Delete ${type} "${ref}"?`)) return;
  actionError.value = '';
  try {
    if (type === 'branch') {
      await deleteRepoBranch(owner.value, repoName.value, ref);
    } else {
      await deleteRepoTag(owner.value, repoName.value, ref);
    }
    await loadRefs();
    const fallbackBranch = branches.value[0]?.name || repo.value?.default_branch || 'main';
    await router.push(`/${owner.value}/${repoName.value}/src/branch/${encodeURIComponent(fallbackBranch)}`);
  } catch (e) {
    actionError.value = e instanceof Error ? e.message : `Failed to delete ${type}`;
  }
}

function triggerUpload() {
  uploadInput.value?.click();
}

async function handleUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const targetPath = window.prompt('File path', filePath.value ? `${filePath.value}/${file.name}` : file.name);
  input.value = '';
  if (!targetPath?.trim()) return;
  actionError.value = '';
  savingFile.value = true;
  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const targetBranch = refType.value === 'branch' ? branchRef.value : undefined;
    const newBranch = refType.value === 'branch' ? undefined : (window.prompt('Target branch for upload', repo.value?.default_branch ?? 'main') ?? undefined);
    await writeRepoFile(owner.value, repoName.value, targetPath.trim(), {
      contentBase64: toBase64(bytes),
      message: `Upload ${file.name}`,
      branch: targetBranch,
      new_branch: newBranch,
    });
    await loadRefs();
    await router.push(`/${owner.value}/${repoName.value}/src/branch/${encodeURIComponent(newBranch || targetBranch || repo.value?.default_branch || 'main')}/${targetPath.trim()}`);
  } catch (e) {
    actionError.value = e instanceof Error ? e.message : 'Failed to upload file';
  } finally {
    savingFile.value = false;
  }
}

async function saveFile() {
  if (Array.isArray(contents.value) || !contents.value) return;
  actionError.value = '';
  savingFile.value = true;
  try {
    const targetBranch = refType.value === 'branch' ? branchRef.value : undefined;
    const newBranch = refType.value === 'branch' ? undefined : (window.prompt('Target branch for edit', repo.value?.default_branch ?? 'main') ?? undefined);
    await writeRepoFile(owner.value, repoName.value, contents.value.path, {
      contentBase64: toBase64(new TextEncoder().encode(newFileContent.value)),
      message: commitMessage.value.trim() || `Update ${contents.value.path}`,
      branch: targetBranch,
      new_branch: newBranch,
    });
    editingFile.value = false;
    await loadRefs();
    if (newBranch) {
      await router.push(`/${owner.value}/${repoName.value}/src/branch/${encodeURIComponent(newBranch)}/${contents.value.path}`);
    } else {
      await load();
    }
  } catch (e) {
    actionError.value = e instanceof Error ? e.message : 'Failed to save file';
  } finally {
    savingFile.value = false;
  }
}

async function loadRefs() {
  [branches.value, tags.value] = await Promise.all([
    getRepoBranches(owner.value, repoName.value).catch(() => []),
    getRepoTags(owner.value, repoName.value).catch(() => []),
  ]);
  selectedRef.value = `${refType.value}:${branchRef.value}`;
}

watch([owner, repoName, refType, branchRef, filePath], load);
onMounted(async () => {
  [repo.value, currentUser.value] = await Promise.all([
    getRepo(owner.value, repoName.value).catch(() => null),
    getCurrentUser(),
  ]);
  await loadRefs();
  if (currentUser.value) {
    starred.value = await isRepoStarred(owner.value, repoName.value).catch(() => false);
  }
  await load();
});
</script>
