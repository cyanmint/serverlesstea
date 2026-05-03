import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Compare(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className={`page-content repository diff ${(props.pageIsComparePull) ? `compare pull` : ""}`}>
	{/* template: repo/header */}

	{/* $compareSeparator */}
	{/* $compareSeparatorSwitch */}
	<div className="ui container fluid padded">
		<h2 className="ui header">
			{((props.pageIsComparePull && props.isSigned && !(props.repository?.isArchived))) ? (<>
				{i18n("repo.compare.title")}
				<div className="sub header">{i18n("repo.compare.description")}</div>
			</>) : (<>
				{i18n("action.compare_commits_general")}
			</>)}
		</h2>
		{/* alert */}
		{/* $BaseCompareName */}
		{/* $HeadCompareName */}
		{/* $OwnForkCompareName */}
		{(props.ownForkRepo?.("-")) ? (<>
			{/* TODO: {{$OwnForkCompareName = $.OwnForkRepo.FullName -}} */}
		{/* TODO: {{end -}} */}
		{/* $RootRepoCompareName */}
		{(props.rootRepo?.("-")) ? (<>
			{/* TODO: {{$RootRepoCompareName = $.RootRepo.FullName -}} */}
		{/* TODO: {{end -}} */}

		<div className="ui segment choose branch">
			<a className="tw-mr-2" href={`${String(props.headRepo?.link ?? "")}/compare/${(!(props.pullRequestCtx?.sameRepo)) ? `/:` : ""}`} title={String(i18n("repo.pulls.switch_head_and_base") ?? "")}><span className="svg-icon" aria-label="octicon-git-compare"></span></a>
			<div className="ui dropdown jump select-branch">
				<div className="ui basic small button">
					<span className="text">{(props.pageIsComparePull) ? (<>{i18n("repo.pulls.compare_base")}</>) : (<>{i18n("repo.compare.compare_base")}</>)}: <strong>{/* $BaseCompareName */}:{props.baseBranch as any}</strong></span>
					<span className="svg-icon" aria-label="octicon-triangle-down"></span>
				</div>
				<div className="menu">
					<div className="ui icon search input">
						<i className="icon"><span className="svg-icon" aria-label="octicon-filter"></span></i>
						<input name="search" placeholder={`${i18n("repo.filter_branch_and_tag")}...`} />
					</div>
					<div className="header">
						<div className="ui grid">
							<div className="two column row">
								<a className="reference column" href="#" data-target=".base-branch-list">
									<span className="tw-text-text">
										<span className="svg-icon" aria-label="octicon-git-branch"></span> {i18n("repo.branches")}
									</span>
								</a>
								<a className="reference column" href="#" data-target=".base-tag-list">
									<span className="tw-text-text">
										<span className="svg-icon" aria-label="octicon-tag"></span> {i18n("repo.tags")}
									</span>
								</a>
							</div>
						</div>
					</div>
					<div className="scrolling menu reference-list-menu base-branch-list">
						{((props.branches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<a className={`item ${(props.baseBranch === ".") ? `selected` : ""}`} href={`${String(props.repoLink ?? "")}/compare/${(!(props.pullRequestCtx?.sameRepo)) ? `/:` : ""}`}>{/* $BaseCompareName */}:{item as any}</a>
						</React.Fragment>))}
						{(!(props.pullRequestCtx?.sameRepo)) ? (<>
							{((props.headBranches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className="item" href={`${String(props.headRepo?.link ?? "")}/compare//:`}>{/* $HeadCompareName */}:{item as any}</a>
							</React.Fragment>))}
						</>) : null}
						{(props.ownForkRepo) ? (<>
							{((props.ownForkRepoBranches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className="item" href={`${String(props.ownForkRepo?.link ?? "")}/compare//:`}>{/* $OwnForkCompareName */}:{item as any}</a>
							</React.Fragment>))}
						</>) : null}
						{((props.rootRepo && props.rootRepo?.allowsPulls?.(ctx))) ? (<>
							{((props.rootRepoBranches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className="item" href={`${String(props.rootRepo?.link ?? "")}/compare//:`}>{/* $RootRepoCompareName */}:{item as any}</a>
							</React.Fragment>))}
						</>) : null}
					</div>
					<div className="scrolling menu reference-list-menu base-tag-list tw-hidden">
						{((props.tags) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<a className={`item ${(props.baseBranch === ".") ? `selected` : ""}`} href={`${String(props.repoLink ?? "")}/compare/${(!(props.pullRequestCtx?.sameRepo)) ? `/:` : ""}`}>{/* $BaseCompareName */}:{item as any}</a>
						</React.Fragment>))}
						{(!(props.pullRequestCtx?.sameRepo)) ? (<>
							{((props.headTags) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className="item" href={`${String(props.headRepo?.link ?? "")}/compare//:`}>{/* $HeadCompareName */}:{item as any}</a>
							</React.Fragment>))}
						</>) : null}
						{(props.ownForkRepo) ? (<>
							{((props.ownForkRepoTags) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className="item" href={`${String(props.ownForkRepo?.link ?? "")}/compare//:`}>{/* $OwnForkCompareName */}:{item as any}</a>
							</React.Fragment>))}
						</>) : null}
						{(props.rootRepo) ? (<>
							{((props.rootRepoTags) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className="item" href={`${String(props.rootRepo?.link ?? "")}/compare//:`}>{/* $RootRepoCompareName */}:{item as any}</a>
							</React.Fragment>))}
						</>) : null}
					</div>
				</div>
			</div>

			<a href={`${String(props.repoLink ?? "")}/compare/${(!(props.pullRequestCtx?.sameRepo)) ? `/:` : ""}`} title={String(i18n("repo.pulls.switch_comparison_type") ?? "")}><span className="svg-icon" aria-label="octicon-arrow-left"></span><div className="compare-separator">{/* $compareSeparator */}</div></a>

			<div className="ui dropdown jump select-branch">
				<div className="ui basic small button">
					<span className="text">{(props.pageIsComparePull) ? (<>{i18n("repo.pulls.compare_compare")}</>) : (<>{i18n("repo.compare.compare_head")}</>)}: <strong>{/* $HeadCompareName */}:{props.headBranch as any}</strong></span>
					<span className="svg-icon" aria-label="octicon-triangle-down"></span>
				</div>
				<div className="menu">
					<div className="ui icon search input">
						<i className="icon"><span className="svg-icon" aria-label="octicon-filter"></span></i>
						<input name="search" placeholder={`${i18n("repo.filter_branch_and_tag")}...`} />
					</div>
					<div className="header">
						<div className="ui grid">
							<div className="two column row">
								<a className="reference column" href="#" data-target=".head-branch-list">
									<span className="tw-text-text">
										<span className="svg-icon" aria-label="octicon-git-branch"></span> {i18n("repo.branches")}
									</span>
								</a>
								<a className="reference column" href="#" data-target=".head-tag-list">
									<span className="tw-text-text">
										<span className="svg-icon" aria-label="octicon-tag"></span> {i18n("repo.tags")}
									</span>
								</a>
							</div>
						</div>
					</div>
					<div className="scrolling menu reference-list-menu head-branch-list">
						{((props.headBranches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<a className={`${(props.headBranch === ".") ? `selected` : ""} item`} href={`${String(props.repoLink ?? "")}/compare/${(!(props.pullRequestCtx?.sameRepo)) ? `/:` : ""}`}>{/* $HeadCompareName */}:{item as any}</a>
						</React.Fragment>))}
						{(!(props.pullRequestCtx?.sameRepo)) ? (<>
							{((props.branches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className="item" href={`${String(props.repoLink ?? "")}/compare//:`}>{/* $BaseCompareName */}:{item as any}</a>
							</React.Fragment>))}
						</>) : null}
						{(props.ownForkRepo) ? (<>
							{((props.ownForkRepoBranches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className="item" href={`${String(props.repoLink ?? "")}/compare//:`}>{/* $OwnForkCompareName */}:{item as any}</a>
							</React.Fragment>))}
						</>) : null}
						{(props.rootRepo) ? (<>
							{((props.rootRepoBranches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className="item" href={`${String(props.repoLink ?? "")}/compare//:`}>{/* $RootRepoCompareName */}:{item as any}</a>
							</React.Fragment>))}
						</>) : null}
					</div>
					<div className="scrolling menu reference-list-menu head-tag-list tw-hidden">
						{((props.headTags) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<a className={`${(props.headBranch === ".") ? `selected` : ""} item`} href={`${String(props.repoLink ?? "")}/compare/${(!(props.pullRequestCtx?.sameRepo)) ? `/:` : ""}`}>{/* $HeadCompareName */}:{item as any}</a>
						</React.Fragment>))}
						{(!(props.pullRequestCtx?.sameRepo)) ? (<>
							{((props.tags) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className="item" href={`${String(props.repoLink ?? "")}/compare//:`}>{/* $BaseCompareName */}:{item as any}</a>
							</React.Fragment>))}
						</>) : null}
						{(props.ownForkRepo) ? (<>
							{((props.ownForkRepoTags) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className="item" href={`${String(props.repoLink ?? "")}/compare//:`}>{/* $OwnForkCompareName */}:{item as any}</a>
							</React.Fragment>))}
						</>) : null}
						{(props.rootRepo) ? (<>
							{((props.rootRepoTags) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className="item" href={`${String(props.repoLink ?? "")}/compare//:`}>{/* $RootRepoCompareName */}:{item as any}</a>
							</React.Fragment>))}
						</>) : null}
					</div>
				</div>
			</div>
		</div>

		{/* $showDiffBox */}
		{((props.isSigned && props.pageIsComparePull)) ? (<>
			{/* $allowCreatePR */}
			{(props.isNothingToCompare) ? (<>
				<div className="ui segment">
					{(allowCreatePR) ? (<>
						{i18n("repo.pulls.nothing_to_compare_and_allow_empty_pr")}
					</>) : null} {((props.compareInfo?.baseRef?.isBranch && props.compareInfo?.headRef?.isBranch)) ? (<>
						{i18n("repo.pulls.nothing_to_compare")}
					</>) : (<>
						{i18n("repo.pulls.nothing_to_compare_have_tag")}
					</>)}
				</div>
			</>) : null}
			{(props.hasPullRequest) ? (<>
				<div className="ui segment flex-text-block tw-gap-4">
					{/* template: shared/issueicon */}
					<div className="issue-title tw-break-anywhere">
						{/* TODO: {{ctx.RenderUtils.RenderIssueTitle .PullRequest.Issue.Title $.Repository}} */}
						<span className="index">#{props.pullRequest?.issue?.index as any}</span>
					</div>
					<a href={`${String(props.repoLink ?? "")}/pulls/${String(props.pullRequest?.issue?.index ?? "")}`} className="ui compact button primary">
						{i18n("repo.pulls.view")}
					</a>
				</div>
			</>) : null} {(props.repository?.isArchived) ? (<>
				<div className="ui warning message">
					{(props.repository?.archivedUnix?.isZero) ? (<>
						{i18n("repo.archive.title")}
					</>) : (<>
						{i18n("repo.archive.title_date")}
					</>)}
				</div>
			</>) : null} {(allowCreatePR) ? (<>
				<div className={`ui info message flex-text-block pullrequest-form-toggle ${(props.expandNewPrForm) ? `tw-hidden` : ""}`}>
					<span className="tw-flex-1">{i18n("repo.pulls.new.description")}</span>
					<a className="ui button primary show-panel toggle" data-panel=".pullrequest-form-toggle, .pullrequest-form">{i18n("repo.pulls.new")}</a>
				</div>
				<div className={`pullrequest-form ${(!(props.expandNewPrForm)) ? `tw-hidden` : ""}`}>
					{/* template: repo/issue/new_form */}
				</div>
			</>) : null}
		</>) : (<>{/* not singed-in or not for pull-request */}
			{(!(props.commitCount)) ? (<>
				<div className="ui segment">{i18n("repo.commits.nothing_to_compare")}</div>
			</>) : null}
		</>)}
	</div>

	{(showDiffBox) ? (<>
		<div className="ui container fluid padded tw-my-4">
			{/* template: repo/commits_table */}
			{/* template: repo/diff/box */}
		</div>
	</>) : null}
</div>


  </>)
}
