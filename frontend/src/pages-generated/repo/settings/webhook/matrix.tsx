// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Matrix(props: Record<string, unknown>) {
  return (<>
{(props.hookType === "matrix") ? (<>
	<p>{i18n("repo.settings.add_web_hook_desc")}</p>
	<form className="ui form" action={`${String(props.baseLink ?? "")}/matrix/`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<div className={`required field ${(props.err_HomeserverURL) ? `error` : ""}`}>
			<label htmlFor="homeserver_url">{i18n("repo.settings.matrix.homeserver_url")}</label>
			<input id="homeserver_url" name="homeserver_url" type="url" value={String(props.matrixHook?.homeserverURL ?? "")} autofocus required />
		</div>
		<div className={`required field ${(props.err_Room) ? `error` : ""}`}>
			<label htmlFor="room_id">{i18n("repo.settings.matrix.room_id")}</label>
			<input id="room_id" name="room_id" type="text" value={String(props.matrixHook?.room ?? "")} required />
		</div>
		<div className="field">
			<label>{i18n("repo.settings.matrix.message_type")}</label>
				<div className="ui selection dropdown">
				<input type="hidden" id="message_type" name="message_type" value={`${(props.matrixHook?.messageType) ? `${String(props.matrixHook?.messageType ?? "")}` : `1`}`} />
				<div className="default text"></div>
				<span className="svg-icon" aria-label="octicon-triangle-down"></span>
				<div className="menu">
					<div className="item" data-value="1">m.notice</div>
					<div className="item" data-value="2">m.text</div>
				</div>
			</div>
		</div>
		{/* template: repo/settings/webhook/settings */}
	</form>
</>) : null}

  </>)
}
