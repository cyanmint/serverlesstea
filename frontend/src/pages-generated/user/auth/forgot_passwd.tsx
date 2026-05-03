// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ForgotPasswd(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content user forgot password">
	<div className="ui middle very relaxed page grid">
		<div className="column">
			<form className="ui form ignore-dirty" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<h2 className="ui top attached header">
					{i18n("auth.forgot_password_title")}
				</h2>
				<div className="ui attached segment">
					{/* alert */}
					{(props.isResetSent) ? (<>
						<p>{i18n("auth.reset_password_mail_sent_prompt")}</p>
					</>) : null} {(props.isResetRequest) ? (<>
						<div className={`required field ${(props.err_Email) ? `error` : ""}`}>
							<label htmlFor="email">{i18n("email")}</label>
							<input id="email" name="email" type="email"  value={String(props.email ?? "")} autofocus required />
						</div>
						<div className="divider"></div>
						<div className="inline field">
							<button className="ui primary button">{i18n("auth.send_reset_mail")}</button>
						</div>
					</>) : null} {(props.isResetDisable) ? (<>
						<p className="center">
							{(props.isAdmin) ? (<>
								{i18n("auth.disable_forgot_password_mail_admin")}
							</>) : (<>
								{i18n("auth.disable_forgot_password_mail")}
							</>)}
						</p>
					</>) : null} {(props.resendLimited) ? (<>
						<p className="center">{i18n("auth.resent_limit_prompt")}</p>
					</>) : null}
				</div>
			</form>
		</div>
	</div>
</div>


  </>)
}
