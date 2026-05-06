<template>
  <AppLayout page-class="repository wiki view">
    <RepoNav
      :owner="owner"
      :repo-name="repoName"
      active-tab="wiki"
      :repo="repo"
      :current-user="currentUser"
      :starred="starred"
      :star-loading="starLoading"
      @toggle-star="toggleStar"
    />

    <div class="ui container">
      <div v-if="loading" class="tw-py-8 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>
      <div v-else-if="error && !editMode && !createMode" class="ui negative message tw-mt-4">
        <p>{{ error }}</p>
      </div>

      <!-- ── Create / Edit form ── -->
      <div v-else-if="createMode || editMode" class="tw-mt-4">
        <div class="tw-flex tw-items-center tw-justify-between tw-mb-4">
          <h2 class="ui header tw-mb-0">{{ createMode ? 'New Wiki Page' : `Editing: ${currentPage?.title}` }}</h2>
          <button class="ui mini button" @click="cancelEdit">Cancel</button>
        </div>
        <div v-if="saveError" class="ui negative message tw-mb-4"><p>{{ saveError }}</p></div>
        <div class="ui form">
          <div class="field">
            <label>Title</label>
            <input v-model="editTitle" type="text" placeholder="Page title" :disabled="saving">
          </div>
          <div class="field">
            <label>Content <span class="tw-text-gray-400 tw-text-xs tw-font-normal">(Markdown supported)</span></label>
            <textarea
              v-model="editContent"
              rows="24"
              placeholder="Write your wiki content here…"
              class="tw-font-mono tw-text-sm"
              :disabled="saving"
            />
          </div>
          <div class="tw-flex tw-gap-2">
            <button
              class="ui primary button"
              :class="{loading: saving}"
              :disabled="saving || !editTitle.trim() || !editContent.trim()"
              @click="savePage"
            >
              {{ createMode ? 'Create Page' : 'Save Changes' }}
            </button>
            <button class="ui button" :disabled="saving" @click="cancelEdit">Cancel</button>
          </div>
        </div>
      </div>

      <!-- ── Single wiki page view ── -->
      <div v-else-if="currentPage" class="flex-container tw-mt-4">
        <div class="flex-container-main">
          <div class="ui segment wiki-content-main">
            <div class="wiki-content-header tw-flex tw-justify-between tw-items-start tw-mb-2">
              <h2 class="ui medium header wiki-content-title tw-mb-0">{{ currentPage.title }}</h2>
              <div v-if="currentUser" class="tw-flex tw-gap-2 tw-shrink-0">
                <button class="ui mini primary button" @click="startEdit">Edit</button>
                <button
                  class="ui mini red button"
                  :class="{loading: deleting}"
                  :disabled="deleting"
                  @click="deletePage"
                >Delete</button>
              </div>
            </div>
            <div class="tw-text-sm tw-text-gray-500 tw-mb-4">
              Last updated by
              <span class="tw-font-medium">{{ currentPage.last_commit.author?.name }}</span>
              &middot; {{ formatDate(currentPage.last_commit.author.date) }}
            </div>
            <div class="ui divider"/>
            <div class="wiki-content markup">
              <pre class="tw-whitespace-pre-wrap tw-text-sm tw-font-mono">{{ decodedContent }}</pre>
            </div>
          </div>
        </div>
        <div class="flex-container-sidebar">
          <div class="ui segment wiki-sidebar">
            <h4 class="ui header">Pages</h4>
            <ul class="tw-list-none tw-m-0 tw-p-0">
              <li class="tw-mb-1">
                <RouterLink :to="`/${owner}/${repoName}/wiki`" class="muted">Home</RouterLink>
              </li>
            </ul>
            <div v-if="currentUser" class="tw-mt-4">
              <button class="ui mini primary fluid button" @click="startCreate">New Page</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Wiki page list ── -->
      <div v-else class="flex-container tw-mt-4">
        <div class="flex-container-main">
          <div class="ui segment">
            <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
              <h2 class="ui medium header tw-mb-0">Wiki Pages</h2>
              <button v-if="currentUser" class="ui primary button" @click="startCreate">New Page</button>
            </div>
            <div v-if="!pages.length" class="tw-py-8 tw-text-center tw-text-gray-500">
              <p>No wiki pages yet.</p>
              <button v-if="currentUser" class="ui primary button tw-mt-2" @click="startCreate">
                Create the first page
              </button>
            </div>
            <div v-else class="ui divided list">
              <div
                v-for="p in pages"
                :key="p.title"
                class="item tw-py-2"
              >
                <div class="content">
                  <RouterLink
                    :to="`/${owner}/${repoName}/wiki/${encodeURIComponent(p.title)}`"
                    class="header"
                  >{{ p.title }}</RouterLink>
                  <div class="description tw-text-sm tw-text-gray-500">
                    {{ formatDate(p.last_commit.author.date) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-container-sidebar">
          <div class="ui segment wiki-sidebar">
            <h4 class="ui header">Wiki</h4>
            <p class="tw-text-sm tw-text-gray-500">{{ pages.length }} page{{ pages.length === 1 ? '' : 's' }}</p>
            <div v-if="currentUser" class="tw-mt-3">
              <button class="ui mini primary fluid button" @click="startCreate">New Page</button>
            </div>
          </div>
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
import {
  getRepo, getWikiPage, listWikiPages, createWikiPage, editWikiPage, deleteWikiPage,
  getCurrentUser, isRepoStarred, starRepo, unstarRepo,
  type WikiPage, type Repository, type User,
} from '../api/index.ts';

const route = useRoute();
const router = useRouter();
const owner = computed(() => route.params.owner as string);
const repoName = computed(() => route.params.repo as string);
const pageTitle = computed(() => {
  const pm = route.params.pathMatch;
  return Array.isArray(pm) ? pm.join('/') : (pm ?? '');
});

// ── Page state ───────────────────────────────────────────────────────────────
const currentPage = ref<WikiPage | null>(null);
const pages = ref<WikiPage[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const repo = ref<Repository | null>(null);
const currentUser = ref<User | null>(null);
const starred = ref(false);
const starLoading = ref(false);

// ── Edit / Create form state ─────────────────────────────────────────────────
const editMode = ref(false);
const createMode = ref(false);
const editTitle = ref('');
const editContent = ref('');
const saving = ref(false);
const saveError = ref<string | null>(null);
const deleting = ref(false);

// ── Computed ─────────────────────────────────────────────────────────────────
const decodedContent = computed(() => {
  if (!currentPage.value) return '';
  try {
    const b64 = currentPage.value.content_base64.replace(/\s/g, '');
    return new TextDecoder().decode(
      Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)),
    );
  } catch {
    return currentPage.value.content_base64;
  }
});

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
}

