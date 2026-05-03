import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function EmptyPlaceholder(props: Record<string, unknown>) {
  return (<>
<tr>
	<td colspan={String(props.colspan ?? "")}>
		<div className="empty-placeholder">
			<span className="svg-icon" aria-label="octicon-clock"></span>
			<h2>{i18n("org.worktime.empty")}</h2>
			<p>{i18n("org.worktime.empty_description")}</p>
		</div>
	</td>
</tr>

  </>)
}
