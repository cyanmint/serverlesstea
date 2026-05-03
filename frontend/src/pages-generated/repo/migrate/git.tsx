import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Git(props: Record<string, unknown>) {
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
				<div className={`inline field ${(props.err_Auth) ? `error` : ""}`}>
					<label htmlFor="auth_username">{i18n("username")}</label>
					<input id="auth_username" name="auth_username" value={String(props.auth_username ?? "")} {...(!(props.auth_username) ? {"data-need-clear": "true"} : {})} />
				</div>
				<div className={`inline field ${(props.err_Auth) ? `error` : ""}`}>
					<label htmlFor="auth_password">{i18n("password")}</label>
					<input id="auth_password" name="auth_password" type="password" value={String(props.auth_password ?? "")} />
				</div>

				{/* template: repo/migrate/options */}

				<div className="divider"></div>

				<div className={`inline required field ${(props.err_Owner) ? `error` : ""}`}>
					<label>{i18n("repo.owner")}</label>
					<div className="ui selection owner dropdown ellipsis-text-items">
						<input type="hidden" id="uid" name="uid" value={String(props.contextUser?.iD ?? "")} required />
						<span className="text" title={String(props.contextUser?.name ?? "")}>
							{/* TODO: {{ctx.AvatarUtils.Avatar .ContextUser}} */}
							{props.contextUser?.shortName?.(40) as any}
						</span>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu" title={String(props.signedUser?.name ?? "")}>
							<div className="item" data-value={String(props.signedUser?.iD ?? "")}>
								{/* TODO: {{ctx.AvatarUtils.Avatar .SignedUser}} */}
								{props.signedUser?.shortName?.(40) as any}
							</div>
							{((props.orgs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<div className="item" data-value={String(props.iD ?? "")} title={String(props.name ?? "")}>
									{/* TODO: {{ctx.AvatarUtils.Avatar .}} */}
									{item.shortName?.(40) as any}
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
