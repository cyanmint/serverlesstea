import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Pulse(props: Record<string, unknown>) {
  return (<>
<h2 className="ui header activity-header">
	<span>{/* TODO: {{DateUtils.AbsoluteLong .DateFrom}} */} - {/* TODO: {{DateUtils.AbsoluteLong .DateUntil}} */}</span>
	{/* Period */}
	<div className="ui floating dropdown jump">
		<div className="ui basic compact button">
			{i18n("repo.activity.period.filter_label")} <strong>{props.periodText as any}</strong>
			<span className="svg-icon" aria-label="octicon-triangle-down"></span>
		</div>
		<div className="left menu">
			<a className={`${(props.period === "daily") ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/activity/daily`}>{i18n("repo.activity.period.daily")}</a>
			<a className={`${(props.period === "halfweekly") ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/activity/halfweekly`}>{i18n("repo.activity.period.halfweekly")}</a>
			<a className={`${(props.period === "weekly") ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/activity/weekly`}>{i18n("repo.activity.period.weekly")}</a>
			<a className={`${(props.period === "monthly") ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/activity/monthly`}>{i18n("repo.activity.period.monthly")}</a>
			<a className={`${(props.period === "quarterly") ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/activity/quarterly`}>{i18n("repo.activity.period.quarterly")}</a>
			<a className={`${(props.period === "semiyearly") ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/activity/semiyearly`}>{i18n("repo.activity.period.semiyearly")}</a>
			<a className={`${(props.period === "yearly") ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/activity/yearly`}>{i18n("repo.activity.period.yearly")}</a>
		</div>
	</div>
</h2>

{((props.permission?.canRead?.("ctx.Consts.RepoUnitTypeIssues") || props.permission?.canRead?.("ctx.Consts.RepoUnitTypePullRequests"))) ? (<>
<h4 className="ui top attached header">{i18n("repo.activity.overview")}</h4>
<div className="ui attached segment two column grid">
	{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypePullRequests")) ? (<>
		<div className="column">
			{(props.activity?.activePRCount > 0) ? (<>
			<div className="stats-table">
				{(props.activity?.mergedPRPerc > 0) ? (<>
					<a href="#merged-pull-requests" className="table-cell tiny tw-bg-purple" style={`width: ${String(props.activity?.mergedPRPerc ?? "")}%`}></a>
				</>) : null}
				<a href="#proposed-pull-requests" className="table-cell tiny tw-bg-green"></a>
			</div>
			</>) : (<>
			<div className="stats-table">
				<a className="table-cell tiny tw-bg-grey"></a>
			</div>
			</>)}
			{/* TODO: {{ctx.Locale.TrN .Activity.ActivePRCount "repo.activity.active_prs_count_1" "repo.activity.active_prs_count_n" .Activity.ActivePRCount}} */}
		</div>
	</>) : null}
	{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeIssues")) ? (<>
		<div className="column">
			{(props.activity?.activeIssueCount > 0) ? (<>
			<div className="stats-table">
				{(props.activity?.closedIssuePerc > 0) ? (<>
					<a href="#closed-issues" className="table-cell tiny tw-bg-red" style={`width: ${String(props.activity?.closedIssuePerc ?? "")}%`}></a>
				</>) : null}
				<a href="#new-issues" className="table-cell tiny tw-bg-green"></a>
			</div>
			</>) : (<>
			<div className="stats-table">
				<a className="table-cell tiny tw-bg-grey"></a>
			</div>
			</>)}
			{/* TODO: {{ctx.Locale.TrN .Activity.ActiveIssueCount "repo.activity.active_issues_count_1" "repo.activity.active_issues_count_n" .Activity.ActiveIssueCount}} */}
		</div>
	</>) : null}
</div>
<div className="ui attached segment horizontal segments">
	{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypePullRequests")) ? (<>
		<a href="#merged-pull-requests" className="ui attached segment text center">
			<span className="tw-text-purple"><span className="svg-icon" aria-label="octicon-git-pull-request"></span></span> <strong>{props.activity?.mergedPRCount as any}</strong><br />
			{/* TODO: {{ctx.Locale.TrN .Activity.MergedPRCount "repo.activity.merged_prs_count_1" "repo.activity.merged_prs_count_n"}} */}
		</a>
		<a href="#proposed-pull-requests" className="ui attached segment text center">
			<span className="tw-text-green"><span className="svg-icon" aria-label="octicon-git-branch"></span></span> <strong>{props.activity?.openedPRCount as any}</strong><br />
			{/* TODO: {{ctx.Locale.TrN .Activity.OpenedPRCount "repo.activity.opened_prs_count_1" "repo.activity.opened_prs_count_n"}} */}
		</a>
	</>) : null}
	{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeIssues")) ? (<>
		<a href="#closed-issues" className="ui attached segment text center">
			<span className="tw-text-red"><span className="svg-icon" aria-label="octicon-issue-closed"></span></span> <strong>{props.activity?.closedIssueCount as any}</strong><br />
			{/* TODO: {{ctx.Locale.TrN .Activity.ClosedIssueCount "repo.activity.closed_issues_count_1" "repo.activity.closed_issues_count_n"}} */}
		</a>
		<a href="#new-issues" className="ui attached segment text center">
			<span className="tw-text-green"><span className="svg-icon" aria-label="octicon-issue-opened"></span></span> <strong>{props.activity?.openedIssueCount as any}</strong><br />
			{/* TODO: {{ctx.Locale.TrN .Activity.OpenedIssueCount "repo.activity.new_issues_count_1" "repo.activity.new_issues_count_n"}} */}
		</a>
	</>) : null}
