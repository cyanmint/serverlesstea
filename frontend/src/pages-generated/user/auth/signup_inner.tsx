import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function SignupInner(props: Record<string, unknown>) {
  return (<>
<div className={`ui container fluid${(props.linkAccountMode) ? ` icon` : ""}`}>
	<h4 className="ui top attached header center">
		{(props.linkAccountMode) ? (<>
			{i18n("auth.oauth_signup_title")}
		</>) : (<>
			{i18n("sign_up")}
		</>)}
	</h4>
	<div className="ui attached segment">
		{(props.isFirstTimeRegistration) ? (<>
			<p>{i18n("auth.sign_up_tip")}</p>
		</>) : null}
		<form className="ui form" action={String(props.signUpLink ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			{((!(props.linkAccountMode) || (props.linkAccountMode && props.linkAccountModeRegister))) ? (<>
			{/* alert */}
			</>) : null}
			{(props.disableRegistration) ? (<>
				<p>{i18n("auth.disable_register_prompt")}</p>
			</>) : (<>
				<div className={`required field ${((props.err_UserName && (!(props.linkAccountMode) || (props.linkAccountMode && props.linkAccountModeRegister)))) ? `error` : ""}`}>
					<label htmlFor="user_name">{i18n("username")}</label>
					<input id="user_name" type="text" name="user_name" value={String(props.user_name ?? "")} autofocus required />
				</div>
				<div className={`required field ${(props.err_Email) ? `error` : ""}`}>
					<label htmlFor="email">{i18n("email")}</label>
					<input id="email" name="email" type="email" value={String(props.email ?? "")} required />
				</div>

				{(!(props.disablePassword)) ? (<>
					<div className={`required field ${((props.err_Password && (!(props.linkAccountMode) || (props.linkAccountMode && props.linkAccountModeRegister)))) ? `error` : ""}`}>
						<label htmlFor="password">{i18n("password")}</label>
						<input id="password" name="password" type="password" value={String(props.password ?? "")} autocomplete="new-password" required />
					</div>
					<div className={`required field ${((props.err_Password && (!(props.linkAccountMode) || (props.linkAccountMode && props.linkAccountModeRegister)))) ? `error` : ""}`}>
						<label htmlFor="retype">{i18n("re_type")}</label>
						<input id="retype" name="retype" type="password" value={String(props.retype ?? "")} autocomplete="new-password" required />
					</div>
				</>) : null}

				{/* template: user/auth/captcha */}

				<div className="inline field">
					<button className="ui primary button tw-w-full">
						{(props.linkAccountMode) ? (<>
							{i18n("auth.oauth_signup_submit")}
						</>) : (<>
							{i18n("auth.create_new_account")}
						</>)}
					</button>
				</div>
			</>)}
			{/* $showExternalAuthMethods */}
			{(props.showExternalAuthMethods) ? (<>
				<div className="divider divider-text">{i18n("sign_in_or")}</div>
				{/* template: user/auth/external_auth_methods */}
			</>) : null}
		</form>
	</div>
</div>

<div className="ui container fluid">
	{(!(props.linkAccountMode)) ? (<>
	<div className="ui attached segment header top tw-flex tw-flex-col tw-items-center">
		<div className="field">
			<span>{i18n("auth.already_have_account")}</span>
			<a href={`/user/login`}>{i18n("auth.sign_in_now")}</a>
		</div>
	</div>
	</>) : null}
</div>

  </>)
}
