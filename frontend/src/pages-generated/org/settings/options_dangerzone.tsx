import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function OptionsDangerzone(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached error header">
	{i18n("repo.settings.danger_zone")}
</h4>
<div className="ui attached error danger segment">
	<div className="flex-divided-list items-with-main">
		<div className="item tw-items-center">
			<div className="item-main">
				<div className="item-title">{i18n("org.settings.visibility")}</div>
				<div className="item-body">{i18n("org.settings.visibility_desc")}</div>
			</div>
			<div className="item-trailing">
				<button className="ui basic red show-modal button" data-modal="#change-visibility-org-modal">{i18n("org.settings.change_visibility")}</button>
			</div>
		</div>

		<div className="item tw-items-center">
			<div className="item-main">
				<div className="item-title">{i18n("org.settings.rename")}</div>
				<div className="item-body">{i18n("org.settings.rename_desc")}</div>
			</div>
			<div className="item-trailing">
				<button className="ui basic red show-modal button" data-modal="#rename-org-modal">{i18n("org.settings.rename")}</button>
			</div>
		</div>

		<div className="item">
			<div className="item-main">
				<div className="item-title">{i18n("org.settings.delete_account")}</div>
				<div className="item-body">{i18n("org.settings.delete_prompt")}</div>
			</div>
			<div className="item-trailing">
				<button className="ui basic red show-modal button" data-modal="#delete-org-modal">{i18n("org.settings.delete_account")}</button>
			</div>
		</div>
	</div>
</div>

<div className="ui small modal" id="change-visibility-org-modal">
	<div className="header">
		{i18n("org.settings.change_visibility")}
	</div>
	<div className="content">
		<div className="ui warning message">
			<ul>
				<li>{i18n("org.settings.change_visibility_notices_1")}</li>
				<li>{i18n("org.settings.change_visibility_notices_2")}</li>
			</ul>
		</div>
		<form className="ui form form-fetch-action" action={`${String(props.link ?? "")}/visibility`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<input type="hidden" name="current_visibility" value={String(props.currentVisibility ?? "")} />
			<div className="tw-flex tw-flex-col tw-gap-3">
				<label>{i18n("org.settings.visibility")}</label>
				<div className="ui radio checkbox">
					<input name="visibility" type="radio" value="public" {...(props.currentVisibility?.isPublic ? {"checked": true} : {})} />
					<label>{i18n("org.settings.visibility.public")}</label>
				</div>
				<div className="ui radio checkbox">
					<input name="visibility" type="radio" value="limited" {...(props.currentVisibility?.isLimited ? {"checked": true} : {})} />
					<label>{i18n("org.settings.visibility.limited")}</label>
				</div>
				<div className="ui radio checkbox">
					<input name="visibility" type="radio" value="private" {...(props.currentVisibility?.isPrivate ? {"checked": true} : {})} />
					<label>{i18n("org.settings.visibility.private")}</label>
				</div>
			</div>

			<div className="actions">
				<button className="ui cancel button">{i18n("settings.cancel")}</button>
				<button className="ui red button">{i18n("org.settings.change_visibility")}</button>
			</div>
		</form>
	</div>
</div>

<div className="ui small modal" id="rename-org-modal">
	<div className="header">
		{i18n("org.settings.rename")}
	</div>
	<div className="content">
		<div className="ui warning message">
			<ul>
				<li>{i18n("org.settings.rename_notices_1")}</li>
				<li>{i18n("org.settings.rename_notices_2")}</li>
			</ul>
		</div>
		<form className="ui form form-fetch-action" action={`${String(props.link ?? "")}/rename`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<div className="field">
				<label>
					{i18n("org.settings.name_confirm")}
					<span className="tw-text-red">{props.org?.name as any}</span>
				</label>
			</div>
			<div className="required field">
				<label htmlFor="org_name_to_rename">{i18n("org.org_name_holder")}</label>
				<input id="org_name_to_rename" name="org_name" required />
			</div>

			<div className="required field">
				<label>{i18n("org.settings.rename_new_org_name")}</label>
				<input name="new_org_name" required />
			</div>

			<div className="actions">
				<button className="ui cancel button">{i18n("settings.cancel")}</button>
				<button className="ui red button">{i18n("org.settings.rename")}</button>
			</div>
		</form>
	</div>
</div>

<div className="ui small modal" id="delete-org-modal">
	<div className="header">
		{i18n("org.settings.delete_account")}
	</div>
	<div className="content">
		<div className="ui warning message">
			<ul>
				<li>{i18n("org.settings.delete_notices_1")}</li>
				<li>{i18n("org.settings.delete_notices_2")}</li>
				<li>{i18n("org.settings.delete_notices_3")}</li>
				<li>{i18n("org.settings.delete_notices_4")}</li>
			</ul>
		</div>
		<form className="ui form form-fetch-action" action={`${String(props.link ?? "")}/delete`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<div className="field">
				<label>
					{i18n("org.settings.name_confirm")}
					<span className="tw-text-red">{props.org?.name as any}</span>
				</label>
			</div>
			<div className="required field">
				<label>{i18n("org.org_name_holder")}</label>
				<input name="org_name" required />
			</div>

			<div className="actions">
				<button className="ui cancel button">{i18n("settings.cancel")}</button>
				<button className="ui red button">{i18n("org.settings.delete_account")}</button>
			</div>
		</form>
	</div>
</div>

  </>)
}
