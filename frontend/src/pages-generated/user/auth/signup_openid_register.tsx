import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function SignupOpenidRegister(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content user signup">
	{/* template: user/auth/signup_openid_navbar */}
	<div className="ui container">
				{/* alert */}
				<h4 className="ui top attached header">
					{i18n("auth.openid_register_title")}
				</h4>
				<div className="ui attached segment">
					<p>
						{i18n("auth.openid_register_desc")}
					</p>
					<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					<div className={`required field ${(props.err_UserName) ? `error` : ""}`}>
						<label htmlFor="user_name">{i18n("username")}</label>
						<input id="user_name" type="text" name="user_name" value={String(props.user_name ?? "")} autofocus required />
					</div>
					<div className={`required field ${(props.err_Email) ? `error` : ""}`}>
						<label htmlFor="email">{i18n("email")}</label>
						<input id="email" name="email" type="email" value={String(props.email ?? "")} required />
					</div>

					{/* template: user/auth/captcha */}

					<div className="field">
						<label htmlFor="openid">OpenID URI</label>
						<input id="openid" value={String(props.openID ?? "")} readonly />
					</div>
					<div className="inline field">
						<button className="ui primary button">{i18n("auth.create_new_account")}</button>
					</div>
					</form>
				</div>
	</div>
</div>


  </>)
}
