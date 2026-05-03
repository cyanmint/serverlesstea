import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Commits(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository view issue pull commits">
	{/* template: repo/header */}
	<div className="ui container">
		{/* template: repo/issue/view_title */}
		{/* template: repo/pulls/tab_menu */}
		{/* template: repo/commits_table */}
	</div>
</div>


  </>)
}
