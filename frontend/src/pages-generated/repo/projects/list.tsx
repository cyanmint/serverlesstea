// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository projects milestones">
	{/* template: repo/header */}
	<div className="ui container">
		{/* template: projects/list */}
	</div>
</div>


  </>)
}
