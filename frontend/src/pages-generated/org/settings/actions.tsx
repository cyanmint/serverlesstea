import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Actions(props: Record<string, unknown>) {
  return (<>
{/* template: org/settings/layout_head */}
	<div className="org-setting-content">
	{(props.pageType === "runners") ? (<>
		{/* template: shared/actions/runner_list */}
	</>) : null} {(props.pageType === "secrets") ? (<>
		{/* template: shared/secrets/add_list */}
	</>) : null} {(props.pageType === "variables") ? (<>
		{/* template: shared/variables/variable_list */}
	</>) : null}
	</div>
{/* template: org/settings/layout_footer */}

  </>)
}
