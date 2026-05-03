// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function FileInfo(props: Record<string, unknown>) {
  return (<>
<div className="file-info tw-font-mono">
	{(props.fileIsSymlink) ? (<>
		<div className="file-info-entry">
			{i18n("repo.symbolic_link")}
		</div>
	</>) : null}
	{(props.numLines !== null) ? (<>
		<div className="file-info-entry">
			{props.numLines as any} {/* TODO: {{ctx.Locale.TrN .NumLines "repo.line" "repo.lines"}} */}
		</div>
	</>) : null}
	{(props.fileSize !== null) ? (<>
		<div className="file-info-entry">
			<span className="file-info-size">{/* TODO: {{FileSize .FileSize}} */}</span>{(props.isLFSFile) ? (<><span className="ui label">LFS</span></>) : null}
		</div>
	</>) : null}
	{(props.lFSLock) ? (<>
		<div className="file-info-entry" data-tooltip-content={String(props.lFSLockHint ?? "")}>
			<span className="svg-icon" aria-label="octicon-lock"></span>
			<a href={String(props.lFSLockOwnerHomeLink ?? "")}>{props.lFSLockOwner as any}</a>
		</div>
	</>) : null}
	{(props.lexerName) ? (<>
		<div className="file-info-entry">
			{props.lexerName as any}
		</div>
	</>) : null}
	{(props.isExecutable) ? (<>
		<div className="file-info-entry">
			{i18n("repo.executable_file")}
		</div>
	</>) : null}
	{(props.isVendored) ? (<>
		<div className="file-info-entry">
			{i18n("repo.vendored")}
		</div>
	</>) : null}
	{(props.isGenerated) ? (<>
		<div className="file-info-entry">
			{i18n("repo.generated")}
		</div>
	</>) : null}
	{(props.imageSize) ? (<>
		<div className="file-info-entry">
			{props.imageSize as any}
		</div>
	</>) : null}
</div>

  </>)
}
