import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function KeysSsh(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("settings.manage_ssh_keys")}
	<div className="ui right">
		<button id="add-ssh-button" className="ui primary tiny show-panel toggle button" data-panel="#add-ssh-key-panel">
			{i18n("settings.add_key")}
		</button>
	</div>
</h4>
<div className="ui attached segment">
	<div className={`${(!(props.hasSSHError)) ? `tw-hidden` : ""} tw-mb-4`} id="add-ssh-key-panel">
		<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<div className={`field ${(props.err_Title) ? `error` : ""}`}>
				<label htmlFor="ssh-key-title">{i18n("settings.key_name")}</label>
				<input id="ssh-key-title" name="title" value={String(props.title ?? "")} autofocus required maxlength="50" />
			</div>
			<div className={`field ${(props.err_Content) ? `error` : ""}`}>
				<label htmlFor="ssh-key-content">{i18n("settings.key_content")}</label>
				<textarea id="ssh-key-content" name="content" placeholder={String(i18n("settings.key_content_ssh_placeholder") ?? "")} required>{props.content as any}</textarea>
			</div>
			<input name="type" type="hidden" value="ssh" />
			<button className="ui primary button">
				{i18n("settings.add_key")}
			</button>
			<button id="cancel-ssh-button" className="ui hide-panel button" data-panel="#add-ssh-key-panel">
				{i18n("cancel")}
			</button>
		</form>
	</div>
	<div id="keys-ssh" className="flex-divided-list items-with-main">
		<div className="item">
			<p>
				{i18n("settings.ssh_desc")}<br />
				{i18n("settings.ssh_helper")}
			</p>
		</div>
		{(props.disableSSH) ? (<>
			<div className="item">
				{i18n("settings.ssh_signonly")}
			</div>
		</>) : null}
		{((props.keys) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item">
				<div className="item-leading">
					<span className={`${(props.hasRecentActivity) ? `tw-text-green` : ""}`} {...(item.hasRecentActivity ? {"data-tooltip-content": String(i18n("settings.key_state_desc") ?? "")} : {})}><span className="svg-icon" aria-label="octicon-key"></span></span>
				</div>
				<div className="item-main">
						{(item.verified) ? (<>
							<div className="item-title flex-text-block" data-tooltip-content={String(i18n("settings.ssh_key_verified_long") ?? "")}><span className="svg-icon" aria-label="octicon-verified"></span>{i18n("settings.ssh_key_verified")}</div>
						</>) : null}
						<div className="item-title">{item.name as any}</div>
						<div className="item-body">
								{item.fingerprint as any}
						</div>
						<div className="item-body">
								<i>{i18n("settings.added_on")} —	<span className="svg-icon" aria-label="octicon-info"></span> {(item.hasUsed) ? (<>{i18n("settings.last_used")} <span {...(item.hasRecentActivity ? {"className": "tw-text-green"} : {})}>{/* TODO: {{DateUtils.AbsoluteShort .UpdatedUnix}} */}</span></>) : (<>{i18n("settings.no_activity")}</>)}</i>
						</div>
				</div>
				<div className="item-trailing">
					<button className={`ui red tiny button delete-button${("index $.ExternalKeys $index") ? ` disabled` : ""}`} data-modal-id="delete-ssh" data-url={`${String(props.link ?? "")}/delete?type=ssh`} data-id={String(props.iD ?? "")}{...("index $.ExternalKeys $index" ? {"title": String(i18n("settings.ssh_externally_managed") ?? "")} : {})}>
						{i18n("settings.delete_key")}
					</button>
					{((!(item.verified) && props.verifyingFingerprint !== item.fingerprint)) ? (<>
						<a className="ui primary tiny button" href={`?verify_ssh=${String(props.fingerprint ?? "")}`}>{i18n("settings.ssh_key_verify")}</a>
					</>) : null}
				</div>
			</div>
			{((!(item.verified) && props.verifyingFingerprint === item.fingerprint)) ? (<>
				<div className="ui segment">
					<h4>{i18n("settings.ssh_token_required")}</h4>
					<form className={`ui form${(props.hasSSHVerifyError) ? ` error` : ""}`} action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
						<input type="hidden" name="title" value="none" />
						<input type="hidden" name="content" value={String(props.content ?? "")} />
						<input type="hidden" name="fingerprint" value={String(props.fingerprint ?? "")} />
						<div className="field">
							<label htmlFor="token">{i18n("settings.ssh_token")}</label>
							<input readonly="" value={String(props.tokenToSign ?? "")} />
							<div className="help">
								{i18n("settings.ssh_token_help")}
								<pre className="command-block">echo -n '{props.tokenToSign as any}' | ssh-keygen -Y sign -n gitea -f /path_to_PrivateKey_or_RelatedPublicKey</pre>
								<details>
									<summary>Windows PowerShell</summary>
									<pre className="command-block">cmd /c "&lt;NUL set /p=`"{props.tokenToSign as any}`"| ssh-keygen -Y sign -n gitea -f /path_to_PrivateKey_or_RelatedPublicKey"</pre>
								</details>
								<details>
									<summary>Windows CMD</summary>
									<pre className="command-block">set /p={props.tokenToSign as any}| ssh-keygen -Y sign -n gitea -f /path_to_PrivateKey_or_RelatedPublicKey</pre>
								</details>
							</div>
							<br />
						</div>
						<div className="field">
							<label htmlFor="signature">{i18n("settings.ssh_token_signature")}</label>
							<textarea id="ssh-key-signature" name="signature" placeholder={String(i18n("settings.key_signature_ssh_placeholder") ?? "")} required>{props.signature as any}</textarea>
						</div>
						<input name="type" type="hidden" value="verify_ssh" />
						<button className="ui primary button">
							{i18n("settings.ssh_key_verify")}
						</button>
						<a className="ui red button" href={String(props.link ?? "")}>
							{i18n("settings.cancel")}
						</a>
					</form>
				</div>
			</>) : null}
		</React.Fragment>))}
	</div>
	<div className="ui g-modal-confirm delete modal" id="delete-ssh">
		<div className="header">
			<span className="svg-icon" aria-label="octicon-trash"></span>
			{i18n("settings.ssh_key_deletion")}
		</div>
		<div className="content">
			<p>{i18n("settings.ssh_key_deletion_desc")}</p>
		</div>
		{/* template: base/modal_actions_confirm */}
	</div>
</div>

  </>)
}
