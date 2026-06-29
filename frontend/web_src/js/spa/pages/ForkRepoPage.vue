<!-- Translated from: templates/repo/pulls/fork.tmpl -->
<template>
  <AppLayout page-class="repository new fork" title="Fork Repository">
    <div class="ui container medium-width">
      <h3 class="ui top attached header">Fork Repository</h3>
      <div class="ui attached segment">
        <BaseAlert :flash="flash"/>
        <form class="ui form left-right-form" @submit.prevent="handleFork">
          <div class="inline required field">
            <label>Owner</label>
            <select v-model="form.owner" class="ui dropdown">
              <option v-if="currentUser" :value="currentUser.login">{{ currentUser.login }}</option>
              <option v-for="o in orgs" :key="o.id" :value="o.username">{{ o.username }}</option>
            </select>
          </div>
          <div class="inline field">
            <label>Fork From</label>
            <span>{{ forkFrom }}</span>
          </div>
          <div class="inline required field">
            <label for="repo_name">Repository Name</label>
            <input id="repo_name" v-model="form.name" required maxlength="100">
          </div>
          <div class="inline field">
            <label for="description">Description</label>
            <textarea id="description" v-model="form.description" rows="2"></textarea>
          </div>
          <div class="divider"></div>
          <div class="inline field">
            <button class="ui primary button" type="submit" :disabled="submitting">Fork Repository</button>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import BaseAlert from '../components/BaseAlert.vue';
import {apiBase} from '../spaconfig.ts';
import {getStoredToken} from '../api/index.ts';
import {currentUser, initAuth} from '../stores/auth.ts';

const route = useRoute();
const router = useRouter();
const forkOwner = route.params.owner as string;
const forkRepo = route.params.repo as string;
const forkFrom = `${forkOwner}/${forkRepo}`;
const token = getStoredToken() ?? '';
const headers = {'Content-Type': 'application/json', Authorization: `token ${token}`};

const orgs = ref<any[]>([]);
const form = ref({owner: '', name: forkRepo, description: ''});
const submitting = ref(false);
const flash = ref<{error?: string}>({});

async function loadMeta() {
  await initAuth();
  form.value.owner = currentUser.value?.login || '';
  try {
    const resp = await fetch(`${apiBase}/user/orgs`, {headers: {Authorization: `token ${token}`}});
    if (resp.ok) orgs.value = await resp.json();
  } catch { /* empty */ }
}

async function handleFork() {
  submitting.value = true;
  flash.value = {};
  try {
    const body: any = {name: form.value.name};
    if (form.value.description) body.description = form.value.description;
    if (form.value.owner !== currentUser.value?.login) body.organization = form.value.owner;
    const resp = await fetch(`${apiBase}/repos/${forkOwner}/${forkRepo}/forks`, {method: 'POST', headers, body: JSON.stringify(body)});
    if (resp.ok || resp.status === 202) {
      const data = await resp.json();
      router.push(`/${data.full_name}`);
    } else {
      const data = await resp.json().catch(() => ({}));
      flash.value.error = data.message || 'Failed to fork repository.';
    }
  } catch { flash.value.error = 'Network error.'; }
  finally { submitting.value = false; }
}

onMounted(() => loadMeta());
</script>
