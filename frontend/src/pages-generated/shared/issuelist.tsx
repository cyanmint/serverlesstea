// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Issuelist(props: Record<string, unknown>) {
  return (<>
<div id="issue-list" className="flex-divided-list items-with-main">
	{/* $approvalCounts */}
	{((props.issues) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<div className="item">

			<div className="item-leading">
				{/* using some tw helpers is the only way to align the checkbox */}
				<div className="flex-text-inline tw-mt-[3px]">
					{(props.canWriteIssuesOrPulls) ? (<>
						<input type="checkbox" autocomplete="off" className="issue-checkbox tw-mr-[14px]" data-issue-id={String(props.iD ?? "")} aria-label={`${i18n("repo.issues.action_check")}: ${String(props.title ?? "")}`} />
					</>) : null}
					{/* template: shared/issueicon */}
				</div>
			</div>

			<div className="item-main">
				<div className="item-header">
					<div className="item-title">
						<a className="tw-no-underline issue-title" href={`${(props.link) ? `${String(props.link ?? "")}` : `${String(props.link ?? "")}/${String(props.index ?? "")}`}`}>{item.title?.("|", "ctx.RenderUtils.RenderIssueSimpleTitle") as any}</a>
						{(item.isPull) ? (<>
							{((true /* TODO: index $.CommitStatuses .PullRequest.ID */)) ? (<>
								{/* template: repo/commit_statuses */}
							</>) : null}
						</>) : null}
						<span className="labels-list">
							{((item.labels) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a href={`?q=${String(props.keyword ?? "")}&type=${String(props.viewType ?? "")}&state=${String(props.state ?? "")}&labels=${String(props.iD ?? "")}${(props.listType !== "milestone") ? `&milestone=${String(props.milestoneID ?? "")}` : ""}&assignee=${String(props.assigneeID ?? "")}&poster=${String(props.posterID ?? "")}${(props.showArchivedLabels) ? `&archived=true` : ""}`}>{/* TODO: {{ctx.RenderUtils.RenderLabel .}} */}</a>
							</React.Fragment>))}
						</span>
					</div>
					{(item.totalTrackedTime) ? (<>
					<div className="tw-text-text-light flex-text-block">
							<span className="svg-icon" aria-label="octicon-clock"></span>
							{item.totalTrackedTime?.("|", "Sec2Hour") as any}
					</div>
					</>) : null}
				</div>
				<div className="item-body">
					<a className="index" href={`${(props.link) ? `${String(props.link ?? "")}` : `${String(props.link ?? "")}/${String(props.index ?? "")}`}`}>
						{(props.listType === "dashboard") ? (<>
							{item.repo?.fullName as any}#{item.index as any}
						</>) : (<>
							#{item.index as any}
						</>)}
					</a>
					{/* $timeStr */}
					{(item.originalAuthor) ? (<>
						{/* TODO: {{ctx.Locale.Tr .GetLastEventLabelFake $timeStr .OriginalAuthor}} */}
					</>) : null} {(item.poster?.iD > 0) ? (<>
						{/* TODO: {{ctx.Locale.Tr .GetLastEventLabel $timeStr .Poster.HomeLink .Poster.GetDisplayName}} */}
					</>) : (<>
						{/* TODO: {{ctx.Locale.Tr .GetLastEventLabelFake $timeStr .Poster.GetDisplayName}} */}
					</>)}
					{(item.isPull) ? (<>
						<div className="branches flex-text-inline">
							<div className="branch">
								<a href={`${String(props.pullRequest?.baseRepo?.link ?? "")}/src/branch/`}>
									{/* inline to remove the spaces between spans */}
									{(item.repoID !== item.pullRequest?.baseRepoID) ? (<><span className="truncated-name">{item.pullRequest?.baseRepo?.ownerName as any}</span>:</>) : null}<span className="truncated-name">{item.pullRequest?.baseBranch as any}</span>
								</a>
							</div>
							<span className="svg-icon" aria-label="gitea-double-chevron-left"></span>
							{(item.pullRequest?.headRepo) ? (<>
							<div className="branch">
								<a href={`${String(props.pullRequest?.headRepo?.link ?? "")}/src/branch/`}>
									{/* inline to remove the spaces between spans */}
									{(item.repoID !== item.pullRequest?.headRepoID) ? (<><span className="truncated-name">{item.pullRequest?.headRepo?.ownerName as any}</span>:</>) : null}<span className="truncated-name">{item.pullRequest?.headBranch as any}</span>
								</a>
							</div>
							</>) : null}
						</div>
					</>) : null}
					{((item.milestone && props.listType !== "milestone")) ? (<>
						<a className="milestone flex-text-inline tw-max-w-[300px]" {...(props.repoLink ? {"href": `${String(props.repoLink ?? "")}/milestone/${String(props.milestone?.iD ?? "")}`} : {"href": `${String(props.repo?.link ?? "")}/milestone/${String(props.milestone?.iD ?? "")}`})}>
							<span className="svg-icon" aria-label="octicon-milestone"></span>
							<span className="gt-ellipsis">{item.milestone?.name as any}</span>
						</a>
					</>) : null}
					{((item.projects) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<a className="project flex-text-inline tw-max-w-[300px]" href={String("" ?? "")}>
							{/* TODO: {{svg $project.IconName 14}} */}
							<span className="gt-ellipsis">{/* TODO: {{$project.Title}} */}</span>
						</a>
					</React.Fragment>))}
					{(item.ref) ? (<>{/* TODO: RemoveIssueRef: see "repo/issue/branch_selector_field.tmpl" */}
						<a className="ref flex-text-inline tw-max-w-[300px]" {...(props.repoLink ? {"href": String("" ?? "")} : {"href": `${String(props.repo?.link ?? "")}`})}>
							<span className="svg-icon" aria-label="octicon-git-branch"></span>
							<span className="gt-ellipsis">{/* TODO: {{index $.IssueRefEndNames .ID}} */}</span>
						</a>
					</>) : null}
					{/* $tasks */}
					{(props.tasks > 0) ? (<>
						{/* $tasksDone */}
						<span className="checklist flex-text-inline">
							<span className="svg-icon" aria-label="octicon-checklist"></span>{props.tasksDone as any} / {props.tasks as any}
							<progress value={String("" ?? "")} max={String("" ?? "")}></progress>
						</span>
					</>) : null}
					{(item.deadlineUnix !== 0) ? (<>
						<span className="due-date flex-text-inline" data-tooltip-content={String(i18n("repo.issues.due_date") ?? "")}>
							<span{...(item.isOverdue ? {"className": "tw-text-red"} : {})}>
								<span className="svg-icon" aria-label="octicon-calendar"></span>
								{/* TODO: {{DateUtils.AbsoluteShort .DeadlineUnix}} */}
							</span>
						</span>
					</>) : null}
					{(item.isPull) ? (<>
						{/* $approveOfficial */}
						{/* $rejectOfficial */}
						{/* $waitingOfficial */}
						{(props.approveOfficial > 0) ? (<>
							<span className="approvals green flex-text-inline">
								<span className="svg-icon" aria-label="octicon-check"></span>
								{/* TODO: {{ctx.Locale.TrN $approveOfficial "repo.pulls.approve_count_1" "repo.pulls.approve_count_n" $approveOfficial}} */}
							</span>
						</>) : null}
						{(props.rejectOfficial > 0) ? (<>
							<span className="rejects red flex-text-inline">
								<span className="svg-icon" aria-label="octicon-diff"></span>
								{/* TODO: {{ctx.Locale.TrN $rejectOfficial "repo.pulls.reject_count_1" "repo.pulls.reject_count_n" $rejectOfficial}} */}
							</span>
						</>) : null}
						{(props.waitingOfficial > 0) ? (<>
							<span className="waiting flex-text-inline">
								<span className="svg-icon" aria-label="octicon-eye"></span>
								{/* TODO: {{ctx.Locale.TrN $waitingOfficial "repo.pulls.waiting_count_1" "repo.pulls.waiting_count_n" $waitingOfficial}} */}
							</span>
						</>) : null}
						{((!(item.pullRequest?.hasMerged) && item.pullRequest?.conflictedFiles)) ? (<>
							<span className="conflicting flex-text-inline">
								<span className="svg-icon" aria-label="octicon-x"></span>
								{/* TODO: {{ctx.Locale.TrN (len .PullRequest.ConflictedFiles) "repo.pulls.num_conflicting_files_1" "repo.pulls.num_conflicting_files_n" (len .PullRequest.ConflictedFiles)}} */}
							</span>
						</>) : null}
					</>) : null}
				</div>
			</div>
			{((item.assignees || item.numComments)) ? (<>
			<div className="item-trailing">
				{(item.assignees) ? (<>
				<div className="tw-text-text-light">
					{((item.assignees) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<a className="ui assignee tw-no-underline" href={String(props.homeLink ?? "")} data-tooltip-content={String(props.getDisplayName ?? "")}>
							{/* TODO: {{ctx.AvatarUtils.Avatar . 20}} */}
						</a>
					</React.Fragment>))}
				</div>
				</>) : null}
				{(item.numComments) ? (<>
				<div className="tw-text-text-light">
					<a className="tw-no-underline muted flex-text-block" href={`${(props.link) ? `${String(props.link ?? "")}` : `${String(props.link ?? "")}/${String(props.index ?? "")}`}`}>
						<span className="svg-icon" aria-label="octicon-comment"></span>{item.numComments as any}
					</a>
				</div>
				</>) : null}
			</div>
			</>) : null}
		</div>
	{/* else */}
		<div className="tw-text-center tw-p-8">
			<h3 className="tw-my-4">{i18n("repo.issues.filter_no_results")}</h3>
			<p className="tw-text-placeholder-text">{i18n("repo.issues.filter_no_results_placeholder")}</p>
		</div>
	</React.Fragment>))}
	{(props.issueIndexerUnavailable) ? (<>
		<div className="ui error message">
			<p>{i18n("search.keyword_search_unavailable")}</p>
		</div>
	</>) : null}
</div>
{/* template: base/paginate */}

  </>)
}
