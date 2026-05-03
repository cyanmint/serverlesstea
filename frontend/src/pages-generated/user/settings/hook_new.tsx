// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function HookNew(props: Record<string, unknown>) {
  return (<>
{/* template: user/settings/layout_head */}
	<div className="user-setting-content">
		{/* $CustomHeaderTitle */}
		{(props.pageIsSettingsHooksNew) ? (<>{/* TODO: {{$CustomHeaderTitle = ctx.Locale.Tr "repo.settings.add_webhook"}} */}</>) : null}
		{/* template: webhook/new */}
	</div>
{/* template: user/settings/layout_footer */}

  </>)
}
