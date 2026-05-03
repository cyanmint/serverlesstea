import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Navbar(props: Record<string, unknown>) {
  return (<>
<div className="flex-container-nav">
	<div className="ui fluid vertical menu">
		<div className="header item">{i18n("admin.settings")}</div>

		<details className="item toggleable-item" {...((props.pageIsAdminDashboard || props.pageIsAdminSelfCheck) ? {"open": true} : {})}>
			<summary>{i18n("admin.maintenance")}</summary>
			<div className="menu">
				<a className={`${(props.pageIsAdminDashboard) ? `active ` : ""}item`} href={`/-/admin`}>
					{i18n("admin.dashboard")}
				</a>
				<a className={`${(props.pageIsAdminSelfCheck) ? `active ` : ""}item`} href={`/-/admin/self_check`}>
					{i18n("admin.self_check")}
				</a>
			</div>
		</details>
		<details className="item toggleable-item" {...((props.pageIsAdminUsers || props.pageIsAdminBadges || props.pageIsAdminEmails || props.pageIsAdminOrganizations || props.pageIsAdminAuthentications) ? {"open": true} : {})}>
			<summary>{i18n("admin.identity_access")}</summary>
			<div className="menu">
				<a className={`${(props.pageIsAdminAuthentications) ? `active ` : ""}item`} href={`/-/admin/auths`}>
					{i18n("admin.authentication")}
				</a>
				<a className={`${(props.pageIsAdminOrganizations) ? `active ` : ""}item`} href={`/-/admin/orgs`}>
					{i18n("admin.organizations")}
				</a>
				<a className={`${(props.pageIsAdminUsers) ? `active ` : ""}item`} href={`/-/admin/users`}>
					{i18n("admin.users")}
				</a>
				<a className={`${(props.pageIsAdminBadges) ? `active ` : ""}item`} href={`/-/admin/badges`}>
					{i18n("admin.badges")}
				</a>
				<a className={`${(props.pageIsAdminEmails) ? `active ` : ""}item`} href={`/-/admin/emails`}>
					{i18n("admin.emails")}
				</a>
			</div>
		</details>
		<details className="item toggleable-item" {...((props.pageIsAdminRepositories || (props.enablePackages && props.pageIsAdminPackages)) ? {"open": true} : {})}>
			<summary>{i18n("admin.assets")}</summary>
			<div className="menu">
				{(props.enablePackages) ? (<>
					<a className={`${(props.pageIsAdminPackages) ? `active ` : ""}item`} href={`/-/admin/packages`}>
						{i18n("packages.title")}
					</a>
				</>) : null}
				<a className={`${(props.pageIsAdminRepositories) ? `active ` : ""}item`} href={`/-/admin/repos`}>
					{i18n("admin.repositories")}
				</a>
			</div>
		</details>
		{/* Webhooks and OAuth can be both disabled here, so add this if statement to display different ui */}
		{((!("DisableWebhooks") && props.enableOAuth2)) ? (<>
			<details className="item toggleable-item" {...((props.pageIsAdminDefaultHooks || props.pageIsAdminSystemHooks || props.pageIsAdminApplications) ? {"open": true} : {})}>
				<summary>{i18n("admin.integrations")}</summary>
				<div className="menu">
					<a className={`${(props.pageIsAdminApplications) ? `active ` : ""}item`} href={`/-/admin/applications`}>
						{i18n("settings.applications")}
					</a>
					<a className={`${((props.pageIsAdminDefaultHooks || props.pageIsAdminSystemHooks)) ? `active ` : ""}item`} href={`/-/admin/hooks`}>
						{i18n("admin.hooks")}
					</a>
				</div>
			</details>
		</>) : (<>
			{(!("DisableWebhooks")) ? (<>
			<a className={`${((props.pageIsAdminDefaultHooks || props.pageIsAdminSystemHooks)) ? `active ` : ""}item`} href={`/-/admin/hooks`}>
				{i18n("admin.hooks")}
			</a>
			</>) : null}
			{(props.enableOAuth2) ? (<>
				<a className={`${(props.pageIsAdminApplications) ? `active ` : ""}item`} href={`/-/admin/applications`}>
					{i18n("settings.applications")}
				</a>
			</>) : null}
		</>)}
		{(props.enableActions) ? (<>
		<details className="item toggleable-item" {...((props.pageIsSharedSettingsRunners || props.pageIsSharedSettingsVariables) ? {"open": true} : {})}>
			<summary>{i18n("actions.actions")}</summary>
			<div className="menu">
				<a className={`${(props.pageIsSharedSettingsRunners) ? `active ` : ""}item`} href={`/-/admin/actions/runners`}>
					{i18n("actions.runners")}
				</a>
				<a className={`${(props.pageIsSharedSettingsVariables) ? `active ` : ""}item`} href={`/-/admin/actions/variables`}>
					{i18n("actions.variables")}
				</a>
			</div>
		</details>
		</>) : null}
		<details className="item toggleable-item" {...((props.pageIsAdminConfig) ? {"open": true} : {})}>
			<summary>{i18n("admin.config")}</summary>
			<div className="menu">
				<a className={`${(props.pageIsAdminConfigSummary) ? `active ` : ""}item`} href={`/-/admin/config`}>
					{i18n("admin.config_summary")}
				</a>
				<a className={`${(props.pageIsAdminConfigSettings) ? `active ` : ""}item`} href={`/-/admin/config/settings`}>
					{i18n("admin.config_settings")}
				</a>
			</div>
		</details>
		<a className={`${(props.pageIsAdminNotices) ? `active ` : ""}item`} href={`/-/admin/notices`}>
			{i18n("admin.notices")}
		</a>
		<details className="item toggleable-item" {...((props.pageIsAdminMonitorStats || props.pageIsAdminMonitorCron || props.pageIsAdminMonitorQueue || props.pageIsAdminMonitorTrace) ? {"open": true} : {})}>
			<summary>{i18n("admin.monitor")}</summary>
			<div className="menu">
				<a className={`${(props.pageIsAdminMonitorStats) ? `active ` : ""}item`} href={`/-/admin/monitor/stats`}>
					{i18n("admin.monitor.stats")}
				</a>
				<a className={`${(props.pageIsAdminMonitorCron) ? `active ` : ""}item`} href={`/-/admin/monitor/cron`}>
					{i18n("admin.monitor.cron")}
				</a>
				<a className={`${(props.pageIsAdminMonitorQueue) ? `active ` : ""}item`} href={`/-/admin/monitor/queue`}>
					{i18n("admin.monitor.queues")}
				</a>
				<a className={`${(props.pageIsAdminMonitorTrace) ? `active ` : ""}item`} href={`/-/admin/monitor/stacktrace`}>
					{i18n("admin.monitor.trace")}
				</a>
			</div>
		</details>
	</div>
</div>

  </>)
}
