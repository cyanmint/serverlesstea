import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function DueDate(props: Record<string, unknown>) {
  return (<>
<div className="divider"></div>
<span className="text"><strong>{i18n("repo.issues.due_date")}</strong></span>
<div className="ui form tw-mt-2">
	{(props.issue?.deadlineUnix) ? (<>
		<div className="flex-left-right">
			<div className={`due-date ${(props.issue?.isOverdue) ? `tw-text-red` : ""}`} {...(props.issue?.isOverdue ? {"data-tooltip-content": String(i18n("repo.issues.due_date_overdue") ?? "")} : {})}>
				<span className="svg-icon" aria-label="octicon-calendar"></span> {/* TODO: {{DateUtils.AbsoluteLong .Issue.DeadlineUnix}} */}
			</div>
			<div className="flex-text-block">
				{((props.hasIssuesOrPullsWritePermission && !(props.repository?.isArchived))) ? (<>
					<a className="issue-due-edit muted" data-tooltip-content={String(i18n("repo.issues.due_date_form_edit") ?? "")}><span className="svg-icon" aria-label="octicon-pencil"></span></a>
					<a className="issue-due-remove muted" data-tooltip-content={String(i18n("repo.issues.due_date_form_remove") ?? "")}><span className="svg-icon" aria-label="octicon-trash"></span></a>
				</>) : null}
			</div>
		</div>
	</>) : (<>
		{i18n("repo.issues.due_date_not_set")}
	</>)}

	{((props.hasIssuesOrPullsWritePermission && !(props.repository?.isArchived))) ? (<>
		<form className={`ui fluid action input issue-due-form form-fetch-action tw-mt-2 ${(props.issue?.deadlineUnix) ? `tw-hidden` : ""}`}
					method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`///issues/${String(props.issue?.index ?? "")}/deadline`}
		>
			<input required type="date" name="deadline" placeholder={String(i18n("repo.issues.due_date_form") ?? "")} {...(props.issue?.deadlineUnix ? {"value": String(props.issue?.deadlineUnix?.formatDate ?? "")} : {})} />
			<button className="ui icon button">{/* TODO: {{Iif .Issue.DeadlineUnix (svg "octicon-pencil") (svg "octicon-plus")}} */}</button>
		</form>
	</>) : null}
</div>

  </>)
}
