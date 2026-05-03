// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Applications(props: Record<string, unknown>) {
  return (<>
{/* template: org/settings/layout_head */}
			<div className="org-setting-content">
				<h4 className="ui top attached header">
					{i18n("settings.applications")}
				</h4>

				{/* template: user/settings/applications_oauth2_list */}
			</div>
{/* template: org/settings/layout_footer */}

  </>)
}
