import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Gogs(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository new migrate">
	<div className="ui container medium-width">
		<h3 className="ui top attached header">
			{i18n("repo.migrate.migrate")}
		</h3>
		<div className="ui attached segment">
			{/* alert */}
			<form className="ui form left-right-form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>

				<input id="service_type" type="hidden" name="service" value={String(props.service ?? "")} />

				<div className={`inline required field ${(props.err_CloneAddr) ? `error` : ""}`}>
					<label htmlFor="clone_addr">{i18n("repo.migrate.clone_address")}</label>
					<input id="clone_addr" name="clone_addr" value={String(props.clone_addr ?? "")} autofocus required />
					<span className="help">
						{i18n("repo.migrate.clone_address_desc")}{(props.contextUser?.canImportLocal) ? (<> {i18n("repo.migrate.clone_local_path")}</>) : null}
					</span>
				</div>

				<div className={`inline field ${(props.err_Auth) ? `error` : ""}`}>
					<label htmlFor="auth_token">{i18n("access_token")}</label>
					<input id="auth_token" name="auth_token" type="password" autocomplete="new-password" value={String(props.auth_token ?? "")} {...(!(props.auth_token) ? {"data-need-clear": "true"} : {})} />
					<!-- <a target="_blank" href="https://docs.gitea.com/development/api-usage"><span className="svg-icon" aria-label="octicon-question"></span></a> -->
				</div>

				{/* template: repo/migrate/options */}

				<div className="inline field">
					<label>{i18n("repo.migrate_items")}</label>
					<div className="ui checkbox">
						<input name="wiki" type="checkbox" {...(props.wiki ? {"checked": true} : {})} />
						<label>{i18n("repo.migrate_items_wiki")}</label>
					</div>
				</div>

				<div id="migrate_items" className="inline field">
					<span className="help">{i18n("repo.migrate.migrate_items_options")}</span>
					<div className="inline field">
						<label></label>
						<div className="ui checkbox">
							<input name="labels" type="checkbox" {...(props.labels ? {"checked": true} : {})} />
							<label>{i18n("repo.migrate_items_labels")}</label>
						</div>
						<div className="ui checkbox">
							<input name="issues" type="checkbox" {...(props.issues ? {"checked": true} : {})} />
							<label>{i18n("repo.migrate_items_issues")}</label>
						</div>
					</div>
					<div className="inline field">
						<label></label>
						<div className="ui checkbox">
							<input name="milestones" type="checkbox" {...(props.milestones ? {"checked": true} : {})} />
							<label>{i18n("repo.migrate_items_milestones")}</label>
						</div>
					</div>
					<!-- Gogs do not support it
					<div className="inline field">
						<label></label>
						<div className="ui checkbox">
							<input name="pull_requests" type="checkbox" {...(props.pull_requests ? {"checked": true} : {})} />
							<label>{i18n("repo.migrate_items_merge_requests")}</label>
						</div>
						<div className="ui checkbox">
							<input name="releases" type="checkbox" {...(props.releases ? {"checked": true} : {})} />
							<label>{i18n("repo.migrate_items_releases")}</label>
						</div>
					</div>
					-->
				</div>

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
