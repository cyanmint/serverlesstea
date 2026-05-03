// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Webauthn(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">{i18n("settings.webauthn")}</h4>
<div className="ui attached segment">
	<p>{i18n("settings.webauthn_desc")}</p>
	<p>{i18n("settings.webauthn_key_loss_warning")} {i18n("settings.webauthn_alternative_tip")}</p>
	{/* template: user/auth/webauthn_error */}
	<div className="flex-divided-list items-with-main">
		{((props.webAuthnCredentials) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item">
				<div className="item-leading">
					<span className="svg-icon" aria-label="octicon-key"></span>
				</div>
				<div className="item-main">
					<div className="item-title">{item.name as any}</div>
					<div className="item-body">
						<i>{i18n("settings.added_on")}</i>
					</div>
				</div>
				<div className="item-trailing">
					<button className="ui red tiny button delete-button" data-modal-id="delete-registration" data-url={`${String(props.link ?? "")}/webauthn/delete`} data-id={String(props.iD ?? "")}>
					{i18n("settings.delete_key")}
					</button>
				</div>
			</div>
		</React.Fragment>))}
	</div>
	<div className="ui form">
		<div className="required field">
			<label htmlFor="nickname">{i18n("settings.webauthn_nickname")}</label>
			<input id="nickname" name="nickname" type="text" required />
		</div>
		<button id="register-webauthn" className="ui primary button"><span className="svg-icon" aria-label="octicon-key"></span> {i18n("settings.webauthn_register_key")}</button>
	</div>
	<div className="ui g-modal-confirm delete modal" id="delete-registration">
		<div className="header">
			<span className="svg-icon" aria-label="octicon-trash"></span>
			{i18n("settings.webauthn_delete_key")}
		</div>
		<div className="content">
			<p>{i18n("settings.webauthn_delete_key_desc")}</p>
		</div>
		{/* template: base/modal_actions_confirm */}
	</div>
</div>

  </>)
}
