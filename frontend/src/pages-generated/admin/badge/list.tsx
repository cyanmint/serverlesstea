// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.badges.badges_manage_panel")} ({i18n("admin.total")})
			<div className="ui right">
				<a className="ui primary tiny button" href={`/-/admin/badges/new`}>{i18n("admin.badges.new_badge")}</a>
			</div>
		</h4>
		<div className="ui attached segment">
			<form className="ui form ignore-dirty flex-text-block" id="user-list-search-form">
				<div className="tw-flex-1">
					{/* template: shared/search/combo */}
				</div>
				{'{'}/* Right Menu */{'}'}
				<div className="ui secondary menu tw-m-0">
					{'{'}/* Sort Menu Item */{'}'}
					<div className="ui dropdown type jump item">
						<span className="text">
							{i18n("repo.issues.filter_sort")}
						</span>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu">
							<button className={`${(props.sortType === "oldest") ? `active ` : ""}item`} name="sort" value="oldest">{i18n("repo.issues.filter_sort.oldest")}</button>
							<button className={`${(props.sortType === "newest") ? `active ` : ""}item`} name="sort" value="newest">{i18n("repo.issues.filter_sort.latest")}</button>
							<button className={`${(props.sortType === "alphabetically") ? `active ` : ""}item`} name="sort" value="alphabetically">{i18n("repo.issues.label.filter_sort.alphabetically")}</button>
							<button className={`${(props.sortType === "reversealphabetically") ? `active ` : ""}item`} name="sort" value="reversealphabetically">{i18n("repo.issues.label.filter_sort.reverse_alphabetically")}</button>
						</div>
					</div>
				</div>
			</form>
		</div>
		<div className="ui attached table segment">
			<table className="ui very basic striped table unstackable">
				<thead>
					<tr>
						<th data-sortt-asc="oldest" data-sortt-desc="newest" data-sortt-default="true">ID{/* TODO: {{SortArrow "oldest" "newest" .SortType false}} */}</th>
						<th data-sortt-asc="alphabetically" data-sortt-desc="reversealphabetically">
							{i18n("admin.badges.slug")}
							{/* TODO: {{SortArrow "alphabetically" "reversealphabetically" $.SortType true}} */}
						</th>
						<th>{i18n("admin.badges.description")}</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{((props.badges) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td>{item.iD as any}</td>
							<td>
								<a href={`${String(props.link ?? "")}/slug/${String(props.slug?.("|", "PathEscape") ?? "")}`}>{item.slug as any}</a>
							</td>
							<td className="gt-ellipsis tw-max-w-48">{item.description as any}</td>
							<td>
								<div className="tw-flex tw-gap-2">
									<a href={`${String(props.link ?? "")}/slug/${String(props.slug?.("|", "PathEscape") ?? "")}`} data-tooltip-content={String(i18n("admin.badges.details") ?? "")}><span className="svg-icon" aria-label="octicon-star"></span></a>
									<a href={`${String(props.link ?? "")}/slug/${String(props.slug?.("|", "PathEscape") ?? "")}/edit`} data-tooltip-content={String(i18n("edit") ?? "")}><span className="svg-icon" aria-label="octicon-pencil"></span></a>
								</div>
							</td>
						</tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>

		{/* template: base/paginate */}
	</div>
{/* template: admin/layout_footer */}

  </>)
}
