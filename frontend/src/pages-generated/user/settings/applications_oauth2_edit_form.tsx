// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ApplicationsOauth2EditForm(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("settings.edit_oauth2_application")}
</h4>
<div className="ui attached segment">
	<p>{i18n("settings.oauth2_application_create_description")}</p>
</div>
<div className="ui attached segment form ignore-dirty">
	<div className="field">
		<label htmlFor="client-id">{i18n("settings.oauth2_client_id")}</label>
		<input id="client-id" readonly value={String(props.app?.clientID ?? "")} />
	</div>
	{(props.clientSecret) ? (<>
		<div className="field">
			<label htmlFor="client-secret">{i18n("settings.oauth2_client_secret")}</label>
			<input id="client-secret" type="text" readonly value={String(props.clientSecret ?? "")} />
		</div>
	</>) : (<>
		<div className="field">
			<label htmlFor="client-secret">{i18n("settings.oauth2_client_secret")}</label>
			<input id="client-secret" type="password" readonly value="averysecuresecret" />
		</div>
	</>)}
	<div className="item">
		{'{'}/* TODO add regenerate secret functionality * / */{'}'}
		<form className="ui form ignore-dirty" action={`${String(props.formActionPath ?? "")}/regenerate_secret`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			{i18n("settings.oauth2_regenerate_secret_hint")}
			<button className="ui mini button tw-ml-2" type="submit">{i18n("settings.oauth2_regenerate_secret")}</button>
		</form>
	</div>
</div>
<div className="ui bottom attached segment">
	<form className="ui form ignore-dirty" action={String(props.formActionPath ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<div className={`field ${(props.err_AppName) ? `error` : ""}`}>
			<label htmlFor="application-name">{i18n("settings.oauth2_application_name")}</label>
			<input id="application-name" value={String(props.app?.name ?? "")} name="application_name" required maxlength="255" />
		</div>
		<div className={`field ${(props.err_RedirectURI) ? `error` : ""}`}>
			<label htmlFor="redirect-uris">{i18n("settings.oauth2_redirect_uris")}</label>
			<textarea name="redirect_uris" id="redirect-uris" required>{/* TODO: {{StringUtils.Join .App.RedirectURIs "\n"}} */}</textarea>
		</div>
		<div className={`field ${(props.err_ConfidentialClient) ? `error` : ""}`}>
			<div className="ui checkbox">
				<label>{i18n("settings.oauth2_confidential_client")}</label>
				<input className="disable-setting" type="checkbox" name="confidential_client" data-target="#skip-secondary-authorization" {...(props.app?.confidentialClient ? {"checked": true} : {})} />
			</div>
		</div>
		<div className={`field ${(props.err_SkipSecondaryAuthorization) ? `error` : ""} ${(props.app?.confidentialClient) ? `disabled` : ""}`} id="skip-secondary-authorization">
			<div className="ui checkbox">
				<label>{i18n("settings.oauth2_skip_secondary_authorization")}</label>
				<input type="checkbox" name="skip_secondary_authorization" {...(props.app?.skipSecondaryAuthorization ? {"checked": true} : {})} />
			</div>
		</div>
		<button className="ui primary button">
			{i18n("settings.save_application")}
		</button>
	</form>
</div>

  </>)
}
