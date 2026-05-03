import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Filters(props: Record<string, unknown>) {
  return (<>
<div id="issue-filters" className="issue-list-toolbar">
	<div className="issue-list-toolbar-left">
		{((props.canWriteIssuesOrPulls && props.issues)) ? (<>
			<input type="checkbox" autocomplete="off" className="issue-checkbox-all tw-mr-4" title={String(i18n("repo.issues.action_check_all") ?? "")} />
		</>) : null}
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
		<div className="ui secondary filter menu labels">
			{(props.pageIsMilestones) ? (<>
				{/* template: repo/issue/milestone/filter_list */}
			</>) : (<>
				{/* template: repo/issue/filter_list */}
			</>)}
		</div>
	</div>
</div>

  </>)
}
