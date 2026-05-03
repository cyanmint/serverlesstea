// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Header(props: Record<string, unknown>) {
  return (<>
<overflow-menu className="ui secondary pointing tabular borderless menu">
	<div className="overflow-menu-items">
		{((props.hasUserProfileReadme && props.contextUser?.isIndividual)) ? (<>
		<a className={`${(props.tabName === "overview") ? `active ` : ""}item`} href={`${String(props.contextUser?.homeLink ?? "")}?tab=overview`}>
			<span className="svg-icon" aria-label="octicon-info"></span> {i18n("user.overview")}
		</a>
		</>) : null}
		<a className={`${(props.tabName === "repositories") ? `active ` : ""} item`} href={`${String(props.contextUser?.homeLink ?? "")}?tab=repositories`}>
			<span className="svg-icon" aria-label="octicon-repo"></span> {i18n("user.repositories")}
			{(props.repoCount) ? (<>
				<div className="ui small label">{props.repoCount as any}</div>
			</>) : null}
		</a>
		{((props.contextUser?.isIndividual || props.canReadProjects)) ? (<>
		<a href={`${String(props.contextUser?.homeLink ?? "")}/-/projects`} className={`${(props.pageIsViewProjects) ? `active ` : ""}item`}>
			<span className="svg-icon" aria-label="octicon-project-symlink"></span> {i18n("user.projects")}
			{(props.projectCount) ? (<>
				<div className="ui small label">{props.projectCount as any}</div>
			</>) : null}
		</a>
		</>) : null}
		{((props.isPackageEnabled && (props.contextUser?.isIndividual || props.canReadPackages))) ? (<>
			<a href={`${String(props.contextUser?.homeLink ?? "")}/-/packages`} className={`${(props.isPackagesPage) ? `active ` : ""}item`}>
				<span className="svg-icon" aria-label="octicon-package"></span> {i18n("packages.title")}
			</a>
		</>) : null}
		{((props.isRepoIndexerEnabled && (props.contextUser?.isIndividual || props.canReadCode))) ? (<>
			<a href={`${String(props.contextUser?.homeLink ?? "")}/-/code`} className={`${(props.isCodePage) ? `active ` : ""}item`}>
				<span className="svg-icon" aria-label="octicon-code"></span> {i18n("user.code")}
			</a>
		</>) : null}
		{(props.contextUser?.isIndividual) ? (<>
			<a className={`${(props.tabName === "activity") ? `active ` : ""}item`} href={`${String(props.contextUser?.homeLink ?? "")}?tab=activity`}>
				<span className="svg-icon" aria-label="octicon-rss"></span> {i18n("user.activity")}
			</a>
			{(!(props.disableStars)) ? (<>
			<a className={`${(props.tabName === "stars") ? `active ` : ""}item`} href={`${String(props.contextUser?.homeLink ?? "")}?tab=stars`}>
				<span className="svg-icon" aria-label="octicon-star"></span> {i18n("user.starred")}
				{(props.contextUser?.numStars) ? (<>
					<div className="ui small label">{props.contextUser?.numStars as any}</div>
				</>) : null}
			</a>
			</>) : (<>
			<a className={`${(props.tabName === "watching") ? `active ` : ""}item`} href={`${String(props.contextUser?.homeLink ?? "")}?tab=watching`}>
				<span className="svg-icon" aria-label="octicon-eye"></span> {i18n("user.watched")}
			</a>
			</>)}
		</>) : null}
	</div>
</overflow-menu>

  </>)
}
