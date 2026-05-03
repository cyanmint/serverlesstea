// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ProhibitLogin(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content user activate">
	<div className="ui middle very relaxed page grid">
		<div className="column">
			<form className="ui form tw-max-w-2xl tw-m-auto">
				<h2 className="ui top attached header">
					{i18n("auth.prohibit_login")}
				</h2>
				<div className="ui attached segment">
					<p>{i18n("auth.prohibit_login_desc")}</p>
				</div>
			</form>
		</div>
	</div>
</div>


  </>)
}
