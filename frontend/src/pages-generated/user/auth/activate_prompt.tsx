// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ActivatePrompt(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content user activate">
	<div className="ui middle very relaxed page grid">
		<div className="column">
			<h2 className="ui top attached header">
				{i18n("auth.active_your_account")}
			</h2>
			<div className="ui attached segment">
				{/* alert */}
				<p>{props.activationPromptMessage as any}</p>
			</div>
		</div>
	</div>
</div>


  </>)
}
