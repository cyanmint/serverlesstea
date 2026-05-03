import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function AssigneeList(props: Record<string, unknown>) {
  return (<>
{/* $pageMeta */}
{/* $data */}
{/* $listBaseLink */}
{/* TODO: it seems that the code keeps checking $pageMeta.Issue and assumes that it might not exist, need to figure out why */}
{/* $issueAssignees */}{("$pageMeta.Issue") ? (<>{/* TODO: {{$issueAssignees = $pageMeta.Issue.Assignees}} */}</>) : null}
<div className="divider"></div>
<div className="issue-sidebar-combo" data-selection-mode="multiple" data-update-algo="diff"
		{("$pageMeta.Issue") ? (<>data-update-url={`/issues/assignee?issue_ids=`}</>) : null}
>
	<input className="combo-value" name="assignee_ids" type="hidden" value={String("" ?? "")} />
	<div className={`ui dropdown full-width ${(!("$pageMeta.CanModifyIssueOrPull")) ? `disabled` : ""}`}>
		<a className="fixed-text muted">
			<strong>{i18n("repo.issues.new.assignees")}</strong> {("$pageMeta.CanModifyIssueOrPull") ? (<><span className="svg-icon" aria-label="octicon-gear"></span></>) : null}
		</a>
		<div className="menu">
			<div className="ui icon search input">
				<i className="icon"><span className="svg-icon" aria-label="octicon-search"></span></i>
				<input type="text" placeholder={String(i18n("repo.issues.filter_assignees") ?? "")} />
			</div>
			<div className="scrolling menu flex-items-block">
				<div className="item clear-selection" data-text="">{i18n("repo.issues.new.clear_assignees")}</div>
				<div className="divider"></div>
				{(($data.CandidateAssignees) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<a className="item" href={`?assignee=${String(props.iD ?? "")}`} data-value={String(props.iD ?? "")}>
						<span className="item-check-mark"><span className="svg-icon" aria-label="octicon-check"></span></span>
						{/* TODO: {{ctx.AvatarUtils.Avatar . 20}} */} {/* template: repo/search_name */}
					</a>
				</React.Fragment>))}
			</div>
		</div>
	</div>
	<div className="ui relaxed list muted-links flex-items-block">
		<span className={`item empty-list ${("$issueAssignees") ? `tw-hidden` : ""}`}>{i18n("repo.issues.new.no_assignees")}</span>
		{(((undefined /* $issueAssignees */)) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<a className="item" href={`?assignee=${String(props.iD ?? "")}`}>
				{/* TODO: {{ctx.AvatarUtils.Avatar . 20}} */} {item.getDisplayName as any}
			</a>
		</React.Fragment>))}
	</div>
</div>

  </>)
}
