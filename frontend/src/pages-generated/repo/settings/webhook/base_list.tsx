// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function BaseList(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{props.title as any}
	<div className="ui right">
		<div className="ui jump dropdown">
			<div className="ui primary tiny button">{i18n("repo.settings.add_webhook")}</div>
			{/* template: repo/settings/webhook/link_menu */}
		</div>
	</div>
</h4>
<div className="ui attached segment">
	<div className="ui list flex-items-block">
		<div className="item"><span>{props.description as any}</span></div>
		{((props.webhooks) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item">
				<span className={`${(props.lastStatus === 1) ? `tw-text-greentw-text-red` : `tw-text-text-light`}`}><span className="svg-icon" aria-label="octicon-dot-fill"></span></span>
				<div className="gt-ellipsis tw-flex-1">
					<a title={String(props.uRL ?? "")} href={`${String(props.baseLink ?? "")}/${String(props.iD ?? "")}`}>{/* TODO: {{or .Name (ctx.Locale.Tr "repo.settings.webhook.name_empty")}} */}</a>
					<span className="tw-ml-2 tw-text-grey-light">{item.uRL as any}</span>
				</div>
				<a className="muted tw-p-2" href={`${String(props.baseLink ?? "")}/${String(props.iD ?? "")}`}><span className="svg-icon" aria-label="octicon-pencil"></span></a>
				<a className="tw-text-red tw-p-2 link-action"
					data-url={`${String(props.link ?? "")}/delete?id=${String(props.iD ?? "")}`}
					data-modal-confirm={String(i18n("repo.settings.webhook_deletion_desc") ?? "")}
				><span className="svg-icon" aria-label="octicon-trash"></span></a>
			</div>
		</React.Fragment>))}
	</div>
</div>

  </>)
}
