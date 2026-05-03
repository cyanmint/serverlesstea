// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Grant(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content oauth2-authorize-application-box">
	<div className="ui container tw-max-w-[500px]">
		<h3 className="ui top attached header">
			{i18n("auth.authorize_title")}
		</h3>
		<div className="ui attached segment">
			{/* alert */}
			<p>
				{(!(props.additionalScopes)) ? (<>
				<b>{i18n("auth.authorize_application_description")}</b><br />
				</>) : null}
				{i18n("auth.authorize_application_created_by")}<br />
				{i18n("auth.authorize_application_with_scopes")}
			</p>
		</div>
		<div className="ui attached segment">
			<p>{i18n("auth.authorize_redirect_notice")}</p>
		</div>
		<div className="ui attached segment tw-text-center">
			<form method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`/login/oauth/grant`}>
				<input type="hidden" name="client_id" value={String(props.application?.clientID ?? "")} />
				<input type="hidden" name="state" value={String(props.state ?? "")} />
				<input type="hidden" name="scope" value={String(props.scope ?? "")} />
				<input type="hidden" name="nonce" value={String(props.nonce ?? "")} />
				<input type="hidden" name="redirect_uri" value={String(props.redirectURI ?? "")} />
				<button type="submit" id="authorize-app" name="granted" value="true" className="ui red inline button">{i18n("auth.authorize_application")}</button>
				<button type="submit" name="granted" value="false" className="ui basic primary inline button">{i18n("cancel")}</button>
			</form>
		</div>
	</div>
</div>


  </>)
}
