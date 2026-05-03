import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Issues(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content dashboard issues">
	{/* template: user/dashboard/navbar */}
	<div className="ui container">
		{/* alert */}
		<div className="flex-container">
			{/* $queryLink */}
			<div className="flex-container-nav">
				<div className="ui secondary vertical filter menu tw-bg-transparent">
					<a className={`${(props.viewType === "your_repositories") ? `active` : ""} item`} href={String("" ?? "")}>
						{i18n("home.issues.in_your_repos")}
						<strong>{/* TODO: {{CountFmt .IssueStats.YourRepositoriesCount}} */}</strong>
					</a>
					<a className={`${(props.viewType === "assigned") ? `active` : ""} item`} href={String("" ?? "")}>
						{i18n("repo.issues.filter_type.assigned_to_you")}
						<strong>{/* TODO: {{CountFmt .IssueStats.AssignCount}} */}</strong>
					</a>
					<a className={`${(props.viewType === "created_by") ? `active` : ""} item`} href={String("" ?? "")}>
						{i18n("repo.issues.filter_type.created_by_you")}
						<strong>{/* TODO: {{CountFmt .IssueStats.CreateCount}} */}</strong>
					</a>
					{(props.pageIsPulls) ? (<>
						<a className={`${(props.viewType === "review_requested") ? `active` : ""} item`} href={String("" ?? "")}>
							{i18n("repo.issues.filter_type.review_requested")}
							<strong>{/* TODO: {{CountFmt .IssueStats.ReviewRequestedCount}} */}</strong>
						</a>
						<a className={`${(props.viewType === "reviewed_by") ? `active` : ""} item`} href={String("" ?? "")}>
							{i18n("repo.issues.filter_type.reviewed_by_you")}
							<strong>{/* TODO: {{CountFmt .IssueStats.ReviewedCount}} */}</strong>
						</a>
					</>) : null}
					<a className={`${(props.viewType === "mentioned") ? `active` : ""} item`} href={String("" ?? "")}>
						{i18n("repo.issues.filter_type.mentioning_you")}
						<strong>{/* TODO: {{CountFmt .IssueStats.MentionCount}} */}</strong>
					</a>
				</div>
			</div>

			{/* $queryLinkWithFilter */}
			<div className="flex-container-main content">
				<div className="list-header">
					<div className="small-menu-items ui compact tiny menu list-header-toggle flex-items-block">
						<a className={`item${(!(props.isShowClosed)) ? ` active` : ""}`} href={String("" ?? "")}>
							<span className="svg-icon" aria-label="octicon-issue-opened"></span>
							{/* TODO: {{ctx.Locale.PrettyNumber .IssueStats.OpenCount}} */}&nbsp;{i18n("repo.issues.open_title")}
						</a>
						<a className={`item${(props.isShowClosed) ? ` active` : ""}`} href={String("" ?? "")}>
							<span className="svg-icon" aria-label="octicon-issue-closed"></span>
							{/* TODO: {{ctx.Locale.PrettyNumber .IssueStats.ClosedCount}} */}&nbsp;{i18n("repo.issues.closed_title")}
						</a>
					</div>
					<form className="list-header-search ui form ignore-dirty">
						<input type="hidden" name="type" value={String(props.viewType ?? "")} />
						<input type="hidden" name="sort" value={String(props.sortType ?? "")} />
						<input type="hidden" name="state" value={String(props.state ?? "")} />
						{/* template: shared/search/combo */}
					</form>

					<div className="list-header-filters ui secondary menu tw-m-0">
						{(props.labels) ? (<>
							{/* template: repo/issue/filter_item_label */}
						</>) : null}

						{/* at the moment there is no easy way to get poster candidates on this page, so only show a username input, search for what the end user enters */}
						{(props.viewType !== "created_by") ? (<>
							{/* template: repo/issue/filter_item_user_fetch */}
						</>) : null}

						{/* at the moment there is no easy way to get assignee candidates on this page, so only show a username input, search for what the end user enters */}
						{(props.viewType !== "assigned") ? (<>
							{/* template: repo/issue/filter_item_user_fetch */}
						</>) : null}

						{/* Sort */}
						<div className="item ui small dropdown jump">
							<span className="text tw-whitespace-nowrap">
								{i18n("repo.issues.filter_sort")}
								<span className="svg-icon" aria-label="octicon-triangle-down"></span>
							</span>
							<div className="menu">
								<a className={`${(props.sortType === "recentupdate") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.recentupdate")}</a>
								<a className={`${(props.sortType === "leastupdate") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.leastupdate")}</a>
								<a className={`${(props.sortType === "latest") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.latest")}</a>
								<a className={`${(props.sortType === "oldest") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.oldest")}</a>
								<a className={`${(props.sortType === "mostcomment") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.mostcomment")}</a>
								<a className={`${(props.sortType === "leastcomment") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.leastcomment")}</a>
								<a className={`${(props.sortType === "nearduedate") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.nearduedate")}</a>
								<a className={`${(props.sortType === "farduedate") ? `active ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_sort.farduedate")}</a>
							</div>
						</div>
					</div>
				</div>
				{/* template: shared/issuelist */}
			</div>
		</div>
	</div>
</div>


  </>)
}
