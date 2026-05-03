import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Navbar(props: Record<string, unknown>) {
  return (<>
<div className="flex-container-nav">
	<div className="ui fluid vertical menu">
		<div className="header item">{i18n("org.settings")}</div>
		<a className={`${(props.pageIsSettingsOptions) ? `active ` : ""}item`} href={`${String(props.orgLink ?? "")}/settings`}>
			{i18n("org.settings.options")}
		</a>
		{(!("DisableWebhooks")) ? (<>
		<a className={`${(props.pageIsSettingsHooks) ? `active ` : ""}item`} href={`${String(props.orgLink ?? "")}/settings/hooks`}>
			{i18n("repo.settings.hooks")}
		</a>
		</>) : null}
		<a className={`${(props.pageIsOrgSettingsLabels) ? `active ` : ""}item`} href={`${String(props.orgLink ?? "")}/settings/labels`}>
			{i18n("repo.labels")}
		</a>
		{(props.enableOAuth2) ? (<>
		<a className={`${(props.pageIsSettingsApplications) ? `active ` : ""}item`} href={`${String(props.orgLink ?? "")}/settings/applications`}>
			{i18n("settings.applications")}
		</a>
		</>) : null}
		<a className={`${(props.pageIsSettingsBlockedUsers) ? `active ` : ""}item`} href={`${String(props.orgLink ?? "")}/settings/blocked_users`}>
			{i18n("user.block.list")}
		</a>
		{(props.enablePackages) ? (<>
		<a className={`${(props.pageIsSettingsPackages) ? `active ` : ""}item`} href={`${String(props.orgLink ?? "")}/settings/packages`}>
			{i18n("packages.title")}
		</a>
		</>) : null}
		{(props.enableActions) ? (<>
		<details className="item toggleable-item" {...((props.pageIsOrgSettingsActionsGeneral || props.pageIsSharedSettingsRunners || props.pageIsSharedSettingsSecrets || props.pageIsSharedSettingsVariables) ? {"open": true} : {})}>
			<summary>{i18n("actions.actions")}</summary>
			<div className="menu">
				<a className={`${(props.pageIsOrgSettingsActionsGeneral) ? `active ` : ""}item`} href={`${String(props.orgLink ?? "")}/settings/actions`}>
					{i18n("settings.general")}
				</a>
				<a className={`${(props.pageIsSharedSettingsRunners) ? `active ` : ""}item`} href={`${String(props.orgLink ?? "")}/settings/actions/runners`}>
					{i18n("actions.runners")}
				</a>
				<a className={`${(props.pageIsSharedSettingsSecrets) ? `active ` : ""}item`} href={`${String(props.orgLink ?? "")}/settings/actions/secrets`}>
					{i18n("secrets.secrets")}
				</a>
				<a className={`${(props.pageIsSharedSettingsVariables) ? `active ` : ""}item`} href={`${String(props.orgLink ?? "")}/settings/actions/variables`}>
					{i18n("actions.variables")}
				</a>
			</div>
		</details>
		</>) : null}
	</div>
</div>

  </>)
}
