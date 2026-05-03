import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Blame(props: Record<string, unknown>) {
  return (<>
{((props.usesIgnoreRevs || props.faultyIgnoreRevsFile)) ? (<>
	{/* $revsFileLink */}
	{(props.usesIgnoreRevs) ? (<>
		<div className="ui info message">
			<p>{i18n("repo.blame.ignore_revs")}</p>
		</div>
	</>) : (<>
		<div className="ui error message">
			<p>{i18n("repo.blame.ignore_revs.failed")}</p>
		</div>
	</>)}
</>) : null}
<div className={` non-diff-file-content`}>
	<h4 className="file-header ui top attached header flex-left-right">
		<div className="file-header-left tw-flex tw-items-center tw-py-2 tw-pr-4">
			{/* template: repo/file_info */}
		</div>
		<div className="file-header-right file-actions tw-flex tw-items-center tw-flex-wrap">
			<div className="ui buttons">
				<a className="ui tiny button" href={String(props.rawFileLink ?? "")}>{i18n("repo.file_raw")}</a>
				{((props.refFullName?.isBranch || props.refFullName?.isTag)) ? (<>
					<a className="ui tiny button" href={`${String(props.repoLink ?? "")}/src/commit/${String(props.commitID?.("|", "PathEscape") ?? "")}/${String(props.treePath?.("|", "PathEscapeSegments") ?? "")}`}>{i18n("repo.file_permalink")}</a>
				</>) : null}
				<a className="ui tiny button" href={`${String(props.repoLink ?? "")}/src/${String(props.refTypeNameSubURL ?? "")}/${String(props.treePath?.("|", "PathEscapeSegments") ?? "")}`}>{i18n("repo.normal_view")}</a>
				<a className="ui tiny button" href={`${String(props.repoLink ?? "")}/commits/${String(props.refTypeNameSubURL ?? "")}/${String(props.treePath?.("|", "PathEscapeSegments") ?? "")}`}>{i18n("repo.file_history")}</a>
				<button className="ui tiny button unescape-button">{i18n("repo.unescape_control_characters")}</button>
				<button className="ui tiny button escape-button tw-hidden">{i18n("repo.escape_control_characters")}</button>
			</div>
		</div>
	</h4>
	<div className="ui bottom attached table unstackable segment">
		<div className="file-view code-view unicode-escaped">
			{(props.isFileTooLarge) ? (<>
				{/* template: shared/filetoolarge */}
			</>) : null} {(!(props.fileSize)) ? (<>
				{/* template: shared/fileisempty */}
			</>) : (<>
			<table>
				<tbody>
					{((props.blameRows) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr className={`${(props.row?.commitURL) ? `top-line-blame` : ""}`}>
							<td className="lines-commit">
								<div className="blame-info">
									<div className="blame-data">
										<div className="blame-avatar">
											{/* TODO: {{$row.Avatar}} */}
										</div>
										<div className="blame-message muted-links" title={String("" ?? "")}>
											{/* TODO: {{ctx.RenderUtils.RenderCommitMessageLinkSubject $row.CommitMessage $row.CommitURL $.Repository}} */}
										</div>
										<div className="blame-time not-mobile">
											{/* TODO: {{$row.CommitSince}} */}
										</div>
									</div>
								</div>
							</td>
							<td className="lines-blame-btn">
								{(item.row?.previousSha) ? (<>
									<a role="button" className="muted" href={String("" ?? "")} data-tooltip-content='{i18n("repo.blame_prior")}'>
										<span className="svg-icon" aria-label="octicon-versions"></span>
									</a>
								</>) : null}
							</td>
							<td className="lines-num">
								<span id={`L`} data-line-number={String("" ?? "")}></span>
							</td>

							{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleTd $.EscapeStatus $row.EscapeStatus}} */}

							<td rel={`L`} className="lines-code blame-code chroma">
								<code className="code-inner tw-pl-2">{/* TODO: {{$row.Code}} */}</code>
							</td>
						</tr>
					</React.Fragment>))}
				</tbody>
			</table>
			</>)}{/* end if .IsFileTooLarge */}
			<div className="code-line-menu tippy-target">
				{/* FIXME: the "HasSourceRenderedToggle" is never set on blame page, it should mean "whether the file is renderable".
				If the file is renderable, then it must has the "display=source" parameter to make sure the file view page shows the source code, then line number works. */}
				{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeIssues")) ? (<>
					<a className="item ref-in-new-issue" role="menuitem" data-url-issue-new={`${String(props.repoLink ?? "")}/issues/new`} data-url-param-body-link={`${String(props.repository?.link ?? "")}/src/commit//${(props.hasSourceRenderedToggle) ? `?display=source` : ""}`} rel="nofollow noindex">{i18n("repo.issues.context.reference_issue")}</a>
				</>) : null}
				<a className="item copy-line-permalink" role="menuitem" data-url={`${String(props.repository?.link ?? "")}/src/commit//${(props.hasSourceRenderedToggle) ? `?display=source` : ""}`}>{i18n("repo.file_copy_permalink")}</a>
			</div>
		</div>
	</div>
</div>

  </>)
}
