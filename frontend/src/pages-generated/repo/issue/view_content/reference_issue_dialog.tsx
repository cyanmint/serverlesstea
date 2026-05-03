// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function ReferenceIssueDialog(props: Record<string, unknown>) {
  return (<>
<div className="ui small modal" id="reference-issue-modal">
	<div className="header">
		{i18n("repo.issues.context.reference_issue")}
	</div>
	<div className="content">
		<form className="ui form form-fetch-action" action={`${String(props.repository?.link ?? "")}/issues/new`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<div className="field">
				<label><strong>{i18n("repository")}</strong></label>
				<div className="ui search selection dropdown issue_reference_repository_search ellipsis-text-items">
					<div className="default text gt-ellipsis">{props.repository?.fullName as any}</div>
					<div className="menu"></div>
				</div>
			</div>
			<div className="field">
				<label><strong>{i18n("repo.milestones.title")}</strong></label>
				<input name="title" value="" autofocus required maxlength="255" autocomplete="off" />
			</div>
			<div className="field">
				<label><strong>{i18n("repo.issues.reference_issue.body")}</strong></label>
				<textarea name="content"></textarea>
			</div>
			<div className="flex-text-block tw-justify-end">
				<button className="ui primary button">{i18n("repo.issues.create")}</button>
			</div>
		</form>
	</div>
</div>

  </>)
}
