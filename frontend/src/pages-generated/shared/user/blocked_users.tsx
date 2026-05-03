import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function BlockedUsers(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("user.block.title")}
</h4>
<div className="ui attached segment">
	<p>{i18n("user.block.info")} <a target="_blank" href="https://docs.gitea.com/usage/access-control/blocking-user">{i18n("user.block.info.docs")}</a></p>
</div>
<div className="ui segment">
	<form className="ui form form-fetch-action ignore-dirty" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<input type="hidden" name="action" value="block" />
		<div id="search-user-box" className="field ui fluid search input">
			<input className="prompt tw-mr-2" name="blockee" placeholder={String(i18n("search.user_kind") ?? "")} autocomplete="off" required />
			<button className="ui red button">{i18n("user.block.block")}</button>
		</div>
		<div className="field">
			<label>{i18n("user.block.note.title")}</label>
			<input name="note" />
			<p className="help">{i18n("user.block.note.info")}</p>
		</div>
	</form>
</div>
<h4 className="ui top attached header">
	{i18n("user.block.list")}
</h4>
<div className="ui attached segment">
	<div className="flex-divided-list items-with-main">
		{((props.userBlocks) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item">
				<div className="item-leading">
					{/* TODO: {{ctx.AvatarUtils.Avatar .Blockee}} */}
				</div>
				<div className="item-main">
					<div className="item-title">
						<a className="item" href={String(props.blockee?.homeLink ?? "")}>{item.blockee?.getDisplayName as any}</a>
					</div>
					{(item.note) ? (<>
					<div className="item-body">
						<i>{i18n("user.block.note")}:</i> {item.note as any}
					</div>
					</>) : null}
				</div>
				<div className="item-trailing">
					<button className="ui compact mini button show-modal" data-modal="#block-user-note-modal" data-modal-modal-blockee={String(props.blockee?.name ?? "")} data-modal-modal-note={String(props.note ?? "")}>{i18n("user.block.note.edit")}</button>
					<form className="form-fetch-action" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
						<input type="hidden" name="action" value="unblock" />
						<input type="hidden" name="blockee" value={String(props.blockee?.name ?? "")} />
						<button className="ui compact mini button">{i18n("user.block.unblock")}</button>
					</form>
				</div>
			</div>
		{/* else */}
			<div className="item">{i18n("user.block.list.none")}</div>
		</React.Fragment>))}
	</div>
</div>
<div className="ui small modal" id="block-user-note-modal">
	<div className="header">{i18n("user.block.note.edit")}</div>
	<div className="content">
		<form className="ui form form-fetch-action" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<input type="hidden" name="action" value="note" />
			<input type="hidden" name="blockee" className="modal-blockee" />
			<div className="field">
				<label>{i18n("user.block.note.title")}</label>
				<input name="note" className="modal-note" />
				<p className="help">{i18n("user.block.note.info")}</p>
			</div>
			<div className="actions">
				<button className="ui cancel button">{i18n("cancel")}</button>
				<button className="ui primary button">{i18n("save")}</button>
			</div>
		</form>
	</div>
</div>

  </>)
}
