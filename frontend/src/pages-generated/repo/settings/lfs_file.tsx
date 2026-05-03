import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function LfsFile(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="user-main-content twelve wide column content repository file list">
		<div className="tab-size-8 non-diff-file-content">
			<h4 className="ui top attached header">
				<a href={String(props.lFSFilesLink ?? "")}>{i18n("repo.settings.lfs")}</a> / <span className="truncate sha">{props.lFSFile?.oid as any}</span>
				<div className="ui right">
					{(props.escapeStatus?.escaped) ? (<>
						<a className="ui tiny basic button unescape-button tw-hidden">{i18n("repo.unescape_control_characters")}</a>
						<a className="ui tiny basic button escape-button">{i18n("repo.escape_control_characters")}</a>
					</>) : null}
					<a className="ui primary tiny button" href={`${String(props.lFSFilesLink ?? "")}/find?oid=${String(props.lFSFile?.oid ?? "")}&size=${String(props.lFSFile?.size ?? "")}`}>{i18n("repo.settings.lfs_findcommits")}</a>
				</div>
			</h4>
			<div className="ui bottom attached table unstackable segment">
				{/* template: repo/unicode_escape_prompt */}
				<div className={`file-view ${(props.isPlainText) ? `plain-textcode-view` : ""}`}>
					{(props.isFileTooLarge) ? (<>
						{/* template: shared/filetoolarge */}
					</>) : null} {(!(props.fileSize)) ? (<>
						{/* template: shared/fileisempty */}
					</>) : null} {(!(props.isTextFile)) ? (<>
						<div className="view-raw">
							{(props.isImageFile) ? (<>
								<img loading="lazy" alt={String(props.rawFileLink ?? "")} src={String(props.rawFileLink ?? "")} />
							</>) : null} {(props.isVideoFile) ? (<>
								<video controls src={String(props.rawFileLink ?? "")}>
									<strong>{i18n("repo.video_not_supported_in_browser")}</strong>
								</video>
							</>) : null} {(props.isAudioFile) ? (<>
								<audio controls src={String(props.rawFileLink ?? "")}>
									<strong>{i18n("repo.audio_not_supported_in_browser")}</strong>
								</audio>
							</>) : (<>
								<a href={String(props.rawFileLink ?? "")} rel="nofollow" className="tw-p-4">{i18n("repo.file_view_raw")}</a>
							</>)}
						</div>
					</>) : null} {(props.fileSize) ? (<>
						<table>
							<tbody>
								<tr>
									<td className="lines-num">{props.lineNums as any}</td>
									<td className="lines-code"><pre>{props.fileContent as any}</pre></td>
								</tr>
							</tbody>
						</table>
					</>) : null}
				</div>
			</div>
		</div>
	</div>
{/* template: repo/settings/layout_footer */}

  </>)
}
