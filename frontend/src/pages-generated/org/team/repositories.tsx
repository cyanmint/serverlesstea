import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Repositories(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content organization teams">
	{/* template: org/header */}
	<div className="ui container">
		{/* alert */}
		<div className="ui stackable grid">
			{/* template: org/team/sidebar */}
			<div className="ui ten wide column">
				{/* template: org/team/navbar */}
				{/* $hasTopAttachedSegment */}
				{/* $canAddRemove */}
				{("$canAddRemove") ? (<>
					{/* TODO: {{$hasTopAttachedSegment = true}} */}
					<div className="ui top attached segment flex-text-block tw-flex-wrap">
						<form className="ui form ignore-dirty tw-flex-1 tw-flex" action={`${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName | PathEscape ?? "")}/action/repo/add`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
							<div data-global-init="initSearchRepoBox" data-uid={String(props.org?.iD ?? "")} className="ui search">
								<div className="ui input">
									<input className="prompt" name="repo_name" placeholder={String(i18n("search.repo_kind") ?? "")} autocomplete="off" required />
								</div>
							</div>
							<button className="ui primary button tw-ml-2">{i18n("add")}</button>
						</form>
						<div className="tw-inline-block">
							<button className="ui primary button link-action" data-modal-confirm={String(i18n("org.teams.add_all_repos_desc") ?? "")} data-url={`${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName | PathEscape ?? "")}/action/repo/addall`}>{i18n("add_all")}</button>
							<button className="ui red button link-action" data-modal-confirm={String(i18n("org.teams.remove_all_repos_desc") ?? "")} data-url={`${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName | PathEscape ?? "")}/action/repo/removeall`}>{i18n("remove_all")}</button>
						</div>
					</div>
				</>) : null}
				{(props.team?.includesAllRepositories) ? (<>
					{/* TODO: {{$hasTopAttachedSegment = true}} */}
					<div className="ui top attached segment">{i18n("org.teams.all_repositories")}</div>
				</>) : null}
				<div className={`ui ${(!("$hasTopAttachedSegment")) ? `top` : ""} attached segment`}>
					<div className="flex-divided-list items-with-main">
						{((props.teamRepos) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<div className="item tw-items-center">
								<div className="item-leading">
									{/* template: repo/icon */}
								</div>
								<div className="item-main">
									<a className="item-title tw-text-primary" href={`${String(props.org?.homeLink ?? "")}/${String(props.name | PathEscape ?? "")}`}>
										{props.org?.name as any}/{item.name as any}
									</a>
								</div>
								<div className="item-trailing">
									{("$canAddRemove") ? (<>
										<form method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`${String(props.orgLink ?? "")}/teams/${String(props.team?.lowerName | PathEscape ?? "")}/action/repo/remove`}>
											<button type="submit" className="ui red small button" name="repoid" value={String(props.iD ?? "")}>{i18n("remove")}</button>
										</form>
									</>) : null}
								</div>
							</div>
						{/* else */}
							<div className="item">
								<span className="tw-text-text-light tw-italic">{i18n("org.teams.repos.none")}</span>
							</div>
						</React.Fragment>))}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>



  </>)
}
