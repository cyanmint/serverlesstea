import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function ContextMenu(props: Record<string, unknown>) {
  return (<>
<div className="item action ui dropdown jump pointing top right context-dropdown">
	<a className="context-menu muted">
		<span className="svg-icon" aria-label="octicon-kebab-horizontal"></span>
	</a>
	<div className="menu">
		{/* $referenceUrl */}
		{(props.issue) ? (<>
			{/* TODO: {{$referenceUrl = printf "%s#%s" ctx.RootData.Issue.Link .item.HashTag}} */}
		</>) : (<>
			{/* TODO: {{$referenceUrl = printf "%s/files#%s" ctx.RootData.Issue.Link .item.HashTag}} */}
		</>)}
		<div className="item context js-aria-clickable" data-clipboard-text-type="url" data-clipboard-text={String("" ?? "")}>{i18n("repo.issues.context.copy_link")}</div>
		<div className="item context js-aria-clickable" data-clipboard-target={`#${String(props.item?.hashTag ?? "")}-raw`}>{i18n("repo.issues.context.copy_source")}</div>
		{("ctx.RootData.IsSigned") ? (<>
			{/* $needDivider */}
			{(!("ctx.RootData.Repository.IsArchived")) ? (<>
				{/* TODO: {{$needDivider = true}} */}
				<div className={`item context js-aria-clickable quote-reply ${(props.diff) ? `quote-reply-diff` : ""}`} data-target={`${String(props.item?.hashTag ?? "")}-raw`}>{i18n("repo.issues.context.quote_reply")}</div>
				{(!("ctx.Consts.RepoUnitTypeIssues.UnitGlobalDisabled")) ? (<>
					<div className="item context js-aria-clickable reference-issue" data-target={`${String(props.item?.hashTag ?? "")}-raw`} data-modal="#reference-issue-modal" data-poster={String(props.item?.poster?.getDisplayName ?? "")} data-poster-username={String(props.item?.poster?.name ?? "")} data-reference={String("" ?? "")}>{i18n("repo.issues.context.reference_issue")}</div>
				</>) : null}
				{(("ctx.RootData.Permission.IsAdmin" || props.isCommentPoster || "ctx.RootData.HasIssuesOrPullsWritePermission")) ? (<>
					<div className="divider"></div>
					<div className="item context js-aria-clickable edit-content">{i18n("repo.issues.context.edit")}</div>
					{(props.delete) ? (<>
						<div className="item context js-aria-clickable delete-comment" data-comment-id={props.item?.hashTag as any} data-url={`/comments/${String(props.item?.iD ?? "")}/delete`} data-locale={String(i18n("repo.issues.delete_comment_confirm") ?? "")}>{i18n("repo.issues.context.delete")}</div>
					</>) : null}
				</>) : null}
			</>) : null}
			{/* $canUserBlock */}
			{/* $canOrgBlock */}
			{(("$canOrgBlock" || "$canUserBlock")) ? (<>
				{("$needDivider") ? (<>
					<div className="divider"></div>
				</>) : null}
				{("$canUserBlock") ? (<>
				<div className="item context js-aria-clickable show-modal" data-modal="#block-user-modal" data-modal-modal-blockee={String(props.item?.poster?.name ?? "")} data-modal-modal-blockee-name={String(props.item?.poster?.getDisplayName ?? "")} data-modal-modal-form.action={`/user/settings/blocked_users`}>{i18n("user.block.block.user")}</div>
				</>) : null}
				{("$canOrgBlock") ? (<>
				<div className="item context js-aria-clickable show-modal" data-modal="#block-user-modal" data-modal-modal-blockee={String(props.item?.poster?.name ?? "")} data-modal-modal-blockee-name={String(props.item?.poster?.getDisplayName ?? "")} data-modal-modal-form.action={`/settings/blocked_users`}>{i18n("user.block.block.org")}</div>
				</>) : null}
			</>) : null}
		</>) : null}
	</div>
</div>

  </>)
}
