import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function LfsLocks(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="user-main-content twelve wide column content repository file list">
		<div className="tab-size-8 non-diff-file-content">
			<h4 className="ui top attached header">
				<a href={String(props.lFSFilesLink ?? "")}>{i18n("repo.settings.lfs")}</a> / {i18n("repo.settings.lfs_locks")} ({i18n("admin.total")})
			</h4>
			<div className="ui attached segment">
				<form className="ui form ignore-dirty" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					<div className="ui fluid action input">
						<input name="path" value="" placeholder={String(i18n("repo.settings.lfs_lock_path") ?? "")} autofocus />
						<button className="ui primary button">{i18n("repo.settings.lfs_lock")}</button>
					</div>
				</form>
			</div>
			<table id="lfs-files-locks-table" className="ui attached segment single line table">
				<tbody>
					{((props.lFSLocks) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td>
								{("index $.Linkable $index") ? (<>
									<span className="svg-icon" aria-label="octicon-file"></span>
								<a href={`${String(props.repoLink ?? "")}/src/branch//`} title={String("" ?? "")}>{/* TODO: {{$lock.Path}} */}</a>
								</>) : (<>
									<span className="svg-icon" aria-label="octicon-diff"></span>
								<span data-tooltip-content={String(i18n("repo.settings.lfs_lock_file_no_exist") ?? "")}>{/* TODO: {{$lock.Path}} */}</span>
								</>)}
								{(!("index $.Lockables $index")) ? (<>
									<span data-tooltip-content={String(i18n("repo.settings.lfs_noattribute") ?? "")}><span className="svg-icon" aria-label="octicon-alert"></span></span>
								</>) : null}
							</td>
							<td>
								<a href={String("" ?? "")}>
									{/* TODO: {{ctx.AvatarUtils.Avatar $lock.Owner}} */}
									{/* TODO: {{$lock.Owner.DisplayName}} */}
								</a>
							</td>
							<td>{/* TODO: {{DateUtils.TimeSince .Created}} */}</td>
							<td className="tw-text-right">
								<form action={`${String(props.lFSFilesLink ?? "")}/locks//unlock`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
									<button className="ui primary button"><span className="btn-octicon"><span className="svg-icon" aria-label="octicon-lock"></span></span>{i18n("repo.settings.lfs_force_unlock")}</button>
								</form>
							</td>
						</tr>
					{/* else */}
						<tr>
							<td colSpan="4">{i18n("repo.settings.lfs_locks_no_locks")}</td>
						</tr>
					</React.Fragment>))}
				</tbody>
			</table>
			{/* template: base/paginate */}
		</div>
	</div>
{/* template: repo/settings/layout_footer */}

  </>)
}
