import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function View(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content organization repository projects view-project">
	{(props.contextUser?.isOrganization) ? (<>
		{/* template: org/header */}
	</>) : (<>
		{/* template: shared/user/org_profile_avatar */}
		<div className="ui container tw-mb-4">
			{/* template: user/overview/header */}
		</div>
	</>)}
	{/* template: projects/view */}
</div>


  </>)
}
