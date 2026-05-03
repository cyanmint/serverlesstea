// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Milestones(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content dashboard issues repository milestones">
	{/* template: user/dashboard/navbar */}
	<div className="ui container">
		<div className="flex-container">
			<div className="flex-container-nav">
				<div className="ui secondary vertical filter menu tw-bg-transparent">
					<div className="item">
						{i18n("home.issues.in_your_repos")}
						<strong>{props.total as any}</strong>
					</div>
					<div className="divider"></div>
					{((props.repos) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						{(item) && (<>
							<a className={`${("." === props.repo?.iD) ? `active` : ""} repo name item`} href={`?repos=[
								
										
											${("." === props.repo?.iD) ? `
												
											` : `
												%2C
											`}
										
										${(props.include === true) ? `
											%2C
										` : ""}
									
								]&sort=${String(props.sortType ?? "")}&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`} title={String(props.fullName ?? "")}>
								<span className="tw-inline-block tw-truncate tw-w-3/4">{/* TODO: {{$Repo.FullName}} */}</span>
								<div className={`ui ${(props.isShowClosed) ? `red` : `green`} label`}>{/* TODO: {{index $.Counts $Repo.ID}} */}</div>
							</a>
						</>) }
					</React.Fragment>))}
				</div>
			</div>
			<div className="flex-container-main">
				<div className="list-header">
					<div className="small-menu-items ui compact tiny menu list-header-toggle">
						<a className={`item${(!(props.isShowClosed)) ? ` active` : ""}`} href={`?repos=[%2C]&sort=${String(props.sortType ?? "")}&state=open&q=${String(props.keyword ?? "")}`}>
							<span className="svg-icon" aria-label="octicon-milestone"></span>
							{/* TODO: {{ctx.Locale.PrettyNumber .MilestoneStats.OpenCount}} */}&nbsp;{i18n("repo.issues.open_title")}
						</a>
						<a className={`item${(props.isShowClosed) ? ` active` : ""}`} href={`?repos=[%2C]&sort=${String(props.sortType ?? "")}&state=closed&q=${String(props.keyword ?? "")}`}>
							<span className="svg-icon" aria-label="octicon-check"></span>
							{/* TODO: {{ctx.Locale.PrettyNumber .MilestoneStats.ClosedCount}} */}&nbsp;{i18n("repo.issues.closed_title")}
						</a>
					</div>
					<form className="list-header-search ui form ignore-dirty">
						<input type="hidden" name="type" value={String(props.viewType ?? "")} />
							<input type="hidden" name="repos" value={`[,]`} />
							<input type="hidden" name="sort" value={String(props.sortType ?? "")} />
							<input type="hidden" name="state" value={String(props.state ?? "")} />
						{/* template: shared/search/combo */}
					</form>
					<div className="list-header-filters">
						{'{'}/* Sort */{'}'}
						<div className="item ui dropdown jump">
							<span className="text">
								{i18n("repo.issues.filter_sort")}
							</span>
							<span className="svg-icon" aria-label="octicon-triangle-down"></span>
							<div className="menu">
								<a className={`${((props.sortType === "closestduedate" || !(props.sortType))) ? `active ` : ""}item`} href={`?repos=[%2C]&sort=closestduedate&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.earliest_due_data")}</a>
								<a className={`${(props.sortType === "furthestduedate") ? `active ` : ""}item`} href={`?repos=[%2C]&sort=furthestduedate&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.latest_due_date")}</a>
								<a className={`${(props.sortType === "leastcomplete") ? `active ` : ""}item`} href={`?repos=[%2C]&sort=leastcomplete&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.least_complete")}</a>
								<a className={`${(props.sortType === "mostcomplete") ? `active ` : ""}item`} href={`?repos=[%2C]&sort=mostcomplete&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.most_complete")}</a>
								<a className={`${(props.sortType === "mostissues") ? `active ` : ""}item`} href={`?repos=[%2C]&sort=mostissues&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.most_issues")}</a>
								<a className={`${(props.sortType === "leastissues") ? `active ` : ""}item`} href={`?repos=[%2C]&sort=leastissues&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.least_issues")}</a>
								<a className={`${(props.sortType === "name") ? `active ` : ""}item`} href={`${String(props.link ?? "")}?sort=name&state=${String(props.state ?? "")}&q=${String(props.keyword ?? "")}`}>{i18n("repo.milestones.filter_sort.name")}</a>
							</div>
						</div>
					</div>
				</div>
				<div className="milestone-list">
					{((props.milestones) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<li className="milestone-card">
							<div className="milestone-header">
								<h3 className="flex-text-block tw-m-0">
									<span className="ui large label">
										{item.repo?.fullName as any}
									</span>
									<span className="svg-icon" aria-label="octicon-milestone"></span>
									<a className="muted" href={`${String(props.repo?.link ?? "")}/milestone/${String(props.iD ?? "")}`}>{item.name as any}</a>
								</h3>
								<div className="tw-flex tw-items-center">
									<span className="tw-mr-2">{item.completeness as any}%</span>
									<progress value={String(props.completeness ?? "")} max="100"></progress>
								</div>
							</div>
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
									{(item.totalTrackedTime) ? (<>
										<div className="flex-text-block">
											<span className="svg-icon" aria-label="octicon-clock"></span>
											{item.totalTrackedTime|Sec2Hour as any}
										</div>
									</>) : null}
									{(item.updatedUnix) ? (<>
										<div className="flex-text-block">
											<span className="svg-icon" aria-label="octicon-clock"></span>
											{i18n("repo.milestones.update_ago")}
										</div>
									</>) : null}
									<div className="flex-text-block">
										{(item.isClosed) ? (<>
											{/* $closedDate */}
											<span className="svg-icon" aria-label="octicon-clock"></span>
											{i18n("repo.milestones.closed")}
										</>) : (<>
											{(item.deadlineString) ? (<>
												<span className={`flex-text-inline ${(props.isOverdue) ? `tw-text-red` : ""}`}>
													<span className="svg-icon" aria-label="octicon-calendar"></span>
													{/* TODO: {{DateUtils.AbsoluteShort (.DeadlineString|DateUtils.ParseLegacy)}} */}
												</span>
											</>) : (<>
												<span className="svg-icon" aria-label="octicon-calendar"></span>
												{i18n("repo.milestones.no_due_date")}
											</>)}
										</>)}
									</div>
								</div>
								{(((props.canWriteIssues || props.canWritePulls) && !(props.repository?.isArchived))) ? (<>
									<div className="group">
										<a className="flex-text-inline" href={`${String(props.link ?? "")}/${String(props.iD ?? "")}/edit`}><span className="svg-icon" aria-label="octicon-pencil"></span>{i18n("repo.issues.label_edit")}</a>
										{(item.isClosed) ? (<>
											<a className="link-action flex-text-inline" href data-url={`${String(props.link ?? "")}/${String(props.iD ?? "")}/open`}><span className="svg-icon" aria-label="octicon-check"></span>{i18n("repo.milestones.open")}</a>
										</>) : (<>
											<a className="link-action flex-text-inline" href data-url={`${String(props.link ?? "")}/${String(props.iD ?? "")}/close`}><span className="svg-icon" aria-label="octicon-x"></span>{i18n("repo.milestones.close")}</a>
										</>)}
										<a className="delete-button flex-text-inline" href="#" data-url={`${String(props.repoLink ?? "")}/milestones/delete`} data-id={String(props.iD ?? "")}><span className="svg-icon" aria-label="octicon-trash"></span>{i18n("repo.issues.label_delete")}</a>
									</div>
								</>) : null}
							</div>
							{(item.content) ? (<>
								<div className="render-content markup">{item.renderedContent as any}</div>
							</>) : null}
						</li>
					</React.Fragment>))}

					{/* template: base/paginate */}
				</div>

			</div>
		</div>
	</div>
</div>


  </>)
}
