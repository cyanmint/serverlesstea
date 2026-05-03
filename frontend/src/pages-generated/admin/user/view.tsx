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
					<a className="ui primary tiny button" href={`${String(props.link ?? "")}/edit`}>{i18n("admin.users.edit")}</a>
				</div>
			</h4>
			<div className="ui attached segment">
				{/* template: admin/user/view_details */}
			</div>
		</div>
		<div className="tw-flex-1">
			<h4 className="ui top attached header">
				{i18n("admin.emails")} ({i18n("admin.total")})
			</h4>
			<div className="ui attached segment">
				{/* template: admin/user/view_emails */}
			</div>
		</div>
	</div>
	<h4 className="ui top attached header">
		{i18n("admin.repositories")} ({i18n("admin.total")})
	</h4>
	<div className="ui attached segment">
		{/* template: shared/repo/list */}
	</div>
	<h4 className="ui top attached header">
		{i18n("settings.organization")} ({i18n("admin.total")})
	</h4>
	<div className="ui attached segment">
		{/* template: explore/user_list */}
	</div>
</div>

{/* template: admin/layout_footer */}

  </>)
}
