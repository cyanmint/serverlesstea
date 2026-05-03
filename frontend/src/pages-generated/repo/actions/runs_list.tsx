import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function RunsList(props: Record<string, unknown>) {
  return (<>
<div className="flex-divided-list items-with-main run-list">
	{(!(props.runs)) ? (<>
	<div className="empty-placeholder">
		<span className="svg-icon" aria-label="octicon-no-entry"></span>
		<h2>{(props.isFiltered) ? (<>{i18n("actions.runs.no_results")}</>) : (<>{i18n("actions.runs.no_runs")}</>)}</h2>
	</div>
	</>) : null}
	{((props.runs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<div className="item tw-items-center">
			<div className="item-leading">
				{/* template: repo/actions/status */}
			</div>
			<div className="item-main">
				<span className="item-title" title={String("" ?? "")}>
					{(item.run?.title) ? (<>
						{/* TODO: {{ctx.RenderUtils.RenderCommitMessageLinkSubject $run.Title $run.Link $.Repository}} */}
					</>) : (<>
						<a href={String("" ?? "")}>{i18n("actions.runs.empty_commit_message")}</a>
					</>)}
				</span>
				<div className="item-body">
					<span><b>{(!(props.curWorkflow)) ? (<>{/* TODO: {{$run.WorkflowID}} */} </>) : null}#{/* TODO: {{$run.Index}} */}</b>:</span>

					{/* TODO: {{- if $run.ScheduleID -}} */}
						{i18n("actions.runs.scheduled")}
					{/* TODO: {{- else -}} */}
						{i18n("actions.runs.commit")}
						<a href={`${String(props.repoLink ?? "")}/commit/`}>{/* TODO: {{ShortSha $run.CommitSHA}} */}</a>
						{i18n("actions.runs.pushed_by")}
						<a href={String("" ?? "")}>{/* TODO: {{$run.TriggerUser.GetDisplayName}} */}</a>
					{/* TODO: {{- end -}} */}

					{/* $errMsg */}
					{(errMsg) ? (<>
						<span className="flex-text-inline" data-tooltip-content={String("" ?? "")}>
							<span className="svg-icon" aria-label="octicon-alert"></span>
						</span>
					</>) : null}
				</div>
			</div>
			<div className="item-trailing">
				{(item.run?.isRefDeleted) ? (<>
					<span className="ui label run-list-ref gt-ellipsis tw-line-through" data-tooltip-content={String("" ?? "")}>{/* TODO: {{$run.PrettyRef}} */}</span>
				</>) : (<>
					<a className="ui label run-list-ref gt-ellipsis" href={String("" ?? "")} data-tooltip-content={String("" ?? "")}>{/* TODO: {{$run.PrettyRef}} */}</a>
				</>)}
				<div className="run-list-item-right">
					<div className="run-list-meta"><span className="svg-icon" aria-label="octicon-calendar"></span>{/* TODO: {{DateUtils.TimeSince $run.Updated}} */}</div>
					<div className="run-list-meta"><span className="svg-icon" aria-label="octicon-stopwatch"></span>{/* TODO: {{$run.Duration}} */}</div>
				</div>
				<div className="ui dropdown jump tw-p-2">
					<span className="svg-icon" aria-label="octicon-kebab-horizontal"></span>
					<div className="menu flex-items-menu">
						<a className="item" href={`/workflow`}><span className="svg-icon" aria-label="octicon-play"></span>{i18n("actions.runs.view_workflow_file")}</a>
						{((props.canWriteRepoUnitActions && !(item.run?.status?.isDone))) ? (<>
							<a className="item link-action" data-url={`/cancel`}>
								<span className="svg-icon" aria-label="octicon-x"></span>{i18n("actions.runs.cancel")}
							</a>
						</>) : null}
						{((props.canWriteRepoUnitActions && item.run?.status?.isDone)) ? (<>
							<a className="item link-action"
								data-url={`/delete`}
								data-modal-confirm={String(i18n("actions.runs.delete.description") ?? "")}
							>
								<span className="svg-icon" aria-label="octicon-trash"></span>{i18n("actions.runs.delete")}
							</a>
						</>) : null}
					</div>
				</div>
			</div>
		</div>
	</React.Fragment>))}
</div>
{/* template: base/paginate */}

  </>)
}
