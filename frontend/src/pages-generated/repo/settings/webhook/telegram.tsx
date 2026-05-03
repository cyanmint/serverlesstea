// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Telegram(props: Record<string, unknown>) {
  return (<>
{(props.hookType === "telegram") ? (<>
	<p>{i18n("repo.settings.add_web_hook_desc")}</p>
	<form className="ui form" action={`${String(props.baseLink ?? "")}/telegram/`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<div className={`required field ${(props.err_BotToken) ? `error` : ""}`}>
			<label htmlFor="bot_token">{i18n("repo.settings.bot_token")}</label>
			<input id="bot_token" name="bot_token" type="text" value={String(props.telegramHook?.botToken ?? "")} autofocus required />
		</div>
		<div className={`required field ${(props.err_ChatID) ? `error` : ""}`}>
			<label htmlFor="chat_id">{i18n("repo.settings.chat_id")}</label>
			<input id="chat_id" name="chat_id" type="text" value={String(props.telegramHook?.chatID ?? "")} required />
		</div>
		<div className={`field ${(props.err_ThreadID) ? `error` : ""}`}>
			<label htmlFor="thread_id">{i18n("repo.settings.thread_id")}</label>
			<input id="thread_id" name="thread_id" type="text" value={String(props.telegramHook?.threadID ?? "")} />
		</div>
		{/* FIXME: support authorization header or not? */}
		{/* template: repo/settings/webhook/settings */}
	</form>
</>) : null}

  </>)
}
