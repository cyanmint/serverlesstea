// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Heatmap(props: Record<string, unknown>) {
  return (<>
{(props.enableHeatmap) ? (<>
{/* HINT: USER-ACTIVITY-PUSH-COMMITS: it only uses the doer's action time, it doesn't use git commit's time */}
<div className="activity-heatmap-container">
	<div id="user-heatmap" className="is-loading"
		data-heatmap-url={String(props.heatmapURL ?? "")}
		data-locale-total-contributions={String(i18n("heatmap.number_of_contributions_in_the_last_12_months") ?? "")}
		data-locale-no-contributions={String(i18n("heatmap.no_contributions") ?? "")}
		data-locale-more={String(i18n("heatmap.more") ?? "")}
		data-locale-less={String(i18n("heatmap.less") ?? "")}
	></div>
</div>
<div className="divider"></div>
</>) : null}

  </>)
}
