import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Dashboard(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		{(props.needUpdate) ? (<>
			<div className="ui negative message flash-error">
				<p>{i18n("admin.dashboard.new_version_hint")}</p>
			</div>
		</>) : null}
		<h4 className="ui top attached header">
			{i18n("admin.dashboard.maintenance_operations")}
		</h4>
		<div className="ui attached table segment">
			<form method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`/-/admin`}>
				<table className="ui very basic table tw-mt-0 tw-px-4">
					<tbody>
						<tr>
							<td>{i18n("admin.dashboard.delete_inactive_accounts")}</td>
							<td className="tw-text-right"><button type="submit" className="ui primary button" name="op" value="delete_inactive_accounts"><span className="svg-icon" aria-label="octicon-play"></span> {i18n("admin.dashboard.operation_run")}</button></td>
						</tr>
						<tr>
							<td>{i18n("admin.dashboard.delete_repo_archives")}</td>
							<td className="tw-text-right"><button type="submit" className="ui primary button" name="op" value="delete_repo_archives"><span className="svg-icon" aria-label="octicon-play"></span> {i18n("admin.dashboard.operation_run")}</button></td>
						</tr>
						<tr>
							<td>{i18n("admin.dashboard.delete_missing_repos")}</td>
							<td className="tw-text-right"><button type="submit" className="ui primary button" name="op" value="delete_missing_repos"><span className="svg-icon" aria-label="octicon-play"></span> {i18n("admin.dashboard.operation_run")}</button></td>
						</tr>
						<tr>
							<td>{i18n("admin.dashboard.git_gc_repos")}</td>
							<td className="tw-text-right"><button type="submit" className="ui primary button" name="op" value="git_gc_repos"><span className="svg-icon" aria-label="octicon-play"></span> {i18n("admin.dashboard.operation_run")}</button></td>
						</tr>
						{((!(props.sSH?.disabled) && !(props.sSH?.startBuiltinServer))) ? (<>
							<tr>
								<td>{i18n("admin.dashboard.resync_all_sshkeys")}</td>
								<td className="tw-text-right"><button type="submit" className="ui primary button" name="op" value="resync_all_sshkeys"><span className="svg-icon" aria-label="octicon-play"></span> {i18n("admin.dashboard.operation_run")}</button></td>
							</tr>
							<tr>
								<td>{i18n("admin.dashboard.resync_all_sshprincipals")}</td>
								<td className="tw-text-right"><button type="submit" className="ui primary button" name="op" value="resync_all_sshprincipals"><span className="svg-icon" aria-label="octicon-play"></span> {i18n("admin.dashboard.operation_run")}</button></td>
							</tr>
						</>) : null}
						<tr>
							<td>{i18n("admin.dashboard.resync_all_hooks")}</td>
							<td className="tw-text-right"><button type="submit" className="ui primary button" name="op" value="resync_all_hooks"><span className="svg-icon" aria-label="octicon-play"></span> {i18n("admin.dashboard.operation_run")}</button></td>
						</tr>
						<tr>
							<td>{i18n("admin.dashboard.reinit_missing_repos")}</td>
							<td className="tw-text-right"><button type="submit" className="ui primary button" name="op" value="reinit_missing_repos"><span className="svg-icon" aria-label="octicon-play"></span> {i18n("admin.dashboard.operation_run")}</button></td>
						</tr>
						<tr>
							<td>{i18n("admin.dashboard.sync_external_users")}</td>
							<td className="tw-text-right"><button type="submit" className="ui primary button" name="op" value="sync_external_users"><span className="svg-icon" aria-label="octicon-play"></span> {i18n("admin.dashboard.operation_run")}</button></td>
						</tr>
						<tr>
							<td>{i18n("admin.dashboard.repo_health_check")}</td>
							<td className="tw-text-right"><button type="submit" className="ui primary button" name="op" value="repo_health_check"><span className="svg-icon" aria-label="octicon-play"></span> {i18n("admin.dashboard.operation_run")}</button></td>
						</tr>
						<tr>
							<td>{i18n("admin.dashboard.delete_generated_repository_avatars")}</td>
							<td className="tw-text-right"><button type="submit" className="ui primary button" name="op" value="delete_generated_repository_avatars"><span className="svg-icon" aria-label="octicon-play"></span> {i18n("admin.dashboard.operation_run")}</button></td>
						</tr>
						<tr>
							<td>{i18n("admin.dashboard.sync_repo_branches")}</td>
							<td className="tw-text-right"><button type="submit" className="ui primary button" name="op" value="sync_repo_branches"><span className="svg-icon" aria-label="octicon-play"></span> {i18n("admin.dashboard.operation_run")}</button></td>
						</tr>
						<tr>
							<td>{i18n("admin.dashboard.sync_repo_tags")}</td>
							<td className="tw-text-right"><button type="submit" className="ui primary button" name="op" value="sync_repo_tags"><span className="svg-icon" aria-label="octicon-play"></span> {i18n("admin.dashboard.operation_run")}</button></td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.dashboard.system_status")}
		</h4>
		{/* TODO: make these stats work in multi-server deployments, likely needs per-server stats in DB */}
		<div className="ui attached table segment">
			{/* template: admin/system_status */}
		</div>
	</div>
{/* template: admin/layout_footer */}

  </>)
}
