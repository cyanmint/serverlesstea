// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Discord(props: Record<string, unknown>) {
  return (<>
{(props.hookType === "discord") ? (<>
	<p>{i18n("repo.settings.add_web_hook_desc")}</p>
	<form className="ui form" action={`${String(props.baseLink ?? "")}/discord/`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<div className={`required field ${(props.err_PayloadURL) ? `error` : ""}`}>
			<label htmlFor="payload_url">{i18n("repo.settings.payload_url")}</label>
			<input id="payload_url" name="payload_url" type="url" value={String(props.webhook?.uRL ?? "")} autofocus required />
		</div>
		<div className="field">
			<label htmlFor="username">{i18n("repo.settings.discord_username")}</label>
			<input id="username" name="username" value={String(props.discordHook?.username ?? "")} placeholder="Gitea" />
		</div>
		<div className="field">
			<label htmlFor="icon_url">{i18n("repo.settings.discord_icon_url")}</label>
			<input id="icon_url" name="icon_url" value={String(props.discordHook?.iconURL ?? "")} placeholder="https://example.com/assets/img/logo.svg" />
		</div>
		{/* FIXME: support authorization header or not? */}
		{/* template: repo/settings/webhook/settings */}
	</form>
</>) : null}

  </>)
}
