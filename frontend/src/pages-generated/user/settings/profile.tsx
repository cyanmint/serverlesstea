// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Profile(props: Record<string, unknown>) {
  return (<>
{/* template: user/settings/layout_head */}
	<div className="user-setting-content">
		<h4 className="ui top attached header">
			{i18n("settings.public_profile")}
		</h4>
		<div className="ui attached segment">
			<p>{i18n("settings.profile_desc")}</p>
			<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div className={`required field ${(props.err_Name) ? `error` : ""}`}>
					<label htmlFor="username">{i18n("username")}
						<span className="tw-text-red tw-hidden" id="name-change-prompt"> {i18n("settings.change_username_prompt")}</span>
						<span className="tw-text-red tw-hidden" id="name-change-redirect-prompt"> {i18n("settings.change_username_redirect_prompt")}</span>
					</label>
					<input id="username" name="name" value={String(props.signedUser?.name ?? "")} data-name={String(props.signedUser?.name ?? "")} required {...((!(props.signedUser?.isLocal) || props.userDisabledFeatures?.contains?.("change_username") || props.isReverseProxy) ? {"disabled": true} : {})} maxlength="40" />
					{((!(props.signedUser?.isLocal) || props.userDisabledFeatures?.contains?.("change_username") || props.isReverseProxy)) ? (<>
					<p className="help tw-text-blue">{i18n("settings.password_username_disabled")}</p>
					</>) : null}
				</div>
				<div className={`field ${(props.err_FullName) ? `error` : ""}`}>
					<label htmlFor="full_name">{i18n("settings.full_name")}</label>
					<input id="full_name" name="full_name" value={String(props.signedUser?.fullName ?? "")} {...(props.userDisabledFeatures?.contains?.("change_full_name") ? {"disabled": true} : {})} maxlength="100" />
					{(props.userDisabledFeatures?.contains?.("change_full_name")) ? (<>
					<p className="help tw-text-blue">{i18n("settings.password_full_name_disabled")}</p>
					</>) : null}
				</div>
				<div className={`field ${(props.err_Email) ? `error` : ""}`}>
					<label>{i18n("email")}</label>
					<p id="signed-user-email">{props.signedUser?.email as any}</p>
				</div>
				<div className={`field ${(props.err_Description) ? `error` : ""}`}>
					{/* it is rendered as markdown, but the length is limited, so at the moment we do not use the markdown editor here */}
					<label htmlFor="description">{i18n("user.user_bio")}</label>
					<textarea id="description" name="description" rows="2" placeholder={String(i18n("settings.biography_placeholder") ?? "")} maxlength="255">{props.signedUser?.description as any}</textarea>
				</div>
				<div className={`field ${(props.err_Website) ? `error` : ""}`}>
					<label htmlFor="website">{i18n("settings.website")}</label>
					<input id="website" name="website" type="url" value={String(props.signedUser?.website ?? "")} maxlength="255" />
				</div>
				<div className="field">
					<label htmlFor="location">{i18n("settings.location")}</label>
					<input id="location" name="location" placeholder={String(i18n("settings.location_placeholder") ?? "")} value={String(props.signedUser?.location ?? "")} maxlength="50" />
				</div>

				<div className="divider"></div>
				{'{'}/* private block */{'}'}

				<div className="field" id="privacy-user-settings">
					<label><strong>{i18n("settings.privacy")}</strong></label>
				</div>

				<div className={`inline field ${(props.err_Visibility) ? `error` : ""}`}>
					<span className="inline required field"><label>{i18n("settings.visibility")}</label></span>
					<div className="ui selection type dropdown">
						{(props.signedUser?.visibility?.isPublic) ? (<><input type="hidden" id="visibility" name="visibility" value="0" /></>) : null}
						{(props.signedUser?.visibility?.isLimited) ? (<><input type="hidden" id="visibility" name="visibility" value="1" /></>) : null}
						{(props.signedUser?.visibility?.isPrivate) ? (<><input type="hidden" id="visibility" name="visibility" value="2" /></>) : null}
						<div className="text">
							{(props.signedUser?.visibility?.isPublic) ? (<>{i18n("settings.visibility.public")}</>) : null}
							{(props.signedUser?.visibility?.isLimited) ? (<>{i18n("settings.visibility.limited")}</>) : null}
							{(props.signedUser?.visibility?.isPrivate) ? (<>{i18n("settings.visibility.private")}</>) : null}
						</div>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu">
							{((props.allowedUserVisibilityModes) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								{(item.mode?.isPublic) ? (<>
									<div className="item" data-tooltip-content={String(i18n("settings.visibility.public_tooltip") ?? "")} data-value="0">{i18n("settings.visibility.public")}</div>
								</>) : null} {(item.mode?.isLimited) ? (<>
									<div className="item" data-tooltip-content={String(i18n("settings.visibility.limited_tooltip") ?? "")} data-value="1">{i18n("settings.visibility.limited")}</div>
								</>) : null} {(item.mode?.isPrivate) ? (<>
									<div className="item" data-tooltip-content={String(i18n("settings.visibility.private_tooltip") ?? "")} data-value="2">{i18n("settings.visibility.private")}</div>
								</>) : null}
							</React.Fragment>))}
						</div>
					</div>
				</div>

				<div className="field">
					<div className="ui checkbox">
						<label data-tooltip-content={String(i18n("settings.keep_email_private_popup") ?? "")}><strong>{i18n("settings.keep_email_private")}</strong></label>
						<input name="keep_email_private" type="checkbox" {...(props.signedUser?.keepEmailPrivate ? {"checked": true} : {})} />
					</div>
				</div>

				<div className="field">
					<div className="ui checkbox" id="keep-activity-private">
						<label data-tooltip-content={String(i18n("settings.keep_activity_private_popup") ?? "")}><strong>{i18n("settings.keep_activity_private")}</strong></label>
						<input name="keep_activity_private" type="checkbox" {...(props.signedUser?.keepActivityPrivate ? {"checked": true} : {})} />
					</div>
				</div>

				<div className="divider"></div>

				<div className="field">
					<button className="ui primary button">{i18n("settings.update_profile")}</button>
				</div>
			</form>
		</div>

		<h4 className="ui top attached header">
			{i18n("settings.avatar")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" action={`${String(props.link ?? "")}/avatar`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} enctype="multipart/form-data">
				{(!(props.disableGravatar)) ? (<>
				<div className="inline field">
					<div className="ui radio checkbox">
						<input name="source" value="lookup" type="radio" {...(!(props.signedUser?.useCustomAvatar) ? {"checked": true} : {})} />
						<label>{i18n("settings.lookup_avatar_by_mail")}</label>
					</div>
				</div>
				<div className={`field tw-pl-4 ${(props.err_Gravatar) ? `error` : ""}`}>
					<label htmlFor="gravatar">Avatar {i18n("email")}</label>
					<input id="gravatar" name="gravatar" value={String(props.signedUser?.avatarEmail ?? "")} />
				</div>
				</>) : null}

				<div className="inline field">
					<div className="ui radio checkbox">
						<input name="source" value="local" type="radio" {...(props.signedUser?.useCustomAvatar ? {"checked": true} : {})} />
						<label>{i18n("settings.enable_custom_avatar")}</label>
					</div>
				</div>

				<div className="inline field tw-pl-4">
					{/* template: shared/avatar_upload_crop */}
				</div>

				<div className="field">
					<button className="ui primary button">{i18n("settings.update_avatar")}</button>
					<button className="ui red button link-action" data-url={`${String(props.link ?? "")}/avatar/delete`}>{i18n("settings.delete_current_avatar")}</button>
				</div>
			</form>
		</div>
	</div>
{/* template: user/settings/layout_footer */}

  </>)
}
