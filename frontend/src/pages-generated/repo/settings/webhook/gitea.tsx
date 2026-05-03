import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Gitea(props: Record<string, unknown>) {
  return (<>
{(props.hookType === "gitea") ? (<>
	<p>{i18n("repo.settings.add_web_hook_desc")}</p>
	<form className="ui form" action={`${String(props.baseLink ?? "")}/gitea/`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		{/* template: base/disable_form_autofill */}
		<div className={`required field ${(props.err_PayloadURL) ? `error` : ""}`}>
			<label htmlFor="payload_url">{i18n("repo.settings.payload_url")}</label>
			<input id="payload_url" name="payload_url" type="url" value={String(props.webhook?.uRL ?? "")} autofocus required />
		</div>
		<div className="field">
			<label>{i18n("repo.settings.http_method")}</label>
			<div className="ui selection dropdown">
				<input type="hidden" id="http_method" name="http_method" value={`${(props.webhook?.hTTPMethod) ? `${String(props.webhook?.hTTPMethod ?? "")}` : `POST`}`} />
				<div className="default text"></div>
				<span className="svg-icon" aria-label="octicon-triangle-down"></span>
				<div className="menu">
					<div className="item" data-value="POST">POST</div>
					<div className="item" data-value="GET">GET</div>
				</div>
			</div>
		</div>
		<div className="field">
			<label>{i18n("repo.settings.content_type")}</label>
			<div className="ui selection dropdown">
				<input type="hidden" id="content_type" name="content_type" value={`${(props.webhook?.contentType) ? `${String(props.webhook?.contentType ?? "")}` : `1`}`} />
				<div className="default text"></div>
				<span className="svg-icon" aria-label="octicon-triangle-down"></span>
				<div className="menu">
					<div className="item" data-value="1">application/json</div>
					<div className="item" data-value="2">application/x-www-form-urlencoded</div>
				</div>
			</div>
		</div>
		{/* template: repo/settings/webhook/settings */}
	</form>
</>) : null}

  </>)
}