</div>
</>) : null}

{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeCode")) ? (<>
	{(props.activity?.code?.commitCountInAllBranches === 0) ? (<>
		<div className="ui tw-text-center segment">
		<h4 className="ui header">{i18n("repo.activity.no_git_activity")}</h4>
		</div>
	</>) : null}
	{(props.activity?.code?.commitCountInAllBranches > 0) ? (<>
		<div className="ui attached segment horizontal segments">
			<div className="ui attached segment text">
				{i18n("repo.activity.git_stats_exclude_merges")}
				<strong>{/* TODO: {{ctx.Locale.TrN .Activity.Code.AuthorCount "repo.activity.git_stats_author_1" "repo.activity.git_stats_author_n" .Activity.Code.AuthorCount}} */}</strong>
				{/* TODO: {{ctx.Locale.TrN .Activity.Code.AuthorCount "repo.activity.git_stats_pushed_1" "repo.activity.git_stats_pushed_n"}} */}
				<strong>{/* TODO: {{ctx.Locale.TrN .Activity.Code.CommitCount "repo.activity.git_stats_commit_1" "repo.activity.git_stats_commit_n" .Activity.Code.CommitCount}} */}</strong>
				{i18n("repo.activity.git_stats_push_to_branch")}
				<strong>{/* TODO: {{ctx.Locale.TrN .Activity.Code.CommitCountInAllBranches "repo.activity.git_stats_commit_1" "repo.activity.git_stats_commit_n" .Activity.Code.CommitCountInAllBranches}} */}</strong>
				{i18n("repo.activity.git_stats_push_to_all_branches")}
				{i18n("repo.activity.git_stats_on_default_branch")}
				<strong>{/* TODO: {{ctx.Locale.TrN .Activity.Code.ChangedFiles "repo.activity.git_stats_file_1" "repo.activity.git_stats_file_n" .Activity.Code.ChangedFiles}} */}</strong>
				{/* TODO: {{ctx.Locale.TrN .Activity.Code.ChangedFiles "repo.activity.git_stats_files_changed_1" "repo.activity.git_stats_files_changed_n"}} */}
				{i18n("repo.activity.git_stats_additions")}
				<strong className="tw-text-green">{/* TODO: {{ctx.Locale.TrN .Activity.Code.Additions "repo.activity.git_stats_addition_1" "repo.activity.git_stats_addition_n" .Activity.Code.Additions}} */}</strong>
				{i18n("repo.activity.git_stats_and_deletions")}
				<strong className="tw-text-red">{/* TODO: {{ctx.Locale.TrN .Activity.Code.Deletions "repo.activity.git_stats_deletion_1" "repo.activity.git_stats_deletion_n" .Activity.Code.Deletions}} */}</strong>.
			</div>
			<div className="ui attached segment">
				<div id="repo-activity-top-authors-chart"></div>
			</div>
		</div>
	</>) : null}
</>) : null}

{(props.activity?.publishedReleaseCount > 0) ? (<>
	<h4 className="divider divider-text" id="published-releases">
		<span className="svg-icon" aria-label="octicon-tag"></span>
		{i18n("repo.activity.title.releases_published_by")}
	</h4>
	<div className="list">
		{((props.activity?.publishedReleases) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<p className="desc">
				<span className="ui green label">{i18n("repo.activity.published_release_label")}</span>
				{item.tagName as any}
				{(!(item.isTag)) ? (<>
					<a className="title" href={`${String(props.repoLink ?? "")}/src/${String(props.tagName?.("|", "PathEscapeSegments") ?? "")}`}>{item.title?.("|", "ctx.RenderUtils.RenderIssueSimpleTitle") as any}</a>
				</>) : null}
				{/* TODO: {{DateUtils.TimeSince .CreatedUnix}} */}
			</p>
		</React.Fragment>))}
	</div>
</>) : null}

