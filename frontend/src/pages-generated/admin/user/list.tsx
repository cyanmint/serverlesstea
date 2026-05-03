// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.users.user_manage_panel")} ({i18n("admin.total")})
			<div className="ui right">
				<a className="ui primary tiny button" href={`/-/admin/users/new`}>{i18n("admin.users.new_account")}</a>
			</div>
		</h4>
		<div className="ui attached segment">
			<form className="ui form ignore-dirty flex-text-block" id="user-list-search-form">
				<div className="tw-flex-1">
					{/* template: shared/search/combo */}
				</div>
				{/* Right Menu */}
				<div className="ui secondary menu tw-m-0">
					{/* Status Filter Menu Item */}
					<div className="ui dropdown type jump item">
						<span className="text">{i18n("admin.users.list_status_filter.menu_text")}</span>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu flex-items-menu">
							<a className="item j-reset-status-filter">{i18n("admin.users.list_status_filter.reset")}</a>
							<div className="divider"></div>
							<label className="item"><input type="radio" name="status_filter[is_admin]" value="1" /> {i18n("admin.users.list_status_filter.is_admin")}</label>
							<label className="item"><input type="radio" name="status_filter[is_admin]" value="0" /> {i18n("admin.users.list_status_filter.not_admin")}</label>
							<div className="divider"></div>
							<label className="item"><input type="radio" name="status_filter[is_active]" value="1" /> {i18n("admin.users.list_status_filter.is_active")}</label>
							<label className="item"><input type="radio" name="status_filter[is_active]" value="0" /> {i18n("admin.users.list_status_filter.not_active")}</label>
							<div className="divider"></div>
							<label className="item"><input type="radio" name="status_filter[is_restricted]" value="0" /> {i18n("admin.users.list_status_filter.not_restricted")}</label>
							<label className="item"><input type="radio" name="status_filter[is_restricted]" value="1" /> {i18n("admin.users.list_status_filter.is_restricted")}</label>
							<div className="divider"></div>
							<label className="item"><input type="radio" name="status_filter[is_prohibit_login]" value="0" /> {i18n("admin.users.list_status_filter.not_prohibit_login")}</label>
							<label className="item"><input type="radio" name="status_filter[is_prohibit_login]" value="1" /> {i18n("admin.users.list_status_filter.is_prohibit_login")}</label>
							<div className="divider"></div>
							<label className="item"><input type="radio" name="status_filter[is_2fa_enabled]" value="1" /> {i18n("admin.users.list_status_filter.is_2fa_enabled")}</label>
							<label className="item"><input type="radio" name="status_filter[is_2fa_enabled]" value="0" /> {i18n("admin.users.list_status_filter.not_2fa_enabled")}</label>
						</div>
					</div>

					{/* Sort Menu Item */}
					<div className="ui dropdown type jump item">
						<span className="text">
							{i18n("repo.issues.filter_sort")}
						</span>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu">
							<button className="item" name="sort" value="oldest">{i18n("repo.issues.filter_sort.oldest")}</button>
							<button className="item" name="sort" value="newest">{i18n("repo.issues.filter_sort.latest")}</button>
							<button className="item" name="sort" value="alphabetically">{i18n("repo.issues.label.filter_sort.alphabetically")}</button>
							<button className="item" name="sort" value="reversealphabetically">{i18n("repo.issues.label.filter_sort.reverse_alphabetically")}</button>
							<button className="item" name="sort" value="recentupdate">{i18n("repo.issues.filter_sort.recentupdate")}</button>
							<button className="item" name="sort" value="leastupdate">{i18n("repo.issues.filter_sort.leastupdate")}</button>
						</div>
					</div>
				</div>
			</form>
		</div>
		<div className="ui attached table segment">
			<table className="ui very basic selectable table unstackable">
				<thead>
					<tr>
						<th data-sortt-asc="oldest" data-sortt-desc="newest">ID{/* TODO: {{SortArrow "oldest" "newest" .SortType false}} */}</th>
						<th data-sortt-asc="alphabetically" data-sortt-desc="reversealphabetically" data-sortt-default="true">
							{i18n("admin.users.name")}
							{/* TODO: {{SortArrow "alphabetically" "reversealphabetically" $.SortType true}} */}
						</th>
						<th>{i18n("email")}</th>
						<th>{i18n("admin.users.activated")}</th>
						<th>{i18n("admin.users.restricted")}</th>
						<th>{i18n("admin.users.2fa")}</th>
						<th>{i18n("admin.users.created")}</th>
						<th data-sortt-asc="lastlogin" data-sortt-desc="reverselastlogin">
							{i18n("admin.users.last_login")}
							{/* TODO: {{SortArrow "lastlogin" "reverselastlogin" $.SortType false}} */}
						</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{((props.users) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td>{item.iD as any}</td>
							<td>
								<a href={String(props.homeLink ?? "")}>{item.name as any}</a>
								{(item.isAdmin) ? (<>
									<span className="ui mini label">{i18n("admin.users.admin")}</span>
								</>) : null} {(2 === item.type) ? (<>{/* Reserved user */}
									<span className="ui mini label">{i18n("admin.users.reserved")}</span>
								</>) : null} {(4 === item.type) ? (<>{/* Bot "user" */}
									<span className="ui mini label">{i18n("admin.users.bot")}</span>
								</>) : null} {(5 === item.type) ? (<>{/* Remote user */}
									<span className="ui mini label">{i18n("admin.users.remote")}</span>
								</>) : null}
							</td>
							<td className="gt-ellipsis tw-max-w-48">{item.email as any}</td>
							<td>{/* TODO: {{svg (Iif .IsActive "octicon-check" "octicon-x")}} */}</td>
							<td>{/* TODO: {{svg (Iif .IsRestricted "octicon-check" "octicon-x")}} */}</td>
							<td>{/* TODO: {{svg (Iif (index $.UsersTwoFaStatus .ID) "octicon-check" "octicon-x")}} */}</td>
							<td>{/* TODO: {{DateUtils.AbsoluteShort .CreatedUnix}} */}</td>
							{(item.lastLoginUnix) ? (<>
								<td>{/* TODO: {{DateUtils.AbsoluteShort .LastLoginUnix}} */}</td>
							</>) : (<>
								<td><span>{i18n("admin.users.never_login")}</span></td>
							</>)}
							<td>
								<div className="tw-flex tw-gap-2">
									<a href={`${String(props.link ?? "")}/${String(props.iD ?? "")}`} data-tooltip-content={String(i18n("admin.users.details") ?? "")}><span className="svg-icon" aria-label="octicon-person"></span></a>
									<a href={`${String(props.link ?? "")}/${String(props.iD ?? "")}/edit`} data-tooltip-content={String(i18n("edit") ?? "")}><span className="svg-icon" aria-label="octicon-pencil"></span></a>
								</div>
							</td>
						</tr>
					{/* else */}
						<tr className="no-results-row"><td className="tw-text-center" colSpan="9">{i18n("no_results_found")}</td></tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>

		{/* template: base/paginate */}
	</div>
{/* template: admin/layout_footer */}

  </>)
}
