// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function NotificationSubscriptions(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content user notification">
	<div className="ui container">
		<div className="ui compact small menu small-menu-items">
			<a href={`/notifications/subscriptions`} className={`${(props.status === 1) ? `active ` : ""}item`}>
				{i18n("notification.subscriptions")}
			</a>
			<a href={`/notifications/watching`} className={`${(props.status === 2) ? `active ` : ""}item`}>
				{i18n("notification.watching")}
			</a>
		</div>
		<div className="ui top attached segment">
			{(props.status === 1) ? (<>
				<div className="flex-left-right">
					<div className="tw-flex">
						<div className="small-menu-items ui compact tiny menu">
							<a className={`${(props.state === "all") ? `active ` : ""}item`} href={`?sort=${String(props.sortType ?? "")}&state=all&issueType=${String(props.issueType ?? "")}&labels=${String(props.labels ?? "")}`}>
								{i18n("all")}
							</a>
							<a className={`${(props.state === "open") ? `active ` : ""}item`} href={`?sort=${String(props.sortType ?? "")}&state=open&issueType=${String(props.issueType ?? "")}&labels=${String(props.labels ?? "")}`}>
								<span className="svg-icon" aria-label="octicon-issue-opened"></span>
								{i18n("repo.issues.open_title")}
							</a>
							<a className={`${(props.state === "closed") ? `active ` : ""}item`} href={`?sort=${String(props.sortType ?? "")}&state=closed&issueType=${String(props.issueType ?? "")}&labels=${String(props.labels ?? "")}`}>
								<span className="svg-icon" aria-label="octicon-issue-closed"></span>
								{i18n("repo.issues.closed_title")}
							</a>
						</div>
					</div>
					<div className="ui secondary menu tw-m-0">
							{/* Type */}
								<div className="ui dropdown type jump item">
									<span className="text">
										{i18n("repo.issues.filter_type")}
									</span>
									<span className="svg-icon" aria-label="octicon-triangle-down"></span>
									<div className="menu">
										<a className={`${((props.issueType === "all" || !(props.issueType))) ? `active ` : ""}item`} href={`?sort=${String(props.sortType ?? "")}&state=${String(props.state ?? "")}&issueType=all&labels=${String(props.labels ?? "")}`}>{i18n("all")}</a>
										<a className={`${(props.issueType === "issues") ? `active ` : ""}item`} href={`?sort=${String(props.sortType ?? "")}&state=${String(props.state ?? "")}&issueType=issues&labels=${String(props.labels ?? "")}`}>{i18n("issues")}</a>
										<a className={`${(props.issueType === "pulls") ? `active ` : ""}item`} href={`?sort=${String(props.sortType ?? "")}&state=${String(props.state ?? "")}&issueType=pulls&labels=${String(props.labels ?? "")}`}>{i18n("pull_requests")}</a>
									</div>
								</div>

							{/* Sort */}
							<div className="ui dropdown type jump item">
								<span className="text">
									{i18n("repo.issues.filter_sort")}
								</span>
								<span className="svg-icon" aria-label="octicon-triangle-down"></span>
								<div className="menu">
									<a className={`${((props.sortType === "latest" || !(props.sortType))) ? `active ` : ""}item`} href={`?sort=latest&state=${String(props.state ?? "")}&issueType=${String(props.issueType ?? "")}&labels=${String(props.labels ?? "")}`}>{i18n("repo.issues.filter_sort.latest")}</a>
									<a className={`${(props.sortType === "oldest") ? `active ` : ""}item`} href={`?sort=oldest&state=${String(props.state ?? "")}&issueType=${String(props.issueType ?? "")}&labels=${String(props.labels ?? "")}`}>{i18n("repo.issues.filter_sort.oldest")}</a>
									<a className={`${(props.sortType === "recentupdate") ? `active ` : ""}item`} href={`?sort=recentupdate&state=${String(props.state ?? "")}&issueType=${String(props.issueType ?? "")}&labels=${String(props.labels ?? "")}`}>{i18n("repo.issues.filter_sort.recentupdate")}</a>
									<a className={`${(props.sortType === "leastupdate") ? `active ` : ""}item`} href={`?sort=leastupdate&state=${String(props.state ?? "")}&issueType=${String(props.issueType ?? "")}&labels=${String(props.labels ?? "")}`}>{i18n("repo.issues.filter_sort.leastupdate")}</a>
									<a className={`${(props.sortType === "mostcomment") ? `active ` : ""}item`} href={`?sort=mostcomment&state=${String(props.state ?? "")}&issueType=${String(props.issueType ?? "")}&labels=${String(props.labels ?? "")}`}>{i18n("repo.issues.filter_sort.mostcomment")}</a>
									<a className={`${(props.sortType === "leastcomment") ? `active ` : ""}item`} href={`?sort=leastcomment&state=${String(props.state ?? "")}&issueType=${String(props.issueType ?? "")}&labels=${String(props.labels ?? "")}`}>{i18n("repo.issues.filter_sort.leastcomment")}</a>
									<a className={`${(props.sortType === "nearduedate") ? `active ` : ""}item`} href={`?sort=nearduedate&state=${String(props.state ?? "")}&issueType=${String(props.issueType ?? "")}&labels=${String(props.labels ?? "")}`}>{i18n("repo.issues.filter_sort.nearduedate")}</a>
									<a className={`${(props.sortType === "farduedate") ? `active ` : ""}item`} href={`?sort=farduedate&state=${String(props.state ?? "")}&issueType=${String(props.issueType ?? "")}&labels=${String(props.labels ?? "")}`}>{i18n("repo.issues.filter_sort.farduedate")}</a>
								</div>
							</div>
						</div>
				</div>
				<div className="divider"></div>
				{(!(props.issues)) ? (<>
					{i18n("notification.no_subscriptions")}
				</>) : (<>
					{/* template: shared/issuelist */}
				</>)}
			</>) : (<>
				{/* template: shared/repo/search */}
				{/* template: shared/repo/list */}
				{/* template: base/paginate */}
			</>)}
		</div>
	</div>
</div>


  </>)
}
