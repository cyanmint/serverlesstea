import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>

{(props.contextUser?.isOrganization) ? (<>
	<div role="main" aria-label={String(props.title ?? "")} className="page-content organization projects">
		{/* template: org/header */}
		<div className="ui container">
			{/* template: projects/list */}
		</div>
	</div>
</>) : (<>
	<div role="main" aria-label={String(props.title ?? "")} className="page-content user profile">
		<div className="ui container">
			<div className="ui stackable grid">
				<div className="ui four wide column">
					{/* template: shared/user/profile_big_avatar */}
				</div>
				<div className="ui twelve wide column tw-mb-4">
					{/* template: user/overview/header */}
					{/* template: projects/list */}
				</div>
			</div>
		</div>
	</div>
</>)}


  </>)
}
