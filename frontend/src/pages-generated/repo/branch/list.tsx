import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content ui repository branches">
	{/* template: repo/header */}
	<div className="ui container">
		{/* alert */}
		{/* template: repo/sub_menu */}
		{(props.defaultBranchBranch) ? (<>
			<h4 className="ui top attached header">
				{i18n("repo.default_branch")}
				{((props.isWriter && props.repository?.canContentChange && !(props.isDeleted))) ? (<>
				<a role="button" className="right" href={`${String(props.repoLink ?? "")}/settings/branches`} data-tooltip-content={String(i18n("repo.settings.branches.switch_default_branch") ?? "")}>
					<span className="svg-icon" aria-label="octicon-arrow-switch"></span>
				</a>
				</>) : null}
			</h4>

			<div className="ui attached table segment">
				<table className="ui very basic fixed table single line">
					<tbody>
						<tr>
							<td>
								<div className="flex-text-block">
									<a className="gt-ellipsis branch-name" href={`${String(props.repoLink ?? "")}/src/branch/`}>{props.defaultBranchBranch?.dBBranch?.name as any}</a>
									{(props.defaultBranchBranch?.isProtected) ? (<>
										<span data-tooltip-content={String(i18n("repo.settings.protected_branch") ?? "")}><span className="svg-icon" aria-label="octicon-shield-lock"></span></span>
									</>) : null}
									<button className="btn interact-fg tw-px-1" data-clipboard-text={String(props.defaultBranchBranch?.dBBranch?.name ?? "")} data-tooltip-content={String(i18n("copy_branch") ?? "")}><span className="svg-icon" aria-label="octicon-copy"></span></button>
									{/* template: repo/commit_statuses */}
								</div>
								<p className="info tw-flex tw-items-center tw-my-1"><span className="svg-icon" aria-label="octicon-git-commit"></span><a href={`${String(props.repoLink ?? "")}/commit/`}>{/* TODO: {{ShortSha .DefaultBranchBranch.DBBranch.CommitID}} */}</a> · <span className="commit-message">{/* TODO: {{ctx.RenderUtils.RenderCommitMessage .DefaultBranchBranch.DBBranch.CommitMessage .Repository}} */}</span> · {i18n("org.repo_updated")} {/* TODO: {{DateUtils.TimeSince .DefaultBranchBranch.DBBranch.CommitTime}} */}{(props.defaultBranchBranch?.dBBranch?.pusher) ? (<> &nbsp;{/* template: shared/user/avatarlink */}{/* template: shared/user/namelink */}</>) : null}</p>
							</td>
							{/* FIXME: here and below, the tw-overflow-visible is not quite right but it is still needed the moment: to show the important buttons when the width is narrow */}
							<td className="tw-text-right tw-overflow-visible">
								{((props.isWriter && props.repository?.canContentChange && !(props.isDeleted))) ? (<>
									<button className="btn interact-bg show-create-branch-modal tw-p-2"
										data-modal="#create-branch-modal"
										data-branch-from={String(props.defaultBranchBranch?.dBBranch?.name ?? "")}
										data-branch-from-urlcomponent={String("" ?? "")}
										data-tooltip-content={String(i18n("repo.branch.new_branch_from") ?? "")}
									>
										<span className="svg-icon" aria-label="octicon-git-branch"></span>
									</button>
								</>) : null}
								{(props.enableFeed) ? (<>
									<a role="button" className="btn interact-bg tw-p-2" href={`${String(props.repoLink ?? "")}/rss/branch/`} data-tooltip-content={String(i18n("rss_feed") ?? "")}><span className="svg-icon" aria-label="octicon-rss"></span></a>
								</>) : null}
								{(!(props.disableDownloadSourceArchives)) ? (<>
									<div className="ui dropdown btn interact-bg tw-p-2" data-tooltip-content={String(i18n("repo.branch.download") ?? "")}>
										<span className="svg-icon" aria-label="octicon-download"></span>
										<div className="menu">
											<a className="item archive-link" href={`${String(props.repoLink ?? "")}/archive/.zip`} rel="nofollow"><span className="svg-icon" aria-label="octicon-file-zip"></span>&nbsp;ZIP</a>
											<a className="item archive-link" href={`${String(props.repoLink ?? "")}/archive/.tar.gz`} rel="nofollow"><span className="svg-icon" aria-label="octicon-file-zip"></span>&nbsp;TAR.GZ</a>
										</div>
									</div>
								</>) : null}
								{((props.isWriter && props.repository?.canContentChange && !(props.isDeleted))) ? (<>
									<button className="btn interact-bg tw-p-2 show-modal show-rename-branch-modal"
										data-is-default-branch="true"
										data-modal="#rename-branch-modal"
										data-old-branch-name={String(props.defaultBranchBranch?.dBBranch?.name ?? "")}
										data-tooltip-content={String(i18n("repo.branch.rename") ?? "")}
									>
										<span className="svg-icon" aria-label="octicon-pencil"></span>
									</button>
								</>) : null}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>) : null}

		<h4 className="ui top attached header">
			<div className="flex-text-block">
				{i18n("repo.branches")}
			</div>
		</h4>

		<div className="ui attached segment">
			<form className="ignore-dirty" method="get">
				{/* template: shared/search/combo */}
			</form>
		</div>

		<div className="ui attached table segment">
			<table className="ui very basic fixed table single line">
				<tbody>
					{((props.branches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td className="eight wide">
							{(item.dBBranch?.isDeleted) ? (<>
								<div className="flex-text-block">
									<span className="gt-ellipsis branch-name">{item.dBBranch?.name as any}</span>
									<button className="btn interact-fg tw-px-1" data-clipboard-text={String(props.dBBranch?.name ?? "")} data-tooltip-content={String(i18n("copy_branch") ?? "")}><span className="svg-icon" aria-label="octicon-copy"></span></button>
								</div>
								<p className="info">{i18n("repo.branch.deleted_by")} {/* TODO: {{DateUtils.TimeSince .DBBranch.DeletedUnix}} */}</p>
							</>) : (<>
								<div className="flex-text-block">
									<a className="gt-ellipsis branch-name" href={`${String(props.repoLink ?? "")}/src/branch/`}>{item.dBBranch?.name as any}</a>
									{(item.isProtected) ? (<>
										<span data-tooltip-content={String(i18n("repo.settings.protected_branch") ?? "")}><span className="svg-icon" aria-label="octicon-shield-lock"></span></span>
									</>) : null}
									<button className="btn interact-fg tw-px-1" data-clipboard-text={String(props.dBBranch?.name ?? "")} data-tooltip-content={String(i18n("copy_branch") ?? "")}><span className="svg-icon" aria-label="octicon-copy"></span></button>
									{/* template: repo/commit_statuses */}
								</div>
								<p className="info tw-flex tw-items-center tw-my-1"><span className="svg-icon" aria-label="octicon-git-commit"></span><a href={`${String(props.repoLink ?? "")}/commit/`}>{/* TODO: {{ShortSha .DBBranch.CommitID}} */}</a> · <span className="commit-message">{/* TODO: {{ctx.RenderUtils.RenderCommitMessage .DBBranch.CommitMessage $.Repository}} */}</span> · {i18n("org.repo_updated")} {/* TODO: {{DateUtils.TimeSince .DBBranch.CommitTime}} */}{(item.dBBranch?.pusher) ? (<> &nbsp;{/* template: shared/user/avatarlink */} &nbsp;{/* template: shared/user/namelink */}</>) : null}</p>
							</>)}
							</td>
							<td className="two wide ui">
							{((!(item.dBBranch?.isDeleted) && props.defaultBranchBranch)) ? (<>
								{/* $tooltipDivergence */}
								{((item.commitsBehind || item.commitsAhead)) ? (<>
									{/* TODO: {{$tooltipDivergence = ctx.Locale.Tr "repo.branch.commits_divergence_from" .CommitsBehind .CommitsAhead $.DefaultBranchBranch.DBBranch.Name}} */}
								</>) : (<>
									{/* TODO: {{$tooltipDivergence = ctx.Locale.Tr "repo.branch.commits_no_divergence" $.DefaultBranchBranch.DBBranch.Name}} */}
								</>)}
								<div className="commit-divergence" data-tooltip-content={String("" ?? "")}>
									<div className="bar-group">
										<div className="count count-behind">{item.commitsBehind as any}</div>
										{/* old code bears 0/0.0 = NaN output, so it might output invalid "width: NaNpx", it just works and doesn't cause any problem. */}
										<div className="bar bar-behind" style={`width: %`}></div>
									</div>
									<div className="bar-group">
										<div className="count count-ahead">{item.commitsAhead as any}</div>
										<div className="bar bar-ahead" style={`width: %`}></div>
									</div>
								</div>
							</>) : null}
							</td>
							<td className="two wide tw-text-right">
								{(!(item.latestPullRequest)) ? (<>
									{(item.isIncluded) ? (<>
										<span className="ui orange large label" data-tooltip-content={String(i18n("repo.branch.included_desc") ?? "")}>
											<span className="svg-icon" aria-label="octicon-git-pull-request"></span> {i18n("repo.branch.included")}
										</span>
								</>) : null} {((!(item.dBBranch?.isDeleted) && props.allowsPulls && item.commitsAhead > 0)) ? (<>
									<a href={`${String(props.pullRequestCtx?.makeDefaultCompareLink ?.dBBranch?.name ?? "")}?expand=1`}>
										<button id="new-pull-request" className="ui compact basic button tw-mr-0">{(props.canPull) ? (<>{i18n("repo.pulls.compare_changes")}</>) : (<>{i18n("action.compare_branch")}</>)}</button>
									</a>
									</>) : null}
								</>) : null} {((item.latestPullRequest?.hasMerged && item.mergeMovedOn)) ? (<>
									{((!(item.dBBranch?.isDeleted) && props.allowsPulls && item.commitsAhead > 0)) ? (<>
									<a href={`${String(props.pullRequestCtx?.makeDefaultCompareLink ?.dBBranch?.name ?? "")}?expand=1`}>
										<button id="new-pull-request" className="ui compact basic button tw-mr-0">{(props.canPull) ? (<>{i18n("repo.pulls.compare_changes")}</>) : (<>{i18n("action.compare_branch")}</>)}</button>
									</a>
									</>) : null}
								</>) : (<>
									<a href={String(props.latestPullRequest?.issue?.link ?? "")} className="tw-align-middle ref-issue">{(!(item.latestPullRequest?.isSameRepo)) ? (<>{item.latestPullRequest?.baseRepo?.fullName as any}</>) : null}#{item.latestPullRequest?.issue?.index as any}</a>
									{(item.latestPullRequest?.hasMerged) ? (<>
										<a href={String(props.latestPullRequest?.issue?.link ?? "")} className="ui purple large label"><span className="svg-icon" aria-label="octicon-git-merge"></span>{i18n("repo.pulls.merged")}</a>
									</>) : null} {(item.latestPullRequest?.issue?.isClosed) ? (<>
										<a href={String(props.latestPullRequest?.issue?.link ?? "")} className="ui red large label"><span className="svg-icon" aria-label="octicon-git-pull-request-closed"></span>{i18n("repo.issues.closed_title")}</a>
									</>) : (<>
										<a href={String(props.latestPullRequest?.issue?.link ?? "")} className="ui green large label"><span className="svg-icon" aria-label="octicon-git-pull-request"></span>{i18n("repo.issues.open_title")}</a>
									</>)}
								</>)}
							</td>
							{/* FIXME: here and above, the tw-overflow-visible is not quite right */}
							<td className="three wide tw-text-right tw-overflow-visible">
								{((props.isWriter && props.repository?.canContentChange && !(item.dBBranch?.isDeleted))) ? (<>
									<button className="btn interact-bg tw-p-2 show-modal show-create-branch-modal"
										data-branch-from={String(props.dBBranch?.name ?? "")}
										data-branch-from-urlcomponent={String("" ?? "")}
										data-tooltip-content={String(i18n("repo.branch.new_branch_from") ?? "")}
										data-modal="#create-branch-modal" data-name={String(props.dBBranch?.name ?? "")}
									>
										<span className="svg-icon" aria-label="octicon-git-branch"></span>
									</button>
								</>) : null}
								{(props.enableFeed) ? (<>
									<a role="button" className="btn interact-bg tw-p-2" href={`${String(props.repoLink ?? "")}/rss/branch/`} data-tooltip-content={String(i18n("rss_feed") ?? "")}><span className="svg-icon" aria-label="octicon-rss"></span></a>
								</>) : null}
								{((!(item.dBBranch?.isDeleted) && !(props.disableDownloadSourceArchives))) ? (<>
									<div className="ui dropdown btn interact-bg tw-p-2" data-tooltip-content={String(i18n("repo.branch.download") ?? "")}>
										<span className="svg-icon" aria-label="octicon-download"></span>
										<div className="menu">
											<a className="item archive-link" href={`${String(props.repoLink ?? "")}/archive/.zip`} rel="nofollow"><span className="svg-icon" aria-label="octicon-file-zip"></span>&nbsp;ZIP</a>
											<a className="item archive-link" href={`${String(props.repoLink ?? "")}/archive/.tar.gz`} rel="nofollow"><span className="svg-icon" aria-label="octicon-file-zip"></span>&nbsp;TAR.GZ</a>
										</div>
									</div>
								</>) : null}
								{((props.isWriter && props.repository?.canContentChange && !(item.dBBranch?.isDeleted))) ? (<>
									<button className="btn interact-bg tw-p-2 show-modal show-rename-branch-modal"
										data-is-default-branch="false"
										data-old-branch-name={String(props.dBBranch?.name ?? "")}
										data-modal="#rename-branch-modal"
										data-tooltip-content={String(i18n("repo.branch.rename") ?? "")}
									>
										<span className="svg-icon" aria-label="octicon-pencil"></span>
									</button>
								</>) : null}
								{((props.isWriter && props.repository?.canContentChange && !(item.isProtected))) ? (<>
									{(item.dBBranch?.isDeleted) ? (<>
										<button className="btn interact-bg tw-p-2 link-action restore-branch-button" data-url={`${String(props.link ?? "")}/restore?branch_id=${String(props.dBBranch?.iD ?? "")}&name=${String(props.dBBranch?.name ?? "")}&page=${String(props.page?.paginater?.current ?? "")}`} data-tooltip-content={String(i18n("repo.branch.restore") ?? "")}>
											<span className="tw-text-blue">
												<span className="svg-icon" aria-label="octicon-reply"></span>
											</span>
										</button>
									</>) : (<>
										<button className="btn interact-bg tw-p-2 delete-button delete-branch-button" data-url={`${String(props.link ?? "")}/delete?name=${String(props.dBBranch?.name ?? "")}&page=${String(props.page?.paginater?.current ?? "")}`} data-tooltip-content={String(i18n("repo.branch.delete") ?? "")} data-name={String(props.dBBranch?.name ?? "")}>
											<span className="svg-icon" aria-label="octicon-trash"></span>
										</button>
									</>)}
								</>) : null}
							</td>
						</tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>
		{/* template: base/paginate */}
	</div>
</div>

<div className="ui g-modal-confirm delete modal">
	<div className="header">
		<span className="svg-icon" aria-label="octicon-trash"></span>
		{i18n("repo.branch.delete_html")} <span className="name"></span>
	</div>
	<div className="content">
		<p>{i18n("repo.branch.delete_desc")}</p>
	</div>
	{/* template: base/modal_actions_confirm */}
</div>

<div className="ui mini modal" id="create-branch-modal">
	<div className="header">
		{i18n("repo.branch.new_branch")}
	</div>

	<form className="ui form" id="create-branch-form" data-action="" data-base-action={`${String(props.link ?? "")}/_new/branch/`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<div className="content">
			<div className="field">
				{i18n("repo.branch.create_new_branch")}
				<span id="modal-create-branch-from-span"></span>
			</div>
			<div className="required field">
				<label htmlFor="new_branch_name">{i18n("repo.branch.name")}</label>
				<input id="new_branch_name" name="new_branch_name" required />
			</div>
		</div>
		{/* template: base/modal_actions_confirm */}
	</form>
</div>

<div className="ui mini modal" id="rename-branch-modal">
	<div className="header">
		{i18n("repo.settings.rename_branch")}
	</div>
	<form className="ui form" action={`${String(props.repository?.link ?? "")}/branches/rename`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<div className="content">
			<div className="field default-branch-warning">
				<span className="tw-text-red">{i18n("repo.branch.warning_rename_default_branch")}</span>
			</div>
			<div className="field">
				<span className="text" data-rename-branch-to={String(i18n("repo.branch.rename_branch_to") ?? "")}></span>
			</div>
			<input name="from" type="hidden" required />
			<div className="required field">
				<input name="to" required />
			</div>
		</div>
		{/* template: base/modal_actions_confirm */}
	</form>
</div>


  </>)
}
