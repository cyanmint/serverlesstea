import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function TabMenu(props: Record<string, unknown>) {
  return (<>
<div className="ui pull tabs container">
	<div className="ui top attached pull tabular menu">
		<a className={`item ${(props.pageIsPullConversation) ? `active` : ""}`} href={String(props.issue?.link ?? "")}>
			<span className="svg-icon" aria-label="octicon-comment-discussion"></span>
			{/* template: shared/misc/tabtitle */}
			<span className="ui small label">{props.issue?.numComments as any}</span>
		</a>
		<a className={`item ${(props.pageIsPullCommits) ? `active` : ""}`} {(props.numCommits) ? (<>href={`${String(props.issue?.link ?? "")}/commits`}</>) : null}>
			<span className="svg-icon" aria-label="octicon-git-commit"></span>
			{/* template: shared/misc/tabtitle */}
			<span className="ui small label">{(props.numCommits) ? (<>{props.numCommits as any}</>) : (<>-</>)}</span>
		</a>
		<a className={`item ${(props.pageIsPullFiles) ? `active` : ""}`} href={`${String(props.issue?.link ?? "")}/files`}>
			<span className="svg-icon" aria-label="octicon-diff"></span>
			{/* template: shared/misc/tabtitle */}
			<span className="ui small label">{(props.numFiles) ? (<>{props.numFiles as any}</>) : (<>-</>)}</span>
		</a>
		{((props.diffShortStat?.totalAddition || props.diffShortStat?.totalDeletion)) ? (<>
			{/* template: repo/diff/stats */}
		</>) : null}
	</div>
	<div className="ui tabs divider"></div>
</div>

  </>)
}
