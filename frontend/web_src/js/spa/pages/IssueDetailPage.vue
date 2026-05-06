<template>
  <AppLayout page-class="repository view issue pull">
    <RepoNav
      :owner="owner"
      :repo-name="repoName"
      :active-tab="isPR ? 'pulls' : 'issues'"
      :repo="repo"
      :current-user="currentUser"
      :starred="starred"
      :star-loading="starLoading"
      @toggle-star="toggleStar"
    />

    <div class="ui container">
      <!-- Loading -->
      <div v-if="loading" class="tw-py-16 tw-text-center">
        <div class="ui active centered inline loader"/>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="ui negative message tw-mt-4">
        <h3>{{ notFound ? (isPR ? 'Pull request not found' : 'Issue not found') : 'Error loading' }}</h3>
        <p>{{ error }}</p>
        <RouterLink :to="`/${owner}/${repoName}/${isPR ? 'pulls' : 'issues'}`" class="ui button tw-mt-2">
          Back to {{ isPR ? 'Pull Requests' : 'Issues' }}
        </RouterLink>
      </div>

      <!-- Issue / PR view -->
      <template v-else-if="issue">
        <!-- Title row -->
        <div class="issue-title tw-mb-4">
          <!-- Title edit mode -->
          <div v-if="editingTitle" class="tw-flex tw-gap-2 tw-items-center tw-mb-2">
            <input
              v-model="newTitle"
              class="ui fluid input"
              autofocus
              @keydown.enter="saveTitle"
              @keydown.esc="cancelEditTitle"
            >
            <button
              class="ui primary mini button tw-shrink-0"
              :class="{loading: savingTitle}"
              :disabled="savingTitle || !newTitle.trim()"
              @click="saveTitle"
            >Save</button>
            <button class="ui mini button tw-shrink-0" :disabled="savingTitle" @click="cancelEditTitle">Cancel</button>
          </div>

          <!-- Title display mode -->
          <div v-else class="tw-flex tw-items-start tw-justify-between tw-gap-3">
            <h1 class="tw-text-2xl tw-flex-1 tw-break-words">
              {{ issue.title }}
              <span class="index tw-font-normal tw-text-gray-400">&nbsp;#{{ issue.number }}</span>
            </h1>
            <button v-if="canEdit" class="ui mini button tw-shrink-0 tw-mt-1" @click="startEditTitle">Edit</button>
          </div>

          <!-- State badge + metadata -->
          <div class="issue-title-meta tw-flex tw-flex-wrap tw-items-center tw-gap-2 tw-mt-2">
            <span class="ui label" :class="stateClass">
              <SvgIcon :name="stateIcon" :size="14"/>
              {{ stateLabel }}
            </span>
            <span class="tw-text-gray-600 tw-text-sm">
              <RouterLink :to="`/${issue.user.login}`" class="author tw-font-semibold">{{ issue.user.login }}</RouterLink>
              opened this {{ isPR ? 'pull request' : 'issue' }} {{ timeAgo(issue.created_at) }}
              &middot; {{ issue.comments }} comment{{ issue.comments === 1 ? '' : 's' }}
            </span>
            <span v-if="isPR && pullRequest" class="tw-text-xs tw-font-mono tw-bg-gray-100 tw-px-2 tw-py-0.5 tw-rounded tw-border tw-border-gray-200">
              {{ pullRequest.head?.label }} &rarr; {{ pullRequest.base?.label }}
            </span>
          </div>
        </div>

        <div class="ui divider"/>

        <!-- Two-column layout: timeline + sidebar -->
        <div class="issue-content">

          <!-- LEFT: Timeline -->
          <div class="issue-content-left comment-list prevent-before-timeline">
            <div class="ui timeline">

              <!-- Issue body as first "comment" -->
              <div class="timeline-item comment first">
                <a class="timeline-avatar" :href="`/${issue.user.login}`">
                  <img :src="issue.user.avatar_url" :alt="issue.user.login" width="40" height="40">
                </a>
                <div class="content comment-container">
                  <div class="comment-header avatar-content-left-arrow">
                    <div class="comment-header-left">
                      <a class="inline-timeline-avatar" :href="`/${issue.user.login}`">
                        <img :src="issue.user.avatar_url" :alt="issue.user.login" width="24" height="24">
                      </a>
                      <span class="tw-text-gray-600 muted-links">
                        <RouterLink :to="`/${issue.user.login}`" class="tw-font-semibold">{{ issue.user.login }}</RouterLink>
                        opened {{ timeAgo(issue.created_at) }}
                      </span>
                    </div>
                  </div>
                  <div class="ui attached segment comment-body">
                    <div class="render-content markup">
                      <div v-if="issue.body" class="tw-whitespace-pre-wrap tw-text-sm">{{ issue.body }}</div>
                      <p v-else class="tw-text-gray-400 tw-italic">No description provided.</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reply comments -->
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="timeline-item comment"
              >
                <a class="timeline-avatar" :href="`/${comment.user.login}`">
                  <img :src="comment.user.avatar_url" :alt="comment.user.login" width="40" height="40">
                </a>
                <div class="content comment-container">
                  <div class="comment-header avatar-content-left-arrow">
                    <div class="comment-header-left">
                      <a class="inline-timeline-avatar" :href="`/${comment.user.login}`">
                        <img :src="comment.user.avatar_url" :alt="comment.user.login" width="24" height="24">
                      </a>
                      <span class="tw-text-gray-600 muted-links">
                        <RouterLink :to="`/${comment.user.login}`" class="tw-font-semibold">{{ comment.user.login }}</RouterLink>
                        commented {{ timeAgo(comment.created_at) }}
                      </span>
                    </div>
                  </div>
                  <div class="ui attached segment comment-body">
                    <div class="render-content markup tw-whitespace-pre-wrap tw-text-sm">{{ comment.body || '' }}</div>
                  </div>
                </div>
              </div>

              <!-- Comments loading indicator -->
              <div v-if="commentsLoading" class="timeline-item tw-text-center tw-py-4">
                <div class="ui active centered inline loader"/>
              </div>

              <!-- PR: merge section (open PRs only) -->
              <div v-if="isPR && issue.state === 'open'" class="timeline-item">
                <div v-if="pullRequest" class="ui segment">
                  <div v-if="mergeError" class="ui negative message tw-mb-3"><p>{{ mergeError }}</p></div>
                  <!-- Mergeable -->
                  <div v-if="pullRequest.mergeable === true">
                    <div class="tw-flex tw-items-center tw-gap-2 tw-text-green-700 tw-mb-1">
                      <SvgIcon name="octicon-check-circle-fill" :size="18"/>
                      <span class="tw-font-semibold">This branch has no conflicts with the base branch</span>
                    </div>
                    <p class="tw-text-sm tw-text-gray-500 tw-mb-3">Merging can be performed automatically.</p>
                    <button
                      class="ui green button"
                      :class="{loading: mergingPR}"
                      :disabled="mergingPR"
                      @click="doMergePR"
                    >
                      <SvgIcon name="octicon-git-merge" :size="14"/>
                      Merge pull request
                    </button>
                  </div>
                  <!-- Has conflicts -->
                  <div v-else-if="pullRequest.mergeable === false" class="tw-flex tw-items-center tw-gap-2 tw-text-red-600">
                    <SvgIcon name="octicon-alert" :size="18"/>
                    <span class="tw-font-semibold">This branch has conflicts that must be resolved</span>
                  </div>
                  <!-- Checking -->
                  <div v-else class="tw-flex tw-items-center tw-gap-2 tw-text-gray-500">
                    <div class="ui mini active inline loader"/>
                    <span>Checking mergeability&hellip;</span>
                  </div>
                </div>
                <div v-else class="ui segment">
                  <div class="ui mini active inline loader"/>
                  Loading PR status&hellip;
                </div>
              </div>

              <!-- PR: merged notice -->
              <div v-if="isPR && pullRequest?.merged" class="timeline-item">
                <div class="ui purple message tw-flex tw-items-center tw-gap-2">
                  <SvgIcon name="octicon-git-merge" :size="18"/>
                  <span>Pull request merged{{ pullRequest.merged_at ? ' on ' + formatDate(pullRequest.merged_at) : '' }}</span>
                </div>
              </div>

              <!-- Add comment form (signed-in users) -->
              <div v-if="currentUser" class="timeline-item comment form">
                <a class="timeline-avatar" :href="`/${currentUser.login}`">
                  <img :src="currentUser.avatar_url" :alt="currentUser.login" width="40" height="40">
                </a>
                <div class="content">
                  <div v-if="commentError" class="ui negative message tw-mb-3"><p>{{ commentError }}</p></div>
                  <div class="ui segment">
                    <textarea
                      v-model="newComment"
                      class="ui fluid textarea"
                      placeholder="Leave a comment&hellip;"
                      rows="4"
                    />
                  </div>
                  <div class="tw-mt-3 tw-flex tw-justify-between tw-items-center tw-gap-2">
                    <!-- Close / Reopen -->
                    <button
                      v-if="canEdit"
                      class="ui button"
                      :class="{loading: closingIssue}"
                      :disabled="closingIssue"
                      @click="toggleState"
                    >
                      {{ issue.state === 'open'
                        ? `Close ${isPR ? 'pull request' : 'issue'}`
                        : `Reopen ${isPR ? 'pull request' : 'issue'}` }}
                    </button>
                    <div v-else/>
                    <!-- Comment -->
                    <button
                      class="ui primary button"
                      :class="{loading: submittingComment}"
                      :disabled="submittingComment || !newComment.trim()"
                      @click="submitComment"
                    >Comment</button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- RIGHT: Sidebar -->
          <div class="issue-content-right">
            <div class="sidebar-item-container">

              <!-- ── Labels ── -->
              <div class="sidebar-item">
                <div class="header tw-font-semibold tw-mb-2 tw-flex tw-justify-between tw-items-center">
                  <span>Labels</span>
                  <a
                    v-if="canEdit"
                    class="tw-cursor-pointer tw-text-gray-400 hover:tw-text-gray-600"
                    title="Edit labels"
                    @click.stop="toggleLabelPicker"
                  >
                    <SvgIcon name="octicon-gear" :size="14"/>
                  </a>
                </div>

                <!-- Label picker dropdown -->
                <div
                  v-if="showLabelPicker"
                  class="tw-border tw-border-gray-200 tw-rounded tw-shadow-lg tw-bg-white tw-mb-3 tw-overflow-hidden"
                  style="z-index:20"
                >
                  <div v-if="labelsLoading" class="tw-p-3 tw-text-center">
                    <div class="ui mini loader active inline"/>
                  </div>
                  <div v-else>
                    <div v-if="!repoLabels.length" class="tw-p-3 tw-text-sm tw-text-gray-400 tw-italic">
                      No labels defined for this repository.
                    </div>
                    <div v-else class="tw-max-h-52 tw-overflow-y-auto">
                      <label
                        v-for="label in repoLabels"
                        :key="label.id"
                        class="tw-flex tw-items-center tw-gap-2 tw-cursor-pointer tw-px-3 tw-py-2 hover:tw-bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          :checked="pickerLabelIds.has(label.id)"
                          @change="togglePickerLabel(label.id)"
                        >
                        <span
                          class="ui label tw-text-xs !tw-m-0"
                          :style="{background: '#' + label.color, color: labelTextColor(label.color)}"
                        >{{ label.name }}</span>
                      </label>
                    </div>
                  </div>
                  <div class="tw-flex tw-gap-2 tw-p-2 tw-border-t tw-border-gray-100">
                    <button
                      class="ui mini primary button"
                      :class="{loading: savingLabels}"
                      :disabled="savingLabels"
                      @click="saveLabelChanges"
                    >Apply</button>
                    <button class="ui mini button" :disabled="savingLabels" @click="showLabelPicker = false">Cancel</button>
                  </div>
                </div>

                <!-- Current labels -->
                <div v-if="!issue.labels.length" class="text muted tw-text-sm tw-text-gray-400">None yet</div>
                <div v-else class="tw-flex tw-flex-wrap tw-gap-1">
                  <span
                    v-for="label in issue.labels"
                    :key="label.id"
                    class="ui label tw-text-xs"
                    :style="{background: '#' + label.color, color: labelTextColor(label.color)}"
                  >{{ label.name }}</span>
                </div>
              </div>

              <div class="ui divider tw-my-3"/>

              <!-- ── Assignees ── -->
              <div class="sidebar-item">
                <div class="header tw-font-semibold tw-mb-2 tw-flex tw-justify-between tw-items-center">
                  <span>Assignees</span>
                  <a
                    v-if="canEdit"
                    class="tw-cursor-pointer tw-text-gray-400 hover:tw-text-gray-600"
                    title="Edit assignees"
                    @click.stop="toggleAssigneePicker"
                  >
                    <SvgIcon name="octicon-gear" :size="14"/>
                  </a>
                </div>

                <!-- Assignee picker dropdown -->
                <div
                  v-if="showAssigneePicker"
                  class="tw-border tw-border-gray-200 tw-rounded tw-shadow-lg tw-bg-white tw-mb-3 tw-overflow-hidden"
                  style="z-index:20"
                >
                  <div v-if="collaboratorsLoading" class="tw-p-3 tw-text-center">
                    <div class="ui mini loader active inline"/>
                  </div>
                  <div v-else>
                    <div v-if="!collaborators.length" class="tw-p-3 tw-text-sm tw-text-gray-400 tw-italic">
                      No collaborators found.
                    </div>
                    <div v-else class="tw-max-h-52 tw-overflow-y-auto">
                      <label
                        v-for="collab in collaborators"
                        :key="collab.id"
                        class="tw-flex tw-items-center tw-gap-2 tw-cursor-pointer tw-px-3 tw-py-2 hover:tw-bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          :checked="pickerAssigneeLogins.has(collab.login)"
                          @change="togglePickerAssignee(collab.login)"
                        >
                        <img :src="collab.avatar_url" :alt="collab.login" width="20" height="20" class="ui avatar image">
                        <span class="tw-text-sm">{{ collab.login }}</span>
                      </label>
                    </div>
                  </div>
                  <div class="tw-flex tw-gap-2 tw-p-2 tw-border-t tw-border-gray-100">
                    <button
                      class="ui mini primary button"
                      :class="{loading: savingAssignees}"
                      :disabled="savingAssignees"
                      @click="saveAssigneeChanges"
                    >Apply</button>
                    <button class="ui mini button" :disabled="savingAssignees" @click="showAssigneePicker = false">Cancel</button>
                  </div>
                </div>

                <!-- Current assignees -->
                <div v-if="!issue.assignees || !issue.assignees.length" class="text muted tw-text-sm tw-text-gray-400">None yet</div>
                <div v-else>
                  <div v-for="a in issue.assignees" :key="a.id" class="tw-flex tw-items-center tw-gap-2 tw-mb-1">
                    <img :src="a.avatar_url" :alt="a.login" class="ui avatar image" width="20" height="20">
                    <RouterLink :to="`/${a.login}`" class="tw-text-sm">{{ a.login }}</RouterLink>
                  </div>
                </div>
              </div>

              <div class="ui divider tw-my-3"/>

              <!-- ── Milestone ── -->
              <div class="sidebar-item">
                <div class="header tw-font-semibold tw-mb-2 tw-flex tw-justify-between tw-items-center">
                  <span>Milestone</span>
                  <a
                    v-if="canEdit"
                    class="tw-cursor-pointer tw-text-gray-400 hover:tw-text-gray-600"
                    title="Edit milestone"
                    @click.stop="toggleMilestonePicker"
                  >
                    <SvgIcon name="octicon-gear" :size="14"/>
                  </a>
                </div>

                <!-- Milestone picker dropdown -->
                <div
                  v-if="showMilestonePicker"
                  class="tw-border tw-border-gray-200 tw-rounded tw-shadow-lg tw-bg-white tw-mb-3 tw-overflow-hidden"
                  style="z-index:20"
                >
                  <div v-if="milestonesLoading" class="tw-p-3 tw-text-center">
                    <div class="ui mini loader active inline"/>
                  </div>
                  <div v-else>
                    <div class="tw-max-h-52 tw-overflow-y-auto">
                      <label class="tw-flex tw-items-center tw-gap-2 tw-cursor-pointer tw-px-3 tw-py-2 hover:tw-bg-gray-50">
                        <input type="radio" :value="null" v-model="pickerMilestoneId">
                        <span class="tw-text-sm tw-text-gray-500">No milestone</span>
                      </label>
                      <label
                        v-for="ms in repoMilestones"
                        :key="ms.id"
                        class="tw-flex tw-items-center tw-gap-2 tw-cursor-pointer tw-px-3 tw-py-2 hover:tw-bg-gray-50"
                      >
                        <input type="radio" :value="ms.id" v-model="pickerMilestoneId">
                        <div class="tw-flex-1">
                          <div class="tw-text-sm">{{ ms.title }}</div>
                          <div class="tw-text-xs tw-text-gray-400">{{ ms.open_issues }} open</div>
                        </div>
                      </label>
                      <div v-if="!repoMilestones.length" class="tw-px-3 tw-py-2 tw-text-sm tw-text-gray-400 tw-italic">
                        No milestones defined.
                      </div>
                    </div>
                  </div>
                  <div class="tw-flex tw-gap-2 tw-p-2 tw-border-t tw-border-gray-100">
                    <button
                      class="ui mini primary button"
                      :class="{loading: savingMilestone}"
                      :disabled="savingMilestone"
                      @click="saveMilestoneChange"
                    >Apply</button>
                    <button class="ui mini button" :disabled="savingMilestone" @click="showMilestonePicker = false">Cancel</button>
                  </div>
                </div>

                <!-- Current milestone -->
                <div v-if="issue.milestone">
                  <RouterLink :to="`/${owner}/${repoName}/milestone/${issue.milestone.id}`" class="tw-text-sm">
                    {{ issue.milestone.title }}
                  </RouterLink>
                </div>
                <div v-else class="text muted tw-text-sm tw-text-gray-400">None yet</div>
              </div>

            </div>
          </div>
        </div>
      </template>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import RepoNav from '../components/RepoNav.vue';
