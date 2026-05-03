// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function LinkAccount(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content user link-account">
	<overflow-menu className="ui secondary pointing tabular top attached borderless menu secondary-nav">
		<div className="overflow-menu-items tw-justify-center" data-global-init="initTabSwitcher">
			{/* TODO handle .ShowRegistrationButton once other login bugs are fixed */}
			{(!(props.allowOnlyInternalRegistration)) ? (<>
				<a className={`item ${(!(props.user_exists)) ? `active` : ""}`} data-tab="auth-link-signup-tab">
					{i18n("auth.oauth_signup_tab")}
				</a>
			</>) : null}
			<a className={`item ${(props.user_exists) ? `active` : ""}`} data-tab="auth-link-signin-tab">
				{i18n("auth.oauth_signin_tab")}
			</a>
		</div>
	</overflow-menu>
	<div className="ui middle very relaxed page grid">
		<div className="column tw-my-5">
			{/* these styles are quite tricky but it needs to be the same as the signin page */}
			<div className={`ui tab ${(!(props.user_exists)) ? `active` : ""}`} data-tab="auth-link-signup-tab">
				<div className="tw-flex tw-flex-col tw-gap-4 tw-max-w-2xl tw-m-auto">
				{(props.autoRegistrationFailedPrompt) ? (<><div className="ui message">{props.autoRegistrationFailedPrompt as any}</div></>) : null}
				{/* template: user/auth/signup_inner */}
				</div>
			</div>
			<div className={`ui tab ${(props.user_exists) ? `active` : ""}`} data-tab="auth-link-signin-tab">
				<div className="tw-flex tw-flex-col tw-gap-4 tw-max-w-2xl tw-m-auto">
				{/* template: user/auth/signin_inner */}
				</div>
			</div>
		</div>
	</div>
</div>



  </>)
}
