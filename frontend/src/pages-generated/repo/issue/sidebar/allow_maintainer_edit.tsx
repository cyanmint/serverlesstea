import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function AllowMaintainerEdit(props: Record<string, unknown>) {
  return (<>
{/* TODO: {{- $isHeadForkedRepo := and .Issue.PullRequest .Issue.PullRequest.HeadRepo (ne .Issue.PullRequest.HeadRepo.FullName .Issue.PullRequest.BaseRepo.FullName) -}} */}
{("$isHeadForkedRepo") ? (<>
	{/* TODO: {{- $isPullPoster := and .Issue.IsPull .IsIssuePoster -}} */}
	{/* TODO: {{- $isPullEditable := and .Issue.PullRequest (not .Issue.IsClosed) (not .Repository.IsArchived) -}} */}
	{/* TODO: {{- $allowToChange := and $isPullPoster $isPullEditable -}} */}
	<div className="divider"></div>
	<div className={`ui checkbox ${(!("$allowToChange")) ? `disabled` : ""} loading-icon-2px`}
			{("$allowToChange") ? (<>
			id="allow-edits-from-maintainers"
			data-url={String(props.issue?.link ?? "")}
			data-tooltip-content={String(i18n("repo.pulls.allow_edits_from_maintainers_desc") ?? "")}
			data-prompt-error={String(i18n("repo.pulls.allow_edits_from_maintainers_err") ?? "")}
			</>) : null}
	>
		<label><strong>{i18n("repo.pulls.allow_edits_from_maintainers")}</strong></label>
		<input type="checkbox" {...(props.issue?.pullRequest?.allowMaintainerEdit ? {"checked": true} : {})} {(!("$allowToChange")) ? (< />disabled</>) : null}>
	</div>
</>) : null}

  </>)
}
