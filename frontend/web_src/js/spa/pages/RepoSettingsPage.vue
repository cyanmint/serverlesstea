<template>
  <AppLayout>
    <div v-if="repoLoading" class="ui container tw-py-8">
      <div class="ui active centered inline loader"/>
    </div>

    <div v-else-if="repoError" class="ui container tw-py-6">
      <div class="ui negative message"><p>{{ repoError }}</p></div>
    </div>

    <template v-else-if="repo">
      <RepoNav
        :owner="owner"
        :repo-name="repoName"
        active-tab="settings"
        :repo="repo"
        :current-user="currentUser"
        :starred="starred"
        :star-loading="starLoading"
        @toggle-star="toggleStar"
      />

      <!-- Settings content with sidebar -->
      <div role="main" :class="`page-content repository settings ${activeTab}`">
        <div class="ui container fluid padded flex-container">
          <!-- Sidebar nav -->
          <div class="flex-container-nav">
            <div class="ui fluid vertical menu">
              <div class="header item">Repository Settings</div>
              <RouterLink :to="`/${owner}/${repoName}/settings`" class="item" :class="{active: activeTab === 'options'}">
                Options
              </RouterLink>
              <RouterLink :to="`/${owner}/${repoName}/settings/collaboration`" class="item" :class="{active: activeTab === 'collaboration'}">
                Collaborators
              </RouterLink>
              <RouterLink :to="`/${owner}/${repoName}/settings/branches`" class="item" :class="{active: activeTab === 'branches'}">
                Branches
              </RouterLink>
              <RouterLink :to="`/${owner}/${repoName}/settings/hooks`" class="item" :class="{active: activeTab === 'hooks'}">
                Webhooks
              </RouterLink>
              <RouterLink :to="`/${owner}/${repoName}/settings/keys`" class="item" :class="{active: activeTab === 'keys'}">
                Deploy Keys
              </RouterLink>
            </div>
          </div>

          <!-- Main content -->
          <div class="flex-container-main">
            <!-- Options tab (default) -->
            <template v-if="activeTab === 'options'">
              <h4 class="ui top attached header">Basic Settings</h4>
              <div class="ui attached segment">
                <div v-if="saveError" class="ui negative message"><p>{{ saveError }}</p></div>
                <div v-if="saveSuccess" class="ui success message"><p>Settings saved.</p></div>
                <form class="ui form" @submit.prevent="saveBasicSettings">
                  <div class="required field">
                    <label>Repository Name</label>
                    <input v-model="editName" name="repo_name" required>
                  </div>
                  <div class="field">
                    <label for="description">Description</label>
                    <textarea id="description" v-model="editDescription" name="description" rows="2" maxlength="2048"/>
                  </div>
                  <div class="field">
                    <label for="website">Website</label>
                    <input id="website" v-model="editWebsite" name="website" type="url" maxlength="1024">
                  </div>
                  <div class="inline field">
                    <label>Visibility</label>
                    <div class="ui checkbox">
                      <input v-model="editPrivate" name="private" type="checkbox">
                      <label>Make this repository private</label>
                    </div>
                  </div>
                  <div class="field">
                    <label>Default Branch</label>
                    <select v-model="editDefaultBranch" class="ui dropdown">
                      <option v-for="branch in repoBranches" :key="branch.name" :value="branch.name">{{ branch.name }}</option>
                    </select>
                  </div>
                  <div class="field">
                    <button class="ui primary button" type="submit" :disabled="saving">
                      <span v-if="saving">Saving…</span>
                      <span v-else>Update Settings</span>
                    </button>
                  </div>
                </form>
              </div>

              <!-- Danger zone -->
              <h4 class="ui top attached error header tw-mt-6">Danger Zone</h4>
              <div class="ui attached error segment">
                <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
                  <div>
                    <h5 class="tw-font-bold">Archive this repository</h5>
                    <p class="tw-text-sm">Mark as archived and read-only.</p>
                  </div>
                  <button v-if="!repo.archived" class="ui basic red button" @click="archiveRepo">Archive</button>
                  <button v-else class="ui basic button" @click="unarchiveRepo">Unarchive</button>
                </div>
                <div class="divider"/>
                <div class="tw-flex tw-justify-between tw-items-center tw-mt-4">
                  <div>
                    <h5 class="tw-font-bold tw-text-red-600">Delete this repository</h5>
                    <p class="tw-text-sm">Once deleted, it cannot be recovered.</p>
                  </div>
                  <button class="ui red button" @click="showDeleteConfirm = true">Delete</button>
                </div>

                <div v-if="showDeleteConfirm" class="ui segment tw-mt-4">
                  <p>Type <strong>{{ owner }}/{{ repoName }}</strong> to confirm deletion:</p>
                  <div class="ui form">
                    <div class="field">
                      <input v-model="deleteConfirm" type="text" :placeholder="`${owner}/${repoName}`">
                    </div>
                    <button
                      class="ui red button"
                      :disabled="deleteConfirm !== `${owner}/${repoName}` || deleting"
                      @click="deleteRepo"
                    >
                      <span v-if="deleting">Deleting…</span>
                      <span v-else>Delete Repository</span>
                    </button>
                    <button class="ui basic button tw-ml-2" @click="showDeleteConfirm = false">Cancel</button>
                    <div v-if="deleteError" class="ui negative message tw-mt-2"><p>{{ deleteError }}</p></div>
                  </div>
                </div>
              </div>
            </template>

            <!-- Collaborators tab -->
            <template v-else-if="activeTab === 'collaboration'">
              <h4 class="ui top attached header">Collaborators</h4>
              <div class="ui attached segment">
                <div v-if="collabLoading" class="ui active centered inline loader"/>
                <div v-else>
                  <div v-for="collab in collaborators" :key="collab.login" class="tw-flex tw-items-center tw-gap-3 tw-py-2 tw-border-b last:tw-border-0">
                    <img :src="collab.avatar_url" :alt="collab.login" class="ui mini circular image">
                    <RouterLink :to="`/${collab.login}`" class="tw-font-semibold tw-flex-1">{{ collab.login }}</RouterLink>
                    <button class="ui small red basic button" @click="removeCollaborator(collab.login)">Remove</button>
                  </div>
                  <div v-if="!collaborators.length" class="tw-text-gray-500 tw-py-4">No collaborators yet.</div>
                </div>
                <div class="divider"/>
                <h5 class="tw-font-semibold tw-mt-4">Add Collaborator</h5>
                <div class="ui form">
                  <div class="field">
                    <input v-model="newCollab" type="text" placeholder="Username">
                  </div>
                  <button class="ui primary button" :disabled="!newCollab || addingCollab" @click="addCollaborator">
                    <span v-if="addingCollab">Adding…</span>
                    <span v-else>Add</span>
                  </button>
                  <div v-if="collabError" class="ui negative message tw-mt-2"><p>{{ collabError }}</p></div>
                </div>
              </div>
            </template>

            <!-- Branches tab -->
            <template v-else-if="activeTab === 'branches'">
              <h4 class="ui top attached header">Branch Protection</h4>
              <div class="ui attached segment">
                <p class="tw-text-gray-600">Manage branch protection rules for this repository.</p>
                <a :href="`${appSubUrl}/${owner}/${repoName}/settings/branches`" class="ui primary button">
                  Manage Branch Rules
                </a>
              </div>
            </template>

            <!-- Webhooks tab -->
            <template v-else-if="activeTab === 'hooks'">
              <h4 class="ui top attached header">Webhooks</h4>
              <div class="ui attached segment">
                <div v-if="hooksLoading" class="ui active centered inline loader"/>
                <div v-else>
                  <div v-for="hook in hooks" :key="hook.id" class="tw-flex tw-items-center tw-gap-3 tw-py-2 tw-border-b last:tw-border-0">
                    <span class="tw-flex-1 tw-font-mono tw-text-sm">{{ hook.config?.url }}</span>
                    <span class="ui small label">{{ hook.type }}</span>
                    <span :class="hook.active ? 'ui small green label' : 'ui small grey label'">
                      {{ hook.active ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                  <div v-if="!hooks.length" class="tw-text-gray-500 tw-py-4">No webhooks configured.</div>
                </div>
                <RouterLink :to="`/${owner}/${repoName}/settings/hooks/gitea`" class="ui primary button tw-mt-4">
                  Add Webhook
                </RouterLink>
              </div>
            </template>

            <!-- Deploy Keys tab -->
            <template v-else-if="activeTab === 'keys'">
              <h4 class="ui top attached header">Deploy Keys</h4>
              <div class="ui attached segment">
                <div v-if="keysLoading" class="ui active centered inline loader"/>
                <div v-else>
                  <div v-for="key in deployKeys" :key="key.id" class="tw-flex tw-items-center tw-gap-3 tw-py-2 tw-border-b last:tw-border-0">
                    <span class="tw-flex-1">{{ key.title }}</span>
                    <span class="ui small label">{{ key.fingerprint }}</span>
                    <button class="ui small red basic button" @click="removeDeployKey(key.id)">Remove</button>
                  </div>
                  <div v-if="!deployKeys.length" class="tw-text-gray-500 tw-py-4">No deploy keys yet.</div>
                </div>
                <div class="divider"/>
                <h5 class="tw-font-semibold tw-mt-4">Add Deploy Key</h5>
                <div class="ui form">
                  <div class="field">
                    <label>Title</label>
                    <input v-model="newKeyTitle" type="text">
                  </div>
                  <div class="field">
                    <label>Key Content</label>
                    <textarea v-model="newKeyContent" rows="3" placeholder="ssh-rsa AAAA..."/>
                  </div>
                  <div class="field">
                    <div class="ui checkbox">
                      <input v-model="newKeyReadOnly" type="checkbox">
                      <label>Read-only key</label>
                    </div>
                  </div>
                  <button class="ui primary button" :disabled="!newKeyTitle || !newKeyContent || addingKey" @click="addDeployKey">
                    <span v-if="addingKey">Adding…</span>
                    <span v-else>Add Deploy Key</span>
                  </button>
                  <div v-if="keyError" class="ui negative message tw-mt-2"><p>{{ keyError }}</p></div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoNav from '../components/RepoNav.vue';
import {GET, POST, PATCH, PUT, DELETE} from '../../modules/fetch.ts';
import {getRepo, getRepoBranches, getCurrentUser, isRepoStarred, starRepo, unstarRepo, type Branch, type Repository, type User} from '../api/index.ts';
import {apiBase, appSubUrl} from '../spaconfig.ts';

const route = useRoute();
const router = useRouter();
const owner = computed(() => route.params['owner'] as string);
const repoName = computed(() => route.params['repo'] as string);
const activeTab = computed(() => (route.params['tab'] as string) || 'options');

const repo = ref<Repository | null>(null);
const repoLoading = ref(true);
const repoError = ref('');
const currentUser = ref<User | null>(null);
const starred = ref(false);
const starLoading = ref(false);

// Basic settings
const editName = ref('');
const editDescription = ref('');
const editWebsite = ref('');
const editPrivate = ref(false);
const saving = ref(false);
const saveError = ref('');
const saveSuccess = ref(false);
const editDefaultBranch = ref('');
const repoBranches = ref<Branch[]>([]);

// Delete
const showDeleteConfirm = ref(false);
const deleteConfirm = ref('');
const deleting = ref(false);
const deleteError = ref('');

// Collaborators
const collaborators = ref<User[]>([]);
const collabLoading = ref(false);
const newCollab = ref('');
const addingCollab = ref(false);
const collabError = ref('');

// Hooks
const hooks = ref<Array<{id: number; type: string; active: boolean; config?: {url?: string}}>>([]);
const hooksLoading = ref(false);

// Deploy keys
const deployKeys = ref<Array<{id: number; title: string; fingerprint: string; read_only: boolean}>>([]);
const keysLoading = ref(false);
const newKeyTitle = ref('');
const newKeyContent = ref('');
const newKeyReadOnly = ref(true);
const addingKey = ref(false);
const keyError = ref('');

onMounted(async () => {
  [currentUser.value, repo.value] = await Promise.all([
    getCurrentUser(),
    getRepo(owner.value, repoName.value).catch((e) => { repoError.value = String(e); return null; }),
  ]);
  repoLoading.value = false;
  if (repo.value) {
    editName.value = repo.value.name;
    editDescription.value = repo.value.description;
    editWebsite.value = (repo.value as unknown as Record<string, string>)['website'] ?? '';
    editPrivate.value = repo.value.private;
    editDefaultBranch.value = repo.value.default_branch;
    repoBranches.value = await getRepoBranches(owner.value, repoName.value).catch(() => []);
  }
  isRepoStarred(owner.value, repoName.value).then((s) => { starred.value = s; }).catch(() => {});
});

async function toggleStar() {
  if (!currentUser.value || starLoading.value) return;
  starLoading.value = true;
  try {
    if (starred.value) {
      await unstarRepo(owner.value, repoName.value);
      starred.value = false;
    } else {
      await starRepo(owner.value, repoName.value);
      starred.value = true;
    }
  } finally {
    starLoading.value = false;
  }
}

watch(activeTab, async (tab) => {
  if (tab === 'collaboration') loadCollaborators();
  if (tab === 'hooks') loadHooks();
  if (tab === 'keys') loadDeployKeys();
});

async function saveBasicSettings() {
  saving.value = true;
  saveError.value = '';
  saveSuccess.value = false;
  try {
    const resp = await PATCH(`${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}`, {
      data: {
        name: editName.value,
        description: editDescription.value,
        website: editWebsite.value,
        private: editPrivate.value,
        default_branch: editDefaultBranch.value,
      },
    });
    if (!resp.ok) throw new Error('Failed to save settings');
    const updated = await resp.json() as Repository;
    repo.value = updated;
    saveSuccess.value = true;
    if (updated.name !== repoName.value) {
      router.push(`/${owner.value}/${updated.name}/settings`);
    }
  } catch (e) {
    saveError.value = e instanceof Error ? e.message : 'Failed to save';
  } finally {
    saving.value = false;
  }
}

async function archiveRepo() {
  const resp = await PATCH(`${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}`, {
    data: {archived: true},
  });
  if (resp.ok && repo.value) repo.value.archived = true;
}

async function unarchiveRepo() {
  const resp = await PATCH(`${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}`, {
    data: {archived: false},
  });
  if (resp.ok && repo.value) repo.value.archived = false;
}

async function deleteRepo() {
  deleting.value = true;
  deleteError.value = '';
  try {
    const resp = await DELETE(`${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}`);
    if (!resp.ok) throw new Error('Failed to delete repository');
    router.push(`/${owner.value}`);
  } catch (e) {
    deleteError.value = e instanceof Error ? e.message : 'Failed to delete';
    deleting.value = false;
  }
}

async function loadCollaborators() {
  collabLoading.value = true;
  try {
    const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}/collaborators`);
    if (resp.ok) collaborators.value = await resp.json() as User[];
  } finally {
    collabLoading.value = false;
  }
}

async function addCollaborator() {
  addingCollab.value = true;
  collabError.value = '';
  try {
    const resp = await PUT(`${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}/collaborators/${encodeURIComponent(newCollab.value)}`, {
      data: {permission: 'write'},
    });
    if (!resp.ok) throw new Error('Failed to add collaborator');
    newCollab.value = '';
    await loadCollaborators();
  } catch (e) {
    collabError.value = e instanceof Error ? e.message : 'Failed';
  } finally {
    addingCollab.value = false;
  }
}

async function removeCollaborator(username: string) {
  await DELETE(`${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}/collaborators/${encodeURIComponent(username)}`);
  collaborators.value = collaborators.value.filter((c) => c.login !== username);
}

async function loadHooks() {
  hooksLoading.value = true;
  try {
    const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}/hooks`);
    if (resp.ok) hooks.value = await resp.json();
  } finally {
    hooksLoading.value = false;
  }
}

async function loadDeployKeys() {
  keysLoading.value = true;
  try {
    const resp = await GET(`${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}/keys`);
    if (resp.ok) deployKeys.value = await resp.json();
  } finally {
    keysLoading.value = false;
  }
}

async function addDeployKey() {
  addingKey.value = true;
  keyError.value = '';
  try {
    const resp = await POST(`${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}/keys`, {
      data: {title: newKeyTitle.value, key: newKeyContent.value, read_only: newKeyReadOnly.value},
    });
    if (!resp.ok) throw new Error('Failed to add deploy key');
    newKeyTitle.value = '';
    newKeyContent.value = '';
    await loadDeployKeys();
  } catch (e) {
    keyError.value = e instanceof Error ? e.message : 'Failed';
  } finally {
    addingKey.value = false;
  }
}

async function removeDeployKey(id: number) {
  await DELETE(`${apiBase}/repos/${encodeURIComponent(owner.value)}/${encodeURIComponent(repoName.value)}/keys/${id}`);
  deployKeys.value = deployKeys.value.filter((k) => k.id !== id);
}
</script>
