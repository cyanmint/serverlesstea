// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Labels(props: Record<string, unknown>) {
  return (<>
{/* template: org/settings/layout_head */}
<div className="org-setting-content">
	<div className="flex-text-block">
		<div className="tw-flex-1">
			{i18n("org.settings.labels_desc")}
		</div>
		<button className="ui small primary new-label button">{i18n("repo.issues.new_label")}</button>
	</div>
	<div className="divider"></div>
	{/* template: repo/issue/labels/label_list */}
	{/* template: repo/issue/labels/label_edit_modal */}
</div>
{/* template: org/settings/layout_footer */}

  </>)
}
