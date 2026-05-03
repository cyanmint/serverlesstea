// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function OptionsDropdown(props: Record<string, unknown>) {
  return (<>
<div className="ui dropdown tiny basic button" data-tooltip-content={String(i18n("repo.diff.options_button") ?? "")}>
	<span className="svg-icon" aria-label="octicon-kebab-horizontal"></span>
	<div className="menu">
		{(props.issue?.index) ? (<>
			<a className="item" href={`${String(props.repoLink ?? "")}/pulls/${String(props.issue?.index ?? "")}.patch`} download={`${String(props.issue?.index ?? "")}.patch`}>{i18n("repo.diff.download_patch")}</a>
			<a className="item" href={`${String(props.repoLink ?? "")}/pulls/${String(props.issue?.index ?? "")}.diff`} download={`${String(props.issue?.index ?? "")}.diff`}>{i18n("repo.diff.download_diff")}</a>
		</>) : null} {(props.pageIsWiki) ? (<>
			<a className="item" href={`${String(props.repoLink ?? "")}/wiki/commit/.patch`} download={`.patch`}>{i18n("repo.diff.download_patch")}</a>
			<a className="item" href={`${String(props.repoLink ?? "")}/wiki/commit/.diff`} download={`.diff`}>{i18n("repo.diff.download_diff")}</a>
		</>) : null} {(props.commit?.iD?.string) ? (<>
			<a className="item" href={`${String(props.repoLink ?? "")}/commit/.patch`} download={`.patch`}>{i18n("repo.diff.download_patch")}</a>
			<a className="item" href={`${String(props.repoLink ?? "")}/commit/.diff`} download={`.diff`}>{i18n("repo.diff.download_diff")}</a>
		</>) : null}
		<a id="expand-files-btn" className="item">{i18n("repo.pulls.expand_files")}</a>
		<a id="collapse-files-btn" className="item">{i18n("repo.pulls.collapse_files")}</a>
		{(props.issue?.index) ? (<>
			{(props.showOutdatedComments) ? (<>
				<a className="item" href={`?style=${(props.isSplitStyle) ? `split` : `unified`}&whitespace=${String(props.whitespaceBehavior ?? "")}&show-outdated=false`}>
					<label className="tw-pointer-events-none">
						{i18n("repo.issues.review.option.hide_outdated_comments")}
					</label>
				</a>
			</>) : (<>
				<a className="item" href={`?style=${(props.isSplitStyle) ? `split` : `unified`}&whitespace=${String(props.whitespaceBehavior ?? "")}&show-outdated=true`}>
					<label className="tw-pointer-events-none">
						{i18n("repo.issues.review.option.show_outdated_comments")}
					</label>
				</a>
			</>)}
		</>) : null}
	</div>
</div>

  </>)
}
