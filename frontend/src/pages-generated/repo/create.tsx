import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Create(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository new-repo">
	<div className="ui container medium-width">
		<h3 className="ui top attached header">
			{i18n("new_repo")}
		</h3>
		<div className="ui attached segment">
			{/* alert */}
			{/* template: repo/create_helper */}
			<form className="ui form left-right-form new-repo-form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div id="create-repo-error-message" className="ui negative message tw-text-center tw-hidden"></div>
				<div className={`inline required field ${(props.err_Owner) ? `error` : ""}`}>
					<label>{i18n("repo.owner")}</label>
					<div className="ui selection dropdown ellipsis-text-items" id="repo_owner_dropdown">
						<input type="hidden" name="uid" value={String(props.contextUser?.iD ?? "")} />
						<span className="text"></span>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu">
							<div className="item" data-value={String(props.signedUser?.iD ?? "")} title={String(props.signedUser?.name ?? "")}
								{(!(props.canCreateRepoInDoer)) ? (<>
									data-create-repo-disallowed-prompt={String("" ?? "")}
								</>) : null}
							>
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
					<span className="help">{i18n("repo.owner_helper")}</span>
				</div>

				<div className={`inline required field ${(props.err_RepoName) ? `error` : ""}`}>
					<label htmlFor="repo_name">{i18n("repo.repo_name")}</label>
					<input id="repo_name" name="repo_name" value={String(props.repo_name ?? "")} autofocus required maxlength="100" />
					<span className="help" data-help-for-repo-name>{i18n("repo.repo_name_helper")}</span>
					<span className="help tw-hidden" data-help-for-repo-name=".profile">{i18n("repo.repo_name_profile_public_hint")}</span>
					<span className="help tw-hidden" data-help-for-repo-name=".profile-private">{i18n("repo.repo_name_profile_private_hint")}</span>
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
					<span className="help">{i18n("repo.visibility_description")}</span>
				</div>
				<div className={`inline field ${(props.err_Description) ? `error` : ""}`}>
					<label htmlFor="description">{i18n("repo.repo_desc")}</label>
					<textarea id="description" rows="2" name="description" placeholder={String(i18n("repo.repo_desc_helper") ?? "")} maxlength="2048">{props.description as any}</textarea>
				</div>
				<div className="inline field">
					<label>{i18n("repo.template")}</label>
					<div id="repo_template_search" className="ui search selection dropdown">
						<input type="hidden" id="repo_template" name="repo_template" value={String("" ?? "")} />
						<div className="default text">{props.repo_template_name as any}</div>
						<div className="menu">
						</div>
					</div>
				</div>

				<div id="template_units" className="tw-hidden">
					<div className="inline field">
						<label>{i18n("repo.template.items")}</label>
						<div className="ui checkbox">
							<input name="git_content" type="checkbox" {...(props.git_content ? {"checked": true} : {})} />
							<label>{i18n("repo.template.git_content")}</label>
						</div>
						<div className="ui checkbox" {(!(props.signedUser?.canEditGitHook)) ? (<>data-tooltip-content={String(i18n("repo.template.git_hooks_tooltip") ?? "")}</>) : null}>
							<input name="git_hooks" type="checkbox" {...(props.git_hooks ? {"checked": true} : {})} />
							<label>{i18n("repo.template.git_hooks")}</label>
						</div>
					</div>
					<div className="inline field">
						<label></label>
						<div className="ui checkbox">
							<input name="webhooks" type="checkbox" {...(props.webhooks ? {"checked": true} : {})} />
							<label>{i18n("repo.template.webhooks")}</label>
						</div>
						<div className="ui checkbox">
							<input name="topics" type="checkbox" {...(props.topics ? {"checked": true} : {})} />
							<label>{i18n("repo.template.topics")}</label>
						</div>
					</div>
					<div className="inline field">
						<label></label>
						<div className="ui checkbox">
							<input name="avatar" type="checkbox" {...(props.avatar ? {"checked": true} : {})} />
							<label>{i18n("repo.template.avatar")}</label>
						</div>
						<div className="ui checkbox">
							<input name="labels" type="checkbox" {...(props.labels ? {"checked": true} : {})} />
							<label>{i18n("repo.template.issue_labels")}</label>
						</div>
					</div>
					<div className="inline field">
						<label></label>
						<div className="ui checkbox">
							<input name="protected_branch" type="checkbox" {...(props.protected_branch ? {"checked": true} : {})} />
							<label>{i18n("repo.settings.protected_branch")}</label>
						</div>
					</div>
				</div>

				<div id="non_template">
					<div className="inline field">
						<label>{i18n("repo.issue_labels")}</label>
						<div className="ui search selection dropdown">
							<input type="hidden" name="issue_labels" value={String(props.issueLabels ?? "")} />
							<div className="default text">{i18n("repo.issue_labels_helper")}</div>
							<div className="menu">
								<div className="item" data-value="">{i18n("repo.issue_labels_helper")}</div>
								{((props.labelTemplateFiles) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									<div className="item" data-value={String(props.displayName ?? "")}>{item.displayName as any}<br /><i>({item.description as any})</i></div>
								</React.Fragment>))}
							</div>
						</div>
					</div>

					<div className="divider"></div>

					<div className="inline field">
						<label>.gitignore</label>
						<div className="ui multiple search selection dropdown">
							<input type="hidden" name="gitignores" value={String(props.gitignores ?? "")} />
							<div className="default text">{i18n("repo.repo_gitignore_helper")}</div>
							<div className="menu">
								{((props.gitignores) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									<div className="item" data-value={String("" ?? "")}>{item as any}</div>
								</React.Fragment>))}
							</div>
						</div>
						<span className="help">{i18n("repo.repo_gitignore_helper_desc")}</span>
					</div>
					<div className="inline field">
						<label>{i18n("repo.license")}</label>
						<div className="ui search selection dropdown">
							<input type="hidden" name="license" value={String(props.license ?? "")} />
							<div className="default text">{i18n("repo.license_helper")}</div>
							<div className="menu">
								<div className="item" data-value="">{i18n("repo.license_helper")}</div>
								{((props.licenses) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									<div className="item" data-value={String("" ?? "")}>{item as any}</div>
								</React.Fragment>))}
							</div>
						</div>
						<span className="help">{i18n("repo.license_helper_desc")}</span>
					</div>

					<div className="inline field">
						<label>{i18n("repo.readme")}</label>
						<div className="ui selection dropdown">
							<input type="hidden" name="readme" value={String(props.readme ?? "")} />
							<div className="default text">{i18n("repo.readme_helper")}</div>
							<div className="menu">
								{((props.readmes) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									<div className="item" data-value={String("" ?? "")}>{item as any}</div>
								</React.Fragment>))}
							</div>
						</div>
						<span className="help">{i18n("repo.readme_helper_desc")}</span>
					</div>
					<div className="inline field">
						<label></label>
						<div className="ui checkbox" id="auto-init">
							<input name="auto_init" type="checkbox" {...(props.auto_init ? {"checked": true} : {})} />
							<label>{i18n("repo.auto_init")}</label>
						</div>
					</div>
					<div className="inline field">
						<label htmlFor="default_branch">{i18n("repo.default_branch")}</label>
						<input id="default_branch" name="default_branch" value={String(props.default_branch ?? "")} placeholder={String(props.default_branch ?? "")} />
						<span className="help">{i18n("repo.default_branch_helper")}</span>
					</div>
					<div className="inline field">
						<label>{i18n("repo.object_format")}</label>
						<div className="ui selection owner dropdown">
							<input type="hidden" id="object_format_name" name="object_format_name" value={String("" ?? "")} required />
							<div className="default text">{props.defaultObjectFormat?.name as any}</div>
							<div className="menu">
								{((props.supportedObjectFormats) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									<div className="item" data-value={String(props.name ?? "")}>{item.name as any}</div>
								</React.Fragment>))}
							</div>
						</div>
						<span className="help">{i18n("repo.object_format_helper")}</span>
					</div>
					<div className="inline field">
						<label>{i18n("repo.template")}</label>
						<div className="ui checkbox">
							<input name="template" type="checkbox" />
							<label>{i18n("repo.template_helper")}</label>
						</div>
					</div>
				</div>
				<br />
				<div className="inline field">
					<label></label>
					<button className="ui primary button">
						{i18n("repo.create_repo")}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>


  </>)
}
