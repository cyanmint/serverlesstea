import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Navbar(props: Record<string, unknown>) {
  return (<>
<overflow-menu className="ui secondary pointing tabular top attached borderless menu secondary-nav">
	<div className="overflow-menu-items tw-justify-center">
		<a className={`${(props.pageIsExploreRepositories) ? `active ` : ""}item`} href={`/explore/repos`}>
			<span className="svg-icon" aria-label="octicon-repo"></span> {i18n("explore.repos")}
		</a>
		{(!(props.usersPageIsDisabled)) ? (<>
			<a className={`${(props.pageIsExploreUsers) ? `active ` : ""}item`} href={`/explore/users`}>
				<span className="svg-icon" aria-label="octicon-person"></span> {i18n("explore.users")}
			</a>
		</>) : null}
		{(!(props.organizationsPageIsDisabled)) ? (<>
		<a className={`${(props.pageIsExploreOrganizations) ? `active ` : ""}item`} href={`/explore/organizations`}>
			<span className="svg-icon" aria-label="octicon-organization"></span> {i18n("explore.organizations")}
		</a>
		</>) : null}
		{((!("ctx.Consts.RepoUnitTypeCode.UnitGlobalDisabled") && props.isRepoIndexerEnabled && !(props.codePageIsDisabled))) ? (<>
		<a className={`${(props.pageIsExploreCode) ? `active ` : ""}item`} href={`/explore/code`}>
			<span className="svg-icon" aria-label="octicon-code"></span> {i18n("explore.code")}
		</a>
		</>) : null}
	</div>
</overflow-menu>

  </>)
}
