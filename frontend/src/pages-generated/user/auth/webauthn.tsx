import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Webauthn(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content user signin webauthn-prompt">
	<div className="ui page grid">
		<div className="column tw-text-center">
			{/* template: user/auth/webauthn_error */}
			<h3 className="ui top attached header">{i18n("twofa")}</h3>
			<div className="ui attached segment">
				<span className="svg-icon" aria-label="octicon-key"></span>
				<h3>{i18n("webauthn_insert_key")}</h3>
				{/* alert */}
				<p>{i18n("webauthn_sign_in")}</p>
			</div>
			<div className="ui attached segment tw-flex tw-items-center tw-justify-center tw-gap-1 tw-py-2">
				<div className="is-loading tw-w-[40px] tw-h-[40px]"></div>
				{i18n("webauthn_press_button")}
			</div>
			{(props.hasTwoFactor) ? (<>
				<div className="ui attached segment">
					<a href={`/user/two_factor`}>{i18n("webauthn_use_twofa")}</a>
				</div>
			</>) : null}
		</div>
	</div>
</div>


  </>)
}
