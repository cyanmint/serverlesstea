import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Twofa(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("settings.twofa")}
</h4>
<div className="ui attached segment">
	<p>{i18n("settings.twofa_desc")}</p>
	{(props.tOTPEnrolled) ? (<>
	<p>{i18n("settings.twofa_is_enrolled")}</p>
	<form className="ui form" action={`/user/settings/security/two_factor/regenerate_scratch`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} enctype="multipart/form-data">
		<p>{i18n("settings.regenerate_scratch_token_desc")}</p>
		<button className="ui primary button">{i18n("settings.twofa_scratch_token_regenerate")}</button>
	</form>
	<form className="ui form" action={`/user/settings/security/two_factor/disable`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} enctype="multipart/form-data" id="disable-form">
		<p>{i18n("settings.twofa_disable_note")}</p>
		<button className="ui red button delete-button" data-modal-id="disable-twofa" data-type="form" data-form="#disable-form">{i18n("settings.twofa_disable")}</button>
	</form>
	</>) : (<>
	{/* The recovery tip is there as a means of encouraging a user to enroll */}
	<p>{i18n("settings.twofa_recovery_tip")}</p>
	<p>{i18n("settings.twofa_not_enrolled")}</p>
	<div className="inline field">
		<a className="ui primary button" href={`/user/settings/security/two_factor/enroll`}>{i18n("settings.twofa_enroll")}</a>
	</div>
	</>)}

	<div className="ui g-modal-confirm delete modal" id="disable-twofa">
		<div className="header">
			<span className="svg-icon" aria-label="octicon-trash"></span>
			{i18n("settings.twofa_disable")}
		</div>
		<div className="content">
			<p>{i18n("settings.twofa_disable_desc")}</p>
		</div>
		{/* template: base/modal_actions_confirm */}
	</div>
</div>

  </>)
}
