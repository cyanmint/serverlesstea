import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Config(props: Record<string, unknown>) {
  return (<>
{/* template: admin/layout_head */}
	<div className="admin-setting-content">
		<h4 className="ui top attached header">
			{i18n("admin.config.server_config")}
		</h4>
		<div className="ui attached table segment">
			<dl className="admin-dl-horizontal">
				<dt>{i18n("admin.config.app_name")}</dt>
				<dd>{String(props.appName ?? "")}</dd>
				<dt>{i18n("admin.config.app_ver")}</dt>
				<dd>{""}{props.appBuiltWith as any}</dd>
				<dt>{i18n("admin.config.custom_conf")}</dt>
				<dd>{props.customConf as any}</dd>
				<dt>{i18n("admin.config.disable_router_log")}</dt>
				<dd>{/* TODO: {{svg (Iif .DisableRouterLog "octicon-check" "octicon-x")}} */}</dd>

				<div className="divider"></div>

				<dt>{i18n("admin.config.run_user")}</dt>
				<dd>{props.runUser as any}</dd>
				<dt>{i18n("admin.config.run_mode")}</dt>
				<dd>{props.runMode as any}</dd>

				<div className="divider"></div>

				<dt>{i18n("admin.config.git_version")}</dt>
				<dd>{props.gitVersion as any}</dd>

				<div className="divider"></div>

				<dt>{i18n("admin.config.app_data_path")}</dt>
				<dd>{props.appDataPath as any}</dd>
				<dt>{i18n("admin.config.repo_root_path")}</dt>
				<dd>{props.repoRootPath as any}</dd>
				<dt>{i18n("admin.config.custom_file_root_path")}</dt>
				<dd>{props.customRootPath as any}</dd>
				<dt>{i18n("admin.config.log_file_root_path")}</dt>
				<dd>{props.logRootPath as any}</dd>
				<dt>{i18n("admin.config.script_type")}</dt>
				<dd>{props.scriptType as any}</dd>
				<dt>{i18n("admin.config.reverse_auth_user")}</dt>
				<dd>{props.reverseProxyAuthUser as any}</dd>
			</dl>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.config.ssh_config")}
		</h4>
		<div className="ui attached table segment">
			<dl className="admin-dl-horizontal">
				<dt>{i18n("admin.config.ssh_enabled")}</dt>
				<dd>{/* TODO: {{svg (Iif (not .SSH.Disabled) "octicon-check" "octicon-x")}} */}</dd>
				{(!(props.sSH?.disabled)) ? (<>
					<dt>{i18n("admin.config.ssh_start_builtin_server")}</dt>
					<dd>{/* TODO: {{svg (Iif .SSH.StartBuiltinServer "octicon-check" "octicon-x")}} */}</dd>
					<dt>{i18n("admin.config.ssh_domain")}</dt>
					<dd>{props.sSH?.domain as any}</dd>
					<dt>{i18n("admin.config.ssh_port")}</dt>
					<dd>{props.sSH?.port as any}</dd>
					<dt>{i18n("admin.config.ssh_listen_port")}</dt>
					<dd>{props.sSH?.listenPort as any}</dd>

					{(!(props.sSH?.startBuiltinServer)) ? (<>
						<dt>{i18n("admin.config.ssh_root_path")}</dt>
						<dd>{props.sSH?.rootPath as any}</dd>
						<dt>{i18n("admin.config.ssh_minimum_key_size_check")}</dt>
						<dd>{/* TODO: {{svg (Iif .SSH.MinimumKeySizeCheck "octicon-check" "octicon-x")}} */}</dd>
						{(props.sSH?.minimumKeySizeCheck) ? (<>
							<dt>{i18n("admin.config.ssh_minimum_key_sizes")}</dt>
							<dd>{props.sSH?.minimumKeySizes as any}</dd>
						</>) : null}
					</>) : null}
				</>) : null}
			</dl>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.config.lfs_config")}
		</h4>
		<div className="ui attached table segment">
			<dl className="admin-dl-horizontal">
				<dt>{i18n("admin.config.lfs_enabled")}</dt>
				<dd>{/* TODO: {{svg (Iif .LFS.StartServer "octicon-check" "octicon-x")}} */}</dd>
				{(props.lFS?.startServer) ? (<>
					<dt>{i18n("admin.config.lfs_content_path")}</dt>
					<dd>{/* TODO: {{JsonUtils.EncodeToString .LFS.Storage.ToShadowCopy}} */}</dd>
					<dt>{i18n("admin.config.lfs_http_auth_expiry")}</dt>
					<dd>{props.lFS?.hTTPAuthExpiry as any}</dd>
				</>) : null}
			</dl>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.config.db_config")}
		</h4>
		<div className="ui attached table segment">
			<dl className="admin-dl-horizontal">
				<dt>{i18n("admin.config.db_type")}</dt>
				<dd>{props.dbCfg?.type as any}</dd>
				{(!(props.dbCfg?.type === "sqlite3")) ? (<>
					<dt>{i18n("admin.config.db_host")}</dt>
					<dd>{(props.dbCfg?.host) ? (<>{props.dbCfg?.host as any}</>) : (<>-</>)}</dd>
					<dt>{i18n("admin.config.db_name")}</dt>
					<dd>{(props.dbCfg?.name) ? (<>{props.dbCfg?.name as any}</>) : (<>-</>)}</dd>
					<dt>{i18n("admin.config.db_user")}</dt>
					<dd>{(props.dbCfg?.user) ? (<>{props.dbCfg?.user as any}</>) : (<>-</>)}</dd>
				</>) : null}
				{(props.dbCfg?.type === "postgres") ? (<>
					<dt>{i18n("admin.config.db_schema")}</dt>
					<dd>{(props.dbCfg?.schema) ? (<>{props.dbCfg?.schema as any}</>) : (<>-</>)}</dd>
					<dt>{i18n("admin.config.db_ssl_mode")}</dt>
					<dd>{(props.dbCfg?.sSLMode) ? (<>{props.dbCfg?.sSLMode as any}</>) : (<>-</>)}</dd>
				</>) : null}
				{(props.dbCfg?.type === "sqlite3") ? (<>
					<dt>{i18n("admin.config.db_path")}</dt>
					<dd>{(props.dbCfg?.path) ? (<>{props.dbCfg?.path as any}</>) : (<>-</>)}</dd>
				</>) : null}
			</dl>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.config.service_config")}
		</h4>
		<div className="ui attached table segment">
			<dl className="admin-dl-horizontal">
				<dt>{i18n("admin.config.register_email_confirm")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.RegisterEmailConfirm "octicon-check" "octicon-x")}} */}</dd>
				<dt>{i18n("admin.config.disable_register")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.DisableRegistration "octicon-check" "octicon-x")}} */}</dd>
				<dt>{i18n("admin.config.allow_only_internal_registration")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.AllowOnlyInternalRegistration "octicon-check" "octicon-x")}} */}</dd>
				<dt>{i18n("admin.config.allow_only_external_registration")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.AllowOnlyExternalRegistration "octicon-check" "octicon-x")}} */}</dd>
				<dt>{i18n("admin.config.show_registration_button")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.ShowRegistrationButton "octicon-check" "octicon-x")}} */}</dd>
				<dt>{i18n("admin.config.enable_openid_signup")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.EnableOpenIDSignUp "octicon-check" "octicon-x")}} */}</dd>
				<dt>{i18n("admin.config.enable_openid_signin")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.EnableOpenIDSignIn "octicon-check" "octicon-x")}} */}</dd>
				<dt>{i18n("admin.config.require_sign_in_view")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.RequireSignInViewStrict "octicon-check" "octicon-x")}} */}</dd>
				<dt>{i18n("admin.config.mail_notify")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.EnableNotifyMail "octicon-check" "octicon-x")}} */}</dd>
				<dt>{i18n("admin.config.enable_captcha")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.EnableCaptcha "octicon-check" "octicon-x")}} */}</dd>
				<dt>{i18n("admin.config.default_keep_email_private")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.DefaultKeepEmailPrivate "octicon-check" "octicon-x")}} */}</dd>
				<dt>{i18n("admin.config.default_allow_create_organization")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.DefaultAllowCreateOrganization "octicon-check" "octicon-x")}} */}</dd>
				<dt>{i18n("admin.config.enable_timetracking")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.EnableTimetracking "octicon-check" "octicon-x")}} */}</dd>
				{(props.service?.enableTimetracking) ? (<>
					<dt>{i18n("admin.config.default_enable_timetracking")}</dt>
					<dd>{/* TODO: {{svg (Iif .Service.DefaultEnableTimetracking "octicon-check" "octicon-x")}} */}</dd>
					<dt>{i18n("admin.config.default_allow_only_contributors_to_track_time")}</dt>
					<dd>{/* TODO: {{svg (Iif .Service.DefaultAllowOnlyContributorsToTrackTime "octicon-check" "octicon-x")}} */}</dd>
				</>) : null}
				<dt>{i18n("admin.config.default_visibility_organization")}</dt>
				<dd>{props.service?.defaultOrgVisibility as any}</dd>

				<dt>{i18n("admin.config.no_reply_address")}</dt>
				<dd>{(props.service?.noReplyAddress) ? (<>{props.service?.noReplyAddress as any}</>) : (<>-</>)}</dd>
				<dt>{i18n("admin.config.default_enable_dependencies")}</dt>
				<dd>{/* TODO: {{svg (Iif .Service.DefaultEnableDependencies "octicon-check" "octicon-x")}} */}</dd>
				<div className="divider"></div>
				<dt>{i18n("admin.config.active_code_lives")}</dt>
				<dd>{props.service?.activeCodeLives as any} {i18n("tool.raw_minutes")}</dd>
				<dt>{i18n("admin.config.reset_password_code_lives")}</dt>
				<dd>{props.service?.resetPwdCodeLives as any} {i18n("tool.raw_minutes")}</dd>
			</dl>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.config.webhook_config")}
		</h4>
		<div className="ui attached table segment">
			<dl className="admin-dl-horizontal">
				<dt>{i18n("admin.config.queue_length")}</dt>
				<dd>{props.webhook?.queueLength as any}</dd>
				<dt>{i18n("admin.config.deliver_timeout")}</dt>
				<dd>{props.webhook?.deliverTimeout as any} {i18n("tool.raw_seconds")}</dd>
				<dt>{i18n("admin.config.skip_tls_verify")}</dt>
				<dd>{/* TODO: {{svg (Iif .Webhook.SkipTLSVerify "octicon-check" "octicon-x")}} */}</dd>
			</dl>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.config.mailer_config")}
		</h4>
		<div className="ui attached table segment">
			<dl className="admin-dl-horizontal">
				<dt>{i18n("admin.config.mailer_enabled")}</dt>
				<dd>{/* TODO: {{svg (Iif .MailerEnabled "octicon-check" "octicon-x")}} */}</dd>
				{(props.mailerEnabled) ? (<>
					<dt>{i18n("admin.config.mailer_name")}</dt>
					<dd>{props.mailer?.name as any}</dd>
					{(props.mailer?.protocol === "sendmail") ? (<>
						<dt>{i18n("admin.config.mailer_use_sendmail")}</dt>
						<dd><span className="svg-icon" aria-label="octicon-check"></span></dd>
						<dt>{i18n("admin.config.mailer_sendmail_path")}</dt>
						<dd>{props.mailer?.sendmailPath as any}</dd>
						<dt>{i18n("admin.config.mailer_sendmail_args")}</dt>
						<dd>{props.mailer?.sendmailArgs as any}</dd>
						<dt>{i18n("admin.config.mailer_sendmail_timeout")}</dt>
						<dd>{props.mailer?.sendmailTimeout as any} {i18n("tool.raw_seconds")}</dd>
					</>) : null} {(props.mailer?.protocol === "dummy") ? (<>
						<dt>{i18n("admin.config.mailer_use_dummy")}</dt>
						<dd><span className="svg-icon" aria-label="octicon-check"></span></dd>
					</>) : (<>{/* SMTP family */}
						<dt>{i18n("admin.config.mailer_protocol")}</dt>
						<dd>{props.mailer?.protocol as any}</dd>
						<dt>{i18n("admin.config.mailer_enable_helo")}</dt>
						<dd>{/* TODO: {{svg (Iif .Mailer.EnableHelo "octicon-check" "octicon-x")}} */}</dd>
						<dt>{i18n("admin.config.mailer_smtp_addr")}</dt>
						<dd>{props.mailer?.sMTPAddr as any}</dd>
						<dt>{i18n("admin.config.mailer_smtp_port")}</dt>
						<dd>{props.mailer?.sMTPPort as any}</dd>
					</>)}
					<dt>{i18n("admin.config.mailer_user")}</dt>
					<dd>{(props.mailer?.user) ? (<>{props.mailer?.user as any}</>) : (<>(empty)</>)}</dd>
					<div className="divider"></div>
					<dt className="flex-text-block tw-py-1">{i18n("admin.config.send_test_mail")}</dt>
					<dd className="tw-py-0">
						<form className="ui form ignore-dirty" action={`/-/admin/config/test_mail`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
							<div className="ui tiny input">
								<input type="email" name="email" placeholder={String(i18n("admin.config.test_email_placeholder") ?? "")} size="29" required />
							</div>
							<button className="ui tiny primary button">{i18n("admin.config.send_test_mail_submit")}</button>
						</form>
					</dd>
				</>) : null}
			</dl>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.config.cache_config")}
		</h4>
		<div className="ui attached table segment">
			<dl className="admin-dl-horizontal">
				<dt>{i18n("admin.config.cache_adapter")}</dt>
				<dd>{props.cacheAdapter as any}</dd>
				{(props.cacheAdapter === "memory") ? (<>
					<dt>{i18n("admin.config.cache_interval")}</dt>
					<dd>{props.cacheInterval as any} {i18n("tool.raw_seconds")}</dd>
				</>) : null}
				{(props.cacheConn) ? (<>
					<dt>{i18n("admin.config.cache_item_ttl")}</dt>
					<dd>{props.cacheItemTTL as any}</dd>
				</>) : null}
				<div className="divider"></div>
				<dt className="flex-text-block tw-py-1">{i18n("admin.config.cache_test")}</dt>
				<dd className="tw-py-0">
					<form className="ui form ignore-dirty" action={`/-/admin/config/test_cache`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
						<button className="ui tiny primary button">{i18n("test")}</button>
					</form>
				</dd>
			</dl>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.config.session_config")}
		</h4>
		<div className="ui attached table segment">
			<dl className="admin-dl-horizontal">
				<dt>{i18n("admin.config.session_provider")}</dt>
				<dd>{props.sessionConfig?.provider as any}</dd>
				<dt>{i18n("admin.config.cookie_name")}</dt>
				<dd>{props.sessionConfig?.cookieName as any}</dd>
				<dt>{i18n("admin.config.gc_interval_time")}</dt>
				<dd>{props.sessionConfig?.gclifetime as any} {i18n("tool.raw_seconds")}</dd>
				<dt>{i18n("admin.config.session_life_time")}</dt>
				<dd>{props.sessionConfig?.maxlifetime as any} {i18n("tool.raw_seconds")}</dd>
				<dt>{i18n("admin.config.https_only")}</dt>
				<dd>{/* TODO: {{svg (Iif .SessionConfig.Secure "octicon-check" "octicon-x")}} */}</dd>
			</dl>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.config.git_config")}
		</h4>
		<div className="ui attached table segment">
			<dl className="admin-dl-horizontal">
				<dt>{i18n("admin.config.git_disable_diff_highlight")}</dt>
				<dd>{/* TODO: {{svg (Iif .Git.DisableDiffHighlight "octicon-check" "octicon-x")}} */}</dd>
				<dt>{i18n("admin.config.git_max_diff_lines")}</dt>
				<dd>{props.git?.maxGitDiffLines as any}</dd>
				<dt>{i18n("admin.config.git_max_diff_line_characters")}</dt>
				<dd>{props.git?.maxGitDiffLineCharacters as any}</dd>
				<dt>{i18n("admin.config.git_max_diff_files")}</dt>
				<dd>{props.git?.maxGitDiffFiles as any}</dd>
				<dt>{i18n("admin.config.git_gc_args")}</dt>
				<dd>{props.git?.gCArgs as any}</dd>

				<div className="divider"></div>

				<dt>{i18n("admin.config.git_migrate_timeout")}</dt>
				<dd>{props.git?.timeout?.migrate as any} {i18n("tool.raw_seconds")}</dd>
				<dt>{i18n("admin.config.git_mirror_timeout")}</dt>
				<dd>{props.git?.timeout?.mirror as any} {i18n("tool.raw_seconds")}</dd>
				<dt>{i18n("admin.config.git_gc_timeout")}</dt>
				<dd>{props.git?.timeout?.gC as any} {i18n("tool.raw_seconds")}</dd>
			</dl>
		</div>

		<h4 className="ui top attached header">
			{i18n("admin.config.log_config")}
		</h4>
		<div className="ui attached table segment">
			<dl className="admin-dl-horizontal">
				{(props.loggers?.xorm?.isEnabled) ? (<>
					<dt>{i18n("admin.config.xorm_log_sql")}</dt>
					<dd>{/* TODO: {{svg (Iif $.LogSQL "octicon-check" "octicon-x")}} */}</dd>
				</>) : null}

				{(props.loggers?.access?.isEnabled) ? (<>
					<dt>{i18n("admin.config.access_log_template")}</dt>
					<dd>{props.accessLogTemplate as any}</dd>
				</>) : null}

				{((props.loggers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<dt>{i18n("admin.config.logger_name_fmt")}</dt>
					{("$loggerDetail.IsEnabled") ? (<>
						<dd><pre className="tw-m-0">{/* TODO: {{$loggerDetail.EventWriters | JsonUtils.EncodeToString | JsonUtils.PrettyIndent}} */}</pre></dd>
					</>) : (<>
						<dd>{i18n("admin.config.disabled_logger")}</dd>
					</>)}
				</React.Fragment>))}
			</dl>
		</div>
	</div>
{/* template: admin/layout_footer */}

  </>)
}
