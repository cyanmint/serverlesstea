<template>
  <AppLayout>
    <div role="main" class="page-content repository new-repo">
      <div class="ui container medium-width">
        <h3 class="ui top attached header">New Repository</h3>
        <div class="ui attached segment">
          <div v-if="error" class="ui negative message"><p>{{ error }}</p></div>
          <form class="ui form left-right-form new-repo-form" @submit.prevent="handleSubmit">
            <div class="inline required field" :class="{error: !!error}">
              <label>Owner</label>
              <div class="ui selection dropdown" style="min-width:200px">
                <select v-model="ownerId" class="ui dropdown">
                  <option v-if="currentUser" :value="currentUser.id">{{ currentUser.login }}</option>
                  <option v-for="org in orgs" :key="org.id" :value="org.id">{{ org.login }}</option>
                </select>
              </div>
            </div>

            <div class="inline required field">
              <label for="repo_name">Repository Name</label>
              <input id="repo_name" v-model="repoName" name="repo_name" autofocus required maxlength="100">
              <span class="help">A good name is short and memorable.</span>
            </div>

            <div class="inline field">
              <label>Visibility</label>
              <div class="ui checkbox">
                <input v-model="isPrivate" name="private" type="checkbox">
                <label>Make this repository private</label>
              </div>
            </div>

            <div class="inline field">
              <label for="description">Description</label>
              <textarea id="description" v-model="description" rows="2" name="description" placeholder="Short description (optional)" maxlength="2048"/>
            </div>

            <div class="inline field">
              <label>Initialize Repository</label>
              <div class="ui checkbox">
                <input v-model="autoInit" name="auto_init" type="checkbox">
                <label>Initialize this repository</label>
              </div>
            </div>

            <div v-if="autoInit" class="inline field">
              <label for="default_branch">Default Branch</label>
              <input id="default_branch" v-model="defaultBranch" name="default_branch" placeholder="main">
            </div>

            <div class="inline field">
              <label/>
              <button class="ui primary button" type="submit" :disabled="loading">
                <span v-if="loading">Creating…</span>
                <span v-else>Create Repository</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import {getCurrentUser, getUserOrgs, createRepo, type User} from '../api/index.ts';

const router = useRouter();
const currentUser = ref<User | null>(null);
const orgs = ref<User[]>([]);
const ownerId = ref<number | null>(null);
const repoName = ref('');
const description = ref('');
const isPrivate = ref(false);
const autoInit = ref(false);
const defaultBranch = ref('main');
const loading = ref(false);
const error = ref('');

onMounted(async () => {
  currentUser.value = await getCurrentUser();
  if (currentUser.value) {
    ownerId.value = currentUser.value.id;
    orgs.value = await getUserOrgs(currentUser.value.login);
  }
});

async function handleSubmit() {
  loading.value = true;
  error.value = '';
  try {
    const repo = await createRepo({
      name: repoName.value,
      description: description.value || undefined,
      private: isPrivate.value,
      auto_init: autoInit.value || undefined,
      default_branch: defaultBranch.value || undefined,
    });
    router.push(`/${repo.full_name}`);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to create repository';
  } finally {
    loading.value = false;
  }
}
</script>
