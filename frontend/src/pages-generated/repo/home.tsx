import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Home(props: Record<string, unknown>) {
  return (<>

{/* $showSidebar */}
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

		<div className={String("" ?? "")}>
			<div className="repo-home-filelist">
				{/* template: repo/view_content */}
			</div>

			{(props.showSidebar) ? (<>
				{/* template: repo/home_sidebar_top */}
				{/* template: repo/home_sidebar_bottom */}
			</>) : null}
		</div>
	</div>
</div>


  </>)
}
