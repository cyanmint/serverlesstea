import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Notifications(props: Record<string, unknown>) {
  return (<>
{/* template: user/settings/layout_head */}
	<div className="user-setting-content">
		<h4 className="ui top attached header">
			{i18n("notifications")}
		</h4>
		<div className="ui attached segment">
			<div className="ui list flex-items-block">
				<div className="item">
					<form className="ui form tw-w-full" action={`/user/settings/notifications/email`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
						<div className="field">
							<label>{i18n("settings.email_desc")}</label>
							<div className="ui selection dropdown">
								<input name="preference" type="hidden" value={String(props.emailNotificationsPreference ?? "")} />
								<span className="svg-icon" aria-label="octicon-triangle-down"></span>
								<div className="text"></div>
								<div className="menu">
									<div data-value="enabled" className={`${(props.emailNotificationsPreference === "enabled") ? `active selected ` : ""}item`}>{i18n("settings.email_notifications.enable")}</div>
									<div data-value="andyourown" className={`${(props.emailNotificationsPreference === "andyourown") ? `active selected ` : ""}item`}>{i18n("settings.email_notifications.andyourown")}</div>
									<div data-value="onmention" className={`${(props.emailNotificationsPreference === "onmention") ? `active selected ` : ""}item`}>{i18n("settings.email_notifications.onmention")}</div>
									<div data-value="disabled" className={`${(props.emailNotificationsPreference === "disabled") ? `active selected ` : ""}item`}>{i18n("settings.email_notifications.disable")}</div>
								</div>
							</div>
						</div>
						<div className="field">
							<button className="ui primary button">{i18n("settings.email_notifications.submit")}</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		{(props.enableActions) ? (<>
		<h4 className="ui top attached header">
			{i18n("actions.actions")}
		</h4>
		<div className="ui attached segment">
			<div className="ui list flex-items-block">
				<div className="item">
					<form className="ui form tw-w-full" action={`/user/settings/notifications/actions`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
						<div className="field">
							<label>{i18n("settings.email_notifications.actions.desc")}</label>
							<div className="ui selection dropdown">
								<input name="preference" type="hidden" value={String(props.actionsEmailNotificationsPreference ?? "")} />
								<span className="svg-icon" aria-label="octicon-triangle-down"></span>
								<div className="text"></div>
								<div className="menu">
									<div data-value="all" className="item">{i18n("all")}</div>
									<div data-value="failure-only" className="item">{i18n("settings.email_notifications.actions.failure_only")}</div>
									<div data-value="disabled" className="item">{i18n("disabled")}</div>
								</div>
							</div>
						</div>
						<div className="field">
							<button className="ui primary button">{i18n("settings.email_notifications.submit")}</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		</>) : null}
	</div>

{/* template: user/settings/layout_footer */}

  </>)
}
