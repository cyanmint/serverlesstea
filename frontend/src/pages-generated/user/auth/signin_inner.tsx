import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function SigninInner(props: Record<string, unknown>) {
  return (<>
<div className="ui container fluid">
	{((!(props.linkAccountMode) || (props.linkAccountMode && props.linkAccountModeSignIn))) ? (<>
	{/* alert */}
	</>) : null}
	<h4 className="ui top attached header center">
		{(props.linkAccountMode) ? (<>
			{i18n("auth.oauth_signin_title")}
		</>) : (<>
			{i18n("auth.login_userpass")}
		</>)}
	</h4>
	<div className="ui attached segment">
		{(props.enablePasswordSignInForm) ? (<>
		<form className="ui form" action={String(props.signInLink ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<div className={`required field ${((props.err_UserName && (!(props.linkAccountMode) || (props.linkAccountMode && props.linkAccountModeSignIn)))) ? `error` : ""}`}>
				<label htmlFor="user_name">{i18n("home.uname_holder")}</label>
				<input id="user_name" type="text" name="user_name" value={String(props.user_name ?? "")} autofocus required tabIndex="1" />
			</div>
			{((!(props.disablePassword) || props.linkAccountMode)) ? (<>
			<div className={`required field ${((props.err_Password && (!(props.linkAccountMode) || (props.linkAccountMode && props.linkAccountModeSignIn)))) ? `error` : ""}`}>
				<div className="tw-flex tw-mb-1">
					<label htmlFor="password" className="tw-flex-1">{i18n("password")}</label>
					<a href={`/user/forgot_password`} tabIndex="4">{i18n("auth.forgot_password")}</a>
				</div>
				<input id="password" name="password" type="password" value={String(props.password ?? "")} autocomplete="current-password" required tabIndex="2" />
			</div>
			</>) : null}
			{(!(props.linkAccountMode)) ? (<>
			<div className="inline field">
				<div className="ui checkbox">
					<label>{i18n("auth.remember_me")}</label>
					<input name="remember" type="checkbox" tabIndex="5" />
				</div>
			</div>
			</>) : null}

			{/* template: user/auth/captcha */}

			<div className="field">
				<button className="ui primary button tw-w-full" tabIndex="3">
					{(props.linkAccountMode) ? (<>
						{i18n("auth.oauth_signin_submit")}
					</>) : (<>
						{i18n("sign_in")}
					</>)}
				</button>
			</div>
		</form>
		</>) : null}{/* end if .EnablePasswordSignInForm */}
		{/* $showExternalAuthMethods */}
		{((props.showExternalAuthMethods && props.enablePasswordSignInForm)) ? (<>
			<div className="divider divider-text">{i18n("sign_in_or")}</div>
		</>) : null}
		{(props.showExternalAuthMethods) ? (<>
			{/* template: user/auth/external_auth_methods */}
		</>) : null}
	</div>
</div>

{((props.enablePasskeyAuth || props.showRegistrationButton)) ? (<>
<div className="ui container fluid">
	<div className="ui attached segment header top tw-max-w-2xl tw-m-auto tw-flex tw-flex-col tw-items-center">
		{(props.enablePasskeyAuth) ? (<>
			{/* template: user/auth/webauthn_error */}
			<a className="signin-passkey">{i18n("auth.signin_passkey")}</a>
		</>) : null}

		{(props.showRegistrationButton) ? (<>
			<div className="field">
				<span>{i18n("auth.need_account")}</span>
				<a href={`/user/sign_up`}>{i18n("auth.sign_up_now")}</a>
			</div>
		</>) : null}
	</div>
</div>
</>) : null}

  </>)
}
