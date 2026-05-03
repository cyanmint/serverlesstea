import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Stacktrace(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
<div className="admin-setting-content">

	{/* template: admin/trace_tabs */}

	<h4 className="ui top attached header">
		{/* TODO: {{printf "%d Goroutines" .GoroutineCount}} */}{/* Goroutine is non-translatable */}
		{(props.processCount) ? (<>, {i18n("admin.monitor.processes_count")}</>) : null}
	</h4>

	{(props.processStacks) ? (<>
	<div className="ui attached segment">
		<div className="ui relaxed divided list">
			{((props.processStacks) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				{/* template: admin/stacktrace-row */}
			</React.Fragment>))}
		</div>
	</div>
	</>) : null}
</div>

{/* template: admin/layout_footer */}

  </>)
}
