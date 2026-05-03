// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function LabelEditModal(props: Record<string, unknown>) {
  return (<>
<div className="ui small modal" id="issue-label-edit-modal"
		data-current-page-link={String(props.link ?? "")}
		data-text-new-label={String(i18n("repo.issues.new_label") ?? "")}
		data-text-edit-label={String(i18n("repo.issues.label_modify") ?? "")}
>
	<div className="header"></div>
	<div className="content">
		<form className="ui form ignore-dirty form-fetch-action" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<input name="id" type="hidden" />
			<div className="required field">
				<label htmlFor="name">{i18n("repo.issues.label_title")}</label>
				<div className="ui small input">
					<input className="label-name-input" name="title" placeholder={String(i18n("repo.issues.new_label_placeholder") ?? "")} autofocus required maxlength="50" />
				</div>
			</div>
			<div className="field label-exclusive-input-field">
				<div className="ui checkbox">
					<input className="label-exclusive-input" name="exclusive" type="checkbox" />
					<label>{i18n("repo.issues.label_exclusive")}</label>
				</div>
				<br />
				<small className="desc">{i18n("repo.issues.label_exclusive_desc")}</small>
				<div className="desc tw-ml-1 tw-mt-2 tw-hidden label-exclusive-warning">
					<span className="svg-icon" aria-label="octicon-alert"></span> {i18n("repo.issues.label_exclusive_warning")}
				</div>
				<div className="field label-exclusive-order-input-field tw-mt-2">
					<label className="flex-text-block">
						{i18n("repo.issues.label_exclusive_order")}
						<span data-tooltip-content={String(i18n("repo.issues.label_exclusive_order_tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-info"></span></span>
					</label>
					<input className="label-exclusive-order-input" name="exclusive_order" type="number" maxlength="4" />
				</div>
			</div>
			<div className="field label-is-archived-input-field">
				<div className="ui checkbox">
					<input className="label-is-archived-input" name="is_archived" type="checkbox" />
					<label>{i18n("repo.issues.label_archive")}</label>
				</div>
				<i className="tw-ml-1" data-tooltip-content={i18n("repo.issues.label_archive_tooltip")}>
					<span className="svg-icon" aria-label="octicon-info"></span>
				</i>
			</div>
			<div className="field">
				<label htmlFor="description">{i18n("repo.issues.label_description")}</label>
				<div className="ui small fluid input">
					<input className="label-desc-input" name="description" placeholder={String(i18n("repo.issues.new_label_desc_placeholder") ?? "")} maxlength="200" />
				</div>
			</div>
			<div className="field">
				<label htmlFor="color">{i18n("repo.issues.label_color")}</label>
				<div className="color-picker-combo" data-global-init="initColorPicker">
					{'{'}/* the "#" is optional because backend NormalizeColor is able to handle it, API also accepts both formats, and it is easier for users to directly copy-paste a hex value */{'}'}
					<input name="color" value="#70c24a" placeholder="#c320f6" required pattern="^#?([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$" maxlength="7" />
					{/* template: repo/issue/label_precolors */}
				</div>
			</div>
		</form>
	</div>
	<div className="actions">
		<button className="ui small basic cancel button">
			<span className="svg-icon" aria-label="octicon-x"></span>
			{i18n("cancel")}
		</button>
		<button className="ui primary small approve button">
			<span className="svg-icon" aria-label="fontawesome-save"></span>
			{i18n("save")}
		</button>
	</div>
</div>

  </>)
}
