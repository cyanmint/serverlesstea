import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.auths.auth_manage_panel")} ({i18n("admin.total")})
			<div className="ui right">
				<a className="ui primary tiny button" href={`/-/admin/auths/new`}>{i18n("admin.auths.new")}</a>
			</div>
		</h4>
		<div className="ui attached table segment">
			<table className="ui very basic table unstackable">
				<thead>
					<tr>
						<th>ID</th>
						<th>{i18n("admin.auths.name")}</th>
						<th>{i18n("admin.auths.type")}</th>
						<th>{i18n("admin.auths.enabled")}</th>
						<th>{i18n("admin.auths.updated")}</th>
						<th>{i18n("admin.users.created")}</th>
						<th>{i18n("admin.users.edit")}</th>
					</tr>
				</thead>
				<tbody>
					{((props.sources) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td>{item.iD as any}</td>
							<td><a href={`/-/admin/auths/${String(props.iD ?? "")}`}>{item.name as any}</a></td>
							<td>{item.typeName as any}</td>
							<td>{/* TODO: {{svg (Iif .IsActive "octicon-check" "octicon-x")}} */}</td>
							<td>{/* TODO: {{DateUtils.AbsoluteShort .UpdatedUnix}} */}</td>
							<td>{/* TODO: {{DateUtils.AbsoluteShort .CreatedUnix}} */}</td>
							<td><a href={`/-/admin/auths/${String(props.iD ?? "")}`}><span className="svg-icon" aria-label="octicon-pencil"></span></a></td>
						</tr>
					{/* else */}
						<tr><td className="tw-text-center" colSpan="7">{i18n("no_results_found")}</td></tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>
	</div>
{/* template: admin/layout_footer */}

  </>)
}
