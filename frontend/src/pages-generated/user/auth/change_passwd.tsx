// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ChangePasswd(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className={`page-content user signin${(props.linkAccountMode) ? ` icon` : ""}`}>
	<div className="ui container">
		{/* template: user/auth/change_passwd_inner */}
	</div>
</div>


  </>)
}
