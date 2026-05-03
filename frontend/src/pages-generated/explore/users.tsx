// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Users(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content explore users">
	{/* template: explore/navbar */}
	<div className="ui container">
		{/* template: explore/search */}
		{/* template: explore/user_list */}
		{/* template: base/paginate */}
	</div>
</div>


  </>)
}
