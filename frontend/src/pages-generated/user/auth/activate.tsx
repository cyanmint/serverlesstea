import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Activate(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content user activate">
	<div className="ui middle very relaxed page grid">
		<div className="column">
			<form className="ui form ignore-dirty tw-max-w-2xl tw-m-auto" action={`/user/activate`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<h2 className="ui top attached header">
					{i18n("auth.active_your_account")}
				</h2>
				<div className="ui attached segment">
					{/* alert */}
					{(props.needVerifyLocalPassword) ? (<>
						<div className="required field">
							<label htmlFor="verify-password">{i18n("password")}</label>
							<input id="verify-password" name="password" type="password" autocomplete="off" required />
						</div>
						<div className="inline field">
							<button className="ui primary button">{i18n("install.confirm_password")}</button>
						</div>
						<input name="code" type="hidden" value={String(props.activationCode ?? "")} />
					</>) : (<>
						<p>{i18n("auth.has_unconfirmed_mail")}</p>
						<details>
							<summary>{i18n("auth.change_unconfirmed_mail_address")}</summary>
							<div className="tw-py-2">
								<label htmlFor="change-email">{i18n("email")}</label>
								<input id="change-email" name="change_email" type="email" value={String(props.signedUser?.email ?? "")} />
							</div>
						</details>
						<div className="divider"></div>
						<div className="text">
							<button className="ui primary button">{i18n("auth.resend_mail")}</button>
						</div>
					</>)}
				</div>
			</form>
		</div>
	</div>
</div>


  </>)
}
