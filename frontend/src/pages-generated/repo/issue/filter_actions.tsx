import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function FilterActions(props: Record<string, unknown>) {
  return (<>
<div className="ui secondary filter menu">
	{(!(props.repository?.isArchived)) ? (<>
		{/* Action Button */}
		{((props.isShowClosed?.has && props.isShowClosed?.value)) ? (<>
			<button className="ui primary basic button issue-action" data-data-action="open" data-url={`${String(props.repoLink ?? "")}/issues/status`}>{i18n("repo.issues.action_open")}</button>
		</>) : null} {((props.isShowClosed?.has && !(props.isShowClosed?.value))) ? (<>
			<button className="ui red basic button issue-action" data-data-action="close" data-url={`${String(props.repoLink ?? "")}/issues/status`}>{i18n("repo.issues.action_close")}</button>
		</>) : null}
		{(props.isRepoAdmin) ? (<>
			<button className="ui red button issue-action"
				data-data-action="delete" data-url={`${String(props.repoLink ?? "")}/issues/delete`}
				data-action-delete-confirm={String(i18n("confirm_delete_selected") ?? "")}
			>{i18n("repo.issues.delete")}</button>
		</>) : null}
	{/* Labels */}
		<div className={`ui ${(!(props.labels)) ? `disabled` : ""} dropdown jump item`}>
			<span className="text">
				{i18n("repo.issues.action_label")}
			</span>
			<span className="svg-icon" aria-label="octicon-triangle-down"></span>
			<div className="menu">
				<div className="item issue-action" data-data-action="clear" data-url={`${String(props.repoLink ?? "")}/issues/labels`}>
					{i18n("repo.issues.new.clear_labels")}
				</div>
				{/* $previousExclusiveScope */}
				{((props.labels) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					{/* $exclusiveScope */}
					{((previousExclusiveScope !== "_no_scope" && previousExclusiveScope !== exclusiveScope)) ? (<>
						<div className="divider"></div>
					</>) : null}
					{/* TODO: {{$previousExclusiveScope = $exclusiveScope}} */}
					<div className="item issue-action flex-left-right" data-data-action="toggle" data-element-id={String(props.iD ?? "")} data-url={`${String(props.repoLink ?? "")}/issues/labels`}>
						{("SliceUtils.Contains $.SelLabelIDs .ID") ? (<>{/* TODO: {{svg (Iif $exclusiveScope "octicon-dot-fill" "octicon-check")}} */}</>) : null} {/* TODO: {{ctx.RenderUtils.RenderLabel .}} */}
						{/* template: repo/issue/labels/label_archived */}
					</div>
				</React.Fragment>))}
			</div>
		</div>

		{/* Milestone */}
		<div className={`ui ${(!((props.openMilestones || props.closedMilestones))) ? `disabled` : ""} dropdown jump item`}>
			<span className="text">
				{i18n("repo.issues.action_milestone")}
			</span>
			<span className="svg-icon" aria-label="octicon-triangle-down"></span>
			<div className="menu">
				<div className="item issue-action" data-element-id="0" data-url={`${String(props.link ?? "")}/milestone`}>
				{i18n("repo.issues.action_milestone_no_select")}
				</div>
				{(props.openMilestones) ? (<>
					<div className="divider"></div>
					<div className="header">{i18n("repo.issues.filter_milestone_open")}</div>
					{((props.openMilestones) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<div className="item issue-action" data-element-id={String(props.iD ?? "")} data-url={`${String(props.repoLink ?? "")}/issues/milestone`}>
							{item.name as any}
						</div>
					</React.Fragment>))}
				</>) : null}
				{(props.closedMilestones) ? (<>
					<div className="divider"></div>
					<div className="header">{i18n("repo.issues.filter_milestone_closed")}</div>
					{((props.closedMilestones) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<div className="item issue-action" data-element-id={String(props.iD ?? "")} data-url={`${String(props.repoLink ?? "")}/issues/milestone`}>
							{item.name as any}
						</div>
					</React.Fragment>))}
				</>) : null}
			</div>
		</div>

		{/* Projects */}
		<div className={`ui${(!((props.openProjects || props.closedProjects))) ? ` disabled` : ""} dropdown jump item`}>
			<span className="text">
				{i18n("repo.projects")}
			</span>
			<span className="svg-icon" aria-label="octicon-triangle-down"></span>
			<div className="menu">
				<div className="item issue-action" data-element-id="0" data-url={`${String(props.link ?? "")}/projects`}>
				{i18n("repo.issues.new.clear_projects")}
				</div>
				{(props.openProjects) ? (<>
					<div className="divider"></div>
					<div className="header">
						{i18n("repo.issues.new.open_projects")}
					</div>
					{((props.openProjects) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<div className="item issue-action" data-element-id={String(props.iD ?? "")} data-url={`${String(props.repoLink ?? "")}/issues/projects`}>
							{/* TODO: {{svg .IconName 18 "tw-mr-2"}} */}{item.title as any}
						</div>
					</React.Fragment>))}
				</>) : null}
				{(props.closedProjects) ? (<>
					<div className="divider"></div>
					<div className="header">
						{i18n("repo.issues.new.closed_projects")}
					</div>
					{((props.closedProjects) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<div className="item issue-action" data-element-id={String(props.iD ?? "")} data-url={`${String(props.repoLink ?? "")}/issues/projects`}>
							{/* TODO: {{svg .IconName 18 "tw-mr-2"}} */}{item.title as any}
						</div>
					</React.Fragment>))}
				</>) : null}
			</div>
		</div>

		{/* Assignees */}
		<div className={`ui ${(!(props.assignees)) ? `disabled` : ""} dropdown jump item`}>
			<span className="text">
				{i18n("repo.issues.action_assignee")}
			</span>
			<span className="svg-icon" aria-label="octicon-triangle-down"></span>
			<div className="menu">
				<div className="item issue-action" data-data-action="clear" data-url={`${String(props.link ?? "")}/assignee`}>
					{i18n("repo.issues.new.clear_assignees")}
				</div>
				<div className="item issue-action" data-element-id="0" data-url={`${String(props.link ?? "")}/assignee`}>
					{i18n("repo.issues.action_assignee_no_select")}
				</div>
				{((props.assignees) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<div className="item issue-action" data-element-id={String(props.iD ?? "")} data-url={`${String(props.repoLink ?? "")}/issues/assignee`}>
						{/* TODO: {{ctx.AvatarUtils.Avatar . 20}} */} {item.getDisplayName as any}
					</div>
				</React.Fragment>))}
			</div>
		</div>
	</>) : null}
</div>

  </>)
}
