import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function NoWorkflows(props: Record<string, unknown>) {
  return (<>
<div className="empty-placeholder">
	<span className="svg-icon" aria-label="octicon-no-entry"></span>
	<h2>{i18n("actions.runs.no_workflows")}</h2>
	{((props.canWriteCode && props.canWriteActions)) ? (<>
		<p>{i18n("actions.runs.no_workflows.quick_start")}</p>
	</>) : null}
	<p>{i18n("actions.runs.no_workflows.documentation")}</p>
</div>

  </>)
}
