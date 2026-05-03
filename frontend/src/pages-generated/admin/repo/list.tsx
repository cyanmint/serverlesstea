import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.repos.repo_manage_panel")} ({i18n("admin.total")})
			<div className="ui right">
				<a className="ui primary tiny button" href={`/-/admin/repos/unadopted`}>{i18n("admin.repos.unadopted")}</a>
			</div>
		</h4>
		<div className="ui attached segment">
			{/* template: shared/repo/search */}
		</div>
		<div className="ui attached table segment">
			<table className="ui very basic table selectable unstackable">
				<thead>
					<tr>
						<th data-sortt-asc="oldest" data-sortt-desc="newest">ID{/* TODO: {{SortArrow "oldest" "newest" $.SortType false}} */}</th>
						<th>{i18n("admin.repos.owner")}</th>
						<th data-sortt-asc="alphabetically" data-sortt-desc="reversealphabetically">
							{i18n("admin.repos.name")}
							{/* TODO: {{SortArrow "alphabetically" "reversealphabetically" $.SortType false}} */}
						</th>
						<th>{i18n("repo.watchers")}</th>
						<th  data-sortt-asc="moststars" data-sortt-desc="feweststars">
							{i18n("repo.stars")}
							{/* TODO: {{SortArrow "moststars" "feweststars" $.SortType false}} */}
						</th>
						<th  data-sortt-asc="mostforks" data-sortt-desc="fewestforks">
							{i18n("repo.forks")}
							{/* TODO: {{SortArrow "mostforks" "fewestforks" $.SortType false}} */}
						</th>
						<th>{i18n("admin.repos.issues")}</th>
						<th  data-sortt-asc="gitsize" data-sortt-desc="reversegitsize">
							{i18n("admin.repos.size")}
							{/* TODO: {{SortArrow "gitsize" "reversegitsize" $.SortType false}} */}
						</th>
						<th  data-sortt-asc="lfssize" data-sortt-desc="reverselfssize">
							{i18n("admin.repos.lfs_size")}
							{/* TODO: {{SortArrow "lfssize" "reverselfssize" $.SortType false}} */}
						</th>
						<th>{i18n("admin.auths.updated")}</th>
						<th>{i18n("admin.users.created")}</th>
						<th>{i18n("admin.notices.op")}</th>
					</tr>
				</thead>
				<tbody>
					{((props.repos) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td>{item.iD as any}</td>
							<td>
								<a className="tw-break-anywhere" href={String(props.owner?.homeLink ?? "")}>{item.owner?.name as any}</a>
								{(item.owner?.visibility?.isPrivate) ? (<>
									<span className="tw-text-gold"><span className="svg-icon" aria-label="octicon-lock"></span></span>
								</>) : null}
							</td>
							<td>
								<a className="tw-break-anywhere" href={String(props.link ?? "")}>{item.name as any}</a>
								{(item.isArchived) ? (<>
									<span className="ui basic label">{i18n("repo.desc.archived")}</span>
								</>) : null}
								{(item.isPrivate) ? (<>
									<span className="ui basic label">{i18n("repo.desc.private")}</span>
								</>) : (<>
									{(item.owner?.visibility?.isPrivate) ? (<>
										<span className="ui basic label">{i18n("repo.desc.internal")}</span>
									</>) : null}
								</>)}
								{(item.isTemplate) ? (<>
									<span className="ui basic label">{i18n("repo.desc.template")}</span>
								</>) : null}
								{(item.objectFormatName === "sha256") ? (<>
									<span className="ui basic label">{i18n("repo.desc.sha256")}</span>
								</>) : null}
								{(item.isMirror) ? (<>
									<span className="svg-icon" aria-label="octicon-mirror"></span>
								</>) : null} {(item.isFork) ? (<>
									<span className="svg-icon" aria-label="octicon-repo-forked"></span>
								</>) : null}
							</td>
							<td>{item.numWatches as any}</td>
							<td>{item.numStars as any}</td>
							<td>{item.numForks as any}</td>
							<td>{item.numIssues as any}</td>
							<td>{/* TODO: {{FileSize .GitSize}} */}</td>
							<td>{/* TODO: {{FileSize .LFSSize}} */}</td>
							<td>{/* TODO: {{DateUtils.AbsoluteShort .UpdatedUnix}} */}</td>
							<td>{/* TODO: {{DateUtils.AbsoluteShort .CreatedUnix}} */}</td>
							<td>
								<a className="tw-text-red show-modal" href data-modal="#admin-repo-delete-modal"
									data-modal-form.action={`${String(props.link ?? "")}/delete?page=${String(props.page?.paginater?.current ?? "")}&sort=${String(props.sortType ?? "")}&id=${String(props.iD ?? "")}`}
									data-modal-repo-name={String(props.name ?? "")}
								><span className="svg-icon" aria-label="octicon-trash"></span></a>
							</td>
						</tr>
					{/* else */}
						<tr><td className="tw-text-center" colspan="12">{i18n("no_results_found")}</td></tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>

		{/* template: base/paginate */}
	</div>

<form className="ui small modal form-fetch-action" id="admin-repo-delete-modal" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
	<div className="header"><span className="svg-icon" aria-label="octicon-trash"></span> {i18n("repo.settings.delete")}</div>
	<div className="content">
		<p>{i18n("repo.settings.delete_desc")}</p>
		{i18n("repo.settings.delete_notices_2")}<br />
		{i18n("repo.settings.delete_notices_fork_1")}<br />
	</div>
	{/* template: base/modal_actions_confirm */}
</form>

{/* template: admin/layout_footer */}

  </>)
}
