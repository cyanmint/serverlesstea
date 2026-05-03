import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Security(props: Record<string, unknown>) {
  return (<>
{/* template: user/settings/layout_head */}
	{(!(props.userDisabledFeatures?.contains?.("manage_mfa", "manage_credentials"))) ? (<>
	<div className="user-setting-content">
		{(!(props.userDisabledFeatures?.contains?.("manage_mfa"))) ? (<>
		{/* template: user/settings/security/twofa */}
		{/* template: user/settings/security/webauthn */}
		</>) : null}
		{(!(props.userDisabledFeatures?.contains?.("manage_credentials"))) ? (<>
		{/* template: user/settings/security/accountlinks */}
		{(props.enableOpenIDSignIn) ? (<>
		{/* template: user/settings/security/openid */}
		</>) : null}
		</>) : null}
	</div>
	</>) : null}

{/* template: user/settings/layout_footer */}

  </>)
}
