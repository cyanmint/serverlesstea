import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Search(props: Record<string, unknown>) {
  return (<>
<div className="ui small secondary filter menu tw-items-center tw-mx-0">
	<form className="ui form ignore-dirty tw-flex-1">
		{(props.pageIsExploreUsers) ? (<>
			{/* template: shared/search/combo */}
		</>) : (<>
			{/* template: shared/search/combo */}
		</>)}
	</form>
	{/* Sort */}
	<div className="ui small dropdown type jump item tw-mr-0">
		<span className="text">
			{i18n("repo.issues.filter_sort")}
		</span>
		<span className="svg-icon" aria-label="octicon-triangle-down"></span>
		<div className="menu">
			<a className={`${(props.sortType === "newest") ? `active ` : ""}item`} href={`?sort=newest&q=${String(props.keyword ?? "")}`}>{i18n("repo.issues.filter_sort.latest")}</a>
			<a className={`${(props.sortType === "oldest") ? `active ` : ""}item`} href={`?sort=oldest&q=${String(props.keyword ?? "")}`}>{i18n("repo.issues.filter_sort.oldest")}</a>
			<a className={`${(props.sortType === "alphabetically") ? `active ` : ""}item`} href={`?sort=alphabetically&q=${String(props.keyword ?? "")}`}>{i18n("repo.issues.label.filter_sort.alphabetically")}</a>
			<a className={`${(props.sortType === "reversealphabetically") ? `active ` : ""}item`} href={`?sort=reversealphabetically&q=${String(props.keyword ?? "")}`}>{i18n("repo.issues.label.filter_sort.reverse_alphabetically")}</a>
		</div>
	</div>
</div>
<div className="divider"></div>

  </>)
}
