// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function BlockUserDialog(props: Record<string, unknown>) {
  return (<>
<div className="ui small modal" id="block-user-modal">
	<div className="header">{i18n("user.block.title")}</div>
	<div className="content">
		<div className="ui warning message">{i18n("user.block.info")} <a target="_blank" href="https://docs.gitea.com/usage/access-control/blocking-user">{i18n("user.block.info.docs")}</a></div>
		<form className="ui form modal-form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<input type="hidden" name="action" value="block" />
			<input type="hidden" name="blockee" className="modal-blockee" />
			<div className="field">
				<label>{i18n("user.block.user_to_block")}: <span className="tw-text-red modal-blockee-name"></span></label>
			</div>
			<div className="field">
				<label htmlFor="block-note">{i18n("user.block.note.title")}</label>
				<input id="block-note" name="note" />
				<p className="help">{i18n("user.block.note.info")}</p>
			</div>
			<div className="actions">
				<button className="ui cancel button">{i18n("cancel")}</button>
				<button className="ui red button">{i18n("user.block.block")}</button>
			</div>
		</form>
	</div>
</div>

  </>)
}
