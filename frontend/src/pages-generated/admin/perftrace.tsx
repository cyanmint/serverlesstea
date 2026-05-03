import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Perftrace(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}

<div className="admin-setting-content">
	{/* template: admin/trace_tabs */}

	{((props.perfTraceRecords) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	<div className="ui segment tw-w-full tw-overflow-auto">
		<pre className="tw-whitespace-pre">{/* TODO: {{$record.Content}} */}</pre>
	</div>
	</React.Fragment>))}
</div>

{/* template: admin/layout_footer */}

  </>)
}
