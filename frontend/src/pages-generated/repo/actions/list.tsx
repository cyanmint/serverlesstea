import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>

<div className="page-content repository actions">
	{/* template: repo/header */}
	<div className="ui container">
		{/* alert */}

		{(props.hasWorkflowsOrRuns) ? (<>
		<div className="flex-container">
			<div className="flex-container-nav">
				<div className="ui fluid vertical menu flex-items-block">
					<a className={`item ${(!(props.curWorkflow)) ? `active` : ""}`} href={`?actor=${String(props.curActor ?? "")}&status=${String(props.curStatus ?? "")}`}>{i18n("actions.runs.all_workflows")}</a>
					{((props.workflows) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<a className={`item ${(props.entry?.name === props.curWorkflow) ? `active` : ""}`} href={`?workflow=${String(props.entry?.name ?? "")}&actor=${String(props.curActor ?? "")}&status=${String(props.curStatus ?? "")}`}>
							<span className="gt-ellipsis">{item.entry?.name as any}</span>

							{(item.errMsg) ? (<>
								<span className="flex-text-inline" data-tooltip-content={String(props.errMsg ?? "")}><span className="svg-icon" aria-label="octicon-alert"></span></span>
							</>) : null}

							{(props.actionsConfig?.isWorkflowDisabled?.(item.entry?.name)) ? (<>
								<div className="ui red label">{i18n("disabled")}</div>
							</>) : null}
						</a>
					</React.Fragment>))}
				</div>
			</div>
			<div className="flex-container-main">
				<div className="ui top attached header flex-left-right">
					<strong>{/* TODO: {{ctx.Locale.TrN .Page.Paginater.Total "actions.runs.workflow_run_count_1" "actions.runs.workflow_run_count_n" .Page.Paginater.Total}} */}</strong>
					<div className="ui secondary filter menu flex-text-block tw-m-0">
						{/* Actor */}
						<div className={`ui${(!(props.actors)) ? ` disabled` : ""} dropdown jump item`}>
							<span className="text">{i18n("actions.runs.actor")}</span>
							<span className="svg-icon" aria-label="octicon-triangle-down"></span>
							<div className="menu">
								<div className="ui icon search input">
									<i className="icon"><span className="svg-icon" aria-label="octicon-search"></span></i>
									<input type="text" placeholder={String(i18n("actions.runs.actor") ?? "")} />
								</div>
								<a className={`item${(!(props.curActor)) ? ` active` : ""}`} href={`?workflow=${String(props.curWorkflow ?? "")}&status=${String(props.curStatus ?? "")}&actor=0`}>
									{i18n("actions.runs.actors_no_select")}
								</a>
								{((props.actors) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									<a className={`item${(props.iD === props.curActor) ? ` active` : ""}`} href={`?workflow=${String(props.curWorkflow ?? "")}&actor=${String(props.iD ?? "")}&status=${String(props.curStatus ?? "")}`}>
										{/* TODO: {{ctx.AvatarUtils.Avatar . 20}} */} {item.getDisplayName as any}
									</a>
								</React.Fragment>))}
							</div>
						</div>
						{/* Status */}
						<div className="ui dropdown jump item">
							<span className="text">{i18n("actions.runs.status")}</span>
							<span className="svg-icon" aria-label="octicon-triangle-down"></span>
							<div className="menu">
								<div className="ui icon search input">
									<i className="icon"><span className="svg-icon" aria-label="octicon-search"></span></i>
									<input type="text" placeholder={String(i18n("actions.runs.status") ?? "")} />
								</div>
								<a className={`item${(!(props.curStatus)) ? ` active` : ""}`} href={`?workflow=${String(props.curWorkflow ?? "")}&actor=${String(props.curActor ?? "")}&status=0`}>
									{i18n("actions.runs.status_no_select")}
								</a>
								{((props.statusInfoList) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									<a className={`item${(props.status === props.curStatus) ? ` active` : ""}`} href={`?workflow=${String(props.curWorkflow ?? "")}&actor=${String(props.curActor ?? "")}&status=${String(props.status ?? "")}`}>
										{item.displayedStatus as any}
									</a>
								</React.Fragment>))}
							</div>
						</div>

						{(props.allowDisableOrEnableWorkflow) ? (<>
						<button className="ui jump dropdown btn interact-bg tw-p-2">
							<span className="svg-icon" aria-label="octicon-kebab-horizontal"></span>
							<div className="menu">
								<a className="item link-action" data-url={`${String(props.link ?? "")}/${(props.curWorkflowDisabled) ? `enable` : `disable`}?workflow=${String(props.curWorkflow ?? "")}&actor=${String(props.curActor ?? "")}&status=${String(props.curStatus ?? "")}`}>
									{(props.curWorkflowDisabled) ? (<>{i18n("actions.workflow.enable")}</>) : (<>{i18n("actions.workflow.disable")}</>)}
								</a>
							</div>
						</button>
						</>) : null}
					</div>
				</div>

				{(props.workflowDispatchConfig) ? (<>
					{/* template: repo/actions/workflow_dispatch */}
				</>) : null}

				<div className="ui attached segment">
					{/* template: repo/actions/runs_list */}
				</div>
			</div>
		</div>
		</>) : (<>
			{/* template: repo/actions/no_workflows */}
		</>)}
	</div>
</div>


  </>)
}
