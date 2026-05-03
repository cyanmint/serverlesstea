// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Account(props: Record<string, unknown>) {
  return (<>
{/* template: user/settings/layout_head */}
	<div className="user-setting-content">
		<h4 className="ui top attached header">
			{i18n("settings.password")}
		</h4>
		<div className="ui attached segment">
			{((!(props.userDisabledFeatures?.contains?.("manage_credentials")) && (props.signedUser?.isLocal || props.signedUser?.isOAuth2))) ? (<>
			<form className="ui form ignore-dirty" action={`/user/settings/account`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				{/* template: base/disable_form_autofill */}
				{(props.signedUser?.isPasswordSet) ? (<>
				<div className={`required field ${(props.err_OldPassword) ? `error` : ""}`}>
					<label htmlFor="old_password">{i18n("settings.old_password")}</label>
					<input id="old_password" name="old_password" type="password" autocomplete="current-password" autofocus required />
				</div>
				</>) : null}
				<div className={`required field ${(props.err_Password) ? `error` : ""}`}>
					<label htmlFor="password">{i18n("settings.new_password")}</label>
					<input id="password" name="password" type="password" autocomplete="new-password" required />
				</div>
				<div className={`required field ${(props.err_Password) ? `error` : ""}`}>
					<label htmlFor="retype">{i18n("settings.retype_new_password")}</label>
					<input id="retype" name="retype" type="password" autocomplete="new-password" required />
				</div>

				<div className="field">
					<button className="ui primary button">{i18n("settings.change_password")}</button>
					<a href={`/user/forgot_password?email=${String(props.email ?? "")}`}>{i18n("auth.forgot_password")}</a>
				</div>
			</form>
			</>) : (<>
			<div className="ui info message">
				<p className="text left">{i18n("settings.password_change_disabled")}</p>
			</div>
			</>)}
		</div>

		{(!(props.userDisabledFeatures?.contains?.("manage_credentials"))) ? (<>
		<h4 className="ui top attached header">
			{i18n("settings.manage_emails")}
		</h4>
		<div className="ui attached segment">
			<div className="ui list flex-items-block">
				{(!(props.userDisabledFeatures?.contains?.("manage_credentials"))) ? (<>
					{((props.emails) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<div className="item tw-flex-wrap">
							<div className="content tw-flex-1">
								<strong>{item.email as any}</strong>
								{(item.isPrimary) ? (<>
									<div className="ui primary label">{i18n("settings.primary")}</div>
								</>) : null}
								{(item.isActivated) ? (<>
									<div className="ui green label">{i18n("settings.activated")}</div>
								</>) : (<>
									<div className="ui label">{i18n("settings.requires_activation")}</div>
								</>)}
							</div>
							<div className="flex-text-block">
							{(!(item.isPrimary)) ? (<>
								<button className="ui red tiny button delete-button" data-modal-id="delete-email" data-url={`/user/settings/account/email/delete`} data-id={String(props.iD ?? "")}>
									{i18n("settings.delete_email")}
								</button>
								{(item.canBePrimary) ? (<>
									<form action={`/user/settings/account/email`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
										<input name="_method" type="hidden" value="PRIMARY" />
										<input name="id" type="hidden" value={String(props.iD ?? "")} />
										<button className="ui primary tiny button">{i18n("settings.primary_email")}</button>
									</form>
								</>) : null}
							</>) : null}
							{(!(item.isActivated)) ? (<>
								<form action={`/user/settings/account/email`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
									<input name="_method" type="hidden" value="SENDACTIVATION" />
									<input name="id" type="hidden" value={String(props.iD ?? "")} />
									{(props.activationsPending) ? (<>
										<button disabled className="ui primary tiny button">{i18n("settings.activations_pending")}</button>
									</>) : (<>
										<button className="ui primary tiny button">{i18n("settings.activate_email")}</button>
									</>)}
								</form>
							</>) : null}
							</div>
						</div>
					</React.Fragment>))}{/* range Emails */}
				</>) : null}{/* if manage_credentials */}
			</div>
		</div>
		</>) : null}

		{(!(props.userDisabledFeatures?.contains?.("manage_credentials"))) ? (<>
		<div className="ui bottom attached segment">
			<form className="ui form" action={`/user/settings/account/email`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div className={`required field ${(props.err_Email) ? `error` : ""}`}>
					<label htmlFor="email">{i18n("settings.add_new_email")}</label>
					<input id="email" name="email" type="email" required {...(!(props.canAddEmails) ? {"disabled": true} : {})} />
				</div>
				<button className="ui primary button" {...(!(props.canAddEmails) ? {"disabled": true} : {})}>
					{i18n("settings.add_email")}
				</button>
			</form>
			{/* if ActivationsPending is false, then CanAddEmails must be true, so if CanAddEmails is false, ActivationsPending must be true */}
			{(!(props.canAddEmails)) ? (<>
				<div className="ui warning message">{i18n("settings.can_not_add_email_activations_pending")}</div>
			</>) : null}
		</div>
		</>) : null}

		{(!(props.userDisabledFeatures?.contains?.("deletion"))) ? (<>
		<h4 className="ui top attached error header">
			{i18n("settings.delete_account")}
		</h4>
		<div className="ui attached error segment">
			<div className="ui red message">
				<p className="text left"><span className="svg-icon" aria-label="octicon-alert"></span> {i18n("settings.delete_prompt")}</p>
				{(props.userDeleteWithComments) ? (<>
				<p className="text left tw-font-semibold">{i18n("settings.delete_with_all_comments")}</p>
				</>) : null}
			</div>
			<form className="ui form ignore-dirty" id="delete-form" action={`/user/settings/account/delete`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				{/* template: base/disable_form_autofill */}
				<div className={`required field ${(props.err_Password) ? `error` : ""}`}>
					<label htmlFor="password-confirmation">{i18n("password")}</label>
					<input id="password-confirmation" name="password" type="password" autocomplete="off" required />
				</div>
				<div className="field">
					<button className="ui red button delete-button" data-modal-id="delete-account" data-type="form" data-form="#delete-form">
						{i18n("settings.confirm_delete_account")}
					</button>
				</div>
			</form>
			<div className="ui g-modal-confirm delete modal" id="delete-account">
				<div className="header">
					<span className="svg-icon" aria-label="octicon-trash"></span>
					{i18n("settings.delete_account_title")}
				</div>
				<div className="content">
					<p>{i18n("settings.delete_account_desc")}</p>
				</div>
				{/* template: base/modal_actions_confirm */}
			</div>
		</div>
		</>) : null}
	</div>

<div className="ui g-modal-confirm delete modal" id="delete-email">
	<div className="header">
		<span className="svg-icon" aria-label="octicon-trash"></span>
		{i18n("settings.email_deletion")}
	</div>
	<div className="content">
		<p>{i18n("settings.email_deletion_desc")}</p>
	</div>
	{/* template: base/modal_actions_confirm */}
</div>

{/* template: user/settings/layout_footer */}

  </>)
}
