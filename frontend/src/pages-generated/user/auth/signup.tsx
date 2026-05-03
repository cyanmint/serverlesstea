import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Signup(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className={`page-content user signin${(props.linkAccountMode) ? ` icon` : ""}`}>
	<div className="ui middle very relaxed page grid">
		<div className="column tw-flex tw-flex-col tw-gap-4 tw-max-w-2xl tw-m-auto">
			{/* template: user/auth/signup_inner */}
		</div>
	</div>
</div>


  </>)
}
