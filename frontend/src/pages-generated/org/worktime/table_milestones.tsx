// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function TableMilestones(props: Record<string, unknown>) {
  return (<>
<table className="ui table">
	<thead>
		<tr>
			<th>{i18n("repository")}</th>
			<th>{i18n("repo.milestone")}</th>
			<th>{i18n("org.worktime.time")}</th>
		</tr>
	</thead>
	<tbody>
		{((props.worktimeSumResult) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<tr>
			<td>
				{(!(item.hideRepoName)) ? (<>
					<span className="svg-icon" aria-label="octicon-repo"></span> <a href={`${String(props.org?.homeLink ?? "")}//issues`}>{item.repoName as any}</a>
				</>) : null}
			</td>
			<td>
				{(item.milestoneName) ? (<>
					<span className="svg-icon" aria-label="octicon-milestone"></span> <a href={`${String(props.org?.homeLink ?? "")}//milestone/${String(props.milestoneID ?? "")}`}>{item.milestoneName as any}</a>
				</>) : (<>
					-
				</>)}
			</td>
			<td><span className="svg-icon" aria-label="octicon-clock"></span> {item.sumTime?.("|", "Sec2Hour") as any}</td>
		</tr>
		{/* else */}
			{/* template: org/worktime/empty_placeholder */}
		</React.Fragment>))}
	</tbody>
</table>

  </>)
}
