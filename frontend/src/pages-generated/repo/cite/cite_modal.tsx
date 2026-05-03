import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function CiteModal(props: Record<string, unknown>) {
  return (<>
<div className="ui small modal" id="cite-repo-modal">
	<div className="header">
		{i18n("repo.cite_this_repo")}
	</div>
	<div className="content">
		<div className="ui stackable secondary menu">
			<div className="ui action input" id="citation-panel">
				{/* template: repo/cite/cite_buttons */}
				<a id="goto-citation-btn" className="ui basic jump icon button" href={`${String(props.repoLink ?? "")}/src/${String(props.branchName ?? "")}/CITATION.cff`} data-tooltip-content={String(i18n("repo.find_file.go_to_file") ?? "")}>
					<span className="svg-icon" aria-label="octicon-file-moved"></span>
				</a>
			</div>
		</div>
	</div>
	<div className="actions">
		<button className="ui cancel button">
			{i18n("cancel")}
		</button>
	</div>
</div>

  </>)
}
