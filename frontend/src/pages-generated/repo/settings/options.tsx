import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Options(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="user-main-content twelve wide column">
		<h4 className="ui top attached header">
			{i18n("repo.settings.basic_settings")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				{/* template: base/disable_form_autofill */}
				<input type="hidden" name="action" value="update" />
				<div className={`required field ${(props.err_RepoName) ? `error` : ""}`}>
					<label>{i18n("repo.repo_name")}</label>
					<input name="repo_name" value={String(props.repository?.name ?? "")} data-repo-name={String(props.repository?.name ?? "")} required />
				</div>
				<div className="inline field">
					<label>{i18n("repo.repo_size")}</label>
					<span {...(!(props.repository?.size === 0) ? {"data-tooltip-content": String(props.repository?.sizeDetailsString ?? "")} : {})}>{/* TODO: {{FileSize .Repository.Size}} */}</span>
				</div>
				<div className="inline field">
					<label>{i18n("repo.template")}</label>
					<div className="ui checkbox">
						<input name="template" type="checkbox" {...(props.repository?.isTemplate ? {"checked": true} : {})} />
						<label>{i18n("repo.template_helper")}</label>
					</div>
				</div>
				<div className={`field ${(props.err_Description) ? `error` : ""}`}>
					<label htmlFor="description">{i18n("repo.repo_desc")}</label>
					<textarea id="description" name="description" rows="2" maxlength="2048">{props.repository?.description as any}</textarea>
				</div>
				<div className={`field ${(props.err_Website) ? `error` : ""}`}>
					<label htmlFor="website">{i18n("repo.settings.site")}</label>
					<input id="website" name="website" type="url" maxlength="1024" value={String(props.repository?.website ?? "")} />
				</div>
				<div className="field">
					<button className="ui primary button">{i18n("repo.settings.update_settings")}</button>
				</div>
			</form>

			<div className="divider"></div>
			<form className="ui form" action={`${String(props.link ?? "")}/avatar`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} enctype="multipart/form-data">
				<div className="inline field">
					{/* template: shared/avatar_upload_crop */}
				</div>
				<div className="field">
					<button className="ui primary button">{i18n("settings.update_avatar")}</button>
					<button className="ui red button link-action" data-url={`${String(props.link ?? "")}/avatar/delete`}>{i18n("settings.delete_current_avatar")}</button>
				</div>
			</form>
		</div>

		{/* These variables exist to make the logic in the Settings window easier to comprehend and are not used later on. */}
		{/* $newMirrorsPartiallyEnabled */}
		{/* .Repository.IsMirror is not always reliable if the repository is not actively acting as a mirror because of errors. */}
		{/* $showMirrorSettings */}
		{/* $newMirrorsEntirelyEnabled */}
		{/* $onlyNewPushMirrorsEnabled */}
		{/* $onlyNewPullMirrorsEnabled */}
		{/* $existingPushMirror */}
		{/* $modifyBrokenPullMirror */}
		{/* $isWorkingPullMirror */}

		{(showMirrorSettings) ? (<>
			<h4 className="ui top attached header">
				{i18n("repo.settings.mirror_settings")}
			</h4>
			<div className="ui attached segment">
				{(props.repository?.isArchived) ? (<>
					<div className="ui warning message tw-text-center">
						{i18n("repo.settings.archive.mirrors_unavailable")}
					</div>
				</>) : (<>
					{(newMirrorsEntirelyEnabled) ? (<>
						{i18n("repo.settings.mirror_settings.docs")}
						<a target="_blank" href="https://docs.gitea.com/usage/repo-mirror#pushing-to-a-remote-repository">{i18n("repo.settings.mirror_settings.docs.doc_link_title")}</a><br /><br />
						{i18n("repo.settings.mirror_settings.docs.pull_mirror_instructions")}
						<a target="_blank" href="https://docs.gitea.com/usage/repo-mirror#pulling-from-a-remote-repository">{i18n("repo.settings.mirror_settings.docs.doc_link_pull_section")}</a><br />
					</>) : null} {(onlyNewPushMirrorsEnabled) ? (<>
						{i18n("repo.settings.mirror_settings.docs.disabled_pull_mirror.instructions")}
						{i18n("repo.settings.mirror_settings.docs.more_information_if_disabled")}
						<a target="_blank" href="https://docs.gitea.com/usage/repo-mirror#pulling-from-a-remote-repository">{i18n("repo.settings.mirror_settings.docs.doc_link_title")}</a><br />
					</>) : null} {(onlyNewPullMirrorsEnabled) ? (<>
						{i18n("repo.settings.mirror_settings.docs.disabled_push_mirror.instructions")}
						{i18n("repo.settings.mirror_settings.docs.disabled_push_mirror.pull_mirror_warning")}
						{i18n("repo.settings.mirror_settings.docs.more_information_if_disabled")}
						<a target="_blank" href="https://docs.gitea.com/usage/repo-mirror#pulling-from-a-remote-repository">{i18n("repo.settings.mirror_settings.docs.doc_link_title")}</a><br /><br />
						{i18n("repo.settings.mirror_settings.docs.disabled_push_mirror.info")}
						{(existingPushMirror) ? (<>
							{i18n("repo.settings.mirror_settings.docs.can_still_use")}
						</>) : null}
					</>) : (<>
						{i18n("repo.settings.mirror_settings.docs.no_new_mirrors")} {i18n("repo.settings.mirror_settings.docs.can_still_use")}<br />
					</>)}

					{(props.repository?.isMirror) ? (<>
					<table className="ui table">
						<thead>
							<tr>
								<th className="tw-w-2/5">{i18n("repo.settings.mirror_settings.mirrored_repository")}</th>
								<th>{i18n("repo.settings.mirror_settings.direction")}</th>
								<th>{i18n("repo.settings.mirror_settings.last_update")}</th>
								<th></th>
							</tr>
						</thead>
						{(modifyBrokenPullMirror) ? (<>
							{/* even if a repo is a pull mirror (IsMirror=true), the PullMirror might still be nil if the mirror migration is broken */}
							<tbody>
								<tr>
									<td colSpan="4">
										<div className="tw-text-red tw-py-4">{i18n("repo.settings.mirror_settings.direction.pull")}: {i18n("error.occurred")}</div>
									</td>
								</tr>
							</tbody>
						</>) : null} {(isWorkingPullMirror) ? (<>
						<tbody>
							<tr>
								<td>{props.pullMirror?.remoteAddress as any}</td>
								<td>{i18n("repo.settings.mirror_settings.direction.pull")}</td>
								<td>{/* TODO: {{DateUtils.FullTime .PullMirror.UpdatedUnix}} */}</td>
								<td className="tw-text-right">
									<form method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} className="tw-inline-block">
										<input type="hidden" name="action" value="mirror-sync" />
										<button className="ui primary tiny button inline">{i18n("repo.settings.sync_mirror")}</button>
									</form>
								</td>
							</tr>
							<tr>
								<td colSpan="4">
									<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
										{/* template: base/disable_form_autofill */}
										<input type="hidden" name="action" value="mirror" />
										<div className={`inline field ${(props.err_EnablePrune) ? `error` : ""}`}>
											<label>{i18n("repo.mirror_prune")}</label>
											<div className="ui checkbox">
										<input id="enable_prune" name="enable_prune" type="checkbox" {...(props.pullMirror?.enablePrune ? {"checked": true} : {})} />
										<label>{i18n("repo.mirror_prune_desc")}</label>
											</div>
										</div>
										<div className={`inline field ${(props.err_Interval) ? `error` : ""}`}>
											<label htmlFor="interval">{i18n("repo.mirror_interval")}</label>
											<input id="interval" name="interval" value={String(props.pullMirror?.interval ?? "")} />
										</div>
										{/* $address */}
										<div className={`field ${(props.err_MirrorAddress) ? `error` : ""}`}>
											<label htmlFor="mirror_address">{i18n("repo.mirror_address")}</label>
											<input id="mirror_address" name="mirror_address" value={String("" ?? "")} required />
											<p className="help">{i18n("repo.mirror_address_desc")}</p>
										</div>
										<details className="ui optional field" {...((props.err_Auth || props.address?.username) ? {"open": true} : {})}>
											<summary className="tw-p-1">
												{i18n("repo.need_auth")}
											</summary>
											<div className="tw-p-1">
												<div className={`inline field ${(props.err_Auth) ? `error` : ""}`}>
													<label htmlFor="mirror_username">{i18n("username")}</label>
													<input id="mirror_username" name="mirror_username" value={String("" ?? "")} {...(!(props.mirror_username) ? {"data-need-clear": "true"} : {})} />
												</div>
												<div className={`inline field ${(props.err_Auth) ? `error` : ""}`}>
													<label htmlFor="mirror_password">{i18n("password")}</label>
													<input id="mirror_password" name="mirror_password" type="password" placeholder={`${(props.address?.password) ? `${i18n("repo.mirror_password_placeholder")}` : `${i18n("repo.mirror_password_blank_placeholder")}`}`} value="" {...(!(props.mirror_password) ? {"data-need-clear": "true"} : {})} autocomplete="off" />
												</div>
												<p className="help">{i18n("repo.mirror_password_help")}</p>
											</div>
										</details>

										{(props.lFSStartServer) ? (<>
										<div className="inline field">
											<label>{i18n("repo.mirror_lfs")}</label>
											<div className="ui checkbox">
												<input id="mirror_lfs" name="mirror_lfs" type="checkbox" {...(props.pullMirror?.lFS ? {"checked": true} : {})} />
												<label>{i18n("repo.mirror_lfs_desc")}</label>
											</div>
										</div>
										<div className={`field ${(props.err_LFSEndpoint) ? `error` : ""}`}>
											<label htmlFor="mirror_lfs_endpoint">{i18n("repo.mirror_lfs_endpoint")}</label>
											<input id="mirror_lfs_endpoint" name="mirror_lfs_endpoint" value={String(props.pullMirror?.lFSEndpoint ?? "")} placeholder={String(i18n("repo.migrate_options_lfs_endpoint.placeholder") ?? "")} />
											<p className="help">{i18n("repo.mirror_lfs_endpoint_desc")}</p>
										</div>
										</>) : null}
										<div className="field">
											<button className="ui primary button">{i18n("repo.settings.update_mirror_settings")}</button>
										</div>
									</form>
								</td>
							</tr>
						</tbody>
						</>) : null}{/* end if: $modifyBrokenPullMirror / $isWorkingPullMirror */}
					</table>
					</>) : null}{/* end if .Repository.IsMirror */}

					<table className="ui table">
						<thead>
							<tr>
								<th className="tw-w-2/5">{i18n("repo.settings.mirror_settings.pushed_repository")}</th>
								<th>{i18n("repo.settings.mirror_settings.direction")}</th>
								<th>{i18n("repo.settings.mirror_settings.last_update")}</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{((props.pushMirrors) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<tr>
								<td className="tw-break-anywhere">{item.remoteAddress as any}</td>
								<td>{i18n("repo.settings.mirror_settings.direction.push")} ({item.interval as any})</td>
								<td>
									<span className="flex-text-block">
										{(item.lastUpdateUnix) ? (<>
											{/* TODO: {{DateUtils.FullTime .LastUpdateUnix}} */}
										</>) : (<>
											{i18n("never")}
										</>)}
										{(item.lastError) ? (<><span className="ui red label" data-tooltip-content={String(props.lastError ?? "")}>{i18n("error_title")}</span></>) : null}
									</span>
								</td>
								<td className="tw-text-right">
									<button
										className="ui tiny button show-modal"
										data-modal="#push-mirror-edit-modal"
										data-tooltip-content={String(i18n("repo.settings.mirror_settings.push_mirror.edit_sync_time") ?? "")}
										data-modal-push-mirror-edit-id={String(props.iD ?? "")}
										data-modal-push-mirror-edit-interval={String(props.interval ?? "")}
										data-modal-push-mirror-edit-address={String(props.remoteAddress ?? "")}
									>
										<span className="svg-icon" aria-label="octicon-pencil"></span>
									</button>
									<form method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} className="tw-inline-block">
										<input type="hidden" name="action" value="push-mirror-sync" />
										<input type="hidden" name="push_mirror_id" value={String(props.iD ?? "")} />
										<button className="ui primary tiny button" data-tooltip-content={String(i18n("repo.settings.sync_mirror") ?? "")}><span className="svg-icon" aria-label="octicon-sync"></span></button>
									</form>
									<form method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} className="tw-inline-block">
										<input type="hidden" name="action" value="push-mirror-remove" />
										<input type="hidden" name="push_mirror_id" value={String(props.iD ?? "")} />
										<button className="ui basic red tiny button" data-tooltip-content={String(i18n("remove") ?? "")}><span className="svg-icon" aria-label="octicon-trash"></span></button>
									</form>
								</td>
							</tr>
							{/* else */}
							<tr>
								<td>{i18n("repo.settings.mirror_settings.push_mirror.none")}</td>
							</tr>
							</React.Fragment>))}
							{(!(props.disableNewPushMirrors)) ? (<>
								<tr>
									<td colSpan="4">
										<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
											{/* template: base/disable_form_autofill */}
											<input type="hidden" name="action" value="push-mirror-add" />
											<div className={`field ${(props.err_PushMirrorAddress) ? `error` : ""}`}>
												<label htmlFor="push_mirror_address">{i18n("repo.settings.mirror_settings.push_mirror.remote_url")}</label>
												<input id="push_mirror_address" name="push_mirror_address" value={String(props.push_mirror_address ?? "")} required />
												<p className="help">{i18n("repo.mirror_address_desc")}</p>
											</div>
											<details className="ui optional field" {...((props.err_PushMirrorAuth || props.push_mirror_username) ? {"open": true} : {})}>
												<summary className="tw-p-1">
													{i18n("repo.need_auth")}
												</summary>
												<div className="tw-p-1">
													<div className={`inline field ${(props.err_PushMirrorAuth) ? `error` : ""}`}>
														<label htmlFor="push_mirror_username">{i18n("username")}</label>
														<input id="push_mirror_username" name="push_mirror_username" value={String(props.push_mirror_username ?? "")} />
													</div>
													<div className={`inline field ${(props.err_PushMirrorAuth) ? `error` : ""}`}>
														<label htmlFor="push_mirror_password">{i18n("password")}</label>
														<input id="push_mirror_password" name="push_mirror_password" type="password" value={String(props.push_mirror_password ?? "")} autocomplete="off" />
													</div>
												</div>
											</details>
											<div className="field">
												<div className="ui checkbox">
													<input id="push_mirror_sync_on_commit" name="push_mirror_sync_on_commit" type="checkbox" {...(props.push_mirror_sync_on_commit ? {"checked": true} : {})} />
													<label htmlFor="push_mirror_sync_on_commit">{i18n("repo.mirror_sync_on_commit")}</label>
												</div>
											</div>
											<div className={`inline field ${(props.err_PushMirrorInterval) ? `error` : ""}`}>
												<label htmlFor="push_mirror_interval">{i18n("repo.mirror_interval")}</label>
												<input id="push_mirror_interval" name="push_mirror_interval" value={`${(props.push_mirror_interval) ? `${String(props.push_mirror_interval ?? "")}` : `${String(props.defaultMirrorInterval ?? "")}`}`} />
											</div>
											<div className="field">
												<button className="ui primary button">{i18n("repo.settings.mirror_settings.push_mirror.add")}</button>
											</div>
										</form>
									</td>
								</tr>
							</>) : null}
						</tbody>
					</table>
				</>)}
			</div>
		</>) : null}

		{/* FIXME: need to split the "Advance Settings" by units, there are too many options here */}
		<h4 className="ui top attached header">
			{i18n("repo.settings.advanced_settings")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<input type="hidden" name="action" value="advanced" />

				{/* $isCodeEnabled */}
				{/* $isCodeGlobalDisabled */}
				<div className="inline field">
					<label>{i18n("repo.code")}</label>
					<div className={`ui checkbox${(isCodeGlobalDisabled) ? ` disabled` : ""}`}{...(isCodeGlobalDisabled ? {"data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {})}>
						<input className="enable-system" name="enable_code" type="checkbox"{...(isCodeEnabled ? {"checked": true} : {})} />
						<label>{i18n("repo.code.desc")}</label>
					</div>
				</div>

				{/* $isInternalWikiEnabled */}
				{/* $isExternalWikiEnabled */}
				{/* $isWikiEnabled */}
				{/* $isWikiGlobalDisabled */}
				{/* $isExternalWikiGlobalDisabled */}
				{/* $isBothWikiGlobalDisabled */}
				<div className="inline field">
					<label>{i18n("repo.wiki")}</label>
					<div className={`ui checkbox${(isBothWikiGlobalDisabled) ? ` disabled` : ""}`}{...(isBothWikiGlobalDisabled ? {"data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {})}>
						<input className="enable-system" name="enable_wiki" type="checkbox" data-target="#wiki_box" {...(isWikiEnabled ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.wiki_desc")}</label>
					</div>
				</div>
				<div className={`field${(!(isWikiEnabled)) ? ` disabled` : ""}`} id="wiki_box">
					<div className="field">
						<div className={`ui radio checkbox${(isWikiGlobalDisabled) ? ` disabled` : ""}`}{...(isWikiGlobalDisabled ? {"data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {})}>
							<input className="enable-system-radio" name="enable_external_wiki" type="radio" value="false" data-context="#internal_wiki_box" data-target="#external_wiki_box" {...(isInternalWikiEnabled ? {"checked": true} : {})} />
							<label>{i18n("repo.settings.use_internal_wiki")}</label>
						</div>
					</div>
					<div id="internal_wiki_box" className={`field tw-pl-4 ${(!(isInternalWikiEnabled)) ? `disabled` : ""}`}>
						<div className="inline field">
							<label>{i18n("repo.settings.default_wiki_branch_name")}</label>
							<input name="default_wiki_branch" value={String(props.repository?.defaultWikiBranch ?? "")} />
						</div>
					</div>
					<div className="field">
						<div className={`ui radio checkbox${(isExternalWikiGlobalDisabled) ? ` disabled` : ""}`}{...(isExternalWikiGlobalDisabled ? {"data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {})}>
							<input className="enable-system-radio" name="enable_external_wiki" type="radio" value="true" data-context="#internal_wiki_box" data-target="#external_wiki_box" {...(isExternalWikiEnabled ? {"checked": true} : {})} />
							<label>{i18n("repo.settings.use_external_wiki")}</label>
						</div>
					</div>
					<div id="external_wiki_box" className={`field tw-pl-4 ${(!(isExternalWikiEnabled)) ? `disabled` : ""}`}>
						<label htmlFor="external_wiki_url">{i18n("repo.settings.external_wiki_url")}</label>
						<input id="external_wiki_url" name="external_wiki_url" type="url" value={String("" ?? "")} />
						<p className="help">{i18n("repo.settings.external_wiki_url_desc")}</p>
					</div>
				</div>

				<div className="divider"></div>

				{/* $isIssuesEnabled */}
				{/* $isIssuesGlobalDisabled */}
				{/* $isExternalTrackerGlobalDisabled */}
				{/* $isIssuesAndExternalGlobalDisabled */}
				<div className="inline field">
					<label>{i18n("repo.issues")}</label>
					<div className={`ui checkbox${(isIssuesAndExternalGlobalDisabled) ? ` disabled` : ""}`}{...(isIssuesAndExternalGlobalDisabled ? {"data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {})}>
						<input className="enable-system" name="enable_issues" type="checkbox" data-target="#issue_box" {...(isIssuesEnabled ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.issues_desc")}</label>
					</div>
				</div>
				<div className={`field ${(!(isIssuesEnabled)) ? `disabled` : ""}`} id="issue_box">
					<div className="field">
						<div className={`ui radio checkbox${(isIssuesGlobalDisabled) ? ` disabled` : ""}`}{...(isIssuesGlobalDisabled ? {"data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {})}>
							<input className="enable-system-radio" name="enable_external_tracker" type="radio" value="false" data-context="#internal_issue_box" data-target="#external_issue_box" {...(!(props.repository?.unitEnabled?.(ctx, "ctx.Consts.RepoUnitTypeExternalTracker")) ? {"checked": true} : {})} />
							<label>{i18n("repo.settings.use_internal_issue_tracker")}</label>
						</div>
					</div>
					<div className={`field tw-pl-4 ${(props.repository?.unitEnabled?.(ctx, "ctx.Consts.RepoUnitTypeExternalTracker")) ? `disabled` : ""}`} id="internal_issue_box">
						{(props.repository?.canEnableTimetracker) ? (<>
							<div className="field">
								<div className="ui checkbox">
									<input name="enable_timetracker" className="enable-system" data-target="#only_contributors" type="checkbox" {...(props.repository?.isTimetrackerEnabled?.(ctx) ? {"checked": true} : {})} />
									<label>{i18n("repo.settings.enable_timetracker")}</label>
								</div>
							</div>
							<div className={`field ${(!(props.repository?.isTimetrackerEnabled?.(ctx))) ? `disabled` : ""}`} id="only_contributors">
								<div className="ui checkbox">
									<input name="allow_only_contributors_to_track_time" type="checkbox" {...(props.repository?.allowOnlyContributorsToTrackTime?.(ctx) ? {"checked": true} : {})} />
									<label>{i18n("repo.settings.allow_only_contributors_to_track_time")}</label>
								</div>
							</div>
						</>) : null}
						<div className="field">
							<div className="ui checkbox">
								<input name="enable_issue_dependencies" type="checkbox" {...(props.repository?.isDependenciesEnabled?.(ctx) ? {"checked": true} : {})} />
								<label>{i18n("repo.issues.dependency.setting")}</label>
							</div>
						</div>
						<div className="ui checkbox">
							<input name="enable_close_issues_via_commit_in_any_branch" type="checkbox" {...(props.repository?.closeIssuesViaCommitInAnyBranch ? {"checked": true} : {})} />
							<label>{i18n("repo.settings.admin_enable_close_issues_via_commit_in_any_branch")}</label>
						</div>
					</div>
					<div className="field">
						<div className={`ui radio checkbox${(isExternalTrackerGlobalDisabled) ? ` disabled` : ""}`}{...(isExternalTrackerGlobalDisabled ? {"data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {})}>
							<input className="enable-system-radio" name="enable_external_tracker" type="radio" value="true" data-context="#internal_issue_box" data-target="#external_issue_box" {...(props.repository?.unitEnabled?.(ctx, "ctx.Consts.RepoUnitTypeExternalTracker") ? {"checked": true} : {})} />
							<label>{i18n("repo.settings.use_external_issue_tracker")}</label>
						</div>
					</div>
					<div className={`field tw-pl-4 ${(!(props.repository?.unitEnabled?.(ctx, "ctx.Consts.RepoUnitTypeExternalTracker"))) ? `disabled` : ""}`} id="external_issue_box">
						<div className="field">
							<label htmlFor="external_tracker_url">{i18n("repo.settings.external_tracker_url")}</label>
							<input id="external_tracker_url" name="external_tracker_url" type="url" value={String("" ?? "")} />
							<p className="help">{i18n("repo.settings.external_tracker_url_desc")}</p>
						</div>
						<div className="field">
							<label htmlFor="tracker_url_format">{i18n("repo.settings.tracker_url_format")}</label>
							<input id="tracker_url_format" name="tracker_url_format" type="url" value={String("" ?? "")} placeholder="https://github.com/{user}/{repo}/issues/{index}" />
							<p className="help">{i18n("repo.settings.tracker_url_format_desc")}</p>
						</div>
						<div className="inline fields">
							<label htmlFor="issue_style">{i18n("repo.settings.tracker_issue_style")}</label>
							<div className="field">
								<div className="ui radio checkbox">
								{/* $externalTracker */}
								{/* $externalTrackerStyle */}
									<input className="js-tracker-issue-style" name="tracker_issue_style" type="radio" value="numeric" {...(externalTrackerStyle === "numeric" ? {"checked": true} : {})} />
									<label>{i18n("repo.settings.tracker_issue_style.numeric")} <span className="ui light grey text">#1234</span></label>
								</div>
							</div>
							<div className="field">
								<div className="ui radio checkbox">
									<input className="js-tracker-issue-style" name="tracker_issue_style" type="radio" value="alphanumeric" {...(externalTrackerStyle === "alphanumeric" ? {"checked": true} : {})} />
									<label>{i18n("repo.settings.tracker_issue_style.alphanumeric")} <span className="ui light grey text">ABC-123 , DEFG-234</span></label>
								</div>
							</div>
							<div className="field">
								<div className="ui radio checkbox">
									<input className="js-tracker-issue-style" name="tracker_issue_style" type="radio" value="regexp" {...(externalTrackerStyle === "regexp" ? {"checked": true} : {})} />
									<label>{i18n("repo.settings.tracker_issue_style.regexp")} <span className="ui light grey text">(ISSUE-\d+) , ISSUE-(\d+)</span></label>
								</div>
							</div>
						</div>
						<div className={`field ${(externalTrackerStyle !== "regexp") ? `disabled` : ""}`} id="tracker-issue-style-regex-box">
							<label htmlFor="external_tracker_regexp_pattern">{i18n("repo.settings.tracker_issue_style.regexp_pattern")}</label>
							<input id="external_tracker_regexp_pattern" name="external_tracker_regexp_pattern" value={String("" ?? "")} />
							<p className="help">{i18n("repo.settings.tracker_issue_style.regexp_pattern_desc")}</p>
						</div>
					</div>
				</div>

				<div className="divider"></div>

				{/* $isProjectsEnabled */}
				{/* $isProjectsGlobalDisabled */}
				{/* $projectsUnit */}
				<div className="inline field">
					<label>{i18n("repo.projects")}</label>
					<div className={`ui checkbox${(isProjectsGlobalDisabled) ? ` disabled` : ""}`}{...(isProjectsGlobalDisabled ? {"data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {})}>
						<input className="enable-system" name="enable_projects" type="checkbox" data-target="#projects_box" {...(isProjectsEnabled ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.projects_desc")}</label>
					</div>
				</div>
				<div className={`field ${(!(isProjectsEnabled)) ? ` disabled` : ""} tw-pl-4`} id="projects_box">
					<p>
						{i18n("repo.settings.projects_mode_desc")}
					</p>
					<div className="ui dropdown selection">
						<select name="projects_mode">
							<option value="repo" {...((!(isProjectsEnabled) || props.projectsUnit?.projectsConfig?.getProjectsMode === "repo") ? {"selected": true} : {})}>{i18n("repo.settings.projects_mode_repo")}</option>
							<option value="owner" {...((!(isProjectsEnabled) || props.projectsUnit?.projectsConfig?.getProjectsMode === "owner") ? {"selected": true} : {})}>{i18n("repo.settings.projects_mode_owner")}</option>
							<option value="all" {...((!(isProjectsEnabled) || props.projectsUnit?.projectsConfig?.getProjectsMode === "all") ? {"selected": true} : {})}>{i18n("repo.settings.projects_mode_all")}</option>
						</select>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="default text">
							{(props.projectsUnit?.projectsConfig?.getProjectsMode === "repo") ? (<>
								{i18n("repo.settings.projects_mode_repo")}
							</>) : null}
							{(props.projectsUnit?.projectsConfig?.getProjectsMode === "owner") ? (<>
								{i18n("repo.settings.projects_mode_owner")}
							</>) : null}
							{(props.projectsUnit?.projectsConfig?.getProjectsMode === "all") ? (<>
								{i18n("repo.settings.projects_mode_all")}
							</>) : null}
						</div>
						<div className="menu">
							<div className="item" data-value="repo">{i18n("repo.settings.projects_mode_repo")}</div>
							<div className="item" data-value="owner">{i18n("repo.settings.projects_mode_owner")}</div>
							<div className="item" data-value="all">{i18n("repo.settings.projects_mode_all")}</div>
						</div>
					</div>
				</div>

				<div className="divider"></div>

				{/* $isReleasesEnabled */}
				{/* $isReleasesGlobalDisabled */}
				<div className="inline field">
					<label>{i18n("repo.releases")}</label>
					<div className={`ui checkbox${(isReleasesGlobalDisabled) ? ` disabled` : ""}`}{...(isReleasesGlobalDisabled ? {"data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {})}>
						<input className="enable-system" name="enable_releases" type="checkbox" {...(isReleasesEnabled ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.releases_desc")}</label>
					</div>
				</div>

				{/* $isPackagesEnabled */}
				{/* $isPackagesGlobalDisabled */}
				<div className="inline field">
					<label>{i18n("repo.packages")}</label>
					<div className={`ui checkbox${(isPackagesGlobalDisabled) ? ` disabled` : ""}`}{...(isPackagesGlobalDisabled ? {"data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {})}>
						<input className="enable-system" name="enable_packages" type="checkbox" {...(isPackagesEnabled ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.packages_desc")}</label>
					</div>
				</div>

				{(!(props.isMirror)) ? (<>
					<div className="divider"></div>
					{/* $pullRequestEnabled */}
					{/* $pullRequestGlobalDisabled */}
					{/* $prUnit */}
					<div className="inline field">
						<label>{i18n("repo.pulls")}</label>
						<div className={`ui checkbox${(pullRequestGlobalDisabled) ? ` disabled` : ""}`}{...(pullRequestGlobalDisabled ? {"data-tooltip-content": String(i18n("repo.unit_disabled") ?? "")} : {})}>
							<input className="enable-system" name="enable_pulls" type="checkbox" data-target="#pull_box" {...(pullRequestEnabled ? {"checked": true} : {})} />
							<label>{i18n("repo.settings.pulls_desc")}</label>
						</div>
					</div>
					<div className={`field${(!(pullRequestEnabled)) ? ` disabled` : ""}`} id="pull_box">
						<div className="field">
							<p>
								{i18n("repo.settings.merge_style_desc")}
							</p>
						</div>
						<div className="field">
							<div className="ui checkbox">
								<input name="pulls_allow_merge" type="checkbox" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.allowMerge) ? {"checked": true} : {})} />
								<label>{i18n("repo.pulls.merge_pull_request")}</label>
							</div>
						</div>
						<div className="field">
							<div className="ui checkbox">
								<input name="pulls_allow_rebase" type="checkbox" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.allowRebase) ? {"checked": true} : {})} />
								<label>{i18n("repo.pulls.rebase_merge_pull_request")}</label>
							</div>
						</div>
						<div className="field">
							<div className="ui checkbox">
								<input name="pulls_allow_rebase_merge" type="checkbox" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.allowRebaseMerge) ? {"checked": true} : {})} />
								<label>{i18n("repo.pulls.rebase_merge_commit_pull_request")}</label>
							</div>
						</div>
						<div className="field">
							<div className="ui checkbox">
								<input name="pulls_allow_squash" type="checkbox" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.allowSquash) ? {"checked": true} : {})} />
								<label>{i18n("repo.pulls.squash_merge_pull_request")}</label>
							</div>
						</div>
						<div className="field">
							<div className="ui checkbox">
								<input name="pulls_allow_fast_forward_only" type="checkbox" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.allowFastForwardOnly) ? {"checked": true} : {})} />
								<label>{i18n("repo.pulls.fast_forward_only_merge_pull_request")}</label>
							</div>
						</div>
						<div className="field">
							<div className="ui checkbox">
								<input name="pulls_allow_manual_merge" type="checkbox" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.allowManualMerge) ? {"checked": true} : {})} />
								<label>{i18n("repo.pulls.merge_manually")}</label>
							</div>
						</div>

						<div className="field">
							<p>
								{i18n("repo.settings.default_merge_style_desc")}
							</p>
							<div className="ui dropdown selection">
								<select name="pulls_default_merge_style">
									<option value="merge" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.defaultMergeStyle === "merge") ? {"selected": true} : {})}>{i18n("repo.pulls.merge_pull_request")}</option>
									<option value="rebase" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.defaultMergeStyle === "rebase") ? {"selected": true} : {})}>{i18n("repo.pulls.rebase_merge_pull_request")}</option>
									<option value="rebase-merge" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.defaultMergeStyle === "rebase-merge") ? {"selected": true} : {})}>{i18n("repo.pulls.rebase_merge_commit_pull_request")}</option>
									<option value="squash" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.defaultMergeStyle === "squash") ? {"selected": true} : {})}>{i18n("repo.pulls.squash_merge_pull_request")}</option>
									<option value="fast-forward-only" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.defaultMergeStyle === "fast-forward-only") ? {"selected": true} : {})}>{i18n("repo.pulls.fast_forward_only_merge_pull_request")}</option>
								</select><span className="svg-icon" aria-label="octicon-triangle-down"></span>
								<div className="default text">
									{(props.prUnit?.pullRequestsConfig?.defaultMergeStyle === "merge") ? (<>
										{i18n("repo.pulls.merge_pull_request")}
									</>) : null}
									{(props.prUnit?.pullRequestsConfig?.defaultMergeStyle === "rebase") ? (<>
										{i18n("repo.pulls.rebase_merge_pull_request")}
									</>) : null}
									{(props.prUnit?.pullRequestsConfig?.defaultMergeStyle === "rebase-merge") ? (<>
										{i18n("repo.pulls.rebase_merge_commit_pull_request")}
									</>) : null}
									{(props.prUnit?.pullRequestsConfig?.defaultMergeStyle === "squash") ? (<>
										{i18n("repo.pulls.squash_merge_pull_request")}
									</>) : null}
									{(props.prUnit?.pullRequestsConfig?.defaultMergeStyle === "fast-forward-only") ? (<>
										{i18n("repo.pulls.fast_forward_only_merge_pull_request")}
									</>) : null}
								</div>
								<div className="menu">
									<div className="item" data-value="merge">{i18n("repo.pulls.merge_pull_request")}</div>
									<div className="item" data-value="rebase">{i18n("repo.pulls.rebase_merge_pull_request")}</div>
									<div className="item" data-value="rebase-merge">{i18n("repo.pulls.rebase_merge_commit_pull_request")}</div>
									<div className="item" data-value="squash">{i18n("repo.pulls.squash_merge_pull_request")}</div>
									<div className="item" data-value="fast-forward-only">{i18n("repo.pulls.fast_forward_only_merge_pull_request")}</div>
								</div>
							</div>
						</div>
						<div className="field">
							<label>{i18n("repo.settings.pulls.default_target_branch")}</label>
							<div className="ui search selection dropdown">
								<input type="hidden" name="default_target_branch" value={String("" ?? "")} />
								<div className="default text"></div>
								<span className="svg-icon" aria-label="octicon-triangle-down"></span>
								<div className="menu">
									<div className="item" data-value="">{i18n("repo.settings.pulls.default_target_branch_default")}</div>
									{((props.branches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
										<div className="item" data-value={String("" ?? "")}>{/* $branchName */}</div>
									</React.Fragment>))}
								</div>
							</div>
						</div>
						<div className="field">
							<div className="ui checkbox">
								<input name="default_allow_maintainer_edit" type="checkbox" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.defaultAllowMaintainerEdit) ? {"checked": true} : {})} />
								<label>{i18n("repo.settings.pulls.default_allow_edits_from_maintainers")}</label>
							</div>
						</div>
						<div className="field">
							<div className="ui checkbox">
								<input name="pulls_allow_rebase_update" type="checkbox" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.allowRebaseUpdate) ? {"checked": true} : {})} />
								<label>{i18n("repo.settings.pulls.allow_rebase_update")}</label>
							</div>
						</div>
						<div className="field">
							<div className="ui checkbox">
								<input name="default_delete_branch_after_merge" type="checkbox" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.defaultDeleteBranchAfterMerge) ? {"checked": true} : {})} />
								<label>{i18n("repo.settings.pulls.default_delete_branch_after_merge")}</label>
							</div>
						</div>
						<div className="field">
							<div className="ui checkbox">
								<input name="enable_autodetect_manual_merge" type="checkbox" {...((!(pullRequestEnabled) || props.prUnit?.pullRequestsConfig?.autodetectManualMerge) ? {"checked": true} : {})} />
								<label>{i18n("repo.settings.pulls.enable_autodetect_manual_merge")}</label>
							</div>
						</div>
						<div className="field">
							<div className="ui checkbox">
								<input name="pulls_ignore_whitespace" type="checkbox" {...((pullRequestEnabled && props.prUnit?.pullRequestsConfig?.ignoreWhitespaceConflicts) ? {"checked": true} : {})} />
								<label>{i18n("repo.settings.pulls.ignore_whitespace")}</label>
							</div>
						</div>
					</div>
				</>) : null}

				<div className="divider"></div>
				<div className="field">
					<button className="ui primary button">{i18n("repo.settings.update_settings")}</button>
				</div>
			</form>
		</div>

		<h4 className="ui top attached header">
			{i18n("repo.settings.signing_settings")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<input type="hidden" name="action" value="signing" />
				<div className="field">
					<label>{i18n("repo.settings.trust_model")}</label><br />
					<div className="field">
						<div className="ui radio checkbox">
							<input type="radio" id="trust_model_default" name="trust_model" {...(props.repository?.trustModel?.string === "default" ? {"checked": "checked"} : {})} value="default" />
							<label htmlFor="trust_model_default">{i18n("repo.settings.trust_model.default")}</label>
							<p className="help">{i18n("repo.settings.trust_model.default.desc")}</p>
						</div>
					</div>
					<div className="field">
						<div className="ui radio checkbox">
							<input type="radio" id="trust_model_collaborator" name="trust_model" {...(props.repository?.trustModel?.string === "collaborator" ? {"checked": "checked"} : {})} value="collaborator" />
							<label htmlFor="trust_model_collaborator">{i18n("repo.settings.trust_model.collaborator.long")}</label>
							<p className="help">{i18n("repo.settings.trust_model.collaborator.desc")}</p>
						</div>
					</div>
					<div className="field">
						<div className="ui radio checkbox">
							<input type="radio" name="trust_model" id="trust_model_committer" {...(props.repository?.trustModel?.string === "committer" ? {"checked": "checked"} : {})} value="committer" />
							<label htmlFor="trust_model_committer">{i18n("repo.settings.trust_model.committer.long")}</label>
							<p className="help">{i18n("repo.settings.trust_model.committer.desc")}</p>
						</div>
					</div>
					<div className="field">
						<div className="ui radio checkbox">
							<input type="radio" name="trust_model" id="trust_model_collaboratorcommitter" {...(props.repository?.trustModel?.string === "collaboratorcommitter" ? {"checked": "checked"} : {})} value="collaboratorcommitter" />
							<label htmlFor="trust_model_collaboratorcommitter">{i18n("repo.settings.trust_model.collaboratorcommitter.long")}</label>
							<p className="help">{i18n("repo.settings.trust_model.collaboratorcommitter.desc")}</p>
						</div>
					</div>
				</div>

				<div className="divider"></div>
				<div className="field">
					<button className="ui primary button">{i18n("repo.settings.update_settings")}</button>
				</div>
			</form>
		</div>

		{(props.isAdmin) ? (<>
		<h4 className="ui top attached header">
			{i18n("repo.settings.admin_settings")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<input type="hidden" name="action" value="admin" />
				<div className="field">
					<div className="ui checkbox">
						<input name="enable_health_check" type="checkbox" {...(props.repository?.isFsckEnabled ? {"checked": true} : {})} />
						<label>{i18n("repo.settings.admin_enable_health_check")}</label>
					</div>
				</div>

				<div className="field">
					<button className="ui primary button">{i18n("repo.settings.update_settings")}</button>
				</div>
			</form>

			<div className="divider"></div>
			<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<input type="hidden" name="action" value="admin_index" />
				{(props.isRepoIndexerEnabled) ? (<>
					<h4 className="ui header">{i18n("repo.settings.admin_code_indexer")}</h4>
					<div className="inline fields">
						<label>{i18n("repo.settings.admin_indexer_commit_sha")}</label>
						<span className="field">
							{(props.codeIndexerStatus) ? (<>
								<a rel="nofollow" className="ui sha label" href={`${String(props.repoLink ?? "")}/commit/${String(props.codeIndexerStatus?.commitSha ?? "")}`}>
									{/* TODO: {{ShortSha .CodeIndexerStatus.CommitSha}} */}
								</a>
							</>) : (<>
									<span>{i18n("repo.settings.admin_indexer_unindexed")}</span>
							</>)}
						</span>
						<div className="field">
							<button className="ui primary button" name="request_reindex_type" value="code">{i18n("repo.settings.reindex_button")}</button>
						</div>
					</div>
				</>) : null}
				<h4 className="ui header">{i18n("repo.settings.admin_stats_indexer")}</h4>
				<div className="inline fields">
					{((props.statsIndexerStatus && props.statsIndexerStatus?.commitSha)) ? (<>
						<label>{i18n("repo.settings.admin_indexer_commit_sha")}</label>
					</>) : null}
					<span className="field">
						{((props.statsIndexerStatus && props.statsIndexerStatus?.commitSha)) ? (<>
							<a rel="nofollow" className="ui sha label" href={`${String(props.repoLink ?? "")}/commit/${String(props.statsIndexerStatus?.commitSha ?? "")}`}>
								{/* TODO: {{ShortSha .StatsIndexerStatus.CommitSha}} */}
							</a>
						</>) : (<>
							<span>{i18n("repo.settings.admin_indexer_unindexed")}</span>
						</>)}
					</span>
					<div className="field">
						<button className="ui primary button" name="request_reindex_type" value="stats">{i18n("repo.settings.reindex_button")}</button>
					</div>
				</div>
			</form>
		</div>
		</>) : null}

		{(props.permission?.isOwner) ? (<>
		<h4 className="ui top attached error header">
			{i18n("repo.settings.danger_zone")}
		</h4>
		<div className="ui attached error danger segment">
			<div className="flex-divided-list items-with-main">
				{(!(props.repository?.isFork)) ? (<>
					<div className="item tw-items-center">
						<div className="item-main">
							<div className="item-title">{i18n("repo.visibility")}</div>
							{(props.repository?.isPrivate) ? (<>
								<div className="item-body">{i18n("repo.settings.visibility.public.text")}</div>
							</>) : (<>
								<div className="item-body">{i18n("repo.settings.visibility.private.text")}</div>
							</>)}
						</div>
						<div className="item-trailing">
							<button className="ui basic red show-modal button" data-modal="#visibility-repo-modal">
								{(props.repository?.isPrivate) ? (<>
									{i18n("repo.settings.visibility.public.button")}
								</>) : (<>
									{i18n("repo.settings.visibility.private.button")}
								</>)}
							</button>
						</div>
					</div>
				</>) : null}
				{(props.repository?.isMirror) ? (<>
					<div className="item">
						<div className="item-main">
							<div className="item-title">{i18n("repo.settings.convert")}</div>
							<div className="item-body">{i18n("repo.settings.convert_desc")}</div>
						</div>
						<div className="item-trailing">
							<button className="ui basic red show-modal button" data-modal="#convert-mirror-repo-modal">{i18n("repo.settings.convert")}</button>
						</div>
					</div>
				</>) : null}
				{(props.canConvertFork) ? (<>
					<div className="item">
						<div className="item-main">
							<div className="item-title">{i18n("repo.settings.convert_fork")}</div>
							<div className="item-body">{i18n("repo.settings.convert_fork_desc")}</div>
						</div>
						<div className="item-trailing">
							<button className="ui basic red show-modal button" data-modal="#convert-fork-repo-modal">{i18n("repo.settings.convert_fork")}</button>
						</div>
					</div>
				</>) : null}
				<div className="item">
					<div className="item-main">
						<div className="item-title">{i18n("repo.settings.transfer")}</div>
						<div className="item-body">
							{(props.repoTransfer) ? (<>
								{i18n("repo.settings.transfer_started")}
							</>) : (<>
								{i18n("repo.settings.transfer_desc")}
							</>)}
						</div>
					</div>
					<div className="item-trailing">
						{(props.repoTransfer) ? (<>
							<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
								<input type="hidden" name="action" value="cancel_transfer" />
								<button className="ui red button">{i18n("repo.settings.transfer_abort")}</button>
							</form>
						</>) : (<>
							<button className="ui basic red show-modal button" data-modal="#transfer-repo-modal">{i18n("repo.settings.transfer")}</button>
						</>)}
					</div>
				</div>
				{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeWiki")) ? (<>
					<div className="item">
						<div className="item-main">
							<div className="item-title">{i18n("repo.settings.wiki_delete")}</div>
							<div className="item-body">{i18n("repo.settings.wiki_delete_desc")}</div>
						</div>
						<div className="item-trailing">
							<button className="ui basic red show-modal button" data-modal="#delete-wiki-modal">{i18n("repo.settings.wiki_delete")}</button>
						</div>
					</div>
				</>) : null}
				<div className="item">
					<div className="item-main">
						<div className="item-title">{i18n("repo.settings.delete")}</div>
						<div className="item-body">{i18n("repo.settings.delete_desc")}</div>
					</div>
					<div className="item-trailing">
						<button className="ui basic red show-modal button" data-modal="#delete-repo-modal">{i18n("repo.settings.delete")}</button>
					</div>
				</div>
				{(!(props.repository?.isMirror)) ? (<>
					<div className="item tw-items-center">
						<div className="item-main">
							{(props.repository?.isArchived) ? (<>
								<div className="item-title">{i18n("repo.settings.unarchive.header")}</div>
								<div className="item-body">{i18n("repo.settings.unarchive.text")}</div>
							</>) : (<>
								<div className="item-title">{i18n("repo.settings.archive.header")}</div>
								<div className="item-body">{i18n("repo.settings.archive.text")}</div>
							</>)}
						</div>
						<div className="item-trailing">
							<button className="ui basic red show-modal button" data-modal="#archive-repo-modal">
								{(props.repository?.isArchived) ? (<>
									{i18n("repo.settings.unarchive.button")}
								</>) : (<>
									{i18n("repo.settings.archive.button")}
								</>)}
							</button>
						</div>
					</div>
				</>) : null}
			</div>
		</div>
		</>) : null}
	</div>
{/* template: repo/settings/layout_footer */}

{(props.permission?.isOwner) ? (<>
	{(props.repository?.isMirror) ? (<>
		<div className="ui small modal" id="convert-mirror-repo-modal">
			<div className="header">
				{i18n("repo.settings.convert")}
			</div>
			<div className="content">
				<div className="ui warning message">
					{i18n("repo.settings.convert_notices_1")}
				</div>
				<form className="ui form form-fetch-action" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					<input type="hidden" name="action" value="convert" />
					{/* template: repo/settings/repo_name_confirm_fields */}
					{/* template: base/modal_actions_confirm */}
				</form>
			</div>
		</div>
	</>) : null}
	{(props.canConvertFork) ? (<>
		<div className="ui small modal" id="convert-fork-repo-modal">
			<div className="header">
				{i18n("repo.settings.convert_fork")}
			</div>
			<div className="content">
				<div className="ui warning message">
					{i18n("repo.settings.convert_fork_notices_1")}
				</div>
				<form className="ui form form-fetch-action" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					<input type="hidden" name="action" value="convert_fork" />
					{/* template: repo/settings/repo_name_confirm_fields */}
					{/* template: base/modal_actions_confirm */}
				</form>
			</div>
		</div>
	</>) : null}
	<div className="ui small modal" id="transfer-repo-modal">
		<div className="header">
			{i18n("repo.settings.transfer")}
		</div>
		<div className="content">
			<div className="ui warning message">
				{i18n("repo.settings.transfer_notices_1")} <br />
				{i18n("repo.settings.transfer_notices_2")} <br />
				{i18n("repo.settings.transfer_notices_3")} <br />
				{i18n("repo.settings.transfer_notices_4")}
			</div>
			<form className="ui form form-fetch-action" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<input type="hidden" name="action" value="transfer" />
				{/* template: repo/settings/repo_name_confirm_fields */}
				<div className="required field">
					<label htmlFor="new_owner_name">{i18n("repo.settings.transfer_owner")}</label>
					<input id="new_owner_name" name="new_owner_name" required />
				</div>

				{/* template: base/modal_actions_confirm */}
			</form>
		</div>
	</div>

	<div className="ui small modal" id="delete-repo-modal">
		<div className="header">
			{i18n("repo.settings.delete")}
		</div>
		<div className="content">
			<div className="ui warning message">
				{i18n("repo.settings.delete_notices_1")}<br />
				{i18n("repo.settings.delete_notices_2")}
				{(props.repository?.numForks) ? (<><br />
				{i18n("repo.settings.delete_notices_fork_1")}
				</>) : null}
			</div>
			<form className="ui form form-fetch-action" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<input type="hidden" name="action" value="delete" />
				{/* template: repo/settings/repo_name_confirm_fields */}
				{/* template: base/modal_actions_confirm */}
			</form>
		</div>
	</div>

	{(!(props.repository?.isFork)) ? (<>
		<div className="ui small modal" id="visibility-repo-modal">
			<div className="header">
				{i18n("repo.visibility")}
			</div>
			<div className="content">
				{(props.repository?.isPrivate) ? (<>
					<p>{i18n("repo.settings.visibility.public.bullet_title")}</p>
					<ul>
						<li>{i18n("repo.settings.visibility.public.bullet_one")}</li>
					</ul>
				</>) : (<>
					<p>{i18n("repo.settings.visibility.private.bullet_title")}</p>
					<ul>
						<li>{i18n("repo.settings.visibility.private.bullet_one")}</li>
						<li>
							{i18n("repo.settings.visibility.private.bullet_two")}
						</li>
						{((props.repository?.numStars || props.repository?.numWatches || props.repository?.numForks)) ? (<>
						<ul className="tw-my-0 tw-pl-4">
							{(props.repository?.numStars) ? (<><li>{i18n("repo.settings.visibility.private.stats_stars")}</li></>) : null}
							{(props.repository?.numWatches) ? (<><li>{i18n("repo.settings.visibility.private.stats_watchers")}</li></>) : null}
							{(props.repository?.numForks) ? (<><li>{i18n("repo.settings.visibility.private.stats_forks")}</li></>) : null}
						</ul>
						</>) : null}
					</ul>
				</>)}
				<form className="ui form tw-mt-5 form-fetch-action" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					<input type="hidden" name="action" value="visibility" />
					<input type="hidden" name="private" value={String("" ?? "")} />
					{(!(props.repository?.isPrivate)) ? (<>
						<div className="field">
							<label>
								{i18n("repo.settings.enter_repo_full_name_to_confirm")}
								<span className="tw-text-red">{props.repository?.fullName as any}</span>
							</label>
						</div>
						<div className="required field">
							<label>{i18n("repo.repo_name")}</label>
							<input name="confirm_repo_name" required maxlength="200" />
						</div>
					</>) : null}
					{/* template: base/modal_actions_confirm */}
				</form>
			</div>
		</div>
	</>) : null}

	{(props.repository?.unitEnabled?.(ctx, "ctx.Consts.RepoUnitTypeWiki")) ? (<>
	<div className="ui small modal" id="delete-wiki-modal">
		<div className="header">
			{i18n("repo.settings.wiki_delete")}
		</div>
		<div className="content">
			<div className="ui warning message">
				{i18n("repo.settings.delete_notices_1")}<br />
				{i18n("repo.settings.wiki_delete_notices_1")}
			</div>
			<form className="ui form form-fetch-action" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<input type="hidden" name="action" value="delete-wiki" />
				{/* template: repo/settings/repo_name_confirm_fields */}
				{/* template: base/modal_actions_confirm */}
			</form>
		</div>
	</div>
	</>) : null}

	{(!(props.repository?.isMirror)) ? (<>
		<div className="ui g-modal-confirm modal" id="archive-repo-modal">
			<div className="header">
				{(props.repository?.isArchived) ? (<>
					{i18n("repo.settings.unarchive.header")}
				</>) : (<>
					{i18n("repo.settings.archive.header")}
				</>)}
			</div>
			<div className="content">
				<p>
					{(props.repository?.isArchived) ? (<>
						{i18n("repo.settings.unarchive.text")}
					</>) : (<>
						{i18n("repo.settings.archive.text")}
					</>)}
				</p>
			</div>
			<form action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<input type="hidden" name="action" value={`${(props.repository?.isArchived) ? `unarchive` : `archive`}`} />
				<input type="hidden" name="repo_id" value={String(props.repository?.iD ?? "")} />
				{/* template: base/modal_actions_confirm */}
			</form>
		</div>
	</>) : null}
</>) : null}

{/* template: repo/settings/push_mirror_sync_modal */}

  </>)
}
