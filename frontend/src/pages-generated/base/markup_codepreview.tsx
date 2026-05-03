import React from 'react'
import { i18n } from '../../lib/i18n'

export default function MarkupCodepreview(props: Record<string, unknown>) {
  return (<>
<div className="code-preview-container file-content">
	<div className="code-preview-header">
		<a href={String(props.fullURL ?? "")} className="tw-font-semibold" rel="nofollow">{props.repoName as any}/{props.filePath as any}</a>
		{/* $link */}
		{/* TODO: {{- if eq .LineStart .LineStop -}} */}
			{i18n("repo.code_preview_line_in")}
		{/* TODO: {{- else -}} */}
			{i18n("repo.code_preview_line_from_to")}
		{/* TODO: {{- end}} */}
	</div>
	<table className="file-view">
		<tbody>
			{/* TODO: {{- range $idx, $line := .HighlightLines -}} */}
			<tr>
				<td className="lines-num"><span data-line-number={String("" ?? "")}></span></td>
				{/* TODO: {{- ctx.RenderUtils.RenderUnicodeEscapeToggleTd $.EscapeStatus (index $.LineEscapeStatus $idx)}} */}
				<td className="lines-code chroma"><div className="code-inner">{/* TODO: {{$line.FormattedContent}} */}</div></td>{/* only div works, span generates incorrect HTML structure */}
			</tr>
			{/* TODO: {{- end -}} */}
		</tbody>
	</table>
</div>

  </>)
}
