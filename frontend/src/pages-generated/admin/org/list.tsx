import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.orgs.org_manage_panel")} ({i18n("admin.total")})
			<div className="ui right">
				<a className="ui primary tiny button" href={`/org/create`}>{i18n("admin.orgs.new_orga")}</a>
			</div>
		</h4>
		<div className="ui attached segment">
			<div className="ui secondary filter menu tw-items-center tw-mx-0">
				<form className="ui form ignore-dirty tw-flex-1">
					{/* template: shared/search/combo */}
				</form>
				{/* Sort */}
				<div className="ui dropdown type jump item tw-mr-0">
					<span className="text">
						{i18n("repo.issues.filter_sort")}
					</span>
					<span className="svg-icon" aria-label="octicon-triangle-down"></span>
					<div className="menu">
						<a className={`${((props.sortType === "oldest" || !(props.sortType))) ? `active ` : ""}item`} href={`?sort=oldest&q=${String(props.keyword ?? "")}`}>{i18n("repo.issues.filter_sort.oldest")}</a>
						<a className={`${(props.sortType === "newest") ? `active ` : ""}item`} href={`?sort=newest&q=${String(props.keyword ?? "")}`}>{i18n("repo.issues.filter_sort.latest")}</a>
						<a className={`${(props.sortType === "alphabetically") ? `active ` : ""}item`} href={`?sort=alphabetically&q=${String(props.keyword ?? "")}`}>{i18n("repo.issues.label.filter_sort.alphabetically")}</a>
						<a className={`${(props.sortType === "reversealphabetically") ? `active ` : ""}item`} href={`?sort=reversealphabetically&q=${String(props.keyword ?? "")}`}>{i18n("repo.issues.label.filter_sort.reverse_alphabetically")}</a>
						<a className={`${(props.sortType === "recentupdate") ? `active ` : ""}item`} href={`?sort=recentupdate&q=${String(props.keyword ?? "")}`}>{i18n("repo.issues.filter_sort.recentupdate")}</a>
						<a className={`${(props.sortType === "leastupdate") ? `active ` : ""}item`} href={`?sort=leastupdate&q=${String(props.keyword ?? "")}`}>{i18n("repo.issues.filter_sort.leastupdate")}</a>
					</div>
				</div>
			</div>
		</div>
		<div className="ui attached table segment">
			<table className="ui very basic table unstackable">
				<thead>
					<tr>
						<th data-sortt-asc="oldest" data-sortt-desc="newest">ID{/* TODO: {{SortArrow "oldest" "newest" $.SortType false}} */}</th>
						<th data-sortt-asc="alphabetically" data-sortt-desc="reversealphabetically" data-sortt-default="true">
							{i18n("admin.orgs.name")}
							{/* TODO: {{SortArrow "alphabetically" "reversealphabetically" $.SortType true}} */}
						</th>
						<th>{i18n("admin.orgs.teams")}</th>
						<th>{i18n("admin.orgs.members")}</th>
						<th>{i18n("admin.users.repos")}</th>
						<th data-sortt-asc="recentupdate" data-sortt-desc="leastupdate">
							{i18n("admin.users.created")}
							{/* TODO: {{SortArrow "recentupdate" "leastupdate" $.SortType false}} */}
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{((props.users) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td>{item.iD as any}</td>
							<td>
								<span className="username-display">
									<a href={String("" ?? "")}>{/* TODO: {{$org.Name}} */}</a>
									{(item.org?.fullName) ? (<><span className="username-fullname">({/* TODO: {{$org.FullName}} */})</span></>) : null}
								</span>
								{(item.visibility?.isPrivate) ? (<>
									<span className="tw-text-gold"><span className="svg-icon" aria-label="octicon-lock"></span></span>
								</>) : null}
								{(item.type === 3) ? (<>{/* Reserved organization */}
									<span className="ui mini label">{i18n("admin.users.reserved")}</span>
								</>) : null}
							</td>
							<td>{item.numTeams as any}</td>
							<td>{item.numMembers as any}</td>
							<td>{item.numRepos as any}</td>
							<td>{/* TODO: {{DateUtils.AbsoluteShort .CreatedUnix}} */}</td>
							<td><a href={`${String(props.organisationLink ?? "")}/settings`} data-tooltip-content={String(i18n("edit") ?? "")}><span className="svg-icon" aria-label="octicon-pencil"></span></a></td>
						</tr>
					{/* else */}
						<tr><td className="tw-text-center" colSpan="7">{i18n("no_results_found")}</td></tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>

		{/* template: base/paginate */}
	</div>
{/* template: admin/layout_footer */}

  </>)
}
