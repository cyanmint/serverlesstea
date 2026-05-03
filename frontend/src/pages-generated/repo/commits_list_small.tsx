import React from 'react'
import { i18n } from '../../lib/i18n'

export default function CommitsListSmall(props: Record<string, unknown>) {
  return (<>
{/* $index */}
<div className="timeline-item commits-list">
{((props.comment?.commits) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	{/* $tag */}
	{/* TODO: {{$index = Eval $index "+" 1}} */}
	<div className="flex-text-block" id={String("" ?? "")}>{/* singular-commit */}
		<span className="badge badge-commit"><span className="svg-icon" aria-label="octicon-git-commit"></span></span>
		{(item.user) ? (<>
			<a className="avatar" href={String(props.user?.homeLink ?? "")}>{/* TODO: {{ctx.AvatarUtils.Avatar .User 20}} */}</a>
		</>) : (<>
			{/* TODO: {{ctx.AvatarUtils.AvatarByEmail .Author.Email .Author.Name 20}} */}
		</>)}

		{/* $commitBaseLink */}
		{/* $commitLink */}

		<span className="tw-flex-1 tw-font-mono gt-ellipsis" title={String(props.summary ?? "")}>
			{/* TODO: {{ctx.RenderUtils.RenderCommitMessageLinkSubject .Message $commitLink $.comment.Issue.PullRequest.BaseRepo}} */}
		</span>

		{("IsMultilineCommitMessage .Message") ? (<>
			<button className="ui button ellipsis-button show-panel toggle" data-panel={`[data-singular-commit-body-htmlFor='']`}>...</button>
		</>) : null}

		<span className="flex-text-block">
			{/* template: repo/commit_statuses */}
			{/* template: repo/commit_sign_badge */}
		</span>
	</div>
	{("IsMultilineCommitMessage .Message") ? (<>
	<pre className="commit-body tw-ml-[33px] tw-hidden" data-singular-commit-body-htmlFor={String("" ?? "")}>
		{/* TODO: {{ctx.RenderUtils.RenderCommitBody .Message $.comment.Issue.PullRequest.BaseRepo}} */}
	</pre>
	</>) : null}
</React.Fragment>))}
</div>

  </>)
}
