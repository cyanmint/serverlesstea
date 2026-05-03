// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function MilestoneList(props: Record<string, unknown>) {
  return (<>
{/* $pageMeta */}
{/* $data */}
{/* $issueMilestone */}{((props.pageMeta?.issue && props.pageMeta?.issue?.milestone)) ? (<>{/* TODO: {{$issueMilestone = $pageMeta.Issue.Milestone}} */}</>) : null}
<div className="divider"></div>
<div className="issue-sidebar-combo" data-selection-mode="single" data-update-algo="all"
		{...(props.pageMeta?.issue ? {"data-update-url": `/issues/milestone?issue_ids=`} : {})}
>
	<input className="combo-value" name="milestone_id" type="hidden" value={String("" ?? "")} />
	<div className={`ui dropdown full-width ${(!(props.pageMeta?.canModifyIssueOrPull)) ? `disabled` : ""}`}>
		<a className="fixed-text muted">
			<strong>{i18n("repo.issues.new.milestone")}</strong> {(props.pageMeta?.canModifyIssueOrPull) ? (<><span className="svg-icon" aria-label="octicon-gear"></span></>) : null}
		</a>
		<div className="menu">
			{((!(props.data?.openMilestones) && !(props.data?.closedMilestones))) ? (<>
				<div className="item disabled">{i18n("repo.issues.new.no_items")}</div>
			</>) : (<>
				<div className="ui icon search input">
					<i className="icon"><span className="svg-icon" aria-label="octicon-search"></span></i>
					<input type="text" placeholder={String(i18n("repo.issues.filter_milestones") ?? "")} />
				</div>
				<div className="scrolling menu flex-items-menu">
					<div className="item clear-selection" data-text="">{i18n("repo.issues.new.clear_milestone")}</div>
					<div className="divider"></div>
					{(props.data?.openMilestones) ? (<>
						<div className="header">{i18n("repo.issues.filter_milestone_open")}</div>
						{(($data.OpenMilestones) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<a className="item muted" data-value={String(props.iD ?? "")} href={`/milestone/${String(props.iD ?? "")}`}>
								<span className="svg-icon" aria-label="octicon-milestone"></span><span className="tw-flex-1 tw-break-anywhere">{item.name as any}</span>
							</a>
						</React.Fragment>))}
					</>) : null}
					{((props.data?.openMilestones && props.data?.closedMilestones)) ? (<><div className="divider"></div></>) : null}
					{(props.data?.closedMilestones) ? (<>
						<div className="header">{i18n("repo.issues.filter_milestone_closed")}</div>
						{(($data.ClosedMilestones) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<a className="item muted" data-value={String(props.iD ?? "")} href={`/milestone/${String(props.iD ?? "")}`}>
								<span className="svg-icon" aria-label="octicon-milestone"></span><span className="tw-flex-1 tw-break-anywhere">{item.name as any}</span>
							</a>
						</React.Fragment>))}
					</>) : null}
				</div>
			</>)}
		</div>
	</div>

	<div className="ui list muted-links flex-items-block">
		<span className={`item empty-list ${(props.issueMilestone) ? `tw-hidden` : ""}`}>{i18n("repo.issues.new.no_milestone")}</span>
		{(props.issueMilestone) ? (<>
			<a className="item" href={`/milestone/`}>
				<span className="svg-icon" aria-label="octicon-milestone"></span><span className="tw-flex-1 tw-break-anywhere">{/* TODO: {{$issueMilestone.Name}} */}</span>
			</a>
		</>) : null}
	</div>
</div>

  </>)
}
