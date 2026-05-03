import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Pages(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository wiki pages">
	{/* template: repo/header */}
	<div className="ui container">
		<h2 className="ui header flex-left-right">
			<span>{i18n("repo.wiki.pages")}</span>
			<span>
				{((props.canWriteWiki && !(props.repository?.isMirror))) ? (<>
					<a className="ui small primary button" href={`${String(props.repoLink ?? "")}/wiki?action=_new`}>{i18n("repo.wiki.new_page_button")}</a>
				</>) : null}
			</span>
		</h2>
		{(props.permission?.isAdmin) ? (<><div>{i18n("repo.default_branch")}: {props.repository?.defaultWikiBranch as any}</div></>) : null}
		<table className="ui table selectable wiki-pages-list">
			<tbody>
				{((props.pages) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<tr>
						<td>
							<span className="svg-icon" aria-label="octicon-file"></span>
							<a href={`${String(props.repoLink ?? "")}/wiki/${String(props.subURL ?? "")}`}>{item.name as any}</a>
							<a className="wiki-git-entry" href={`${String(props.repoLink ?? "")}/wiki/${String(props.gitEntryName | PathEscape ?? "")}`} data-tooltip-content={String(i18n("repo.wiki.original_git_entry_tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-chevron-right"></span></a>
						</td>
						{/* $timeSince */}
						<td className="tw-text-right">{i18n("repo.wiki.last_updated")}</td>
					</tr>
				</React.Fragment>))}
			</tbody>
		</table>
	</div>
</div>


  </>)
}
