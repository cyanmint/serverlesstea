// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function SignupOpenidConnect(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content user signup">
	{/* template: user/auth/signup_openid_navbar */}
	<div className="ui container medium-width">
		{/* alert */}
		<h4 className="ui top attached header">
			{i18n("auth.openid_connect_title")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form left-right-form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div className="inline field">
					<span className="help">{i18n("auth.openid_connect_desc")}</span>
				</div>
				<div className={`required inline field ${(props.err_UserName) ? `error` : ""}`}>
					<label htmlFor="user_name">{i18n("home.uname_holder")}</label>
					<input id="user_name" type="text" name="user_name" value={String(props.user_name ?? "")} autofocus required />
				</div>
				<div className={`required inline field ${(props.err_Password) ? `error` : ""}`}>
					<label htmlFor="password">{i18n("password")}</label>
					<input id="password" name="password" type="password" value={String(props.password ?? "")} autocomplete="off" required />
				</div>
				<div className="inline field">
					<label htmlFor="openid">OpenID URI</label>
					<input id="openid" value={String(props.openID ?? "")} readonly />
				</div>
				<div className="inline field">
					<label></label>
					<button className="ui primary button">{i18n("auth.openid_connect_submit")}</button>
					<a href={`/user/forgot_password`}>{i18n("auth.forgot_password")}</a>
				</div>
			</form>
		</div>
	</div>
</div>


  </>)
}
