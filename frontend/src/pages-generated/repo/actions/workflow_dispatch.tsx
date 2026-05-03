import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function WorkflowDispatch(props: Record<string, unknown>) {
  return (<>
{/* "z-index" is used to maintain continuous attached styling and keep the colored border-bottom visible (pre-existing fomantic issue with negative margins) */}
<div className="ui blue info attached message flex-left-right tw-z-1">
	<span>{i18n("actions.workflow.has_workflow_dispatch")}</span>
	<div className="flex-text-block tw-bg-box-body tw-rounded">{/* make the button have correct hovered color */}
		<button className="ui mini button show-modal" data-modal="#runWorkflowDispatchModal">{i18n("actions.workflow.run")}<span className="svg-icon" aria-label="octicon-triangle-down"></span></button>
	</div>
</div>
<div id="runWorkflowDispatchModal" className="ui tiny modal">
	<div className="content">
		<form id="runWorkflowDispatchForm" className="ui form ignore-dirty" action={`${String(props.link ?? "")}/run?workflow=${String(props.curWorkflow ?? "")}&actor=${String(props.curActor ?? "")}&status=${String(props.status ?? "")}`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<div className="ui inline field required tw-flex tw-items-center">
				<span className="ui inline required field">
					<label>{i18n("actions.workflow.from_ref")}:</label>
				</span>
				<div className="ui inline field dropdown button select-branch branch-selector-dropdown ellipsis-text-items">
					<input type="hidden" name="ref" value={`refs/heads/`}
								data-fetch-trigger="change" data-fetch-sync="$body #runWorkflowDispatchModalInputs"
								data-fetch-url={`${String(props.link ?? "")}/workflow-dispatch-inputs?workflow=${String(props.curWorkflow ?? "")}`} />
					<span className="svg-icon" aria-label="octicon-git-branch"></span>
					<div className="default text">{/* TODO: {{index .Branches 0}} */}</div>
					<span className="svg-icon" aria-label="octicon-triangle-down"></span>
					<div className="menu transition">
						<div className="ui icon search input">
							<i className="icon"><span className="svg-icon" aria-label="octicon-filter"></span></i>
							<input name="search" type="text" placeholder={`${i18n("repo.filter_branch_and_tag")}...`} />
						</div>
						<div className="branch-tag-tab">
							<a className="branch-tag-item reference column muted active" href="#" data-target="#branch-list">
								<span className="svg-icon" aria-label="octicon-git-branch"></span> {i18n("repo.branches")}
							</a>
							<a className="branch-tag-item reference column muted" href="#" data-target="#tag-list">
								<span className="svg-icon" aria-label="octicon-tag"></span> {i18n("repo.tags")}
							</a>
						</div>
						<div className="branch-tag-divider"></div>
						<div id="branch-list" className="scrolling menu reference-list-menu">
							{((props.branches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<div className="item" data-value={`refs/heads/`} title={String("" ?? "")}>{item as any}</div>
							{/* else */}
								<div className="item">{i18n("no_results_found")}</div>
							</React.Fragment>))}
						</div>
						<div id="tag-list" className="scrolling menu reference-list-menu tw-hidden">
							{((props.tags) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<div className="item" data-value={`refs/tags/`} title={String("" ?? "")}>{item as any}</div>
							{/* else */}
								<div className="item">{i18n("no_results_found")}</div>
							</React.Fragment>))}
						</div>
					</div>
				</div>
			</div>
			<div className="divider"></div>
			{/* template: repo/actions/workflow_dispatch_inputs */}
		</form>
	</div>
</div>

  </>)
}
