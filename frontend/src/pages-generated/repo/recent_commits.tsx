// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function RecentCommits(props: Record<string, unknown>) {
  return (<>
{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeCode")) ? (<>
	<div id="repo-recent-commits-chart"
		data-locale-loading-title={String(i18n("graphs.component_loading") ?? "")}
		data-locale-loading-title-failed={String(i18n("graphs.component_loading_failed") ?? "")}
		data-locale-loading-info={String(i18n("graphs.component_loading_info") ?? "")}
		data-locale-component-failed-to-load={String(i18n("graphs.component_failed_to_load") ?? "")}
	>
	</div>
</>) : null}

  </>)
}
