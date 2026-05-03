import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Instance(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">{i18n("admin.config.instance_maintenance")}</h4>
<div className="ui attached segment">
	<form className="ui form ignore-dirty system-config-form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`/-/admin/config`}>
		{/* $cfgOpt */}
		{/* $cfgKey */}
		{/* $maintenanceMode */}
		<input type="hidden" data-config-dyn-key={String("" ?? "")} data-config-value-json={String("" ?? "")} />
		<div className="field">
			<div className="ui checkbox tw-mb-2">
				<input type="checkbox" name={`.AdminWebAccessOnly`} value="true" {...(props.maintenanceMode?.adminWebAccessOnly ? {"checked": true} : {})} data-config-value-type="boolean" />
				<label>{i18n("admin.config.instance_maintenance_mode.admin_web_access_only")}</label>
			</div>
		</div>
		<div className="field">
			<div className="fields tw-mb-1">
				<div className="field">
					<label>{i18n("admin.config.common.start_time")}</label>
					<input type="datetime-local" name={`.StartTimeUnix`} data-config-value-type="timestamp" />
				</div>
				<div className="field">
					<label>{i18n("admin.config.common.end_time")}</label>
					<input type="datetime-local" name={`.EndTimeUnix`} data-config-value-type="timestamp" />
				</div>
			</div>
			<div className="help">{i18n("admin.config.common.skip_time_check")}</div>
		</div>

		<div className="divider"></div>

		{/* TODO: {{$cfgOpt = $.SystemConfig.Instance.WebBanner}} */}
		{/* TODO: {{$cfgKey = $cfgOpt.DynKey}} */}
		{/* $banner */}
		<input type="hidden" data-config-dyn-key={String("" ?? "")} data-config-value-json={String("" ?? "")} />
		<div className="field">
			<div className="ui checkbox tw-mb-2">
				<input type="checkbox" name={`.DisplayEnabled`} value="true" {...(props.banner?.displayEnabled ? {"checked": true} : {})} data-config-value-type="boolean" />
				<label>{i18n("admin.config.instance_web_banner.enabled")}</label>
			</div>
			{/* template: shared/combomarkdowneditor */}
		</div>
		<div className="field">
			<div className="fields tw-mb-1">
				<div className="field">
					<label>{i18n("admin.config.common.start_time")}</label>
					<input type="datetime-local" name={`.StartTimeUnix`} data-config-value-type="timestamp" />
				</div>
				<div className="field">
					<label>{i18n("admin.config.common.end_time")}</label>
					<input type="datetime-local" name={`.EndTimeUnix`} data-config-value-type="timestamp" />
				</div>
			</div>
			<div className="help">{i18n("admin.config.common.skip_time_check")}</div>
		</div>
		<div className="field">
			<button className="ui primary button">{i18n("save")}</button>
		</div>
	</form>
</div>

  </>)
}
