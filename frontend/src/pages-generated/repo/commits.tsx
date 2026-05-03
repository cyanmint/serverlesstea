import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Commits(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository commits">
	{/* template: repo/header */}
	<div className="ui container">
		{/* template: repo/sub_menu */}
		<div className="repo-button-row">
			<div className="repo-button-row-left">
				{/* TODO: {{- /* for /owner/repo/commits/{RefType}/{RefShortName} * / -}} */}
				{/* TODO: {{- template "repo/branch_dropdown" dict
					"Repository" .Repository
					"ShowTabBranches" true
					"ShowTabTags" true
					"CurrentRefType" .RefFullName.RefType
					"CurrentRefShortName" .RefFullName.ShortName
					"CurrentTreePath" .TreePath
					"RefLinkTemplate" "{RepoLink}/commits/{RefType}/{RefShortName}/{TreePath}"
					"AllowCreateNewRef" .CanCreateBranch
				-}} */}
				<a href={`${String(props.repoLink ?? "")}/graph`} className="ui basic small compact button">
					<span className="svg-icon" aria-label="octicon-git-branch"></span>
					{i18n("repo.commit_graph")}
				</a>
			</div>
		</div>
		{/* template: repo/commits_table */}
	</div>
</div>


  </>)
}
