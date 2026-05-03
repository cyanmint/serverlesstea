import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Members(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content organization teams">
	{/* template: org/header */}
	<div className="ui container">
		{/* alert */}
		<div className="ui stackable grid">
			{/* template: org/team/sidebar */}
			<div className="ui ten wide column">
				{/* template: org/team/navbar */}
				{(props.isOrganizationOwner) ? (<>
					<div className="ui top attached segment">
						<form className="ui form ignore-dirty tw-flex tw-flex-wrap tw-gap-2" action={`${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName | PathEscape ?? "")}/action/add`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
							<input type="hidden" name="uid" value={String(props.signedUser?.iD ?? "")} />
							<div id="search-user-box" className="ui search tw-mr-2"{(props.isEmailInviteEnabled) ? (<> data-allow-email="true" data-allow-email-description={String(i18n("org.teams.invite_team_member") ?? "")}</>) : null}>
								<div className="ui input">
									<input className="prompt" name="uname" placeholder={String(i18n("search.user_kind") ?? "")} autocomplete="off" required />
								</div>
							</div>
							<button className="ui primary button">{i18n("org.teams.add_team_member")}</button>
						</form>
					</div>
				</>) : null}
				<div className={`ui${(!(props.isOrganizationOwner)) ? ` top` : ""} attached segment`}>
								<div className="flex-divided-list items-with-main">
										{((props.team?.members) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
											<div className="item tw-items-center">
								<div className="item-leading">
									<a href={String(props.homeLink ?? "")}>{/* TODO: {{ctx.AvatarUtils.Avatar . 32}} */}</a>
								</div>
								<div className="item-main">
									<div className="item-title">
										{/* template: shared/user/name */}
									</div>
								</div>
								<div className="item-trailing">
									{((props.isOrganizationOwner && !((props.team?.isOwnerTeam && "len $.Team.Members" === 1)))) ? (<>
										<form>
											<button className="ui red button delete-button" data-modal-id="remove-team-member"
												data-url={`${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName | PathEscape ?? "")}/action/remove`} data-datauid={String(props.iD ?? "")}
												data-name={String(props.displayName ?? "")}
												data-data-team-name={String(props.team?.name ?? "")}>{i18n("org.members.remove")}</button>
										</form>
									</>) : null}
								</div>
							</div>
						{/* else */}
							<div className="item">
								<span className="tw-text-text-light tw-italic">{i18n("org.teams.members.none")}</span>
							</div>
						</React.Fragment>))}
					</div>
				</div>
				{((props.invites && props.isOrganizationOwner)) ? (<>
				<h4 className="ui top attached header">{i18n("org.teams.invite_team_member.list")}</h4>
				<div className="ui attached segment">
					<div className="flex-divided-list items-with-main">
						{((props.invites) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<div className="item tw-items-center">
								<div className="item-main">
									{item.email as any}
								</div>
								<div className="item-trailing">
									<form action={`${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName | PathEscape ?? "")}/action/remove_invite`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
										<input type="hidden" name="iid" value={String(props.iD ?? "")} />
										<button className="ui red button">{i18n("org.members.remove")}</button>
									</form>
								</div>
							</div>
						</React.Fragment>))}
					</div>
				</div>
				</>) : null}
			</div>
		</div>
	</div>
</div>
<div className="ui g-modal-confirm delete modal" id="remove-team-member">
	<div className="header">
		{i18n("org.members.remove")}
	</div>
	<div className="content">
		<p>{i18n("org.members.remove.detail")}</p>
	</div>
	{/* template: base/modal_actions_confirm */}
</div>


  </>)
}
