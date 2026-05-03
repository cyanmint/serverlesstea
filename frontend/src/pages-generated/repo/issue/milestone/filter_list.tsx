// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function FilterList(props: Record<string, unknown>) {
  return (<>
{'{'}/* Sort */{'}'}
<div className="item ui small dropdown jump">
	<span className="text">
		{i18n("repo.issues.filter_sort")}
	</span>
	<span className="svg-icon" aria-label="octicon-triangle-down"></span>
	<div className="menu">
		<a className={`${((props.sortType === "closestduedate" || !(props.sortType))) ? `active ` : ""}item`} href={`?sort=closestduedate&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.earliest_due_data")}</a>
		<a className={`${(props.sortType === "furthestduedate") ? `active ` : ""}item`} href={`?sort=furthestduedate&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.latest_due_date")}</a>
		<a className={`${(props.sortType === "leastcomplete") ? `active ` : ""}item`} href={`?sort=leastcomplete&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.least_complete")}</a>
		<a className={`${(props.sortType === "mostcomplete") ? `active ` : ""}item`} href={`?sort=mostcomplete&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.most_complete")}</a>
		<a className={`${(props.sortType === "mostissues") ? `active ` : ""}item`} href={`?sort=mostissues&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.most_issues")}</a>
		<a className={`${(props.sortType === "leastissues") ? `active ` : ""}item`} href={`?sort=leastissues&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.least_issues")}</a>
		<a className={`${(props.sortType === "name") ? `active ` : ""}item`} href={`${String(props.link ?? "")}?sort=name&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.name")}</a>
	</div>
</div>

  </>)
}