import {SvgIcon} from '../../svg.ts';
import {
  getIssue, getIssueComments, getCurrentUser, createIssueComment,
  editIssue, setIssueLabels,
  getRepo, isRepoStarred, starRepo, unstarRepo,
  getRepoLabels, getRepoMilestones, getRepoCollaborators,
  getPullRequest, mergePullRequest,
  type Issue, type PullRequest, type Comment, type User, type Repository, type Label, type Milestone,
} from '../api/index.ts';

const route = useRoute();
const owner = String(route.params.owner);
const repoName = String(route.params.repo);
const issueIndex = Number(route.params.index || route.params.id);
const isPR = route.path.includes('/pulls/');

// ── Core state ─────────────────────────────────────────────────────────────
const loading = ref(true);
const error = ref('');
const notFound = ref(false);
const issue = ref<Issue | null>(null);
const pullRequest = ref<PullRequest | null>(null);
const comments = ref<Comment[]>([]);
const commentsLoading = ref(false);
const currentUser = ref<User | null>(null);
const repo = ref<Repository | null>(null);
const starred = ref(false);
const starLoading = ref(false);

// ── Comment state ───────────────────────────────────────────────────────────
const newComment = ref('');
const submittingComment = ref(false);
const commentError = ref('');

// ── Title editing ───────────────────────────────────────────────────────────
const editingTitle = ref(false);
const newTitle = ref('');
const savingTitle = ref(false);

