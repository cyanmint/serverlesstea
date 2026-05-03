import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Members(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content organization members">
	{/* template: org/header */}
	<div className="ui container">
		{/* alert */}

		{(props.isOrganizationOwner) ? (<>
			<div className="flex-text-block">
				<div className="tw-flex-1">{i18n("org.teams.manage_team_member_prompt")}</div>
				<a className="ui primary button" href="./teams">{i18n("org.teams.manage_team_member")}</a>
			</div>
			<div className="divider"></div>
		</>) : null}
		<div className="flex-divided-list items-with-main">
			{((props.members) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				{/* $isPublic */}
				<div className={`item ${(props.publicOnly) ? `tw-items-center` : ""}`}>
					<div className="item-leading">
						<a href={String(props.homeLink ?? "")}>{/* TODO: {{ctx.AvatarUtils.Avatar . 48}} */}</a>
					</div>
					<div className="item-main">
						<div className="item-title">
							{/* template: shared/user/name */}
							{(!(props.isPublic)) ? (<>
								<span className="ui basic small label">{i18n("org.members.private")}</span>
							</>) : null}
						</div>
						<div className="tw-flex tw-flex-col tw-gap-1">
							{(!(props.publicOnly)) ? (<>
							<div>
								{i18n("org.members.member_role")}
								<strong className="flex-text-inline">{("index $.MembersIsUserOrgOwner .ID") ? (<><span className="svg-icon" aria-label="octicon-shield-lock"></span> {i18n("org.members.owner")}</>) : (<>{i18n("org.members.member")}</>)}</strong>
							</div>
							</>) : null}
							{(props.isOrganizationOwner) ? (<>
							<div>
								{i18n("admin.users.2fa")}:
								{("index $.MembersTwoFaStatus .ID") ? (<>
									<span className="tw-text-green tw-flex"><span className="svg-icon" aria-label="octicon-check"></span></span>
								</>) : (<>
									<span className="svg-icon" aria-label="octicon-x"></span>
								</>)}
							</div>
							</>) : null}
						</div>
					</div>
					<div className="item-trailing">
						{((props.signedUser?.iD === item.iD || props.isOrganizationOwner)) ? (<>
							{(props.isPublic) ? (<>
								<a className="ui tiny button link-action" href data-url={`${String(props.orgLink ?? "")}/members/action/private?uid=${String(props.iD ?? "")}`}><span className="svg-icon" aria-label="octicon-eye-closed"></span>{i18n("org.members.public_helper")}</a>
							</>) : (<>
								<a className="ui tiny button link-action" href data-url={`${String(props.orgLink ?? "")}/members/action/public?uid=${String(props.iD ?? "")}`}><span className="svg-icon" aria-label="octicon-eye"></span>{i18n("org.members.private_helper")}</a>
							</>)}
						</>) : null}
						{(props.signedUser?.iD === item.iD) ? (<>
							<button className="ui red tiny button link-action"
								data-url={`${String(props.orgLink ?? "")}/members/action/leave?uid=${String(props.iD ?? "")}`}
								data-modal-confirm-header={String(i18n("org.members.leave") ?? "")}
								data-modal-confirm-content={String(i18n("org.members.leave.detail") ?? "")}
								>{i18n("org.members.leave")}</button>
						</>) : null} {(props.isOrganizationOwner) ? (<>
							<button className="ui red tiny button link-action"
								data-url={`${String(props.orgLink ?? "")}/members/action/remove?uid=${String(props.iD ?? "")}`}
								data-modal-confirm-header={String(i18n("org.members.remove") ?? "")}
								data-modal-confirm-content={String(i18n("org.members.remove.detail") ?? "")}
							>{i18n("org.members.remove")}</button>
						</>) : null}
					</div>
				</div>
			</React.Fragment>))}
		</div>
		{/* template: base/paginate */}
	</div>
</div>


  </>)
}
