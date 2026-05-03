import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository issue-list">
	{/* template: repo/header */}
	<div className="ui container">
	{/* alert */}

	{/* template: repo/code/recently_pushed_new_branches */}

	{(props.pinnedIssues) ? (<>
		<div id="issue-pins" {...(props.isRepoAdmin ? {"data-is-repo-admin": true} : {})}>
			{((props.pinnedIssues) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className={`issue-card tw-break-anywhere ${(props.isRepoAdmin) ? `tw-cursor-grab` : ""}`} data-move-url={`${String(props.link ?? "")}/move_pin`} data-issue-id={String(props.iD ?? "")}>
					{/* template: repo/issue/card */}
				</div>
			</React.Fragment>))}
		</div>
	</>) : null}

		<div className="list-header flex-text-block">
			{/* template: repo/issue/search */}
			<a className="ui small button" href={`${String(props.repoLink ?? "")}/labels`}>{i18n("repo.labels")}</a>
			<a className="ui small button" href={`${String(props.repoLink ?? "")}/milestones`}>{i18n("repo.milestones")}</a>
			{(!(props.repository?.isArchived)) ? (<>
				{(props.pageIsIssueList) ? (<>
					<a className="ui small primary button issue-list-new" href={`${String(props.repoLink ?? "")}/issues/new${(props.newIssueChooseTemplate) ? `/choose` : ""}`}>{i18n("repo.issues.new")}</a>
				</>) : (<>
					<a className={`ui small primary button new-pr-button issue-list-new ${(!(props.pullRequestCtx?.canCreateNewPull)) ? `disabled` : ""}`} href={String(props.pullRequestCtx?.makeDefaultCompareLink?.(props.repository?.defaultBranch) ?? "")}>{i18n("repo.pulls.new")}</a>
				</>)}
			</>) : (<>
				{/* archived, view compare page only */}
				{(!(props.pageIsIssueList)) ? (<>
					<a className="ui small primary small button issue-list-new" href={String(props.pullRequestCtx?.makeDefaultCompareLink?.(props.repository?.defaultBranch) ?? "")}>{i18n("action.compare_commits_general")}</a>
				</>) : null}
			</>)}
		</div>

		{/* template: repo/issue/filters */}

		<div id="issue-actions" className="issue-list-toolbar tw-hidden">
			<div className="issue-list-toolbar-left">
				{/* template: repo/issue/openclose */}
				{/* Total Tracked Time */}
				{(props.totalTrackedTime) ? (<>
					<div className="ui compact tiny secondary menu">
						<span className="item" data-tooltip-content='{i18n("tracked_time_summary")}'>
							<span className="svg-icon" aria-label="octicon-clock"></span>
							{props.totalTrackedTime?.("|", "Sec2Hour") as any}
						</span>
					</div>
				</>) : null}
			</div>
			<div className="issue-list-toolbar-right">
				{/* template: repo/issue/filter_actions */}
			</div>
		</div>
		{/* template: shared/issuelist */}
	</div>
</div>


  </>)
}
