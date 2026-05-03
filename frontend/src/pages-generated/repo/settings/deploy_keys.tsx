// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function DeployKeys(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="repo-setting-content">
		<h4 className="ui top attached header">
			{i18n("repo.settings.deploy_keys")}
			<div className="ui right">
			{(!(props.disableSSH)) ? (<>
				<button className="ui primary tiny show-panel toggle button" data-panel="#add-deploy-key-panel">{i18n("repo.settings.add_deploy_key")}</button>
			</>) : (<>
				<button className="ui primary tiny button disabled">{i18n("settings.ssh_disabled")}</button>
			</>)}
			</div>
		</h4>
		<div className="ui attached segment">
			<div className={`${(!(props.hasError)) ? `tw-hidden` : ""} tw-mb-4`} id="add-deploy-key-panel">
				<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					<div className="field">
						{i18n("repo.settings.deploy_key_desc")}
					</div>
					<div className={`field ${(props.err_Title) ? `error` : ""}`}>
						<label htmlFor="ssh-key-title">{i18n("repo.settings.title")}</label>
						<input id="ssh-key-title" name="title" value={String(props.title ?? "")} autofocus required />
					</div>
					<div className={`field ${(props.err_Content) ? `error` : ""}`}>
						<label htmlFor="ssh-key-content">{i18n("repo.settings.deploy_key_content")}</label>
						<textarea id="ssh-key-content" name="content" placeholder={String(i18n("settings.key_content_ssh_placeholder") ?? "")} required>{props.content as any}</textarea>
					</div>
					<div className="field">
						<div className={`ui checkbox ${(props.err_IsWritable) ? `error` : ""}`}>
							<input id="ssh-key-is-writable" name="is_writable" type="checkbox" value="1" />
							<label htmlFor="ssh-key-is-writable">
								{i18n("repo.settings.is_writable")}
							</label>
							<small className="tw-pl-[26px]">{i18n("repo.settings.is_writable_info")}</small>
						</div>
					</div>
					<button className="ui primary button">
						{i18n("repo.settings.add_deploy_key")}
					</button>
					<button className="ui hide-panel button" data-panel="#add-deploy-key-panel">
						{i18n("cancel")}
					</button>
				</form>
			</div>
			{(props.deploykeys) ? (<>
				<div className="flex-divided-list items-with-main">
					{((props.deploykeys) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<div className="item">
							<div className="item-leading">
								<span className={`${(props.hasRecentActivity) ? `tw-text-green` : ""}`} {...(item.hasRecentActivity ? {"data-tooltip-content": String(i18n("settings.key_state_desc") ?? "")} : {})}><span className="svg-icon" aria-label="octicon-key"></span></span>
							</div>
							<div className="item-main">
								<div className="item-title">{item.name as any}</div>
								<div className="item-body">
									{item.fingerprint as any}
								</div>
								<div className="item-body">
									<i>{i18n("settings.added_on")} —  <span className="svg-icon" aria-label="octicon-info"></span> {(item.hasUsed) ? (<>{i18n("settings.last_used")} <span {...(item.hasRecentActivity ? {"className": "tw-text-green"} : {})}>{/* TODO: {{DateUtils.AbsoluteShort .UpdatedUnix}} */}</span></>) : (<>{i18n("settings.no_activity")}</>)} - <span>{i18n("settings.can_read_info")}{(!(item.isReadOnly)) ? (<> / {i18n("settings.can_write_info")} </>) : null}</span></i>
								</div>
							</div>
							<div className="item-trailing">
								<button className="ui red tiny button link-action" data-modal-confirm="#repo-deploy-key-delete-modal" data-url={`${String(props.link ?? "")}/delete?id=${String(props.iD ?? "")}`}>
									{i18n("settings.delete_key")}
								</button>
							</div>
						</div>
					</React.Fragment>))}
				</div>
			</>) : (<>
				{i18n("repo.settings.no_deploy_keys")}
			</>)}
		</div>
	</div>

<div className="ui small modal" id="repo-deploy-key-delete-modal">
	<div className="header"><span className="svg-icon" aria-label="octicon-trash"></span> {i18n("repo.settings.deploy_key_deletion")}</div>
	<div className="content"><p>{i18n("repo.settings.deploy_key_deletion_desc")}</p></div>
	{/* template: base/modal_actions_confirm */}
</div>

{/* template: repo/settings/layout_footer */}

  </>)
}
