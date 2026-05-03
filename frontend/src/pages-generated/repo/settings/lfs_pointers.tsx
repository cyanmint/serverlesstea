import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function LfsPointers(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="repo-setting-content">
		<h4 className="ui top attached header">
			{i18n("repo.settings.lfs_pointers.found")}
			{(props.numAssociatable > 0) ? (<>
				<div className="ui right">
					<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`${String(props.link ?? "")}/associate`}>
						{((props.pointers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							{(item.associatable) ? (<>
								<input type="hidden" name="oid" value={`${String(props.oid ?? "")} ${String(props.size ?? "")}`} />
							</>) : null}
						</React.Fragment>))}
						<button className="ui primary tiny button">{i18n("repo.settings.lfs_pointers.associateAccessible")}</button>
					</form>
				</div>
			</>) : null}
		</h4>
		<div className="ui attached segment">
			<table id="lfs-files-table" className="ui fixed single line table">
				<thead>
					<tr>
						<th className="three wide">{i18n("repo.settings.lfs_pointers.sha")}</th>
						<th className="four wide">{i18n("repo.settings.lfs_pointers.oid")}</th>
						<th className="two wide">{i18n("repo.settings.lfs_pointers.inRepo")}</th>
						<th className="two wide">{i18n("repo.settings.lfs_pointers.exists")}</th>
						<th className="two wide" data-tooltip-content={String(i18n("repo.settings.lfs_pointers.accessible") ?? "")}>{i18n("repo.settings.lfs_pointers.accessible")}</th>
						<th className="three wide"></th>
					</tr>
				</thead>
				<tbody>
					{((props.pointers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td>
								<a href={`${String(props.repoLink ?? "")}/raw/blob/${String(props.sHA ?? "")}`} rel="nofollow" target="_blank" title={String(props.sHA ?? "")} className="ui button tw-font-mono">
									{/* TODO: {{ShortSha .SHA}} */}
								</a>
							</td>
							<td>
								<a {...((item.exists && item.inRepo) ? {"href": `${String(props.lFSFilesLink ?? "")}/show/${String(props.oid ?? "")}`, "rel": "nofollow", "target": "_blank"} : {})} title={String(props.oid ?? "")} className="ui button tw-font-mono">
									{/* TODO: {{ShortSha .Oid}} */}
								</a>
							</td>
							<td>{/* TODO: {{svg (Iif .InRepo "octicon-check" "octicon-x")}} */}</td>
							<td>{/* TODO: {{svg (Iif .Exists "octicon-check" "octicon-x")}} */}</td>
							<td>{/* TODO: {{svg (Iif .Accessible "octicon-check" "octicon-x")}} */}</td>
							<td className="tw-text-right">
								<a className="ui primary button" href={`${String(props.lFSFilesLink ?? "")}/find?oid=${String(props.oid ?? "")}&size=${String(props.size ?? "")}&sha=${String(props.sHA ?? "")}`}>{i18n("repo.settings.lfs_findcommits")}</a>
							</td>
						</tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>
	</div>
{/* template: repo/settings/layout_footer */}

  </>)
}
