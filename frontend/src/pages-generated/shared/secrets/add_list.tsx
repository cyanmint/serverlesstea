import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function AddList(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("secrets.management")}
	<div className="ui right">
		<button className="ui primary tiny button show-modal"
			data-modal="#add-secret-modal"
			{...{"data-modal-form.action": String(props.link ?? "")}}
			data-modal-header={String(i18n("secrets.add_secret") ?? "")}
			{...{"data-modal-secret-name.value": ""}}
			{...{"data-modal-secret-name.read-only": "false"}}
			data-modal-secret-data=""
			data-modal-secret-description=""
		>
			{i18n("secrets.add_secret")}
		</button>
	</div>
</h4>
<div className="ui attached segment">
	{(props.secrets) ? (<>
	<div className="flex-divided-list items-with-main">
		{((props.secrets) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<div className="item tw-items-center">
			<div className="item-leading">
				<span className="svg-icon" aria-label="octicon-key"></span>
			</div>
			<div className="item-main">
				<div className="item-title">
					{item.name as any}
				</div>
				<div className="item-body">
					{(item.description) ? (<>{item.description as any}</>) : (<>-</>)}
				</div>
				<div className="item-body">
					******
				</div>
			</div>
			<div className="item-trailing">
				<span className="color-text-light-2">
					{i18n("settings.added_on")}
				</span>
				<button className="btn interact-bg show-modal tw-p-2"
					data-modal="#add-secret-modal"
					{...{"data-modal-form.action": String(props.link ?? "")}}
					data-modal-header={String(i18n("secrets.edit_secret") ?? "")}
					data-tooltip-content={String(i18n("secrets.edit_secret") ?? "")}
					{...{"data-modal-secret-name.value": String(props.name ?? "")}}
					{...{"data-modal-secret-name.read-only": "true"}}
					data-modal-secret-data=""
					data-modal-secret-description={`${(props.description) ? `${String(props.description ?? "")}` : ""}`}
				>
					<span className="svg-icon" aria-label="octicon-pencil"></span>
				</button>
				<button className="btn interact-bg link-action tw-p-2"
					data-url={`${String(props.link ?? "")}/delete?id=${String(props.iD ?? "")}`}
					data-modal-confirm={String(i18n("secrets.deletion.description") ?? "")}
					data-tooltip-content={String(i18n("secrets.deletion") ?? "")}
				>
					<span className="svg-icon" aria-label="octicon-trash"></span>
				</button>
			</div>
		</div>
		</React.Fragment>))}
	</div>
	</>) : (<>
		{i18n("secrets.none")}
	</>)}
</div>

{/* Add secret dialog */}
<div className="ui small modal" id="add-secret-modal">
	<div className="header"></div>
	<form className="ui form form-fetch-action" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<div className="content">
			<div className="field">
				{i18n("secrets.description")}
			</div>
			<div className="field">
				<label htmlFor="secret-name">{i18n("name")}</label>
				<input autofocus required
					id="secret-name"
					name="name"
					value={String(props.name ?? "")}
					pattern="^(?!GITEA_|GITHUB_)[a-zA-Z_][a-zA-Z0-9_]*$"
					placeholder={String(i18n("secrets.creation.name_placeholder") ?? "")} />
			</div>
			<div className="field">
				<label htmlFor="secret-data">{i18n("value")}</label>
				<textarea required
					id="secret-data"
					name="data"
					maxlength={String(props.dataMaxLength ?? "")}
					placeholder={String(i18n("secrets.creation.value_placeholder") ?? "")}
				></textarea>
			</div>
			<div className="field">
				<label htmlFor="secret-description">{i18n("secrets.creation.description")}</label>
				<textarea
					id="secret-description"
					name="description"
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
