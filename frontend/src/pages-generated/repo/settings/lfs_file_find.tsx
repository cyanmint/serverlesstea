import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function LfsFileFind(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="user-main-content twelve wide column content repository file list">
		<div className="tab-size-8 non-diff-file-content">
			<h4 className="ui top attached header">
				<a href={String(props.lFSFilesLink ?? "")}>{i18n("repo.settings.lfs")}</a> / <span className="truncate sha">{props.oid as any}</span>
			</h4>
			<table id="lfs-files-find-table" className="ui attached segment single line table">
				<tbody>
					{((props.results) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td>
								<span className="svg-icon" aria-label="octicon-file"></span>
								<a href={`${String(props.repoLink ?? "")}/src/commit/${String(props.sHA ?? "")}/`} title={String(props.name ?? "")}>{item.name as any}</a>
							</td>
							<td className="message">
								<span className="truncate">
									<a href={`${String(props.repoLink ?? "")}/commit/${String(props.sHA ?? "")}`} title={String(props.summary ?? "")}>
										{item.summary?.("|", "ctx.RenderUtils.RenderEmoji") as any}
									</a>
								</span>
							</td>
							<td>
								<span className="tw-text-text-light"><span className="svg-icon" aria-label="octicon-git-branch"></span>{item.branchName as any}</span>
							</td>
							<td>
								{(item.parentHashes) ? (<>
									{i18n("repo.diff.parent")}
									{((item.parentHashes) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
										<a className="ui primary sha label" href={`${String(props.repoLink ?? "")}/commit/${String(props.string ?? "")}`}>{/* TODO: {{ShortSha .String}} */}</a>
									</React.Fragment>))}
								</>) : null}
								{i18n("repo.diff.commit")}
								<a className="ui primary sha label" href={`${String(props.repoLink ?? "")}/commit/${String(props.sHA ?? "")}`}>{/* TODO: {{ShortSha .SHA}} */}</a>
							</td>
							<td>{/* TODO: {{DateUtils.TimeSince .When}} */}</td>
						</tr>
					{/* else */}
						<tr>
							<td colSpan="5">{i18n("repo.settings.lfs_lfs_file_no_commits")}</td>
						</tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>
	</div>
{/* template: repo/settings/layout_footer */}

  </>)
}
