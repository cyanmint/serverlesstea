import React from 'react'
import { i18n } from '../../lib/i18n'

export default function HookNew(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		{/* $CustomHeaderTitle */}
		{(props.pageIsAdminDefaultHooksNew) ? (<>
			{/* TODO: {{$CustomHeaderTitle = ctx.Locale.Tr "admin.defaulthooks.add_webhook"}} */}
		</>) : null} {(props.pageIsAdminSystemHooksNew) ? (<>
			{/* TODO: {{$CustomHeaderTitle = ctx.Locale.Tr "admin.systemhooks.add_webhook"}} */}
		</>) : null} {(props.webhook?.isSystemWebhook) ? (<>
			{/* TODO: {{$CustomHeaderTitle = ctx.Locale.Tr "admin.systemhooks.update_webhook"}} */}
		</>) : null}
		{/* template: webhook/new */}
	</div>
{/* template: admin/layout_footer */}

  </>)
}
