import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function View(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository view issue pull">
	{/* template: repo/header */}
	<div className="ui container">
		{/* template: repo/issue/view_title */}
		{(props.issue?.isPull) ? (<>
			{/* template: repo/pulls/tab_menu */}
		</>) : null}
		{/* template: repo/issue/view_content */}
	</div>
</div>


  </>)
}
