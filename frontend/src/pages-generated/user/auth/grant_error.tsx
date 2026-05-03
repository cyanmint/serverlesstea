import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function GrantError(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content oauth2-authorize-application-box">
	<div className="ui container tw-max-w-[500px]">
		<h1 className="ui top attached header">
			{i18n("auth.authorization_failed")}
		</h1>
		<h3 className="ui attached segment">{props.error?.errorDescription as any}</h3>
		<div className="ui attached segment">
			<p>{i18n("auth.authorization_failed_desc")}</p>
		</div>
	</div>
</div>


  </>)
}
