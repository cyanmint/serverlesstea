// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Activity(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository commits">
	{/* template: repo/header */}
	<div className="ui container flex-container">
		<div className="flex-container-nav">
			{/* template: repo/navbar */}
		</div>
		<div className="flex-container-main" data-ref-issue-container>
			{(props.pageIsPulse) ? (<>{/* template: repo/pulse */}</>) : null}
			{(props.pageIsContributors) ? (<>{/* template: repo/contributors */}</>) : null}
			{(props.pageIsCodeFrequency) ? (<>{/* template: repo/code_frequency */}</>) : null}
			{(props.pageIsRecentCommits) ? (<>{/* template: repo/recent_commits */}</>) : null}
		</div>
	</div>
</div>



  </>)
}
