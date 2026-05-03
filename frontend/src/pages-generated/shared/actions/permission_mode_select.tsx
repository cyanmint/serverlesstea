import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function PermissionModeSelect(props: Record<string, unknown>) {
  return (<>
<div className="field js-permission-mode-section">
	<label>{i18n("actions.general.token_permissions.mode")}</label>
	<div className="help">{i18n("actions.general.token_permissions.mode.desc")}</div>
	<div className="field">
		<div className="ui radio checkbox">
			<input type="radio" name="token_permission_mode" value={String(props.tokenPermissionModePermissive ?? "")} {...(props.tokenPermissionMode === props.tokenPermissionModePermissive ? {"checked": true} : {})} />
			<label>{i18n("actions.general.token_permissions.mode.permissive")}</label>
			<div className="help">{i18n("actions.general.token_permissions.mode.permissive.desc")}</div>
		</div>
	</div>
	<div className="field">
		<div className="ui radio checkbox">
			<input type="radio" name="token_permission_mode" value={String(props.tokenPermissionModeRestricted ?? "")} {...(props.tokenPermissionMode === props.tokenPermissionModeRestricted ? {"checked": true} : {})} />
			<label>{i18n("actions.general.token_permissions.mode.restricted")}</label>
			<div className="help">{i18n("actions.general.token_permissions.mode.restricted.desc")}</div>
		</div>
	</div>
</div>

  </>)
}
