// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Navbar(props: Record<string, unknown>) {
  return (<>
<div className="ui compact small menu small-menu-items org-team-navbar">
	<a className={`item${(props.pageIsOrgTeamMembers) ? ` active` : ""}`} href={`${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName?.("|", "PathEscape") ?? "")}`}><span className="svg-icon" aria-label="octicon-person"></span> <strong>{props.team?.numMembers as any}</strong>&nbsp; {i18n("org.lower_members")}</a>
	<a className={`item${(props.pageIsOrgTeamRepos) ? ` active` : ""}`} href={`${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName?.("|", "PathEscape") ?? "")}/repositories`}><span className="svg-icon" aria-label="octicon-repo"></span> <strong>{props.team?.numRepos as any}</strong>&nbsp; {i18n("org.lower_repositories")}</a>
</div>

  </>)
}
