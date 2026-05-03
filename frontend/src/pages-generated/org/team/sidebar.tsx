import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Sidebar(props: Record<string, unknown>) {
  return (<>
<div className="ui six wide column">
	<h4 className="ui top attached header flex-left-right">
		<strong>{props.team?.name as any}</strong>
		<div className="flex-text-block">
			{(props.team?.isMember?.(ctx, props.signedUser?.iD)) ? (<>
				<button className="ui red mini compact button show-modal" data-modal="#org-member-leave-team"
					{...{"data-modal-form.action": `${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName?.("|", "PathEscape") ?? "")}/action/leave?uid=${String(props.signedUser?.iD ?? "")}`}}
					data-modal-to-leave-team-name={String(props.team?.name ?? "")}
				>{i18n("org.teams.leave")}</button>
			</>) : null} {(props.isOrganizationOwner) ? (<>
				<form method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName?.("|", "PathEscape") ?? "")}/action/join`}>
					<input type="hidden" name="page" value="team" />
					<button type="submit" className="ui primary mini compact button" name="uid" value={String(props.signedUser?.iD ?? "")}>{i18n("org.teams.join")}</button>
				</form>
			</>) : null}
		</div>
	</h4>

		<div className="ui attached segment">
			{(props.team?.description) ? (<>
				{props.team?.description as any}
			</>) : (<>
				<span className="tw-text-text-light tw-italic">{i18n("org.teams.no_desc")}</span>
			</>)}
		</div>

		<div className="ui attached segment">
			{/* TODO: old indent is kept to make diff changes minimal, can be reformatted in the future */}
			{(props.team?.lowerName === "owners") ? (<>
				<p>{i18n("org.teams.owners_permission_desc")}</p>
				<p>{i18n("org.teams.owners_permission_suggestion")}</p>
			</>) : (<>
				<h3>{i18n("org.team_access_desc")}</h3>
				<ul>
					{(props.team?.includesAllRepositories) ? (<>
						<li>{i18n("org.teams.all_repositories")}</li>
					</>) : (<>
						<li>{i18n("org.teams.specific_repositories")}</li>
					</>)}
					{(props.team?.canCreateOrgRepo) ? (<>
						<li>{i18n("org.teams.can_create_org_repo")}</li>
					</>) : null}
				</ul>
				{/* the AccessMode should be either none or admin/owner, the real permissions are provided by each team unit */}
				
			</>)}
		</div>

	{(props.isOrganizationOwner) ? (<>
		<div className="ui bottom attached segment">
			<a className="ui small button" href={`${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName?.("|", "PathEscape") ?? "")}/edit`}><span className="svg-icon" aria-label="octicon-gear"></span> {i18n("org.teams.settings")}</a>
		</div>
	</>) : null}
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
