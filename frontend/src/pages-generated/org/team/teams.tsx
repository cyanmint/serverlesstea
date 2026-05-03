import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Teams(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content organization teams">
	{/* template: org/header */}
	<div className="ui container">
		{/* alert */}
		{(props.isOrganizationOwner) ? (<>
			<div className="flex-text-block">
				<div className="tw-flex-1">{i18n("org.teams.manage_team_member_prompt")}</div>
				<a className="ui primary button" href={`${String(props.orgLink ?? "")}/teams/new`}><span className="svg-icon" aria-label="octicon-plus"></span> {i18n("org.create_new_team")}</a>
			</div>
		</>) : null}

		<form className="ui form ignore-dirty tw-my-4" method="get" action={String(props.link ?? "")}>
			<div className="ui fluid action input">
				<input type="search" name="q" value={String(props.keyword ?? "")} placeholder={String(i18n("search.team_kind") ?? "")} maxlength="255" spellcheck="false" />
				<button className="ui button" type="submit"><span className="svg-icon" aria-label="octicon-search"></span></button>
			</div>
		</form>

		<div className="ui two column stackable grid">
			{((props.orgListTeams) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="column team-item-box">
					<div className="ui top attached header muted-links flex-left-right team-item-header">
						<a href={`${String(props.orgLink ?? "")}/teams/${String(props.lowerName?.("|", "PathEscape") ?? "")}`}><strong>{item.name as any}</strong></a>
						<div className="flex-text-block tw-flex-wrap">
							<a href={`${String(props.orgLink ?? "")}/teams/${String(props.lowerName?.("|", "PathEscape") ?? "")}`}>{item.numMembers as any} {i18n("org.lower_members")}</a>
							·
							<a href={`${String(props.orgLink ?? "")}/teams/${String(props.lowerName?.("|", "PathEscape") ?? "")}/repositories`}>{item.numRepos as any} {i18n("org.lower_repositories")}</a>
							{(item.isMember?.(ctx, props.signedUser?.iD)) ? (<>
								<button className="ui red mini compact button show-modal" data-modal="#org-member-leave-team"
									{...{"data-modal-form.action": `${String(props.orgLink ?? "")}/teams/${String(props.lowerName?.("|", "PathEscape") ?? "")}/action/leave?uid=${String(props.signedUser?.iD ?? "")}`}}
									data-modal-to-leave-team-name={String(props.name ?? "")}
								>{i18n("org.teams.leave")}</button>
							</>) : null}
						</div>
					</div>
					{(item.team?.description) ? (<>
					<div className="ui attached header team-item-description">
						{(item.team?.description) ? (<>{/* TODO: {{$team.Description}} */}</>) : null}
					</div>
					</>) : null}
					<div className="ui attached segment">
						<div className="flex-text-block tw-flex-wrap">
							{((item.members) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								{/* template: shared/user/avatarlink */}
							{/* else */}
								<a className="flex-text-inline tw-h-[32px]" href={`${String(props.orgLink ?? "")}/teams/`}>{i18n("org.teams.add_team_member")}</a>
							</React.Fragment>))}
						</div>
					</div>
				</div>
			</React.Fragment>))}
		</div>
	{/* template: base/paginate */}
	</div>
</div>
<div className="ui mini modal" id="org-member-leave-team">
	<div className="header">
		{i18n("org.teams.leave")}
	</div>
	<form className="content ui form form-fetch-action" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<p>{i18n("org.teams.leave.detail")}</p>
		{/* template: base/modal_actions_confirm */}
	</form>
</div>


  </>)
}
