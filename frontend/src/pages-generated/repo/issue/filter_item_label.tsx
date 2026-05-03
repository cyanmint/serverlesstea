import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function FilterItemLabel(props: Record<string, unknown>) {
  return (<>
{/* Template Attributes:
* "labels" from query string (needed by JS)
* QueryLink
* Labels
* SupportArchivedLabel, if true, then it needs "archived_labels" from query string */}
{/* $queryLink */}
<div className={`item ui dropdown jump ${(!(props.labels)) ? `disabled` : ""} label-filter`}>
	<span className="text">{i18n("repo.issues.filter_label")}</span>
	<span className="svg-icon" aria-label="octicon-triangle-down"></span>
	<div className="menu flex-items-menu">
		<div className="ui icon search input">
			<i className="icon"><span className="svg-icon" aria-label="octicon-search"></span></i>
			<input type="text" placeholder={String(i18n("repo.issues.filter_label") ?? "")} />
		</div>
		{(props.supportArchivedLabel) ? (<>{/* this checkbox has a hard dependency with the "labels" and "archived_label" query parameter */}
		<label className="label-filter-archived-toggle flex-text-block">
			<input type="checkbox" /> {i18n("repo.issues.label_archived_filter")}
			<span data-tooltip-content={i18n("repo.issues.label_archive_tooltip")}><span className="svg-icon" aria-label="octicon-info"></span></span>
		</label>
		</>) : null}
		<span className="label-filter-exclude-info">{i18n("repo.issues.filter_label_exclude")}</span>
		<div className="divider"></div>
		<a className="item label-filter-query-default" href={String("" ?? "")}>{i18n("repo.issues.filter_label_no_select")}</a>
		<a className="item label-filter-query-not-set" href={String("" ?? "")}>{i18n("repo.issues.filter_label_select_no_label")}</a>
		{/* The logic here is not the same as the label selector in the issue sidebar.
		The one in the issue sidebar renders "repo labels | divider | org labels".
		Maybe the logic should be updated to be consistent. */}
		{/* $previousExclusiveScope */}
		{((props.labels) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			{/* $exclusiveScope */}
			{((props.previousExclusiveScope !== props.exclusiveScope)) ? (<>
				<div className="divider" data-scope={String(props.exclusiveScope ?? "")}></div>
			</>) : null}
			{/* TODO: {{$previousExclusiveScope = $exclusiveScope}} */}
			<a className="item label-filter-query-item" data-label-id={String(props.iD ?? "")} data-scope={String(props.exclusiveScope ?? "")} {...(item.isArchived ? {"data-is-archived": true} : {})}
				href={String("" ?? "")}>
				{(item.isExcluded) ? (<>
					<span className="svg-icon" aria-label="octicon-circle-slash"></span>
				</>) : null} {(item.isSelected) ? (<>
					{/* TODO: {{Iif $exclusiveScope (svg "octicon-dot-fill") (svg "octicon-check")}} */}
				</>) : null}
				{/* TODO: {{ctx.RenderUtils.RenderLabel .}} */}
				<p className="tw-ml-auto">{/* template: repo/issue/labels/label_archived */}</p>
			</a>
		</React.Fragment>))}
	</div>
</div>

  </>)
}
