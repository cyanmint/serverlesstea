import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Sspi(props: Record<string, unknown>) {
  return (<>
<div className={`sspi field ${(!(props.type === 7)) ? `tw-hidden` : ""}`}>
	<div className="field">
		<div className="ui checkbox">
			<label htmlFor="sspi_auto_create_users"><strong>{i18n("admin.auths.sspi_auto_create_users")}</strong></label>
			<input id="sspi_auto_create_users" name="sspi_auto_create_users" className="sspi-auto-create-users" type="checkbox" {...(props.sSPIAutoCreateUsers ? {"checked": true} : {})} />
			<p className="help">{i18n("admin.auths.sspi_auto_create_users_helper")}</p>
		</div>
	</div>
	<div className="field">
		<div className="ui checkbox">
			<label htmlFor="sspi_auto_activate_users"><strong>{i18n("admin.auths.sspi_auto_activate_users")}</strong></label>
			<input id="sspi_auto_activate_users" name="sspi_auto_activate_users" className="sspi-auto-activate-users" type="checkbox" {...(props.sSPIAutoActivateUsers ? {"checked": true} : {})} />
			<p className="help">{i18n("admin.auths.sspi_auto_activate_users_helper")}</p>
		</div>
	</div>
	<div className="field">
		<div className="ui checkbox">
			<label htmlFor="sspi_strip_domain_names"><strong>{i18n("admin.auths.sspi_strip_domain_names")}</strong></label>
			<input id="sspi_strip_domain_names" name="sspi_strip_domain_names" className="sspi-strip-domain-names" type="checkbox" {...(props.sSPIStripDomainNames ? {"checked": true} : {})} />
			<p className="help">{i18n("admin.auths.sspi_strip_domain_names_helper")}</p>
		</div>
	</div>
	<div className="required field">
		<label htmlFor="sspi_separator_replacement">{i18n("admin.auths.sspi_separator_replacement")}</label>
		<input id="sspi_separator_replacement" name="sspi_separator_replacement" value={String(props.sSPISeparatorReplacement ?? "")} />
		<p className="help">{i18n("admin.auths.sspi_separator_replacement_helper")}</p>
	</div>
	<div className="field">
		<label htmlFor="sspi_default_language">{i18n("admin.auths.sspi_default_language")}</label>
		<div className="ui language selection dropdown" id="sspi_default_language">
			<input name="sspi_default_language" type="hidden" value={String(props.sSPIDefaultLanguage ?? "")} />
			<span className="svg-icon" aria-label="octicon-triangle-down"></span>
			<div className="text">{((props.allLangs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>{(props.sSPIDefaultLanguage === item.lang) ? (<>{item.name as any}</>) : null}</React.Fragment>))}</div>
			<div className="menu">
				<div className={`item${(!(props.sSPIDefaultLanguage)) ? ` active selected` : ""}`} data-value="">-</div>
			{((props.allLangs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className={`item${(props.sSPIDefaultLanguage === props.lang) ? ` active selected` : ""}`} data-value={String(props.lang ?? "")}>{item.name as any}</div>
			</React.Fragment>))}
			</div>
		</div>
		<p className="help">{i18n("admin.auths.sspi_default_language_helper")}</p>
	</div>
</div>

  </>)
}
