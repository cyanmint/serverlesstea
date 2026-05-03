// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Labels(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository labels">
	{/* template: repo/header */}
	<div className="ui container">
		<div className="issue-navbar tw-mb-4">
			{/* template: repo/issue/navbar */}
			{(((props.canWriteIssues || props.canWritePulls) && !(props.repository?.isArchived))) ? (<>
				<button className="ui small primary new-label button">{i18n("repo.issues.new_label")}</button>
			</>) : null}
		</div>
		{/* alert */}
		{/* template: repo/issue/labels/label_list */}
	</div>
	{(((props.canWriteIssues || props.canWritePulls) && !(props.repository?.isArchived))) ? (<>
		{/* template: repo/issue/labels/label_edit_modal */}
	</>) : null}
</div>


  </>)
}
