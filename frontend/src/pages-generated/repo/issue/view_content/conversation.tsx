// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Conversation(props: Record<string, unknown>) {
  return (<>
{/* FIXME: DIFF-CONVERSATION-DATA: in the future this template should be refactor to avoid called by {{... "." $}}
At the moment, two kinds of request handler call this template:
* ExcerptBlob -> blob_excerpt.tmpl -> this
* Other compare and diff pages -> ... -> {section_unified.tmpl|section_split.tmpl} -> this)
The variables in "ctx.Data" are different in each case, making this template fragile, hard to read and maintain. */}
{((true /* TODO: len .comments */)) ? (<>
	{/* $comment */}
	{/* $invalid */}
	{/* $resolved */}
	{/* $resolveDoer */}
	{/* $hasReview */}
	{/* $isReviewPending */}
	<div className="ui segments conversation-holder">
		<div className="ui segment collapsible-comment-box tw-py-2 flex-left-right">
			<div className="tw-flex tw-items-center">
				<a href={String("" ?? "")} className="file-comment tw-ml-2 tw-break-anywhere">{/* TODO: {{$comment.TreePath}} */}</a>
				{(props.invalid) ? (<>
					<span className="ui label basic small tw-ml-2" data-tooltip-content={String(i18n("repo.issues.review.outdated_description") ?? "")}>
						{i18n("repo.issues.review.outdated")}
					</span>
				</>) : null}
			</div>
			<div className="tw-flex tw-items-center">
				{((props.invalid || props.resolved)) ? (<>
					<button id={`show-outdated-`} data-comment={String("" ?? "")} className={`${(!(props.resolved)) ? `tw-hidden` : ""} btn tiny show-outdated`}>
						<span className="svg-icon" aria-label="octicon-unfold"></span>
						{(props.resolved) ? (<>
							{i18n("repo.issues.review.show_resolved")}
						</>) : (<>
							{i18n("repo.issues.review.show_outdated")}
						</>)}
					</button>
					<button id={`hide-outdated-`} data-comment={String("" ?? "")} className={`${(props.resolved) ? `tw-hidden ` : ""} btn tiny hide-outdated`}>
						<span className="svg-icon" aria-label="octicon-fold"></span>
						{(props.resolved) ? (<>
							{i18n("repo.issues.review.hide_resolved")}
						</>) : (<>
							{i18n("repo.issues.review.hide_outdated")}
						</>)}
					</button>
				</>) : null}
			</div>
		</div>
		{/* $diff */}
		{(props.diff) ? (<>
			{/* $file */}
			<div id={`code-preview-`} className={`ui table segment${(props.resolved) ? ` tw-hidden` : ""}`}>
				<div className={`diff-file-box file-content `}>
					<div className="file-body file-code code-view code-diff code-diff-unified unicode-escaped">
						<table>
							<tbody>
								{/* template: repo/diff/section_unified */}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>) : null}
		<div id={`code-comments-`} className={`comment-code-cloud ui segment${(props.resolved) ? ` tw-hidden` : ""}`}>
			<div className="ui comments tw-mb-0">
				{((props.comments) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					{/* $createdSubStr */}
					<div className="comment code-comment" id={String(props.hashTag ?? "")}>
						<div className="content comment-container">
							<div className="comment-header">
								<div className="comment-header-left">
									{(!(item.originalAuthor)) ? (<>
										<a className="avatar">
											{/* TODO: {{ctx.AvatarUtils.Avatar .Poster 20}} */}
										</a>
									</>) : null}
									<span className="tw-text-text-light muted-links">
										{(item.originalAuthor) ? (<>
											<span className="tw-text-text">
												{/* TODO: {{svg (MigrationIcon $.Repository.GetOriginalURLHostname)}} */}
												{item.originalAuthor as any}
											</span>
											{(props.repository?.originalURL) ? (<>
											<span className="migrate">({i18n("repo.migrated_from")})</span>
											</>) : null}
										</>) : (<>
											{/* template: shared/user/authorlink */}
										</>)}
										{i18n("repo.issues.commented_at")}
									</span>
								</div>
								<div className="comment-header-right">
									{/* template: repo/issue/view_content/show_role */}
									{(!(props.repository?.isArchived)) ? (<>
										{/* template: repo/issue/view_content/add_reaction */}
										{/* template: repo/issue/view_content/context_menu */}
									</>) : null}
								</div>
							</div>
							<div className="text comment-content">
								<div className="render-content markup" {...((props.permission?.isAdmin || props.hasIssuesOrPullsWritePermission || (props.isSigned && props.signedUserID === item.posterID)) ? {"data-can-edit": "true"} : {})}>
								{(item.renderedContent) ? (<>
									{item.renderedContent as any}
								</>) : (<>
									<span className="no-content">{i18n("repo.issues.no_content")}</span>
								</>)}
								</div>
								<div id={`${String(props.hashTag ?? "")}-raw`} className="raw-content tw-hidden">{item.content as any}</div>
								<div className="edit-content-zone tw-hidden" data-update-url={`${String(props.repoLink ?? "")}/comments/${String(props.iD ?? "")}`} data-content-version={String(props.contentVersion ?? "")} data-context={String(props.repoLink ?? "")} data-attachment-url={`${String(props.repoLink ?? "")}/comments/${String(props.iD ?? "")}/attachments`}></div>
								{(item.attachments) ? (<>
									{/* template: repo/issue/view_content/attachments */}
								</>) : null}
							</div>
							{/* $reactions */}
							{(props.reactions) ? (<>
								{/* template: repo/issue/view_content/reactions */}
							</>) : null}
						</div>
					</div>
				</React.Fragment>))}
			</div>
			<div className="flex-text-block tw-flex-wrap tw-my-2">
				<div className="tw-flex-1">
					{(props.resolved) ? (<>
						<div className="ui grey text">
							<span className="svg-icon" aria-label="octicon-check"></span>
							<b>{/* TODO: {{$resolveDoer.Name}} */}</b> {i18n("repo.issues.review.resolved_by")}
						</div>
					</>) : null}
				</div>
				<div className="flex-text-block">
					{((props.canMarkConversation && props.hasReview && !(props.isReviewPending))) ? (<>
						<button className="ui tiny basic button resolve-conversation" data-origin="timeline" data-action={`${(!(props.resolved)) ? `Resolve` : `UnResolve`}`} data-comment-id={String("" ?? "")} data-update-url={`${String(props.repoLink ?? "")}/issues/resolve_conversation`}>
							{(props.resolved) ? (<>
								{i18n("repo.issues.review.un_resolve_conversation")}
							</>) : (<>
								{i18n("repo.issues.review.resolve_conversation")}
							</>)}
						</button>
					</>) : null}
					{((props.signedUserID && !(props.repository?.isArchived))) ? (<>
						<button className="comment-form-reply ui primary icon tiny button">
							<span className="svg-icon" aria-label="octicon-reply"></span>{i18n("repo.diff.comment.reply")}
						</button>
					</>) : null}
				</div>
			</div>
			{/* template: repo/diff/comment_form_datahandler */}
		</div>
	</div>
</>) : (<>
	{/* template: repo/diff/conversation_outdated */}
</>)}

  </>)
}
