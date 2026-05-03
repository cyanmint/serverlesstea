import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function UpdateBranchByMerge(props: Record<string, unknown>) {
  return (<>
{((props.issue?.pullRequest?.commitsBehind > 0 && !(props.issue?.isClosed) && !(props.issue?.pullRequest?.isChecking) && !(props.isPullFilesConflicted) && !(props.isPullRequestBroken))) ? (<>
	<div className="divider"></div>
	<div className="item item-section">
		<div className="item-section-left flex-text-inline">
			<span className="svg-icon" aria-label="octicon-alert"></span>
			{i18n("repo.pulls.outdated_with_base_branch")}
		</div>
		<div className="item-section-right">
			{((props.updateAllowed && props.updateByRebaseAllowed)) ? (<>
				<div className="tw-inline-block">
					<div id="update-pr-branch-with-base" className="ui buttons">
						<button className="ui button" data-do={`${String(props.issue?.link ?? "")}/update`}>
							<span className="button-text">
								{i18n("repo.pulls.update_branch")}
							</span>
						</button>
						<div className="ui dropdown icon button">
							<span className="svg-icon" aria-label="octicon-triangle-down"></span>
							<div className="menu">
								<a className="item active selected" data-do={`${String(props.issue?.link ?? "")}/update`}>{i18n("repo.pulls.update_branch")}</a>
								<a className="item" data-do={`${String(props.issue?.link ?? "")}/update?style=rebase`}>{i18n("repo.pulls.update_branch_rebase")}</a>
							</div>
						</div>
					</div>
				</div>
			</>) : null}
			{((props.updateAllowed && !(props.updateByRebaseAllowed))) ? (<>
				<form action={`${String(props.issue?.link ?? "")}/update`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} className="ui update-branch-form">
					<button className="ui compact button">
						<span className="ui text">{i18n("repo.pulls.update_branch")}</span>
					</button>
				</form>
			</>) : null}
		</div>
	</div>
</>) : null}

  </>)
}