// ── Star ─────────────────────────────────────────────────────────────────────
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

// ── Edit / Create helpers ────────────────────────────────────────────────────
function startCreate() {
  editTitle.value = '';
  editContent.value = '';
  saveError.value = null;
  createMode.value = true;
  editMode.value = false;
}

function startEdit() {
  if (!currentPage.value) return;
  editTitle.value = currentPage.value.title;
  editContent.value = decodedContent.value;
  saveError.value = null;
  editMode.value = true;
  createMode.value = false;
}

function cancelEdit() {
  editMode.value = false;
  createMode.value = false;
}

async function savePage() {
  if (!editTitle.value.trim() || !editContent.value.trim()) return;
  saving.value = true;
  saveError.value = null;
  try {
    if (createMode.value) {
      const newPage = await createWikiPage(owner.value, repoName.value, editTitle.value.trim(), editContent.value);
      // Navigate to the newly created page
      await router.push(`/${owner.value}/${repoName.value}/wiki/${encodeURIComponent(newPage.title)}`);
    } else if (editMode.value && currentPage.value) {
      const updated = await editWikiPage(
        owner.value, repoName.value,
        currentPage.value.title,
        editTitle.value.trim(),
        editContent.value,
      );
      currentPage.value = updated;
      editMode.value = false;
    }
  } catch (e) {
    saveError.value = String(e);
  } finally {
    saving.value = false;
  }
}

async function deletePage() {
  if (!currentPage.value) return;
  if (!confirm(`Delete wiki page "${currentPage.value.title}"? This cannot be undone.`)) return;
  deleting.value = true;
  try {
    await deleteWikiPage(owner.value, repoName.value, currentPage.value.title);
    await router.push(`/${owner.value}/${repoName.value}/wiki`);
  } catch (e) {
    error.value = String(e);
  } finally {
    deleting.value = false;
  }
}

// ── Data loading ─────────────────────────────────────────────────────────────
async function load() {
  if (!owner.value || !repoName.value) return;
  loading.value = true;
  error.value = null;
  currentPage.value = null;
  pages.value = [];
  editMode.value = false;
  createMode.value = false;
  try {
    if (pageTitle.value) {
      currentPage.value = await getWikiPage(owner.value, repoName.value, pageTitle.value);
    } else {
      pages.value = await listWikiPages(owner.value, repoName.value);
    }
  } catch (e) {
    error.value = String(e);
  } finally {
    loading.value = false;
  }
}

watch([owner, repoName, pageTitle], load);

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
