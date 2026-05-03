import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Issueicon(props: Record<string, unknown>) {
  return (<>
{/* the logic should be kept the same as getIssueIcon/getIssueColorClass in JS code */}
{/* TODO: {{- if .IsPull -}} */}
	{/* TODO: {{- if not .PullRequest -}} */}
		No PullRequest
	{/* TODO: {{- else -}} */}
		{/* TODO: {{- if .IsClosed -}} */}
			{/* TODO: {{- if .PullRequest.HasMerged -}} */}
				{/* TODO: {{- svg "octicon-git-merge" 16 "tw-text-purple" -}} */}
			{/* TODO: {{- else -}} */}
				{/* TODO: {{- svg "octicon-git-pull-request-closed" 16 "tw-text-red" -}} */}
			{/* TODO: {{- end -}} */}
		{/* TODO: {{- else -}} */}
			{/* TODO: {{- if .PullRequest.IsWorkInProgress ctx -}} */}
				{/* TODO: {{- svg "octicon-git-pull-request-draft" 16 "tw-text-text-light" -}} */}
			{/* TODO: {{- else -}} */}
				{/* TODO: {{- svg "octicon-git-pull-request" 16 "tw-text-green" -}} */}
			{/* TODO: {{- end -}} */}
		{/* TODO: {{- end -}} */}
	{/* TODO: {{- end -}} */}
{/* TODO: {{- else -}} */}
	{/* TODO: {{- if .IsClosed -}} */}
		{/* TODO: {{- svg "octicon-issue-closed" 16 "tw-text-red" -}} */}
	{/* TODO: {{- else -}} */}
		{/* TODO: {{- svg "octicon-issue-opened" 16 "tw-text-green" -}} */}
	{/* TODO: {{- end -}} */}
{/* TODO: {{- end -}} */}

  </>)
}
