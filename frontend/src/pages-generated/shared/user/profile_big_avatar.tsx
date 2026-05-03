import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ProfileBigAvatar(props: Record<string, unknown>) {
  return (<>
<div id="profile-avatar-card" className="ui card">
	<div id="profile-avatar" className="content tw-flex">
	{(props.signedUserID === props.contextUser?.iD) ? (<>
		<a className="image" href={`/user/settings`} data-tooltip-content={String(i18n("user.change_avatar") ?? "")}>
			{/* the size doesn't take affect (and no need to take affect), image size(width) should be controlled by the parent container since this is not a flex layout */}
			{/* TODO: {{ctx.AvatarUtils.Avatar .ContextUser 256}} */}
		</a>
	</>) : (<>
		<span className="image">
			{/* TODO: {{ctx.AvatarUtils.Avatar .ContextUser 256}} */}
		</span>
	</>)}
	</div>
	<div className="content tw-break-anywhere profile-avatar-name">
		{(props.contextUser?.fullName) ? (<><span className="header text center">{props.contextUser?.fullName as any}</span></>) : null}
		<span className="username text center">{props.contextUser?.name as any} {(props.isAdmin) ? (<>
					<a className="muted" href={`/-/admin/users/${String(props.contextUser?.iD ?? "")}`} data-tooltip-content={String(i18n("admin.users.details") ?? "")}>
						<span className="svg-icon" aria-label="octicon-gear"></span>
					</a>
				</>) : null}</span>
		<div className="tw-mt-2">
			<a className="muted" href={`${String(props.contextUser?.homeLink ?? "")}?tab=followers`}><span className="svg-icon" aria-label="octicon-person"></span>{props.numFollowers as any} {i18n("user.followers")}</a> · <a className="muted" href={`${String(props.contextUser?.homeLink ?? "")}?tab=following`}>{props.numFollowing as any} {i18n("user.following")}</a>
			{(props.enableFeed) ? (<>
				<a href={`${String(props.contextUser?.homeLink ?? "")}.rss`}><i className="ui tw-text-text-light tw-ml-2" data-tooltip-content={String(i18n("rss_feed") ?? "")}><span className="svg-icon" aria-label="octicon-rss"></span></i></a>
			</>) : null}
		</div>
	</div>
	<div className="extra content tw-break-anywhere">
		<ul>
			{(props.userBlocking) ? (<>
				<li className="tw-text-red"><span className="svg-icon" aria-label="octicon-circle-slash"></span> {i18n("user.block.blocked")}</li>
				{(props.userBlocking?.note) ? (<>
					<li className="tw-text-xs tw-text-red">{i18n("user.block.note")}: {props.userBlocking?.note as any}</li>
				</>) : null}
			</>) : null}
			{(props.contextUser?.location) ? (<>
				<li>
					<span className="svg-icon" aria-label="octicon-location"></span>
					<span className="tw-flex-1">{props.contextUser?.location as any}</span>
					{(props.contextUserLocationMapURL) ? (<>
						<a href={String(props.contextUserLocationMapURL ?? "")} data-tooltip-content={String(i18n("user.show_on_map") ?? "")}>
							<span className="svg-icon" aria-label="octicon-link-external"></span>
						</a>
					</>) : null}
				</li>
			</>) : null}
			{(props.signedUserID === props.contextUser?.iD) ? (<>
				<li>
					<span className="svg-icon" aria-label="octicon-mail"></span>
					<a className="tw-flex-1" href={`mailto:${String(props.contextUser?.email ?? "")}`} rel="nofollow">{props.contextUser?.email as any}</a>
					<a className="flex-text-inline" href={`/user/settings#privacy-user-settings`} data-tooltip-content={String("" ?? "")}>
						{/* TODO: {{svg (Iif .ShowUserEmail "octicon-unlock" "octicon-lock")}} */}
					</a>
				</li>
			</>) : (<>
				{(props.showUserEmail) ? (<>
					<li>
						<span className="svg-icon" aria-label="octicon-mail"></span>
						<a href={`mailto:${String(props.contextUser?.email ?? "")}`} rel="nofollow">{props.contextUser?.email as any}</a>
					</li>
				</>) : null}
			</>)}
			{(props.contextUser?.website) ? (<>
				<li>
					<span className="svg-icon" aria-label="octicon-link"></span>
					<a target="_blank" rel="me" href={String(props.contextUser?.website ?? "")}>{props.contextUser?.website as any}</a>
				</li>
			</>) : null}
			{(props.renderedDescription) ? (<>
				<li>
					<div className="render-content markup">{props.renderedDescription as any}</div>
				</li>
			</>) : null}
			{((props.openIDs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				{(item.show) ? (<>
					<li>
						<span className="svg-icon" aria-label="fontawesome-openid"></span>
						<a target="_blank" href={String(props.uRI ?? "")}>{item.uRI as any}</a>
					</li>
				</>) : null}
			</React.Fragment>))}
			<li><span className="svg-icon" aria-label="octicon-calendar"></span> <span>{i18n("user.joined_on")}</span></li>
			{((props.orgs && props.hasOrgsVisible)) ? (<>
			<li>
				<ul className="user-orgs">
				{((props.orgs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					{((item.visibility?.isPublic || (props.signedUser && (item.visibility?.isLimited || (item.hasMemberWithUserID?.(ctx, props.signedUserID) && item.visibility?.isPrivate) || props.isAdmin)))) ? (<>
					<li>
						<a href={String(props.homeLink ?? "")} data-tooltip-content={String(props.name ?? "")}>
							{/* TODO: {{ctx.AvatarUtils.Avatar .}} */}
						</a>
					</li>
					</>) : null}
				</React.Fragment>))}
					{(props.showMoreOrgs) ? (<>
						<li><a className="tw-align-center" href={`${String(props.contextUser?.homeLink ?? "")}?tab=organizations`} data-tooltip-content={String(i18n("user.show_more") ?? "")}><span className="svg-icon" aria-label="octicon-kebab-horizontal"></span></a></li>
					</>) : null}
				</ul>
			</li>
			</>) : null}
			{(props.badges) ? (<>
			<li>
				<div className="user-badges">
				{((props.badges) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<span className="user-badge-item">
						{(item.imageURL) ? (<>
						<img loading="lazy" width="64" height="64" src={String(props.imageURL ?? "")} alt={String(props.description ?? "")} data-tooltip-content={String(props.description ?? "")} />
						</>) : (<>
						<span className="ui label user-badge-chip" data-tooltip-content={`${(props.description) ? `${String(props.description ?? "")}` : `${String(props.slug ?? "")}`}`}>{item.slug as any}</span>
						</>)}
					</span>
				</React.Fragment>))}
				</div>
			</li>
			</>) : null}
			{((props.isSigned && props.signedUserID !== props.contextUser?.iD)) ? (<>
				{(!(props.userBlocking)) ? (<>
				<li className="follow">
					{/* $buttonExtraClass */}
					{/* $followAction */}
					<button className={`ui basic  button`}
									data-fetch-method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} data-fetch-url={`${String(props.contextUser?.homeLink ?? "")}?action=`}
									data-fetch-sync="$body #profile-avatar-card"
					>
						{(props.isFollowing) ? (<>
							<span className="svg-icon" aria-label="octicon-person"></span> {i18n("user.unfollow")}
						</>) : (<>
							<span className="svg-icon" aria-label="octicon-person"></span> {i18n("user.follow")}
						</>)}
					</button>
				</li>
				</>) : null}
				<li>
					{(!(props.userBlocking)) ? (<>
						<a className="muted show-modal" href="#" data-modal="#block-user-modal" data-modal-modal-blockee={String(props.contextUser?.name ?? "")} data-modal-modal-blockee-name={String(props.contextUser?.getDisplayName ?? "")} {...{"data-modal-modal-form.action": `/user/settings/blocked_users`}}>{i18n("user.block.block.user")}</a>
					</>) : (<>
						<a className="muted" href={`/user/settings/blocked_users`}>{i18n("user.block.unblock")}</a>
					</>)}
				</li>
			</>) : null}
		</ul>
	</div>
</div>

{/* template: shared/user/block_user_dialog */}

  </>)
}
