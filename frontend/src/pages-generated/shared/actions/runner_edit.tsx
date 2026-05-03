import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function RunnerEdit(props: Record<string, unknown>) {
  return (<>
<div className="runner-container">
	<h4 className="ui top attached header">
		{i18n("actions.runners.runner_title")} {props.runner?.iD as any} {props.runner?.name as any}
	</h4>
	<div className="ui attached segment">
		<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			{/* template: base/disable_form_autofill */}
			<div className="runner-basic-info">
				<div className="field tw-inline-block tw-mr-4">
					<label>{i18n("actions.runners.status")}</label>
					<span className={`ui ${(props.runner?.isOnline) ? `green` : `basic`} label`}>{props.runner?.statusLocaleName?.("ctx.Locale") as any}</span>
				</div>
				<div className="field tw-inline-block tw-mr-4">
					<label>{i18n("actions.runners.availability")}</label>
					<span className={`ui ${(props.runner?.isDisabled) ? `grey` : `green`} label`}>
						{(props.runner?.isDisabled) ? (<>
							{i18n("disabled")}
						</>) : (<>
							{i18n("enabled")}
						</>)}
					</span>
				</div>
				<div className="field tw-inline-block tw-mr-4">
					<label>{i18n("actions.runners.last_online")}</label>
					<span>{(props.runner?.lastOnline) ? (<>{/* TODO: {{DateUtils.TimeSince .Runner.LastOnline}} */}</>) : (<>{i18n("never")}</>)}</span>
				</div>
				<div className="field tw-inline-block tw-mr-4">
					<label>{i18n("actions.runners.labels")}</label>
					<span className="flex-text-inline tw-flex-wrap">
						{((props.runner?.agentLabels) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<span className="ui label">{item as any}</span>
						</React.Fragment>))}
					</span>
				</div>
				<div className="field tw-inline-block tw-mr-4">
					<label>{i18n("actions.runners.owner_type")}</label>
					<span data-tooltip-content={String(props.runner?.belongsToOwnerName ?? "")}>{props.runner?.belongsToOwnerType?.localeString?.("ctx.Locale") as any}</span>
				</div>
			</div>

			<div className="divider"></div>

			<div className="field">
				<label htmlFor="description">{i18n("actions.runners.description")}</label>
				<input id="description" name="description" value={String(props.runner?.description ?? "")} />
			</div>

			<div className="divider"></div>

			<div className="field">
				<button className="ui primary button" data-url={String(props.link ?? "")}>{i18n("actions.runners.update_runner")}</button>
				<button type="button" className="ui button link-action" data-url={`${String(props.link ?? "")}/update-runner?disabled=`}>
					{(props.runner?.isDisabled) ? (<>{i18n("actions.runners.enable_runner")}</>) : (<>{i18n("actions.runners.disable_runner")}</>)}
				</button>
				<button className="ui red button delete-button" data-url={`${String(props.link ?? "")}/delete`} data-modal="#runner-delete-modal">
					{i18n("actions.runners.delete_runner")}</button>
			</div>
		</form>
	</div>

	<h4 className="ui top attached header">
		{i18n("actions.runners.task_list")}
	</h4>
	<div className="ui attached segment">
		<table className="ui very basic table unstackable">
			<thead>
				<tr>
					<th>{i18n("actions.runners.task_list.run")}</th>
					<th>{i18n("actions.runners.task_list.status")}</th>
					<th>{i18n("actions.runners.task_list.repository")}</th>
					<th>{i18n("actions.runners.task_list.commit")}</th>
					<th>{i18n("actions.runners.task_list.done_at")}</th>
				</tr>
			</thead>
			<tbody>
				{((props.tasks) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<tr>
					<td><a href={String(props.getRunLink ?? "")} target="_blank">{item.iD as any}</a></td>
					<td><span className={`ui label task-status-${String(props.status?.string ?? "")}`}>{item.status?.localeString?.("ctx.Locale") as any}</span></td>
					<td><a href={String(props.getRepoLink ?? "")} target="_blank">{item.getRepoName as any}</a></td>
					<td>
						<a className="ui sha label" href={String(props.getCommitLink ?? "")} target="_blank">{/* TODO: {{ShortSha .CommitSHA}} */}</a>
					</td>
					<td>{(item.isStopped) ? (<>
						<span>{/* TODO: {{DateUtils.TimeSince .Stopped}} */}</span>
						</>) : (<>-</>)}</td>
				</tr>
				</React.Fragment>))}
				{(!(props.tasks)) ? (<>
				<tr>
					<td colSpan="5">{i18n("actions.runners.task_list.no_tasks")}</td>
				</tr>
				</>) : null}
			</tbody>
		</table>
		{/* template: base/paginate */}
	</div>
	<div className="ui g-modal-confirm delete modal" id="runner-delete-modal">
		<div className="header">
			<span className="svg-icon" aria-label="octicon-trash"></span>
			{i18n("actions.runners.delete_runner_header")}
		</div>
		<div className="content">
			<p>{i18n("actions.runners.delete_runner_notice")}</p>
		</div>
		{/* template: base/modal_actions_confirm */}
	</div>
</div>

  </>)
}
