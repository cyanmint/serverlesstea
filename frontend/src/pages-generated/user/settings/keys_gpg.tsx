import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function KeysGpg(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("settings.manage_gpg_keys")}
	<div className="ui right">
		<button className="ui primary tiny show-panel toggle button" data-panel="#add-gpg-key-panel">{i18n("settings.add_key")}</button>
	</div>
</h4>
<div className="ui attached segment">
	<div className={`${(!(props.hasGPGError)) ? `tw-hidden` : ""} tw-mb-4`} id="add-gpg-key-panel">
		<form className={`ui form${(props.hasGPGError) ? ` error` : ""}`} action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<input type="hidden" name="title" value="none" />
			<div className={`field ${(props.err_Content) ? `error` : ""}`}>
				<label htmlFor="gpg-key-content">{i18n("settings.key_content")}</label>
				<textarea id="gpg-key-content" name="content" placeholder={String(i18n("settings.key_content_gpg_placeholder") ?? "")} required>{props.content as any}</textarea>
			</div>
			{(props.err_Signature) ? (<>
				<div className="ui error message">
					<p>{i18n("settings.gpg_token_required")}</p>
				</div>
				<div className="field">
					<label htmlFor="token">{i18n("settings.gpg_token")}</label>
					<input readonly="" value={String(props.tokenToSign ?? "")} />
					<div className="help">
						{i18n("settings.gpg_token_help")}
						<pre className="command-block">{/* TODO: {{printf 'echo "%s" | gpg -a --default-key %s --detach-sig' .TokenToSign .PaddedKeyID}} */}</pre>
					</div>
				</div>
				<div className="field">
					<label htmlFor="gpg-key-signature">{i18n("settings.gpg_token_signature")}</label>
					<textarea id="gpg-key-signature" name="signature" placeholder={String(i18n("settings.key_signature_gpg_placeholder") ?? "")} required>{props.signature as any}</textarea>
				</div>
			</>) : null}
			<input name="type" type="hidden" value="gpg" />
			<button className="ui primary button">
				{i18n("settings.add_key")}
			</button>
			<button className="ui hide-panel button" data-panel="#add-gpg-key-panel">
				{i18n("cancel")}
			</button>
		</form>
	</div>
	<div className="flex-divided-list items-with-main">
		<div className="item">
			<p>
				{i18n("settings.gpg_desc")}<br />
				{i18n("settings.gpg_helper")}
			</p>
		</div>
		{((props.gPGKeys) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item">
				<div className="item-leading">
					<span className={`${((props.expiredUnix?.isZero || props.pageStartTime?.before ?.expiredUnix?.asTime)) ? `tw-text-green` : ""}`}><span className="svg-icon" aria-label="octicon-key"></span></span>
				</div>
				<div className="item-main">
					{(item.verified) ? (<>
						<span className="flex-text-block" data-tooltip-content={String(i18n("settings.gpg_key_verified_long") ?? "")}><span className="svg-icon" aria-label="octicon-verified"></span> <strong>{i18n("settings.gpg_key_verified")}</strong></span>
					</>) : null}
					{(item.emails) ? (<>
						<span className="flex-text-block" data-tooltip-content={String(i18n("settings.gpg_key_matched_identities_long") ?? "")}><span className="svg-icon" aria-label="octicon-mail"></span> {i18n("settings.gpg_key_matched_identities")} {((item.emails) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}><strong>{item.email as any} </strong></React.Fragment>))}</span>
					</>) : null}
					<div className="item-body">
						<b>{i18n("settings.key_id")}:</b> {item.paddedKeyID as any}
						<b>{i18n("settings.subkeys")}:</b> {((item.subsKey) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}> {item.paddedKeyID as any} </React.Fragment>))}
					</div>
					<div className="item-body">
						<i>{i18n("settings.added_on")}</i>
						-
						<i>{(!(item.expiredUnix?.isZero)) ? (<>{i18n("settings.valid_until_date")}</>) : (<>{i18n("settings.valid_forever")}</>)}</i>
					</div>
				</div>
				<div className="item-trailing">
					<button className="ui red tiny button delete-button" data-modal-id="delete-gpg" data-url={`${String(props.link ?? "")}/delete?type=gpg`} data-id={String(props.iD ?? "")}>
						{i18n("settings.delete_key")}
					</button>
					{((!(item.verified) && props.verifyingID !== item.keyID)) ? (<>
						<a className="ui primary tiny button" href={`?verify_gpg=${String(props.keyID ?? "")}`}>{i18n("settings.gpg_key_verify")}</a>
					</>) : null}
				</div>
			</div>
			{((!(item.verified) && props.verifyingID === item.keyID)) ? (<>
				<div className="ui  segment">
					<h4>{i18n("settings.gpg_token_required")}</h4>
					<form className={`ui form${(props.hasGPGVerifyError) ? ` error` : ""}`} action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
						<input type="hidden" name="title" value="none" />
						<input type="hidden" name="content" value={String(props.keyID ?? "")} />
						<input type="hidden" name="key_id" value={String(props.keyID ?? "")} />
						<div className="field">
							<label htmlFor="token">{i18n("settings.gpg_token")}</label>
							<input readonly="" value={String(props.tokenToSign ?? "")} />
							<div className="help">
								{i18n("settings.gpg_token_help")}
								<pre className="command-block">{/* TODO: {{printf 'echo "%s" | gpg -a --default-key %s --detach-sig' $.TokenToSign .PaddedKeyID}} */}</pre>
							</div>
							<br />
						</div>
						<div className="field">
							<label htmlFor="signature">{i18n("settings.gpg_token_signature")}</label>
							<textarea id="gpg-key-signature" name="signature" placeholder={String(i18n("settings.key_signature_gpg_placeholder") ?? "")} required>{props.signature as any}</textarea>
						</div>
						<input name="type" type="hidden" value="verify_gpg" />
						<button className="ui primary button">
							{i18n("settings.gpg_key_verify")}
						</button>
						<a className="ui red button" href={String(props.link ?? "")}>
							{i18n("settings.cancel")}
						</a>
					</form>
				</div>
			</>) : null}
		</React.Fragment>))}
	</div>
	<div className="ui g-modal-confirm delete modal" id="delete-gpg">
		<div className="header">
			<span className="svg-icon" aria-label="octicon-trash"></span>
			{i18n("settings.gpg_key_deletion")}
		</div>
		<div className="content">
			<p>{i18n("settings.gpg_key_deletion_desc")}</p>
		</div>
		{/* template: base/modal_actions_confirm */}
	</div>
</div>

  </>)
}
