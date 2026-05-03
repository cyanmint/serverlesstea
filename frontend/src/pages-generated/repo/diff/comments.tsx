import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Comments(props: Record<string, unknown>) {
  return (<>
{((props.comments) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>

{/* $createdStr */}
<div className="comment" id={String(props.hashTag ?? "")}>
	<div className="tw-mt-2 tw-mr-4">
		{(item.originalAuthor) ? (<>
			<span className="avatar">{/* TODO: {{ctx.AvatarUtils.Avatar nil}} */}</span>
		</>) : (<>
			{/* template: shared/user/avatarlink */}
		</>)}
	</div>
	<div className="content comment-container">
		<div className="comment-header avatar-content-left-arrow">
			<div className="comment-header-left">
				{(item.originalAuthor) ? (<>
					<span className="tw-text-text tw-font-semibold tw-mr-1">
						{/* TODO: {{svg (MigrationIcon $.root.Repository.GetOriginalURLHostname)}} */}
						{item.originalAuthor as any}
					</span>
					<span className="tw-text-text-light muted-links">
						{i18n("repo.issues.commented_at")}
					</span>
					<span className="text migrate">
						{(props.root?.repository?.originalURL) ? (<>
							({i18n("repo.migrated_from")})
						</>) : null}
					</span>
				</>) : (<>
					<span className="tw-text-text-light muted-links">
						{/* template: shared/user/namelink */}
						{i18n("repo.issues.commented_at")}
					</span>
				</>)}
			</div>
			<div className="comment-header-right">
				{(item.invalidated) ? (<>
					{/* $referenceUrl */}
					<a href={String("" ?? "")} className="ui label basic small" data-tooltip-content={String(i18n("repo.issues.review.outdated_description") ?? "")}>
						{i18n("repo.issues.review.outdated")}
					</a>
				</>) : null}
				{(item.review) ? (<>
					{(item.review?.type === 0) ? (<>
						<div className="ui label basic small yellow pending-label" data-tooltip-content={String(i18n("repo.issues.review.pending.tooltip") ?? "")}>
						{i18n("repo.issues.review.pending")}
						</div>
					</>) : (<>
						<div className="ui label basic small">
						{i18n("repo.issues.review.review")}
						</div>
					</>)}
				</>) : null}
				{(!(props.root?.repository?.isArchived)) ? (<>
					{/* template: repo/issue/view_content/add_reaction */}
				</>) : null}
				{/* template: repo/issue/view_content/context_menu */}
			</div>
		</div>
		<div className="ui attached segment comment-body">
			<div className="render-content markup" {...((props.permission?.isAdmin || props.hasIssuesOrPullsWritePermission || (props.root?.isSigned && props.root?.signedUserID === item.posterID)) ? {"data-can-edit": "true"} : {})}>
			{(item.renderedContent) ? (<>
				{item.renderedContent as any}
			</>) : (<>
				<span className="no-content">{i18n("repo.issues.no_content")}</span>
			</>)}
			</div>
			<div id={`${String(props.hashTag ?? "")}-raw`} className="raw-content tw-hidden">{item.content as any}</div>
			<div className="edit-content-zone tw-hidden" data-update-url={`${String(props.root?.repoLink ?? "")}/comments/${String(props.iD ?? "")}`} data-content-version={String(props.contentVersion ?? "")} data-context={String(props.root?.repoLink ?? "")} data-attachment-url={`${String(props.root?.repoLink ?? "")}/comments/${String(props.iD ?? "")}/attachments`}></div>
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
</React.Fragment>))}

  </>)
}
