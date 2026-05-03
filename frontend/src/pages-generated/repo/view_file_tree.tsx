import React from 'react'
import { i18n } from '../../lib/i18n'

export default function ViewFileTree(props: Record<string, unknown>) {
  return (<>
<div className={`repo-view-file-tree-container ${(!(props.userSettingCodeViewShowFileTree)) ? `tw-hidden` : ""}`}>
	<div className="flex-text-block repo-button-row">
		<button className="repo-view-file-tree-toggle ui button"
			data-global-click="onRepoViewFileTreeToggle" data-toggle-data-action="hide"
			data-tooltip-content={String(i18n("repo.diff.hide_file_tree") ?? "")}>
			<span className="svg-icon" aria-label="octicon-sidebar-expand"></span>
		</button>
		<b>{i18n("files")}</b>
	</div>

	{/* TODO: Dynamically move components such as refSelector and createPR here */}
	<div id="view-file-tree" className="tw-overflow-auto tw-h-full is-loading"
		data-repo-link={String(props.repoLink ?? "")}
		data-tree-path={String(props.treePath ?? "")}
		data-current-ref-name-sub-url={String(props.refTypeNameSubURL ?? "")}
	></div>
</div>

  </>)
}
