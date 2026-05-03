// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Actions(props: Record<string, unknown>) {
  return (<>
{/* template: user/settings/layout_head */}
	<div className="user-setting-content">
	{(props.pageType === "secrets") ? (<>
		{/* template: shared/secrets/add_list */}
	</>) : null} {(props.pageType === "runners") ? (<>
		{/* template: shared/actions/runner_list */}
	</>) : null} {(props.pageType === "variables") ? (<>
		{/* template: shared/variables/variable_list */}
	</>) : null}
	</div>

{/* template: user/settings/layout_footer */}

  </>)
}
