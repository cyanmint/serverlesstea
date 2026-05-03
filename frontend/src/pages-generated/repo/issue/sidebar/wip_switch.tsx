import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function WipSwitch(props: Record<string, unknown>) {
  return (<>
{(((props.hasIssuesOrPullsWritePermission || props.isIssuePoster) && !(props.hasMerged) && !(props.issue?.isClosed) && !(props.isPullWorkInProgress))) ? (<>
	<a data-global-init="initPullRequestWipToggle" data-title={String(props.issue?.title ?? "")} data-wip-prefix={String("" ?? "")} data-update-url={`${String(props.issue?.link ?? "")}/title`}>
		{i18n("repo.pulls.still_in_progress")} {i18n("repo.pulls.add_prefix")}
	</a>
</>) : null}

  </>)
}
