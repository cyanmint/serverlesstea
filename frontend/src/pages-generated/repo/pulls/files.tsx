// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Files(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository view issue pull files diff">
	{/* template: repo/header */}
	<div className="ui container fluid padded">
		{/* template: repo/issue/view_title */}
		{/* template: repo/pulls/tab_menu */}
		{/* template: repo/diff/box */}
	</div>
</div>


  </>)
}
