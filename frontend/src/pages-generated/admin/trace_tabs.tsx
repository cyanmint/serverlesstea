import React from 'react'
import { i18n } from '../../lib/i18n'

export default function TraceTabs(props: Record<string, unknown>) {
  return (<>
<div className="flex-text-block">
	<div className="tw-flex-1">
		<div className="ui compact small menu">
			{(props.showAdminPerformanceTraceTab) ? (<>
			<a className={`item `} href={`/-/admin/monitor/perftrace`}>{i18n("admin.monitor.performance_logs")}</a>
			</>) : null}
			<a className={`item `} href={`/-/admin/monitor/stacktrace?show=process`}>{i18n("admin.monitor.process")}</a>
			<a className={`item `} href={`/-/admin/monitor/stacktrace?show=stacktrace`}>{i18n("admin.monitor.stacktrace")}</a>
		</div>
	</div>
	<form target="_blank" action={`/-/admin/monitor/diagnosis`} className="ui form">
		<div className="ui inline field">
			<button className="ui primary small button">{i18n("admin.monitor.download_diagnosis_report")}</button>
			<input name="seconds" size="3" maxlength="3" value="10" /> {i18n("tool.raw_seconds")}
		</div>
	</form>
</div>

<div className="divider"></div>

  </>)
}
