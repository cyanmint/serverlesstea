import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function TwofaScratch(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content user signin">
	<div className="ui middle very relaxed page grid">
		<div className="column">
			<form className="ui form tw-max-w-2xl tw-m-auto" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<h3 className="ui top attached header">
					{i18n("twofa_scratch")}
				</h3>
				<div className="ui attached segment">
					{/* alert */}
					<div className="required field">
						<label htmlFor="token">{i18n("auth.scratch_code")}</label>
						<input id="token" name="token" type="text" autocomplete="off" autofocus required />
					</div>

					<div className="inline field">
						<button className="ui primary button">{i18n("auth.verify")}</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>


  </>)
}
