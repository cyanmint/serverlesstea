// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Navbar(props: Record<string, unknown>) {
  return (<>
<h2 className="ui compact small menu small-menu-items issue-list-navbar">
	<a className={`${(props.pageIsLabels) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/labels`}>{i18n("repo.labels")}</a>
	<a className={`${(props.pageIsMilestones) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/milestones`}>{i18n("repo.milestones")}</a>
</h2>

  </>)
}
