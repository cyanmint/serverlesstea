import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Fork(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository new fork">
	<div className="ui container medium-width">
		<h3 className="ui top attached header">
			{i18n("new_fork")}
		</h3>
		<div className="ui attached segment">
			{/* alert */}
			<form className="ui form form-fetch-action left-right-form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
				<div className={`inline required field ${(props.err_Owner) ? `error` : ""}`}>
					<label>{i18n("repo.owner")}</label>
					<div className="ui selection owner dropdown ellipsis-text-items">
						<input type="hidden" id="uid" name="uid" value={String(props.contextUser?.iD ?? "")} required />
						<span className="text" title={String(props.contextUser?.name ?? "")}>
							{/* TODO: {{ctx.AvatarUtils.Avatar .ContextUser 28 "mini"}} */}
							{props.contextUser?.shortName 40 as any}
						</span>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu">
							{(props.canForkToUser) ? (<>
								<div className="item" data-value={String(props.signedUser?.iD ?? "")} title={String(props.signedUser?.name ?? "")}>
									{/* TODO: {{ctx.AvatarUtils.Avatar .SignedUser 28 "mini"}} */}
									{props.signedUser?.shortName 40 as any}
								</div>
							</>) : null}
							{((props.orgs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<div className="item" data-value={String(props.iD ?? "")} title={String(props.name ?? "")}>
									{/* TODO: {{ctx.AvatarUtils.Avatar . 28 "mini"}} */}
									{item.shortName 40 as any}
								</div>
							</React.Fragment>))}
						</div>
					</div>
				</div>

				<div className="inline field">
					<label>{i18n("repo.fork_from")}</label>
					<a href={String(props.forkRepo?.link ?? "")} className="tw-inline-block">{props.forkRepo?.fullName as any}</a>
				</div>
				<div className={`inline required field ${(props.err_RepoName) ? `error` : ""}`}>
					<label htmlFor="repo_name">{i18n("repo.repo_name")}</label>
					<input id="repo_name" name="repo_name" value={String(props.repo_name ?? "")} required />
				</div>
				<div className="inline field">
					<label>{i18n("repo.visibility")}</label>
					<div className="ui disabled checkbox">
						<input type="checkbox" disabled {...(props.isPrivate ? {"checked": true} : {})} />
						<label>{i18n("repo.visibility_helper")}</label>
					</div>
					<span className="help">{i18n("repo.fork_visibility_helper")}</span>
				</div>
				<div className="inline field">
					<label>{i18n("repo.fork_branch")}</label>
					<div className="ui selection dropdown ellipsis-text-items">
						<input type="hidden" id="fork_single_branch" name="fork_single_branch" value="" required />
						<div className="text" title={String(i18n("repo.all_branches") ?? "")}>
							{i18n("repo.all_branches")}
						</div>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
						<div className="menu">
							<div className="item" data-value="" title={String(i18n("repo.all_branches") ?? "")}>
								{i18n("repo.all_branches")}
							</div>
							{((props.branches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<div className="item" data-value={String("" ?? "")} title={String("" ?? "")}>{item as any}</div>
							</React.Fragment>))}
						</div>
					</div>
				</div>
				<div className={`inline field ${(props.err_Description) ? `error` : ""}`}>
					<label htmlFor="description">{i18n("repo.repo_desc")}</label>
					<textarea id="description" name="description">{props.description as any}</textarea>
				</div>

				<div className="inline field">
					<label></label>
					<button className={`ui primary button${(!(props.canForkRepoInNewOwner)) ? ` disabled` : ""}`}>
						{i18n("repo.fork_repo")}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>


  </>)
}
