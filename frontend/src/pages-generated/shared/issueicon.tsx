import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Issueicon(props: Record<string, unknown>) {
  return (<>
{/* the logic should be kept the same as getIssueIcon/getIssueColorClass in JS code */}
{(props.isPull) ? (<>
	{(!(props.pullRequest)) ? (<>
		No PullRequest
	</>) : (<>
		{(props.isClosed) ? (<>
			{(props.pullRequest?.hasMerged) ? (<>
				<span className="svg-icon" aria-label="octicon-git-merge"></span>
			</>) : (<>
				<span className="svg-icon" aria-label="octicon-git-pull-request-closed"></span>
			</>)}
		</>) : (<>
			{(props.pullRequest?.isWorkInProgress?.(ctx)) ? (<>
				<span className="svg-icon" aria-label="octicon-git-pull-request-draft"></span>
			</>) : (<>
				<span className="svg-icon" aria-label="octicon-git-pull-request"></span>
			</>)}
		</>)}
	</>)}
</>) : (<>
	{(props.isClosed) ? (<>
		<span className="svg-icon" aria-label="octicon-issue-closed"></span>
	</>) : (<>
		<span className="svg-icon" aria-label="octicon-issue-opened"></span>
	</>)}
</>)}

  </>)
}
