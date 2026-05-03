import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Revision(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository wiki revisions">
	{/* template: repo/header */}
	{/* $title */}
	<div className="ui container">
		<div className="ui dividing header flex-left-right">
			<div className="flex-text-block">
				<a className="ui basic button tw-px-3" title={String(i18n("repo.wiki.back_to_wiki") ?? "")} href={`${String(props.repoLink ?? "")}/wiki/${String(props.pageURL ?? "")}`}><span className="svg-icon" aria-label="octicon-home"></span></a>
				<div className="tw-flex-1 gt-ellipsis">
					{props.title as any}
					<div className="ui sub header gt-ellipsis">
						{/* $timeSince */}
						{i18n("repo.wiki.last_commit_info")}
					</div>
				</div>
			</div>
			<div className="flex-text-block">
				{/* template: repo/clone_panel */}
			</div>
		</div>
		<h2 className="ui top header">{i18n("repo.wiki.wiki_page_revisions")}</h2>
		<div className="tw-mt-4">
			<h4 className="ui top attached header">
				<div className="ui stackable grid">
					<div className="sixteen wide column">
						{props.commitCount as any} {i18n("repo.commits.commits")}
					</div>
				</div>
			</h4>
			{((props.commits && props.commitCount > 0)) ? (<>
				{/* template: repo/commits_list */}
			</>) : null}
			{/* template: base/paginate */}
		</div>
	</div>
</div>


  </>)
}
