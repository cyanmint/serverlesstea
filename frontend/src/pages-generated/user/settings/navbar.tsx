import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Navbar(props: Record<string, unknown>) {
  return (<>
<div className="flex-container-nav">
	<div className="ui fluid vertical menu">
		<div className="header item">{i18n("user.settings")}</div>
		<a className={`${(props.pageIsSettingsProfile) ? `active ` : ""}item`} href={`/user/settings`}>
			{i18n("settings.profile")}
		</a>
		{(!(props.userDisabledFeatures?.contains?.("manage_credentials", "deletion"))) ? (<>
		<a className={`${(props.pageIsSettingsAccount) ? `active ` : ""}item`} href={`/user/settings/account`}>
			{i18n("settings.account")}
		</a>
		</>) : null}
		{(props.enableNotifyMail) ? (<>
		<a className={`${(props.pageIsSettingsNotifications) ? `active ` : ""}item`} href={`/user/settings/notifications`}>
			{i18n("notifications")}
		</a>
		</>) : null}
		<a className={`${(props.pageIsSettingsAppearance) ? `active ` : ""}item`} href={`/user/settings/appearance`}>
			{i18n("settings.appearance")}
		</a>
		{(!(props.userDisabledFeatures?.contains?.("manage_mfa", "manage_credentials"))) ? (<>
		<a className={`${(props.pageIsSettingsSecurity) ? `active ` : ""}item`} href={`/user/settings/security`}>
			{i18n("settings.security")}
		</a>
		</>) : null}
		<a className={`${(props.pageIsSettingsBlockedUsers) ? `active ` : ""}item`} href={`/user/settings/blocked_users`}>
			{i18n("user.block.list")}
		</a>
		<a className={`${(props.pageIsSettingsApplications) ? `active ` : ""}item`} href={`/user/settings/applications`}>
			{i18n("settings.applications")}
		</a>
		{(!(props.userDisabledFeatures?.contains?.("manage_ssh_keys", "manage_gpg_keys"))) ? (<>
		<a className={`${(props.pageIsSettingsKeys) ? `active ` : ""}item`} href={`/user/settings/keys`}>
			{i18n("settings.ssh_gpg_keys")}
		</a>
		</>) : null}
		{(props.enableActions) ? (<>
		<details className="item toggleable-item" {...((props.pageIsUserSettingsActionsGeneral || props.pageIsSharedSettingsRunners || props.pageIsSharedSettingsSecrets || props.pageIsSharedSettingsVariables) ? {"open": true} : {})}>
			<summary>{i18n("actions.actions")}</summary>
			<div className="menu">
				<a className={`${(props.pageIsUserSettingsActionsGeneral) ? `active ` : ""}item`} href={`/user/settings/actions/general`}>
					{i18n("actions.general")}
				</a>
				<a className={`${(props.pageIsSharedSettingsRunners) ? `active ` : ""}item`} href={`/user/settings/actions/runners`}>
					{i18n("actions.runners")}
				</a>
				<a className={`${(props.pageIsSharedSettingsSecrets) ? `active ` : ""}item`} href={`/user/settings/actions/secrets`}>
					{i18n("secrets.secrets")}
				</a>
				<a className={`${(props.pageIsSharedSettingsVariables) ? `active ` : ""}item`} href={`/user/settings/actions/variables`}>
					{i18n("actions.variables")}
				</a>
			</div>
		</details>
		</>) : null}
		{(props.enablePackages) ? (<>
		<a className={`${(props.pageIsSettingsPackages) ? `active ` : ""}item`} href={`/user/settings/packages`}>
			{i18n("packages.title")}
		</a>
		</>) : null}
		{(!("DisableWebhooks")) ? (<>
		<a className={`${(props.pageIsSettingsHooks) ? `active ` : ""}item`} href={`/user/settings/hooks`}>
			{i18n("repo.settings.hooks")}
		</a>
		</>) : null}
		<a className={`${(props.pageIsSettingsOrganization) ? `active ` : ""}item`} href={`/user/settings/organization`}>
			{i18n("settings.organization")}
		</a>
		<a className={`${(props.pageIsSettingsRepos) ? `active ` : ""}item`} href={`/user/settings/repos`}>
			{i18n("settings.repos")}
		</a>
	</div>
</div>

  </>)
}
