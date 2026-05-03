// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function New(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{props.customHeaderTitle as any}
	<div className="ui right type dropdown">
		<div className="text flex-text-inline">
			{/* template: shared/webhook/icon */}
			{/* TODO: {{ctx.Locale.Tr (print "repo.settings.web_hook_name_" .ctxData.HookType)}} */}
		</div>
		<span className="svg-icon" aria-label="octicon-triangle-down"></span>
		{/* template: repo/settings/webhook/link_menu */}
	</div>
</h4>
<div className="ui attached segment">
	{/* template: repo/settings/webhook/gitea */}
	{/* template: repo/settings/webhook/gogs */}
	{/* template: repo/settings/webhook/slack */}
	{/* template: repo/settings/webhook/discord */}
	{/* template: repo/settings/webhook/dingtalk */}
	{/* template: repo/settings/webhook/telegram */}
	{/* template: repo/settings/webhook/msteams */}
	{/* template: repo/settings/webhook/feishu */}
	{/* template: repo/settings/webhook/matrix */}
	{/* template: repo/settings/webhook/wechatwork */}
	{/* template: repo/settings/webhook/packagist */}
</div>
{/* template: repo/settings/webhook/history */}

  </>)
}
