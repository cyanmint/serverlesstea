import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.packages.package_manage_panel")} ({i18n("admin.total")},
			{i18n("admin.packages.total_size")},
			{i18n("admin.packages.unreferenced_size")})
			<div className="ui right">
				<form method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`/-/admin/packages/cleanup`}>
					<button className="ui primary tiny button">{i18n("admin.packages.cleanup")}</button>
				</form>
			</div>
		</h4>
		<div className="ui attached segment">
			<form className="ui form ignore-dirty">
				<div className="ui small fluid action input">
					{/* template: shared/search/input */}
					<select className="ui small dropdown" name="type">
						<option value="">{i18n("packages.filter.type")}</option>
						<option value="all">{i18n("packages.filter.type.all")}</option>
						{((props.availableTypes) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<option{(props.packageType === "$type") ? (<> selected="selected"</>) : null} value={String("" ?? "")}>{/* TODO: {{$type.Name}} */}</option>
						</React.Fragment>))}
					</select>
					{/* template: shared/search/button */}
				</div>
			</form>
		</div>
		<div className="ui attached table segment">
			<table className="ui very basic table unstackable">
				<thead>
					<tr>
						<th>ID</th>
						<th>{i18n("admin.packages.owner")}</th>
						<th>{i18n("admin.packages.type")}</th>
						<th data-sortt-asc="name_asc" data-sortt-desc="name_desc">
							{i18n("admin.packages.name")}
							{/* TODO: {{SortArrow "name_asc" "name_desc" .SortType false}} */}
						</th>
						<th data-sortt-asc="version_desc" data-sortt-desc="version_asc">
							{i18n("admin.packages.version")}
							{/* TODO: {{SortArrow "version_desc" "version_asc" .SortType false}} */}
						</th>
						<th>{i18n("admin.packages.creator")}</th>
						<th>{i18n("admin.packages.repository")}</th>
						<th>{i18n("admin.packages.size")}</th>
						<th data-sortt-asc="created_asc" data-sortt-desc="created_desc">
							{i18n("admin.packages.published")}
							{/* TODO: {{SortArrow "created_asc" "created_desc" .SortType true}} */}
						</th>
						<th>{i18n("admin.notices.op")}</th>
					</tr>
				</thead>
				<tbody>
					{((props.packageDescriptors) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td>{item.version?.iD as any}</td>
							<td>
								<a href={String(props.owner?.homeLink ?? "")}>{item.owner?.name as any}</a>
								{(item.owner?.visibility?.isPrivate) ? (<>
									<span className="tw-text-gold"><span className="svg-icon" aria-label="octicon-lock"></span></span>
								</>) : null}
							</td>
							<td>{item.package?.type?.name as any}</td>
							<td className="gt-ellipsis tw-max-w-48">{item.package?.name as any}</td>
							<td className="gt-ellipsis tw-max-w-48"><a href={String(props.versionWebLink ?? "")}>{item.version?.version as any}</a></td>
							<td><a href={String(props.creator?.homeLink ?? "")}>{item.creator?.name as any}</a></td>
							<td>
							{(item.repository) ? (<>
								<a href={String(props.repository?.link ?? "")}>{item.repository?.name as any}</a>
							</>) : null}
							</td>
							<td>{/* TODO: {{FileSize .CalculateBlobSize}} */}</td>
							<td>{/* TODO: {{DateUtils.AbsoluteShort .Version.CreatedUnix}} */}</td>
							<td>
								<a className="tw-text-red show-modal" href data-modal="#admin-package-delete-modal"
									data-modal-form.action={`${String(props.link ?? "")}/delete?page=${String(props.page?.paginater?.current ?? "")}&sort=${String(props.sortType ?? "")}&id=${String(props.version?.iD ?? "")}`}
									data-modal-package-name={String(props.package?.name ?? "")} data-modal-package-version={String(props.version?.version ?? "")}
								><span className="svg-icon" aria-label="octicon-trash"></span></a>
							</td>
						</tr>
					{/* else */}
						<tr><td className="tw-text-center" colspan="10">{i18n("no_results_found")}</td></tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>

		{/* template: base/paginate */}
	</div>

<form className="ui small modal form-fetch-action" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} id="admin-package-delete-modal">
	<div className="header"><span className="svg-icon" aria-label="octicon-trash"></span> {i18n("packages.settings.delete.version")}</div>
	<div className="content">
		{i18n("packages.settings.delete.notice")}
	</div>
	{/* template: base/modal_actions_confirm */}
</form>

{/* template: admin/layout_footer */}

  </>)
}
