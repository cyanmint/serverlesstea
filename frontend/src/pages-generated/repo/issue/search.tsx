import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Search(props: Record<string, unknown>) {
  return (<>
<form className="list-header-search ui form ignore-dirty issue-list-search">
	<div className="ui small search fluid action input">
		<input type="hidden" name="state" value={String(props.state ?? "")} />
		{(!(props.pageIsMilestones)) ? (<>
			<input type="hidden" name="type" value={String(props.viewType ?? "")} />
			<input type="hidden" name="labels" value={String(props.selectLabels ?? "")} />
			<input type="hidden" name="milestone" value={String(props.milestoneID ?? "")} />
			<input type="hidden" name="project" value={String("" ?? "")} />
			<input type="hidden" name="assignee" value={String(props.assigneeID ?? "")} />
			<input type="hidden" name="poster" value={String(props.posterUsername ?? "")} />
			<input type="hidden" name="sort" value={String(props.sortType ?? "")} />
		</>) : null}
		{/* template: shared/search/input */}
		{(props.pageIsIssueList) ? (<>
			<button id="issue-list-quick-goto" type="button" className="ui small icon button tw-hidden tw-mr-[-1px]" data-repo-link={String(props.repoLink ?? "")}><span className="svg-icon" aria-label="octicon-hash"></span> {i18n("repo.issues.quick_goto")}</button>
		</>) : null}
		{/* template: shared/search/button */}
	</div>
</form>

  </>)
}
