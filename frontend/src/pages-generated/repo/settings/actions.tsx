import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Actions(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="repo-setting-content">
		{(props.pageType === "runners") ? (<>
			{/* template: shared/actions/runner_list */}
		</>) : null} {(props.pageType === "secrets") ? (<>
			{/* template: shared/secrets/add_list */}
		</>) : null} {(props.pageType === "variables") ? (<>
			{/* template: shared/variables/variable_list */}
		</>) : null} {(props.pageType === "general") ? (<>
			{/* template: repo/settings/actions_general */}
		</>) : null}
	</div>
{/* template: repo/settings/layout_footer */}

  </>)
}
