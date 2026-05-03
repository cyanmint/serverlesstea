// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ResetPasswd(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content user reset password">
	<div className="ui middle very relaxed page grid">
		<div className="column">
			<form className="ui form ignore-dirty" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<input name="code" type="hidden" value={String(props.code ?? "")} />
				<h2 className="ui top attached header">
					{i18n("auth.reset_password")}
				</h2>
				<div className="ui attached segment">
					{/* alert */}
					{(props.user_email) ? (<>
						<div className="inline field">
							<label htmlFor="user_name">{i18n("email")}</label>
							<input id="user_name" type="text" value={String(props.user_email ?? "")} disabled />
						</div>
					</>) : null}
					{(props.isResetForm) ? (<>
						<div className={`required field ${(props.err_Password) ? `error` : ""}`}>
							<label htmlFor="password">{i18n("settings.new_password")}</label>
							<input id="password" name="password" type="password"  value={String(props.password ?? "")} autocomplete="new-password" autofocus required />
						</div>
						{(!(props.user_signed_in)) ? (<>
						<div className="inline field">
							<div className="ui checkbox">
								<label>{i18n("auth.remember_me")}</label>
								<input name="remember" type="checkbox" />
							</div>
						</div>
						</>) : null}
						{(props.has_two_factor) ? (<>
						<h4 className="ui dividing header">
							{i18n("twofa")}
						</h4>
						<div className="ui warning visible message">{i18n("settings.twofa_is_enrolled")}</div>
							{(props.scratch_code) ? (<>
							<div className={`required inline field ${(props.err_Token) ? `error` : ""}`}>
								<label htmlFor="token">{i18n("auth.scratch_code")}</label>
								<input id="token" name="token" type="text" autocomplete="off" autofocus required />
							</div>
							<input type="hidden" name="scratch_code" value="true" />
							</>) : (<>
							<div className={`required field ${(props.err_Passcode) ? `error` : ""}`}>
								<label htmlFor="passcode">{i18n("passcode")}</label>
								<input id="passcode" name="passcode" type="number" autocomplete="off" autofocus required />
							</div>
							</>)}
						</>) : null}
						<div className="divider"></div>
						<div className="inline field">
							<button className="ui primary button">{i18n("auth.reset_password_helper")}</button>
							{((props.has_two_factor && !(props.scratch_code))) ? (<>
								<a href={`?code=${String(props.code ?? "")}&scratch_code=true`}>{i18n("auth.use_scratch_code")}</a>
							</>) : null}
						</div>
					</>) : (<>
						<p className="center">{i18n("auth.invalid_code_forgot_password")}</p>
					</>)}
				</div>
			</form>
		</div>
	</div>
</div>


  </>)
}
