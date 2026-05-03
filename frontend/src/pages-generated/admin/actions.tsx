// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Actions(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
	{(props.pageType === "runners") ? (<>
		{/* template: shared/actions/runner_list */}
	</>) : null}
	{(props.pageType === "variables") ? (<>
		{/* template: shared/variables/variable_list */}
	</>) : null}
	</div>
{/* template: admin/layout_footer */}

  </>)
}
