import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Openid(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("settings.manage_openid")}
</h4>
<div className="ui attached segment">
	<div className="flex-divided-list items-with-main">
		<div className="item">
			{i18n("settings.openid_desc")}
		</div>
		{((props.openIDs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item tw-items-center">
				<div className="item-leading">
					<span className="svg-icon" aria-label="fontawesome-openid"></span>
				</div>
				<div className="item-main">
					<div className="item-title">{item.uRI as any}</div>
				</div>
				<div className="item-trailing">
					<form action={`/user/settings/security/openid/toggle_visibility`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
						<input name="id" type="hidden" value={String(props.iD ?? "")} />
						{(item.show) ? (<>
							<button className="ui tiny button">
							<span className="svg-icon" aria-label="octicon-eye"></span>
							{i18n("settings.hide_openid")}
							</button>
						</>) : (<>
							<button className="ui tiny button">
							<span className="svg-icon" aria-label="octicon-eye-closed"></span>
							{i18n("settings.show_openid")}
							</button>
						</>)}
					</form>
					<button className="ui red tiny button delete-button" data-modal-id="delete-openid" data-url={`/user/settings/security/openid/delete`} data-id={String(props.iD ?? "")}>
						{i18n("settings.delete_key")}
					</button>
				</div>
			</div>
		</React.Fragment>))}
	</div>
</div>
<div className="ui bottom attached segment">
	<form className="ui form" action={`/user/settings/security/openid`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<div className={`required field ${(props.err_OpenID) ? `error` : ""}`}>
			<label htmlFor="openid">{i18n("settings.add_new_openid")}</label>
			<input id="openid" name="openid" type="text" required />
		</div>
		<button className="ui primary button">
			{i18n("settings.add_openid")}
		</button>
	</form>

	<div className="ui g-modal-confirm delete modal" id="delete-openid">
		<div className="header">
			<span className="svg-icon" aria-label="octicon-trash"></span>
			{i18n("settings.openid_deletion")}
		</div>
		<div className="content">
			<p>{i18n("settings.openid_deletion_desc")}</p>
		</div>
		{/* template: base/modal_actions_confirm */}
	</div>
</div>

  </>)
}
