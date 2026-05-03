// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function New(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.badges.new_badge")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form form-fetch-action" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div className="required field">
					<label>{i18n("admin.badges.slug")}</label>
					<input autofocus required name="slug" />
				</div>
				<div className="required field">
					<label>{i18n("admin.badges.description")}</label>
					<textarea name="description" rows="2" required></textarea>
				</div>
				<div className="field">
					<label>{i18n("admin.badges.image_url")}</label>
					<input type="url" name="image_url" />
				</div>
				<div className="field">
					<button className="ui primary button">{i18n("admin.badges.new_badge")}</button>
				</div>
			</form>
		</div>
	</div>
{/* template: admin/layout_footer */}

  </>)
}
