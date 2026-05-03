// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Ldap(props: Record<string, unknown>) {
  return (<>
<div className={`ldap dldap field ${(!((props.type === 2 || props.type === 5))) ? `tw-hidden` : ""}`}>
	<div className={`inline required field ${(props.err_SecurityProtocol) ? `error` : ""}`}>
		<label>{i18n("admin.auths.security_protocol")}</label>
		<div className="ui selection security-protocol dropdown">
			<input type="hidden" id="security_protocol" name="security_protocol" value={String(props.security_protocol ?? "")} />
			<div className="text">{props.currentSecurityProtocol as any}</div>
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
		<input id="host" name="host" value={String(props.host ?? "")} placeholder="mydomain.com" />
	</div>
	<div className="required field">
		<label htmlFor="port">{i18n("admin.auths.port")}</label>
		<input id="port" name="port" value={String(props.port ?? "")}  placeholder="636" />
	</div>
	<div className={`has-tls inline field ${(!(props.hasTLS)) ? `tw-hidden` : ""}`}>
		<div className="ui checkbox">
			<label><strong>{i18n("admin.auths.skip_tls_verify")}</strong></label>
			<input name="skip_verify" type="checkbox" {...(props.skip_verify ? {"checked": true} : {})} />
		</div>
	</div>
	<div className={`ldap field ${(!(props.type === 2)) ? `tw-hidden` : ""}`}>
		<label htmlFor="bind_dn">{i18n("admin.auths.bind_dn")}</label>
		<input id="bind_dn" name="bind_dn" value={String(props.bind_dn ?? "")} placeholder="cn=Search,dc=mydomain,dc=com" />
	</div>
	<div className={`ldap field ${(!(props.type === 2)) ? `tw-hidden` : ""}`}>
		<label htmlFor="bind_password">{i18n("admin.auths.bind_password")}</label>
		<input id="bind_password" name="bind_password" type="password" autocomplete="off" value={String(props.bind_password ?? "")} />
	</div>
	<div className={`binddnrequired ${(props.type === 2) ? `required` : ""} field`}>
		<label htmlFor="user_base">{i18n("admin.auths.user_base")}</label>
		<input id="user_base" name="user_base" value={String(props.user_base ?? "")} placeholder="ou=Users,dc=mydomain,dc=com" />
	</div>
	<div className={`dldap required field ${(!(props.type === 5)) ? `tw-hidden` : ""}`}>
		<label htmlFor="user_dn">{i18n("admin.auths.user_dn")}</label>
		<input id="user_dn" name="user_dn" value={String(props.user_dn ?? "")} placeholder="uid=%s,ou=Users,dc=mydomain,dc=com" />
	</div>
	<div className="required field">
		<label htmlFor="filter">{i18n("admin.auths.filter")}</label>
		<input id="filter" name="filter" value={String(props.filter ?? "")} placeholder="(&(objectClass=posixAccount)(|(uid=%[1]s)(mail=%[1]s)))" />
	</div>
	<div className="field">
		<label htmlFor="admin_filter">{i18n("admin.auths.admin_filter")}</label>
		<input id="admin_filter" name="admin_filter" value={String(props.admin_filter ?? "")} />
	</div>
	<div className="field">
		<label htmlFor="restricted_filter">{i18n("admin.auths.restricted_filter")}</label>
		<input id="restricted_filter" name="restricted_filter" value={String(props.restricted_filter ?? "")} />
		<p className="help">{i18n("admin.auths.restricted_filter_helper")}</p>
	</div>
	<div className="field">
		<label htmlFor="attribute_username">{i18n("admin.auths.attribute_username")}</label>
		<input id="attribute_username" name="attribute_username" value={String(props.attribute_username ?? "")} placeholder={String(i18n("admin.auths.attribute_username_placeholder") ?? "")} />
	</div>
	<div className="field">
		<label htmlFor="attribute_name">{i18n("admin.auths.attribute_name")}</label>
		<input id="attribute_name" name="attribute_name" value={String(props.attribute_name ?? "")} />
	</div>
	<div className="field">
		<label htmlFor="attribute_surname">{i18n("admin.auths.attribute_surname")}</label>
		<input id="attribute_surname" name="attribute_surname" value={String(props.attribute_surname ?? "")} />
	</div>
	<div className="required field">
		<label htmlFor="attribute_mail">{i18n("admin.auths.attribute_mail")}</label>
		<input id="attribute_mail" name="attribute_mail" value={String(props.attribute_mail ?? "")} placeholder="mail" />
	</div>
	<div className="field">
		<label htmlFor="attribute_ssh_public_key">{i18n("admin.auths.attribute_ssh_public_key")}</label>
		<input id="attribute_ssh_public_key" name="attribute_ssh_public_key" value={String(props.attribute_ssh_public_key ?? "")} placeholder="SshPublicKey" />
	</div>
	<div className="field">
		<label htmlFor="attribute_avatar">{i18n("admin.auths.attribute_avatar")}</label>
		<input id="attribute_avatar" name="attribute_avatar" value={String(props.attribute_avatar ?? "")} placeholder="jpegPhoto" />
	</div>

	<div className="inline field">
		<div className="ui checkbox">
			<label htmlFor="ssh_keys_are_verified"><strong>{i18n("admin.auths.ssh_keys_are_verified")}</strong></label>
			<input id="ssh_keys_are_verified" name="ssh_keys_are_verified" type="checkbox" {...(props.ssh_keys_are_verified ? {"checked": true} : {})} />
		</div>
	</div>
	{/* ldap group begin */}
	<div className="inline field">
		<div className="ui checkbox">
			<label><strong>{i18n("admin.auths.enable_ldap_groups")}</strong></label>
			<input type="checkbox" name="groups_enabled" className="js-ldap-group-toggle" {...(props.groups_enabled ? {"checked": true} : {})} />
		</div>
	</div>
	<div id="ldap-group-options" className="ui segment secondary">
		<div className="field">
			<label>{i18n("admin.auths.group_search_base")}</label>
			<input name="group_dn" value={String(props.group_dn ?? "")} placeholder="ou=group,dc=mydomain,dc=com" />
		</div>
		<div className="field">
			<label>{i18n("admin.auths.group_attribute_list_users")}</label>
			<input name="group_member_uid" value={String(props.group_member_uid ?? "")} placeholder="memberUid" />
		</div>
		<div className="field">
			<label>{i18n("admin.auths.user_attribute_in_group")}</label>
			<input name="user_uid" value={String(props.user_uid ?? "")} placeholder="uid" />
		</div>
		<div className="field">
			<label>{i18n("admin.auths.verify_group_membership")}</label>
			<input name="group_filter" value={String(props.group_filter ?? "")} placeholder="(|(cn=gitea_users)(cn=admins))" />
		</div>
		<div className="field">
			<label>{i18n("admin.auths.map_group_to_team")}</label>
			<textarea name="group_team_map" rows="5" placeholder='{"cn=my-group,cn=groups,dc=example,dc=org": {"MyGiteaOrganization": ["MyGiteaTeam1", "MyGiteaTeam2"]}}'>{props.group_team_map as any}</textarea>
		</div>
		<div className="ui checkbox">
			<label>{i18n("admin.auths.map_group_to_team_removal")}</label>
			<input name="group_team_map_removal" type="checkbox" {...(props.group_team_map_removal ? {"checked": true} : {})} />
		</div>
	</div>
	{/* ldap group end */}

	<div className={`ldap inline field ${(!(props.type === 2)) ? `tw-hidden` : ""}`}>
		<div className="ui checkbox">
			<label htmlFor="use_paged_search"><strong>{i18n("admin.auths.use_paged_search")}</strong></label>
			<input id="use_paged_search" name="use_paged_search" className="use-paged-search" type="checkbox" {...(props.use_paged_search ? {"checked": true} : {})} />
		</div>
	</div>
	<div className={`ldap field search-page-size required ${((!(props.type === 2) || !(props.use_paged_search))) ? `tw-hidden` : ""}`}>
		<label htmlFor="search_page_size">{i18n("admin.auths.search_page_size")}</label>
		<input id="search_page_size" name="search_page_size" value={String(props.search_page_size ?? "")} />
	</div>
	<div className="optional field">
		<div className="ui checkbox">
			<label htmlFor="skip_local_two_fa"><strong>{i18n("admin.auths.skip_local_two_fa")}</strong></label>
			<input id="skip_local_two_fa" name="skip_local_two_fa" type="checkbox" {...(props.skip_local_two_fa ? {"checked": true} : {})} />
			<p className="help">{i18n("admin.auths.skip_local_two_fa_helper")}</p>
		</div>
	</div>
	<div className="inline field">
		<div className="ui checkbox">
			<label htmlFor="allow_deactivate_all"><strong>{i18n("admin.auths.allow_deactivate_all")}</strong></label>
			<input id="allow_deactivate_all" name="allow_deactivate_all" type="checkbox" {...(props.allow_deactivate_all ? {"checked": true} : {})} />
		</div>
	</div>
</div>

  </>)
}
