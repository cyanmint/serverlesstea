// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function SubMenu(props: Record<string, unknown>) {
  return (<>
{((!(props.hideRepoInfo) && !(props.isBlame))) ? (<>
<div className="ui segments repository-summary tw-my-0">
	<div className="ui segment sub-menu repository-menu">
		{((props.permission?.canRead?.("ctx.Consts.RepoUnitTypeCode") && !(props.isEmptyRepo))) ? (<>
			<a className={`item muted ${(props.pageIsCommits) ? `active` : ""}`} href={`${String(props.repoLink ?? "")}/commits/${String(props.refFullName?.refWebLinkPath ?? "")}`}>
				<span className="svg-icon" aria-label="octicon-history"></span> <b>{/* TODO: {{ctx.Locale.PrettyNumber .CommitsCount}} */}</b> {/* TODO: {{ctx.Locale.TrN .CommitsCount "repo.commit" "repo.commits"}} */}
			</a>
			<a className={`item muted ${(props.pageIsBranches) ? `active` : ""}`} href={`${String(props.repoLink ?? "")}/branches`}>
				<span className="svg-icon" aria-label="octicon-git-branch"></span> <b>{/* TODO: {{ctx.Locale.PrettyNumber .BranchesCount}} */}</b> {/* TODO: {{ctx.Locale.TrN .BranchesCount "repo.branch" "repo.branches"}} */}
			</a>
			{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeCode")) ? (<>
				<a className={`item muted ${(props.pageIsTagList) ? `active` : ""}`} href={`${String(props.repoLink ?? "")}/tags`}>
					<span className="svg-icon" aria-label="octicon-tag"></span> <b>{/* TODO: {{ctx.Locale.PrettyNumber .NumTags}} */}</b> {/* TODO: {{ctx.Locale.TrN .NumTags "repo.tag" "repo.tags"}} */}
				</a>
			</>) : null}
		</>) : null}
	</div>
</div>
</>) : null}

  </>)
}