// ── State toggle (close / reopen) ───────────────────────────────────────────
const closingIssue = ref(false);

// ── PR merge ────────────────────────────────────────────────────────────────
const mergingPR = ref(false);
const mergeError = ref('');

// ── Sidebar picker state ────────────────────────────────────────────────────
const showLabelPicker = ref(false);
const showAssigneePicker = ref(false);
const showMilestonePicker = ref(false);

const repoLabels = ref<Label[]>([]);
const labelsLoading = ref(false);
const collaborators = ref<User[]>([]);
const collaboratorsLoading = ref(false);
const repoMilestones = ref<Milestone[]>([]);
const milestonesLoading = ref(false);

const pickerLabelIds = ref(new Set<number>());
const pickerAssigneeLogins = ref(new Set<string>());
const pickerMilestoneId = ref<number | null>(null);

const savingLabels = ref(false);
const savingAssignees = ref(false);
const savingMilestone = ref(false);

// ── Computed ────────────────────────────────────────────────────────────────
const canEdit = computed(() => currentUser.value !== null);

const stateClass = computed(() => {
  if (isPR && pullRequest.value?.merged) return 'purple';
  return issue.value?.state === 'open' ? 'green' : 'red';
});

const stateIcon = computed(() => {
  if (isPR) {
    if (pullRequest.value?.merged) return 'octicon-git-merge';
    return issue.value?.state === 'open' ? 'octicon-git-pull-request' : 'octicon-git-pull-request-closed';
  }
  return issue.value?.state === 'open' ? 'octicon-issue-opened' : 'octicon-issue-closed';
});

