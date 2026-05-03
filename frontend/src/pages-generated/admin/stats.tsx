// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Stats(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
<div className="admin-setting-content">
	<h4 className="ui top attached header">
		{i18n("admin.dashboard.statistic")}
	</h4>
	<div className="ui attached table segment">
		<table className="ui very basic table unstackable">
			{((props.statsKeys) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<tr>
				<td width="200">{props.statsKey as any}</td>
				<td>{/* TODO: {{index $.StatsCounter $statsKey}} */}</td>
			</tr>
			</React.Fragment>))}
		</table>
	</div>
</div>
{/* template: admin/layout_footer */}

  </>)
}
