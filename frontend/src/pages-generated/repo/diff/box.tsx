import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Box(props: Record<string, unknown>) {
  return (<>
{/* $showFileTree */}
<div>
	<div className="diff-detail-box">
		<div className="flex-text-block tw-flex-wrap tw-ml-0.5">
			{(showFileTree) ? (<>
				<button className="diff-toggle-file-tree-button not-mobile btn interact-fg" data-show-text={String(i18n("repo.diff.show_file_tree") ?? "")} data-hide-text={String(i18n("repo.diff.hide_file_tree") ?? "")}>
					{/* the icon meaning is reversed here, "octicon-sidebar-collapse" means show the file tree */}
					<span className="svg-icon" aria-label="octicon-sidebar-collapse"></span>
					<span className="svg-icon" aria-label="octicon-sidebar-expand"></span>
				</button>
				<script nonce={String("" ?? "")}>
					// Default to true if unset
					const diffTreeVisible = window.localUserSettings.getBoolean('diff_file_tree_visible', true);
					const diffTreeBtn = document.querySelector('.diff-toggle-file-tree-button');
					const diffTreeIcon = `.octicon-sidebar-${diffTreeVisible ? 'expand' : 'collapse'}`;
					diffTreeBtn.querySelector(diffTreeIcon).classList.remove('tw-hidden');
					diffTreeBtn.setAttribute('data-tooltip-content', diffTreeBtn.getAttribute(diffTreeVisible ? 'data-hide-text' : 'data-show-text'));
				</script>
			</>) : null}
			{(!(props.diffNotAvailable)) ? (<>
				<div className="diff-detail-stats tw-flex tw-items-center tw-flex-wrap">
					<span className="svg-icon" aria-label="octicon-diff"></span>{i18n("repo.diff.stats_desc")}
				</div>
			</>) : null}
		</div>
		<div className="diff-detail-actions">
			{((props.pageIsPullFiles && props.signedUserID && !(props.diffNotAvailable))) ? (<>
				<div className="not-mobile tw-flex tw-items-center tw-flex-col tw-whitespace-nowrap tw-mr-1">
					<label htmlFor="viewed-files-summary" id="viewed-files-summary-label" data-text-changed-template={String(i18n("repo.pulls.viewed_files_label") ?? "")}>
						{i18n("repo.pulls.viewed_files_label")}
					</label>
					<progress id="viewed-files-summary" value={String(props.numViewedFiles ?? "")} max={String(props.diffShortStat?.numFiles ?? "")}></progress>
				</div>
			</>) : null}
			{/* template: repo/diff/whitespace_dropdown */}
			{/* template: repo/diff/options_dropdown */}
			{(props.pageIsPullFiles) ? (<>
				<div id="diff-commit-select" data-merge-base={String(props.compareInfo?.compareBase ?? "")} data-issuelink={String(props.issue?.link ?? "")} data-queryparams={`?style=${(props.isSplitStyle) ? `split` : `unified`}&whitespace=${String(props.whitespaceBehavior ?? "")}&show-outdated=${String(props.showOutdatedComments ?? "")}`} data-filter_changes_by_commit={String(i18n("repo.pulls.filter_changes_by_commit") ?? "")}>
					{/* the following will be replaced by vue component, but this avoids any loading artifacts till the vue component is initialized */}
					<div className="ui jump dropdown tiny basic button custom">
						<span className="svg-icon" aria-label="octicon-git-commit"></span>
					</div>
				</div>
			</>) : null}
			{((props.pageIsPullFiles && props.signedUserID)) ? (<>
				{/* template: repo/diff/new_review */}
			</>) : null}
		</div>
	</div>
	{(!(props.diffNotAvailable)) ? (<>
		{((props.isShowingOnlySingleCommit && props.pageIsPullFiles)) ? (<>
			<div className="ui info message">
				<div>{i18n("repo.pulls.showing_only_single_commit")} - <a href={`${String(props.issue?.link ?? "")}/files?style=${(props.isSplitStyle) ? `split` : `unified`}&whitespace=${String(props.whitespaceBehavior ?? "")}&show-outdated=${String(props.showOutdatedComments ?? "")}`}>{i18n("repo.pulls.show_all_commits")}</a></div>
			</div>
		</>) : null} {((!(props.isShowingAllCommits) && props.pageIsPullFiles)) ? (<>
			<div className="ui info message">
				<div>{i18n("repo.pulls.showing_specified_commit_range")} - <a href={`${String(props.issue?.link ?? "")}/files?style=${(props.isSplitStyle) ? `split` : `unified`}&whitespace=${String(props.whitespaceBehavior ?? "")}&show-outdated=${String(props.showOutdatedComments ?? "")}`}>{i18n("repo.pulls.show_all_commits")}</a></div>
			</div>
		</>) : null}
	</>) : null}
	<div id="diff-container">
		{(showFileTree) ? (<>
			{props.fileIconPoolHTML as any}
			<div id="diff-file-tree" className="tw-hidden not-mobile"></div>
			<script nonce={String("" ?? "")}>
				if (diffTreeVisible) document.getElementById('diff-file-tree').classList.remove('tw-hidden');
			</script>
		</>) : null}
		{(props.diffNotAvailable) ? (<>
			<h4>{i18n("repo.diff.data_not_available")}</h4>
		</>) : (<>
			<div id="diff-file-boxes" className="sixteen wide column">
				{((props.diff?.files) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					{/* notice: the index of Diff.Files should not be used for element ID, because the index will be restarted from 0 when doing load-more for PRs with a lot of files */}
					{/* $blobBase */}
					{/* $blobHead */}
					{/* $sniffedTypeBase */}
					{/* $sniffedTypeHead */}
					{/* $isImage */}
					{/* $isCsv */}
					{/* $showFileViewToggle */}
					{/* $isExpandable */}
					{/* $isReviewFile */}
					<div className={`diff-file-box file-content  tw-mt-0`} id={`diff-`} data-old-filename={String("" ?? "")} data-new-filename={String("" ?? "")} {...((item.file?.shouldBeHidden || !(isExpandable)) ? {"data-folded": "true"} : {})}>
						<div className="diff-file-header sticky-2nd-row ui top attached header">
							<div className="diff-file-name tw-flex tw-flex-1 tw-items-center tw-gap-1 tw-flex-wrap">
								<div className="flex-text-block">
									<button className={`fold-file btn interact-bg tw-flex-shrink-0 tw-p-1${(!(isExpandable)) ? ` tw-invisible` : ""}`}>
										{(item.file?.shouldBeHidden) ? (<>
											<span className="svg-icon" aria-label="octicon-chevron-right"></span>
										</>) : (<>
											<span className="svg-icon" aria-label="octicon-chevron-down"></span>
										</>)}
									</button>
									{/* $entryModeText */}
									<a className="muted file-link tw-font-mono" title={`${(props.file?.isRenamed) ? ` → ` : ""}`} href={`#diff-`}>
										{(item.file?.isRenamed) ? (<>{/* TODO: {{$file.OldName}} */} → </>) : null}{/* TODO: {{$file.Name}} */}
									</a>
								</div>
								<button className="btn interact-fg tw-p-2 tw-shrink-0" data-clipboard-text={String("" ?? "")} data-tooltip-content={String(i18n("copy_path") ?? "")}><span className="svg-icon" aria-label="octicon-copy"></span></button>
								{(item.file?.isLFSFile) ? (<>
									<span className="ui label">LFS</span>
								</>) : null}
								{(item.file?.isGenerated) ? (<>
									<span className="ui label">{i18n("repo.diff.generated")}</span>
								</>) : null}
								{(item.file?.isVendored) ? (<>
									<span className="ui label">{i18n("repo.diff.vendored")}</span>
								</>) : null}
								{(entryModeText) ? (<>
									<span className="ui label">{/* $entryModeText */}</span>
								</>) : null}
							</div>
							<div className="diff-file-header-actions flex-text-block tw-justify-end tw-flex-wrap">
								{(item.file?.isBin) ? (<>
									{i18n("repo.diff.bin")}
								</>) : (<>
									{/* template: repo/diff/stats */}
								</>)}

								{(showFileViewToggle) ? (<>
									<div className="ui compact icon buttons">
										<button className="ui tiny basic button file-view-toggle" data-toggle-selector={`#diff-source-`} data-tooltip-content={String(i18n("repo.file_view_source") ?? "")}><span className="svg-icon" aria-label="octicon-code"></span></button>
										<button className="ui tiny basic button file-view-toggle active" data-toggle-selector={`#diff-rendered-`} data-tooltip-content={String(i18n("repo.file_view_rendered") ?? "")}><span className="svg-icon" aria-label="octicon-file"></span></button>
									</div>
								</>) : null}
								{(item.file?.isProtected) ? (<>
									<span className="ui basic label">{i18n("repo.diff.protected")}</span>
								</>) : null}
								{((isReviewFile && item.file?.hasChangedSinceLastReview)) ? (<>
									<span className="changed-since-last-review unselectable not-mobile">{i18n("repo.pulls.has_changed_since_last_review")}</span>
								</>) : null}
								{(isReviewFile) ? (<>
									<label data-link={`${String(props.issue?.link ?? "")}/viewed-files`} data-headcommit={String(props.afterCommitID ?? "")} className={`viewed-file-form unselectable${(props.file?.isViewed) ? ` viewed-file-checked-form` : ""}`}>
										<input type="checkbox" name={String("" ?? "")} autocomplete="off"{...(item.file?.isViewed ? {"checked": true} : {})} /> {i18n("repo.pulls.has_viewed_file")}
									</label>
								</>) : null}
								{(!(item.file?.isSubmodule)) ? (<>
									<button className="btn diff-header-popup-btn tw-p-1"><span className="svg-icon" aria-label="octicon-kebab-horizontal"></span></button>
									<div className="tippy-target">
										{(!((item.file?.isIncomplete || item.file?.isBin))) ? (<>
											<button className="unescape-button item" data-unicode-content-selector={`#diff-`}>{i18n("repo.unescape_control_characters")}</button>
											<button className="escape-button tw-hidden item" data-unicode-content-selector={`#diff-`}>{i18n("repo.escape_control_characters")}</button>
										</>) : null}
										<button className="item" data-clipboard-text={String("" ?? "")}>{i18n("copy_filename")}</button>
										{(!(props.pageIsWiki)) ? (<>
											{(item.file?.isDeleted) ? (<>
												<a className="item" rel="nofollow" href={`${String(props.beforeSourcePath ?? "")}/`}>{i18n("repo.diff.view_file")}</a>
											</>) : (<>
												<a className="item" rel="nofollow" href={`${String(props.sourcePath ?? "")}/`}>{i18n("repo.diff.view_file")}</a>
												{((props.repository?.canEnableEditor && props.canEditFile)) ? (<>
													<a className="item" rel="nofollow" href={`${String(props.headRepoLink ?? "")}/_edit//?return_uri=`}>{i18n("repo.editor.edit_this_file")}</a>
												</>) : null}
											</>)}
										</>) : null}
									</div>
								</>) : null}
							</div>
						</div>
						<div className="diff-file-body ui attached unstackable table segment" {...((item.file?.isViewed && props.isShowingAllCommits) ? {"data-folded": "true"} : {})}>
							<div id={`diff-source-`} className={`file-body file-code unicode-escaped code-diff${(props.isSplitStyle) ? ` code-diff-split` : ` code-diff-unified`}${(showFileViewToggle) ? ` tw-hidden` : ""}`}>
								{((item.file?.isIncomplete || item.file?.isBin)) ? (<>
									<div className="diff-file-body binary">
										{(item.file?.isIncomplete) ? (<>
											{(item.file?.isIncompleteLineTooLong) ? (<>
												{i18n("repo.diff.file_suppressed_line_too_long")}
											</>) : (<>
												{i18n("repo.diff.file_suppressed")}
												<a className="ui basic tiny button diff-load-button" data-href={`?file-only=true&files=&files=`}>{i18n("repo.diff.load")}</a>
											</>)}
										</>) : (<>
											{i18n("repo.diff.bin_not_shown")}
										</>)}
									</div>
								</>) : null} {(item.file?.submoduleDiffInfo) ? (<>
									<div className="tw-p-3"><span className="svg-icon" aria-label="octicon-file-submodule"></span> {/* $submoduleDiffInfo */}
										{/* TODO: {{- $submoduleName := $submoduleDiffInfo.SubmoduleRepoLinkHTML ctx -}} */}
										{/* TODO: {{- if $file.IsDeleted -}} */}
											{/* TODO: {{- ctx.Locale.Tr "repo.diff.submodule_deleted" $submoduleName ($submoduleDiffInfo.CommitRefIDLinkHTML ctx $submoduleDiffInfo.PreviousRefID) -}} */}
										{/* TODO: {{- else if $file.IsCreated -}} */}
											{/* TODO: {{- ctx.Locale.Tr "repo.diff.submodule_added" $submoduleName ($submoduleDiffInfo.CommitRefIDLinkHTML ctx $submoduleDiffInfo.NewRefID) -}} */}
										{/* TODO: {{- else -}} */}
											{/* TODO: {{- ctx.Locale.Tr "repo.diff.submodule_updated" $submoduleName ($submoduleDiffInfo.CompareRefIDLinkHTML ctx) -}} */}
										</>) : null}
									</div>
								{/* else */}
									<table className="chroma" data-new-comment-url={`${String(props.issue?.link ?? "")}/files/reviews/new_comment`} data-path={String("" ?? "")}>
										{(props.isSplitStyle) ? (<>
											{/* template: repo/diff/section_split */}
										</>) : (<>
											{/* template: repo/diff/section_unified */}
										</>)}
									</table>
								</React.Fragment>))}
							</div>
							{(showFileViewToggle) ? (<>
								{/* for image or CSV, it can have a horizontal scroll bar, there won't be review comment context menu (position absolute) which would be clipped by "overflow" */}
								<div id={`diff-rendered-`} className={`file-body file-code ${(props.isSplitStyle) ? `code-diff-split` : `code-diff-unified`} tw-overflow-x-scroll`}>
									<table className="chroma tw-w-full">
										{(isImage) ? (<>
											{/* template: repo/diff/image_diff */}
										</>) : (<>
											{/* template: repo/diff/csv_diff */}
										</>)}
									</table>
								</div>
							</>) : null}
						</div>
					</div>
				</>)}

				{(props.diff?.isIncomplete) ? (<>
					<div className="diff-file-box file-content tw-mt-2" id="diff-incomplete">
						<h4 className="ui top attached header tw-font-normal flex-left-right">
							{i18n("repo.diff.too_many_files")}
							<a className="ui basic tiny button" id="diff-show-more-files" data-href={`?skip-to=${String(props.diff?.end ?? "")}&file-only=true`}>{i18n("repo.diff.show_more")}</a>
						</h4>
					</div>
				</>) : null}
			</div>
		
	</div>

	{((!(props.repository?.isArchived) && !(props.diffNotAvailable))) ? (<>
		<template id="issue-comment-editor-template">
			<form className="ui form comment">
				<div className="field">
				{/* template: shared/combomarkdowneditor */}
				</div>
				{(props.isAttachmentEnabled) ? (<>
					<div className="field">
						{/* template: repo/upload */}
					</div>
				</>) : null}
				<div className="field flex-text-block tw-justify-end">
					<button className="ui cancel button">{i18n("repo.issues.cancel")}</button>
					<button className="ui primary button">{i18n("repo.issues.save")}</button>
				</div>
			</form>
		</template>
	</>) : null}
	{(!(props.diffNotAvailable)) ? (<>
		{/* template: repo/issue/view_content/reference_issue_dialog */}
		{/* template: shared/user/block_user_dialog */}
	</>) : null}
</div>

  </>)
}
