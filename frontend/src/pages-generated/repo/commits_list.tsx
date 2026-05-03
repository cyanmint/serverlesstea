// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function CommitsList(props: Record<string, unknown>) {
  return (<>
<div className="ui attached table segment commit-table">
	<table className="ui very basic table unstackable" id="commits-table">
		<thead>
			<tr>
				<th className="three wide">{i18n("repo.commits.author")}</th>
				<th className="two wide sha">{/* TODO: {{StringUtils.ToUpper $.Repository.ObjectFormatName}} */}</th>
				<th className="eight wide message">{i18n("repo.commits.message")}</th>
				<th className="two wide tw-text-right">{i18n("repo.commits.date")}</th>
				<th className="one wide"></th>
			</tr>
		</thead>
		<tbody className="commit-list">
			{/* $commitRepoLink */}{(props.commitRepoLink) ? (<>{/* TODO: {{$commitRepoLink = $.CommitRepoLink}} */}</>) : null}
			{((props.commits) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<tr>
					<td className="author">
						<span className="author-wrapper">
							{(item.user) ? (<>
								{/* TODO: {{ctx.AvatarUtils.Avatar .User 20 "tw-mr-2"}} */}
								{item.user?.getShortDisplayNameLinkHTML as any}
							</>) : (<>
								{/* TODO: {{ctx.AvatarUtils.AvatarByEmail .Author.Email .Author.Name 20 "tw-mr-2"}} */}
								{item.author?.name as any}
							</>)}
						</span>
					</td>
					<td className="sha">
						{/* $commitBaseLink */}
						{(props.pageIsWiki) ? (<>
							{/* TODO: {{$commitBaseLink = printf "%s/wiki/commit" $commitRepoLink}} */}
						</>) : null} {(props.pageIsPullCommits) ? (<>
							{/* TODO: {{$commitBaseLink = printf "%s/pulls/%d/commits" $commitRepoLink $.Issue.Index}} */}
						</>) : (<>
							{/* TODO: {{$commitBaseLink = printf "%s/commit" $commitRepoLink}} */}
						</>)}
						{/* template: repo/commit_sign_badge */}
					</td>
					<td className="message">
						<span className="message-wrapper">
						{(props.pageIsWiki) ? (<>
							<span className={`commit-summary ${(props.parentCount > 1) ? ` grey text` : ""}`} title={String(props.summary ?? "")}>{item.summary?.("|", "ctx.RenderUtils.RenderEmoji") as any}</span>
						</>) : (<>
							{/* $commitLink */}
							<span className={`commit-summary ${(props.parentCount > 1) ? ` grey text` : ""}`} title={String(props.summary ?? "")}>{/* TODO: {{ctx.RenderUtils.RenderCommitMessageLinkSubject .Message $commitLink $.Repository}} */}</span>
						</>)}
						</span>
						{((true /* TODO: IsMultilineCommitMessage .Message */)) ? (<>
						<button className="ui button ellipsis-button" aria-expanded="false" data-global-click="onRepoEllipsisButtonClick">...</button>
						</>) : null}
						{/* template: repo/commit_statuses */}
						{((true /* TODO: IsMultilineCommitMessage .Message */)) ? (<>
						<pre className="commit-body tw-hidden">{/* TODO: {{ctx.RenderUtils.RenderCommitBody .Message $.Repository}} */}</pre>
						</>) : null}
						{(props.commitsTagsMap) ? (<>
							{((props.commitsTagsMap?.[item.iD?.string]) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								{/* template: repo/tag/name */}
							</React.Fragment>))}
						</>) : null}
					</td>
					{(item.committer) ? (<>
						<td className="tw-text-right">{/* TODO: {{DateUtils.TimeSince .Committer.When}} */}</td>
					</>) : (<>
						<td className="tw-text-right">{/* TODO: {{DateUtils.TimeSince .Author.When}} */}</td>
					</>)}
					<td className="tw-text-right tw-py-0">
						<button className="btn interact-bg tw-p-2 copy-commit-id" data-tooltip-content={String(i18n("copy_hash") ?? "")} data-clipboard-text={String(props.iD ?? "")}><span className="svg-icon" aria-label="octicon-copy"></span></button>
						{/* at the moment, wiki doesn't support these "view" links like "view at history point" */}
						{(!(props.pageIsWiki)) ? (<>
							{/* view single file diff */}
							{(props.fileTreePath) ? (<>
							<a className="btn interact-bg tw-p-2 view-single-diff" data-tooltip-content={String(i18n("repo.commits.view_file_diff") ?? "")}
								href={`/commit/${String(props.iD?.string ?? "")}?files=${String(props.fileTreePath ?? "")}`}
							><span className="svg-icon" aria-label="octicon-file-diff"></span></a>
							</>) : null}

							{/* view at history point */}
							{/* $viewCommitLink */}
							{(props.fileTreePath) ? (<>{/* TODO: {{$viewCommitLink = printf "%s/%s" $viewCommitLink (PathEscapeSegments $.FileTreePath)}} */}</>) : null}
							<a className="btn interact-bg tw-p-2 view-commit-path" data-tooltip-content={String(i18n("repo.commits.view_path") ?? "")} href={String("" ?? "")}><span className="svg-icon" aria-label="octicon-file-code"></span></a>
						</>) : null}
					</td>
				</tr>
			</React.Fragment>))}
		</tbody>
	</table>
</div>

  </>)
}