const stateLabel = computed(() => {
  if (isPR && pullRequest.value?.merged) return 'Merged';
  return issue.value?.state === 'open' ? 'Open' : 'Closed';
});

// ── Helpers ─────────────────────────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 2) return 'just now';
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
}

/** Return black or white text colour that contrasts well with the given hex background. */
function labelTextColor(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? '#000000' : '#ffffff';
}

// ── Star toggle ─────────────────────────────────────────────────────────────
async function toggleStar() {
  if (!currentUser.value || starLoading.value) return;
  starLoading.value = true;
  try {
    if (starred.value) {
      await unstarRepo(owner, repoName);
      starred.value = false;
      if (repo.value) repo.value.stars_count = (repo.value.stars_count ?? 1) - 1;
    } else {
      await starRepo(owner, repoName);
      starred.value = true;
      if (repo.value) repo.value.stars_count = (repo.value.stars_count ?? 0) + 1;
    }
  } finally {
    starLoading.value = false;
  }
}

// ── Comment ─────────────────────────────────────────────────────────────────
async function submitComment() {
  if (!newComment.value.trim()) return;
  submittingComment.value = true;
  commentError.value = '';
  try {
    const comment = await createIssueComment(owner, repoName, issueIndex, newComment.value.trim());
    comments.value.push(comment);
    newComment.value = '';
    issue.value!.comments += 1;
  } catch (err) {
    commentError.value = err instanceof Error ? err.message : 'Failed to post comment';
  } finally {
    submittingComment.value = false;
  }
}

