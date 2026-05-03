// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function QueueManage(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.monitor.queue")}
		</h4>
		<div className="ui attached table segment">
			<table className="ui very basic table">
				<thead>
					<tr>
						<th>{i18n("admin.monitor.queue.name")}</th>
						<th>{i18n("admin.monitor.queue.type")}</th>
						<th>{i18n("admin.monitor.queue.exemplar")}</th>
						<th>{i18n("admin.monitor.queue.numberworkers")}</th>
						<th>{i18n("admin.monitor.queue.activeworkers")}</th>
						<th>{i18n("admin.monitor.queue.maxnumberworkers")}</th>
						<th>{i18n("admin.monitor.queue.numberinqueue")}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{props.queue?.getName as any}</td>
						<td>{props.queue?.getType as any}</td>
						<td>{props.queue?.getItemTypeName as any}</td>
						<td>{props.queue?.getWorkerNumber as any}</td>
						<td>{props.queue?.getWorkerActiveNumber as any}</td>
						<td>{props.queue?.getWorkerMaxNumber as any}</td>
						<td>
							{/* $sum */}
							{(props.sum < 0) ? (<>
								-
							</>) : (<>
								{props.sum as any}
								<form action={`${String(props.link ?? "")}/remove-all-items`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} className="tw-inline-block tw-ml-4">
									<button className="ui tiny basic red button">{i18n("admin.monitor.queue.settings.remove_all_items")}</button>
								</form>
							</>)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.monitor.queue.settings.title")}
		</h4>
		<div className="ui attached segment">
			<p>{i18n("admin.monitor.queue.settings.desc")}</p>
			<form method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`${String(props.link ?? "")}/set`}>
				<div className="ui form">
					<div className="inline field">
						<label htmlFor="max-number">{i18n("admin.monitor.queue.settings.maxnumberworkers")}</label>
						<input name="max-number" type="text" placeholder={String(i18n("admin.monitor.queue.settings.maxnumberworkers.placeholder") ?? "")} />
					</div>
					<button className="ui submit button">{i18n("admin.monitor.queue.settings.submit")}</button>
				</div>
			</form>
		</div>
	</div>
{/* template: admin/layout_footer */}

  </>)
}
