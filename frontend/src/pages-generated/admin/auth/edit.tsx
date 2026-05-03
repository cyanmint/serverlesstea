// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Edit(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.auths.edit")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				{/* template: base/disable_form_autofill */}
				<input type="hidden" name="id" value={String(props.source?.iD ?? "")} />
				<div className="inline field">
					<label>{i18n("admin.auths.auth_type")}</label>
					<input type="hidden" id="auth_type" name="type" value={String(props.source?.type?.int ?? "")} />
					<span>{props.source?.typeName as any}</span>
				</div>
				<div className={`required inline field ${(props.err_Name) ? `error` : ""}`}>
					<label htmlFor="auth_name">{i18n("admin.auths.auth_name")}</label>
					<input id="auth_name" name="name" value={String(props.source?.name ?? "")} required />
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<label ><strong>{i18n("admin.auths.skip_local_two_fa")}</strong></label>
						<input name="two_factor_policy" type="checkbox" value="skip" {...(props.source?.twoFactorPolicy === "skip" ? {"checked": true} : {})} />
						<p className="help">{i18n("admin.auths.skip_local_two_fa_helper")}</p>
					</div>
				</div>

				{'{'}/* LDAP and DLDAP */{'}'}
				{((props.source?.isLDAP || props.source?.isDLDAP)) ? (<>
					{/* $cfg */}
					<div className={`inline required field ${(props.err_SecurityProtocol) ? `error` : ""}`}>
						<label>{i18n("admin.auths.security_protocol")}</label>
						<div className="ui selection security-protocol dropdown">
							<input type="hidden" id="security_protocol" name="security_protocol" value={String("" ?? "")} />
							<div className="text">{/* TODO: {{$cfg.SecurityProtocolName}} */}</div>
							<span className="svg-icon" aria-label="octicon-triangle-down"></span>
							<div className="menu">
								{((props.securityProtocols) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									<div className="item" data-value={String(props.type?.int ?? "")}>{item.name as any}</div>
								</React.Fragment>))}
							</div>
						</div>
					</div>
					<div className="required field">
						<label htmlFor="host">{i18n("admin.auths.host")}</label>
						<input id="host" name="host" value={String("" ?? "")} placeholder="mydomain.com" required />
					</div>
					<div className="required field">
						<label htmlFor="port">{i18n("admin.auths.port")}</label>
						<input id="port" name="port" value={String("" ?? "")}  placeholder="636" required />
					</div>
					<div className={`has-tls inline field ${(!(props.hasTLS)) ? `tw-hidden` : ""}`}>
						<div className="ui checkbox">
							<label><strong>{i18n("admin.auths.skip_tls_verify")}</strong></label>
							<input name="skip_verify" type="checkbox" {...(props.source?.skipVerify ? {"checked": true} : {})} />
						</div>
					</div>
					{(props.source?.isLDAP) ? (<>
						<div className="field">
							<label htmlFor="bind_dn">{i18n("admin.auths.bind_dn")}</label>
							<input id="bind_dn" name="bind_dn" value={String("" ?? "")} placeholder="cn=Search,dc=mydomain,dc=com" />
						</div>
						<div className="field">
							<label htmlFor="bind_password">{i18n("admin.auths.bind_password")}</label>
							<input id="bind_password" name="bind_password" type="password" value={String("" ?? "")} />
						</div>
					</>) : null}
					<div className={`${(props.source?.isLDAP) ? `required` : ""} field`}>
							<label htmlFor="user_base">{i18n("admin.auths.user_base")}</label>
							<input id="user_base" name="user_base" value={String("" ?? "")} placeholder="ou=Users,dc=mydomain,dc=com" {...(props.source?.isLDAP ? {"required": true} : {})} />
					</div>
					{(props.source?.isDLDAP) ? (<>
						<div className="required field">
							<label htmlFor="user_dn">{i18n("admin.auths.user_dn")}</label>
							<input id="user_dn" name="user_dn" value={String("" ?? "")} placeholder="uid=%s,ou=Users,dc=mydomain,dc=com" required />
						</div>
					</>) : null}
					<div className="required field">
						<label htmlFor="filter">{i18n("admin.auths.filter")}</label>
						<input id="filter" name="filter" value={String("" ?? "")} placeholder="(&(objectClass=posixAccount)(|(uid=%[1]s)(mail=%[1]s)))" required />
					</div>
					<div className="field">
						<label htmlFor="admin_filter">{i18n("admin.auths.admin_filter")}</label>
						<input id="admin_filter" name="admin_filter" value={String("" ?? "")} />
					</div>
					<div className="field">
						<label htmlFor="restricted_filter">{i18n("admin.auths.restricted_filter")}</label>
						<input id="restricted_filter" name="restricted_filter" value={String("" ?? "")} />
						<p className="help">{i18n("admin.auths.restricted_filter_helper")}</p>
					</div>
					<div className="field">
						<label htmlFor="attribute_username">{i18n("admin.auths.attribute_username")}</label>
						<input id="attribute_username" name="attribute_username" value={String("" ?? "")} placeholder={String(i18n("admin.auths.attribute_username_placeholder") ?? "")} />
					</div>
					<div className="field">
						<label htmlFor="attribute_name">{i18n("admin.auths.attribute_name")}</label>
						<input id="attribute_name" name="attribute_name" value={String("" ?? "")} />
					</div>
					<div className="field">
						<label htmlFor="attribute_surname">{i18n("admin.auths.attribute_surname")}</label>
						<input id="attribute_surname" name="attribute_surname" value={String("" ?? "")} />
					</div>
					<div className="required field">
						<label htmlFor="attribute_mail">{i18n("admin.auths.attribute_mail")}</label>
						<input id="attribute_mail" name="attribute_mail" value={String("" ?? "")} placeholder="mail" required />
					</div>
					<div className="field">
						<label htmlFor="attribute_ssh_public_key">{i18n("admin.auths.attribute_ssh_public_key")}</label>
						<input id="attribute_ssh_public_key" name="attribute_ssh_public_key" value={String("" ?? "")} placeholder="SshPublicKey" />
					</div>
					<div className="field">
						<label htmlFor="attribute_avatar">{i18n("admin.auths.attribute_avatar")}</label>
						<input id="attribute_avatar" name="attribute_avatar" value={String("" ?? "")} placeholder="jpegPhoto" />
					</div>

					<div className="inline field">
						<div className="ui checkbox">
							<label htmlFor="ssh_keys_are_verified"><strong>{i18n("admin.auths.ssh_keys_are_verified")}</strong></label>
							<input id="ssh_keys_are_verified" name="ssh_keys_are_verified" type="checkbox" {...(props.cfg?.sSHKeysAreVerified ? {"checked": true} : {})} />
						</div>
					</div>
					{'{'}/* ldap group begin */{'}'}
					<div className="inline field">
						<div className="ui checkbox">
							<label><strong>{i18n("admin.auths.enable_ldap_groups")}</strong></label>
							<input type="checkbox" name="groups_enabled" className="js-ldap-group-toggle" {...(props.cfg?.groupsEnabled ? {"checked": true} : {})} />
						</div>
					</div>
					<div id="ldap-group-options" className={`ui segment secondary ${(!(props.cfg?.groupsEnabled)) ? `tw-hidden` : ""}`}>
						<div className="field">
							<label>{i18n("admin.auths.group_search_base")}</label>
							<input name="group_dn" value={String("" ?? "")} placeholder="ou=group,dc=mydomain,dc=com" />
						</div>
						<div className="field">
							<label>{i18n("admin.auths.group_attribute_list_users")}</label>
							<input name="group_member_uid" value={String("" ?? "")} placeholder="memberUid" />
						</div>
						<div className="field">
							<label>{i18n("admin.auths.user_attribute_in_group")}</label>
							<input name="user_uid" value={String("" ?? "")} placeholder="uid" />
						</div>
						<div className="field">
							<label>{i18n("admin.auths.verify_group_membership")}</label>
							<input name="group_filter" value={String("" ?? "")} placeholder="(|(cn=gitea_users)(cn=admins))" />
						</div>
						<div className="field">
							<label>{i18n("admin.auths.map_group_to_team")}</label>
							<textarea name="group_team_map" rows="5" placeholder='{"cn=my-group,cn=groups,dc=example,dc=org": {"MyGiteaOrganization": ["MyGiteaTeam1", "MyGiteaTeam2"]}}'>{/* TODO: {{$cfg.GroupTeamMap}} */}</textarea>
						</div>
						<div className="ui checkbox">
							<label>{i18n("admin.auths.map_group_to_team_removal")}</label>
							<input name="group_team_map_removal" type="checkbox" {...(props.cfg?.groupTeamMapRemoval ? {"checked": true} : {})} />
						</div>
					</div>
					{'{'}/* ldap group end */{'}'}

					{(props.source?.isLDAP) ? (<>
						<div className="inline field">
							<div className="ui checkbox">
								<label htmlFor="use_paged_search"><strong>{i18n("admin.auths.use_paged_search")}</strong></label>
								<input id="use_paged_search" name="use_paged_search" type="checkbox" {...(props.cfg?.usePagedSearch ? {"checked": true} : {})} />
							</div>
						</div>
						<div className={`field required search-page-size${(!(props.cfg?.usePagedSearch)) ? ` tw-hidden` : ""}`}>
							<label htmlFor="search_page_size">{i18n("admin.auths.search_page_size")}</label>
							<input id="search_page_size" name="search_page_size" value={`${(props.cfg?.usePagedSearch) ? `` : ""}`} />
						</div>
						<div className="inline field">
							<div className="ui checkbox">
								<label><strong>{i18n("admin.auths.attributes_in_bind")}</strong></label>
								<input name="attributes_in_bind" type="checkbox" {...(props.cfg?.attributesInBind ? {"checked": true} : {})} />
							</div>
						</div>
					</>) : null}
					<div className="inline field">
						<div className="ui checkbox">
							<label htmlFor="allow_deactivate_all"><strong>{i18n("admin.auths.allow_deactivate_all")}</strong></label>
							<input id="allow_deactivate_all" name="allow_deactivate_all" type="checkbox" {...(props.cfg?.allowDeactivateAll ? {"checked": true} : {})} />
						</div>
					</div>
				</>) : null}

				{'{'}/* SMTP */{'}'}
				{(props.source?.isSMTP) ? (<>
					{/* $cfg */}
					<div className="inline required field">
						<label>{i18n("admin.auths.smtp_auth")}</label>
						<div className="ui selection type dropdown">
							<input type="hidden" id="smtp_auth" name="smtp_auth" value={String("" ?? "")} required />
							<div className="text">{/* TODO: {{$cfg.Auth}} */}</div>
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
						<input id="smtp_host" name="smtp_host" value={String("" ?? "")} required />
					</div>
					<div className="required field">
						<label htmlFor="smtp_port">{i18n("admin.auths.smtpport")}</label>
						<input id="smtp_port" name="smtp_port" value={String("" ?? "")} required />
					</div>
					<div className="field">
						<div className="ui checkbox">
							<label htmlFor="force_smtps"><strong>{i18n("admin.auths.force_smtps")}</strong></label>
							<input id="force_smtps" name="force_smtps" type="checkbox" {...(props.cfg?.forceSMTPS ? {"checked": true} : {})} />
						</div>
						<p className="help">{i18n("admin.auths.force_smtps_helper")}</p>
					</div>
					<div className={`has-tls inline field ${(!(props.hasTLS)) ? `tw-hidden` : ""}`}>
						<div className="ui checkbox">
							<label><strong>{i18n("admin.auths.skip_tls_verify")}</strong></label>
							<input name="skip_verify" type="checkbox" {...(props.cfg?.skipVerify ? {"checked": true} : {})} />
						</div>
					</div>
					<div className="field">
						<label htmlFor="helo_hostname">{i18n("admin.auths.helo_hostname")}</label>
						<input id="helo_hostname" name="helo_hostname" value={String("" ?? "")} />
						<p className="help">{i18n("admin.auths.helo_hostname_helper")}</p>
					</div>
					<div className="inline field">
						<div className="ui checkbox">
							<label htmlFor="disable_helo"><strong>{i18n("admin.auths.disable_helo")}</strong></label>
							<input id="disable_helo" name="disable_helo" type="checkbox" {...(props.cfg?.disableHelo ? {"checked": true} : {})} />
						</div>
					</div>
					<div className="field">
						<label htmlFor="allowed_domains">{i18n("admin.auths.allowed_domains")}</label>
						<input id="allowed_domains" name="allowed_domains" value={String("" ?? "")} />
						<p className="help">{i18n("admin.auths.allowed_domains_helper")}</p>
					</div>
				</>) : null}

				{'{'}/* PAM */{'}'}
				{(props.source?.isPAM) ? (<>
					{/* $cfg */}
					<div className="required field">
						<label htmlFor="pam_service_name">{i18n("admin.auths.pam_service_name")}</label>
						<input id="pam_service_name" name="pam_service_name" value={String("" ?? "")} required />
					</div>
					<div className="field">
						<label htmlFor="pam_email_domain">{i18n("admin.auths.pam_email_domain")}</label>
						<input id="pam_email_domain" name="pam_email_domain" value={String("" ?? "")} />
					</div>
				</>) : null}

				{'{'}/* OAuth2 */{'}'}
				{(props.source?.isOAuth2) ? (<>
					{/* $cfg */}
					<div className="inline required field">
						<label>{i18n("admin.auths.oauth2_provider")}</label>
						<div className="ui selection type dropdown">
							<input type="hidden" id="oauth2_provider" name="oauth2_provider" value={String("" ?? "")} required />
							<div className="text">{props.currentOAuth2Provider?.displayName as any}</div>
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
						<input id="oauth2_key" name="oauth2_key" value={String("" ?? "")} required />
					</div>
					<div className="required field">
						<label htmlFor="oauth2_secret">{i18n("admin.auths.oauth2_clientSecret")}</label>
						<input id="oauth2_secret" name="oauth2_secret" value={String("" ?? "")} required />
					</div>
					<div className="optional field">
						<label htmlFor="oauth2_icon_url">{i18n("admin.auths.oauth2_icon_url")}</label>
						<input id="oauth2_icon_url" name="oauth2_icon_url" value={String("" ?? "")} />
					</div>
					<div className="open_id_connect_auto_discovery_url required field">
						<label htmlFor="open_id_connect_auto_discovery_url">{i18n("admin.auths.openIdConnectAutoDiscoveryURL")}</label>
						<input id="open_id_connect_auto_discovery_url" name="open_id_connect_auto_discovery_url" value={String("" ?? "")} />
					</div>
					<div className="oauth2_use_custom_url inline field">
						<div className="ui checkbox">
							<label><strong>{i18n("admin.auths.oauth2_use_custom_url")}</strong></label>
							<input id="oauth2_use_custom_url" name="oauth2_use_custom_url" type="checkbox" {...(props.cfg?.customURLMapping ? {"checked": true} : {})} />
						</div>
					</div>
					<div className="oauth2_use_custom_url_field oauth2_auth_url required field">
						<label htmlFor="oauth2_auth_url">{i18n("admin.auths.oauth2_authURL")}</label>
						<input id="oauth2_auth_url" name="oauth2_auth_url" value={`${(props.cfg?.customURLMapping) ? `` : ""}`} />
					</div>
					<div className="oauth2_use_custom_url_field oauth2_token_url required field">
						<label htmlFor="oauth2_token_url">{i18n("admin.auths.oauth2_tokenURL")}</label>
						<input id="oauth2_token_url" name="oauth2_token_url" value={`${(props.cfg?.customURLMapping) ? `` : ""}`} />
					</div>
					<div className="oauth2_use_custom_url_field oauth2_profile_url required field">
						<label htmlFor="oauth2_profile_url">{i18n("admin.auths.oauth2_profileURL")}</label>
						<input id="oauth2_profile_url" name="oauth2_profile_url" value={`${(props.cfg?.customURLMapping) ? `` : ""}`} />
					</div>
					<div className="oauth2_use_custom_url_field oauth2_email_url required field">
						<label htmlFor="oauth2_email_url">{i18n("admin.auths.oauth2_emailURL")}</label>
						<input id="oauth2_email_url" name="oauth2_email_url" value={`${(props.cfg?.customURLMapping) ? `` : ""}`} />
					</div>
					<div className="oauth2_use_custom_url_field oauth2_tenant required field">
						<label htmlFor="oauth2_tenant">{i18n("admin.auths.oauth2_tenant")}</label>
						<input id="oauth2_tenant" name="oauth2_tenant" value={`${(props.cfg?.customURLMapping) ? `` : ""}`} />
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
						<input id="oauth2_scopes" name="oauth2_scopes" value={`${(props.cfg?.scopes) ? `` : ""}`} />
					</div>
					<div className="field">
						<label>{i18n("admin.auths.oauth2_full_name_claim_name")}</label>
						<input name="oauth2_full_name_claim_name" value={String("" ?? "")} placeholder="name" />
					</div>
					<div className="field oauth2_ssh_public_key_claim_name">
						<label>{i18n("admin.auths.oauth2_ssh_public_key_claim_name")}</label>
						<input name="oauth2_ssh_public_key_claim_name" value={String("" ?? "")} placeholder="sshpubkey" />
					</div>
					<div className="open_id_connect_external_id_claim field">
						<label htmlFor="open_id_connect_external_id_claim">{i18n("admin.auths.open_id_connect_external_id_claim")}</label>
						<input id="open_id_connect_external_id_claim" name="open_id_connect_external_id_claim" value={String("" ?? "")} placeholder="sub" />
						<p className="help">{i18n("admin.auths.open_id_connect_external_id_claim_helper")}</p>
					</div>
					<div className="field">
						<label htmlFor="oauth2_required_claim_name">{i18n("admin.auths.oauth2_required_claim_name")}</label>
						<input id="oauth2_required_claim_name" name="oauth2_required_claim_name" value={String("" ?? "")} />
						<p className="help">{i18n("admin.auths.oauth2_required_claim_name_helper")}</p>
					</div>
					<div className="field">
						<label htmlFor="oauth2_required_claim_value">{i18n("admin.auths.oauth2_required_claim_value")}</label>
						<input id="oauth2_required_claim_value" name="oauth2_required_claim_value" value={String("" ?? "")} />
						<p className="help">{i18n("admin.auths.oauth2_required_claim_value_helper")}</p>
					</div>
					<div className="field">
						<label htmlFor="oauth2_group_claim_name">{i18n("admin.auths.oauth2_group_claim_name")}</label>
						<input id="oauth2_group_claim_name" name="oauth2_group_claim_name" value={String("" ?? "")} />
					</div>
					<div className="field">
						<label htmlFor="oauth2_admin_group">{i18n("admin.auths.oauth2_admin_group")}</label>
						<input id="oauth2_admin_group" name="oauth2_admin_group" value={String("" ?? "")} />
					</div>
					<div className="field">
						<label htmlFor="oauth2_restricted_group">{i18n("admin.auths.oauth2_restricted_group")}</label>
						<input id="oauth2_restricted_group" name="oauth2_restricted_group" value={String("" ?? "")} />
					</div>
					<div className="field">
						<label>{i18n("admin.auths.oauth2_map_group_to_team")}</label>
						<textarea name="oauth2_group_team_map" rows="5" placeholder='{"Developer": {"MyGiteaOrganization": ["MyGiteaTeam1", "MyGiteaTeam2"]}}'>{/* TODO: {{$cfg.GroupTeamMap}} */}</textarea>
					</div>
					<div className="ui checkbox">
						<label>{i18n("admin.auths.oauth2_map_group_to_team_removal")}</label>
						<input name="oauth2_group_team_map_removal" type="checkbox" {...(props.cfg?.groupTeamMapRemoval ? {"checked": true} : {})} />
					</div>
				</>) : null}

				{'{'}/* SSPI */{'}'}
				{(props.source?.isSSPI) ? (<>
					{/* $cfg */}
					<div className="field">
						<div className="ui checkbox">
							<label htmlFor="sspi_auto_create_users"><strong>{i18n("admin.auths.sspi_auto_create_users")}</strong></label>
							<input id="sspi_auto_create_users" name="sspi_auto_create_users" className="sspi-auto-create-users" type="checkbox" {...(props.cfg?.autoCreateUsers ? {"checked": true} : {})} />
							<p className="help">{i18n("admin.auths.sspi_auto_create_users_helper")}</p>
						</div>
					</div>
					<div className="field">
						<div className="ui checkbox">
							<label htmlFor="sspi_auto_activate_users"><strong>{i18n("admin.auths.sspi_auto_activate_users")}</strong></label>
							<input id="sspi_auto_activate_users" name="sspi_auto_activate_users" className="sspi-auto-activate-users" type="checkbox" {...(props.cfg?.autoActivateUsers ? {"checked": true} : {})} />
							<p className="help">{i18n("admin.auths.sspi_auto_activate_users_helper")}</p>
						</div>
					</div>
					<div className="field">
						<div className="ui checkbox">
							<label htmlFor="sspi_strip_domain_names"><strong>{i18n("admin.auths.sspi_strip_domain_names")}</strong></label>
							<input id="sspi_strip_domain_names" name="sspi_strip_domain_names" className="sspi-strip-domain-names" type="checkbox" {...(props.cfg?.stripDomainNames ? {"checked": true} : {})} />
							<p className="help">{i18n("admin.auths.sspi_strip_domain_names_helper")}</p>
						</div>
					</div>
					<div className="required field">
						<label htmlFor="sspi_separator_replacement">{i18n("admin.auths.sspi_separator_replacement")}</label>
						<input id="sspi_separator_replacement" name="sspi_separator_replacement" value={String("" ?? "")} required />
						<p className="help">{i18n("admin.auths.sspi_separator_replacement_helper")}</p>
					</div>
					<div className="field">
						<label htmlFor="sspi_default_language">{i18n("admin.auths.sspi_default_language")}</label>
						<div className="ui language selection dropdown" id="sspi_default_language">
							<input name="sspi_default_language" type="hidden" value={String("" ?? "")} />
							<span className="svg-icon" aria-label="octicon-triangle-down"></span>
							<div className="text">{((props.allLangs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>{(item.cfg?.defaultLanguage === item.lang) ? (<>{item.name as any}</>) : null}</React.Fragment>))}</div>
							<div className="menu">
								<div className={`item${(!(props.sSPIDefaultLanguage)) ? ` active selected` : ""}`} data-value="">-</div>
							{((props.allLangs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<div className={`item${(props.cfg?.defaultLanguage === props.lang) ? ` active selected` : ""}`} data-value={String(props.lang ?? "")}>{item.name as any}</div>
							</React.Fragment>))}
							</div>
						</div>
						<p className="help">{i18n("admin.auths.sspi_default_language_helper")}</p>
					</div>
				</>) : null}
				{((props.source?.isLDAP || props.source?.isOAuth2)) ? (<>
					<div className="inline field">
						<div className="ui checkbox">
							<label><strong>{i18n("admin.auths.syncenabled")}</strong></label>
							<input name="is_sync_enabled" type="checkbox" {...(props.source?.isSyncEnabled ? {"checked": true} : {})} />
						</div>
					</div>
				</>) : null}
				<div className="inline field">
					<div className="ui checkbox">
						<label><strong>{i18n("admin.auths.activated")}</strong></label>
						<input name="is_active" type="checkbox" {...(props.source?.isActive ? {"checked": true} : {})} />
					</div>
				</div>

				<div className="field">
					<button className="ui primary button">{i18n("admin.auths.update")}</button>
					<button className="ui red button link-action" data-url={`${String(props.link ?? "")}/delete?id=${String(props.source?.iD ?? "")}`}
						data-modal-confirm-header={String(i18n("admin.auths.delete_auth_title") ?? "")}
						data-modal-confirm-content={String(i18n("admin.auths.delete_auth_desc") ?? "")}
					>{i18n("admin.auths.delete")}</button>
				</div>
			</form>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.auths.tips")}
		</h4>
		<div className="ui attached segment">
			<h5>GMail Settings:</h5>
			<p>Host: smtp.gmail.com, Port: 587, Enable TLS Encryption: true</p>

			<h5 className="oauth2">{i18n("admin.auths.tips.oauth2.general")}:</h5>
			<p className="oauth2">{i18n("admin.auths.tips.oauth2.general.tip")} <b id="oauth2-callback-url"></b></p>
		</div>
	</div>
{/* template: admin/layout_footer */}

  </>)
}
