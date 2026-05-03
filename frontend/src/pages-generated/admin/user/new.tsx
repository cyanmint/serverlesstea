// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function New(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.users.new_account")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				{/* template: base/disable_form_autofill */}
				{'{'}/* Types and name */{'}'}
				<div className={`inline required field ${(props.err_LoginType) ? `error` : ""}`}>
					<label>{i18n("admin.users.auth_source")}</label>
					<div className="ui selection type dropdown">
						<input type="hidden" id="login_type" name="login_type" value={String(props.login_type ?? "")} data-password="required" required />
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
						<input type="hidden" id="visibility" name="visibility" value={`${(props.visibility) ? `` : ``}`} />
						<div className="text">
							{(props.defaultUserVisibilityMode?.isPublic) ? (<>{i18n("settings.visibility.public")}</>) : null}
							{(props.defaultUserVisibilityMode?.isLimited) ? (<>{i18n("settings.visibility.limited")}</>) : null}
							{(props.defaultUserVisibilityMode?.isPrivate) ? (<>{i18n("settings.visibility.private")}</>) : null}
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

				<div className={`required non-local field ${(props.err_LoginName) ? `error` : ""} ${(props.login_type === "0-0") ? `tw-hidden` : ""}`}>
					<label htmlFor="login_name">{i18n("admin.users.auth_login_name")}</label>
					<input id="login_name" name="login_name" value={String(props.login_name ?? "")} />
				</div>
				<div className={`required field ${(props.err_UserName) ? `error` : ""}`}>
					<label htmlFor="user_name">{i18n("username")}</label>
					<input id="user_name" type="text" name="user_name" value={String(props.user_name ?? "")} autofocus required maxlength="40" />
				</div>
				<div className={`required field ${(props.err_Email) ? `error` : ""}`}>
					<label htmlFor="email">{i18n("email")}</label>
					<input id="email" name="email" type="email" value={String(props.email ?? "")} required />
				</div>
				<div className={`required local field ${(props.err_Password) ? `error` : ""} ${(!(props.login_type === "0-0")) ? `tw-hidden` : ""}`}>
					<label htmlFor="password">{i18n("password")}</label>
					<input id="password" name="password" type="password" autocomplete="new-password" value={String(props.password ?? "")} {...(props.login_type === "0-0" ? {"required": true} : {})} />
				</div>

				<div className={`inline field local ${(props.login_type !== "0-0") ? `tw-hidden` : ""}`}>
					<div className="ui checkbox">
						<label><strong>{i18n("auth.allow_password_change")}</strong></label>
						<input name="must_change_password" type="checkbox" defaultChecked />
					</div>
				</div>

				{'{'}/* Send register notify e-mail */{'}'}
				{(props.canSendEmail) ? (<>
					<div className="inline field">
						<div className="ui checkbox">
							<label><strong>{i18n("admin.users.send_register_notify")}</strong></label>
							<input name="send_notify" type="checkbox" {...(props.send_notify ? {"checked": true} : {})} />
						</div>
					</div>
				</>) : null}

				<div className="field">
					<button className="ui primary button">{i18n("admin.users.new_account")}</button>
				</div>
			</form>
		</div>
	</div>
{/* template: admin/layout_footer */}

  </>)
}
