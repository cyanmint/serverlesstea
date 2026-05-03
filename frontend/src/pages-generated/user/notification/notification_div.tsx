import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function NotificationDiv(props: Record<string, unknown>) {
  return (<>
<div role="main" aria-label={String(props.title ?? "")} className="page-content user notification" id="notification_div" data-sequence-number={String(props.sequenceNumber ?? "")}>
	<div className="ui container">
		{/* $statusUnread */}{/* $statusRead */}{/* $statusPinned */}
		{/* $notificationUnreadCount */}
		{/* $pageTypeIsRead */}
		<div className="flex-left-right tw-mb-[--page-spacing]">
			<div className="small-menu-items ui compact tiny menu">
				<a className={`${(!(pageTypeIsRead)) ? `active` : ""} item`} href={`/notifications?type=unread`}>
					{i18n("notification.unread")}
					<div className={`notifications-unread-count ui label ${(!(notificationUnreadCount)) ? `tw-hidden` : ""}`}>{/* $notificationUnreadCount */}</div>
				</a>
				<a className={`${(pageTypeIsRead) ? `active` : ""} item`} href={`/notifications?type=read`}>
					{i18n("notification.read")}
				</a>
			</div>
			{((!(pageTypeIsRead) && notificationUnreadCount)) ? (<>
				<form action={`/notifications/purge`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					<button className="ui mini button primary tw-mr-0" title={String(i18n("notification.mark_all_as_read") ?? "")}>
						<span className="svg-icon" aria-label="octicon-checklist"></span>
					</button>
				</form>
			</>) : null}
		</div>
		<div id="notification_table">
			{((props.notifications) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="notifications-item" id={`notification_`} data-status={String("" ?? "")}>
					<div className="tw-self-start tw-mt-[2px]">
						{(item.one?.issue) ? (<>
							{/* template: shared/issueicon */}
						</>) : (<>
							<span className="svg-icon" aria-label="octicon-repo"></span>
						</>)}
					</div>
					<a className="notifications-link silenced tw-flex-1" href={String("" ?? "")}>
						<div className="flex-text-block tw-text-[0.95em]">
							{/* TODO: {{$one.Repository.FullName}} */} {(item.one?.issue) ? (<><span className="tw-text-text-light-3">#{/* TODO: {{$one.Issue.Index}} */}</span></>) : null}
							{(item.one?.status === statusPinned) ? (<>
								<span className="svg-icon" aria-label="octicon-pin"></span>
							</>) : null}
						</div>
						<div className="tw-text-16 tw-py-0.5">
							{(item.one?.issue) ? (<>
								{/* TODO: {{$one.Issue.Title | ctx.RenderUtils.RenderIssueSimpleTitle}} */}
							</>) : (<>
								{/* TODO: {{$one.Repository.FullName}} */}
							</>)}
						</div>
					</a>
					<div className="notifications-updated flex-text-inline">
						{(item.one?.issue) ? (<>
							{/* TODO: {{DateUtils.TimeSince $one.Issue.UpdatedUnix}} */}
						</>) : (<>
							{/* TODO: {{DateUtils.TimeSince $one.UpdatedUnix}} */}
						</>)}
					</div>
					<form className="notifications-buttons form-fetch-action" action={`/notifications/status?type=${String(props.pageType ?? "")}&page=${String(props.page?.paginater?.current ?? "")}&perPage=${String(props.page?.paginater?.pagingNum ?? "")}`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}
								data-fetch-sync="$body #notification_div"
					>
						<input type="hidden" name="notification_id" value={String("" ?? "")} />
						{(item.one?.status !== statusPinned) ? (<>
							<button className="btn interact-bg tw-p-2" data-tooltip-content={String(i18n("notification.pin") ?? "")}
											name="notification_action" value="pin"
							>
								<span className="svg-icon" aria-label="octicon-pin"></span>
							</button>
						</>) : null}
						{((item.one?.status === statusUnread || item.one?.status === statusPinned)) ? (<>
							<button className="btn interact-bg tw-p-2" data-tooltip-content={String(i18n("notification.mark_as_read") ?? "")}
											name="notification_action" value="mark_as_read"
							>
								<span className="svg-icon" aria-label="octicon-check"></span>
							</button>
						</>) : null} {(item.one?.status === statusRead) ? (<>
							<button className="btn interact-bg tw-p-2" data-tooltip-content={String(i18n("notification.mark_as_unread") ?? "")}
											name="notification_action" value="mark_as_unread"
							>
								<span className="svg-icon" aria-label="octicon-bell"></span>
							</button>
						</>) : null}
					</form>
				</div>
			{/* else */}
				<div className="empty-placeholder">
					<span className="svg-icon" aria-label="octicon-inbox"></span>
					{(pageTypeIsRead) ? (<>
						{i18n("notification.no_read")}
					</>) : (<>
						{i18n("notification.no_unread")}
					</>)}
				</div>
			</React.Fragment>))}
		</div>
		{/* template: base/paginate */}
	</div>
</div>

  </>)
}
