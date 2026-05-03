import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Code(props: Record<string, unknown>) {
  return (<>

{(props.contextUser?.isOrganization) ? (<>
	<div role="main" aria-label={String(props.title ?? "")} className="page-content organization code">
		{/* template: org/header */}
		<div className="ui container">
			{/* template: shared/search/code/search */}
		</div>
	</div>
</>) : (<>
	<div role="main" aria-label={String(props.title ?? "")} className="page-content user profile">
		<div className="ui container">
			<div className="ui stackable grid">
				<div className="ui four wide column">
					{/* template: shared/user/profile_big_avatar */}
				</div>
				<div className="ui twelve wide column">
					{/* template: user/overview/header */}
					{/* template: shared/search/code/search */}
				</div>
			</div>
		</div>
	</div>
</>)}


  </>)
}
