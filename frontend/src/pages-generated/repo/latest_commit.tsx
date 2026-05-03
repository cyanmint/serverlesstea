// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function LatestCommit(props: Record<string, unknown>) {
  return (<>
<div className="latest-commit">
{(!(props.latestCommit)) ? (<>
	…
</>) : (<>
	<span className="author-wrapper">
	{(props.latestCommitUser) ? (<>
		{/* TODO: {{ctx.AvatarUtils.Avatar .LatestCommitUser 20 "tw-mr-2"}} */}
		<strong>{props.latestCommitUser?.getShortDisplayNameLinkHTML as any}</strong>
	</>) : null} {(props.latestCommit?.author) ? (<>
		{/* TODO: {{ctx.AvatarUtils.AvatarByEmail .LatestCommit.Author.Email .LatestCommit.Author.Name 20 "tw-mr-2"}} */}
		<strong>{props.latestCommit?.author?.name as any}</strong>
	</>) : null}
	</span>

	{/* template: repo/commit_sign_badge */}

	{/* template: repo/commit_statuses */}

	{/* $commitLink */}
	<span className="grey commit-summary" title={String(props.latestCommit?.summary ?? "")}><span className="message-wrapper">{/* TODO: {{ctx.RenderUtils.RenderCommitMessageLinkSubject .LatestCommit.Message $commitLink $.Repository}} */}</span>
		{("IsMultilineCommitMessage .LatestCommit.Message") ? (<>
			<button className="ui button ellipsis-button" aria-expanded="false" data-global-click="onRepoEllipsisButtonClick">...</button>
			<pre className="commit-body tw-hidden">{/* TODO: {{ctx.RenderUtils.RenderCommitBody .LatestCommit.Message $.Repository}} */}</pre>
		</>) : null}
	</span>
</>)}
</div>

  </>)
}
