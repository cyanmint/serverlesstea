import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ApplicationsOauth2List(props: Record<string, unknown>) {
  return (<>
<div className="ui attached segment">
	<div className="flex-divided-list items-with-main">
		<div className="item">
			{i18n("settings.oauth2_application_create_description")}
		</div>
		{((props.applications) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item tw-items-center">
				<div className="item-leading">
					<span className="svg-icon" aria-label="octicon-apps"></span>
				</div>
				<div className="item-main">
					<div className="item-title">{item.name as any}</div>
					<div className="item-body">
						{i18n("settings.oauth2_client_id")}
						<span className="ui label">{item.clientID as any}</span>
					</div>
				</div>
				{/* $isBuiltin */}
				<div className="item-trailing">
					{(isBuiltin) ? (<>
						<span className="ui basic label" data-tooltip-content={String(i18n("settings.oauth2_application_locked") ?? "")}>{i18n("locked")}</span>
					</>) : (<>
						<a href={`${String(props.link ?? "")}/oauth2/${String(props.iD ?? "")}`} className="ui primary tiny button">
							<span className="svg-icon" aria-label="octicon-pencil"></span>
							{i18n("settings.oauth2_application_edit")}
						</a>
						<button className="ui red tiny button delete-button" data-modal-id="remove-gitea-oauth2-application"
								data-url={`${String(props.link ?? "")}/oauth2/${String(props.iD ?? "")}/delete`}>
							<span className="svg-icon" aria-label="octicon-trash"></span>
							{i18n("settings.delete_key")}
						</button>
					</>)}
				</div>
			</div>
		</React.Fragment>))}
	</div>

	<div className="ui g-modal-confirm delete modal" id="remove-gitea-oauth2-application">
		<div className="header">
			<span className="svg-icon" aria-label="octicon-trash"></span>
			{i18n("settings.remove_oauth2_application")}
		</div>
		<div className="content">
			<p>{i18n("settings.oauth2_application_remove_description")}</p>
		</div>
		{/* template: base/modal_actions_confirm */}
	</div>
</div>

<div className="ui bottom attached segment">
	<details {...(props.application_name ? {"open": true} : {})}>
		<summary><h4 className="ui header tw-inline-block tw-my-2">{i18n("settings.create_oauth2_application")}</h4></summary>
		<form className="ui form ignore-dirty" action={`${String(props.link ?? "")}/oauth2`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<div className={`field ${(props.err_AppName) ? `error` : ""}`}>
				<label htmlFor="application-name">{i18n("settings.oauth2_application_name")}</label>
				<input id="application-name" name="application_name" value={String(props.application_name ?? "")} required maxlength="255" />
			</div>
			<div className={`field ${(props.err_RedirectURI) ? `error` : ""}`}>
				<label htmlFor="redirect-uris">{i18n("settings.oauth2_redirect_uris")}</label>
				<textarea name="redirect_uris" id="redirect-uris"></textarea>
			</div>
			<div className={`field ${(props.err_ConfidentialClient) ? `error` : ""}`}>
				<div className="ui checkbox">
					<label>{i18n("settings.oauth2_confidential_client")}</label>
					<input className="disable-setting" type="checkbox" name="confidential_client" data-target="#skip-secondary-authorization" defaultChecked />
				</div>
			</div>
			<div className={`field ${(props.err_SkipSecondaryAuthorization) ? `error` : ""} disabled`} id="skip-secondary-authorization">
				<div className="ui checkbox">
					<label>{i18n("settings.oauth2_skip_secondary_authorization")}</label>
					<input type="checkbox" name="skip_secondary_authorization" />
				</div>
			</div>
			<button className="ui primary button">
				{i18n("settings.create_oauth2_application_button")}
			</button>
		</form>
	</details>
</div>

  </>)
}
