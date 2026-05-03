// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function CommitsTable(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header commits-table flex-left-right">
	<div className="commits-table-left flex-text-block">
		{((props.pageIsCommits || props.commitCount > 0)) ? (<>
			{props.commitCount as any} {i18n("repo.commits.commits")}
		</>) : null} {(props.isNothingToCompare) ? (<>
			{i18n("repo.commits.nothing_to_compare")}
		</>) : (<>
			{i18n("repo.commits.no_commits")}
		</>)}
	</div>
	{(props.isDiffCompare) ? (<>
		<div className="commits-table-right tw-whitespace-nowrap">
			<a href={`${String(props.commitRepoLink ?? "")}/commit/${String(props.beforeCommitID?.("|", "PathEscape") ?? "")}`} className="ui green sha label tw-mx-0">{/* template: repo/commits_ref_name */}</a>
			{props.compareInfo?.compareSeparator as any}
			<a href={`${String(props.commitRepoLink ?? "")}/commit/${String(props.afterCommitID?.("|", "PathEscape") ?? "")}`} className="ui green sha label tw-mx-0">{/* template: repo/commits_ref_name */}</a>
		</div>
	</>) : null}
</h4>

{(props.pageIsCommits) ? (<>
	<div className="ui attached segment">
		<form className="ignore-dirty" action={`${String(props.repoLink ?? "")}/commits/${String(props.refTypeNameSubURL ?? "")}/search`}>
			<div className="ui small fluid action input">
				{/* template: shared/search/input */}
				{/* template: repo/commits_search_dropdown */}
				{/* template: shared/search/button */}
			</div>
		</form>
	</div>
</>) : null}

{((props.commits && props.commitCount > 0)) ? (<>
	{/* template: repo/commits_list */}
</>) : null}

{/* template: base/paginate */}

  </>)
}