// ── Title editing ────────────────────────────────────────────────────────────
function startEditTitle() {
  newTitle.value = issue.value?.title ?? '';
  editingTitle.value = true;
}

function cancelEditTitle() {
  editingTitle.value = false;
}

async function saveTitle() {
  if (!newTitle.value.trim() || !issue.value) return;
  savingTitle.value = true;
  try {
    const updated = await editIssue(owner, repoName, issueIndex, {title: newTitle.value.trim()});
    issue.value.title = updated.title;
    editingTitle.value = false;
  } catch {
    // title edit failed silently; user can try again
  } finally {
    savingTitle.value = false;
  }
}

// ── Close / Reopen ───────────────────────────────────────────────────────────
async function toggleState() {
  if (!issue.value) return;
  closingIssue.value = true;
  const newState: 'open' | 'closed' = issue.value.state === 'open' ? 'closed' : 'open';
  try {
    const updated = await editIssue(owner, repoName, issueIndex, {state: newState});
    issue.value.state = updated.state;
  } catch {
    // state toggle failed silently
  } finally {
    closingIssue.value = false;
  }
}

// ── Merge PR ─────────────────────────────────────────────────────────────────
async function doMergePR() {
  mergingPR.value = true;
  mergeError.value = '';
  try {
    await mergePullRequest(owner, repoName, issueIndex, 'merge');
    // Refresh both issue and PR data to get updated state
    const [updatedIssue, updatedPR] = await Promise.all([
      getIssue(owner, repoName, issueIndex),
      getPullRequest(owner, repoName, issueIndex).catch(() => null),
    ]);
    issue.value = updatedIssue;
    pullRequest.value = updatedPR;
  } catch (err) {
    mergeError.value = err instanceof Error ? err.message : 'Failed to merge pull request';
  } finally {
    mergingPR.value = false;
  }
}

