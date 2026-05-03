// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function SigninOpenid(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content user signin openid">
	<div className="ui middle very relaxed page grid">
		<div className="column tw-flex tw-flex-col tw-gap-4 tw-max-w-2xl tw-m-auto">
			<a href={`/user/login`} className="tw-mx-auto">
				<img width="100" height="100" src={`/img/logo.svg`} alt={String(i18n("logo") ?? "")} />
			</a>

			<div className="ui container fluid">
				{/* alert */}
				<h4 className="ui top attached header center">
					<span className="svg-icon" aria-label="fontawesome-openid"></span>
					OpenID
				</h4>
				<div className="ui attached segment">
					<form className="ui form tw-m-auto" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
						<div className="inline field">
							{i18n("auth.openid_signin_desc")}
						</div>
						<div className={`required field ${(props.err_OpenID) ? `error` : ""}`}>
							<label htmlFor="openid">
							<span className="svg-icon" aria-label="fontawesome-openid"></span>
							OpenID URI
							</label>
							<input id="openid" name="openid" value={String(props.openid ?? "")} autofocus required />
						</div>
						<div className="inline field">
							<div className="ui checkbox">
								<label>{i18n("auth.remember_me")}</label>
								<input name="remember" type="checkbox" />
							</div>
						</div>
						<div className="inline field">
							<button className="ui primary button tw-w-full">{i18n("sign_in")}</button>
						</div>
					</form>
				</div>
			</div>

			<div className="ui container fluid">
				{/* template: user/auth/webauthn_error */}

				<div className="ui attached segment header top tw-flex tw-flex-col tw-items-center">
					<a href={`/user/login`}>{i18n("auth.back_to_sign_in")}</a>
				</div>
			</div>
		</div>
	</div>
</div>


  </>)
}
