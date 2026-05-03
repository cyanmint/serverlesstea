import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function PublicAccess(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
<div className="repo-setting-content">
	<h4 className="ui top attached header">
		{i18n("repo.settings.public_access")}
	</h4>
	<div className="ui attached segment">
		<p>
			{i18n("repo.settings.public_access_desc")}
		</p>
		{/* $paNotSet */}
		{/* $paAnonymousRead */}
		{/* $paEveryoneRead */}
		{/* $paEveryoneWrite */}
		<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<table className="ui table unstackable tw-my-2">
				<thead>
					<tr>
						<th>{i18n("units.unit")}</th>
						<th className="tw-text-center">{i18n("settings.permission_not_set")}</th>
						<th className="tw-text-center">{i18n("settings.permission_anonymous_read")}</th>
						<th className="tw-text-center">{i18n("settings.permission_everyone_read")}</th>
						<th className="tw-text-center">{i18n("settings.permission_everyone_write")}</th>
					</tr>
				</thead>
				<tbody>
				{((props.repoUnitPublicAccesses) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<tr>
						<td>{/* TODO: {{$ua.DisplayName}} */}</td>
						<td className="tw-text-center"><label><input type="radio" name={String("" ?? "")} value={String("" ?? "")} {/* TODO: {{Iif (eq $paNotSet $ua.UnitPublicAccess) "checked"}} */} /></label></td>
						<td className="tw-text-center"><label><input type="radio" name={String("" ?? "")} value={String("" ?? "")} {/* TODO: {{Iif (eq $paAnonymousRead $ua.UnitPublicAccess) "checked"}} */} /></label></td>
						<td className="tw-text-center"><label><input type="radio" name={String("" ?? "")} value={String("" ?? "")} {/* TODO: {{Iif (eq $paEveryoneRead $ua.UnitPublicAccess) "checked"}} */} /></label></td>
						<td className="tw-text-center">
							{("SliceUtils.Contains $ua.PublicAccessTypes $paEveryoneWrite") ? (<>
								<label><input type="radio" name={String("" ?? "")} value={String("" ?? "")} {/* TODO: {{Iif (eq $paEveryoneWrite $ua.UnitPublicAccess) "checked"}} */} /></label>
							</>) : (<>
								-
							</>)}
						</td>
					</tr>
				</React.Fragment>))}
				</tbody>
			</table>
			<ul className="tw-my-3 tw-pl-5 tw-flex tw-flex-col tw-gap-3">
				<li>{i18n("repo.settings.public_access.docs.not_set")}</li>
				<li>{i18n("repo.settings.public_access.docs.anonymous_read")}</li>
				<li>{i18n("repo.settings.public_access.docs.everyone_read")}</li>
				<li>{i18n("repo.settings.public_access.docs.everyone_write")}</li>
			</ul>
			<button className={`ui primary button ${(props.globalForcePrivate) ? `disabled` : ""}`}>{i18n("repo.settings.update_settings")}</button>
		</form>
	</div>
</div>
{/* template: repo/settings/layout_footer */}

  </>)
}
