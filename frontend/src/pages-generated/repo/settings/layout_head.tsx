import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function LayoutHead(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.ctxData?.title ?? "")} className={`page-content ${String(props.pageClass ?? "")}`}>
	{/* template: repo/header */}
	<div className="ui container flex-container">
		{/* template: repo/settings/navbar */}
		<div className="flex-container-main">
			{/* alert */}
			{/* block: repo-setting-content */}

{(false) ? (<>{/* to make html structure "likely" complete to prevent IDE warnings */}
		</div>
	</div>
</div>
</>) : null}

  </>)
}
