import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function FilterItemMilestone(props: Record<string, unknown>) {
  return (<>
{/* Milestone filter dropdown partial
* QueryLink: the base query link for building filter URLs
* MilestoneID: the currently selected milestone ID (0=all, -1=none, >0=specific)
* OpenMilestones: list of open milestones
* ClosedMilestones: list of closed milestones */}
{/* $queryLink */}
<div className={`item ui dropdown jump ${(!((props.openMilestones || props.closedMilestones))) ? `disabled` : ""}`}>
	<span className="text">
		{i18n("repo.issues.filter_milestone")}
	</span>
	<span className="svg-icon" aria-label="octicon-triangle-down"></span>
	<div className="menu">
		<div className="ui icon search input">
			<i className="icon"><span className="svg-icon" aria-label="octicon-search"></span></i>
			<input type="text" placeholder={String(i18n("repo.issues.filter_milestone") ?? "")} />
		</div>
		<div className="divider"></div>
		<a className={`${(!(props.milestoneID)) ? `active selected ` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_milestone_all")}</a>
		<a className={`${(props.milestoneID) ? `${(props.milestoneID === "-1") ? `active selected ` : ""}` : ""}item`} href={String("" ?? "")}>{i18n("repo.issues.filter_milestone_none")}</a>
		{(props.openMilestones) ? (<>
			<div className="divider"></div>
			<div className="header">{i18n("repo.issues.filter_milestone_open")}</div>
			{((props.openMilestones) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<a className={`${(props.milestoneID) ? `${(props.milestoneID === props.iD) ? `active selected ` : ""}` : ""}item`} href={String("" ?? "")}>
				<span className="svg-icon" aria-label="octicon-milestone"></span>
				{item.name as any}
			</a>
			</React.Fragment>))}
		</>) : null}
		{(props.closedMilestones) ? (<>
			<div className="divider"></div>
			<div className="header">{i18n("repo.issues.filter_milestone_closed")}</div>
			{((props.closedMilestones) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<a className={`${(props.milestoneID) ? `${(props.milestoneID === props.iD) ? `active selected ` : ""}` : ""}item`} href={String("" ?? "")}>
				<span className="svg-icon" aria-label="octicon-milestone"></span>
				{item.name as any}
			</a>
			</React.Fragment>))}
		</>) : null}
	</div>
</div>

  </>)
}
