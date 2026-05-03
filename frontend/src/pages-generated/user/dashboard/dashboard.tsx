// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Dashboard(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content dashboard feeds">
	{/* template: user/dashboard/navbar */}
	<div className="ui container flex-container">
		<div className="flex-container-main">
			{/* alert */}
			{/* template: user/heatmap */}
			{(props.page?.paginater?.totalPages) ? (<>
				{/* template: user/dashboard/feeds */}
			</>) : (<>
				{/* template: user/dashboard/guide */}
			</>)}
		</div>
		{/* template: user/dashboard/repolist */}
	</div>
</div>


  </>)
}
