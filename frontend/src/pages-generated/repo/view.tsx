import React from 'react'
import { i18n } from '../../lib/i18n'

export default function View(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className={`page-content repository file list ${(props.isBlame) ? `blame` : ""}`}>
	{/* template: repo/header */}
	<div className={`ui container ${((props.treeNames || props.isBlame)) ? `fluid padded` : ""}`}>
		{/* alert */}

		{(props.repository?.isArchived) ? (<>
			<div className="ui warning message tw-text-center">
				{(props.repository?.archivedUnix?.isZero) ? (<>
					{i18n("repo.archive.title")}
				</>) : (<>
					{i18n("repo.archive.title_date")}
				</>)}
			</div>
		</>) : null}

		{/* template: repo/code/recently_pushed_new_branches */}

		<div className="repo-view-container">
			{/* template: repo/view_file_tree */}
			<div className="repo-view-content">
				{/* template: repo/view_content */}
			</div>
		</div>
	</div>
</div>


  </>)
}
