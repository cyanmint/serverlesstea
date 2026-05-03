// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function PermissionsTable(props: Record<string, unknown>) {
  return (<>
<div className="field">
	<label>{i18n("actions.general.token_permissions.maximum")}</label>

	<div className="help">
		{i18n("actions.general.token_permissions.maximum.description")}
		<br />
		{i18n("actions.general.token_permissions.fork_pr_note")}
	</div>

	<div className="field">
		<div className="ui checkbox">
			<input type="checkbox" name="enable_max_permissions" {...(props.enableMaxTokenPermissions ? {"checked": true} : {})} />
			<label>{i18n("actions.general.token_permissions.customize_max_permissions")}</label>
		</div>
	</div>

	<table className="ui celled table js-permissions-table">
		<thead>
			<tr>
				<th className="tw-w-2/5">{i18n("units.unit")}</th>
				<th className="tw-text-center">{i18n("org.teams.none_access")}
					<span className="tw-align-middle" data-tooltip-content={String(i18n("org.teams.none_access_helper") ?? "")}><span className="svg-icon" aria-label="octicon-question"></span></span>
				</th>
				<th className="tw-text-center">{i18n("org.teams.read_access")}
					<span className="tw-align-middle" data-tooltip-content={String(i18n("org.teams.read_access_helper") ?? "")}><span className="svg-icon" aria-label="octicon-question"></span></span>
				</th>
				<th className="tw-text-center">{i18n("org.teams.write_access")}
					<span className="tw-align-middle" data-tooltip-content={String(i18n("org.teams.write_access_helper") ?? "")}><span className="svg-icon" aria-label="octicon-question"></span></span>
				</th>
			</tr>
		</thead>
		<tbody>
			{/* template: shared/actions/permissions_table_unit */}
			{/* template: shared/actions/permissions_table_unit */}
			{/* template: shared/actions/permissions_table_unit */}
			{/* template: shared/actions/permissions_table_unit */}
			{/* template: shared/actions/permissions_table_unit */}
			{/* template: shared/actions/permissions_table_unit */}
			{/* template: shared/actions/permissions_table_unit */}
		</tbody>
	</table>
</div>

  </>)
}
