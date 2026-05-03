import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function MilestoneIssues(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository milestone-issue-list">
	{/* template: repo/header */}
	<div className="ui container">
		{/* alert */}
		<div className="flex-text-block tw-flex-wrap tw-mb-2">
			<h1 className="tw-flex-1 tw-m-0">{props.milestone?.name as any}</h1>
			{(!(props.repository?.isArchived)) ? (<>
				<div>
					{((props.canWriteIssues || props.canWritePulls)) ? (<>
						{(props.milestone?.isClosed) ? (<>
							<a className="ui primary basic button link-action" href data-url={`${String(props.repoLink ?? "")}/milestones/${String(props.milestoneID ?? "")}/open`}>{i18n("repo.milestones.open")}
							</a>
						</>) : (<>
							<a className="ui red basic button link-action" href data-url={`${String(props.repoLink ?? "")}/milestones/${String(props.milestoneID ?? "")}/close`}>{i18n("repo.milestones.close")}
							</a>
						</>)}
						<a className="ui button" href={`${String(props.repoLink ?? "")}/milestones/${String(props.milestoneID ?? "")}/edit`}>{i18n("repo.milestones.edit")}</a>
					</>) : null}
					<a className="ui primary button" href={`${String(props.repoLink ?? "")}/issues/new${(props.newIssueChooseTemplate) ? `/choose` : ""}?milestone=${String(props.milestoneID ?? "")}`}>{i18n("repo.issues.new")}</a>
				</div>
			</>) : null}
		</div>
		{(props.milestone?.renderedContent) ? (<>
		<div className="render-content markup tw-mb-4">
				{props.milestone?.renderedContent as any}
		</div>
		</>) : null}
		<div className="tw-flex tw-flex-col tw-gap-2">
			<progress className="milestone-progress-big" value={String(props.milestone?.completeness ?? "")} max="100"></progress>
			<div className="flex-text-block tw-gap-4">
				<div className="flex-text-inline">
					{/* $closedDate */}
					{(props.isClosed) ? (<>
						<span className="svg-icon" aria-label="octicon-clock"></span> {i18n("repo.milestones.closed")}
					</>) : (<>

						{(props.milestone?.deadlineString) ? (<>
							<span{...(props.isOverdue ? {"className": "tw-text-red"} : {})}>
								<span className="svg-icon" aria-label="octicon-calendar"></span>
								{/* TODO: {{DateUtils.AbsoluteShort (.Milestone.DeadlineString|DateUtils.ParseLegacy)}} */}
							</span>
						</>) : (<>
							<span className="svg-icon" aria-label="octicon-calendar"></span>
							{i18n("repo.milestones.no_due_date")}
						</>)}
					</>)}
				</div>
				<div>{i18n("repo.milestones.completeness")}</div>
				{(props.totalTrackedTime) ? (<>
					<div data-tooltip-content='{i18n("tracked_time_summary")}'>
						<span className="svg-icon" aria-label="octicon-clock"></span>
						{props.totalTrackedTime?.("|", "Sec2Hour") as any}
					</div>
				</>) : null}
			</div>
		</div>
		<div className="divider"></div>

		{/* template: repo/issue/filters */}

		{/* template: shared/issuelist */}
	</div>
</div>


  </>)
}