// ── Label picker ─────────────────────────────────────────────────────────────
async function toggleLabelPicker() {
  if (!showLabelPicker.value) {
    // Initialise the picker with current label IDs
    pickerLabelIds.value = new Set((issue.value?.labels ?? []).map((l) => l.id));
    if (!repoLabels.value.length) {
      labelsLoading.value = true;
      try { repoLabels.value = await getRepoLabels(owner, repoName); }
      finally { labelsLoading.value = false; }
    }
  }
  showLabelPicker.value = !showLabelPicker.value;
  showAssigneePicker.value = false;
  showMilestonePicker.value = false;
}

function togglePickerLabel(id: number) {
  const s = new Set(pickerLabelIds.value);
  s.has(id) ? s.delete(id) : s.add(id);
  pickerLabelIds.value = s;
}

async function saveLabelChanges() {
  if (!issue.value) return;
  savingLabels.value = true;
  try {
    const newLabels = await setIssueLabels(owner, repoName, issueIndex, [...pickerLabelIds.value]);
    issue.value.labels = newLabels;
    showLabelPicker.value = false;
  } catch {
    // label save failed
  } finally {
    savingLabels.value = false;
  }
}

// ── Assignee picker ──────────────────────────────────────────────────────────
async function toggleAssigneePicker() {
  if (!showAssigneePicker.value) {
    pickerAssigneeLogins.value = new Set((issue.value?.assignees ?? []).map((a) => a.login));
    if (!collaborators.value.length) {
      collaboratorsLoading.value = true;
      try { collaborators.value = await getRepoCollaborators(owner, repoName); }
      finally { collaboratorsLoading.value = false; }
    }
  }
  showAssigneePicker.value = !showAssigneePicker.value;
  showLabelPicker.value = false;
  showMilestonePicker.value = false;
}

