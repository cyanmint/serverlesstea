// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ViewContent(props: Record<string, unknown>) {
  return (<>
<div className="issue-content">
	{/* $createdStr */}
	<div className="issue-content-left comment-list prevent-before-timeline">
		<div className="ui timeline">
			<div id={String(props.issue?.hashTag ?? "")} className="timeline-item comment first">
				{(props.issue?.originalAuthor) ? (<>
				<span className="timeline-avatar">
					{/* TODO: {{ctx.AvatarUtils.Avatar nil 40}} */}
				</span>
				</>) : (<>
				<a className="timeline-avatar" {...(props.issue?.poster?.iD > 0 ? {"href": String(props.issue?.poster?.homeLink ?? "")} : {})}>
					{/* TODO: {{ctx.AvatarUtils.Avatar .Issue.Poster 40}} */}
				</a>
				</>)}
				<div className="content comment-container">
					<div className="comment-header avatar-content-left-arrow" role="heading" aria-level="3">
						<div className="comment-header-left">
							{(props.issue?.originalAuthor) ? (<>
								<span className="tw-text-text tw-font-semibold">
									{/* TODO: {{svg (MigrationIcon .Repository.GetOriginalURLHostname)}} */}
									{props.issue?.originalAuthor as any}
								</span>
								<span className="tw-text-text-light muted-links">
									{i18n("repo.issues.commented_at")}
								</span>
								<span className="text migrate">
									{(props.repository?.originalURL) ? (<> ({i18n("repo.migrated_from")})</>) : null}
								</span>
							</>) : (<>
								<a className="inline-timeline-avatar" href={String(props.issue?.poster?.homeLink ?? "")}>
									{/* TODO: {{ctx.AvatarUtils.Avatar .Issue.Poster 24}} */}
								</a>
								<span className="tw-text-text-light muted-links">
									{/* template: shared/user/authorlink */}
									{i18n("repo.issues.commented_at")}
								</span>
							</>)}
						</div>
						<div className="comment-header-right">
							{/* template: repo/issue/view_content/show_role */}
							{(!(props.repository?.isArchived)) ? (<>
								{/* template: repo/issue/view_content/add_reaction */}
							</>) : null}
							{/* template: repo/issue/view_content/context_menu */}
						</div>
					</div>
					<div className="ui attached segment comment-body" role="article">
						<div className="render-content markup" {...((props.permission?.isAdmin || props.hasIssuesOrPullsWritePermission || props.isIssuePoster) ? {"data-can-edit": "true"} : {})}>
							{(props.issue?.renderedContent) ? (<>
								{props.issue?.renderedContent as any}
							</>) : (<>
								<span className="no-content">{i18n("repo.issues.no_content")}</span>
							</>)}
						</div>
						<div id={`${String(props.issue?.hashTag ?? "")}-raw`} className="raw-content tw-hidden">{props.issue?.content as any}</div>
						<div className="edit-content-zone tw-hidden" data-update-url={`${String(props.repoLink ?? "")}/issues/${String(props.issue?.index ?? "")}/content`} data-content-version={String(props.issue?.contentVersion ?? "")} data-context={String(props.repoLink ?? "")} data-attachment-url={`${String(props.repoLink ?? "")}/issues/${String(props.issue?.index ?? "")}/attachments`} data-view-attachment-url={`${String(props.repoLink ?? "")}/issues/${String(props.issue?.index ?? "")}/view-attachments`}></div>
						{(props.issue?.attachments) ? (<>
							{/* template: repo/issue/view_content/attachments */}
						</>) : null}
					</div>
					{/* $reactions */}
					{(props.reactions) ? (<>
						{/* template: repo/issue/view_content/reactions */}
					</>) : null}
				</div>
			</div>

			{/* template: repo/issue/view_content/comments */}
			<div className="timeline-item tw-hidden" id="timeline-comments-end"></div>

			{((props.issue?.isPull && !(props.repository?.isArchived))) ? (<>
				{/* template: repo/issue/view_content/pull_merge_box */}
			</>) : null}

			{(props.isSigned) ? (<>
				{(((props.isRepoAdmin || props.hasIssuesOrPullsWritePermission || !(props.issue?.isLocked)) && !(props.repository?.isArchived))) ? (<>
				<div className="timeline-item comment form">
					<a className="timeline-avatar" href={String(props.signedUser?.homeLink ?? "")}>
						{/* TODO: {{ctx.AvatarUtils.Avatar .SignedUser 40}} */}
					</a>
					<div className="content">
						<div className="ui segment avatar-content-left-arrow">
							<form className="ui form form-fetch-action" id="comment-form" action={`${String(props.repoLink ?? "")}/issues/${String(props.issue?.index ?? "")}/comments`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
								{/* template: repo/issue/comment_tab */}
								<div className="field footer">
									<div className="flex-text-block tw-justify-end">
										{(((props.hasIssuesOrPullsWritePermission || props.isIssuePoster) && !(props.disableStatusChange))) ? (<>
											{/* $btnIconColor */}{/* $btnIcon */}{/* $btnTextNoComment */}{/* $btnTextWithComment */}{/* $btnValue */}
											{(props.issue?.isClosed) ? (<>
												{/* TODO: {{$btnValue = "reopen"}} */}
												{/* TODO: {{$btnIconColor = "tw-text-green"}} */}
												{/* TODO: {{$btnIcon = Iif .Issue.IsPull "octicon-git-pull-request" "octicon-issue-reopened"}} */}
												{/* TODO: {{$btnTextNoComment = ctx.Locale.Tr (Iif .Issue.IsPull "repo.pulls.reopen" "repo.issues.reopen_issue")}} */}
												{/* TODO: {{$btnTextWithComment = ctx.Locale.Tr "repo.issues.reopen_comment_issue"}} */}{/* general: Reopen with Comment */}
											</>) : (<>
												{/* TODO: {{$btnValue = "close"}} */}
												{/* TODO: {{$btnIconColor = "tw-text-red"}} */}
												{/* TODO: {{$btnIcon = Iif .Issue.IsPull "octicon-git-pull-request-closed" "octicon-issue-closed"}} */}
												{/* TODO: {{$btnTextNoComment = ctx.Locale.Tr (Iif .Issue.IsPull "repo.pulls.close" "repo.issues.close")}} */}
												{/* TODO: {{$btnTextWithComment = ctx.Locale.Tr "repo.issues.close_comment_issue"}} */}{/* general: Close with Comment */}
											</>)}
											<button id="status-button" className="ui button" data-status={String("" ?? "")} data-status-and-comment={String("" ?? "")} name="status" value={String("" ?? "")}>
												<span className={`status-button-icon `}>{/* TODO: {{svg $btnIcon}} */}</span>
												<span className="status-button-text">{props.btnTextNoComment as any}</span>
											</button>
										</>) : null}
										<button id="comment-button" className="ui primary button">
											{i18n("repo.issues.create_comment")}
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				</>) : null} {(props.repository?.isArchived) ? (<>
					<div className="ui warning message tw-text-center">
						{(props.issue?.isPull) ? (<>
							{i18n("repo.archive.pull.nocomment")}
						</>) : (<>
							{i18n("repo.archive.issue.nocomment")}
						</>)}
					</div>
				</>) : null}
			</>) : (<> {/* not .IsSigned */}
				{(props.repository?.isArchived) ? (<>
					<div className="ui warning message tw-text-center">
						{(props.issue?.isPull) ? (<>
							{i18n("repo.archive.pull.nocomment")}
						</>) : (<>
							{i18n("repo.archive.issue.nocomment")}
						</>)}
					</div>
				</>) : (<>
					<div className="ui warning message">
						{i18n("repo.issues.sign_in_require_desc")}
					</div>
				</>)}
			</>)}{/* end if: .IsSigned */}
		</div>
	</div>

	{/* template: repo/issue/view_content/sidebar */}
</div>

<template id="issue-comment-editor-template">
	<form className="ui form comment">
		<div className="field">
			{/* template: shared/combomarkdowneditor */}
		</div>

		{(props.isAttachmentEnabled) ? (<>
			<div className="field">
				{/* template: repo/upload */}
			</div>
		</>) : null}

		<div className="field">
			<div className="flex-text-block tw-justify-end">
				<button type="button" className="ui cancel button">{i18n("repo.issues.cancel")}</button>
				<button type="submit" className="ui primary button">{i18n("repo.issues.save")}</button>
			</div>
		</div>
	</form>
</template>

{/* template: repo/issue/view_content/reference_issue_dialog */}
{/* template: shared/user/block_user_dialog */}

<div className="ui g-modal-confirm delete modal">
	<div className="header">
		<span className="svg-icon" aria-label="octicon-trash"></span>
		{i18n("repo.branch.delete")}
	</div>
	<div className="content">
		<p>{i18n("repo.branch.delete_desc")}</p>
	</div>
	{/* template: base/modal_actions_confirm */}
</div>

  </>)
}
