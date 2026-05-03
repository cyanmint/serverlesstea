// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Worktime(props: Record<string, unknown>) {
  return (<>

<div className="page-content organization times">
	{/* template: org/header */}
	<div className="ui container">
		<div className="ui grid">
			<div className="three wide column">
				<form className="ui form" method="get">
					<input type="hidden" name="by" value={String(props.worktimeBy ?? "")} />
					<div className="field">
						<label>{i18n("org.worktime.date_range_start")}</label>
						<input type="date" name="from" value={String(props.rangeFrom ?? "")} />
					</div>
					<div className="field">
						<label>{i18n("org.worktime.date_range_end")}</label>
						<input type="date" name="to" value={String(props.rangeTo ?? "")} />
					</div>
					<button className="ui primary button">{i18n("org.worktime.query")}</button>
				</form>
			</div>
			<div className="thirteen wide column">
				<div className="ui column">
					<div className="ui compact small menu">
						{/* $queryParams */}
						<a className={` item`} href={`${String(props.org?.organisationLink ?? "")}/worktime?by=repos&`}><span className="svg-icon" aria-label="octicon-repo"></span> {i18n("org.worktime.by_repositories")}</a>
						<a className={` item`} href={`${String(props.org?.organisationLink ?? "")}/worktime?by=milestones&`}><span className="svg-icon" aria-label="octicon-milestone"></span> {i18n("org.worktime.by_milestones")}</a>
						<a className={` item`} href={`${String(props.org?.organisationLink ?? "")}/worktime?by=members&`}><span className="svg-icon" aria-label="octicon-people"></span> {i18n("org.worktime.by_members")}</a>
					</div>
				</div>
				{(props.worktimeByRepos) ? (<>
					{/* template: org/worktime/table_repos */}
				</>) : null} {(props.worktimeByMilestones) ? (<>
					{/* template: org/worktime/table_milestones */}
				</>) : null} {(props.worktimeByMembers) ? (<>
					{/* template: org/worktime/table_members */}
				</>) : null}
			</div>
		</div>
	</div>
</div>


  </>)
}
