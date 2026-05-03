// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Smtp(props: Record<string, unknown>) {
  return (<>
<div className={`smtp field ${(!(props.type === 3)) ? `tw-hidden` : ""}`}>
	<div className="inline required field">
		<label>{i18n("admin.auths.smtp_auth")}</label>
		<div className="ui selection type dropdown">
			<input type="hidden" id="smtp_auth" name="smtp_auth" value={String(props.smtp_auth ?? "")} />
			<div className="text">{props.smtp_auth as any}</div>
			<span className="svg-icon" aria-label="octicon-triangle-down"></span>
			<div className="menu">
				{((props.sMTPAuths) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<div className="item" data-value={String("" ?? "")}>{item as any}</div>
				</React.Fragment>))}
			</div>
		</div>
	</div>
	<div className="required field">
		<label htmlFor="smtp_host">{i18n("admin.auths.smtphost")}</label>
		<input id="smtp_host" name="smtp_host" value={String(props.smtp_host ?? "")} />
	</div>
	<div className="required field">
		<label htmlFor="smtp_port">{i18n("admin.auths.smtpport")}</label>
		<input id="smtp_port" name="smtp_port" value={String(props.smtp_port ?? "")} />
	</div>
	<div className="inline field">
		<div className="ui checkbox">
			<label htmlFor="force_smtps"><strong>{i18n("admin.auths.force_smtps")}</strong></label>
			<input id="force_smtps" name="force_smtps" type="checkbox" {...(props.force_smtps ? {"checked": true} : {})} />
			<p className="help">{i18n("admin.auths.force_smtps_helper")}</p>
		</div>
	</div>
	<div className="inline field">
		<div className="ui checkbox">
			<label><strong>{i18n("admin.auths.skip_tls_verify")}</strong></label>
			<input name="skip_verify" type="checkbox" {...(props.skip_verify ? {"checked": true} : {})} />
		</div>
	</div>
	<div className="field">
		<label htmlFor="helo_hostname">{i18n("admin.auths.helo_hostname")}</label>
		<input id="helo_hostname" name="helo_hostname" value={String(props.helo_hostname ?? "")} />
		<p className="help">{i18n("admin.auths.helo_hostname_helper")}</p>
	</div>
	<div className="inline field">
		<div className="ui checkbox">
			<label htmlFor="disable_helo"><strong>{i18n("admin.auths.disable_helo")}</strong></label>
			<input id="disable_helo" name="disable_helo" type="checkbox" {...(props.disable_helo ? {"checked": true} : {})} />
		</div>
	</div>
	<div className="field">
		<label htmlFor="allowed_domains">{i18n("admin.auths.allowed_domains")}</label>
		<input id="allowed_domains" name="allowed_domains" value={String(props.allowed_domains ?? "")} />
		<p className="help">{i18n("admin.auths.allowed_domains_helper")}</p>
	</div>
	<div className="optional field">
		<div className="ui checkbox">
			<label htmlFor="skip_local_two_fa"><strong>{i18n("admin.auths.skip_local_two_fa")}</strong></label>
			<input id="skip_local_two_fa" name="skip_local_two_fa" type="checkbox" {...(props.skip_local_two_fa ? {"checked": true} : {})} />
			<p className="help">{i18n("admin.auths.skip_local_two_fa_helper")}</p>
		</div>
	</div>
</div>

  </>)
}
