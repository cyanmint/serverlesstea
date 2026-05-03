import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Edit(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.users.edit_account")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" data-action="./edit" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				{/* template: base/disable_form_autofill */}
				<div className={`field ${(props.err_UserName) ? `error` : ""}`}>
					<label htmlFor="user_name">{i18n("username")}</label>
					<input id="user_name" name="user_name" value={String(props.user?.name ?? "")} maxlength="40" />
				</div>
				{/* Types and name */}
				<div className={`inline required field ${(props.err_LoginType) ? `error` : ""}`}>
					<label>{i18n("admin.users.auth_source")}</label>
					<div className="ui selection type dropdown">
						<input type="hidden" id="login_type" name="login_type" value={`${String(props.loginSource?.type?.int ?? "")}-${String(props.loginSource?.iD ?? "")}`} required />
						<div className="text">{i18n("admin.users.local")}</div>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu">
							<div className="item" data-value="0-0">{i18n("admin.users.local")}</div>
							{((props.sources) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<div className="item" data-value={`${String(props.type?.int ?? "")}-${String(props.iD ?? "")}`}>{item.name as any}</div>
							</React.Fragment>))}
						</div>
					</div>
				</div>

				<div className={`inline field ${(props.err_Visibility) ? `error` : ""}`}>
					<span className="inline required field"><label htmlFor="visibility">{i18n("settings.visibility")}</label></span>
					<div className="ui selection type dropdown">
						{(props.user?.visibility?.isPublic) ? (<><input type="hidden" id="visibility" name="visibility" value="0" /></>) : null}
						{(props.user?.visibility?.isLimited) ? (<><input type="hidden" id="visibility" name="visibility" value="1" /></>) : null}
						{(props.user?.visibility?.isPrivate) ? (<><input type="hidden" id="visibility" name="visibility" value="2" /></>) : null}
						<div className="text">
							{(props.user?.visibility?.isPublic) ? (<>{i18n("settings.visibility.public")}</>) : null}
							{(props.user?.visibility?.isLimited) ? (<>{i18n("settings.visibility.limited")}</>) : null}
							{(props.user?.visibility?.isPrivate) ? (<>{i18n("settings.visibility.private")}</>) : null}
						</div>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu">
							{((props.allowedUserVisibilityModes) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								{("$mode.IsPublic") ? (<>
									<div className="item" data-tooltip-content={String(i18n("settings.visibility.public_tooltip") ?? "")} data-value="0">{i18n("settings.visibility.public")}</div>
								</>) : null} {("$mode.IsLimited") ? (<>
									<div className="item" data-tooltip-content={String(i18n("settings.visibility.limited_tooltip") ?? "")} data-value="1">{i18n("settings.visibility.limited")}</div>
								</>) : null} {("$mode.IsPrivate") ? (<>
									<div className="item" data-tooltip-content={String(i18n("settings.visibility.private_tooltip") ?? "")} data-value="2">{i18n("settings.visibility.private")}</div>
								</>) : null}
							</React.Fragment>))}
						</div>
					</div>
				</div>

				<div className={`required non-local field ${(props.err_LoginName) ? `error` : ""} ${(props.user?.loginSource === 0) ? `tw-hidden` : ""}`}>
					<label htmlFor="login_name">{i18n("admin.users.auth_login_name")}</label>
					<input id="login_name" name="login_name" value={String(props.user?.loginName ?? "")} />
				</div>
				<div className={`field ${(props.err_FullName) ? `error` : ""}`}>
					<label htmlFor="full_name">{i18n("settings.full_name")}</label>
					<input id="full_name" name="full_name" value={String(props.user?.fullName ?? "")} maxlength="100" />
				</div>
				<div className={`required field ${(props.err_Email) ? `error` : ""}`}>
					<label htmlFor="email">{i18n("email")}</label>
					<input id="email" name="email" type="email" value={String(props.user?.email ?? "")} required />
				</div>
				<div className={`local field ${(props.err_Password) ? `error` : ""} ${(!((props.user?.isLocal || props.user?.isOAuth2))) ? `tw-hidden` : ""}`}>
					<label htmlFor="password">{i18n("password")}</label>
					<input id="password" name="password" type="password" autocomplete="new-password" />
					<p className="help">{i18n("admin.users.password_helper")}</p>
				</div>

				<div className={`field ${(props.err_Language) ? `error` : ""}`}>
					<label htmlFor="language">{i18n("settings.language")}</label>
					<div className="ui selection dropdown">
						<input name="language" type="hidden" value={String(props.user?.language ?? "")} />
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="text">{((props.allLangs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>{(props.user?.language === item.lang) ? (<>{item.name as any}</>) : null}</React.Fragment>))}</div>
						<div className="menu">
						{((props.allLangs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<div className={`item${(props.user?.language === props.lang) ? ` active selected` : ""}`} data-value={String(props.lang ?? "")}>{item.name as any}</div>
						</React.Fragment>))}
						</div>
					</div>
				</div>

				<div className={`field ${(props.err_Website) ? `error` : ""}`}>
					<label htmlFor="website">{i18n("settings.website")}</label>
					<input id="website" name="website" type="url" value={String(props.user?.website ?? "")} placeholder="http://mydomain.com or https://mydomain.com" maxlength="255" />
				</div>
				<div className={`field ${(props.err_Location) ? `error` : ""}`}>
					<label htmlFor="location">{i18n("settings.location")}</label>
					<input id="location" name="location" value={String(props.user?.location ?? "")} maxlength="50" />
				</div>

				<div className="divider"></div>

				<div className={`inline field ${(props.err_MaxRepoCreation) ? `error` : ""}`}>
					<label htmlFor="max_repo_creation">{i18n("admin.users.max_repo_creation")}</label>
					<input id="max_repo_creation" name="max_repo_creation" type="number" min="-1" value={String(props.user?.maxRepoCreation ?? "")} />
					<p className="help">{i18n("admin.users.max_repo_creation_desc")}</p>
				</div>

				<div className="divider"></div>

				<div className="inline field">
					<div className="ui checkbox">
						<label><strong>{i18n("admin.users.is_activated")}</strong></label>
						<input name="active" type="checkbox" {...(props.user?.isActive ? {"checked": true} : {})} />
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<label><strong>{i18n("admin.users.prohibit_login")}</strong></label>
						<input name="prohibit_login" type="checkbox" {...(props.user?.prohibitLogin ? {"checked": true} : {})} {...(props.user?.iD === props.signedUserID ? {"disabled": true} : {})} />
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<label><strong>{i18n("admin.users.is_admin")}</strong></label>
						<input name="admin" type="checkbox" {...(props.user?.isAdmin ? {"checked": true} : {})} />
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<label><strong>{i18n("admin.users.is_restricted")}</strong></label>
						<input name="restricted" type="checkbox" {...(props.user?.isRestricted ? {"checked": true} : {})} />
					</div>
				</div>
				<div className={`inline field ${(props.disableGitHooks) ? `tw-hidden` : ""}`}>
					<div className="ui checkbox" data-tooltip-content={String(i18n("admin.users.allow_git_hook_tooltip") ?? "")}>
						<label><strong>{i18n("admin.users.allow_git_hook")}</strong></label>
						<input name="allow_git_hook" type="checkbox" {...(props.user?.canEditGitHook ? {"checked": true} : {})} {...(props.disableGitHooks ? {"disabled": true} : {})} />
					</div>
				</div>
				<div className={`inline field ${((props.disableImportLocal || props.disableMigrations)) ? `tw-hidden` : ""}`}>
					<div className="ui checkbox">
						<label><strong>{i18n("admin.users.allow_import_local")}</strong></label>
						<input name="allow_import_local" type="checkbox" {...(props.user?.canImportLocal ? {"checked": true} : {})} {...(props.disableImportLocal ? {"disabled": true} : {})} />
					</div>
				</div>
				{(!(props.disableRegularOrgCreation)) ? (<>
				<div className="inline field">
					<div className="ui checkbox">
						<label><strong>{i18n("admin.users.allow_create_organization")}</strong></label>
						<input name="allow_create_organization" type="checkbox" {...(props.user?.canCreateOrganization ? {"checked": true} : {})} />
					</div>
				</div>
				</>) : null}

				{(props.twoFactorEnabled) ? (<>
				<div className="divider"></div>
				<div className="inline field">
					<div className="ui checkbox">
						<label><strong>{i18n("admin.users.reset_2fa")}</strong></label>
						<input name="reset_2fa" type="checkbox" />
					</div>
				</div>
				</>) : null}

				<div className="divider"></div>

				<div className="field">
					<button className="ui primary button">{i18n("admin.users.update_profile")}</button>
					<button className="ui red button show-modal" data-modal="#delete-user-modal">{i18n("admin.users.delete_account")}</button>
				</div>
			</form>
		</div>

		<h4 className="ui top attached header">
			{i18n("settings.avatar")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" data-action="./avatar" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} enctype="multipart/form-data">
				{(!(props.disableGravatar)) ? (<>
				<div className="inline field">
					<div className="ui radio checkbox">
						<input name="source" value="lookup" type="radio" {(!(props.user?.useCustomAvatar)) ? (< />checked</>) : null}>
						<label>{i18n("settings.lookup_avatar_by_mail")}</label>
					</div>
				</div>
				<div className={`field tw-pl-4 ${(props.err_Gravatar) ? `error` : ""}`}>
					<label htmlFor="gravatar">Avatar {i18n("email")}</label>
					<input id="gravatar" name="gravatar" value={String(props.user?.avatarEmail ?? "")} />
				</div>
				</>) : null}

				<div className="inline field">
					<div className="ui radio checkbox">
						<input name="source" value="local" type="radio" {...(props.user?.useCustomAvatar ? {"checked": true} : {})} />
						<label>{i18n("settings.enable_custom_avatar")}</label>
					</div>
				</div>

				<div className="inline field tw-pl-4">
					{/* template: shared/avatar_upload_crop */}
				</div>

				<div className="field">
					<button className="ui primary button">{i18n("settings.update_avatar")}</button>
					<button className="ui red button link-action" data-url="./avatar/delete">{i18n("settings.delete_current_avatar")}</button>
				</div>
			</form>
		</div>
	</div>

<div className="ui g-modal-confirm delete modal" id="delete-user-modal">
	<div className="header">
		<span className="svg-icon" aria-label="octicon-trash"></span>
		{i18n("settings.delete_account_title")}
	</div>
	<form className="ui form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} data-action="./delete">
		<div className="content">
			<p>{i18n("settings.delete_account_desc")}</p>
			<div className="field">
				<div className="ui checkbox">
					<label htmlFor="purge">{i18n("admin.users.purge")}</label>
					<input name="purge" type="checkbox" />
				</div>
				<p className="help">{i18n("admin.users.purge_help")}</p>
			</div>
		</div>
		{/* template: base/modal_actions_confirm */}
	</form>
</div>

{/* template: admin/layout_footer */}

  </>)
}
