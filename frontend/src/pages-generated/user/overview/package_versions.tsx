import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function PackageVersions(props: Record<string, unknown>) {
  return (<>

{(props.contextUser?.isOrganization) ? (<>
	<div role="main" aria-label={String(props.title ?? "")} className="page-content organization packages">
		{/* template: org/header */}
		<div className="ui container">
			{/* template: package/shared/versionlist */}
		</div>
	</div>
</>) : (<>
	<div role="main" aria-label={String(props.title ?? "")} className="page-content user profile packages">
		<div className="ui container">
			<div className="ui stackable grid">
				<div className="ui four wide column">
					{/* template: shared/user/profile_big_avatar */}
				</div>
				<div className="ui twelve wide column tw-mb-4">
						{/* template: user/overview/header */}
						{/* template: package/shared/versionlist */}
				</div>
			</div>
		</div>
	</div>
</>)}


  </>)
}
