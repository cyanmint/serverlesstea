import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Navbar(props: Record<string, unknown>) {
  return (<>
<div className="flex-container-nav">
	<div className="ui fluid vertical menu">
		<div className="header item">{i18n("repo.settings")}</div>
		<a className={`${(props.pageIsSettingsOptions) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/settings`}>
			{i18n("repo.settings.options")}
		</a>
		{((props.repository?.isPrivate || props.permission?.hasAnyUnitPublicAccess)) ? (<>
		<a className={`${(props.pageIsSettingsPublicAccess) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/settings/public_access`}>
			{i18n("repo.settings.public_access")}
		</a>
		</>) : null}
		<a className={`${(props.pageIsSettingsCollaboration) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/settings/collaboration`}>
			{i18n("repo.settings.collaboration")}
		</a>
		{(!("DisableWebhooks")) ? (<>
			<a className={`${(props.pageIsSettingsHooks) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/settings/hooks`}>
				{i18n("repo.settings.hooks")}
			</a>
		</>) : null}
		{(props.repository?.unitEnabled ctx ctx?.consts?.repoUnitTypeCode) ? (<>
			<a className={`${(props.pageIsSettingsBranches) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/settings/branches`}>
				{i18n("repo.settings.branches")}
			</a>
			<a className={`${(props.pageIsSettingsTags) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/settings/tags`}>
				{i18n("repo.settings.tags")}
			</a>
			{(props.signedUser?.canEditGitHook) ? (<>
				<a className={`${(props.pageIsSettingsGitHooks) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/settings/hooks/git`}>
					{i18n("repo.settings.githooks")}
				</a>
			</>) : null}
			<a className={`${(props.pageIsSettingsKeys) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/settings/keys`}>
				{i18n("repo.settings.deploy_keys")}
			</a>
			{(props.lFSStartServer) ? (<>
				<a className={`${(props.pageIsSettingsLFS) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/settings/lfs`}>
					{i18n("repo.settings.lfs")}
				</a>
			</>) : null}
		</>) : null}
		<details className="item toggleable-item" {((props.pageIsSharedSettingsRunners || props.pageIsSharedSettingsSecrets || props.pageIsSharedSettingsVariables || props.pageIsActionsSettingsGeneral)) ? (<>open</>) : null}>
			<summary>{i18n("actions.actions")}</summary>
			<div className="menu">
				<a className={`${(props.pageIsActionsSettingsGeneral) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/settings/actions/general`}>
					{i18n("actions.general")}
				</a>
				{((props.enableActions && props.permission?.canRead ctx?.consts?.repoUnitTypeActions)) ? (<>
				<a className={`${(props.pageIsSharedSettingsRunners) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/settings/actions/runners`}>
					{i18n("actions.runners")}
				</a>
				<a className={`${(props.pageIsSharedSettingsSecrets) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/settings/actions/secrets`}>
					{i18n("secrets.secrets")}
				</a>
				<a className={`${(props.pageIsSharedSettingsVariables) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/settings/actions/variables`}>
					{i18n("actions.variables")}
				</a>
				</>) : null}
			</div>
		</details>
	</div>
</div>

  </>)
}
