// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Oauth(props: Record<string, unknown>) {
  return (<>
<div className={`oauth2 field ${(!(props.type === 6)) ? `tw-hidden` : ""}`}>
	<div className="inline required field">
		<label>{i18n("admin.auths.oauth2_provider")}</label>
		<div className="ui selection type dropdown">
			<input type="hidden" id="oauth2_provider" name="oauth2_provider" value={String(props.oauth2_provider ?? "")} />
			<div className="text">{props.oauth2_provider as any}</div>
			<span className="svg-icon" aria-label="octicon-triangle-down"></span>
			<div className="menu">
				{((props.oAuth2Providers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<div className="item" data-value={String(props.name ?? "")}>{item.displayName as any}</div>
				</React.Fragment>))}
			</div>
		</div>
	</div>
	<div className="required field">
		<label htmlFor="oauth2_key">{i18n("admin.auths.oauth2_clientID")}</label>
		<input id="oauth2_key" name="oauth2_key" value={String(props.oauth2_key ?? "")} />
	</div>
	<div className="required field">
		<label htmlFor="oauth2_secret">{i18n("admin.auths.oauth2_clientSecret")}</label>
		<input id="oauth2_secret" name="oauth2_secret" value={String(props.oauth2_secret ?? "")} />
	</div>
	<div className="optional field">
		<label htmlFor="oauth2_icon_url">{i18n("admin.auths.oauth2_icon_url")}</label>
		<input id="oauth2_icon_url" name="oauth2_icon_url" value={String(props.oauth2_icon_url ?? "")} />
	</div>
	<div className={`open_id_connect_auto_discovery_url required field${(props.err_DiscoveryURL) ? ` error` : ""}`}>
		<label htmlFor="open_id_connect_auto_discovery_url">{i18n("admin.auths.openIdConnectAutoDiscoveryURL")}</label>
		<input id="open_id_connect_auto_discovery_url" name="open_id_connect_auto_discovery_url" value={String(props.open_id_connect_auto_discovery_url ?? "")} />
	</div>
	<div className="optional field">
		<div className="ui checkbox">
			<label htmlFor="skip_local_two_fa"><strong>{i18n("admin.auths.skip_local_two_fa")}</strong></label>
			<input id="skip_local_two_fa" name="skip_local_two_fa" type="checkbox" {...(props.skip_local_two_fa ? {"checked": true} : {})} />
			<p className="help">{i18n("admin.auths.skip_local_two_fa_helper")}</p>
		</div>
	</div>

	<div className="oauth2_use_custom_url inline field">
		<div className="ui checkbox">
			<label><strong>{i18n("admin.auths.oauth2_use_custom_url")}</strong></label>
			<input id="oauth2_use_custom_url" name="oauth2_use_custom_url" type="checkbox" />
		</div>
	</div>
	<div className="oauth2_use_custom_url_field oauth2_auth_url required field">
		<label htmlFor="oauth2_auth_url">{i18n("admin.auths.oauth2_authURL")}</label>
		<input id="oauth2_auth_url" name="oauth2_auth_url" value={String(props.oauth2_auth_url ?? "")} />
	</div>
	<div className="oauth2_use_custom_url_field oauth2_token_url required field">
		<label htmlFor="oauth2_token_url">{i18n("admin.auths.oauth2_tokenURL")}</label>
		<input id="oauth2_token_url" name="oauth2_token_url" value={String(props.oauth2_token_url ?? "")} />
	</div>
	<div className="oauth2_use_custom_url_field oauth2_profile_url required field">
		<label htmlFor="oauth2_profile_url">{i18n("admin.auths.oauth2_profileURL")}</label>
		<input id="oauth2_profile_url" name="oauth2_profile_url" value={String(props.oauth2_profile_url ?? "")} />
	</div>
	<div className="oauth2_use_custom_url_field oauth2_email_url required field">
		<label htmlFor="oauth2_email_url">{i18n("admin.auths.oauth2_emailURL")}</label>
		<input id="oauth2_email_url" name="oauth2_email_url" value={String(props.oauth2_email_url ?? "")} />
	</div>
	<div className="oauth2_use_custom_url_field oauth2_tenant required field">
		<label htmlFor="oauth2_tenant">{i18n("admin.auths.oauth2_tenant")}</label>
		<input id="oauth2_tenant" name="oauth2_tenant" value={String(props.oauth2_tenant ?? "")} />
	</div>

	{((props.oAuth2Providers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<input id={`${String(props.name ?? "")}_SupportSSHPublicKey`} value={String(props.supportSSHPublicKey ?? "")} type="hidden" />
		{(item.customURLSettings) ? (<>
		<input id={`${String(props.name ?? "")}_customURLSettings`} type="hidden" data-required={String(props.customURLSettings?.required ?? "")} data-available="true" />
		<input id={`${String(props.name ?? "")}_token_url`} value={String(props.customURLSettings?.tokenURL?.value ?? "")} data-available={String(props.customURLSettings?.tokenURL?.available ?? "")} data-required={String(props.customURLSettings?.tokenURL?.required ?? "")} type="hidden" />
		<input id={`${String(props.name ?? "")}_auth_url`} value={String(props.customURLSettings?.authURL?.value ?? "")} data-available={String(props.customURLSettings?.authURL?.available ?? "")} data-required={String(props.customURLSettings?.authURL?.required ?? "")} type="hidden" />
		<input id={`${String(props.name ?? "")}_profile_url`} value={String(props.customURLSettings?.profileURL?.value ?? "")} data-available={String(props.customURLSettings?.profileURL?.available ?? "")} data-required={String(props.customURLSettings?.profileURL?.required ?? "")} type="hidden" />
		<input id={`${String(props.name ?? "")}_email_url`} value={String(props.customURLSettings?.emailURL?.value ?? "")} data-available={String(props.customURLSettings?.emailURL?.available ?? "")} data-required={String(props.customURLSettings?.emailURL?.required ?? "")} type="hidden" />
		<input id={`${String(props.name ?? "")}_tenant`} value={String(props.customURLSettings?.tenant?.value ?? "")} data-available={String(props.customURLSettings?.tenant?.available ?? "")} data-required={String(props.customURLSettings?.tenant?.required ?? "")} type="hidden" />
		</>) : null}
	</React.Fragment>))}

	<div className="field">
		<label htmlFor="oauth2_scopes">{i18n("admin.auths.oauth2_scopes")}</label>
		<input id="oauth2_scopes" name="oauth2_scopes" value={String(props.oauth2_scopes ?? "")} />
	</div>

	<div className="field">
		<label>{i18n("admin.auths.oauth2_full_name_claim_name")}</label>
		<input name="oauth2_full_name_claim_name" value={String(props.oauth2_full_name_claim_name ?? "")} placeholder="name" />
	</div>
	<div className="field oauth2_ssh_public_key_claim_name">
		<label>{i18n("admin.auths.oauth2_ssh_public_key_claim_name")}</label>
		<input name="oauth2_ssh_public_key_claim_name" value={String(props.oauth2_ssh_public_key_claim_name ?? "")} placeholder="sshpubkey" />
	</div>
	<div className="open_id_connect_external_id_claim field">
		<label htmlFor="open_id_connect_external_id_claim">{i18n("admin.auths.open_id_connect_external_id_claim")}</label>
		<input id="open_id_connect_external_id_claim" name="open_id_connect_external_id_claim" value={String(props.open_id_connect_external_id_claim ?? "")} placeholder="sub" />
		<p className="help">{i18n("admin.auths.open_id_connect_external_id_claim_helper")}</p>
	</div>
	<div className="field">
		<label htmlFor="oauth2_required_claim_name">{i18n("admin.auths.oauth2_required_claim_name")}</label>
		<input id="oauth2_required_claim_name" name="oauth2_required_claim_name" value={String(props.oauth2_required_claim_name ?? "")} />
		<p className="help">{i18n("admin.auths.oauth2_required_claim_name_helper")}</p>
	</div>
	<div className="field">
		<label htmlFor="oauth2_required_claim_value">{i18n("admin.auths.oauth2_required_claim_value")}</label>
		<input id="oauth2_required_claim_value" name="oauth2_required_claim_value" value={String(props.oauth2_required_claim_value ?? "")} />
		<p className="help">{i18n("admin.auths.oauth2_required_claim_value_helper")}</p>
	</div>
	<div className="field">
		<label htmlFor="oauth2_group_claim_name">{i18n("admin.auths.oauth2_group_claim_name")}</label>
		<input id="oauth2_group_claim_name" name="oauth2_group_claim_name" value={String(props.oauth2_group_claim_name ?? "")} />
	</div>
	<div className="field">
		<label htmlFor="oauth2_admin_group">{i18n("admin.auths.oauth2_admin_group")}</label>
		<input id="oauth2_admin_group" name="oauth2_admin_group" value={String(props.oauth2_admin_group ?? "")} />
	</div>
	<div className="field">
		<label htmlFor="oauth2_restricted_group">{i18n("admin.auths.oauth2_restricted_group")}</label>
		<input id="oauth2_restricted_group" name="oauth2_restricted_group" value={String(props.oauth2_restricted_group ?? "")} />
	</div>
	<div className="field">
		<label>{i18n("admin.auths.oauth2_map_group_to_team")}</label>
		<textarea name="oauth2_group_team_map" rows="5" placeholder='{"Developer": {"MyGiteaOrganization": ["MyGiteaTeam1", "MyGiteaTeam2"]}}'>{props.oauth2_group_team_map as any}</textarea>
	</div>
	<div className="ui checkbox">
		<label>{i18n("admin.auths.oauth2_map_group_to_team_removal")}</label>
		<input name="oauth2_group_team_map_removal" type="checkbox" {...(props.oauth2_group_team_map_removal ? {"checked": true} : {})} />
	</div>
</div>

  </>)
}
