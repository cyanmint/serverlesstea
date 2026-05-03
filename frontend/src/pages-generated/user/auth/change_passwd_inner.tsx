// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ChangePasswdInner(props: Record<string, unknown>) {
  return (<>
		{((!(props.linkAccountMode) || (props.linkAccountMode && props.linkAccountModeSignIn))) ? (<>
		{/* alert */}
		</>) : null}
		<h4 className="ui top attached header center">
			{i18n("settings.change_password")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form tw-max-w-2xl tw-m-auto" action={String(props.changePasscodeLink ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<div className={`required field ${((props.err_Password && (!(props.linkAccountMode) || (props.linkAccountMode && props.linkAccountModeSignIn)))) ? `error` : ""}`}>
				<label htmlFor="password">{i18n("password")}</label>
				<input id="password" name="password" type="password" value={String(props.password ?? "")} autocomplete="new-password" required />
			</div>
			<div className={`required field ${((props.err_Password && (!(props.linkAccountMode) || (props.linkAccountMode && props.linkAccountModeRegister)))) ? `error` : ""}`}>
				<label htmlFor="retype">{i18n("re_type")}</label>
				<input id="retype" name="retype" type="password" autocomplete="new-password" required />
			</div>
			<div className="inline field">
				<button className="ui primary button">{i18n("settings.change_password")}</button>
			</div>
			</form>
		</div>

  </>)
}
