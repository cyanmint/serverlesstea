// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function KeysPrincipal(props: Record<string, unknown>) {
  return (<>
{(props.allowPrincipals) ? (<>
	<h4 className="ui top attached header">
		{i18n("settings.manage_ssh_principals")}
		<div className="ui right">
		{(!(props.disableSSH)) ? (<>
			<button className="ui primary tiny show-panel button" data-panel="#add-ssh-principal-panel">{i18n("settings.add_new_principal")}</button>
		</>) : (<>
			<button className="ui primary tiny button disabled">{i18n("settings.ssh_disabled")}</button>
		</>)}
		</div>
	</h4>
	<div className="ui attached segment">
		<div className="flex-divided-list items-with-main">
			<div className="item">
				{i18n("settings.principal_desc")}
			</div>
			{((props.principals) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="item">
					<div className="item-leading">
						<span className={`${(props.hasRecentActivity) ? `tw-text-green` : ""}`} {...(item.hasRecentActivity ? {"data-tooltip-content": String(i18n("settings.principal_state_desc") ?? "")} : {})}><span className="svg-icon" aria-label="octicon-key"></span></span>
					</div>
					<div className="item-main">
						<div className="item-title">{item.name as any}</div>
						<div className="item-body">
							<i>{i18n("settings.added_on")} —  <span className="svg-icon" aria-label="octicon-info"></span> {(item.hasUsed) ? (<>{i18n("settings.last_used")} <span {...(item.hasRecentActivity ? {"className": "green"} : {})}>{/* TODO: {{DateUtils.AbsoluteShort .UpdatedUnix}} */}</span></>) : (<>{i18n("settings.no_activity")}</>)}</i>
						</div>
					</div>
					<div className="item-trailing">
						<button className="ui red tiny button delete-button" data-modal-id="delete-principal" data-url={`${String(props.link ?? "")}/delete?type=principal`} data-id={String(props.iD ?? "")}>
							{i18n("settings.delete_key")}
						</button>
					</div>
				</div>
			</React.Fragment>))}
		</div>
	</div>
	<br />

	<div {...(!(props.hasPrincipalError) ? {"className": "tw-hidden"} : {})} id="add-ssh-principal-panel">
		<h4 className="ui top attached header">
			{i18n("settings.add_new_principal")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div className={`field ${(props.err_Content) ? `error` : ""}`}>
					<label htmlFor="ssh-principal-content">{i18n("settings.principal_content")}</label>
					<input id="ssh-principal-content" name="content" value={String(props.content ?? "")} autofocus required />
				</div>
				<input name="title" type="hidden" value="principal" />
				<input name="type" type="hidden" value="principal" />
				<button className="ui primary button">
					{i18n("settings.add_new_principal")}
				</button>
			</form>
		</div>
	</div>

	<div className="ui g-modal-confirm delete modal" id="delete-principal">
		<div className="header">
			<span className="svg-icon" aria-label="octicon-trash"></span>
			{i18n("settings.ssh_principal_deletion")}
		</div>
		<div className="content">
			<p>{i18n("settings.ssh_principal_deletion_desc")}</p>
		</div>
		{/* template: base/modal_actions_confirm */}
	</div>
</>) : null}

  </>)
}
