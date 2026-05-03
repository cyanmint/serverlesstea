import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function VariableList(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("actions.variables.management")}
	<div className="ui right">
		<button className="ui primary tiny button show-modal"
			data-modal="#edit-variable-modal"
			{...{"data-modal-form.action": `${String(props.link ?? "")}/new`}}
			data-modal-header={String(i18n("actions.variables.creation") ?? "")}
			data-modal-dialog-variable-name=""
			data-modal-dialog-variable-data=""
			data-modal-dialog-variable-description=""
		>
			{i18n("actions.variables.creation")}
		</button>
	</div>
</h4>
<div className="ui attached segment">
	{(props.variables) ? (<>
	<div className="flex-divided-list items-with-main">
		{((props.variables) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<div className="item tw-items-center">
			<div className="item-leading">
				<span className="svg-icon" aria-label="octicon-pencil"></span>
			</div>
			<div className="item-main">
				<div className="item-title">
					{item.name as any}
				</div>
				<div className="item-body">
					{(item.description) ? (<>{item.description as any}</>) : (<>-</>)}
				</div>
				<div className="item-body">
					{item.data as any}
				</div>
			</div>
			<div className="item-trailing">
				<span className="color-text-light-2">
					{i18n("settings.added_on")}
				</span>
				<button className="btn interact-bg tw-p-2 show-modal"
					data-tooltip-content={String(i18n("actions.variables.edit") ?? "")}
					data-modal="#edit-variable-modal"
					{...{"data-modal-form.action": `${String(props.link ?? "")}/${String(props.iD ?? "")}/edit`}}
					data-modal-header={String(i18n("actions.variables.edit") ?? "")}
					data-modal-dialog-variable-name={String(props.name ?? "")}
					data-modal-dialog-variable-data={String(props.data ?? "")}
					data-modal-dialog-variable-description={String(props.description ?? "")}
				>
					<span className="svg-icon" aria-label="octicon-pencil"></span>
				</button>
				<button className="btn interact-bg tw-p-2 link-action"
					data-tooltip-content={String(i18n("actions.variables.deletion") ?? "")}
					data-url={`${String(props.link ?? "")}/${String(props.iD ?? "")}/delete`}
					data-modal-confirm={String(i18n("actions.variables.deletion.description") ?? "")}
				>
					<span className="svg-icon" aria-label="octicon-trash"></span>
				</button>
			</div>
		</div>
		</React.Fragment>))}
	</div>
	</>) : (<>
		{i18n("actions.variables.none")}
	</>)}
</div>

{/* * Edit variable dialog */}
<div className="ui small modal" id="edit-variable-modal">
	<div className="header"></div>
	<form className="ui form form-fetch-action" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<div className="content">
			<div className="field">
				{i18n("actions.variables.description")}
			</div>
			<div className="field">
				<label htmlFor="dialog-variable-name">{i18n("name")}</label>
				<input autofocus required
					name="name"
					id="dialog-variable-name"
					value={String(props.name ?? "")}
					pattern="^(?!GITEA_|GITHUB_)[a-zA-Z_][a-zA-Z0-9_]*$"
					placeholder={String(i18n("secrets.creation.name_placeholder") ?? "")} />
			</div>
			<div className="field">
				<label htmlFor="dialog-variable-data">{i18n("value")}</label>
				<textarea required
					name="data"
					id="dialog-variable-data"
					maxlength={String(props.dataMaxLength ?? "")}
					placeholder={String(i18n("secrets.creation.value_placeholder") ?? "")}
				></textarea>
			</div>
			<div className="field">
				<label htmlFor="dialog-variable-description">{i18n("secrets.creation.description")}</label>
				<textarea
					name="description"
					id="dialog-variable-description"
					rows="2"
					maxlength={String(props.descriptionMaxLength ?? "")}
					placeholder={String(i18n("secrets.creation.description_placeholder") ?? "")}
				></textarea>
			</div>
		</div>
		{/* template: base/modal_actions_confirm */}
	</form>
</div>


  </>)
}
