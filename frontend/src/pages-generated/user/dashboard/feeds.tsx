import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Feeds(props: Record<string, unknown>) {
  return (<>
<div id="activity-feed" className="flex-divided-list items-with-main" data-ref-issue-container>
	{((props.feeds) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<div className="item">
			<div className="item-leading">
				{/* TODO: {{ctx.AvatarUtils.AvatarByAction .}} */}
			</div>
			<div className="item-main tw-gap-2">
				<div>
					{(item.actUser?.iD > 0) ? (<>
						<a href={`/`} title={String(props.getActDisplayNameTitle ctx ?? "")}>{item.getActDisplayName ctx as any}</a>
					</>) : (<>
						{item.shortActUserName ctx as any}
					</>)}
					{(item.getOpType?.inActions "create_repo") ? (<>
						{i18n("action.create_repo")}
					</>) : null} {(item.getOpType?.inActions "rename_repo") ? (<>
						{i18n("action.rename_repo")}
					</>) : null} {(item.getOpType?.inActions "commit_repo") ? (<>
						{(item.content) ? (<>
							{i18n("action.commit_repo")}
						</>) : (<>
							{i18n("action.create_branch")}
						</>)}
					</>) : null} {(item.getOpType?.inActions "create_issue") ? (<>
						{/* $index */}
						{i18n("action.create_issue")}
					</>) : null} {(item.getOpType?.inActions "create_pull_request") ? (<>
						{/* $index */}
						{i18n("action.create_pull_request")}
					</>) : null} {(item.getOpType?.inActions "transfer_repo") ? (<>
						{i18n("action.transfer_repo")}
					</>) : null} {(item.getOpType?.inActions "push_tag") ? (<>
						{i18n("action.push_tag")}
					</>) : null} {(item.getOpType?.inActions "comment_issue") ? (<>
						{/* $index */}
						{i18n("action.comment_issue")}
					</>) : null} {(item.getOpType?.inActions "merge_pull_request") ? (<>
						{/* $index */}
						{i18n("action.merge_pull_request")}
					</>) : null} {(item.getOpType?.inActions "close_issue") ? (<>
						{/* $index */}
						{i18n("action.close_issue")}
					</>) : null} {(item.getOpType?.inActions "reopen_issue") ? (<>
						{/* $index */}
						{i18n("action.reopen_issue")}
					</>) : null} {(item.getOpType?.inActions "close_pull_request") ? (<>
						{/* $index */}
						{i18n("action.close_pull_request")}
					</>) : null} {(item.getOpType?.inActions "reopen_pull_request") ? (<>
						{/* $index */}
						{i18n("action.reopen_pull_request")}
					</>) : null} {(item.getOpType?.inActions "delete_tag") ? (<>
						{/* $index */}
						{i18n("action.delete_tag")}
					</>) : null} {(item.getOpType?.inActions "delete_branch") ? (<>
						{/* $index */}
						{i18n("action.delete_branch")}
					</>) : null} {(item.getOpType?.inActions "mirror_sync_push") ? (<>
						{i18n("action.mirror_sync_push")}
					</>) : null} {(item.getOpType?.inActions "mirror_sync_create") ? (<>
						{i18n("action.mirror_sync_create")}
					</>) : null} {(item.getOpType?.inActions "mirror_sync_delete") ? (<>
						{i18n("action.mirror_sync_delete")}
					</>) : null} {(item.getOpType?.inActions "approve_pull_request") ? (<>
						{/* $index */}
						{i18n("action.approve_pull_request")}
					</>) : null} {(item.getOpType?.inActions "reject_pull_request") ? (<>
						{/* $index */}
						{i18n("action.reject_pull_request")}
					</>) : null} {(item.getOpType?.inActions "comment_pull") ? (<>
						{/* $index */}
						{i18n("action.comment_pull")}
					</>) : null} {(item.getOpType?.inActions "publish_release") ? (<>
						{/* $linkText */}
						{i18n("action.publish_release")}
					</>) : null} {(item.getOpType?.inActions "pull_review_dismissed") ? (<>
						{/* $index */}
						{/* $reviewer */}
						{i18n("action.review_dismissed")}
					</>) : null} {(item.getOpType?.inActions "auto_merge_pull_request") ? (<>
						{/* $index */}
						{i18n("action.auto_merge_pull_request")}
					</>) : null}
					{/* TODO: {{DateUtils.TimeSince .GetCreate}} */}
				</div>
				{(item.getOpType?.inActions "commit_repo" "mirror_sync_push") ? (<>
					{/* $push */}
					{/* $repoLink */}
					{/* $repo */}
					<div className="tw-flex tw-flex-col tw-gap-1">
						{(($push.Commits) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							{/* $commitLink */}
							<div className="flex-text-block">
								<img loading="lazy" alt className="ui avatar" src={String("" ?? "")} title={String(props.authorName ?? "")} width="16" height="16" />
								<a className="ui sha label" href={String("" ?? "")}>{/* TODO: {{ShortSha .Sha1}} */}</a>
								<span className="tw-inline-block tw-truncate">
									{/* TODO: {{ctx.RenderUtils.RenderCommitMessage .Message $repo}} */}
								</span>
							</div>
						</React.Fragment>))}
					</div>
					{(("$push.Len" > 1 && "$push.CompareURL")) ? (<>
						<a href={`/`}>{i18n("action.compare_commits")} »</a>
					</>) : null}
				</>) : null} {(item.getOpType?.inActions "create_issue") ? (<>
					<span className="tw-inline-block tw-truncate issue title">{/* TODO: {{index .GetIssueInfos 1 | ctx.RenderUtils.RenderIssueSimpleTitle}} */}</span>
				</>) : null} {(item.getOpType?.inActions "create_pull_request") ? (<>
					<span className="tw-inline-block tw-truncate issue title">{/* TODO: {{index .GetIssueInfos 1 | ctx.RenderUtils.RenderIssueSimpleTitle}} */}</span>
				</>) : null} {(item.getOpType?.inActions "comment_issue" "approve_pull_request" "reject_pull_request" "comment_pull") ? (<>
					<a href={String(props.getCommentLink ctx ?? "")} className="tw-inline-block tw-truncate tw-self-start issue title">{/* TODO: {{(.GetIssueTitle ctx) | ctx.RenderUtils.RenderIssueSimpleTitle}} */}</a>
					{/* $comment */}
					{("$comment") ? (<>
						<div className="render-content markup truncated-markup">{/* TODO: {{ctx.RenderUtils.MarkdownToHtml $comment}} */}</div>
					</>) : null}
				</>) : null} {(item.getOpType?.inActions "merge_pull_request") ? (<>
					<div className="item-body tw-text-text">{/* TODO: {{index .GetIssueInfos 1 | ctx.RenderUtils.RenderIssueSimpleTitle}} */}</div>
				</>) : null} {(item.getOpType?.inActions "close_issue" "reopen_issue" "close_pull_request" "reopen_pull_request") ? (<>
					<span className="tw-inline-block tw-truncate issue title">{/* TODO: {{(.GetIssueTitle ctx) | ctx.RenderUtils.RenderIssueSimpleTitle}} */}</span>
				</>) : null} {(item.getOpType?.inActions "pull_review_dismissed") ? (<>
				<div className="item-body tw-text-text">{i18n("action.review_dismissed_reason")}</div>
				<div className="item-body tw-text-text">{/* TODO: {{index .GetIssueInfos 2 | ctx.RenderUtils.RenderEmoji}} */}</div>
				</>) : null}
			</div>
			<div className="item-trailing">
				{/* TODO: {{svg (printf "octicon-%s" (ActionIcon .GetOpType)) 32 "tw-text-text-light tw-mr-1"}} */}
			</div>
		</div>
	</React.Fragment>))}
	{/* template: base/paginate */}
</div>

  </>)
}
