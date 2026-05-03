// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Page503(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label="503 Service Unavailable" className="page-content">
	<div className="ui container">
		<div className="status-page-error">
			<div className="status-page-error-title">503 Service Unavailable</div>
			<div className="tw-text-center">
				<div className="tw-my-4">{i18n("error503")}</div>
			</div>
		</div>
	</div>
</div>


  </>)
}
