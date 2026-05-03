// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Edit(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.badges.edit_badge")}
		</h4>
			<div className="ui attached segment">
				<form className="ui form form-fetch-action" data-action="./edit" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					<div className="field">
					<label>{i18n("admin.badges.slug")}</label>
					<input value={String(props.badge?.slug ?? "")} readonly />
				</div>
				<div className={`field ${(props.err_Description) ? `error` : ""}`}>
					<label>{i18n("admin.badges.description")}</label>
					<textarea name="description" rows="2">{props.badge?.description as any}</textarea>
				</div>
				<div className={`field ${(props.err_ImageURL) ? `error` : ""}`}>
					<label>{i18n("admin.badges.image_url")}</label>
					<input type="url" name="image_url" value={String(props.badge?.imageURL ?? "")} />
				</div>

				<div className="divider"></div>

				<div className="field">
					<button className="ui primary button">{i18n("admin.badges.update_badge")}</button>
					<button className="ui red button show-modal" data-modal="#delete-badge-modal">{i18n("admin.badges.delete_badge")}</button>
				</div>
			</form>
		</div>
	</div>

<div className="ui g-modal-confirm modal" id="delete-badge-modal">
	<div className="header">
		<span className="svg-icon" aria-label="octicon-trash"></span>
		{i18n("admin.badges.delete_badge")}
	</div>
	<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} data-action="./delete">
		<div className="content">
			<p>{i18n("admin.badges.delete_badge_desc")}</p>
		</div>
		{/* template: base/modal_actions_confirm */}
	</form>
</div>

{/* template: admin/layout_footer */}

  </>)
}
