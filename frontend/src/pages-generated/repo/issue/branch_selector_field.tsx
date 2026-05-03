// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function BranchSelectorField(props: Record<string, unknown>) {
  return (<>
{/* TODO: RemoveIssueRef: the Issue.Ref will be removed in 1.24 or 1.25 if no end user really needs it or there could be better alternative then.
PR: https://github.com/go-gitea/gitea/pull/32744

The Issue.Ref was added by Add possibility to record branch or tag information in an issue (#780)
After 8 years, this "branch selector" does nothing more than saving the branch/tag name into database and displays it,
or sometimes auto-close a ref-matched issue by a commit message when CloseIssuesViaCommitInAnyBranch=false.

There are still users using it:
* @didim99: it is a really useful feature to specify a branch in which issue found.

Still needs to figure out:
* Could the "recording branch/tag name" be replaced by other approaches?
	* Write the branch name in the issue title/body then it will still be displayed, eg: '[bug] (fix/ui-broken-bug) there is a bug ....'
* Is "GitHub-like development sidebar ('#31899')" good enough (or better) for your usage? */}
{((!(props.issue?.isPull) && !(props.pageIsComparePull))) ? (<>
<input id="ref_selector" name="ref" type="hidden" value={String(props.reference ?? "")} />
<div className={`ui dropdown select-branch branch-selector-dropdown ellipsis-text-items ${(!(props.hasIssuesOrPullsWritePermission)) ? `disabled` : ""}`}
	data-no-results={String(i18n("no_results_found") ?? "")}
	{...((props.issue && (props.isIssueWriter || props.hasIssuesOrPullsWritePermission)) ? {"data-url-update-issueref": `${String(props.repoLink ?? "")}/issues/${String(props.issue?.index ?? "")}/ref`} : {})}
>
	<div className="ui button branch-dropdown-button">
		<span className="text-branch-name gt-ellipsis">{(props.reference) ? (<>{props.refEndName as any}</>) : (<>{i18n("repo.issues.no_ref")}</>)}</span>
		{(props.hasIssuesOrPullsWritePermission) ? (<><span className="svg-icon" aria-label="octicon-triangle-down"></span></>) : null}
	</div>
	<div className="menu">
		<div className="ui icon search input">
			<i className="icon"><span className="svg-icon" aria-label="octicon-filter"></span></i>
			<input name="search" placeholder={`${i18n("repo.filter_branch_and_tag")}...`} />
		</div>
		<div className="branch-tag-tab">
			<a className="branch-tag-item reference column muted active" href="#" data-target="#branch-list">
				<span className="svg-icon" aria-label="octicon-git-branch"></span> {i18n("repo.branches")}
			</a>
			<a className="branch-tag-item reference column muted" href="#" data-target="#tag-list">
				<span className="svg-icon" aria-label="octicon-tag"></span> {i18n("repo.tags")}
			</a>
		</div>
		<div className="branch-tag-divider"></div>
		<div id="branch-list" className="scrolling menu reference-list-menu">
			{((props.reference || !(props.issue))) ? (<>
				<div className="item tw-text-xs" data-id="" data-name={String(i18n("repo.issues.no_ref") ?? "")} data-id-selector="#ref_selector"><strong><a href="#">{i18n("repo.clear_ref")}</a></strong></div>
			</>) : null}
			{((props.branches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="item" data-id={`refs/heads/`} data-name={String("" ?? "")} data-id-selector="#ref_selector" title={String("" ?? "")}>{item as any}</div>
			{/* else */}
				<div className="item disabled">{i18n("no_results_found")}</div>
			</React.Fragment>))}
		</div>
		<div id="tag-list" className="scrolling menu reference-list-menu tw-hidden">
			{((props.reference || !(props.issue))) ? (<>
				<div className="item tw-text-xs" data-id="" data-name={String(i18n("repo.issues.no_ref") ?? "")} data-id-selector="#ref_selector"><strong><a href="#">{i18n("repo.clear_ref")}</a></strong></div>
			</>) : null}
			{((props.tags) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="item" data-id={`refs/tags/`} data-name={`tags/`} data-id-selector="#ref_selector">{item as any}</div>
			{/* else */}
				<div className="item disabled">{i18n("no_results_found")}</div>
			</React.Fragment>))}
		</div>
	</div>
</div>
<div className="divider"></div>
</>) : null}

  </>)
}
