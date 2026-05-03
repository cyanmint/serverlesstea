import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
				{i18n("settings.applications")}
		</h4>
		{/* template: user/settings/applications_oauth2_list */}
	</div>
{/* template: admin/layout_footer */}

  </>)
}
