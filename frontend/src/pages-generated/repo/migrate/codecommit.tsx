import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Codecommit(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository new migrate">
	<div className="ui container medium-width">
		<h3 className="ui top attached header">
			{i18n("repo.migrate.migrate")}
		</h3>
		<div className="ui attached segment">
			{/* alert */}
			<form className="ui form left-right-form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				{/* template: base/disable_form_autofill */}

				<input id="service_type" type="hidden" name="service" value={String(props.service ?? "")} />

				<div className={`inline required field ${(props.err_CloneAddr) ? `error` : ""}`}>
					<label htmlFor="clone_addr">{i18n("repo.migrate.clone_address")}</label>
					<input id="clone_addr" name="clone_addr" value={String(props.clone_addr ?? "")} autofocus required />
					<span className="help">
					{i18n("repo.migrate.clone_address_desc")}{(props.contextUser?.canImportLocal) ? (<> {i18n("repo.migrate.clone_local_path")}</>) : null}
					</span>
				</div>

				<div className={`inline required field ${(props.err_Auth) ? `error` : ""}`}>
					<label htmlFor="aws_access_key_id">{i18n("repo.migrate.codecommit.aws_access_key_id")}</label>
					<input id="aws_access_key_id" name="aws_access_key_id" value={String(props.aws_access_key_id ?? "")} required />
				</div>
				<div className={`inline required field ${(props.err_Auth) ? `error` : ""}`}>
					<label htmlFor="aws_secret_access_key">{i18n("repo.migrate.codecommit.aws_secret_access_key")}</label>
					<input id="aws_secret_access_key" name="aws_secret_access_key" type="password" value={String(props.aws_secret_access_key ?? "")} required />
				</div>
				<div className={`inline required field ${(props.err_Auth) ? `error` : ""}`}>
					<label htmlFor="auth_username">{i18n("repo.migrate.codecommit.https_git_credentials_username")}</label>
					<input id="auth_username" name="auth_username" value={String(props.auth_username ?? "")} required />
				</div>
				<div className={`inline required field ${(props.err_Auth) ? `error` : ""}`}>
					<label htmlFor="auth_password">{i18n("repo.migrate.codecommit.https_git_credentials_password")}</label>
					<input id="auth_password" name="auth_password" type="password" value={String(props.auth_password ?? "")} required />
				</div>

				{(!(props.disableNewPullMirrors)) ? (<>
				<div className="inline field">
					<label>{i18n("repo.migrate_options")}</label>
					<div className="ui checkbox">
						<input id="mirror" name="mirror" type="checkbox" {(props.mirror) ? (< /> checked</>) : null}>
						<label>{i18n("repo.migrate_options_mirror_helper")}</label>
					</div>
				</div>
				</>) : null}

				<div id="migrate_items">
					<div className="inline field">
						<label>{i18n("repo.migrate_items")}</label>
						<div className="ui checkbox">
							<input name="pull_requests" type="checkbox" {...(props.pull_requests ? {"checked": true} : {})} />
							<label>{i18n("repo.migrate_items_pullrequests")}</label>
						</div>
					</div>
				</div>

				<div className="divider"></div>

				<div className={`inline required field ${(props.err_Owner) ? `error` : ""}`}>
					<label>{i18n("repo.owner")}</label>
					<div className="ui selection owner dropdown ellipsis-text-items">
						<input type="hidden" id="uid" name="uid" value={String(props.contextUser?.iD ?? "")} required />
						<span className="text" title={String(props.contextUser?.name ?? "")}>
							{/* TODO: {{ctx.AvatarUtils.Avatar .ContextUser 28 "mini"}} */}
							{props.contextUser?.shortName 40 as any}
						</span>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu" title={String(props.signedUser?.name ?? "")}>
							<div className="item" data-value={String(props.signedUser?.iD ?? "")}>
								{/* TODO: {{ctx.AvatarUtils.Avatar .SignedUser 28 "mini"}} */}
								{props.signedUser?.shortName 40 as any}
							</div>
							{((props.orgs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<div className="item" data-value={String(props.iD ?? "")} title={String(props.name ?? "")}>
									{/* TODO: {{ctx.AvatarUtils.Avatar . 28 "mini"}} */}
									{item.shortName 40 as any}
								</div>
							</React.Fragment>))}
						</div>
					</div>
				</div>

				<div className={`inline required field ${(props.err_RepoName) ? `error` : ""}`}>
					<label htmlFor="repo_name">{i18n("repo.repo_name")}</label>
					<input id="repo_name" name="repo_name" value={String(props.repo_name ?? "")} required maxlength="100" />
				</div>
				<div className="inline field">
					<label>{i18n("repo.visibility")}</label>
					<div className="ui checkbox">
						{(props.isForcedPrivate) ? (<>
							<input name="private" type="checkbox" defaultChecked disabled />
							<label>{i18n("repo.visibility_helper_forced")}</label>
						</>) : (<>
							<input name="private" type="checkbox" {...(props.private ? {"checked": true} : {})} />
							<label>{i18n("repo.visibility_helper")}</label>
						</>)}
					</div>
				</div>
				<div className={`inline field ${(props.err_Description) ? `error` : ""}`}>
					<label htmlFor="description">{i18n("repo.repo_desc")}</label>
					<textarea id="description" name="description" maxlength="2048">{props.description as any}</textarea>
				</div>

				<div className="inline field">
					<label></label>
					<button className="ui primary button">
						{i18n("repo.migrate_repo")}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>


  </>)
}
