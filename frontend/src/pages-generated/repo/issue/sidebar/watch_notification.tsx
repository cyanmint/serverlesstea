import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function WatchNotification(props: Record<string, unknown>) {
  return (<>
{((props.issueWatch && !(props.repository?.isArchived))) ? (<>
	<div className="divider"></div>
	<div className="ui watching">
		<span className="text"><strong>{i18n("notification.notifications")}</strong></span>
		<div className="tw-mt-2">
			{/* template: repo/issue/view_content/watching */}
		</div>
	</div>
</>) : null}

  </>)
}
