// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Sidebar(props: Record<string, unknown>) {
  return (<>
<div className="issue-content-right ui segment" data-global-init="initRepoIssueSidebar">
	{/* template: repo/issue/branch_selector_field */}{/* TODO: RemoveIssueRef: template "repo/issue/branch_selector_field" $ */}

	{(props.issue?.isPull) ? (<>
		{/* template: repo/issue/sidebar/reviewer_list */}
		{/* template: repo/issue/sidebar/wip_switch */}
		<div className="divider"></div>
	</>) : null}

	{/* template: repo/issue/sidebar/label_list */}

	{/* template: repo/issue/sidebar/milestone_list */}
	{(props.isProjectsEnabled) ? (<>
		{/* template: repo/issue/sidebar/project_list */}
	</>) : null}
	{/* template: repo/issue/sidebar/assignee_list */}

	{/* template: repo/issue/sidebar/participant_list */}
	{/* template: repo/issue/sidebar/watch_notification */}
	{/* template: repo/issue/sidebar/stopwatch_timetracker */}
	{/* template: repo/issue/sidebar/due_date */}
	{/* template: repo/issue/sidebar/issue_dependencies */}
	{/* template: repo/issue/sidebar/reference_link */}
	{/* template: repo/issue/sidebar/issue_management */}
	{/* template: repo/issue/sidebar/allow_maintainer_edit */}
</div>

  </>)
}
