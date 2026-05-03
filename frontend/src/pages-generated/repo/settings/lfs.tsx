// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Lfs(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="repo-setting-content">
		<h4 className="ui top attached header">
			{i18n("repo.settings.lfs_filelist")} ({i18n("admin.total")})
			<div className="ui right">
				<a className="ui tiny button" href={`${String(props.link ?? "")}/locks`}>{i18n("repo.settings.lfs_locks")}</a>
				<a className="ui primary tiny button" href={`${String(props.link ?? "")}/pointers`}>&nbsp;{i18n("repo.settings.lfs_findpointerfiles")}</a>
			</div>
		</h4>
		<table id="lfs-files-table" className="ui attached segment single line table">
			<tbody>
				{((props.lFSFiles) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<tr>
						<td>
							<a href={`${String(props.link ?? "")}/show/${String(props.oid ?? "")}`} title={String(props.oid ?? "")} className="ui button tw-font-mono">
								{/* TODO: {{ShortSha .Oid}} */}
							</a>
						</td>
						<td>{/* TODO: {{FileSize .Size}} */}</td>
						<td>{/* TODO: {{DateUtils.TimeSince .CreatedUnix}} */}</td>
						<td className="tw-text-right">
							<a className="ui primary button" href={`${String(props.link ?? "")}/find?oid=${String(props.oid ?? "")}&size=${String(props.size ?? "")}`}>{i18n("repo.settings.lfs_findcommits")}</a>
							<button className="ui basic show-modal icon button red" data-modal={`#delete-${String(props.oid ?? "")}`}>
								<span className="btn-octicon btn-octicon-danger" data-tooltip-content={String(i18n("repo.editor.delete_this_file") ?? "")}><span className="svg-icon" aria-label="octicon-trash"></span></span>
							</button>
						</td>
					</tr>
				{/* else */}
					<tr>
						<td colSpan="4">{i18n("repo.settings.lfs_no_lfs_files")}</td>
					</tr>
				</React.Fragment>))}
			</tbody>
		</table>
		{/* template: base/paginate */}
		{((props.lFSFiles) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="ui g-modal-confirm modal" id={`delete-${String(props.oid ?? "")}`}>
				<div className="header">
					{i18n("repo.settings.lfs_delete")}
				</div>
				<div className="content">
					<p>
						{i18n("repo.settings.lfs_delete_warning")}
					</p>
					<form className="ui form" action={`${String(props.link ?? "")}/delete/${String(props.oid ?? "")}`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
						{/* template: base/modal_actions_confirm */}
					</form>
				</div>
			</div>
		</React.Fragment>))}
	</div>
{/* template: repo/settings/layout_footer */}

  </>)
}
