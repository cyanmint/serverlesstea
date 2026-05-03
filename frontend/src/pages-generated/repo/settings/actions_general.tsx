import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ActionsGeneral(props: Record<string, unknown>) {
  return (<>
{/* $isActionsEnabled */}
<div className="repo-setting-content">
	{/* Enable/Disable Actions Section (First) */}
	<h4 className="ui top attached header">
		{i18n("actions.general.enable_actions")}
	</h4>
	<div className="ui attached segment">
		<form className="ui form" action={`${String(props.link ?? "")}/actions_unit`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			{/* $isActionsGlobalDisabled */}
			<div className="inline field">
				<label>{i18n("actions.actions")}</label>
				<div className={`ui checkbox${(props.isActionsGlobalDisabled) ? ` disabled` : ""}`}{...(props.isActionsGlobalDisabled ? {"data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {})}>
					<input name="enable_actions" type="checkbox" {...(props.isActionsGlobalDisabled ? {"disabled": true} : {})} {...(props.isActionsEnabled ? {"checked": true} : {})} />
					<label>{i18n("repo.settings.actions_desc")}</label>
				</div>
			</div>
			{(!(props.isActionsGlobalDisabled)) ? (<>
			<div className="divider"></div>
				<div className="field">
				<button className="ui primary button">{i18n("repo.settings.update_settings")}</button>
			</div>
			</>) : null}
		</form>
	</div>

{(props.isActionsEnabled) ? (<>
	{/* Token Permissions Section */}
	<h4 className="ui top attached header">
		{i18n("actions.general.permissions")}
	</h4>
	<div className="ui attached segment">
		<form className="ui form" action={`${String(props.repoLink ?? "")}/settings/actions/general/token_permissions`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} data-global-init="initRepoActionsPermissionsForm">
			{/* Override Owner Configuration */}
			<div className="field">
				<div className="ui checkbox">
					<input type="checkbox" name="override_owner_config" {...(props.overrideOwnerConfig ? {"checked": true} : {})} />
					<label><strong>{i18n("actions.general.token_permissions.override_owner")}</strong></label>
				</div>
				<div className="help">{i18n("actions.general.token_permissions.override_owner_desc")}</div>
			</div>

			<div className="divider"></div>

			<div className="field js-repo-token-permissions-config">
				{/* template: shared/actions/permission_mode_select */}
				<div className="divider"></div>
				{/* template: shared/actions/permissions_table */}
			</div>

			<div className="field">
				<button className="ui primary button">{i18n("repo.settings.update_settings")}</button>
			</div>
		</form>
	</div>
</>) : null}

{(props.isActionsEnabled) ? (<>
	{(props.repository?.isPrivate) ? (<>
	{/* Collaborative Owners Section */}
	<h4 className="ui top attached header">
		{i18n("actions.general.collaborative_owners_management")}
	</h4>
	{("len .CollaborativeOwners") ? (<>
	<div className="ui attached segment">
		<div className="flex-divided-list items-with-main">
			{((props.collaborativeOwners) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item tw-items-center">
				<div className="item-leading">
					<a href={String(props.homeLink ?? "")}>{/* TODO: {{ctx.AvatarUtils.Avatar . 32}} */}</a>
				</div>
				<div className="item-main">
					<div className="item-title">
						{/* template: shared/user/name */}
					</div>
				</div>
				<div className="item-trailing">
					<button className="ui red tiny button inline link-action"
						data-url={`${String(props.link ?? "")}/collaborative_owner/delete?id=${String(props.iD ?? "")}`}
						data-modal-confirm-header={String(i18n("actions.general.remove_collaborative_owner") ?? "")}
						data-modal-confirm-content={String(i18n("actions.general.remove_collaborative_owner_desc") ?? "")}
					>{i18n("remove")}</button>
				</div>
			</div>
			</React.Fragment>))}
		</div>
	</div>
	</>) : null}
	<div className="ui bottom attached segment">
		<form className="ui form form-fetch-action" action={`${String(props.link ?? "")}/collaborative_owner/add`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<div id="search-user-box" className="ui search input tw-align-middle" data-include-orgs="true">
				<input className="prompt" name="collaborative_owner" placeholder={String(i18n("search.user_kind") ?? "")} autocomplete="off" autofocus required />
			</div>
			<button className="ui primary button">{i18n("actions.general.add_collaborative_owner")}</button>
		</form>
		<br />
		{i18n("actions.general.collaborative_owners_management_help")}
	</div>
	</>) : null}
</>) : null}
</div>

  </>)
}
