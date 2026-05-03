// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function NewReview(props: Record<string, unknown>) {
  return (<>
<div id="review-box" {...(props.repository?.isArchived ? {"data-tooltip-content": String(i18n("repo.archive.pull.nocomment") ?? "")} : {})}>
	<button className={`ui tiny primary button tw-pr-1 js-btn-review ${(!(props.isShowingAllCommits)) ? `disabled` : ""}`}
		{...(!(props.isShowingAllCommits) ? {"data-tooltip-content": String(i18n("repo.pulls.review_only_possible_for_full_diff") ?? "")} : {})}
		{...(props.repository?.isArchived ? {"disabled": true} : {})}
	>
		{i18n("repo.diff.review")}
		<span className="ui small label review-comments-counter" data-pending-comment-number={String(props.pendingCodeCommentNumber ?? "")}>{props.pendingCodeCommentNumber as any}</span>
		<span className="svg-icon" aria-label="octicon-triangle-down"></span>
	</button>
</div>
{(props.isShowingAllCommits) ? (<>
<div className="review-box-panel tippy-target">
	<div className="ui segment">
		<form className="ui form form-fetch-action" action={`${String(props.issue?.link ?? "")}/files/reviews/submit`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<input type="hidden" name="commit_id" value={String(props.afterCommitID ?? "")} />
			<div className="field flex-text-block">
				<div className="tw-flex-1">{i18n("repo.diff.review.header")}</div>
				<a className="muted close"><span className="svg-icon" aria-label="octicon-x"></span></a>
			</div>
			<div className="field">
				{/* template: shared/combomarkdowneditor */}
			</div>
			{(props.isAttachmentEnabled) ? (<>
				<div className="field">
					{/* template: repo/upload */}
				</div>
			</>) : null}
			<div className="divider"></div>
			{/* $showSelfTooltip */}
			{(!(props.issue?.isClosed)) ? (<>
				{(props.showSelfTooltip) ? (<>
					<span className="tw-inline-block" data-tooltip-content={String(i18n("repo.diff.review.self_approve") ?? "")}>
						<button type="submit" name="type" value="approve" disabled className="ui submit primary tiny button btn-submit">{i18n("repo.diff.review.approve")}</button>
					</span>
				</>) : (<>
					<button type="submit" name="type" value="approve" className="ui submit primary tiny button btn-submit">{i18n("repo.diff.review.approve")}</button>
				</>)}
			</>) : null}
			<button type="submit" name="type" value="comment" className="ui submit tiny basic button btn-submit">{i18n("repo.diff.review.comment")}</button>
			{(!(props.issue?.isClosed)) ? (<>
				{(props.showSelfTooltip) ? (<>
					<span className="tw-inline-block" data-tooltip-content={String(i18n("repo.diff.review.self_reject") ?? "")}>
						<button type="submit" name="type" value="reject" disabled className="ui submit red tiny button btn-submit">{i18n("repo.diff.review.reject")}</button>
					</span>
				</>) : (<>
					<button type="submit" name="type" value="reject" className="ui submit red tiny button btn-submit">{i18n("repo.diff.review.reject")}</button>
				</>)}
			</>) : null}
		</form>
	</div>
</div>
</>) : null}

  </>)
}
