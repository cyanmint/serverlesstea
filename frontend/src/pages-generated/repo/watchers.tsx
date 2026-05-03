// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Watchers(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository watchers">
	{/* template: repo/header */}
	<div className="ui container">
		{/* template: repo/user_cards */}
	</div>
</div>


  </>)
}
