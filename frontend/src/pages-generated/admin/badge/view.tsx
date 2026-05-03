import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function View(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}

<div className="admin-setting-content">
	<div className="admin-responsive-columns">
		<div className="tw-flex-1">
			<h4 className="ui top attached header">
				{props.title as any}
				<div className="ui right">
					<a className="ui primary tiny button" href={`${String(props.link ?? "")}/edit`}>{i18n("admin.badges.edit_badge")}</a>
				</div>
			</h4>
			<div className="ui attached segment">
				<div className="flex-divided-list items-with-main">
					<div className="item">
						{(props.badge?.imageURL) ? (<>
						<div className="item-leading">
							<img width="64" height="64" src={String(props.badge?.imageURL ?? "")} alt={String(props.badge?.description ?? "")} data-tooltip-content={String(props.badge?.description ?? "")} />
						</div>
						</>) : null}
						<div className="item-main">
							<div className="item-title">
								{props.badge?.slug as any}
							</div>
							<div className="item-body">
								{props.badge?.description as any}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<h4 className="ui top attached header">
		{i18n("explore.users")} ({props.usersTotal as any})
		<div className="ui right">
			<a className="ui primary tiny button" href={`${String(props.link ?? "")}/users`}>{i18n("admin.badges.manage_users")}</a>
		</div>
	</h4>
	<div className="ui attached segment">
		{/* template: explore/user_list */}
	</div>
</div>

{/* template: admin/layout_footer */}

  </>)
}
