// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Forks(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository forks">
	{/* template: repo/header */}
	<div className="ui container fork-list">
		<h2 className="ui dividing header">
			{i18n("repo.forks")}
		</h2>
		{/* template: shared/repo/list */}
		{/* template: base/paginate */}
	</div>
</div>


  </>)
}
