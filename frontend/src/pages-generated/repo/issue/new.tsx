// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function New(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository new issue">
	{/* template: repo/header */}
	<div className="ui container">
		{/* template: repo/issue/new_form */}
	</div>
</div>


  </>)
}
