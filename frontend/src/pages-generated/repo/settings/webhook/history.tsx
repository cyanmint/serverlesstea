// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function History(props: Record<string, unknown>) {
  return (<>
{/* $isNew */}
{(props.pageIsSettingsHooksEdit) ? (<>
	<h4 className="ui top attached header">
		{i18n("repo.settings.recent_deliveries")}
		{(props.permission?.isAdmin) ? (<>
			<div className="ui right">
				{'{'}/* the button is wrapped with a span because the tooltip doesn't show on hover if we put data-tooltip-content directly on the button */{'}'}
				<span data-tooltip-content={`${((props.isNew || props.webhook?.isActive)) ? `${i18n("repo.settings.webhook.test_delivery_desc")}` : `${i18n("repo.settings.webhook.test_delivery_desc_disabled")}`}`}>
					<button className={`ui tiny button${(!((props.isNew || props.webhook?.isActive))) ? ` disabled` : ""}`} id="test-delivery" data-link={`${String(props.link ?? "")}/test`}>
						<span className="text">{i18n("repo.settings.webhook.test_delivery")}</span>
					</button>
			</span>
			</div>
		</>) : null}
	</h4>
	<div className="ui attached segment">
		<div className="ui list">
			{((props.history) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="item">
					<div className="flex-left-right">
						<div className="flex-text-inline">
							{(item.isSucceed) ? (<>
								<span className="tw-text-green"><span className="svg-icon" aria-label="octicon-check"></span></span>
							</>) : null} {(!(item.isDelivered)) ? (<>
								<span className="tw-text-orange"><span className="svg-icon" aria-label="octicon-stopwatch"></span></span>
							</>) : (<>
								<span className="tw-text-red"><span className="svg-icon" aria-label="octicon-alert"></span></span>
							</>)}
							<button className="btn interact-bg tw-p-2 toggle show-panel" data-panel={`#info-${String(props.iD ?? "")}`}>{item.uUID as any}</button>
						</div>
						<span className="tw-text-text-light">
							{/* TODO: {{DateUtils.TimeSince .Delivered}} */}
						</span>
					</div>
					<div className="info tw-hidden" id={`info-${String(props.iD ?? "")}`}>
						<div className="ui top attached tabular menu" data-global-init="initTabSwitcher">
							<a className="item active" data-tab={`request-${String(props.iD ?? "")}`}>
								{/* template: shared/misc/tabtitle */}
							</a>
							<a className="item" data-tab={`response-${String(props.iD ?? "")}`}>
								{/* template: shared/misc/tabtitle */}
								{(item.responseInfo) ? (<>
									{(item.isSucceed) ? (<>
										<span className="ui green label">{item.responseInfo?.status as any}</span>
									</>) : (<>
										<span className="ui red label">{item.responseInfo?.status as any}</span>
									</>)}
								</>) : (<>
									<span className="ui label">-</span>
								</>)}
							</a>
							{((props.permission?.isAdmin || props.isOrganizationOwner || props.pageIsAdmin || props.pageIsUserSettings)) ? (<>
							<div className="right menu">
								<form className="tw-py-2" action={`${String(props.link ?? "")}/replay/${String(props.uUID ?? "")}`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
									<span data-tooltip-content={`${(props.webhook?.isActive) ? `${i18n("repo.settings.webhook.replay.description")}` : `${i18n("repo.settings.webhook.replay.description_disabled")}`}`}>
										<button className={`ui tiny button tw-mr-0${(!(props.webhook?.isActive)) ? ` disabled` : ""}`}><span className="svg-icon" aria-label="octicon-sync"></span></button>
									</span>
								</form>
							</div>
							</>) : null}
						</div>
						<div className="ui bottom attached tab segment active" data-tab={`request-${String(props.iD ?? "")}`}>
							{(item.requestInfo) ? (<>
								<h5>{i18n("repo.settings.webhook.headers")}</h5>
								<pre className="webhook-info"><strong>Request URL:</strong> {item.requestInfo?.uRL as any}
<strong>Request method:</strong> {(item.requestInfo?.hTTPMethod) ? (<>{item.requestInfo?.hTTPMethod as any}</>) : (<>POST</>)}
{((item.requestInfo?.headers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}><strong>{props.key as any}:</strong> {props.val as any}
</React.Fragment>))}</pre>
								<h5>{i18n("repo.settings.webhook.payload")}</h5>
								<pre className="webhook-info">{/* TODO: {{or .RequestInfo.Body .PayloadContent}} */}</pre>
							</>) : (<>
								-
							</>)}
						</div>
						<div className="ui bottom attached tab segment" data-tab={`response-${String(props.iD ?? "")}`}>
							{(item.responseInfo) ? (<>
								<h5>{i18n("repo.settings.webhook.headers")}</h5>
								<pre className="webhook-info">{((item.responseInfo?.headers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}><strong>{props.key as any}:</strong> {props.val as any}
</React.Fragment>))}</pre>
								<h5>{i18n("repo.settings.webhook.body")}</h5>
								<pre className="webhook-info">{item.responseInfo?.body as any}</pre>
							</>) : (<>
								-
							</>)}
						</div>
					</div>
				</div>
			</React.Fragment>))}
		</div>
	</div>
</>) : null}

  </>)
}
