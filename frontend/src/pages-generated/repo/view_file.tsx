import React from 'react'
import { i18n } from '../../lib/i18n'

export default function ViewFile(props: Record<string, unknown>) {
  return (<>
<div {...(props.readmeInList ? {"id": "readme"} : {})} className={` non-diff-file-content`}
	data-global-init="initRepoFileView" data-raw-file-link={String(props.rawFileLink ?? "")}>

	{(props.fileError) ? (<>
		<div className="ui error message">
			<div className="text left tw-whitespace-pre">{props.fileError as any}</div>
		</div>
	</>) : null}
	{(props.fileWarning) ? (<>
		<div className="ui warning message">
			<div className="text left tw-whitespace-pre">{props.fileWarning as any}</div>
		</div>
	</>) : null}

	{(!(props.readmeInList)) ? (<>
		<div id="repo-file-commit-box" className="ui segment list-header tw-mb-4 flex-left-right">
			{/* template: repo/latest_commit */}
			{(props.latestCommit) ? (<>
				{(props.latestCommit?.committer) ? (<>
					<div className="tw-text-text-light age flex-text-block">
						{/* TODO: {{DateUtils.TimeSince .LatestCommit.Committer.When}} */}
					</div>
				</>) : null}
			</>) : null}
		</div>
	</>) : null}

	<h4 className="file-header ui top attached header flex-left-right">
		<div className="file-header-left tw-flex tw-items-center tw-py-2 tw-pr-4">
			{(props.readmeInList) ? (<>
				<span className="svg-icon" aria-label="octicon-book"></span>
				<strong><a className="muted" href="#readme">{props.readmeInList as any}</a></strong>
			</>) : (<>
				{/* template: repo/file_info */}
			</>)}
		</div>
		<div className="file-header-right file-actions flex-text-block tw-flex-wrap">
			{/* this componment is also controlled by frontend plugin renders */}
			<div className={`ui compact icon buttons file-view-toggle-buttons `}>
				{(props.isRepresentableAsText) ? (<>
				<a href="?display=source" className={`ui mini basic button file-view-toggle-source ${(props.isDisplayingSource) ? `active` : ""}`} data-tooltip-content={String(i18n("repo.file_view_source") ?? "")}><span className="svg-icon" aria-label="octicon-code"></span></a>
				</>) : null}
				{(props.hasSourceRenderedToggle) ? (<>
				<a href="?display=rendered" className={`ui mini basic button file-view-toggle-rendered ${(!(props.isDisplayingSource)) ? `active` : ""}`} data-tooltip-content={String(i18n("repo.file_view_rendered") ?? "")}><span className="svg-icon" aria-label="octicon-file"></span></a>
				</>) : null}
			</div>
			{(!(props.readmeInList)) ? (<>
				<div className="ui buttons tw-mr-1">
					<a className="ui mini basic button" href={String(props.rawFileLink ?? "")}>{i18n("repo.file_raw")}</a>
					{((props.refFullName?.isBranch || props.refFullName?.isTag)) ? (<>
						<a className="ui mini basic button" href={`${String(props.repoLink ?? "")}/src/commit//`}>{i18n("repo.file_permalink")}</a>
					</>) : null}
					{(props.isRepresentableAsText) ? (<>
						<a className="ui mini basic button" href={`${String(props.repoLink ?? "")}/blame/${String(props.refTypeNameSubURL ?? "")}/`}>{i18n("repo.blame")}</a>
					</>) : null}
					<a className="ui mini basic button" href={`${String(props.repoLink ?? "")}/commits/${String(props.refTypeNameSubURL ?? "")}/`}>{i18n("repo.file_history")}</a>
					{(props.escapeStatus?.escaped) ? (<>
						<button className="ui mini basic button unescape-button tw-hidden">{i18n("repo.unescape_control_characters")}</button>
						<button className="ui mini basic button escape-button">{i18n("repo.escape_control_characters")}</button>
					</>) : null}
				</div>
				<a download className="btn-octicon" data-tooltip-content={String(i18n("repo.download_file") ?? "")} href={String(props.rawFileLink ?? "")}><span className="svg-icon" aria-label="octicon-download"></span></a>
				<a className={`btn-octicon ${(!(props.canCopyContent)) ? `disabled` : ""}`} data-global-click="onCopyContentButtonClick"
					{...(!(props.isDisplayingSource) ? {"data-raw-file-link": String(props.rawFileLink ?? "")} : {})}
					data-tooltip-content={`${(props.canCopyContent) ? `${i18n("copy_content")}` : `${i18n("copy_type_unsupported")}`}`}
				><span className="svg-icon" aria-label="octicon-copy"></span></a>
				{((props.enableFeed && props.refFullName?.isBranch)) ? (<>
				<a className="btn-octicon" href={`${String(props.repoLink ?? "")}/rss/${String(props.refTypeNameSubURL ?? "")}/`} data-tooltip-content={String(i18n("rss_feed") ?? "")}>
					<span className="svg-icon" aria-label="octicon-rss"></span>
				</a>
				</>) : null}
				{(props.repository?.canEnableEditor) ? (<>
					{(props.canEditFile) ? (<>
						<a className="btn-octicon" data-tooltip-content={String(props.editFileTooltip ?? "")} href={`${String(props.repoLink ?? "")}/_edit//`}><span className="svg-icon" aria-label="octicon-pencil"></span></a>
					</>) : (<>
						<span className="btn-octicon disabled" data-tooltip-content={String(props.editFileTooltip ?? "")}><span className="svg-icon" aria-label="octicon-pencil"></span></span>
					</>)}
					{(props.canDeleteFile) ? (<>
						<a className="btn-octicon btn-octicon-danger" data-tooltip-content={String(props.deleteFileTooltip ?? "")} href={`${String(props.repoLink ?? "")}/_delete//`}><span className="svg-icon" aria-label="octicon-trash"></span></a>
					</>) : (<>
						<span className="btn-octicon disabled" data-tooltip-content={String(props.deleteFileTooltip ?? "")}><span className="svg-icon" aria-label="octicon-trash"></span></span>
					</>)}
				</>) : null}
			</>) : null} {(props.escapeStatus?.escaped) ? (<>
				<button className="ui mini basic button unescape-button tw-mr-1 tw-hidden">{i18n("repo.unescape_control_characters")}</button>
				<button className="ui mini basic button escape-button tw-mr-1">{i18n("repo.escape_control_characters")}</button>
			</>) : null}
			{((props.readmeInList && props.canEditReadmeFile)) ? (<>
				<a className="btn-octicon" data-tooltip-content={String(i18n("repo.editor.edit_this_file") ?? "")} href={`${String(props.repoLink ?? "")}/_edit//`}><span className="svg-icon" aria-label="octicon-pencil"></span></a>
			</>) : null}
		</div>
	</h4>

	<div className="ui bottom attached table unstackable segment">
		{(!(props.renderAsMarkup)) ? (<>
			{/* template: repo/unicode_escape_prompt */}
		</>) : null}
		<div className={`file-view ${(props.renderAsMarkup === "markup-inplace") ? `markup ${String(props.markupType ?? "")}plain-textcode-view` : ""}`}>
			{(props.isFileTooLarge) ? (<>
				{/* template: shared/filetoolarge */}
			</>) : null} {(!(props.fileSize)) ? (<>
				{/* template: shared/fileisempty */}
			</>) : null} {(props.renderAsMarkup) ? (<>
				{props.fileContent as any}
			</>) : null} {(props.isPlainText) ? (<>
				<pre>{(props.fileContent) ? (<>{props.fileContent as any}</>) : null}</pre>
			</>) : null} {(props.fileContent) ? (<>
				<table>
					<tbody>
					{((props.fileContent) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						{/* $line */}
						<tr>
							<td className="lines-num"><span id={`L`} data-line-number={String("" ?? "")}></span></td>
							{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleTd $.EscapeStatus (index $.LineEscapeStatus $idx)}} */}
							<td rel={`L`} className="lines-code chroma"><code className="code-inner">{props.code as any}</code></td>
						</tr>
					</React.Fragment>))}
					</tbody>
				</table>
			</>) : (<>
				<div className="view-raw">
					{(props.isImageFile) ? (<>
						<img alt={String(props.rawFileLink ?? "")} src={String(props.rawFileLink ?? "")} />
					</>) : null} {(props.isVideoFile) ? (<>
						<video controls src={String(props.rawFileLink ?? "")}>
							<strong>{i18n("repo.video_not_supported_in_browser")}</strong>
						</video>
					</>) : null} {(props.isAudioFile) ? (<>
						<audio controls src={String(props.rawFileLink ?? "")}>
							<strong>{i18n("repo.audio_not_supported_in_browser")}</strong>
						</audio>
					</>) : (<>
						<div className="file-view-render-container">
							<div className="file-view-raw-prompt tw-p-4">
								<a href={String(props.rawFileLink ?? "")} rel="nofollow">{i18n("repo.file_view_raw")}</a>
							</div>
						</div>
					</>)}
				</div>
			</>)}
		</div>

		<div className="code-line-menu tippy-target">
			{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeIssues")) ? (<>
			<a className="item ref-in-new-issue" role="menuitem" data-url-issue-new={`${String(props.repoLink ?? "")}/issues/new`} data-url-param-body-link={`${String(props.repository?.link ?? "")}/src/commit//${(props.hasSourceRenderedToggle) ? `?display=source` : ""}`} rel="nofollow noindex">{i18n("repo.issues.context.reference_issue")}</a>
			</>) : null}
			<a className="item view_git_blame" role="menuitem" href={`${String(props.repository?.link ?? "")}/blame/commit//`}>{i18n("repo.view_git_blame")}</a>
			<a className="item copy-line-permalink" role="menuitem" data-url={`${String(props.repository?.link ?? "")}/src/commit//${(props.hasSourceRenderedToggle) ? `?display=source` : ""}`}>{i18n("repo.file_copy_permalink")}</a>
		</div>
	</div>
</div>

  </>)
}
