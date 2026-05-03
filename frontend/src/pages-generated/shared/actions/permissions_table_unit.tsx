import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function PermissionsTableUnit(props: Record<string, unknown>) {
  return (<>
<tr>
	<td>
		<strong>{props.unitDisplayName as any}</strong>
		<div className="help">{props.unitDisplayDesc as any}</div>
	</td>
	<td className="tw-text-center">
		<div className="ui radio checkbox">
			<input type="radio" name={`max_unit_access_mode_${String(props.unitType ?? "")}`} value="none" {...(!(props.unitAccessMode) ? {"checked": true} : {})} title={String(i18n("org.teams.none_access") ?? "")} />
			<label></label>
		</div>
	</td>
	<td className="tw-text-center">
		<div className="ui radio checkbox">
			<input type="radio" name={`max_unit_access_mode_${String(props.unitType ?? "")}`} value="read" {...(props.unitAccessMode === 1 ? {"checked": true} : {})} title={String(i18n("org.teams.read_access") ?? "")} />
			<label></label>
		</div>
	</td>
	<td className="tw-text-center">
		<div className="ui radio checkbox">
			<input type="radio" name={`max_unit_access_mode_${String(props.unitType ?? "")}`} value="write" {...(props.unitAccessMode === 2 ? {"checked": true} : {})} title={String(i18n("org.teams.write_access") ?? "")} />
			<label></label>
		</div>
	</td>
</tr>

  </>)
}
