import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function LinkMenu(props: Record<string, unknown>) {
  return (<>
{/* $size */}
{(props.size) ? (<>
	{/* TODO: {{$size = .Size}} */}
</>) : null}
<div className="menu">
	<a className="item" href={`${String(props.baseLinkNew ?? "")}/gitea/new`}>
		{/* template: shared/webhook/icon */}
		{i18n("repo.settings.web_hook_name_gitea")}
	</a>
	<a className="item" href={`${String(props.baseLinkNew ?? "")}/gogs/new`}>
		{/* template: shared/webhook/icon */}
		{i18n("repo.settings.web_hook_name_gogs")}
	</a>
	<a className="item" href={`${String(props.baseLinkNew ?? "")}/slack/new`}>
		{/* template: shared/webhook/icon */}
		{i18n("repo.settings.web_hook_name_slack")}
	</a>
	<a className="item" href={`${String(props.baseLinkNew ?? "")}/discord/new`}>
		{/* template: shared/webhook/icon */}
		{i18n("repo.settings.web_hook_name_discord")}
	</a>
	<a className="item" href={`${String(props.baseLinkNew ?? "")}/dingtalk/new`}>
		{/* template: shared/webhook/icon */}
		{i18n("repo.settings.web_hook_name_dingtalk")}
	</a>
	<a className="item" href={`${String(props.baseLinkNew ?? "")}/telegram/new`}>
		{/* template: shared/webhook/icon */}
		{i18n("repo.settings.web_hook_name_telegram")}
	</a>
	<a className="item" href={`${String(props.baseLinkNew ?? "")}/msteams/new`}>
		{/* template: shared/webhook/icon */}
		{i18n("repo.settings.web_hook_name_msteams")}
	</a>
	<a className="item" href={`${String(props.baseLinkNew ?? "")}/feishu/new`}>
		{/* template: shared/webhook/icon */}
		{i18n("repo.settings.web_hook_name_feishu_or_larksuite")}
	</a>
	<a className="item" href={`${String(props.baseLinkNew ?? "")}/matrix/new`}>
		{/* template: shared/webhook/icon */}
		{i18n("repo.settings.web_hook_name_matrix")}
	</a>
	<a className="item" href={`${String(props.baseLinkNew ?? "")}/wechatwork/new`}>
		{/* template: shared/webhook/icon */}
		{i18n("repo.settings.web_hook_name_wechatwork")}
	</a>
	<a className="item" href={`${String(props.baseLinkNew ?? "")}/packagist/new`}>
		{/* template: shared/webhook/icon */}
		{i18n("repo.settings.web_hook_name_packagist")}
	</a>
</div>

  </>)
}
