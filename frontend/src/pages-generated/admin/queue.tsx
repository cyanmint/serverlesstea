// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Queue(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
<div className="admin-setting-content">
	<h4 className="ui top attached header">
		{i18n("admin.monitor.queues")}
	</h4>
	<div className="ui attached table segment">
		<table className="ui very basic table unstackable">
			<thead>
			<tr>
				<th>{i18n("admin.monitor.queue.name")}</th>
				<th>{i18n("admin.monitor.queue.type")}</th>
				<th>{i18n("admin.monitor.queue.exemplar")}</th>
				<th>{i18n("admin.monitor.queue.numberworkers")}</th>
				<th>{i18n("admin.monitor.queue.activeworkers")}</th>
				<th>{i18n("admin.monitor.queue.numberinqueue")}</th>
				<th></th>
			</tr>
			</thead>
			<tbody>
			{((props.queues) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<tr>
				<td>{/* TODO: {{$q.GetName}} */}</td>
				<td>{/* TODO: {{$q.GetType}} */}</td>
				<td>{/* TODO: {{$q.GetItemTypeName}} */}</td>
				<td>{/* TODO: {{$q.GetWorkerNumber}} */}</td>
				<td>{/* TODO: {{$q.GetWorkerActiveNumber}} */}</td>
				<td>{/* $sum */}{(props.sum < 0) ? (<>-</>) : (<>{props.sum as any}</>)}</td>
				<td><a href={`${String(props.link ?? "")}/`} className="button">{i18n("admin.monitor.queue.review_add")}</a></td>
			</tr>
			</React.Fragment>))}
			</tbody>
		</table>
	</div>
</div>
{/* template: admin/layout_footer */}


  </>)
}
