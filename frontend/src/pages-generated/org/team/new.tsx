// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function New(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content organization new team">
	{/* template: org/header */}
	<div className="ui container">
		<div className="ui grid">
			<div className="column">
				<form className="ui form" action={`${(props.pageIsOrgTeamsNew) ? `${String(props.orgLink ?? "")}/teams/new` : `${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName?.("|", "PathEscape") ?? "")}/edit`}`} data-delete-url={`${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName?.("|", "PathEscape") ?? "")}/delete`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					<h3 className="ui top attached header">
						{(props.pageIsOrgTeamsNew) ? (<>{i18n("org.create_new_team")}</>) : (<>{i18n("org.teams.settings")}</>)}
					</h3>
					<div className="ui attached segment">
						{/* alert */}
						<div className={`required field ${(props.err_TeamName) ? `error` : ""}`}>
							<label htmlFor="team_name">{i18n("org.team_name")}</label>
							{(props.team?.lowerName === "owners") ? (<>
								<input type="hidden" name="team_name" value={String(props.team?.name ?? "")} />
							</>) : null}
							<input id="team_name" name="team_name" value={String(props.team?.name ?? "")} required {...(props.team?.lowerName === "owners" ? {"disabled": true} : {})} autofocus />
							<span className="help">{i18n("org.team_name_helper")}</span>
						</div>
						<div className={`field ${(props.err_Description) ? `error` : ""}`}>
							<label htmlFor="description">{i18n("org.team_desc")}</label>
							<input id="description" name="description" value={String(props.team?.description ?? "")} maxlength="255" />
							<span className="help">{i18n("org.team_desc_helper")}</span>
						</div>
						{(!(props.team?.lowerName === "owners")) ? (<>
							<div className="grouped field">
								<label>{i18n("org.team_access_desc")}</label>
								<br />
								<div className="field">
									<div className="ui radio checkbox">
										<input type="radio" name="repo_access" value="specific" {...(!(props.team?.includesAllRepositories) ? {"checked": true} : {})} />
										<label>{i18n("org.teams.specific_repositories")}</label>
										<span className="help">{i18n("org.teams.specific_repositories_helper")}</span>
									</div>
								</div>
								<div className="field">
									<div className="ui radio checkbox">
										<input type="radio" name="repo_access" value="all" {...(props.team?.includesAllRepositories ? {"checked": true} : {})} />
										<label>{i18n("org.teams.all_repositories")}</label>
										<span className="help">{i18n("org.teams.all_repositories_helper")}</span>
									</div>
								</div>

								<div className="field">
									<div className="ui checkbox">
										<label htmlFor="can_create_org_repo">{i18n("org.teams.can_create_org_repo")}</label>
										<input id="can_create_org_repo" name="can_create_org_repo" type="checkbox" {...(props.team?.canCreateOrgRepo ? {"checked": true} : {})} />
										<span className="help">{i18n("org.teams.can_create_org_repo_helper")}</span>
									</div>
								</div>
							</div>
							<div className="grouped field">
								<label>{i18n("org.team_permission_desc")}</label>
								<br />
								<div className="field">
									<div className="ui radio checkbox">
										<input type="radio" name="permission" value="read" {...((props.pageIsOrgTeamsNew || props.team?.accessMode === 0 || props.team?.accessMode === 1 || props.team?.accessMode === 2) ? {"checked": true} : {})} />
										<label>{i18n("org.teams.general_access")}</label>
										<span className="help">{i18n("org.teams.general_access_helper")}</span>
									</div>
								</div>
								<div className="field">
									<div className="ui radio checkbox">
										<input type="radio" name="permission" value="admin" {...(props.team?.accessMode === 3 ? {"checked": true} : {})} />
										<label>{i18n("org.teams.admin_access")}</label>
										<span className="help">{i18n("org.teams.admin_access_helper")}</span>
									</div>
								</div>
							</div>
							<div className="divider"></div>

							<div className={`team-units required grouped field ${(props.team?.accessMode === 3) ? `tw-hidden` : ""}`}>
								<label>{i18n("org.team_unit_desc")}</label>
								<table className="ui celled table">
									<thead>
										<tr>
											<th>{i18n("units.unit")}</th>
											<th className="tw-text-center">{i18n("org.teams.none_access")}
											<span className="tw-align-middle" data-tooltip-content={String(i18n("org.teams.none_access_helper") ?? "")}><span className="svg-icon" aria-label="octicon-question"></span></span></th>
											<th className="tw-text-center">{i18n("org.teams.read_access")}
											<span className="tw-align-middle" data-tooltip-content={String(i18n("org.teams.read_access_helper") ?? "")}><span className="svg-icon" aria-label="octicon-question"></span></span></th>
											<th className="tw-text-center">{i18n("org.teams.write_access")}
											<span className="tw-align-middle" data-tooltip-content={String(i18n("org.teams.write_access_helper") ?? "")}><span className="svg-icon" aria-label="octicon-question"></span></span></th>
										</tr>
									</thead>
									<tbody>
										{((props.units) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
											{(item.unit?.maxPerm >= 2) ? (<>
												<tr>
													<td>
														<div {...(item.unit?.type?.unitGlobalDisabled ? {"className": "field", "data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {"className": "field"})}>
															<div>
																<label>{/* TODO: {{ctx.Locale.Tr $unit.NameKey}} */}{(item.unit?.type?.unitGlobalDisabled) ? (<> {i18n("org.team_unit_disabled")}</>) : null}</label>
																<span className="help">{/* TODO: {{ctx.Locale.Tr $unit.DescKey}} */}</span>
															</div>
														</div>
													</td>
													<td className="tw-text-center">
														<div className="ui radio checkbox">
															<input type="radio" name={`unit_`} value="0"{...((item.unit?.type?.unitGlobalDisabled || props.team?.unitAccessMode?.(ctx, item.unit?.type) === 0) ? {"checked": true} : {})} title={String(i18n("org.teams.none_access") ?? "")} />
														</div>
													</td>
													<td className="tw-text-center">
														<div className="ui radio checkbox">
															<input type="radio" name={`unit_`} value="1"{...((props.team?.iD === 0 || props.team?.unitAccessMode?.(ctx, item.unit?.type) === 1) ? {"checked": true} : {})} {...(item.unit?.type?.unitGlobalDisabled ? {"disabled": true} : {})} title={String(i18n("org.teams.read_access") ?? "")} />
														</div>
													</td>
													<td className="tw-text-center">
														<div className="ui radio checkbox">
															<input type="radio" name={`unit_`} value="2"{...(props.team?.unitAccessMode?.(ctx, item.unit?.type) >= 2 ? {"checked": true} : {})} {...(item.unit?.type?.unitGlobalDisabled ? {"disabled": true} : {})} title={String(i18n("org.teams.write_access") ?? "")} />
														</div>
													</td>
												</tr>
											</>) : null}
										</React.Fragment>))}
									</tbody>
								</table>
								{((props.units) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									{(item.unit?.maxPerm < 2) ? (<>
										<div {...(item.unit?.type?.unitGlobalDisabled ? {"className": "field", "data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {"className": "field"})}>
											<div className="ui checkbox">
												<input type="checkbox" name={`unit_`} value="1"{...((props.team?.iD === 0 || props.team?.unitAccessMode?.(ctx, item.unit?.type) === 1) ? {"checked": true} : {})} {...(item.unit?.type?.unitGlobalDisabled ? {"disabled": true} : {})} />
												<label>{/* TODO: {{ctx.Locale.Tr $unit.NameKey}} */}{(item.unit?.type?.unitGlobalDisabled) ? (<> {i18n("org.team_unit_disabled")}</>) : null}</label>
												<span className="help">{/* TODO: {{ctx.Locale.Tr $unit.DescKey}} */}</span>
											</div>
										</div>
									</>) : null}
								</React.Fragment>))}
							</div>
						</>) : null}

						<div className="field">
							{(props.pageIsOrgTeamsNew) ? (<>
								<button className="ui primary button">{i18n("org.create_team")}</button>
							</>) : (<>
								<button className="ui primary button">{i18n("org.teams.update_settings")}</button>
								{(!(props.team?.lowerName === "owners")) ? (<>
									<button className="ui red button delete-button" data-url={`${String(props.orgLink ?? "")}/teams/${String(props.team?.name?.("|", "PathEscape") ?? "")}/delete`}>{i18n("org.teams.delete_team")}</button>
								</>) : null}
							</>)}
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<div className="ui g-modal-confirm delete modal">
	<div className="header">
		<span className="svg-icon" aria-label="octicon-trash"></span>
		{i18n("org.teams.delete_team_title")}
	</div>
	<div className="content">
		<p>{i18n("org.teams.delete_team_desc")}</p>
	</div>
	{/* template: base/modal_actions_confirm */}
</div>


  </>)
}
