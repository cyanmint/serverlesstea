// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Applications(props: Record<string, unknown>) {
  return (<>
{/* template: user/settings/layout_head */}
	<div className="user-setting-content">
		<h4 className="ui top attached header">
			{i18n("settings.manage_access_token")}
		</h4>
		<div className="ui attached segment">
			<div className="flex-divided-list items-with-main">
				<div className="item">
					{i18n("settings.tokens_desc")}
				</div>
				{((props.tokens) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<div className="item">
						<div className="item-leading">
							<span className={`${(props.hasRecentActivity) ? `tw-text-green` : ""}`} {...(item.hasRecentActivity ? {"data-tooltip-content": String(i18n("settings.token_state_desc") ?? "")} : {})}>
								<span className="svg-icon" aria-label="fontawesome-send"></span>
							</span>
						</div>
						<div className="item-main">
							<details>
								<summary><span className="item-title">{item.name as any}</span></summary>
								<p className="tw-my-1">
									{i18n("settings.repo_and_org_access")}:
									{(item.displayPublicOnly) ? (<>
										{i18n("settings.permissions_public_only")}
									</>) : (<>
										{i18n("settings.permissions_access_all")}
									</>)}
								</p>
								<p className="tw-my-1">{i18n("settings.permissions_list")}</p>
								<ul className="tw-my-1">
								{((item.scope?.stringSlice) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									{("." !== props.accessTokenScopePublicOnly) ? (<>
										<li>{item as any}</li>
									</>) : null}
								</React.Fragment>))}
								</ul>
							</details>
							<div className="item-body">
								<i>{i18n("settings.added_on")} — <span className="svg-icon" aria-label="octicon-info"></span> {(item.hasUsed) ? (<>{i18n("settings.last_used")} <span {...(item.hasRecentActivity ? {"className": "tw-text-green"} : {})}>{/* TODO: {{DateUtils.AbsoluteShort .UpdatedUnix}} */}</span></>) : (<>{i18n("settings.no_activity")}</>)}</i>
							</div>
						</div>
						<div className="item-trailing">
								<button className="ui red tiny button delete-button" data-modal-id="delete-token" data-url={`${String(props.link ?? "")}/delete`} data-id={String(props.iD ?? "")}>
									<span className="svg-icon" aria-label="octicon-trash"></span>
									{i18n("settings.delete_token")}
								</button>
						</div>
					</div>
				</React.Fragment>))}
			</div>
		</div>
		<div className="ui bottom attached segment">
			<details {...((props.name || !(props.tokens)) ? {"open": true} : {})}>
				<summary><h4 className="ui header tw-inline-block tw-my-2">{i18n("settings.generate_new_token")}</h4></summary>
				<form className="ui form ignore-dirty" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					<div className={`field ${(props.err_Name) ? `error` : ""}`}>
						<label htmlFor="name">{i18n("settings.token_name")}</label>
						<input id="name" name="name" value={String(props.name ?? "")} required maxlength="255" />
					</div>
					<div className="field">
						<div className="tw-my-2">{i18n("settings.repo_and_org_access")}</div>
						<label className="gt-checkbox">
							<input type="radio" name="scope-public-only" value={String(props.accessTokenScopePublicOnly ?? "")} /> {i18n("settings.permissions_public_only")}
						</label>
						<label className="gt-checkbox">
							<input type="radio" name="scope-public-only" value="" defaultChecked /> {i18n("settings.permissions_access_all")}
						</label>
					</div>
					<div>
						<div className="tw-my-2">{i18n("settings.access_token_desc")}</div>
						<table className="ui table unstackable tw-my-2">
						{((props.tokenCategories) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<tr>
								<td>{props.category as any}</td>
								<td><label className="gt-checkbox"><input type="radio" name={`scope-`} value="" defaultChecked /> {i18n("settings.permission_no_access")}</label></td>
								<td><label className="gt-checkbox"><input type="radio" name={`scope-`} value={`read:`} /> {i18n("settings.permission_read")}</label></td>
								<td><label className="gt-checkbox"><input type="radio" name={`scope-`} value={`write:`} /> {i18n("settings.permission_write")}</label></td>
							</tr>
						</React.Fragment>))}
						</table>
					</div>
					<button className="ui primary button">
						{i18n("settings.generate_token")}
					</button>
				</form>
			</details>
		</div>

		{(props.enableOAuth2) ? (<>
			{/* template: user/settings/grants_oauth2 */}
			{/* template: user/settings/applications_oauth2 */}
		</>) : null}
	</div>

<div className="ui g-modal-confirm delete modal" id="delete-token">
	<div className="header">
		<span className="svg-icon" aria-label="octicon-trash"></span>
		{i18n("settings.access_token_deletion")}
	</div>
	<div className="content">
		<p>{i18n("settings.access_token_deletion_desc")}</p>
	</div>
	{/* template: base/modal_actions_confirm */}
</div>

{/* template: user/settings/layout_footer */}

  </>)
}