{(props.activity?.mergedPRCount > 0) ? (<>
	<h4 className="divider divider-text" id="merged-pull-requests">
		<span className="svg-icon" aria-label="octicon-git-pull-request"></span>
		{i18n("repo.activity.title.prs_merged_by")}
	</h4>
	<div className="list">
		{((props.activity?.mergedPRs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<p className="desc">
				<span className="ui purple label">{i18n("repo.activity.merged_prs_label")}</span>
				#{item.index as any} <a className="title" href={`${String(props.repoLink ?? "")}/pulls/${String(props.index ?? "")}`}>{item.issue?.title?.("|", "ctx.RenderUtils.RenderIssueSimpleTitle") as any}</a>
				{/* TODO: {{DateUtils.TimeSince .MergedUnix}} */}
			</p>
		</React.Fragment>))}
	</div>
</>) : null}

{(props.activity?.openedPRCount > 0) ? (<>
	<h4 className="divider divider-text" id="proposed-pull-requests">
		<span className="svg-icon" aria-label="octicon-git-branch"></span>
		{i18n("repo.activity.title.prs_opened_by")}
	</h4>
	<div className="list">
		{((props.activity?.openedPRs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<p className="desc">
				<span className="ui green label">{i18n("repo.activity.opened_prs_label")}</span>
				#{item.index as any} <a className="title" href={`${String(props.repoLink ?? "")}/pulls/${String(props.index ?? "")}`}>{item.issue?.title?.("|", "ctx.RenderUtils.RenderIssueSimpleTitle") as any}</a>
				{/* TODO: {{DateUtils.TimeSince .Issue.CreatedUnix}} */}
			</p>
		</React.Fragment>))}
	</div>
</>) : null}

{(props.activity?.closedIssueCount > 0) ? (<>
	<h4 className="divider divider-text" id="closed-issues">
		<span className="svg-icon" aria-label="octicon-issue-closed"></span>
		{i18n("repo.activity.title.issues_closed_from")}
	</h4>
	<div className="list">
		{((props.activity?.closedIssues) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<p className="desc">
				<span className="ui red label">{i18n("repo.activity.closed_issue_label")}</span>
				#{item.index as any} <a className="title" href={`${String(props.repoLink ?? "")}/issues/${String(props.index ?? "")}`}>{item.title?.("|", "ctx.RenderUtils.RenderIssueSimpleTitle") as any}</a>
				{/* TODO: {{DateUtils.TimeSince .ClosedUnix}} */}
			</p>
		</React.Fragment>))}
	</div>
</>) : null}

{(props.activity?.openedIssueCount > 0) ? (<>
	<h4 className="divider divider-text" id="new-issues">
		<span className="svg-icon" aria-label="octicon-issue-opened"></span>
		{i18n("repo.activity.title.issues_created_by")}
	</h4>
	<div className="list">
		{((props.activity?.openedIssues) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<p className="desc">
				<span className="ui green label">{i18n("repo.activity.new_issue_label")}</span>
				#{item.index as any} <a className="title" href={`${String(props.repoLink ?? "")}/issues/${String(props.index ?? "")}`}>{item.title?.("|", "ctx.RenderUtils.RenderIssueSimpleTitle") as any}</a>
				{/* TODO: {{DateUtils.TimeSince .CreatedUnix}} */}
			</p>
		</React.Fragment>))}
	</div>
</>) : null}

{(props.activity?.unresolvedIssueCount > 0) ? (<>
	<h4 className="divider divider-text" id="unresolved-conversations" data-tooltip-content={String(i18n("repo.activity.unresolved_conv_desc") ?? "")}>
		<span className="svg-icon" aria-label="octicon-comment-discussion"></span>
		{/* TODO: {{ctx.Locale.TrN .Activity.UnresolvedIssueCount "repo.activity.title.unresolved_conv_1" "repo.activity.title.unresolved_conv_n" .Activity.UnresolvedIssueCount}} */}
	</h4>
	<div className="list">
		{((props.activity?.unresolvedIssues) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<p className="desc">
				<span className="ui green label">{i18n("repo.activity.unresolved_conv_label")}</span>
				#{item.index as any}
				{(item.isPull) ? (<>
				<a className="title" href={`${String(props.repoLink ?? "")}/pulls/${String(props.index ?? "")}`}>{item.title?.("|", "ctx.RenderUtils.RenderIssueSimpleTitle") as any}</a>
				</>) : (<>
				<a className="title" href={`${String(props.repoLink ?? "")}/issues/${String(props.index ?? "")}`}>{item.title?.("|", "ctx.RenderUtils.RenderIssueSimpleTitle") as any}</a>
				</>)}
				{/* TODO: {{DateUtils.TimeSince .UpdatedUnix}} */}
			</p>
		</React.Fragment>))}
	</div>
</>) : null}

  </>)
}
