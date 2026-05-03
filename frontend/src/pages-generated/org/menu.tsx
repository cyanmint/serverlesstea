import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Menu(props: Record<string, unknown>) {
  return (<>
<div className="ui container">
	<overflow-menu className="ui secondary pointing tabular borderless menu tw-mb-4">
		<div className="overflow-menu-items">
			{(props.hasOrgProfileReadme) ? (<>
				<a className={`${(props.pageIsViewOverview) ? `active ` : ""}item`} href={String(props.org?.homeLink ?? "")}>
					<span className="svg-icon" aria-label="octicon-info"></span> {i18n("user.overview")}
				</a>
			</>) : null}
			<a className={`${(props.pageIsViewRepositories) ? `active ` : ""}item`} href={`${String(props.org?.homeLink ?? "")}${(props.hasOrgProfileReadme) ? `/-/repositories` : ""}`}>
				<span className="svg-icon" aria-label="octicon-repo"></span> {i18n("user.repositories")}
				{(props.repoCount) ? (<>
					<div className="ui small label">{props.repoCount as any}</div>
				</>) : null}
			</a>
			{(props.canReadProjects) ? (<>
			<a className={`${(props.pageIsViewProjects) ? `active ` : ""}item`} href={`${String(props.org?.homeLink ?? "")}/-/projects`}>
				<span className="svg-icon" aria-label="octicon-project-symlink"></span> {i18n("user.projects")}
				{(props.projectCount) ? (<>
					<div className="ui small label">{props.projectCount as any}</div>
				</>) : null}
			</a>
			</>) : null}
			{((props.isPackageEnabled && props.canReadPackages)) ? (<>
			<a className={`${(props.isPackagesPage) ? `active ` : ""}item`} href={`${String(props.org?.homeLink ?? "")}/-/packages`}>
				<span className="svg-icon" aria-label="octicon-package"></span> {i18n("packages.title")}
			</a>
			</>) : null}
			{((props.isRepoIndexerEnabled && props.canReadCode)) ? (<>
			<a className={`${(props.isCodePage) ? `active ` : ""}item`} href={`${String(props.org?.homeLink ?? "")}/-/code`}>
				<span className="svg-icon" aria-label="octicon-code"></span> {i18n("org.code")}
			</a>
			</>) : null}
			{(props.numMembers) ? (<>
			<a className={`${(props.pageIsOrgMembers) ? `active ` : ""}item`} href={`${String(props.orgLink ?? "")}/members`}>
				<span className="svg-icon" aria-label="octicon-person"></span> {i18n("org.members")}
				<div className="ui small label">{props.numMembers as any}</div>
			</a>
			</>) : null}
			{(props.isOrganizationMember) ? (<>
			<a className={`${(props.pageIsOrgTeams) ? `active ` : ""}item`} href={`${String(props.orgLink ?? "")}/teams`}>
				<span className="svg-icon" aria-label="octicon-people"></span> {i18n("org.teams")}
				{(props.numTeams) ? (<>
					<div className="ui small label">{props.numTeams as any}</div>
				</>) : null}
			</a>
			</>) : null}
			{(("EnableTimetracking" && props.isOrganizationOwner)) ? (<>
			<a className={`${(props.pageIsOrgTimes) ? `active` : ""} item`} href={`${String(props.orgLink ?? "")}/worktime`}>
				<span className="svg-icon" aria-label="octicon-clock"></span> {i18n("org.worktime")}
			</a>
			</>) : null}
			{(props.isOrganizationOwner) ? (<>
			<span className="item-flex-space"></span>
			<a className={`${(props.pageIsOrgSettings) ? `active ` : ""}item`} href={`${String(props.orgLink ?? "")}/settings`}>
				<span className="svg-icon" aria-label="octicon-tools"></span> {i18n("repo.settings")}
			</a>
			</>) : null}
		</div>
	</overflow-menu>
</div>

  </>)
}
