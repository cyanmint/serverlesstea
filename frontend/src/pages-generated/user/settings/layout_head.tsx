import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function LayoutHead(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.ctxData?.title ?? "")} className={`page-content ${String(props.pageClass ?? "")}`}>
	<div className="ui container flex-container">
		{/* template: user/settings/navbar */}
		<div className="flex-container-main">
			{/* alert */}
			{/* block: user-setting-content */}

{(false) ? (<>{/* to make html structure "likely" complete to prevent IDE warnings */}
		</div>
	</div>
</div>
</>) : null}

  </>)
}
