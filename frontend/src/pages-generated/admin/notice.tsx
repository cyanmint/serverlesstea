import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Notice(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.notices.system_notice_list")} ({i18n("admin.total")})
		</h4>
		<table className="ui attached segment select selectable table unstackable g-table-auto-ellipsis">
			<thead>
				<tr>
					<th></th>
					<th>ID</th>
					<th>{i18n("admin.notices.type")}</th>
					<th>{i18n("admin.notices.desc")}</th>
					<th>{i18n("admin.users.created")}</th>
					<th>{i18n("admin.notices.op")}</th>
				</tr>
			</thead>
			<tbody>
				{((props.notices) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<tr>
						<td><div className="ui checkbox tw-flex" data-id={String(props.iD ?? "")}><input type="checkbox" /></div></td>
						<td>{item.iD as any}</td>
						<td>{/* TODO: {{ctx.Locale.Tr .TrStr}} */}</td>
						<td className="view-detail auto-ellipsis tw-w-4/5"><span className="notice-description">{item.description as any}</span></td>
						<td nowrap>{/* TODO: {{DateUtils.AbsoluteShort .CreatedUnix}} */}</td>
						<td className="view-detail"><a href="#"><span className="svg-icon" aria-label="octicon-note"></span></a></td>
					</tr>
				{/* else */}
					<tr><td className="tw-text-center" colSpan="6">{i18n("no_results_found")}</td></tr>
				</React.Fragment>))}
			</tbody>
			{(props.notices) ? (<>
				<tfoot>
						<tr>
							<th></th>
							<th colSpan="5">
								<form className="tw-float-right" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`/-/admin/notices/empty`}>
									<button type="submit" className="ui red small button">{i18n("admin.notices.delete_all")}</button>
								</form>
								<div className="ui floating upward dropdown small button">
									<span className="text">{i18n("admin.notices.operations")}</span>
									<div className="menu">
										<div className="item select action" data-data-action="select-all">
											{i18n("admin.notices.select_all")}
										</div>
										<div className="item select action" data-data-action="deselect-all">
											{i18n("admin.notices.deselect_all")}
										</div>
										<div className="item select action" data-data-action="inverse">
											{i18n("admin.notices.inverse_selection")}
										</div>
									</div>
								</div>
								<button className="ui small button" id="delete-selection" data-link={`${String(props.link ?? "")}/delete`}>
									<span className="text">{i18n("admin.notices.delete_selected")}</span>
								</button>
							</th>
						</tr>
				</tfoot>
			</>) : null}
		</table>
		{/* template: base/paginate */}
	</div>

<div className="ui modal admin" id="detail-modal">
	<div className="header">{i18n("admin.notices.view_detail_header")}</div>
	<div className="content"><pre></pre></div>
</div>

{/* template: admin/layout_footer */}

  </>)
}
