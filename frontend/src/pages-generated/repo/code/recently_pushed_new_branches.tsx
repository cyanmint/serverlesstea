import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function RecentlyPushedNewBranches(props: Record<string, unknown>) {
  return (<>
{/* Template Attributes:
* RecentBranchesPromptData */}
{/* $data */}
{(data) ? (<>
	{(($data.RecentlyPushedNewBranches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	<div className="ui positive message flex-text-block">
		<div className="tw-flex-1">
			{/* $timeSince */}
			{/* $branchLink */}
			{i18n("repo.pulls.recently_pushed_new_branches")}
		</div>
		<a role="button" className="ui compact green button" href={String("" ?? "")}>
			{i18n("repo.pulls.compare_changes")}
		</a>
	</div>
	</React.Fragment>))}
</>) : null}

  </>)
}
