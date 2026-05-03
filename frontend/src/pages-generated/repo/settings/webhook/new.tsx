import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function New(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="repo-setting-content">
		{/* $CustomHeaderTitle */}
		{(props.pageIsSettingsHooksNew) ? (<>{/* TODO: {{$CustomHeaderTitle = ctx.Locale.Tr "repo.settings.add_webhook"}} */}</>) : null}
		{/* template: webhook/new */}
	</div>
{/* template: repo/settings/layout_footer */}

  </>)
}
