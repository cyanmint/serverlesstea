// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Conversation(props: Record<string, unknown>) {
  return (<>
{("len .comments") ? (<>
	{/* $comment */}
	{/* $resolved */}
	{/* $invalid */}
	{/* $resolveDoer */}
	{/* $hasReview */}
	{/* $isReviewPending */}
	{/* $referenceUrl */}
	<div className="conversation-holder" data-path={String("" ?? "")} data-side={`${(props.comment?.line < 0) ? `left` : `right`}`} data-idx={String("" ?? "")}>
		{(props.resolved) ? (<>
			<div className="resolved-placeholder">
				<div className="flex-text-block tw-flex-wrap tw-text-text-light">
					<span className="svg-icon" aria-label="octicon-check"></span>
					<b>{/* TODO: {{$resolveDoer.Name}} */}</b> {i18n("repo.issues.review.resolved_by")}
					{(props.invalid) ? (<>
						{/* We only handle the case $resolved=true and $invalid=true in this template because if the comment is not resolved it has the outdated label in the comments area (not the header above).
						The case $resolved=false and $invalid=true is handled in repo/diff/comments.tmpl */}
						<a href={String("" ?? "")} className="ui label basic small tw-ml-2" data-tooltip-content={String(i18n("repo.issues.review.outdated_description") ?? "")}>
							{i18n("repo.issues.review.outdated")}
						</a>
					</>) : null}
				</div>
				<div className="flex-text-block">
					<button id={`show-outdated-`} data-comment={String("" ?? "")} className="btn tiny show-outdated">
						<span className="svg-icon" aria-label="octicon-unfold"></span>{i18n("repo.issues.review.show_resolved")}
					</button>
					<button id={`hide-outdated-`} data-comment={String("" ?? "")} className="btn tiny hide-outdated tw-hidden">
						<span className="svg-icon" aria-label="octicon-fold"></span>{i18n("repo.issues.review.hide_resolved")}
					</button>
				</div>
			</div>
		</>) : null}
		<div id={`code-comments-`} className={`field comment-code-cloud ${(props.resolved) ? `tw-hidden` : ""}`}>
			<div className="comment-list">
				<div className="ui comments">
					{/* template: repo/diff/comments */}
				</div>
			</div>
			<div className="flex-text-block tw-mt-2 tw-flex-wrap tw-justify-end">
				<div className="ui buttons">
					<button className="ui icon tiny basic button previous-conversation">
						<span className="svg-icon" aria-label="octicon-arrow-up"></span> {i18n("repo.issues.previous")}
					</button>
					<button className="ui icon tiny basic button next-conversation">
						<span className="svg-icon" aria-label="octicon-arrow-down"></span> {i18n("repo.issues.next")}
					</button>
				</div>
				{((props.canMarkConversation && props.hasReview && !(props.isReviewPending))) ? (<>
					<button className="ui icon tiny basic button resolve-conversation" data-origin="diff" data-action={`${(!(props.resolved)) ? `Resolve` : `UnResolve`}`} data-comment-id={String("" ?? "")} data-update-url={`${String(props.repoLink ?? "")}/issues/resolve_conversation`}>
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
			{/* template: repo/diff/comment_form_datahandler */}
		</div>
	</div>
</>) : (<>
	{/* template: repo/diff/conversation_outdated */}
</>)}

  </>)
}
