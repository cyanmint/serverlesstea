import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Tags(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="repo-setting-content">
		{(props.repository?.isArchived) ? (<>
			<div className="ui warning message tw-text-center">
				{i18n("repo.settings.archive.tagsettings_unavailable")}
			</div>
		</>) : (<>
			<h4 className="ui top attached header">
				{i18n("repo.settings.tags.protection")}
			</h4>

			<div className="ui attached segment">
				<div className="ui grid">
					<div className="sixteen wide column">
						<div className="ui segment">
							<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
								<div className="field">
									<label>{i18n("repo.settings.tags.protection.pattern")}</label>
									<div id="search-tag-box" className="ui search">
										<div className="ui input">
											<input className="prompt" name="name_pattern" autocomplete="off" value={String(props.name_pattern ?? "")} placeholder="v*" autofocus required />
										</div>
										<div className="help">{i18n("repo.settings.tags.protection.pattern.description")}</div>
									</div>
								</div>
								<div className="whitelist field">
									<label>{i18n("repo.settings.tags.protection.allowed.users")}</label>
									<div className="ui multiple search selection dropdown">
										<input type="hidden" name="allowlist_users" value={String(props.allowlist_users ?? "")} />
										<div className="default text">{i18n("search.user_kind")}</div>
										<div className="menu">
											{((props.users) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
												<div className="item" data-value={String(props.iD ?? "")}>
													{/* TODO: {{ctx.AvatarUtils.Avatar . 28 "mini"}} */}{/* template: repo/search_name */}
												</div>
											</React.Fragment>))}
										</div>
									</div>
								</div>
								{(props.owner?.isOrganization) ? (<>
									<div className="whitelist field">
										<label>{i18n("repo.settings.tags.protection.allowed.teams")}</label>
										<div className="ui multiple search selection dropdown">
											<input type="hidden" name="allowlist_teams" value={String(props.allowlist_teams ?? "")} />
											<div className="default text">{i18n("search.team_kind")}</div>
											<div className="menu">
												{((props.teams) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
													<div className="item" data-value={String(props.iD ?? "")}>
														<span className="svg-icon" aria-label="octicon-people"></span>
														{item.name as any}
													</div>
												</React.Fragment>))}
											</div>
										</div>
									</div>
								</>) : null}
								<div className="field">
									{(props.pageIsEditProtectedTag) ? (<>
									<button className="ui primary button">
										{i18n("save")}
									</button>
									<a className="ui primary button" href={`${String(props.repoLink ?? "")}/settings/tags`}>
										{i18n("cancel")}
									</a>
									</>) : (<>
									<button className="ui primary button">
										{i18n("repo.settings.tags.protection.create")}
									</button>
									</>)}
								</div>
							</form>
						</div>
					</div>

					<div className="sixteen wide column">
						<table className="ui single line table">
							<thead>
								<th>{i18n("repo.settings.tags.protection.pattern")}</th>
								<th>{i18n("repo.settings.tags.protection.allowed")}</th>
								<th></th>
							</thead>
							<tbody>
								{((props.protectedTags) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									<tr>
										<td><pre>{item.namePattern as any}</pre></td>
										<td>
											{((item.allowlistUserIDs || (props.owner?.isOrganization && item.allowlistTeamIDs))) ? (<>
												{/* $userIDs */}
												{((props.users) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
													{("SliceUtils.Contains $userIDs .ID") ? (<>
														<a className="ui basic label" href={String(props.homeLink ?? "")}>{/* TODO: {{ctx.AvatarUtils.Avatar . 26}} */} {item.getDisplayName as any}</a>
													</>) : null}
												</React.Fragment>))}
												{(props.owner?.isOrganization) ? (<>
													{/* $teamIDs */}
													{((props.teams) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
														{("SliceUtils.Contains $teamIDs .ID") ? (<>
															<a className="ui basic label" href={`${String(props.owner?.organisationLink ?? "")}/teams/`}>{item.name as any}</a>
														</>) : null}
													</React.Fragment>))}
												</>) : null}
											</>) : (<>
												{i18n("repo.settings.tags.protection.allowed.noone")}
											</>)}
										</td>
										<td className="tw-text-right">
											<a className="ui tiny primary button" href={`${String(props.repoLink ?? "")}/settings/tags/${String(props.iD ?? "")}`}>{i18n("edit")}</a>
											<form className="tw-inline-block" action={`${String(props.repoLink ?? "")}/settings/tags/delete`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
												<input type="hidden" name="id" value={String(props.iD ?? "")} />
												<button className="ui tiny red button">{i18n("remove")}</button>
											</form>
										</td>
									</tr>
								{/* else */}
									<tr className="tw-text-center"><td colspan="3">{i18n("repo.settings.tags.protection.none")}</td></tr>
								</React.Fragment>))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>)}
	</div>
{/* template: repo/settings/layout_footer */}

  </>)
}
