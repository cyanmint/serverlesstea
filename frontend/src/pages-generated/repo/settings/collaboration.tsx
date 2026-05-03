import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Collaboration(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="repo-setting-content">
		<h4 className="ui top attached header">
			{i18n("repo.settings.collaboration")}
		</h4>
		{(props.collaborators) ? (<>
		<div className="ui attached segment">
			<div className="flex-divided-list items-with-main">
				{((props.collaborators) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
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
							<div className="flex-text-block">
								<span className="svg-icon" aria-label="octicon-shield-lock"></span>
								<div className="ui dropdown custom access-mode" data-url={`${String(props.link ?? "")}/access_mode`} data-uid={String(props.iD ?? "")} data-last-value={String(props.collaboration?.mode ?? "")}>
									<div className="text">{(item.collaboration?.mode === 1) ? (<>{i18n("repo.settings.collaboration.read")}</>) : null} {(item.collaboration?.mode === 2) ? (<>{i18n("repo.settings.collaboration.write")}</>) : null} {(item.collaboration?.mode === 3) ? (<>{i18n("repo.settings.collaboration.admin")}</>) : (<>{i18n("repo.settings.collaboration.undefined")}</>)}</div>
									<span className="svg-icon" aria-label="octicon-triangle-down"></span>
									<div className="menu">
										<div className="item" data-value="3">{i18n("repo.settings.collaboration.admin")}</div>
										<div className="item" data-value="2">{i18n("repo.settings.collaboration.write")}</div>
										<div className="item" data-value="1">{i18n("repo.settings.collaboration.read")}</div>
									</div>
								</div>
							</div>
							<button className="ui red tiny button link-action" data-modal-confirm="#repo-collaborator-delete-modal" data-url={`${String(props.link ?? "")}/delete?id=${String(props.iD ?? "")}`}>
								{i18n("repo.settings.delete_collaborator")}
							</button>
						</div>
					</div>
				</React.Fragment>))}
			</div>
		</div>
		</>) : null}
		<div className="ui bottom attached segment">
			<form className="ui form" id="repo-collab-form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div id="search-user-box" className="ui search input tw-align-middle">
					<input className="prompt" name="collaborator" placeholder={String(i18n("search.user_kind") ?? "")} autocomplete="off" autofocus required />
				</div>
				<button className="ui primary button">{i18n("repo.settings.add_collaborator")}</button>
			</form>
		</div>

		{(props.repository?.owner?.isOrganization) ? (<>
			<h4 className="ui top attached header">
				{i18n("repo.settings.teams")}
			</h4>
			{/* $allowedToChangeTeams */}
			{(props.teams) ? (<>
			<div className="ui attached segment">
				<div className="flex-divided-list items-with-main">
					{((props.teams) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<div className="item">
							<div className="item-main">
								<a className="item-title tw-text-primary" href={`/org/${String(props.orgName|PathEscape ?? "")}/teams/${String(props.lowerName|PathEscape ?? "")}`}>
									{item.name as any}
								</a>
								<div className="item-body flex-text-block">
									{/* FIXME: TEAM-UNIT-PERMISSION this display is not right, search the fixme keyword to see more details */}
									<span className="svg-icon" aria-label="octicon-shield-lock"></span>
									{(item.accessMode === 0) ? (<>
										{i18n("repo.settings.collaboration.per_unit")}
									</>) : null} {(item.accessMode === 1) ? (<>
										{i18n("repo.settings.collaboration.read")}
									</>) : null} {(item.accessMode === 2) ? (<>
										{i18n("repo.settings.collaboration.write")}
									</>) : null} {(item.accessMode === 3) ? (<>
										{i18n("repo.settings.collaboration.admin")}
									</>) : null} {(item.accessMode === 4) ? (<>
										{i18n("repo.settings.collaboration.owner")}
									</>) : (<>
										{i18n("repo.settings.collaboration.undefined")}
									</>)}
								</div>
								{((item.accessMode === 0 || item.accessMode === 1 || item.accessMode === 2)) ? (<>
									{/* $first */}
												<div className="item-body" data-tooltip-content={String(i18n("repo.settings.change_team_permission_tip") ?? "")}>
										Units:
										{((props.units) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
											{((props.repo?.unitEnabled?.(ctx, item.unit?.type) && item.team?.unitEnabled?.(ctx, item.unit?.type))) ? (<>
												{/* TODO: {{Iif $first "" ", "}} */}{/* TODO: {{ctx.Locale.Tr $unit.NameKey}} */}
												{/* TODO: {{$first = false}} */}
											</>) : null}
										</React.Fragment>))}
										{...(props.first ? {"None": true} : {})}
									</div>
								</>) : null}
							</div>
							{(props.allowedToChangeTeams) ? (<>
								<div className="item-trailing" {...(item.includesAllRepositories ? {"data-tooltip-content": String(i18n("repo.settings.delete_team_tip") ?? "")} : {})}>
									<button className={`ui red tiny button link-action ${(props.includesAllRepositories) ? `disabled` : ""}`} data-modal-confirm="#repo-collaborator-delete-modal" data-url={`${String(props.link ?? "")}/team/delete?id=${String(props.iD ?? "")}`}>
											{i18n("repo.settings.delete_collaborator")}
									</button>
								</div>
							</>) : null}
						</div>
					</React.Fragment>))}
				</div>
			</div>
			</>) : null}
			<div className="ui bottom attached segment">
				{(props.allowedToChangeTeams) ? (<>
					<form className="ui form" id="repo-collab-team-form" action={`${String(props.link ?? "")}/team`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
						<div id="search-team-box" className="ui search input tw-align-middle" data-org-name={String(props.orgName ?? "")}>
							<input className="prompt" name="team" placeholder={String(i18n("search.team_kind") ?? "")} autocomplete="off" required />
						</div>
						<button className="ui primary button">{i18n("repo.settings.add_team")}</button>
					</form>
				</>) : (<>
					<div className="item">
						{i18n("repo.settings.change_team_access_not_allowed")}
					</div>
				</>)}
			</div>
		</>) : null}
	</div>

<div className="ui small modal" id="repo-collaborator-delete-modal">
	<div className="header"><span className="svg-icon" aria-label="octicon-trash"></span> {i18n("repo.settings.collaborator_deletion")}</div>
	<div className="content"><p>{i18n("repo.settings.collaborator_deletion_desc")}</p></div>
	{/* template: base/modal_actions_confirm */}
</div>

{/* template: repo/settings/layout_footer */}

  </>)
}
