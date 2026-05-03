// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function CommitsSearchDropdown(props: Record<string, unknown>) {
  return (<>
<div className="ui small dropdown selection">
	<input name="all" type="hidden" value={String(props.all ?? "")} /><span className="svg-icon" aria-label="octicon-triangle-down"></span>
	<div className="text">{(props.all) ? (<>{i18n("repo.commits.search_all")}</>) : (<>{i18n("repo.commits.search_branch")}</>)}</div>
	<div className="menu">
		<div className="item" data-value="false">{i18n("repo.commits.search_branch")}</div>
		<div className="item" data-value="true">{i18n("repo.commits.search_all")}</div>
	</div>
</div>

  </>)
}
