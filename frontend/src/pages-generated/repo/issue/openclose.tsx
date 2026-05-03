// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Openclose(props: Record<string, unknown>) {
  return (<>
{/* this tmpl is quite dirty, it should not mix unrelated things together .... need to split it in the future */}
{/* $allStatesLink */}{/* $openLink */}{/* $closedLink */}
{/* $projectIDsQuery */}
{(props.pageIsMilestones) ? (<>
	{/* TODO: {{$allStatesLink = QueryBuild "?" "q" $.Keyword "sort" $.SortType "state" "all"}} */}
</>) : (<>
	{/* TODO: {{$allStatesLink = QueryBuild "?" "q" $.Keyword "type" $.ViewType "sort" $.SortType "state" "all" "labels" $.SelectLabels "milestone" $.MilestoneID "project" $projectIDsQuery "assignee" $.AssigneeID "poster" $.PosterUsername "archived_labels" (Iif $.ShowArchivedLabels "true")}} */}
</>)}
{/* TODO: {{$openLink = QueryBuild $allStatesLink "state" "open"}} */}
{/* TODO: {{$closedLink = QueryBuild $allStatesLink "state" "closed"}} */}
<div className="small-menu-items ui compact tiny menu">
	<a className={`${(props.state === "open") ? `active ` : ""}item flex-text-inline`} href={`${(props.state === "open") ? `` : ``}`}>
		{(props.pageIsMilestones) ? (<>
			<span className="svg-icon" aria-label="octicon-milestone"></span>
		</>) : (<>
			{/* TODO: {{Iif .PageIsPullList (svg "octicon-git-pull-request") (svg "octicon-issue-opened")}} */}
		</>)}
		{/* TODO: {{ctx.Locale.PrettyNumber .OpenCount}} */} {i18n("repo.issues.open_title")}
	</a>
	<a className={`${(props.state === "closed") ? `active ` : ""}item flex-text-inline`} href={`${(props.state === "closed") ? `` : ``}`}>
		<span className="svg-icon" aria-label="octicon-issue-closed"></span>
		{/* TODO: {{ctx.Locale.PrettyNumber .ClosedCount}} */} {i18n("repo.issues.closed_title")}
	</a>
</div>

  </>)
}
