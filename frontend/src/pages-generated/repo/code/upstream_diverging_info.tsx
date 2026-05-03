import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function UpstreamDivergingInfo(props: Record<string, unknown>) {
  return (<>
{((props.upstreamDivergingInfo && props.upstreamDivergingInfo?.baseBranchHasNewCommits)) ? (<>
<div className="ui message flex-text-block">
	<div className="tw-flex-1">
		{/* $upstreamLink */}
		{/* $upstreamRepoBranchDisplay */}
		{/* $thisRepoBranchDisplay */}
		{/* $upstreamHtml */}
		{(props.upstreamDivergingInfo?.headBranchCommitsBehind) ? (<>
			{/* TODO: {{ctx.Locale.TrN .UpstreamDivergingInfo.HeadBranchCommitsBehind "repo.pulls.upstream_diverging_prompt_behind_1" "repo.pulls.upstream_diverging_prompt_behind_n" .UpstreamDivergingInfo.HeadBranchCommitsBehind $upstreamHtml}} */}
		</>) : (<>
			{i18n("repo.pulls.upstream_diverging_prompt_base_newer")}
		</>)}
	</div>
	{(props.canWriteCode) ? (<>
	<button className="ui compact primary button tw-m-0 link-action"
					data-modal-confirm-header={String(i18n("repo.pulls.upstream_diverging_merge") ?? "")}
					data-modal-confirm-content={String(i18n("repo.pulls.upstream_diverging_merge_confirm") ?? "")}
					data-url={`${String(props.repository?.link ?? "")}/branches/merge-upstream?branch=${String(props.branchName ?? "")}`}>
		{i18n("repo.pulls.upstream_diverging_merge")}
	</button>
	</>) : null}
</div>
</>) : null}

  </>)
}
