import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ViewTitle(props: Record<string, unknown>) {
  return (<>
{(props.flash) ? (<>
	<div className="sixteen wide column tw-mb-2">
		{/* alert */}
	</div>
</>) : null}
<div className="tw-hidden" id="issue-page-info"
	data-issue-index={String(props.issue?.index ?? "")}
	data-issue-dependency-search-type={String(props.issueDependencySearchType ?? "")}
	data-issue-repo-link={String(props.repoLink ?? "")}
	data-issue-repo-id={String(props.repository?.iD ?? "")}
></div>
<div className="issue-title-header">
	{/* $canEditIssueTitle */}
	<div className="issue-title" id="issue-title-display">
		<h1>
			{/* TODO: {{ctx.RenderUtils.RenderIssueTitle .Issue.Title $.Repository}} */}
			<span className="index">#{props.issue?.index as any}</span>
		</h1>
		<div className="issue-title-buttons">
			{(canEditIssueTitle) ? (<>
			<button id="issue-title-edit-show" className="ui small basic button">{i18n("repo.issues.edit")}</button>
			</>) : null}
			{(!(props.issue?.isPull)) ? (<>
			<a role="button" className="ui small primary button" href={`${String(props.repoLink ?? "")}/issues/new${(props.newIssueChooseTemplate) ? `/choose` : ""}`}>{i18n("repo.issues.new")}</a>
			</>) : null}
		</div>
	</div>
	{(canEditIssueTitle) ? (<>
	<form className="ui form issue-title tw-hidden" id="issue-title-editor">
		<div className="ui input tw-flex-1">
			<input name="title" value={String(props.issue?.title ?? "")} data-old-title={String(props.issue?.title ?? "")} maxlength="255" autocomplete="off" />
		</div>
		<div className="issue-title-buttons">
			<button type="button" className="ui small basic cancel button">{i18n("repo.issues.cancel")}</button>
			<button type="submit" className="ui small primary button" data-update-url={`${String(props.repoLink ?? "")}/issues/${String(props.issue?.index ?? "")}/title`}>
				{i18n("repo.issues.save")}
			</button>
		</div>
	</form>
	</>) : null}
	<div className="issue-title-meta">
		{(props.hasMerged) ? (<>
			<div className="ui purple label issue-state-label"><span className="svg-icon" aria-label="octicon-git-merge"></span> {(props.issue?.pullRequest?.status === 3) ? (<>{i18n("repo.pulls.manually_merged")}</>) : (<>{i18n("repo.pulls.merged")}</>)}</div>
		</>) : null} {(props.issue?.isClosed) ? (<>
			<div className="ui red label issue-state-label">{/* TODO: {{svg (Iif .Issue.IsPull "octicon-git-pull-request-closed" "octicon-issue-closed")}} */} {i18n("repo.issues.closed_title")}</div>
		</>) : null} {(props.issue?.isPull) ? (<>
			{(props.isPullWorkInProgress) ? (<>
				<div className="ui grey label issue-state-label"><span className="svg-icon" aria-label="octicon-git-pull-request-draft"></span> {i18n("repo.issues.draft_title")}</div>
			</>) : (<>
				<div className="ui green label issue-state-label"><span className="svg-icon" aria-label="octicon-git-pull-request"></span> {i18n("repo.issues.open_title")}</div>
			</>)}
		</>) : (<>
			<div className="ui green label issue-state-label"><span className="svg-icon" aria-label="octicon-issue-opened"></span> {i18n("repo.issues.open_title")}</div>
		</>)}
		<div className="tw-ml-2 tw-flex-1 tw-break-anywhere">
			{(props.issue?.isPull) ? (<>
				{/* $headHref */}
				{(props.headBranchLink) ? (<>
					{/* TODO: {{$headHref = HTMLFormat '<a href="%s">%s</a> <button className="btn interact-fg" data-tooltip-content="%s" data-clipboard-text="%s">%s</button>' .HeadBranchLink $headHref (ctx.Locale.Tr "copy_branch") .HeadTarget (svg "octicon-copy" 14)}} */}
				</>) : (<>
					{(props.issue?.pullRequest?.isAgitFlow) ? (<>
						{/* TODO: {{$headHref = HTMLFormat '%s <a href="%s" target="_blank"><span className="ui label basic tiny" data-tooltip-content="%s">AGit</span></a>' $headHref "https://docs.gitea.com/usage/agit" (ctx.Locale.Tr "repo.pull.agit_documentation")}} */}
					</>) : (<>
						{/* TODO: {{$headHref = HTMLFormat '<span className="tw-line-through" data-tooltip-content="%s">%s</span>' (ctx.Locale.Tr "form.target_branch_not_exist") $headHref}} */}
					</>)}
				</>)}
				{/* $baseHref */}
				{(props.baseBranchLink) ? (<>
					{(props.baseBranchNotExist) ? (<>
						{/* TODO: {{$baseHref = HTMLFormat '<span className="tw-line-through" data-tooltip-content="%s">%s</span>' (ctx.Locale.Tr "form.target_branch_not_exist") $baseHref}} */}
					</>) : (<>
						{/* TODO: {{$baseHref = HTMLFormat '<a href="%s">%s</a>' .BaseBranchLink $baseHref}} */}
					</>)}
				</>) : null}
				{(props.issue?.pullRequest?.hasMerged) ? (<>
					{/* $mergedStr */}
					{(props.issue?.originalAuthor) ? (<>
						{props.issue?.originalAuthor as any}
						<span className="pull-desc">{i18n("repo.pulls.merged_title_desc")}</span>
					</>) : (<>
						<a {...(props.issue?.pullRequest?.merger?.iD > 0 ? {"href": String(props.issue?.pullRequest?.merger?.homeLink ?? "")} : {})}>{props.issue?.pullRequest?.merger?.getDisplayName as any}</a>
						<span className="pull-desc">{i18n("repo.pulls.merged_title_desc")}</span>
					</>)}
				</>) : (<>
					{(props.issue?.originalAuthor) ? (<>
						<span id="pull-desc-display" className="pull-desc">{props.issue?.originalAuthor as any} {i18n("repo.pulls.title_desc")}</span>
					</>) : (<>
						<span id="pull-desc-display" className="pull-desc">
							<a {...(props.issue?.poster?.iD > 0 ? {"href": String(props.issue?.poster?.homeLink ?? "")} : {})}>{props.issue?.poster?.getDisplayName as any}</a>
							{i18n("repo.pulls.title_desc")}
						</span>
					</>)}
					<span id="pull-desc-editor" className="tw-hidden flex-text-block" data-target-update-url={`${String(props.repoLink ?? "")}/pull/${String(props.issue?.index ?? "")}/target_branch`}>
						<div className="ui floating filter dropdown">
							<div className="ui basic small button tw-mr-0">
								<span className="text">{i18n("repo.pulls.compare_compare")}: {props.headTarget as any}</span>
							</div>
						</div>
						<span className="svg-icon" aria-label="octicon-arrow-right"></span>
						<div className="ui floating filter dropdown" data-no-results={String(i18n("no_results_found") ?? "")}>
							<div className="ui basic small button">
								<span className="text" id="pull-target-branch" data-basename={String(props.baseName ?? "")} data-branch={String(props.baseBranch ?? "")}>{i18n("repo.pulls.compare_base")}: {props.baseName as any}:{props.baseBranch as any}</span>
								<span className="svg-icon" aria-label="octicon-triangle-down"></span>
							</div>
							<div className="menu">
								<div className="ui icon search input">
									<i className="icon"><span className="svg-icon" aria-label="octicon-filter"></span></i>
									<input name="search" placeholder={`${i18n("repo.pulls.filter_branch")}...`} />
								</div>
								<div className="scrolling menu" id="branch-select">
									{((props.branches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
										{/* $sameBase */}
										{/* $differentBranch */}
										{((sameBase || differentBranch)) ? (<>
											<div className={`item ${(props.baseBranch === ".") ? `selected` : ""}`} data-branch={String("" ?? "")}>{props.baseName as any}:{item as any}</div>
										</>) : null}
									</React.Fragment>))}
								</div>
							</div>
						</div>
					</span>
				</>)}
			</>) : (<>
				{/* $createdStr */}
				<span className="time-desc">
					{(props.issue?.originalAuthor) ? (<>
						{i18n("repo.issues.opened_by_fake")}
					</>) : null} {(props.issue?.poster?.iD > 0) ? (<>
						{i18n("repo.issues.opened_by")}
					</>) : (<>
						{i18n("repo.issues.opened_by_fake")}
					</>)}
					·
					{/* TODO: {{ctx.Locale.TrN .Issue.NumComments "repo.issues.num_comments_1" "repo.issues.num_comments" .Issue.NumComments}} */}
				</span>
			</>)}
		</div>
	</div>
</div>

  </>)
}
