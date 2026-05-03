// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Avatars(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("admin.config.picture_config")}
</h4>
<div className="ui attached table segment">
	<dl className="admin-dl-horizontal">
		{/* $cfgOpt */}
		<dt>{i18n("admin.config.enable_gravatar")}</dt>
		<dd>
			<div className="ui toggle checkbox" data-tooltip-content={String(i18n("admin.config.enable_gravatar") ?? "")}>
				<input type="checkbox" data-config-dyn-key={String("" ?? "")} data-config-value-type="flipped" {...(!(props.cfgOpt?.value?.(ctx)) ? {"checked": true} : {})} /><label></label>
			</div>
		</dd>

		<div className="divider"></div>

		{/* TODO: {{$cfgOpt = .SystemConfig.Picture.EnableFederatedAvatar}} */}
		<dt>{i18n("admin.config.enable_federated_avatar")}</dt>
		<dd>
			<div className="ui toggle checkbox" data-tooltip-content={String(i18n("admin.config.enable_federated_avatar") ?? "")}>
				<input type="checkbox" data-config-dyn-key={String("" ?? "")} data-config-value-type="boolean" {...(props.cfgOpt?.value?.(ctx) ? {"checked": true} : {})} /><label></label>
			</div>
		</dd>
	</dl>
</div>

  </>)
}
