import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Feishu(props: Record<string, unknown>) {
  return (<>
{(props.hookType === "feishu") ? (<>
	<p>
		{i18n("repo.settings.add_web_hook_desc")}
		{i18n("repo.settings.add_web_hook_desc")}
	</p>
	<form className="ui form" action={`${String(props.baseLink ?? "")}/feishu/`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<div className={`required field ${(props.err_PayloadURL) ? `error` : ""}`}>
			<label htmlFor="payload_url">{i18n("repo.settings.payload_url")}</label>
			<input id="payload_url" name="payload_url" type="url" value={String(props.webhook?.uRL ?? "")} autofocus required />
		</div>
		{/* template: repo/settings/webhook/settings */}
	</form>
</>) : null}

  </>)
}
