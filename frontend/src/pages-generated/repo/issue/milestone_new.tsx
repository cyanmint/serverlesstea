import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function MilestoneNew(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository new milestone">
	{/* template: repo/header */}
	<div className="ui container">
		<div className="issue-navbar">
			{/* template: repo/issue/navbar */}
			{(((props.canWriteIssues || props.canWritePulls) && props.pageIsEditMilestone)) ? (<>
				<div className="ui right">
					<a className="ui primary button" href={`${String(props.repoLink ?? "")}/milestones/new`}>{i18n("repo.milestones.new")}</a>
				</div>
			</>) : null}
		</div>
		<div className="divider"></div>
		<h2 className="ui dividing header">
			{(props.pageIsEditMilestone) ? (<>
				{i18n("repo.milestones.edit")}
				<div className="sub header">{i18n("repo.milestones.edit_subheader")}</div>
			</>) : (<>
				{i18n("repo.milestones.new")}
				<div className="sub header">{i18n("repo.milestones.new_subheader")}</div>
			</>)}
		</h2>
		{/* alert */}
		<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div className={`field ${(props.err_Title) ? `error` : ""}`}>
					<label>{i18n("repo.milestones.title")}</label>
					<input name="title" placeholder={String(i18n("repo.milestones.title") ?? "")} value={String(props.title ?? "")} autofocus required maxlength="50" />
				</div>
				<div className={`field ${(props.err_Deadline) ? `error` : ""}`}>
					<label>
						{i18n("repo.milestones.due_date")}
						<a id="milestone-clear-deadline">{i18n("repo.milestones.clear")}</a>
					</label>
					<input type="date" name="deadline" className="tw-w-auto" value={String(props.deadline ?? "")} placeholder={String(i18n("repo.issues.due_date_form") ?? "")} />
				</div>
				<div className="field">
					<label>{i18n("repo.milestones.desc")}</label>
					{/* template: shared/combomarkdowneditor */}
				</div>
				<div className="flex-text-block tw-justify-end">
					{(props.pageIsEditMilestone) ? (<>
						<a className="ui primary basic button" href={`${String(props.repoLink ?? "")}/milestones`}>
							{i18n("repo.milestones.cancel")}
						</a>
						<button className="ui primary button">
							{i18n("repo.milestones.modify")}
						</button>
					</>) : (<>
						<button className="ui primary button">
							{i18n("repo.milestones.create")}
						</button>
					</>)}
			</div>
		</form>
	</div>
</div>


  </>)
}
