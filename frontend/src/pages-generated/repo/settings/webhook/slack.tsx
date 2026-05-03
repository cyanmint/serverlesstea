import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Slack(props: Record<string, unknown>) {
  return (<>
{(props.hookType === "slack") ? (<>
	<p>{i18n("repo.settings.add_web_hook_desc")}</p>
	<form className="ui form" action={`${String(props.baseLink ?? "")}/slack/`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<div className={`required field ${(props.err_PayloadURL) ? `error` : ""}`}>
			<label htmlFor="payload_url">{i18n("repo.settings.payload_url")}</label>
			<input id="payload_url" name="payload_url" type="url" value={String(props.webhook?.uRL ?? "")} autofocus required />
		</div>
		<div className={`required field ${(props.err_Channel) ? `error` : ""}`}>
			<label htmlFor="channel">{i18n("repo.settings.slack_channel")}</label>
			<input id="channel" name="channel" value={String(props.slackHook?.channel ?? "")} placeholder="#general" required />
		</div>

		<div className="field">
			<label htmlFor="username">{i18n("repo.settings.slack_username")}</label>
			<input id="username" name="username" value={String(props.slackHook?.username ?? "")} placeholder="Gitea" />
		</div>
		<div className="field">
			<label htmlFor="icon_url">{i18n("repo.settings.slack_icon_url")}</label>
			<input id="icon_url" name="icon_url" value={String(props.slackHook?.iconURL ?? "")} placeholder="https://example.com/img/favicon.png" />
		</div>
		<div className="field">
			<label htmlFor="color">{i18n("repo.settings.slack_color")}</label>
			<input id="color" name="color" value={String(props.slackHook?.color ?? "")} placeholder="#dd4b39, good, warning, danger" />
		</div>
		{/* FIXME: support authorization header or not? */}
		{/* template: repo/settings/webhook/settings */}
	</form>
</>) : null}

  </>)
}
