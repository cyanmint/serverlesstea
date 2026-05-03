import React from 'react'
import { i18n } from '../../lib/i18n'

export default function BranchDropdown(props: Record<string, unknown>) {
  return (<>
{/* Attributes:
* ContainerClasses
* Repository
* CurrentRefType: eg. "branch", "tag", "commit"
* CurrentRefShortName: eg. "master", "v1.0", "abcdef0123"
* CurrentTreePath
* RefLinkTemplate: redirect to the link when a branch/tag is selected
* RefFormActionTemplate: change the parent form's action when a branch/tag is selected
* DropdownFixedText: the text to show in the dropdown (mainly used by "release page"), if empty, the text will be the branch/tag name
* ShowTabBranches
* ShowTabTagsTab
* AllowCreateNewRef
* ShowViewAllRefsEntry

Search "repo/branch_dropdown" in the template directory to find all occurrences. */}
<div className={`${(props.containerClasses) ? `${String(props.containerClasses ?? "")}` : ""}`}
	data-global-init="initRepoBranchTagSelector"
	data-text-release-compare={String(i18n("repo.release.compare") ?? "")}
	data-text-branches={String(i18n("repo.branches") ?? "")}
	data-text-tags={String(i18n("repo.tags") ?? "")}
	data-text-filter-branch={String(i18n("repo.pulls.filter_branch") ?? "")}
	data-text-filter-tag={String(i18n("repo.find_tag") ?? "")}
	data-text-default-branch-label={String(i18n("repo.default_branch_label") ?? "")}
	data-text-create-tag={String(i18n("repo.tag.create_tag") ?? "")}
	data-text-create-branch={String(i18n("repo.branch.create_branch") ?? "")}
	data-text-create-ref-from={String(i18n("repo.branch.create_from") ?? "")}
	data-text-no-results={String(i18n("no_results_found") ?? "")}
	data-text-view-all-branches={String(i18n("repo.view_all_branches") ?? "")}
	data-text-view-all-tags={String(i18n("repo.view_all_tags") ?? "")}

	data-current-repo-default-branch={String(props.repository?.defaultBranch ?? "")}
	data-current-repo-link={String(props.repository?.link ?? "")}
	data-current-tree-path={String(props.currentTreePath ?? "")}
	data-current-ref-type={String(props.currentRefType ?? "")}
	data-current-ref-short-name={String(props.currentRefShortName ?? "")}

	data-ref-link-template={String(props.refLinkTemplate ?? "")}
	data-ref-form-action-template={String(props.refFormActionTemplate ?? "")}
	data-dropdown-fixed-text={String(props.dropdownFixedText ?? "")}
	data-show-tab-branches={String(props.showTabBranches ?? "")}
	data-show-tab-tags={String(props.showTabTags ?? "")}
	data-allow-create-new-ref={String(props.allowCreateNewRef ?? "")}
	data-show-view-all-refs-entry={String(props.showViewAllRefsEntry ?? "")}

	data-enable-feed={String("" ?? "")}
>
	{/* show dummy elements before Vue componment is mounted, this code must match the code in BranchTagSelector.vue */}
	<div className="ui dropdown custom branch-selector-dropdown ellipsis-text-items">
		<div className="ui compact button branch-dropdown-button">
			<span className="flex-text-block gt-ellipsis">
				{(props.dropdownFixedText) ? (<>
					{props.dropdownFixedText as any}
				</>) : (<>
					{(props.currentRefType === "tag") ? (<>
						<span className="svg-icon" aria-label="octicon-tag"></span>
					</>) : null} {(props.currentRefType === "branch") ? (<>
						<span className="svg-icon" aria-label="octicon-git-branch"></span>
					</>) : (<>
						<span className="svg-icon" aria-label="octicon-git-commit"></span>
					</>)}
					<strong className="tw-inline-block gt-ellipsis">{props.currentRefShortName as any}</strong>
				</>)}
			</span>
			<span className="svg-icon" aria-label="octicon-triangle-down"></span>
		</div>
	</div>
</div>

  </>)
}
