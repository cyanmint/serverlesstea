import React from 'react'
import { i18n } from '../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>
{((props.canWriteProjects && !(props.repository?.isArchived))) ? (<>
	<div className="flex-left-right tw-mb-4">
		<div className="small-menu-items ui compact tiny menu list-header-toggle">
			<a className={`item${(!(props.isShowClosed)) ? ` active` : ""}`} href={`?state=open&q=${String(props.keyword ?? "")}`}>
				<span className="svg-icon" aria-label="octicon-project-symlink"></span>
				{/* TODO: {{ctx.Locale.PrettyNumber .OpenCount}} */}&nbsp;{i18n("repo.issues.open_title")}
			</a>
			<a className={`item${(props.isShowClosed) ? ` active` : ""}`} href={`?state=closed&q=${String(props.keyword ?? "")}`}>
				<span className="svg-icon" aria-label="octicon-check"></span>
				{/* TODO: {{ctx.Locale.PrettyNumber .ClosedCount}} */}&nbsp;{i18n("repo.issues.closed_title")}
			</a>
		</div>
		<a className="ui small primary button" href={`${String(props.link ?? "")}/new`}>{i18n("repo.projects.new")}</a>
	</div>
</>) : null}

{/* alert */}

<div className="list-header">
	{/* Search */}
	<form className="list-header-search ui form ignore-dirty">
		<input type="hidden" name="state" value={String(props.state ?? "")} />
		{/* template: shared/search/combo */}
	</form>

	<div className="list-header-filters ui secondary menu tw-m-0">
		{/* Sort */}
		<div className="item ui small dropdown jump">
			<span className="text">
				{i18n("repo.issues.filter_sort")}
			</span>
			<span className="svg-icon" aria-label="octicon-triangle-down"></span>
			<div className="menu">
				<a className={`${(props.sortType === "oldest") ? `active ` : ""}item`} href={`?q=${String(props.keyword ?? "")}&sort=oldest&state=${String(props.state ?? "")}`}>{i18n("repo.issues.filter_sort.oldest")}</a>
				<a className={`${(props.sortType === "alphabetically") ? `active ` : ""}item`} href={`?q=${String(props.keyword ?? "")}&sort=alphabetically&state=${String(props.state ?? "")}`}>{i18n("repo.issues.label.filter_sort.alphabetically")}</a>
				<a className={`${(props.sortType === "reversealphabetically") ? `active ` : ""}item`} href={`?q=${String(props.keyword ?? "")}&sort=reversealphabetically&state=${String(props.state ?? "")}`}>{i18n("repo.issues.label.filter_sort.reverse_alphabetically")}</a>
				<a className={`${(props.sortType === "recentupdate") ? `active ` : ""}item`} href={`?q=${String(props.keyword ?? "")}&sort=recentupdate&state=${String(props.state ?? "")}`}>{i18n("repo.issues.filter_sort.recentupdate")}</a>
				<a className={`${(props.sortType === "leastupdate") ? `active ` : ""}item`} href={`?q=${String(props.keyword ?? "")}&sort=leastupdate&state=${String(props.state ?? "")}`}>{i18n("repo.issues.filter_sort.leastupdate")}</a>
			</div>
		</div>
	</div>
</div>

<div className="milestone-list">
	{((props.projects) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<li className="milestone-card">
			<h3 className="flex-text-block tw-m-0 tw-gap-3">
				{/* TODO: {{svg .IconName 16}} */}
				<a className="muted tw-break-anywhere" href={String(props.link?.(ctx) ?? "")}>{item.title as any}</a>
			</h3>
			<div className="milestone-toolbar">
				<div className="group">
					<div className="flex-text-block">
						<span className="svg-icon" aria-label="octicon-issue-opened"></span>
						{/* TODO: {{ctx.Locale.PrettyNumber .NumOpenIssues}} */}&nbsp;{i18n("repo.issues.open_title")}
					</div>
					<div className="flex-text-block">
						<span className="svg-icon" aria-label="octicon-check"></span>
						{/* TODO: {{ctx.Locale.PrettyNumber .NumClosedIssues}} */}&nbsp;{i18n("repo.issues.closed_title")}
					</div>
				</div>
				{((props.canWriteProjects && !(props.repository?.isArchived))) ? (<>
				<div className="group">
					<a className="flex-text-inline" href={`${String(props.link?.(ctx) ?? "")}/edit`}><span className="svg-icon" aria-label="octicon-pencil"></span>{i18n("repo.issues.label_edit")}</a>
					{(item.isClosed) ? (<>
						<a className="link-action flex-text-inline" href data-url={`${String(props.link?.(ctx) ?? "")}/open`}><span className="svg-icon" aria-label="octicon-check"></span>{i18n("repo.projects.open")}</a>
					</>) : (<>
						<a className="link-action flex-text-inline" href data-url={`${String(props.link?.(ctx) ?? "")}/close`}><span className="svg-icon" aria-label="octicon-skip"></span>{i18n("repo.projects.close")}</a>
					</>)}
					<a className="link-action flex-text-inline tw-text-red" href data-modal-confirm="#repo-project-delete-modal" data-url={`${String(props.link?.(ctx) ?? "")}/delete`}><span className="svg-icon" aria-label="octicon-trash"></span>{i18n("repo.issues.label_delete")}</a>
				</div>
				</>) : null}
			</div>
			{(item.description) ? (<>
				<div className="render-content markup">{item.renderedContent as any}</div>
			</>) : null}
		</li>
	{/* else */}
		{((item.openCount === 0 && item.closedCount === 0)) ? (<>
			<div className="empty-placeholder">
				<span className="svg-icon" aria-label="octicon-project-symlink"></span>
				<h2>{i18n("repo.projects.empty")}</h2>
				<p>{i18n("repo.projects.empty_description")}</p>
			</div>
		</>) : (<>
			<div className="empty-placeholder">
				<span className="svg-icon" aria-label="octicon-search"></span>
				<h2>{i18n("repo.projects.no_results")}</h2>
			</div>
		</>)}
	</React.Fragment>))}

	{/* template: base/paginate */}
</div>

{((props.canWriteProjects && !(props.repository?.isArchived))) ? (<>
<div className="ui small modal" id="repo-project-delete-modal">
	<div className="header"><span className="svg-icon" aria-label="octicon-trash"></span> {i18n("repo.projects.deletion")}</div>
	<div className="content"><p>{i18n("repo.projects.deletion_desc")}</p></div>
	{/* template: base/modal_actions_confirm */}
</div>
</>) : null}

  </>)
}
