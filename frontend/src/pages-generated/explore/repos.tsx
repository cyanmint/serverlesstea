import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Repos(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content explore repositories">
	{/* template: explore/navbar */}
	<div className="ui container">
		{/* template: shared/repo/search */}
		{/* template: shared/repo/list */}
		{/* template: base/paginate */}
	</div>
</div>


  </>)
}
