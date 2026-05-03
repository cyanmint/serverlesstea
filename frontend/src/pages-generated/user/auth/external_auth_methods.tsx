// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ExternalAuthMethods(props: Record<string, unknown>) {
  return (<>
<div id="external-login-navigator" className="tw-py-1 tw-flex tw-flex-col tw-gap-3">
	{((props.oAuth2Providers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<a className="ui button external-login-link tw-gap-3" data-require-appurl-check="true" rel="nofollow" href={`/user/oauth2/`}>
			{/* TODO: {{$provider.IconHTML 24}} */} {i18n("sign_in_with_provider")}
		</a>
	</React.Fragment>))}
	{(props.enableOpenIDSignIn) ? (<>
		<a className="ui button external-login-link tw-gap-3" data-require-appurl-check="true" rel="nofollow" href={`/user/login/openid`}>
			<span className="svg-icon" aria-label="fontawesome-openid"></span> {i18n("sign_in_with_provider")}
		</a>
	</>) : null}
	{(props.enableSSPI) ? (<>
		<a className="ui button external-login-link tw-gap-3" rel="nofollow" href={`/user/login?auth_with_sspi=1`}>
			<span className="svg-icon" aria-label="fontawesome-windows"></span> Windows SSPI
		</a>
	</>) : null}
</div>

  </>)
}
