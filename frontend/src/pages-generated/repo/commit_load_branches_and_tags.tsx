import React from 'react'
import { i18n } from '../../lib/i18n'

export default function CommitLoadBranchesAndTags(props: Record<string, unknown>) {
  return (<>
{(!(props.pageIsWiki)) ? (<>
<div className="branch-and-tag-area" data-text-default-branch-tooltip={String(i18n("repo.commit.contained_in_default_branch") ?? "")}>
	{(props.mergedPRIssueNumber) ? (<>
	{/* $prLink */}
	<div>
		<div className="divider"></div>
		<div>{i18n("repo.commit.merged_in_pr")}</div>
	</div>
	</>) : null}
	<button className="ui button ellipsis-button load-branches-and-tags tw-mt-2" aria-expanded="false"
		data-url={`${String(props.repoLink ?? "")}/commit/${String(props.commitID ?? "")}/load-branches-and-tags`}
		data-tooltip-content={String(i18n("repo.commit.load_referencing_branches_and_tags") ?? "")}
	>...</button>
	<div className="branch-and-tag-detail tw-hidden">
		<div className="divider"></div>
		<div>{i18n("repo.commit.contained_in")}</div>
		<div className="tw-flex tw-mt-2">
			<div className="tw-p-1"><span className="svg-icon" aria-label="octicon-git-branch"></span></div>
			<div className="branch-area flex-text-block tw-flex-wrap tw-flex-1"></div>
		</div>
		<div className="tw-flex tw-mt-2">
			<div className="tw-p-1"><span className="svg-icon" aria-label="octicon-tag"></span></div>
			<div className="tag-area flex-text-block tw-flex-wrap tw-flex-1"></div>
		</div>
	</div>
</div>
</>) : null}

  </>)
}
