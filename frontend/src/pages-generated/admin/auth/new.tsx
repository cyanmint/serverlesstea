// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function New(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.auths.new")}
		</h4>
		<div className="ui attached segment">
			<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				{/* template: base/disable_form_autofill */}
				{/* Types and name */}
				<div className={`inline required field ${(props.err_Type) ? `error` : ""}`}>
					<label>{i18n("admin.auths.auth_type")}</label>
					<div className="ui selection type dropdown">
						<input type="hidden" id="auth_type" name="type" value={String(props.type ?? "")} />
						<div className="text">{props.currentTypeName as any}</div>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu">
							{((props.authSources) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<div className="item" data-value={String(props.type?.int ?? "")}>{item.name as any}</div>
							</React.Fragment>))}
						</div>
					</div>
				</div>
				<div className={`required inline field ${(props.err_Name) ? `error` : ""}`}>
					<label htmlFor="auth_name">{i18n("admin.auths.auth_name")}</label>
					<input id="auth_name" name="name" value={String(props.name ?? "")} autofocus required />
				</div>

				{/* LDAP and DLDAP */}
				{/* template: admin/auth/source/ldap */}

				{/* SMTP */}
				{/* template: admin/auth/source/smtp */}

				{/* PAM */}
				<div className={`pam required field ${(!(props.type === 4)) ? `tw-hidden` : ""}`}>
					<label htmlFor="pam_service_name">{i18n("admin.auths.pam_service_name")}</label>
					<input id="pam_service_name" name="pam_service_name" value={String(props.pam_service_name ?? "")} />
					<label htmlFor="pam_email_domain">{i18n("admin.auths.pam_email_domain")}</label>
					<input id="pam_email_domain" name="pam_email_domain" value={String(props.pam_email_domain ?? "")} />
				</div>
				<div className={`pam optional field ${(!(props.type === 4)) ? `tw-hidden` : ""}`}>
					<div className="ui checkbox">
						<label htmlFor="skip_local_two_fa"><strong>{i18n("admin.auths.skip_local_two_fa")}</strong></label>
						<input id="skip_local_two_fa" name="skip_local_two_fa" type="checkbox" {...(props.skip_local_two_fa ? {"checked": true} : {})} />
						<p className="help">{i18n("admin.auths.skip_local_two_fa_helper")}</p>
					</div>
				</div>

				{/* OAuth2 */}
				{/* template: admin/auth/source/oauth */}

				{/* SSPI */}
				{/* template: admin/auth/source/sspi */}

				<div className="ldap field">
					<div className="ui checkbox">
						<label><strong>{i18n("admin.auths.attributes_in_bind")}</strong></label>
						<input name="attributes_in_bind" type="checkbox" {...(props.attributes_in_bind ? {"checked": true} : {})} />
					</div>
				</div>
				<div className={`oauth2 ldap inline field ${(!((props.type === 2 || props.type === 6))) ? `tw-hidden` : ""}`}>
					<div className="ui checkbox">
						<label><strong>{i18n("admin.auths.syncenabled")}</strong></label>
						<input name="is_sync_enabled" type="checkbox" {...(props.is_sync_enabled ? {"checked": true} : {})} />
					</div>
				</div>
				<div className="inline field">
					<div className="ui checkbox">
						<label><strong>{i18n("admin.auths.activated")}</strong></label>
						<input name="is_active" type="checkbox" {...(props.is_active ? {"checked": true} : {})} />
					</div>
				</div>

				<div className="field">
					<button className="ui primary button">{i18n("admin.auths.new")}</button>
				</div>
			</form>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.auths.tips")}
		</h4>
		<div className="ui attached segment">
			<h5>GMail Settings:</h5>
			<p>Host: smtp.gmail.com, Port: 587, Enable TLS Encryption: true</p>

			<div className="oauth2">
				<h5>{i18n("admin.auths.tips.oauth2.general")}</h5>
				<p>{i18n("admin.auths.tips.oauth2.general.tip")} <b id="oauth2-callback-url"></b></p>
			</div>
			<div className="oauth2 tw-mt-4">
				<h5>{i18n("admin.auths.tip.oauth2_provider")}</h5>
				<ul>
					<li>
						Bitbucket
						<div>{i18n("admin.auths.tip.bitbucket")}</div>
					</li>
					<li>
						Dropbox
						<div>{i18n("admin.auths.tip.dropbox")}</div>
					</li>
					<li>
						Facebook
						<div>{i18n("admin.auths.tip.facebook")}</div>
					</li>
					<li>
						GitHub
						<div>{i18n("admin.auths.tip.github")}</div>
					</li>
					<li>
						GitLab
						<div>{i18n("admin.auths.tip.gitlab_new")}</div>
					</li>
					<li>
						Google
						<div>{i18n("admin.auths.tip.google_plus")}</div>
					</li>
					<li>
						OpenID Connect
						<div>{i18n("admin.auths.tip.openid_connect")}</div>
					</li>
					<li>
						Twitter
						<div>{i18n("admin.auths.tip.twitter")}</div>
					</li>
					<li>
						Discord
						<div>{i18n("admin.auths.tip.discord")}</div>
					</li>
					<li>
						Gitea
						<div>{i18n("admin.auths.tip.gitea")}</div>
					</li>
					<li>
						Nextcloud
						<div>{i18n("admin.auths.tip.nextcloud")}</div>
					</li>
					<li>
						Yandex
						<div>{i18n("admin.auths.tip.yandex")}</div>
					</li>
					<li>
						Mastodon
						<div>{i18n("admin.auths.tip.mastodon")}</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
{/* template: admin/layout_footer */}

  </>)
}
