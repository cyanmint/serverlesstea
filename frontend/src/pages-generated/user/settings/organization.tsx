// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Organization(props: Record<string, unknown>) {
  return (<>
{/* template: user/settings/layout_head */}
	<div className="user-setting-content">
		<h4 className="ui top attached header">
			{i18n("settings.orgs")}
			{(props.signedUser?.canCreateOrganization) ? (<>
			<div className="ui right">
				<a className="ui primary tiny button" href={`/org/create`}>{i18n("admin.orgs.new_orga")}</a>
			</div>
			</>) : null}
		</h4>
		<div className="ui attached segment orgs">
			{(props.orgs) ? (<>
				<div className="flex-divided-list items-with-main">
					{((props.orgs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<div className="item">
						<div className="item-leading">
							{/* TODO: {{ctx.AvatarUtils.Avatar . 28 "mini"}} */}
						</div>
						<div className="item-main">
							<div className="item-title">{/* template: shared/user/name */}</div>
							<div className="flex-text-body">
								{item.description as any}
							</div>
						</div>
						<div className="item-trailing">
							<form>
								<button className="ui red button delete-button" data-modal-id="leave-organization"
												data-url={`${String(props.organisationLink ?? "")}/members/action/leave`} data-datauid={String(props.signedUser?.iD ?? "")}
												data-name={String(props.signedUser?.displayName ?? "")}
												data-data-organization-name={String(props.displayName ?? "")}>{i18n("org.members.leave")}
								</button>
							</form>
						</div>
					</div>
					</React.Fragment>))}
				</div>
				{/* template: base/paginate */}
			</>) : (<>
				{i18n("settings.orgs_none")}
			</>)}
		</div>
	</div>

<div className="ui g-modal-confirm delete modal" id="leave-organization">
	<div className="header">
		{i18n("org.members.leave")}
	</div>
	<div className="content">
		<p>{i18n("org.members.leave.detail")}</p>
	</div>
	{/* template: base/modal_actions_confirm */}
</div>

{/* template: user/settings/layout_footer */}

  </>)
}
