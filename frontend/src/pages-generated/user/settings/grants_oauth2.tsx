// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function GrantsOauth2(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("settings.authorized_oauth2_applications")}
</h4>
<div className="ui attached segment">
	<div className="flex-divided-list items-with-main">
		<div className="item">
			{i18n("settings.authorized_oauth2_applications_description")}
		</div>
		{((props.grants) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item">
				<div className="item-leading">
					<span className="svg-icon" aria-label="octicon-key"></span>
				</div>
				<div className="item-main">
					<div className="item-title">{item.application?.name as any}</div>
					<div className="item-body">
						<i>{i18n("settings.added_on")}</i>
					</div>
				</div>
				<div className="item-trailing">
					<button className="ui red tiny button delete-button" data-modal-id="revoke-gitea-oauth2-grant"
							data-url={`/user/settings/applications/oauth2/${String(props.applicationID ?? "")}/revoke/${String(props.iD ?? "")}`}>
						{i18n("settings.revoke_key")}
					</button>
				</div>
			</div>
		</React.Fragment>))}
	</div>

	<div className="ui g-modal-confirm delete modal" id="revoke-gitea-oauth2-grant">
		<div className="header">
			<span className="svg-icon" aria-label="octicon-shield"></span>
			{i18n("settings.revoke_oauth2_grant")}
		</div>
		<div className="content">
			<p>{i18n("settings.revoke_oauth2_grant_description")}</p>
		</div>
		{/* template: base/modal_actions_confirm */}
	</div>
</div>

  </>)
}
