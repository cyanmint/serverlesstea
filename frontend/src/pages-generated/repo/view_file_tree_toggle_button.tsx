import React from 'react'
import { i18n } from '../../lib/i18n'

export default function ViewFileTreeToggleButton(props: Record<string, unknown>) {
  return (<>
<button type="button"
	className={`repo-view-file-tree-toggle ui button not-mobile ${(props.userSettingCodeViewShowFileTree) ? `tw-hidden` : ""}`}
	data-global-click="onRepoViewFileTreeToggle" data-toggle-data-action="show" data-tooltip-content={String(i18n("repo.diff.show_file_tree") ?? "")}
>
	<span className="svg-icon" aria-label="octicon-sidebar-collapse"></span>
</button>

  </>)
}
