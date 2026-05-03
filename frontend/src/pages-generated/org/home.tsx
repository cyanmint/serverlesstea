import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Home(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content organization profile">
	{/* template: org/header */}

	<div className="ui container">
		<div className="ui mobile reversed stackable grid">
			<div className={`ui ${(props.showMemberAndTeamTab) ? `eleven wide` : ""} column`}>
				{(props.profileReadmeContent) ? (<>
					<div id="readme_profile" className="render-content markup" data-profile-view-as-member={String(props.isViewingOrgAsMember ?? "")}>{props.profileReadmeContent as any}</div>
				</>) : null}
				{/* template: shared/repo/search */}
				{(!(props.repos)) ? (<>
					<div className="empty-placeholder">
						<span className="svg-icon" aria-label="octicon-repo"></span>
						<h2>{i18n("org.repos.empty")}</h2>
						<p>{i18n("org.repos.empty_description")}</p>
					</div>
				</>) : (<>
					{/* template: shared/repo/list */}
					{/* template: base/paginate */}
				</>)}
			</div>

			{(props.showMemberAndTeamTab) ? (<>
			<div className="ui five wide column">
				{(props.canCreateOrgRepo) ? (<>
					<div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-mb-4">
						<a className="ui primary button tw-grow" href={`/repo/create?org=${String(props.org?.iD ?? "")}`}>{i18n("new_repo")}</a>
						{(!(props.disableNewPullMirrors)) ? (<>
							<a className="ui primary button tw-grow" href={`/repo/migrate?org=${String(props.org?.iD ?? "")}&mirror=1`}>{i18n("new_migrate")}</a>
						</>) : null}
					</div>
					<div className="divider"></div>
				</>) : null}

				{((props.showMemberAndTeamTab && props.showOrgProfileReadmeSelector)) ? (<>
				<div className="tw-my-4">
					<div id="org-home-view-as-dropdown" className="ui dropdown jump">
						{/* TODO: {{- $viewAsRole := Iif (.IsViewingOrgAsMember) (ctx.Locale.Tr "org.members.member") (ctx.Locale.Tr "settings.visibility.public") -}} */}
						<span className="text"><span className="svg-icon" aria-label="octicon-eye"></span> {i18n("org.view_as_role")}</span>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu">
							<a href="?view_as=public" className={`item ${(!(props.isViewingOrgAsMember)) ? `selected` : ""}`}>
								<span className="svg-icon" aria-label="octicon-check"></span> {i18n("settings.visibility.public")}
							</a>
							<a href="?view_as=member" className={`item ${(props.isViewingOrgAsMember) ? `selected` : ""}`}>
								<span className="svg-icon" aria-label="octicon-check"></span>  {i18n("org.members.member")}
							</a>
						</div>
					</div>
					<div className="tw-my-2">
						{(props.isViewingOrgAsMember) ? (<>{i18n("org.view_as_member_hint")}</>) : (<>{i18n("org.view_as_public_hint")}</>)}
					</div>
				</div>
				</>) : null}

				{(props.numMembers) ? (<>
					<h4 className="ui top attached header flex-left-right">
						<strong>{i18n("org.members")}</strong>
						<a className="tw-text-text-light flex-text-inline" href={`${String(props.orgLink ?? "")}/members`}><span>{props.numMembers as any}</span> <span className="svg-icon" aria-label="octicon-chevron-right"></span></a>
					</h4>
					{/* gap 8px below is specifically chosen to make sure a full line of avatars can exactly fit the segment width */}
					<div className="ui attached segment flex-text-block tw-flex-wrap tw-gap-[8px]">
						{((props.orgOverviewMembers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							{((props.isOrganizationMember || "call $.IsPublicMember $memberUser.ID")) ? (<>
								{/* template: shared/user/avatarlink */}
							</>) : null}
						</React.Fragment>))}
					</div>
				</>) : null}
				{(props.isOrganizationMember) ? (<>
					<div className="ui top attached header flex-left-right">
						<strong>{i18n("org.teams")}</strong>
						<a className="tw-text-text-light flex-text-inline" href={`${String(props.orgLink ?? "")}/teams`}><span>{props.org?.numTeams as any}</span> <span className="svg-icon" aria-label="octicon-chevron-right"></span></a>
					</div>
					<div className="ui attached segment">
						<div className="flex-relaxed-list">
						{((props.orgOverviewTeams) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<div>
								<a href={`${String(props.orgLink ?? "")}/teams/${String(props.lowerName | PathEscape ?? "")}`}><strong>{item.name as any}</strong></a>
								<p className="tw-text-text-light">
									<a className="muted" href={`${String(props.orgLink ?? "")}/teams/${String(props.lowerName | PathEscape ?? "")}`}><strong>{item.numMembers as any}</strong> {i18n("org.lower_members")}</a> ·
									<a className="muted" href={`${String(props.orgLink ?? "")}/teams/${String(props.lowerName | PathEscape ?? "")}/repositories`}><strong>{item.numRepos as any}</strong> {i18n("org.lower_repositories")}</a>
								</p>
							</div>
						</React.Fragment>))}
						</div>
					</div>
					{(props.isOrganizationOwner) ? (<>
						<div className="ui bottom attached segment">
							<a className="ui primary small button" href={`${String(props.orgLink ?? "")}/teams/new`}>{i18n("org.create_new_team")}</a>
						</div>
					</>) : null}
				</>) : null}
			</div>
			</>) : null}
		</div>
	</div>
</div>


  </>)
}
