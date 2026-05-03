// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Options(props: Record<string, unknown>) {
  return (<>
{/* template: org/settings/layout_head */}

<div className="ui segments org-setting-content">
	<h4 className="ui top attached header">
		{i18n("org.settings.options")}
	</h4>
	<div className="ui attached segment">
		<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<div className={`field ${(props.err_FullName) ? `error` : ""}`}>
				<label htmlFor="full_name">{i18n("org.org_full_name_holder")}</label>
				<input id="full_name" name="full_name" value={String(props.org?.fullName ?? "")} maxlength="100" />
			</div>
			<div className={`field ${(props.err_Email) ? `error` : ""}`}>
				<label htmlFor="email">{i18n("org.settings.email")}</label>
				<input id="email" name="email" type="email" value={String(props.org?.email ?? "")} maxlength="255" />
			</div>
			<div className={`field ${(props.err_Description) ? `error` : ""}`}>
				{/* it is rendered as markdown, but the length is limited, so at the moment we do not use the markdown editor here */}
				<label htmlFor="description">{i18n("org.org_desc")}</label>
				<textarea id="description" name="description" rows="2" maxlength="255">{props.org?.description as any}</textarea>
			</div>
			<div className={`field ${(props.err_Website) ? `error` : ""}`}>
				<label htmlFor="website">{i18n("org.settings.website")}</label>
				<input id="website" name="website" type="url" value={String(props.org?.website ?? "")} maxlength="255" />
			</div>
			<div className="field">
				<label htmlFor="location">{i18n("org.settings.location")}</label>
				<input id="location" name="location"  value={String(props.org?.location ?? "")} maxlength="50" />
			</div>

			<div className="field" id="permission_box">
				<label>{i18n("org.settings.permission")}</label>
				<div className="field">
					<div className="ui checkbox">
						<input type="checkbox" name="repo_admin_change_team_access" {...(props.repoAdminChangeTeamAccess ? {"checked": true} : {})} />
						<label>{i18n("org.settings.repoadminchangeteam")}</label>
					</div>
				</div>
			</div>

			{(props.signedUser?.isAdmin) ? (<>
			<div className="divider"></div>

			<div className={`inline field ${(props.err_MaxRepoCreation) ? `error` : ""}`}>
				<label htmlFor="max_repo_creation">{i18n("admin.users.max_repo_creation")}</label>
				<input id="max_repo_creation" name="max_repo_creation" type="number" min="-1" value={String(props.org?.maxRepoCreation ?? "")} />
				<p className="help">{i18n("admin.users.max_repo_creation_desc")}</p>
			</div>
			</>) : null}

			<div className="field">
				<button className="ui primary button">{i18n("org.settings.update_settings")}</button>
			</div>
		</form>

		<div className="divider"></div>

		<form className="ui form" action={`${String(props.link ?? "")}/avatar`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} enctype="multipart/form-data">
			<div className="inline field">
				{/* template: shared/avatar_upload_crop */}
			</div>
			<div className="field">
				<button className="ui primary button">{i18n("settings.update_avatar")}</button>
				<button className="ui red button link-action" data-url={`${String(props.link ?? "")}/avatar/delete`}>{i18n("settings.delete_current_avatar")}</button>
			</div>
		</form>
	</div>
</div>

{/* template: org/settings/options_dangerzone */}

{/* template: org/settings/layout_footer */}

  </>)
}
