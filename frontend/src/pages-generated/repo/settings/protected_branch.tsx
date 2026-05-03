// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ProtectedBranch(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="repo-setting-content">
		<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<h4 className="ui top attached header">
				{(props.rule?.ruleName) ? (<>
					{i18n("repo.settings.branch_protection")}
				</>) : (<>
					{i18n("repo.settings.branches.add_new_rule")}
				</>)}
			</h4>
			<div className="ui attached segment branch-protection">
				<h5 className="ui dividing header">{i18n("repo.settings.protect_patterns")}</h5>
				<div className="field required">
					<label>{i18n("repo.settings.protect_branch_name_pattern")}</label>
					<input name="rule_name" type="text" value={String(props.rule?.ruleName ?? "")} required />
					<input name="rule_id" type="hidden" value={String(props.rule?.iD ?? "")} />
					<p className="help tw-ml-0">{i18n("repo.settings.protect_branch_name_pattern_desc")}</p>
				</div>
				<div className="field">
					<label>{i18n("repo.settings.protect_protected_file_patterns")}</label>
					<input name="protected_file_patterns" type="text" value={String(props.rule?.protectedFilePatterns ?? "")} />
					<p className="help tw-ml-0">{i18n("repo.settings.protect_protected_file_patterns_desc")}</p>
				</div>
				<div className="field">
					<label>{i18n("repo.settings.protect_unprotected_file_patterns")}</label>
					<input name="unprotected_file_patterns" type="text" value={String(props.rule?.unprotectedFilePatterns ?? "")} />
					<p className="help tw-ml-0">{i18n("repo.settings.protect_unprotected_file_patterns_desc")}</p>
				</div>

				<h5 className="ui dividing header">{i18n("repo.settings.event_push")}</h5>
				<div className="field">
					<div className="ui radio checkbox">
						<input name="enable_push" type="radio" value="none" className="toggle-target-disabled" data-target="#whitelist_box" {...(!(props.rule?.canPush) ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.protect_disable_push")}</label>
						<p className="help">{i18n("repo.settings.protect_disable_push_desc")}</p>
					</div>
				</div>
				<div className="field">
					<div className="ui radio checkbox">
						<input name="enable_push" type="radio" value="all" className="toggle-target-disabled" data-target="#whitelist_box" {...((props.rule?.canPush && !(props.rule?.enableWhitelist)) ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.protect_enable_push")}</label>
						<p className="help">{i18n("repo.settings.protect_enable_push_desc")}</p>
					</div>
				</div>
				<div className="grouped fields">
					<div className="field">
						<div className="ui radio checkbox">
							<input name="enable_push" type="radio" value="whitelist" className="toggle-target-enabled" data-target="#whitelist_box" {...((props.rule?.canPush && props.rule?.enableWhitelist) ? {"checked": true} : {})} />
							<label>{i18n("repo.settings.protect_whitelist_committers")}</label>
							<p className="help">{i18n("repo.settings.protect_whitelist_committers_desc")}</p>
						</div>
					</div>
					<div id="whitelist_box" className={`grouped fields ${(!(props.rule?.enableWhitelist)) ? `disabled` : ""}`}>
						<div className="checkbox-sub-item field">
							<label>{i18n("repo.settings.protect_whitelist_users")}</label>
							<div className="ui multiple search selection dropdown">
								<input type="hidden" name="whitelist_users" value={String(props.whitelist_users ?? "")} />
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
							<div className="checkbox-sub-item field">
								<label>{i18n("repo.settings.protect_whitelist_teams")}</label>
								<div className="ui multiple search selection dropdown">
									<input type="hidden" name="whitelist_teams" value={String(props.whitelist_teams ?? "")} />
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
						<div className="checkbox-sub-item field">
							<div className="ui checkbox">
								<input type="checkbox" name="whitelist_deploy_keys" {...(props.rule?.whitelistDeployKeys ? {"checked": true} : {})} />
								<label>{i18n("repo.settings.protect_whitelist_deploy_keys")}</label>
							</div>
						</div>
					</div>
				</div>
				<div className="field">
					<div className="ui checkbox">
						<input name="require_signed_commits" type="checkbox" {...(props.rule?.requireSignedCommits ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.require_signed_commits")}</label>
						<p className="help">{i18n("repo.settings.require_signed_commits_desc")}</p>
					</div>
				</div>
				<h5 className="ui dividing header">{i18n("repo.settings.event_force_push")}</h5>
				<div className="field">
					<div className="ui radio checkbox">
						<input type="radio" name="enable_force_push" value="none" className="toggle-target-disabled" data-target="#force_push_allowlist_box" {...(!(props.rule?.canForcePush) ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.protect_disable_force_push")}</label>
						<p className="help">{i18n("repo.settings.protect_disable_force_push_desc")}</p>
					</div>
				</div>
				<div className="field">
					<div className="ui radio checkbox">
						<input type="radio" name="enable_force_push" value="all" className="toggle-target-disabled" data-target="#force_push_allowlist_box" {...((props.rule?.canForcePush && !(props.rule?.enableForcePushAllowlist)) ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.protect_enable_force_push_all")}</label>
						<p className="help">{i18n("repo.settings.protect_enable_force_push_all_desc")}</p>
					</div>
				</div>
				<div className="grouped fields">
					<div className="field">
						<div className="ui radio checkbox">
							<input type="radio" name="enable_force_push" value="whitelist" className="toggle-target-enabled" data-target="#force_push_allowlist_box" {...((props.rule?.canForcePush && props.rule?.enableForcePushAllowlist) ? {"checked": true} : {})} />
							<label>{i18n("repo.settings.protect_enable_force_push_allowlist")}</label>
							<p className="help">{i18n("repo.settings.protect_enable_force_push_allowlist_desc")}</p>
						</div>
					</div>
					<div id="force_push_allowlist_box" className={`grouped fields ${(!(props.rule?.enableForcePushAllowlist)) ? `disabled` : ""}`}>
						<div className="checkbox-sub-item field">
							<label>{i18n("repo.settings.protect_force_push_allowlist_users")}</label>
							<div className="ui multiple search selection dropdown">
								<input type="hidden" name="force_push_allowlist_users" value={String(props.force_push_allowlist_users ?? "")} />
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
							<div className="checkbox-sub-item field">
								<label>{i18n("repo.settings.protect_force_push_allowlist_teams")}</label>
								<div className="ui multiple search selection dropdown">
									<input type="hidden" name="force_push_allowlist_teams" value={String(props.force_push_allowlist_teams ?? "")} />
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
						<div className="checkbox-sub-item field">
							<div className="ui checkbox">
								<input type="checkbox" name="force_push_allowlist_deploy_keys" {...(props.rule?.forcePushAllowlistDeployKeys ? {"checked": true} : {})} />
								<label>{i18n("repo.settings.protect_force_push_allowlist_deploy_keys")}</label>
							</div>
						</div>
					</div>
				</div>
				<h5 className="ui dividing header">{i18n("repo.settings.event_pull_request_approvals")}</h5>
				<div className="field">
					<label>{i18n("repo.settings.protect_required_approvals")}</label>
					<input name="required_approvals" type="number" value={String(props.rule?.requiredApprovals ?? "")} />
					<p className="help tw-ml-0">{i18n("repo.settings.protect_required_approvals_desc")}</p>
				</div>
				<div className="grouped fields">
					<div className="field">
						<div className="ui checkbox">
							<input name="enable_approvals_whitelist" type="checkbox" className="toggle-target-enabled" data-target="#approvals_whitelist_box" {...(props.rule?.enableApprovalsWhitelist ? {"checked": true} : {})} />
							<label>{i18n("repo.settings.protect_approvals_whitelist_enabled")}</label>
							<p className="help">{i18n("repo.settings.protect_approvals_whitelist_enabled_desc")}</p>
						</div>
					</div>
					<div id="approvals_whitelist_box" className={`grouped fields ${(!(props.rule?.enableApprovalsWhitelist)) ? `disabled` : ""}`}>
						<div className="checkbox-sub-item field">
							<label>{i18n("repo.settings.protect_approvals_whitelist_users")}</label>
							<div className="ui multiple search selection dropdown">
								<input type="hidden" name="approvals_whitelist_users" value={String(props.approvals_whitelist_users ?? "")} />
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
							<div className="checkbox-sub-item field">
								<label>{i18n("repo.settings.protect_approvals_whitelist_teams")}</label>
								<div className="ui multiple search selection dropdown">
									<input type="hidden" name="approvals_whitelist_teams" value={String(props.approvals_whitelist_teams ?? "")} />
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
					</div>
				</div>
				<div className="field">
					<div className="ui checkbox">
						<input id="dismiss_stale_approvals" name="dismiss_stale_approvals" type="checkbox" {...(props.rule?.dismissStaleApprovals ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.dismiss_stale_approvals")}</label>
						<p className="help">{i18n("repo.settings.dismiss_stale_approvals_desc")}</p>
					</div>
				</div>
				<div id="ignore_stale_approvals_box" className={`field ${(props.rule?.dismissStaleApprovals) ? `disabled` : ""}`}>
					<div className="ui checkbox">
						<input id="ignore_stale_approvals" name="ignore_stale_approvals" type="checkbox" {...(props.rule?.ignoreStaleApprovals ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.ignore_stale_approvals")}</label>
						<p className="help">{i18n("repo.settings.ignore_stale_approvals_desc")}</p>
					</div>
				</div>
				<div className="grouped fields">
					<div className="field">
						<div className="ui checkbox">
							<input name="enable_status_check" type="checkbox" className="toggle-target-enabled" data-target="#statuscheck_contexts_box" {...(props.rule?.enableStatusCheck ? {"checked": true} : {})} />
							<label>{i18n("repo.settings.protect_check_status_contexts")}</label>
							<p className="help">{i18n("repo.settings.protect_check_status_contexts_desc")}</p>
						</div>
					</div>
					<div id="statuscheck_contexts_box" className={`checkbox-sub-item field ${(!(props.rule?.enableStatusCheck)) ? `disabled` : ""}`}>
						<label>{i18n("repo.settings.protect_status_check_patterns")}</label>
						<textarea id="status_check_contexts" name="status_check_contexts" rows="3">{props.status_check_contexts as any}</textarea>
						<p className="help">{i18n("repo.settings.protect_status_check_patterns_desc")}</p>
						<table className="ui celled table">
							<thead>
								<tr>
									<th>{i18n("repo.settings.protect_check_status_contexts_list")}</th>
								</tr>
							</thead>
							<tbody>
							{((props.recent_status_checks) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<tr>
									<td>
										<span>{item as any}</span>
										<span className="status-check-matched-mark tw-hidden" data-status-check={String("" ?? "")}>{i18n("repo.settings.protect_status_check_matched")}</span>
									</td>
								</tr>
							{/* else */}
								<tr><td>-</td></tr>
							</React.Fragment>))}
							</tbody>
						</table>
					</div>
				</div>
				<h5 className="ui dividing header">{i18n("repo.settings.event_pull_request_merge")}</h5>
				<div className="grouped fields">
					<div className="field">
						<div className="ui radio checkbox">
							<input name="enable_merge_whitelist" type="radio" value="false" className="toggle-target-disabled" data-target="#merge_whitelist_box" {...(!(props.rule?.enableMergeWhitelist) ? {"checked": true} : {})} />
							<label>{i18n("repo.settings.protect_enable_merge")}</label>
							<p className="help">{i18n("repo.settings.protect_enable_merge_desc")}</p>
						</div>
					</div>
					<div className="field">
						<div className="ui radio checkbox">
							<input name="enable_merge_whitelist" type="radio" value="true" className="toggle-target-enabled" data-target="#merge_whitelist_box" {...(props.rule?.enableMergeWhitelist ? {"checked": true} : {})} />
							<label>{i18n("repo.settings.protect_merge_whitelist_committers")}</label>
							<p className="help">{i18n("repo.settings.protect_merge_whitelist_committers_desc")}</p>
						</div>
					</div>
					<div id="merge_whitelist_box" className={`grouped fields ${(!(props.rule?.enableMergeWhitelist)) ? `disabled` : ""}`}>
						<div className="checkbox-sub-item field">
							<label>{i18n("repo.settings.protect_merge_whitelist_users")}</label>
							<div className="ui multiple search selection dropdown">
								<input type="hidden" name="merge_whitelist_users" value={String(props.merge_whitelist_users ?? "")} />
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
						<div className="checkbox-sub-item field">
							<label>{i18n("repo.settings.protect_merge_whitelist_teams")}</label>
							<div className="ui multiple search selection dropdown">
								<input type="hidden" name="merge_whitelist_teams" value={String(props.merge_whitelist_teams ?? "")} />
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
					</div>
				</div>
				<div className="field">
					<div className="ui checkbox">
						<input name="block_on_rejected_reviews" type="checkbox" {...(props.rule?.blockOnRejectedReviews ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.block_rejected_reviews")}</label>
						<p className="help">{i18n("repo.settings.block_rejected_reviews_desc")}</p>
					</div>
				</div>
				<div className="field">
					<div className="ui checkbox">
						<input name="block_on_official_review_requests" type="checkbox" {...(props.rule?.blockOnOfficialReviewRequests ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.block_on_official_review_requests")}</label>
						<p className="help">{i18n("repo.settings.block_on_official_review_requests_desc")}</p>
					</div>
				</div>
				<div className="field">
					<div className="ui checkbox">
						<input name="block_on_outdated_branch" type="checkbox" {...(props.rule?.blockOnOutdatedBranch ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.block_outdated_branch")}</label>
						<p className="help">{i18n("repo.settings.block_outdated_branch_desc")}</p>
					</div>
				</div>
				<div className="field">
					<div className="ui checkbox">
						<input name="block_admin_merge_override" type="checkbox" {...(props.rule?.blockAdminMergeOverride ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.block_admin_merge_override")}</label>
						<p className="help">{i18n("repo.settings.block_admin_merge_override_desc")}</p>
					</div>
				</div>
				<div className="divider"></div>

				<div className="field">
					<button className="ui primary button">{i18n("repo.settings.protected_branch.save_rule")}</button>
				</div>
			</div>
		</form>
	</div>
{/* template: repo/settings/layout_footer */}

  </>)
}
