import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function PullMergeBox(props: Record<string, unknown>) {
  return (<>
{/* $data */}
{(props.data?.showMergeBox) ? (<>
<div className="timeline-item comment pull-merge-box"
	data-global-init="initRepoPullMergeBox"
	{(props.data?.reloadingInterval) ? (<>
		data-pull-merge-box-reloading-interval={String("" ?? "")}
		data-pull-link={String(props.issue?.link ?? "")}
	</>) : null}
>
	{/* $statusCheckData */}
	{/* $requiredStatusCheckState */}
	<div className={`timeline-avatar ${(props.issue?.pullRequest?.hasMerged) ? `tw-text-purple
	tw-text-text-light
	tw-text-text-light
	tw-text-text-light
	tw-text-red
	tw-text-red
	tw-text-red
	tw-text-red
	tw-text-red
	tw-text-red
	tw-text-red
	tw-text-yellow
	tw-text-red
	tw-text-yellow
	tw-text-text-light
	tw-text-green
	` : `tw-text-red`}`}><span className="svg-icon" aria-label="octicon-git-merge"></span></div>
	<div className="content">
		{(props.latestCommitStatus) ? (<>
		<div className="ui attached segment fitted">
		{/* template: repo/pulls/status */}
		</div>
		</>) : null}
		{/* $showGeneralMergeForm */}
		<div className={`ui attached segment merge-section ${(!(props.latestCommitStatus)) ? `avatar-content-left-arrow` : ""} flex-items-block`}>
			{(props.issue?.pullRequest?.hasMerged) ? (<>
				{(props.isPullBranchDeletable) ? (<>
					<div className="item item-section text tw-flex-1">
						<div className="item-section-left">
							<h3 className="tw-mb-2">
								{i18n("repo.pulls.merged_success")}
							</h3>
							<div className="merge-section-info">
								{i18n("repo.pulls.merged_info_text")}
							</div>
						</div>
						<div className="item-section-right">
							<button className="ui button link-action delete-branch-after-merge" data-url={String(props.deleteBranchLink ?? "")}>{i18n("repo.branch.delete_html")}</button>
						</div>
					</div>
				</>) : null}
			</>) : null} {(props.issue?.isClosed) ? (<>
				<div className="item item-section text tw-flex-1">
					<div className="item-section-left">
						<h3 className="tw-mb-2">{i18n("repo.pulls.closed")}</h3>
						<div className="merge-section-info">
							{(props.isPullRequestBroken) ? (<>
								{i18n("repo.pulls.cant_reopen_deleted_branch")}
							</>) : (<>
								{i18n("repo.pulls.reopen_to_merge")}
							</>)}
						</div>
					</div>
					{((props.isPullBranchDeletable && !(props.isPullRequestBroken))) ? (<>
						<div className="item-section-right">
							<button className="ui button link-action delete-branch-after-merge" data-url={String(props.deleteBranchLink ?? "")}>{i18n("repo.branch.delete_html")}</button>
						</div>
					</>) : null}
				</div>
			</>) : null} {(props.isPullFilesConflicted) ? (<>
				<div className="item">
					<span className="svg-icon" aria-label="octicon-x"></span>
					{i18n("repo.pulls.files_conflicted")}
				</div>
				<ul>
					{((props.conflictedFiles) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<li>{item as any}</li>
					{/* else */}
					<li>{i18n("repo.pulls.files_conflicted_no_listed_files")}</li>
					</React.Fragment>))}
				</ul>
			</>) : null} {(props.isPullRequestBroken) ? (<>
				<div className="item">
					<span className="svg-icon" aria-label="octicon-x"></span>
					{i18n("repo.pulls.data_broken")}
				</div>
			</>) : null} {(props.isPullWorkInProgress) ? (<>
				<div className="item">
					<div className="item-section-left flex-text-inline tw-flex-1">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{i18n("repo.pulls.cannot_merge_work_in_progress")}
					</div>
					{((props.hasIssuesOrPullsWritePermission || props.isIssuePoster)) ? (<>
						<button className="ui compact button" data-global-init="initPullRequestWipToggle" data-title={String(props.issue?.title ?? "")} data-wip-prefix={String(props.workInProgressPrefix ?? "")} data-update-url={`${String(props.issue?.link ?? "")}/title`}>
							{i18n("repo.pulls.remove_prefix")}
						</button>
					</>) : null}
				</div>
				{/* template: repo/issue/view_content/update_branch_by_merge */}
			</>) : null} {(props.issue?.pullRequest?.isChecking) ? (<>
				<div className="item">
					<span className="svg-icon" aria-label="gitea-running"></span>
					{i18n("repo.pulls.is_checking")}
				</div>
			</>) : null} {(props.issue?.pullRequest?.isAncestor) ? (<>
				<div className="item">
					<span className="svg-icon" aria-label="octicon-alert"></span>
					{i18n("repo.pulls.is_ancestor")}
				</div>
			</>) : null} {((props.issue?.pullRequest?.isStatusMergeable || props.issue?.pullRequest?.isEmpty)) ? (<>
				{(props.isBlockedByApprovals) ? (<>
					<div className="item">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{(props.requireApprovalsWhitelist) ? (<>
							{i18n("repo.pulls.blocked_by_approvals_whitelisted")}
						</>) : (<>
							{i18n("repo.pulls.blocked_by_approvals")}
						</>)}
					</div>
				</>) : null} {(props.isBlockedByRejection) ? (<>
					<div className="item">
						<span className="svg-icon" aria-label="octicon-x"></span>
					{i18n("repo.pulls.blocked_by_rejection")}
					</div>
				</>) : null} {(props.isBlockedByOfficialReviewRequests) ? (<>
					<div className="item">
						<span className="svg-icon" aria-label="octicon-x"></span>
					{i18n("repo.pulls.blocked_by_official_review_requests")}
					</div>
				</>) : null} {(props.isBlockedByOutdatedBranch) ? (<>
					<div className="item">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{i18n("repo.pulls.blocked_by_outdated_branch")}
					</div>
				</>) : null} {(props.isBlockedByChangedProtectedFiles) ? (<>
					<div className="item">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{/* TODO: {{ctx.Locale.TrN $.ChangedProtectedFilesNum "repo.pulls.blocked_by_changed_protected_files_1" "repo.pulls.blocked_by_changed_protected_files_n"}} */}
					</div>
					<ul>
						{((props.changedProtectedFiles) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<li>{item as any}</li>
						</React.Fragment>))}
					</ul>
				</>) : null} {((props.enableStatusCheck && (props.requiredStatusCheckState?.isError || props.requiredStatusCheckState?.isFailure))) ? (<>
					<div className="item">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{i18n("repo.pulls.required_status_check_failed")}
					</div>
				</>) : null} {((props.enableStatusCheck && !(props.requiredStatusCheckState?.isSuccess))) ? (<>
					<div className="item">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{i18n("repo.pulls.required_status_check_missing")}
					</div>
				</>) : null} {((props.allowMerge && props.requireSigned && !(props.willSign))) ? (<>
					<div className="item">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{i18n("repo.pulls.require_signed_wont_sign")}
					</div>
					<div className="item">
						<span className="svg-icon" aria-label="octicon-unlock"></span>
						{/* TODO: {{ctx.Locale.Tr (printf "repo.signing.wont_sign.%s" .WontSignReason)}} */}
					</div>
				</>) : null}

				{/* $notAllOverridableChecksOk */}
				{/* $canMergeNow */}

				{(props.canMergeNow) ? (<>
					{(props.notAllOverridableChecksOk) ? (<>
						<div className="item">
							<span className="svg-icon" aria-label="octicon-dot-fill"></span>
							{i18n("repo.pulls.required_status_check_administrator")}
						</div>
					</>) : (<>
						<div className="item">
							<span className="svg-icon" aria-label="octicon-check"></span>
							{i18n("repo.pulls.can_auto_merge_desc")}
						</div>
					</>)}
					{(props.willSign) ? (<>
						<div className="item">
							<span className="svg-icon" aria-label="octicon-lock"></span>
							{i18n("repo.signing.will_sign")}
						</div>
					</>) : null} {(props.isSigned) ? (<>
						<div className="item">
							<span className="svg-icon" aria-label="octicon-unlock"></span>
							{/* TODO: {{ctx.Locale.Tr (printf "repo.signing.wont_sign.%s" .WontSignReason)}} */}
						</div>
					</>) : null}
				</>) : null}

				{/* template: repo/issue/view_content/update_branch_by_merge */}

				{(props.issue?.pullRequest?.isEmpty) ? (<>
					<div className="divider"></div>
					<div className="item">
						<span className="svg-icon" aria-label="octicon-alert"></span>
						{i18n("repo.pulls.is_empty")}
					</div>
				</>) : null}

				{(props.allowMerge) ? (<> {/* user is allowed to merge */}
					{(props.data?.mergeFormProps) ? (<>
						<div className="divider"></div>
						{/* TODO: {{$showGeneralMergeForm = true}} */}
						{/* The merge form is a Vue component. After mounted, it has a button for choosing merge style, so make it have min-height to avoid layout shifting */}
						<div id="pull-request-merge-form" className="tw-min-h-[40px]" data-merge-form-props={String("" ?? "")}></div>
					</>) : (<>
						{/* no merge style was set in repo setting: not or ($prUnit.PullRequestsConfig.AllowMerge ...) */}
						<div className="divider"></div>
						<div className="item tw-text-red">
							<span className="svg-icon" aria-label="octicon-x"></span>
							{i18n("repo.pulls.no_merge_desc")}
						</div>
						<div className="item">
							<span className="svg-icon" aria-label="octicon-info"></span>
							{i18n("repo.pulls.no_merge_helper")}
						</div>
					</>)} {/* end if the repo was set to use any merge style */}
				</>) : (<>
					{/* user is not allowed to merge */}
					<div className="divider"></div>
					<div className="item">
						<span className="svg-icon" aria-label="octicon-info"></span>
						{i18n("repo.pulls.no_merge_access")}
					</div>
				</>)} {/* end if user is allowed to merge or not */}
			</>) : (<>
				{/* Merge conflict without specific file. Suggest manual merge, only if all reviews and status checks OK. */}
				{(props.isBlockedByApprovals) ? (<>
					<div className="item tw-text-red">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{i18n("repo.pulls.blocked_by_approvals")}
					</div>
				</>) : null} {(props.isBlockedByRejection) ? (<>
					<div className="item tw-text-red">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{i18n("repo.pulls.blocked_by_rejection")}
					</div>
				</>) : null} {(props.isBlockedByOfficialReviewRequests) ? (<>
					<div className="item tw-text-red">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{i18n("repo.pulls.blocked_by_official_review_requests")}
					</div>
				</>) : null} {(props.isBlockedByOutdatedBranch) ? (<>
					<div className="item tw-text-red">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{i18n("repo.pulls.blocked_by_outdated_branch")}
					</div>
				</>) : null} {(props.isBlockedByChangedProtectedFiles) ? (<>
					<div className="item tw-text-red">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{/* TODO: {{ctx.Locale.TrN $.ChangedProtectedFilesNum "repo.pulls.blocked_by_changed_protected_files_1" "repo.pulls.blocked_by_changed_protected_files_n"}} */}
					</div>
					<ul>
						{((props.changedProtectedFiles) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<li>{item as any}</li>
						</React.Fragment>))}
					</ul>
				</>) : null} {((props.enableStatusCheck && !(props.requiredStatusCheckState?.isSuccess))) ? (<>
					<div className="item tw-text-red">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{i18n("repo.pulls.required_status_check_failed")}
					</div>
				</>) : null} {((props.requireSigned && !(props.willSign))) ? (<>
					<div className="item tw-text-red">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{i18n("repo.pulls.require_signed_wont_sign")}
					</div>
				</>) : (<>
					<div className="item tw-text-red">
						<span className="svg-icon" aria-label="octicon-x"></span>
						{i18n("repo.pulls.cannot_auto_merge_desc")}
					</div>
					<div className="item">
						<span className="svg-icon" aria-label="octicon-info"></span>
						{i18n("repo.pulls.cannot_auto_merge_helper")}
					</div>
				</>)}
			</>)}{/* end if: pull request status */}

			{/* Manually Merged is not a well-known feature, it is used to mark a non-mergeable PR (already merged, conflicted) as merged
			To test it:
			* Enable "Manually Merged" feature in the Repository Settings
			* Create a pull request, either:
			* - Merge the pull request branch locally and push the merged commit to Gitea
			* - Make some conflicts between the base branch and the pull request branch
			* Then the Manually Merged form will be shown in the merge form */}
			{((props.stillCanManualMerge && !(props.showGeneralMergeForm))) ? (<>
				<div className="divider"></div>
				<form className="ui form form-fetch-action" action={`${String(props.issue?.link ?? "")}/merge`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>{/* another similar form is in PullRequestMergeForm.vue */}
					<div className="field">
						<input type="text" name="merge_commit_id" placeholder={String(i18n("repo.pulls.merge_commit_id") ?? "")} />
					</div>
					<button className="ui red button" type="submit" name="do" value="manually-merged">
						{i18n("repo.pulls.merge_manually")}
					</button>
				</form>
			</>) : null}

			{(props.data?.showPullCommands) ? (<>
				{/* template: repo/issue/view_content/pull_merge_instruction */}
			</>) : null}
		</div>
	</div>
</div>
</>) : null}

  </>)
}
