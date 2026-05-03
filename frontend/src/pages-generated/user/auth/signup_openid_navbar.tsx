import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function SignupOpenidNavbar(props: Record<string, unknown>) {
  return (<>
<overflow-menu className="ui secondary pointing tabular top attached borderless menu secondary-nav">
	<div className="overflow-menu-items tw-justify-center">
		<a className={`${(props.pageIsOpenIDConnect) ? `active ` : ""}item`} href={`/user/openid/connect`}>
			{i18n("auth.openid_connect_title")}
		</a>
		{((props.enableOpenIDSignUp && !(props.allowOnlyInternalRegistration))) ? (<>
			<a className={`${(props.pageIsOpenIDRegister) ? `active ` : ""}item`} href={`/user/openid/register`}>
				{i18n("auth.openid_register_title")}
			</a>
		</>) : null}
	</div>
</overflow-menu>

  </>)
}
