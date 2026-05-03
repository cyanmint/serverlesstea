// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Comments(props: Record<string, unknown>) {
  return (<>
{/* alert */}
{((props.issue?.comments) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	{(props.shouldShowCommentType?.(item.type)) ? (<>
		{/* $createdStr */}

		{/* 0 = COMMENT, 1 = REOPEN, 2 = CLOSE, 3 = ISSUE_REF, 4 = COMMIT_REF,
		5 = COMMENT_REF, 6 = PULL_REF, 7 = COMMENT_LABEL, 8 = MILESTONE_CHANGE,
		9 = ASSIGNEES_CHANGE, 10 = TITLE_CHANGE, 11 = DELETE_BRANCH, 12 = START_TRACKING,
		13 = STOP_TRACKING, 14 = ADD_TIME_MANUAL, 16 = ADDED_DEADLINE, 17 = MODIFIED_DEADLINE,
		18 = REMOVED_DEADLINE, 19 = ADD_DEPENDENCY, 20 = REMOVE_DEPENDENCY, 21 = CODE,
		22 = REVIEW, 23 = ISSUE_LOCKED, 24 = ISSUE_UNLOCKED, 25 = TARGET_BRANCH_CHANGED,
		26 = DELETE_TIME_MANUAL, 27 = REVIEW_REQUEST, 28 = MERGE_PULL_REQUEST,
		29 = PULL_PUSH_EVENT, 30 = PROJECT_CHANGED, 31 = PROJECT_BOARD_CHANGED
		32 = DISMISSED_REVIEW, 33 = COMMENT_TYPE_CHANGE_ISSUE_REF, 34 = PR_SCHEDULE_TO_AUTO_MERGE,
		35 = CANCEL_SCHEDULED_AUTO_MERGE_PR, 36 = PIN_ISSUE, 37 = UNPIN_ISSUE,
		38 = COMMENT_TYPE_CHANGE_TIME_ESTIMATE */}
		{(item.type === 0) ? (<>
			<div className="timeline-item comment" id={String(props.hashTag ?? "")}>
			{(item.originalAuthor) ? (<>
				<span className="timeline-avatar">
					{/* TODO: {{ctx.AvatarUtils.Avatar nil 40}} */}
				</span>
			</>) : (<>
				<a className="timeline-avatar"{...(item.poster?.iD > 0 ? {"href": String(props.poster?.homeLink ?? "")} : {})}>
					{/* TODO: {{ctx.AvatarUtils.Avatar .Poster 40}} */}
				</a>
			</>)}
				<div className="content comment-container">
					<div className="comment-header avatar-content-left-arrow" role="heading" aria-level="3">
						<div className="comment-header-left">
							{(item.originalAuthor) ? (<>
								<span className="tw-text-text tw-font-semibold tw-mr-1">
									{/* TODO: {{svg (MigrationIcon $.Repository.GetOriginalURLHostname)}} */}
									{item.originalAuthor as any}
								</span>
								<span className="comment-text-line">
									{i18n("repo.issues.commented_at")} {(props.repository?.originalURL) ? (<>
								</span>
								<span className="text migrate">
									({i18n("repo.migrated_from")})</>) : null}
								</span>
							</>) : (<>
								{(item.poster?.iD > 0) ? (<>
									<a className="inline-timeline-avatar" href={String(props.poster?.homeLink ?? "")}>
										{/* TODO: {{ctx.AvatarUtils.Avatar .Poster 24}} */}
									</a>
								</>) : null}
								<span className="comment-text-line">
									{/* template: shared/user/authorlink */}
									{i18n("repo.issues.commented_at")}
								</span>
							</>)}
						</div>
						<div className="comment-header-right">
							{/* template: repo/issue/view_content/show_role */}
							{(!(props.repository?.isArchived)) ? (<>
								{/* template: repo/issue/view_content/add_reaction */}
							</>) : null}
							{/* template: repo/issue/view_content/context_menu */}
						</div>
					</div>
					<div className="ui attached segment comment-body" role="article">
						<div className="render-content markup" {...((props.permission?.isAdmin || props.hasIssuesOrPullsWritePermission || (props.isSigned && props.signedUserID === item.posterID)) ? {"data-can-edit": "true"} : {})}>
							{(item.renderedContent) ? (<>
								{item.renderedContent as any}
							</>) : (<>
								<span className="no-content">{i18n("repo.issues.no_content")}</span>
							</>)}
						</div>
						<div id={`${String(props.hashTag ?? "")}-raw`} className="raw-content tw-hidden">{item.content as any}</div>
						<div className="edit-content-zone tw-hidden" data-update-url={`${String(props.repoLink ?? "")}/comments/${String(props.iD ?? "")}`} data-content-version={String(props.contentVersion ?? "")} data-context={String(props.repoLink ?? "")} data-attachment-url={`${String(props.repoLink ?? "")}/comments/${String(props.iD ?? "")}/attachments`}></div>
						{(item.attachments) ? (<>
							{/* template: repo/issue/view_content/attachments */}
						</>) : null}
					</div>
					{/* $reactions */}
					{(props.reactions) ? (<>
						{/* template: repo/issue/view_content/reactions */}
					</>) : null}
				</div>
			</div>
		</>) : null} {(item.type === 1) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge tw-bg-green tw-text-white"><span className="svg-icon" aria-label="octicon-dot-fill"></span></span>
				{(!(item.originalAuthor)) ? (<>
					{/* template: shared/user/avatarlink */}
				</>) : null}
				<span className="comment-text-line">
					{/* template: repo/issue/view_content/comments_authorlink */}
					{(item.issue?.isPull) ? (<>
						{i18n("repo.pulls.reopened_at")}
					</>) : (<>
						{i18n("repo.issues.reopened_at")}
					</>)}
				</span>
			</div>
		</>) : null} {(item.type === 2) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge tw-bg-red tw-text-white"><span className="svg-icon" aria-label="octicon-issue-closed"></span></span>
				{(!(item.originalAuthor)) ? (<>
					{/* template: shared/user/avatarlink */}
				</>) : null}
				<span className="comment-text-line">
					{/* template: repo/issue/view_content/comments_authorlink */}
					{(item.issue?.isPull) ? (<>
						{i18n("repo.pulls.closed_at")}
					</>) : (<>
						{i18n("repo.issues.closed_at")}
					</>)}
				</span>
			</div>
		</>) : null} {(item.type === 28) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge tw-bg-purple tw-text-white"><span className="svg-icon" aria-label="octicon-git-merge"></span></span>
				{(!(item.originalAuthor)) ? (<>
					{/* template: shared/user/avatarlink */}
				</>) : null}
				<span className="comment-text-line">
					{/* template: repo/issue/view_content/comments_authorlink */}
					{/* $link */}
					{(props.issue?.pullRequest?.status === 3) ? (<>
						{i18n("repo.issues.comment_manually_pull_merged_at")}
					</>) : (<>
						{i18n("repo.issues.comment_pull_merged_at")}
					</>)}
				</span>
			</div>
		</>) : null} {(item.type === 3 5 6) ? (<>
			{/* $refFrom */}
			{(item.refRepoID !== item.issue?.repoID) ? (<>
				{/* TODO: {{$refFrom = ctx.Locale.Tr "repo.issues.ref_from" .RefRepo.FullName}} */}
			</>) : null}
			{/* $refTr */}
			{(item.issue?.isPull) ? (<>
				{/* TODO: {{$refTr = "repo.issues.ref_pull_from"}} */}
			</>) : null} {(item.refAction === 1) ? (<>
				{/* TODO: {{$refTr = "repo.issues.ref_closing_from"}} */}
			</>) : null} {(item.refAction === 2) ? (<>
				{/* TODO: {{$refTr = "repo.issues.ref_reopening_from"}} */}
			</>) : null}
			{/* $createdStr */}
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-bookmark"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{(item.refAction === 3) ? (<><del></>) : null}
					{/* template: shared/user/authorlink */}
					{/* TODO: {{ctx.Locale.Tr $refTr .EventTag $createdStr (.RefCommentLink ctx) $refFrom}} */}
					{(item.refAction === 3) ? (<></del></>) : null}
				</span>

				<div className="detail flex-text-block">
					<span className="comment-text-line"><a href={String(props.refIssueLink?.(ctx) ?? "")}><b>{item.refIssueTitle?.(ctx) as any}</b> {item.refIssueIdent?.(ctx) as any}</a></span>
				</div>
			</div>
		</>) : null} {(item.type === 4) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-bookmark"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{i18n("repo.issues.commit_ref_at")}
				</span>
				<div className="detail flex-text-block">
					<span className="svg-icon" aria-label="octicon-git-commit"></span>
					{/* the content is a link like <a href="{RepoLink}/commit/{CommitID}">message title</a> (from CreateRefComment) */}
					<span className="comment-text-line">{item.getSanitizedContentHTML as any}</span>
				</div>
			</div>
		</>) : null} {(item.type === 7) ? (<>
			{((item.addedLabels || item.removedLabels)) ? (<>
				<div className="timeline-item event with-labels-list-inline" id={String(props.hashTag ?? "")}>
					<span className="badge"><span className="svg-icon" aria-label="octicon-tag"></span></span>
					{/* template: shared/user/avatarlink */}
					<span className="comment-text-line">
						{/* template: shared/user/authorlink */}
						{((item.addedLabels && !(item.removedLabels))) ? (<>
							{/* TODO: {{ctx.Locale.TrN (len .AddedLabels) "repo.issues.add_label" "repo.issues.add_labels" (ctx.RenderUtils.RenderLabels .AddedLabels $.RepoLink .Issue) $createdStr}} */}
						</>) : null} {((!(item.addedLabels) && item.removedLabels)) ? (<>
							{/* TODO: {{ctx.Locale.TrN (len .RemovedLabels) "repo.issues.remove_label" "repo.issues.remove_labels" (ctx.RenderUtils.RenderLabels .RemovedLabels $.RepoLink .Issue) $createdStr}} */}
						</>) : (<>
							{i18n("repo.issues.add_remove_labels")}
						</>)}
					</span>
				</div>
			</>) : null}
		</>) : null} {(item.type === 8) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-milestone"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{(item.oldMilestoneID > 0) ? (<>{(item.milestoneID > 0) ? (<>{i18n("repo.issues.change_milestone_at")}</>) : (<>{i18n("repo.issues.remove_milestone_at")}</>)}</>) : null} {(item.milestoneID > 0) ? (<>{i18n("repo.issues.add_milestone_at")}</>) : null}
				</span>
			</div>
		</>) : null} {((item.type === 9 && item.assigneeID > 0)) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-person"></span></span>
				{(item.removedAssignee) ? (<>
					{/* template: shared/user/avatarlink */}
					<span className="comment-text-line">
						{/* template: shared/user/authorlink */}
						{(item.poster?.iD === item.assignee?.iD) ? (<>
							{i18n("repo.issues.remove_self_assignment")}
						</>) : (<>
							{i18n("repo.issues.remove_assignee_at")}
						</>)}
					</span>
				</>) : (<>
					{/* template: shared/user/avatarlink */}
					<span className="comment-text-line">
						{/* template: shared/user/authorlink */}
						{(item.poster?.iD === item.assigneeID) ? (<>
							{i18n("repo.issues.self_assign_at")}
						</>) : (<>
							{i18n("repo.issues.add_assignee_at")}
						</>)}
					</span>
				</>)}
			</div>
		</>) : null} {(item.type === 10) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge">{/* TODO: {{ctx.RenderUtils.RenderTimelineEventBadge $comment}} */}</span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{/* TODO: {{ctx.RenderUtils.RenderTimelineEventComment $comment $createdStr}} */}
				</span>
			</div>
		</>) : null} {(item.type === 11) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-git-branch"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{/* $oldRef */}
					{i18n("repo.issues.delete_branch_at")}
				</span>
			</div>
		</>) : null} {(item.type === 12) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-clock"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{i18n("repo.issues.start_tracking_history")}
				</span>
			</div>
		</>) : null} {(item.type === 13) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-clock"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{/* $timeStr */} {/* compatibility with time comments made before v1.21 */}
					{(!(props.timeStr)) ? (<>{/* TODO: {{$timeStr = .Content|Sec2Hour}} */}</>) : null}
					{i18n("repo.issues.stop_tracking_history")}
				</span>
				{/* template: repo/issue/view_content/comments_delete_time */}
			</div>
		</>) : null} {(item.type === 14) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-clock"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{/* $timeStr */} {/* compatibility with time comments made before v1.21 */}
					{(!(props.timeStr)) ? (<>{/* TODO: {{$timeStr = .Content|Sec2Hour}} */}</>) : null}
					{i18n("repo.issues.add_time_history")}
				</span>
				{/* template: repo/issue/view_content/comments_delete_time */}
			</div>
		</>) : null} {(item.type === 15) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-clock"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{i18n("repo.issues.cancel_tracking_history")}
				</span>
			</div>
		</>) : null} {(item.type === 16) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-clock"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{/* $dueDate */}
					{i18n("repo.issues.due_date_added")}
				</span>
			</div>
		</>) : null} {(item.type === 17) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-clock"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{/* $parsedDeadline */}
					{("len $parsedDeadline" === 2) ? (<>
						{/* $to */}
						{/* $from */}
						{i18n("repo.issues.due_date_modified")}
					</>) : null}
				</span>
			</div>
		</>) : null} {(item.type === 18) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-clock"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{/* $dueDate */}
					{i18n("repo.issues.due_date_remove")}
				</span>
			</div>
		</>) : null} {(item.type === 19) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-package-dependents"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{i18n("repo.issues.dependency.added_dependency")}
				</span>
				{(item.dependentIssue) ? (<>
					<div className="detail flex-text-block">
						<span className="svg-icon" aria-label="octicon-plus"></span>
						<span className="comment-text-line">
							<a href={String(props.dependentIssue?.link ?? "")}>
								{(item.dependentIssue?.repoID === item.issue?.repoID) ? (<>
									#{item.dependentIssue?.index as any} {item.dependentIssue?.title as any}
								</>) : (<>
									{item.dependentIssue?.repo?.fullName as any}#{item.dependentIssue?.index as any} - {item.dependentIssue?.title as any}
								</>)}
							</a>
						</span>
					</div>
				</>) : null}
			</div>
		</>) : null} {(item.type === 20) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-package-dependents"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{i18n("repo.issues.dependency.removed_dependency")}
				</span>
				{(item.dependentIssue) ? (<>
					<div className="detail flex-text-block">
						<span className="svg-icon" aria-label="octicon-trash"></span>
						<span className="comment-text-line">
							<a href={String(props.dependentIssue?.link ?? "")}>
								{(item.dependentIssue?.repoID === item.issue?.repoID) ? (<>
									#{item.dependentIssue?.index as any} {item.dependentIssue?.title as any}
								</>) : (<>
									{item.dependentIssue?.repo?.fullName as any}#{item.dependentIssue?.index as any} - {item.dependentIssue?.title as any}
								</>)}
							</a>
						</span>
					</div>
				</>) : null}
			</div>
		</>) : null} {(item.type === 22) ? (<>
			<div className="timeline-item-group" id={String(props.hashTag ?? "")}>
				<div className="timeline-item event">
					{/* $reviewType */}
					{(item.review) ? (<>{/* TODO: {{$reviewType = .Review.Type}} */}</>) : null}
					{(!(item.originalAuthor)) ? (<>
					{/* Some timeline avatars need a offset to correctly align with their speech bubble.
						The condition depends on whether the comment has contents/attachments,
						review's comment is also controlled/rendered by issue comment's Content field */}
					<a className={`timeline-avatar${((props.content || props.attachments)) ? ` timeline-avatar-offset` : ""}`}{...(item.poster?.iD > 0 ? {"href": String(props.poster?.homeLink ?? "")} : {})}>
						{/* TODO: {{ctx.AvatarUtils.Avatar .Poster 40}} */}
					</a>
					</>) : null}
					<span className={`badge tw-text-white${(props.reviewType === 1) ? `${(props.review?.official) ? ` tw-bg-green ` : ` tw-bg-grey`} tw-bg-red` : ""}`}>
						{(item.review) ? (<>{/* TODO: {{svg (printf "octicon-%s" .Review.Type.Icon)}} */}</>) : null}
					</span>
					<span className="comment-text-line">
						{/* template: repo/issue/view_content/comments_authorlink */}
						{(props.reviewType === 1) ? (<>
							{i18n("repo.issues.review.approve")}
						</>) : null} {(props.reviewType === 2) ? (<>
							{i18n("repo.issues.review.comment")}
						</>) : null} {(props.reviewType === 3) ? (<>
							{i18n("repo.issues.review.reject")}
						</>) : (<>
							{i18n("repo.issues.review.comment")}
						</>)}
						{((item.review && item.review?.dismissed)) ? (<>
							<div className="ui small label">{i18n("repo.issues.review.dismissed_label")}</div>
						</>) : null}
					</span>
				</div>
				{((item.content || item.attachments)) ? (<>
				<div className="timeline-item comment">
					<div className="content comment-container">
						<div className="comment-header avatar-content-left-arrow">
							<div className="comment-header-left">
								{(item.poster?.iD > 0) ? (<>
									<a className="inline-timeline-avatar" href={String(props.poster?.homeLink ?? "")}>
										{/* TODO: {{ctx.AvatarUtils.Avatar .Poster 24}} */}
									</a>
								</>) : null}
								<span className="comment-text-line">
									{(item.originalAuthor) ? (<>
										<span className="tw-text-text tw-font-semibold">
											{/* TODO: {{svg (MigrationIcon $.Repository.GetOriginalURLHostname)}} */}
											{item.originalAuthor as any}
										</span>
										<span className="comment-text-line"> {(props.repository?.originalURL) ? (<></span>
										<span className="text migrate">({i18n("repo.migrated_from")})</>) : null}</span>
									</>) : (<>
										{/* template: shared/user/authorlink */}
									</>)}

									{i18n("repo.issues.review.left_comment")}
								</span>
							</div>
							<div className="comment-header-right">
								{/* template: repo/issue/view_content/show_role */}
								{(!(props.repository?.isArchived)) ? (<>
									{/* template: repo/issue/view_content/add_reaction */}
									{/* template: repo/issue/view_content/context_menu */}
								</>) : null}
							</div>
						</div>
						<div className="ui attached segment comment-body">
							<div className="render-content markup" {...((props.permission?.isAdmin || props.hasIssuesOrPullsWritePermission || (props.isSigned && props.signedUserID === item.posterID)) ? {"data-can-edit": "true"} : {})}>
								{(item.renderedContent) ? (<>
									{item.renderedContent as any}
								</>) : (<>
									<span className="no-content">{i18n("repo.issues.no_content")}</span>
								</>)}
							</div>
							<div id={`${String(props.hashTag ?? "")}-raw`} className="raw-content tw-hidden">{item.content as any}</div>
							<div className="edit-content-zone tw-hidden" data-update-url={`${String(props.repoLink ?? "")}/comments/${String(props.iD ?? "")}`} data-content-version={String(props.contentVersion ?? "")} data-context={String(props.repoLink ?? "")} data-attachment-url={`${String(props.repoLink ?? "")}/comments/${String(props.iD ?? "")}/attachments`}></div>
							{(item.attachments) ? (<>
								{/* template: repo/issue/view_content/attachments */}
							</>) : null}
						</div>
						{/* $reactions */}
						{(props.reactions) ? (<>
							{/* template: repo/issue/view_content/reactions */}
						</>) : null}
					</div>
				</div>
				</>) : null}

				{((item.review && item.review?.codeComments)) ? (<>
				<div className="timeline-item event code-comments-list">
					{((item.review?.codeComments) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						{((props.lines) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							{/* template: repo/issue/view_content/conversation */}
						</React.Fragment>))}
					</React.Fragment>))}
				</div>
				</>) : null}
			</div>
		</>) : null} {(item.type === 23) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-lock"></span></span>
				{/* template: shared/user/avatarlink */}
				{(item.content) ? (<>
					<span className="comment-text-line">
						{/* template: shared/user/authorlink */}
						{i18n("repo.issues.lock_with_reason")}
					</span>
				</>) : (<>
					<span className="comment-text-line">
						{/* template: shared/user/authorlink */}
						{i18n("repo.issues.lock_no_reason")}
					</span>
				</>)}
			</div>
		</>) : null} {(item.type === 24) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-key"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{i18n("repo.issues.unlock_comment")}
				</span>
			</div>
		</>) : null} {(item.type === 25) ? (<>
			<div className="timeline-item event">
				<span className="badge"><span className="svg-icon" aria-label="octicon-git-branch"></span></span>
				{(!(item.originalAuthor)) ? (<>
					{/* template: shared/user/avatarlink */}
				</>) : null}
				<span className="comment-text-line">
					{/* template: repo/issue/view_content/comments_authorlink */}
					{i18n("repo.pulls.change_target_branch_at")}
				</span>
			</div>
		</>) : null} {(item.type === 26) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-clock"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}

					{i18n("repo.issues.del_time_history")}
				</span>
				<div className="detail flex-text-block">
					<span className="svg-icon" aria-label="octicon-clock"></span>
					{(item.renderedContent) ? (<>
						{/* compatibility with time comments made before v1.21 */}
						<span className="comment-text-line">{item.renderedContent as any}</span>
					</>) : (<>
						<span className="comment-text-line">- {item.content|Sec2Hour as any}</span>
					</>)}
				</div>
			</div>
		</>) : null} {(item.type === 27) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-eye"></span></span>
				{/* $specialDoerHtml */}
				{/* $timelineRequestedReviewHtml */}
				{(props.specialDoerHtml) ? (<>
					<span className="comment-text-line">
						{props.specialDoerHtml as any}
						{props.timelineRequestedReviewHtml as any}
					</span>
				</>) : (<>
					{/* template: shared/user/avatarlink */}
					<span className="comment-text-line">
						{/* template: shared/user/authorlink */}
						{props.timelineRequestedReviewHtml as any}
					</span>
				</>)}
			</div>
		</>) : null} {((item.type === 29 && (item.commitsNum > 0 || item.isForcePush))) ? (<>
			{/* If PR is closed, the comments whose type is CommentTypePullRequestPush(29) after latestCloseCommentID won't be rendered. // */}
			{((item.issue?.isClosed && item.iD > props.latestCloseCommentID)) ? (<>
				{/* TODO: {{continue}} */}
			</>) : null}
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-repo-push"></span></span>
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{(item.isForcePush) ? (<>
						{i18n("repo.issues.force_push_codes")}
					</>) : (<>
						{/* TODO: {{ctx.Locale.TrN (len .Commits) "repo.issues.push_commit_1" "repo.issues.push_commits_n" (len .Commits) $createdStr}} */}
					</>)}
				</span>
				{((item.isForcePush && props.issue?.pullRequest?.baseRepo?.name)) ? (<>
					<a className="ui label comment-text-label tw-ml-auto" href={`${String(props.issue?.pullRequest?.baseRepo?.link ?? "")}/compare/..`} rel="nofollow">{i18n("repo.issues.force_push_compare")}</a>
				</>) : null}
			</div>
			{(!(item.isForcePush)) ? (<>
				{/* template: repo/commits_list_small */}
			</>) : null}
		</>) : null} {(item.type === 30) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-project"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{/* $oldProjectDisplayHtml */}
					{(item.oldProject) ? (<>
						{/* $tooltip */}
						{(!(item.oldProject?.isGhost)) ? (<>
							{/* TODO: {{$tooltip = ctx.Locale.Tr (printf "projects.type-%d.display_name" .OldProject.Type)}} */}
						</>) : null}
						{/* TODO: {{$oldProjectDisplayHtml = HTMLFormat '<span data-tooltip-content="%s">%s</span>' $tooltip .OldProject.Title}} */}
					</>) : null}
					{/* $newProjectDisplayHtml */}
					{(item.project) ? (<>
						{/* $tooltip */}
						{(!(item.project?.isGhost)) ? (<>
							{/* TODO: {{$tooltip = ctx.Locale.Tr (printf "projects.type-%d.display_name" .Project.Type)}} */}
						</>) : null}
						{/* TODO: {{$newProjectDisplayHtml = HTMLFormat '<span data-tooltip-content="%s">%s</span>' $tooltip .Project.Title}} */}
					</>) : null}
					{((item.oldProjectID > 0 && item.projectID > 0)) ? (<>
						{i18n("repo.issues.change_project_at")}
					</>) : null} {(item.oldProjectID > 0) ? (<>
						{i18n("repo.issues.remove_project_at")}
					</>) : null} {(item.projectID > 0) ? (<>
						{i18n("repo.issues.add_project_at")}
					</>) : null}
				</span>
			</div>
		</>) : null} {(item.type === 31) ? (<>
			{(!(props.unitProjectsGlobalDisabled)) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-project"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{/* $newProjectDisplay */}
					{(item.project) ? (<>
						{/* $trKey */}
						{/* TODO: {{$newProjectDisplay = HTMLFormat '%s <a href="%s"><span data-tooltip-content="%s">%s</span></a>' (svg .Project.IconName) (.Project.Link ctx) (ctx.Locale.Tr $trKey) .Project.Title}} */}
					</>) : null}
					{i18n("repo.issues.move_to_column_of_project")}
				</span>
			</div>
			</>) : null}
		</>) : null} {(item.type === 32) ? (<>
			<div className="timeline-item-group">
				<div className="timeline-item event" id={String(props.hashTag ?? "")}>
					<a className="timeline-avatar"{...(item.poster?.iD > 0 ? {"href": String(props.poster?.homeLink ?? "")} : {})}>
						{/* TODO: {{ctx.AvatarUtils.Avatar .Poster 40}} */}
					</a>
					<span className="badge grey"><span className="svg-icon" aria-label="octicon-x"></span></span>
					<span className="comment-text-line">
						{/* template: shared/user/authorlink */}
						{/* $reviewerName */}
						{(item.review) ? (<>
							{(item.review?.originalAuthor === "") ? (<>
								{/* TODO: {{$reviewerName = .Review.Reviewer.Name}} */}
							</>) : (<>
								{/* TODO: {{$reviewerName = .Review.OriginalAuthor}} */}
							</>)}
						</>) : null}
						{i18n("repo.issues.review.dismissed")}
					</span>
				</div>
				{(item.content) ? (<>
					<div className="timeline-item comment">
						<div className="content comment-container">
							<div className="comment-header avatar-content-left-arrow arrow-top">
								{(item.poster?.iD > 0) ? (<>
									<a className="inline-timeline-avatar" href={String(props.poster?.homeLink ?? "")}>
										{/* TODO: {{ctx.AvatarUtils.Avatar .Poster 24}} */}
									</a>
								</>) : null}
								<span className="comment-text-line">
									{i18n("action.review_dismissed_reason")}
								</span>
							</div>
							<div className="ui attached segment comment-body">
								<div className="render-content markup">
									{(item.renderedContent) ? (<>
										{item.renderedContent as any}
									</>) : (<>
										<span className="no-content">{i18n("repo.issues.no_content")}</span>
									</>)}
								</div>
							</div>
						</div>
					</div>
				</>) : null}
			</div>
		</>) : null} {(item.type === 33) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-git-branch"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{((item.oldRef && item.newRef)) ? (<>
						{i18n("repo.issues.change_ref_at")}
					</>) : null} {(item.oldRef) ? (<>
						{i18n("repo.issues.remove_ref_at")}
					</>) : (<>
						{i18n("repo.issues.add_ref_at")}
					</>)}
				</span>
			</div>
		</>) : null} {((item.type === 34 || item.type === 35)) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-git-merge"></span></span>
				<span className="comment-text-line">
					{/* template: repo/issue/view_content/comments_authorlink */}
					{(item.type === 34) ? (<>{i18n("repo.pulls.auto_merge_newly_scheduled_comment")}
					</>) : (<>{i18n("repo.pulls.auto_merge_canceled_schedule_comment")}</>)}
				</span>
			</div>
		</>) : null} {((item.type === 36 || item.type === 37)) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-pin"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{(item.type === 36) ? (<>{i18n("repo.issues.pin_comment")}
					</>) : (<>{i18n("repo.issues.unpin_comment")}</>)}
				</span>
			</div>
		</>) : null} {(item.type === 38) ? (<>
			<div className="timeline-item event" id={String(props.hashTag ?? "")}>
				<span className="badge"><span className="svg-icon" aria-label="octicon-clock"></span></span>
				{/* template: shared/user/avatarlink */}
				<span className="comment-text-line">
					{/* template: shared/user/authorlink */}
					{/* $timeStr */}
					{(props.timeStr) ? (<>
						{i18n("repo.issues.change_time_estimate_at")}
					</>) : (<>
						{i18n("repo.issues.remove_time_estimate_at")}
					</>)}
				</span>
			</div>
		</>) : null}
	</>) : null}
</React.Fragment>))}

  </>)
}
