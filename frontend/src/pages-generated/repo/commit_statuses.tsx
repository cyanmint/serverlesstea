import React from 'react'
import { i18n } from '../../lib/i18n'

export default function CommitStatuses(props: Record<string, unknown>) {
  return (<>
{(props.statuses) ? (<>
	{(("len .Statuses" === 1 && props.status?.targetURL)) ? (<>
		<a className={`flex-text-inline tw-no-underline ${String(props.additionalClasses ?? "")}`} data-global-init="initCommitStatuses" href={String(props.status?.targetURL ?? "")}>
			{/* template: repo/commit_status */}
		</a>
	</>) : (<>
		<span className={`flex-text-inline ${String(props.additionalClasses ?? "")}`} data-global-init="initCommitStatuses" tabIndex="0">
			{/* template: repo/commit_status */}
		</span>
	</>)}
	<div className="tippy-target">
		{/* template: repo/pulls/status */}
	</div>
</>) : null}

  </>)
}
