import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Cron(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
<div className="admin-setting-content">
	<h4 className="ui top attached header">
		{i18n("admin.monitor.cron")}
	</h4>
	<div className="ui attached table segment">
		<form method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`/-/admin`}>
			<table className="ui very basic table unstackable tw-mb-0">
				<thead>
					<tr>
						<th></th>
						<th>{i18n("admin.monitor.name")}</th>
						<th>{i18n("admin.monitor.schedule")}</th>
						<th>{i18n("admin.monitor.next")}</th>
						<th>{i18n("admin.monitor.previous")}</th>
						<th>{i18n("admin.monitor.execute_times")}</th>
						<th>{i18n("admin.monitor.last_execution_result")}</th>
					</tr>
				</thead>
				<tbody>
					{((props.entries) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td><button type="submit" className="ui primary button" name="op" value={String(props.name ?? "")} title={String(i18n("admin.dashboard.operation_run") ?? "")}><span className="svg-icon" aria-label="octicon-triangle-right"></span></button></td>
							<td>{/* TODO: {{ctx.Locale.Tr (printf "admin.dashboard.%s" .Name)}} */}</td>
							<td>{item.spec as any}</td>
							<td>{/* TODO: {{DateUtils.FullTime .Next}} */}</td>
							<td>{(item.prev?.year > 1) ? (<>{/* TODO: {{DateUtils.FullTime .Prev}} */}</>) : (<>-</>)}</td>
							<td>{item.execTimes as any}</td>
							<td {...(item.status !== "" ? {"data-tooltip-content": String(props.formatLastMessage?.("ctx.Locale") ?? "")} : {})} >{(item.status === "") ? (<>—</>) : (<>{/* TODO: {{svg (Iif (eq .Status "finished") "octicon-check" "octicon-x") 16}} */}</>)}</td>
						</tr>
					</React.Fragment>))}
				</tbody>
			</table>
			<input type="hidden" name="from" value="monitor" />
		</form>
	</div>
</div>
{/* template: admin/layout_footer */}

  </>)
}