function togglePickerAssignee(login: string) {
  const s = new Set(pickerAssigneeLogins.value);
  s.has(login) ? s.delete(login) : s.add(login);
  pickerAssigneeLogins.value = s;
}

async function saveAssigneeChanges() {
  if (!issue.value) return;
  savingAssignees.value = true;
  try {
    const updated = await editIssue(owner, repoName, issueIndex, {assignees: [...pickerAssigneeLogins.value]});
    issue.value.assignees = updated.assignees;
    showAssigneePicker.value = false;
  } catch {
    // assignee save failed
  } finally {
    savingAssignees.value = false;
  }
}

// ── Milestone picker ─────────────────────────────────────────────────────────
async function toggleMilestonePicker() {
  if (!showMilestonePicker.value) {
    pickerMilestoneId.value = issue.value?.milestone?.id ?? null;
    if (!repoMilestones.value.length) {
      milestonesLoading.value = true;
      try { repoMilestones.value = await getRepoMilestones(owner, repoName); }
      finally { milestonesLoading.value = false; }
    }
  }
  showMilestonePicker.value = !showMilestonePicker.value;
  showLabelPicker.value = false;
  showAssigneePicker.value = false;
}

async function saveMilestoneChange() {
  if (!issue.value) return;
  savingMilestone.value = true;
  try {
    // Gitea API: milestone=0 removes the milestone
    const updated = await editIssue(owner, repoName, issueIndex, {milestone: pickerMilestoneId.value ?? 0});
    issue.value.milestone = updated.milestone;
    showMilestonePicker.value = false;
  } catch {
    // milestone save failed
  } finally {
    savingMilestone.value = false;
  }
}

// ── Mount ────────────────────────────────────────────────────────────────────
onMounted(async () => {
  const user = await getCurrentUser();
  currentUser.value = user;

  const [repoData] = await Promise.all([
    getRepo(owner, repoName).catch(() => null),
    user ? isRepoStarred(owner, repoName).then((s) => { starred.value = s; }).catch(() => {}) : Promise.resolve(),
  ]);
  repo.value = repoData;

  try {
    issue.value = await getIssue(owner, repoName, issueIndex);
    if (isPR) {
      pullRequest.value = await getPullRequest(owner, repoName, issueIndex).catch(() => null);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    notFound.value = msg.includes('404') || msg.toLowerCase().includes('not found');
    error.value = msg;
    loading.value = false;
    return;
  }
  loading.value = false;

  if (issue.value!.comments > 0) {
    commentsLoading.value = true;
    try {
      comments.value = await getIssueComments(owner, repoName, issueIndex);
    } finally {
      commentsLoading.value = false;
    }
  }
});
</script>
