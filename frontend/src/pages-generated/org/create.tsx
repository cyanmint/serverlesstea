// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Create(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content organization new org">
	<div className="ui container medium-width">
		{/* alert */}
		<h3 className="ui top attached header">
			{i18n("new_org")}
		</h3>
		<div className="ui attached segment">
			<form className="ui form left-right-form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div className={`inline required field ${(props.err_OrgName) ? `error` : ""}`}>
					<label htmlFor="org_name">{i18n("org.org_name_holder")}</label>
					<input id="org_name" name="org_name" value={String(props.org_name ?? "")} autofocus required maxlength="40" />
					<span className="help">{i18n("org.org_name_helper")}</span>
				</div>

				<div className={`inline field required ${(props.err_OrgVisibility) ? `error` : ""}`}>
					<label htmlFor="visibility">{i18n("org.settings.visibility")}</label>
					<div className="inline-right">
						<div className="ui radio checkbox">
							<input className="enable-system-radio" name="visibility" type="radio" value="0" {...(props.visibility?.isPublic ? {"checked": true} : {})} />
							<label>{i18n("org.settings.visibility.public")}</label>
						</div>
						<div className="ui radio checkbox">
							<input className="enable-system-radio" name="visibility" type="radio" value="1" {...(props.visibility?.isLimited ? {"checked": true} : {})} />
							<label>{i18n("org.settings.visibility.limited")}</label>
						</div>
						<div className="ui radio checkbox">
							<input className="enable-system-radio" name="visibility" type="radio" value="2" {...(props.visibility?.isPrivate ? {"checked": true} : {})} />
							<label>{i18n("org.settings.visibility.private")}</label>
						</div>
					</div>
				</div>

				<div className="inline field" id="permission_box">
					<label>{i18n("org.settings.permission")}</label>
					<div className="ui checkbox">
						<input type="checkbox" name="repo_admin_change_team_access" {...(props.repo_admin_change_team_access ? {"checked": true} : {})} />
						<label>{i18n("org.settings.repoadminchangeteam")}</label>
					</div>
				</div>

				<div className="inline field">
					<label></label>
					<button className="ui primary button">
						{i18n("org.create_org")}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>


  </>)
}
