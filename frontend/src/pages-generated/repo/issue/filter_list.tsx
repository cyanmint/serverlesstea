// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function FilterList(props: Record<string, unknown>) {
  return (<>
{/* $projectIDs */}
{/* $projectIDsQuery */}
{/* $queryLink */}
{/* $showAllProjects */}
{/* $showNoProjectSelected */}

{/* template: repo/issue/filter_item_label */}

{(!(props.milestone)) ? (<>
{/* template: repo/issue/filter_item_milestone */}
</>) : null}

{'{'}/* Project */{'}'}
<div className={`item ui dropdown jump project-filter ${(!((props.openProjects || props.closedProjects))) ? `disabled` : ""}`}>
	<span className="text">
		{i18n("repo.issues.filter_project")}
	</span>
	<span className="svg-icon" aria-label="octicon-triangle-down"></span>
	<div className="menu flex-items-menu">
		<div className="ui icon search input">
			<i className="icon"><span className="svg-icon" aria-label="octicon-search"></span></i>
			<input type="text" placeholder={String(i18n("repo.issues.filter_project") ?? "")} />
		</div>
		<a className={`item ${(props.showAllProjects) ? `selected` : ""}`} href={String("" ?? "")}>{i18n("repo.issues.filter_project_all")}</a>
		<a className={`item ${(props.showNoProjectSelected) ? `selected` : ""}`} href={String("" ?? "")}>{i18n("repo.issues.filter_project_none")}</a>
		{(props.openProjects) ? (<>
			<div className="divider"></div>
			<div className="header">
				{i18n("repo.issues.new.open_projects")}
			</div>
			{((props.openProjects) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				{/* $toggle */}
				{/* FIXME: ISSUE-MULTIPLE-PROJECTS-FILTER: no multiple project filter support yet. If the support comes, here it should use "&project=${toggle.ToggledIDs}" */}
				<a className={`item ${(props.toggle?.isIncluded) ? `selected` : ""}`} href={String("" ?? "")}>
					{/* TODO: {{svg $project.IconName}} */}<span className="gt-ellipsis">{/* TODO: {{$project.Title}} */}</span>
				</a>
			</React.Fragment>))}
		</>) : null}
		{(props.closedProjects) ? (<>
			<div className="divider"></div>
			<div className="header">
				{i18n("repo.issues.new.closed_projects")}
			</div>
			{((props.closedProjects) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				{/* $toggle */}
				{/* FIXME: ISSUE-MULTIPLE-PROJECTS-FILTER: no multiple project filter support yet. If the support comes, here it should use "&project=${toggle.ToggledIDs}" */}
				<a className={`item ${(props.toggle?.isIncluded) ? `selected` : ""}`} href={String("" ?? "")}>
					{/* TODO: {{svg $project.IconName}} */}<span className="gt-ellipsis">{/* TODO: {{$project.Title}} */}</span>
				</a>
			</React.Fragment>))}
		</>) : null}
	</div>
</div>

{/* TODO: the UserSearchUrl is old logic but not right, milestone could also have "pull request" posters */}
{/* template: repo/issue/filter_item_user_fetch */}

{/* template: repo/issue/filter_item_user_assign */}

{(props.isSigned) ? (<>
	{'{'}/* Type */{'}'}
	<div className="item ui dropdown jump">
		<span className="text">
			{i18n("repo.issues.filter_type")}
		</span>
		<span className="svg-icon" aria-label="octicon-triangle-down"></span>
		<div className="menu">
			<a className={`${(props.viewType === "all") ? `active ` : ""}item`} href={String("" ?? "")}>{(props.pageIsPullList) ? (<>{i18n("repo.issues.filter_type.all_pull_requests")}</>) : (<>{i18n("repo.issues.filter_type.all_issues")}</>)}</a>
			<a className={`${(props.viewType === "assigned") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_type.assigned_to_you")}</a>
			<a className={`${(props.viewType === "created_by") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_type.created_by_you")}</a>
			{(props.pageIsPullList) ? (<>
				<a className={`${(props.viewType === "review_requested") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_type.review_requested")}</a>
				<a className={`${(props.viewType === "reviewed_by") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_type.reviewed_by_you")}</a>
			</>) : null}
			<a className={`${(props.viewType === "mentioned") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_type.mentioning_you")}</a>
		</div>
	</div>
</>) : null}

{'{'}/* Sort */{'}'}
<div className="item ui dropdown jump">
	<span className="text">
		{i18n("repo.issues.filter_sort")}
	</span>
	<span className="svg-icon" aria-label="octicon-triangle-down"></span>
	<div className="menu">
		<a className={`${((props.sortType === "latest" || !(props.sortType))) ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.latest")}</a>
		<a className={`${(props.sortType === "oldest") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.oldest")}</a>
		<a className={`${(props.sortType === "recentupdate") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.recentupdate")}</a>
		<a className={`${(props.sortType === "leastupdate") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.leastupdate")}</a>
		<a className={`${(props.sortType === "mostcomment") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.mostcomment")}</a>
		<a className={`${(props.sortType === "leastcomment") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.leastcomment")}</a>
		<a className={`${(props.sortType === "nearduedate") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.nearduedate")}</a>
		<a className={`${(props.sortType === "farduedate") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.farduedate")}</a>
		{(props.exclusiveLabelScopes) ? (<>
			<div className="divider"></div>
			<div className="header">{i18n("repo.issues.filter_label")}</div>
			{((props.exclusiveLabelScopes) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				{/* $sortType */}
				<a className={`${(props.sortType === props.sortType) ? `active ` : ""}item`} href={String("" ?? "")}>{props.scope as any}</a>
			</React.Fragment>))}
		</>) : null}
	</div>
</div>

  </>)
}
