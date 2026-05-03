import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function TwofaEnroll(props: Record<string, unknown>) {
  return (<>
{/* template: user/settings/layout_head */}
	<div className="user-setting-content">
		<h4 className="ui top attached header">
			{i18n("settings.twofa_enroll")}
		</h4>
		<div className="ui attached segment">
			<p>{i18n("settings.scan_this_image")}</p>
			<img src={String(props.qrUri ?? "")} alt={String(props.twofaSecret ?? "")} />
			<p>{i18n("settings.or_enter_secret")}</p>
			<p>{i18n("settings.then_enter_passcode")}</p>
			<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div className={`inline required field ${(props.err_Passcode) ? `error` : ""}`}>
					<label htmlFor="passcode">{i18n("passcode")}</label>
					<input id="passcode" name="passcode" autofocus required />
				</div>
				<div className="inline field">
					<label></label>
					<button className="ui primary button">{i18n("auth.verify")}</button>
				</div>
			</form>
		</div>
	</div>

{/* template: user/settings/layout_footer */}

  </>)
}
