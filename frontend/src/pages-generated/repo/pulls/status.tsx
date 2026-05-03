// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Status(props: Record<string, unknown>) {
  return (<>
{/* Template Attributes:
* CommitStatus: summary of all commit status state
* CommitStatuses: all commit status elements
* ShowHideChecks: whether use a button to show/hide the checks
* StatusCheckData: additional status check data, see backend pullCommitStatusCheckData struct */}
{/* $statusCheckData */}
{(props.commitStatus) ? (<>
<div className="commit-status-panel">
	<div className="ui top attached header commit-status-header">
		{/* TODO: {{$statusCheckData.CommitStatusCheckPrompt ctx.Locale}} */}

		{(props.showHideChecks) ? (<>
		<div className="ui right">
			<button className="commit-status-hide-checks btn interact-fg"
			data-show-all={String(i18n("repo.pulls.status_checks_show_all") ?? "")}
			data-hide-all={String(i18n("repo.pulls.status_checks_hide_all") ?? "")}>
			{i18n("repo.pulls.status_checks_hide_all")}</button>
		</div>
		</>) : null}
	</div>

	{((props.statusCheckData && props.statusCheckData?.requireApprovalRunCount)) ? (<>
		<div className="ui attached segment flex-left-right" id="approve-status-checks">
			<div>
				<strong>
					{i18n("repo.pulls.status_checks_need_approvals")}
				</strong>
				<p>{i18n("repo.pulls.status_checks_need_approvals_helper")}</p>
			</div>
			{(props.statusCheckData?.canApprove) ? (<>
				<button className="ui basic button link-action" data-url={String("" ?? "")}>
					{i18n("repo.pulls.status_checks_approve_all")}
				</button>
			</>) : null}
		</div>
	</>) : null}

	<div className="commit-status-list">
		{((props.commitStatuses) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="commit-status-item">
				{/* template: repo/commit_status */}
				<div className="status-context gt-ellipsis">{item.context as any} <span className="tw-text-text-light-2">{item.description as any}</span></div>
				<div className="ui status-details">
					{((props.statusCheckData && item.statusCheckData?.isContextRequired)) ? (<>
						{(item.statusCheckData?.isContextRequired?.(item.context)) ? (<><div className="ui label">{i18n("repo.pulls.status_checks_requested")}</div></>) : null}
					</>) : null}
					<span>{(item.targetURL) ? (<><a href={String(props.targetURL ?? "")}>{i18n("repo.pulls.status_checks_details")}</a></>) : null}</span>
				</div>
			</div>
		</React.Fragment>))}
		{(props.statusCheckData) ? (<>
			{(($statusCheckData.MissingRequiredChecks) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="commit-status-item">
					<span className="svg-icon" aria-label="octicon-dot-fill"></span>
					<div className="status-context gt-ellipsis">{item as any}</div>
					<div className="ui label">{i18n("repo.pulls.status_checks_requested")}</div>
				</div>
			</React.Fragment>))}
		</>) : null}
	</div>
</div>
</>) : null}

  </>)
}
