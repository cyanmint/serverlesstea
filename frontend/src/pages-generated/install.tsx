// @ts-nocheck
import React from 'react'
import { i18n } from '../lib/i18n'

export default function Install(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content install">
	<div className="ui grid install-config-container">
		<div className="sixteen wide tw-text-center centered column">
			<h3 className="ui top attached header">
				{i18n("install.title")}
			</h3>
			<div className="ui attached segment">
				{/* alert */}

				<p>{i18n("install.docker_helper")}</p>

				<form className="ui form" action={`/`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					{'{'}/* Database Settings */{'}'}
					<h4 className="ui dividing header">{i18n("install.db_title")}</h4>
					<p>{i18n("install.require_db_desc")}</p>
					<div className={`inline required field ${(props.err_DbType) ? `error` : ""}`}>
						<label>{i18n("install.db_type")}</label>
						<div className="ui selection database type dropdown">
							<input type="hidden" id="db_type" name="db_type" value={String(props.curDbType ?? "")} />
							<div className="text">{props.curDbType as any}</div>
							<span className="svg-icon" aria-label="octicon-triangle-down"></span>
							<div className="menu">
								{((props.dbTypeNames) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									<div className="item" data-value={String(props.type ?? "")}>{item.name as any}</div>
								</React.Fragment>))}
							</div>
						</div>
					</div>

					<div className="tw-mt-4 tw-hidden" data-db-setting-htmlFor="common-host">
						<div className={`inline required field ${(props.err_DbSetting) ? `error` : ""}`}>
							<label htmlFor="db_host">{i18n("install.host")}</label>
							<input id="db_host" name="db_host" value={String(props.db_host ?? "")} />
						</div>
						<div className={`inline required field ${(props.err_DbSetting) ? `error` : ""}`}>
							<label htmlFor="db_user">{i18n("install.user")}</label>
							<input id="db_user" name="db_user" value={String(props.db_user ?? "")} />
						</div>
						<div className={`inline required field ${(props.err_DbSetting) ? `error` : ""}`}>
							<label htmlFor="db_passwd">{i18n("install.password")}</label>
							<input id="db_passwd" name="db_passwd" type="password" value={String(props.db_passwd ?? "")} />
						</div>
						<div className={`inline required field ${(props.err_DbSetting) ? `error` : ""}`}>
							<label htmlFor="db_name">{i18n("install.db_name")}</label>
							<input id="db_name" name="db_name" value={String(props.db_name ?? "")} />
						</div>
					</div>

					<div className="tw-mt-4 tw-hidden" data-db-setting-htmlFor="postgres">
						<div className="inline required field">
							<label>{i18n("install.ssl_mode")}</label>
							<div className="ui selection database type dropdown">
								<input type="hidden" name="ssl_mode" value={`${(props.ssl_mode) ? `${String(props.ssl_mode ?? "")}` : `disable`}`} />
								<div className="default text">disable</div>
								<span className="svg-icon" aria-label="octicon-triangle-down"></span>
								<div className="menu">
									<div className="item" data-value="disable">Disable</div>
									<div className="item" data-value="require">Require</div>
									<div className="item" data-value="verify-full">Verify Full</div>
								</div>
							</div>
						</div>
						<div className={`inline field ${(props.err_DbSetting) ? `error` : ""}`}>
							<label htmlFor="db_schema">{i18n("install.db_schema")}</label>
							<input id="db_schema" name="db_schema" value={String(props.db_schema ?? "")} />
							<span className="help">{i18n("install.db_schema_helper")}</span>
						</div>
					</div>

					<div className="tw-mt-4 tw-hidden" data-db-setting-htmlFor="sqlite3">
						<div className={`inline required field ${((props.err_DbPath || props.err_DbSetting)) ? `error` : ""}`}>
							<label htmlFor="db_path">{i18n("install.path")}</label>
							<input id="db_path" name="db_path" value={String(props.db_path ?? "")} />
							<span className="help">{i18n("install.sqlite_helper")}</span>
						</div>
					</div>

					{(props.err_DbInstalledBefore) ? (<>
					<div>
						<p className="reinstall-message">{i18n("install.reinstall_confirm_message")}</p>
						<div className="reinstall-confirm">
							<div className="ui checkbox">
								<label>{i18n("install.reinstall_confirm_check_1")}</label>
								<input name="reinstall_confirm_first" type="checkbox" />
							</div>
						</div>
						<div className="reinstall-confirm">
							<div className="ui checkbox">
								<label>{i18n("install.reinstall_confirm_check_2")}</label>
								<input name="reinstall_confirm_second" type="checkbox" />
							</div>
						</div>
						<div className="reinstall-confirm">
							<div className="ui checkbox">
								<label>{i18n("install.reinstall_confirm_check_3")}</label>
								<input name="reinstall_confirm_third" type="checkbox" />
							</div>
						</div>
					</div>
					</>) : null}

					{'{'}/* General Settings */{'}'}
					<h4 className="ui dividing header">{i18n("install.general_title")}</h4>
					<div className={`inline required field ${(props.err_AppName) ? `error` : ""}`}>
						<label htmlFor="app_name">{i18n("install.app_name")}</label>
						<input id="app_name" name="app_name" value={String(props.app_name ?? "")} required />
						<span className="help">{i18n("install.app_name_helper")}</span>
					</div>
					<div className={`inline required field ${(props.err_RepoRootPath) ? `error` : ""}`}>
						<label htmlFor="repo_root_path">{i18n("install.repo_path")}</label>
						<input id="repo_root_path" name="repo_root_path" value={String(props.repo_root_path ?? "")} required />
						<span className="help">{i18n("install.repo_path_helper")}</span>
					</div>
					<div className={`inline field ${(props.err_LFSRootPath) ? `error` : ""}`}>
						<label htmlFor="lfs_root_path">{i18n("install.lfs_path")}</label>
						<input id="lfs_root_path" name="lfs_root_path" value={String(props.lfs_root_path ?? "")} />
						<span className="help">{i18n("install.lfs_path_helper")}</span>
					</div>
					<div className="inline field">
						<label htmlFor="run_user">{i18n("install.run_user")}</label>
						<input id="run_user" name="run_user" value={String(props.run_user ?? "")} readonly />
						<span className="help">{i18n("install.run_user_helper")}</span>
					</div>
					<div className="inline required field">
						<label htmlFor="domain">{i18n("install.domain")}</label>
						<input id="domain" name="domain" value={String(props.domain ?? "")} placeholder="demo.gitea.com" required />
						<span className="help">{i18n("install.domain_helper")}</span>
					</div>
					<div className="inline field">
						<label htmlFor="ssh_port">{i18n("install.ssh_port")}</label>
						<input id="ssh_port" name="ssh_port" value={String(props.ssh_port ?? "")} />
						<span className="help">{i18n("install.ssh_port_helper")}</span>
					</div>
					<div className="inline required field">
						<label htmlFor="http_port">{i18n("install.http_port")}</label>
						<input id="http_port" name="http_port" value={String(props.http_port ?? "")} required />
						<span className="help">{i18n("install.http_port_helper")}</span>
					</div>
					<div className="inline required field">
						<label htmlFor="app_url">{i18n("install.app_url")}</label>
						<input id="app_url" name="app_url" value={String(props.app_url ?? "")} placeholder="https://demo.gitea.com" required />
						<span className="help">{i18n("install.app_url_helper")}</span>
					</div>
					<div className="inline required field">
						<label htmlFor="log_root_path">{i18n("install.log_root_path")}</label>
						<input id="log_root_path" name="log_root_path" value={String(props.log_root_path ?? "")} placeholder="log" required />
						<span className="help">{i18n("install.log_root_path_helper")}</span>
					</div>
					<div className="inline field">
						<div className="ui checkbox">
							<label>{i18n("install.enable_update_checker")}</label>
							<input name="enable_update_checker" type="checkbox" />
						</div>
						<span className="help">{i18n("install.enable_update_checker_helper")}</span>
					</div>

					{'{'}/* Optional Settings */{'}'}
					<h4 className="ui dividing header">{i18n("install.optional_title")}</h4>
					<div>
						{'{'}/* Email */{'}'}
						<details className="optional field">
							<summary className={`right-content tw-py-2${(props.err_SMTP) ? ` tw-text-red` : ""}`}>
								{i18n("install.email_title")}
							</summary>
							<div className="inline field">
								<label htmlFor="smtp_addr">{i18n("install.smtp_addr")}</label>
								<input id="smtp_addr" name="smtp_addr" value={String(props.smtp_addr ?? "")} />
							</div>
							<div className="inline field">
								<label htmlFor="smtp_port">{i18n("install.smtp_port")}</label>
								<input id="smtp_port" name="smtp_port" value={String(props.smtp_port ?? "")} />
							</div>
							<div className={`inline field ${(props.err_SMTPFrom) ? `error` : ""}`}>
								<label htmlFor="smtp_from">{i18n("install.smtp_from")}</label>
								<input id="smtp_from" name="smtp_from" value={String(props.smtp_from ?? "")} />
								<span className="help">{/* TODO: {{ctx.Locale.TrString "install.smtp_from_helper"}} */}{/* it contains lt/gt chars */}</span>
							</div>
							<div className={`inline field ${(props.err_SMTPUser) ? `error` : ""}`}>
								<label htmlFor="smtp_user">{i18n("install.mailer_user")}</label>
								<input id="smtp_user" name="smtp_user" value={String(props.smtp_user ?? "")} />
							</div>
							<div className="inline field">
								<label htmlFor="smtp_passwd">{i18n("install.mailer_password")}</label>
								<input id="smtp_passwd" name="smtp_passwd" type="password" value={String(props.smtp_passwd ?? "")} />
							</div>
							<div className="inline field">
								<div className="ui checkbox">
									<label>{i18n("install.register_confirm")}</label>
									<input name="register_confirm" type="checkbox" {...(props.register_confirm ? {"checked": true} : {})} />
								</div>
							</div>
							<div className="inline field">
								<div className="ui checkbox">
									<label>{i18n("install.mail_notify")}</label>
									<input name="mail_notify" type="checkbox" {...(props.mail_notify ? {"checked": true} : {})} />
								</div>
							</div>
						</details>

						{'{'}/* Server and other services */{'}'}
						<details className="optional field">
							<summary className={`right-content tw-py-2${(props.err_Services) ? ` tw-text-red` : ""}`}>
								{i18n("install.server_service_title")}
							</summary>
							<div className="inline field">
								<div className="ui checkbox" id="enable-openid-signin">
									<label data-tooltip-content={String(i18n("install.openid_signin_popup") ?? "")}>{i18n("install.openid_signin")}</label>
									<input name="enable_open_id_sign_in" type="checkbox" {...(props.enable_open_id_sign_in ? {"checked": true} : {})} />
								</div>
							</div>
							<div className="inline field">
								<div className="ui checkbox" id="disable-registration">
									<label data-tooltip-content={String(i18n("install.disable_registration_popup") ?? "")}>{i18n("install.disable_registration")}</label>
									<input name="disable_registration" type="checkbox" {...(props.disable_registration ? {"checked": true} : {})} />
								</div>
							</div>
							<div className="inline field">
								<div className="ui checkbox" id="allow-only-external-registration">
									<label data-tooltip-content={String(i18n("install.allow_only_external_registration_popup") ?? "")}>{i18n("install.allow_only_external_registration_popup")}</label>
									<input name="allow_only_external_registration" type="checkbox" {...(props.allow_only_external_registration ? {"checked": true} : {})} />
								</div>
							</div>
							<div className="inline field">
								<div className="ui checkbox" id="enable-openid-signup">
									<label data-tooltip-content={String(i18n("install.openid_signup_popup") ?? "")}>{i18n("install.openid_signup")}</label>
									<input name="enable_open_id_sign_up" type="checkbox" {...(props.enable_open_id_sign_up ? {"checked": true} : {})} />
								</div>
							</div>
							<div className="inline field">
								<div className="ui checkbox" id="enable-captcha">
									<label data-tooltip-content={String(i18n("install.enable_captcha_popup") ?? "")}>{i18n("install.enable_captcha")}</label>
									<input name="enable_captcha" type="checkbox" {...(props.enable_captcha ? {"checked": true} : {})} />
								</div>
							</div>
							<div className="inline field">
								<div className="ui checkbox">
									<label data-tooltip-content={String(i18n("install.require_sign_in_view_popup") ?? "")}>{i18n("install.require_sign_in_view")}</label>
									<input name="require_sign_in_view" type="checkbox" {...(props.require_sign_in_view ? {"checked": true} : {})} />
								</div>
							</div>
							<div className="inline field">
								<div className="ui checkbox">
									<label data-tooltip-content={String(i18n("install.default_keep_email_private_popup") ?? "")}>{i18n("install.default_keep_email_private")}</label>
									<input name="default_keep_email_private" type="checkbox" {...(props.default_keep_email_private ? {"checked": true} : {})} />
								</div>
							</div>
							<div className="inline field">
								<div className="ui checkbox">
									<label data-tooltip-content={String(i18n("install.default_allow_create_organization_popup") ?? "")}>{i18n("install.default_allow_create_organization")}</label>
									<input name="default_allow_create_organization" type="checkbox" {...(props.default_allow_create_organization ? {"checked": true} : {})} />
								</div>
							</div>
							<div className="inline field">
								<div className="ui checkbox">
									<label data-tooltip-content={String(i18n("install.default_enable_timetracking_popup") ?? "")}>{i18n("install.default_enable_timetracking")}</label>
									<input name="default_enable_timetracking" type="checkbox" {...(props.default_enable_timetracking ? {"checked": true} : {})} />
								</div>
							</div>
							<div className="inline field">
								<label htmlFor="no_reply_address">{i18n("install.no_reply_address")}</label>
								<input id="_no_reply_address" name="no_reply_address" value={String(props.no_reply_address ?? "")} />
								<span className="help">{i18n("install.no_reply_address_helper")}</span>
							</div>
							<div className="inline field">
								<label htmlFor="password_algorithm">{i18n("install.password_algorithm")}</label>
								<div className="ui selection dropdown">
									<input id="password_algorithm" type="hidden" name="password_algorithm" value={String(props.password_algorithm ?? "")} />
									<div className="text">{props.password_algorithm as any}</div>
									<span className="svg-icon" aria-label="octicon-triangle-down"></span>
									<div className="menu">
										{((props.passwordHashAlgorithms) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
											<div className="item" data-value={String("" ?? "")}>{item as any}</div>
										</React.Fragment>))}
									</div>
								</div>
								<span className="help">{i18n("install.password_algorithm_helper")}</span>
							</div>
						</details>

						{'{'}/* Admin */{'}'}
						<details className="optional field">
							<summary className={`right-content tw-py-2${(props.err_Admin) ? ` tw-text-red` : ""}`}>
								{i18n("install.admin_title")}
							</summary>
							<p className="center">{i18n("install.admin_setting_desc")}</p>
							<div className={`inline field ${(props.err_AdminName) ? `error` : ""}`}>
								<label htmlFor="admin_name">{i18n("install.admin_name")}</label>
								<input id="admin_name" name="admin_name" value={String(props.admin_name ?? "")} />
							</div>
							<div className={`inline field ${(props.err_AdminEmail) ? `error` : ""}`}>
								<label htmlFor="admin_email">{i18n("install.admin_email")}</label>
								<input id="admin_email" name="admin_email" type="email" value={String(props.admin_email ?? "")} />
							</div>
							<div className={`inline field ${(props.err_AdminPasswd) ? `error` : ""}`}>
								<label htmlFor="admin_passwd">{i18n("install.admin_password")}</label>
								<input id="admin_passwd" name="admin_passwd" type="password" autocomplete="new-password" value={String(props.admin_passwd ?? "")} />
							</div>
							<div className={`inline field ${(props.err_AdminPasswd) ? `error` : ""}`}>
								<label htmlFor="admin_confirm_passwd">{i18n("install.confirm_password")}</label>
								<input id="admin_confirm_passwd" name="admin_confirm_passwd" autocomplete="new-password" type="password" value={String(props.admin_confirm_passwd ?? "")} />
							</div>
						</details>
					</div>

					<div className="divider"></div>

					{(props.envConfigKeys) ? (<>
					{'{'}/* Environment Config */{'}'}
					<h4 className="ui dividing header">{i18n("install.env_config_keys")}</h4>
					<div className="inline field">
						<div className="right-content">
							{i18n("install.env_config_keys_prompt")}
						</div>
						<div className="right-content tw-mt-2">
							{((props.envConfigKeys) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}><span className="ui label">{item as any}</span></React.Fragment>))}
						</div>
					</div>
					</>) : null}

					<div className="inline field">
						<div className="right-content">
							{/* $copyBtn */}
							{/* $filePath */}
							{i18n("install.config_write_file_prompt")}
						</div>
						<div className="tw-mt-4 tw-mb-2 tw-text-center">
							<button className="ui primary button">{i18n("install.install_btn_confirm")}</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>


  </>)
}
