import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function ReviewerList(props: Record<string, unknown>) {
  return (<>
{/* $pageMeta */}
{/* $data */}
{/* $repoOwnerName */}
{/* $hasCandidates */}
<div className="issue-sidebar-combo" data-selection-mode="multiple" data-update-algo="diff"
		{("$pageMeta.Issue") ? (<>data-update-url={`/issues/request_review?issue_ids=`}</>) : null}
>
	<input type="hidden" className="combo-value" name="reviewer_ids" />{/* match CreateIssueForm */}
	<div className={`ui dropdown full-width ${((!("$hasCandidates") || !("$data.CanChooseReviewer"))) ? `disabled` : ""}`}>
		<a className="fixed-text muted">
			<strong>{i18n("repo.issues.review.reviewers")}</strong> {("$data.CanChooseReviewer") ? (<><span className="svg-icon" aria-label="octicon-gear"></span></>) : null}
		</a>
		<div className="menu flex-items-menu">
			{("$hasCandidates") ? (<>
				<div className="ui icon search input">
					<i className="icon"><span className="svg-icon" aria-label="octicon-search"></span></i>
					<input type="text" placeholder={String(i18n("repo.issues.filter_reviewers") ?? "")} />
				</div>
			</>) : null}
			<div className="scrolling menu flex-items-menu">
				{(($data.Reviewers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					{(item.user) ? (<>
						<a className={`item muted ${(props.requested) ? `checked` : ""}`} href={String(props.user?.homeLink ?? "")} data-value={String(props.itemID ?? "")} data-can-change={String(props.canChange ?? "")}
							{(!(item.canChange)) ? (<>data-tooltip-content={String(i18n("repo.issues.remove_request_review_block") ?? "")}</>) : null}>
							<span className="item-check-mark"><span className="svg-icon" aria-label="octicon-check"></span></span>
							{/* TODO: {{ctx.AvatarUtils.Avatar .User 20}} */} {/* template: repo/search_name */}
						</a>
					</>) : null}
				</React.Fragment>))}
				{("$data.TeamReviewers") ? (<>
					{("$data.Reviewers") ? (<><div className="divider"></div></>) : null}
					{(($data.TeamReviewers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						{(item.team) ? (<>
							<a className={`item muted ${(props.requested) ? `checked` : ""}`} href="#" data-value={String(props.itemID ?? "")} data-can-change={String(props.canChange ?? "")}
								{(!(item.canChange)) ? (<> data-tooltip-content={String(i18n("repo.issues.remove_request_review_block") ?? "")}</>) : null}>
								<span className="item-check-mark"><span className="svg-icon" aria-label="octicon-check"></span></span>
								<span className="svg-icon" aria-label="octicon-people"></span> {/* $repoOwnerName */}/{item.team?.name as any}
							</a>
						</>) : null}
					</React.Fragment>))}
				</>) : null}
			</div>
		</div>
	</div>

	<div className="ui relaxed list flex-items-block">
		<span className={`item empty-list ${(("$data.OriginalReviews" || "$data.CurrentPullReviewers")) ? `tw-hidden` : ""}`}>
			{i18n("repo.issues.new.no_reviewers")}
		</span>
		{(($data.CurrentPullReviewers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item">
				<div className="flex-text-inline tw-flex-1">
					{(item.user) ? (<>
						<a className="muted flex-text-inline tw-gap-2" href={String(props.user?.homeLink ?? "")}>{/* TODO: {{ctx.AvatarUtils.Avatar .User 20}} */} {item.user?.getDisplayName as any}</a>
					</>) : null} {(item.team) ? (<>
						<span className="flex-text-inline tw-gap-2"><span className="svg-icon" aria-label="octicon-people"></span> {/* $repoOwnerName */}/{item.team?.name as any}</span>
					</>) : null}
				</div>
				<div className="flex-text-inline">
					{(item.canBeDismissed) ? (<>
						<a href="#" className="ui muted icon show-modal" data-tooltip-content={String(i18n("repo.issues.dismiss_review") ?? "")}
							data-modal="#issue-sidebar-dismiss-review-modal" data-modal-reviewer-id={String(props.review?.iD ?? "")}>
							<span className="svg-icon" aria-label="octicon-x"></span>
						</a>
					</>) : null}
					{(item.review?.stale) ? (<>
						<span data-tooltip-content={String(i18n("repo.issues.is_stale") ?? "")}><span className="svg-icon" aria-label="octicon-hourglass"></span></span>
					</>) : null}
					{((item.canChange && "$data.CanChooseReviewer")) ? (<>
						{(item.requested) ? (<>
							<a href="#" className="ui muted icon link-action"
								data-tooltip-content={String(i18n("repo.issues.remove_request_review") ?? "")}
								data-url={`/issues/request_review?action=detach&issue_ids=&id=${String(props.itemID ?? "")}`}>
								<span className="svg-icon" aria-label="octicon-trash"></span>
							</a>
						</>) : (<>
							<a href="#" className="ui muted icon link-action"
								data-tooltip-content={String(i18n("repo.issues.re_request_review") ?? "")}
								data-url={`/issues/request_review?action=attach&issue_ids=&id=${String(props.itemID ?? "")}`}>
								<span className="svg-icon" aria-label="octicon-sync"></span>
							</a>
						</>)}
					</>) : null}
					<span {(item.review?.tooltipContent) ? (<>data-tooltip-content={String("" ?? "")}</>) : null}>
						{/* TODO: {{svg (printf "octicon-%s" .Review.Type.Icon) 16 .Review.HTMLTypeColorClass}} */}
					</span>
				</div>
			</div>
		</React.Fragment>))}
		{(($data.OriginalReviews) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item">
				<div className="flex-text-inline tw-flex-1">
					{/* $originalURLHostname */}
					{/* $originalURL */}
					<a className="muted flex-text-inline tw-gap-2" href={String("" ?? "")} data-tooltip-content={String(i18n("repo.migrated_from_fake") ?? "")}>
						{/* TODO: {{svg (MigrationIcon $originalURLHostname) 20}} */} {item.originalAuthor as any}
					</a>
				</div>
				<div className="flex-text-inline">
					<span {(item.tooltipContent) ? (<>data-tooltip-content={String("" ?? "")}</>) : null}>
						{/* TODO: {{svg (printf "octicon-%s" .Type.Icon) 16 .HTMLTypeColorClass}} */}
					</span>
				</div>
			</div>
		</React.Fragment>))}
	</div>

	{("$data.CurrentPullReviewers") ? (<>
	<div className="ui small modal" id="issue-sidebar-dismiss-review-modal">
		<div className="header">
			{i18n("repo.issues.dismiss_review")}
		</div>
		<div className="content">
			<div className="ui warning message">
				{i18n("repo.issues.dismiss_review_warning")}
			</div>
			<form className="ui form" action={`/issues/dismiss_review`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<input type="hidden" className="reviewer-id" name="review_id" />
				<div className="field">
					<label htmlFor="issue-sidebar-dismiss-review-message">{i18n("action.review_dismissed_reason")}</label>
					<input id="issue-sidebar-dismiss-review-message" name="message" />
				</div>
				<div className="actions">
					<button className="ui cancel button">{i18n("settings.cancel")}</button>
					<button className="ui red button" type="submit">{i18n("ok")}</button>
				</div>
			</form>
		</div>
	</div>
	</>) : null}
</div>

  </>)
}
