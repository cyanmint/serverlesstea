import React from 'react'
import { i18n } from '../../lib/i18n'

export default function HeadNavbarIcons(props: Record<string, unknown>) {
  return (<>
{/* TODO: {{- $itemExtraClass := .ItemExtraClass -}} */}
{/* TODO: {{- $data := .PageGlobalData -}} */}
{(("$data" && "$data.IsSigned")) ? (<>{/* data may not exist, for example: rendering 503 page before the PageGlobalData middleware */}
	{/* TODO: {{- $activeStopwatch := call $data.GetActiveStopwatch -}} */}
	{/* TODO: {{- $notificationUnreadCount := call $data.GetNotificationUnreadCount -}} */}
	{("$activeStopwatch") ? (<>
	<a className={`item active-stopwatch `} href={String("" ?? "")} title={String(i18n("active_stopwatch") ?? "")} data-seconds={String("" ?? "")}>
		<div className="tw-relative flex-text-block">
			<span className="svg-icon" aria-label="octicon-stopwatch"></span>
			<span className="header-stopwatch-dot"></span>
		</div>
	</a>
	</>) : null}
	<a className={`item `} href={`/notifications`} data-tooltip-content={String(i18n("notifications") ?? "")}>
		<div className="tw-relative flex-text-block">
			<span className="svg-icon" aria-label="octicon-bell"></span>
			<span className={`notification_count${(!("$notificationUnreadCount")) ? ` tw-hidden` : ""}`}>{/* $notificationUnreadCount */}</span>
		</div>
	</a>
</>) : null}

  </>)
}
