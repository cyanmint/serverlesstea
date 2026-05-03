import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Attachments(props: Record<string, unknown>) {
  return (<>
<div className="dropzone-attachments">
	{(props.attachments) ? (<>
		<div className="divider"></div>
	</>) : null}
	{/* $hasThumbnails */}
	{/* TODO: {{- range .Attachments -}} */}
		<div className="tw-flex">
			<div className="tw-flex-1 tw-p-2">
				<a target="_blank" href={String(props.downloadURL ?? "")} title={String(i18n("repo.issues.attachment.open_tab") ?? "")}>
					{("FilenameIsImage .Name") ? (<>
						{(!("StringUtils.Contains (StringUtils.ToString $.RenderedContent) .UUID")) ? (<>
							{/* TODO: {{$hasThumbnails = true}} */}
						</>) : null}
						<span className="svg-icon" aria-label="octicon-file"></span>
					</>) : (<>
						<span className="svg-icon" aria-label="octicon-desktop-download"></span>
					</>)}
					<span><strong>{props.name as any}</strong></span>
				</a>
			</div>
			<div className="flex-text-block tw-p-2">
				<span className="ui tw-text-text-light">{props.size?.("|", "FileSize") as any}</span>
			</div>
		</div>
	{/* TODO: {{end -}} */}

	{(hasThumbnails) ? (<>
		<div className="divider"></div>
		<div className="ui small thumbnails">
			{/* TODO: {{- range .Attachments -}} */}
				{("FilenameIsImage .Name") ? (<>
					{(!("StringUtils.Contains (StringUtils.ToString $.RenderedContent) .UUID")) ? (<>
					<a target="_blank" href={String(props.downloadURL ?? "")}>
						<img loading="lazy" alt={String(props.name ?? "")} src={String(props.downloadURL ?? "")} title={String(i18n("repo.issues.attachment.open_tab") ?? "")} />
					</a>
					</>) : null}
				</>) : null}
			{/* TODO: {{end -}} */}
		</div>
	</>) : null}

</div>

  </>)
}
