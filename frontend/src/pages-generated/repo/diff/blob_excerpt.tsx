import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function BlobExcerpt(props: Record<string, unknown>) {
  return (<>
{/* $diffBlobExcerptData */}
{/* $canCreateComment */}
{(props.isSplitStyle) ? (<>
	{((props.section?.lines) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	<tr className={`${String(props.getHTMLDiffLineType ?? "")}-code nl- ol- line-expanded`} data-line-type={String(props.getHTMLDiffLineType ?? "")}>
		{(item.getType === 4) ? (<>
			<td className="lines-num lines-num-old">{/* TODO: {{$line.RenderBlobExcerptButtons $.FileNameHash $diffBlobExcerptData}} */}</td>
			<td colspan="7" className="lines-code lines-code-old">
				{/* TODO: {{- $inlineDiff := $.section.GetComputedInlineDiffFor $line ctx.Locale -}} */}
				{/* TODO: {{- template "repo/diff/section_code" dict "diff" $inlineDiff -}} */}
			</td>
		</>) : (<>
			{/* $inlineDiff */}
			<td className="lines-num lines-num-old" data-line-num={`${("$line.LeftIdx") ? `` : ""}`}><span rel={`${("$line.LeftIdx") ? `diff-${String(props.fileNameHash ?? "")}L` : ""}`}></span></td>
			<td className="lines-escape lines-escape-old">{("$line.LeftIdx") ? (<>{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $inlineDiff.EscapeStatus}} */}</>) : null}</td>
			<td className="lines-type-marker lines-type-marker-old">{("$line.LeftIdx") ? (<><span className="tw-font-mono" data-type-marker=""></span></>) : null}</td>
			<td className="lines-code lines-code-old">
				{/* ATTENTION: BLOB-EXCERPT-COMMENT-RIGHT: here it intentionally use "right" side to comment, because the backend code depends on the assumption that the comment only happens on right side */}
				{/* TODO: {{- if and $canCreateComment $line.RightIdx -}} */}
					<button type="button" aria-label={String(i18n("repo.diff.comment.add_line_comment") ?? "")} className={`ui primary button add-code-comment add-code-comment-right${(!("$line.CanComment")) ? ` tw-invisible` : ""}`} data-side="right" data-idx={String("" ?? "")}>
						{/* TODO: {{- svg "octicon-plus" -}} */}
					</button>
				{/* TODO: {{- end -}} */}
				{/* TODO: {{- if $line.LeftIdx -}} */}
					{/* TODO: {{- template "repo/diff/section_code" dict "diff" $inlineDiff -}} */}
				{/* TODO: {{- else -}} */}
					<code className="code-inner"></code>
				{/* TODO: {{- end -}} */}
			</td>
			<td className="lines-num lines-num-new" data-line-num={`${("$line.RightIdx") ? `` : ""}`}><span rel={`${("$line.RightIdx") ? `diff-${String(props.fileNameHash ?? "")}R` : ""}`}></span></td>
			<td className="lines-escape lines-escape-new">{(("$line.RightIdx")) ? (<>{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $inlineDiff.EscapeStatus}} */}</>) : null}</td>
			<td className="lines-type-marker lines-type-marker-new">{("$line.RightIdx") ? (<><span className="tw-font-mono" data-type-marker=""></span></>) : null}</td>
			<td className="lines-code lines-code-new">
				{/* TODO: {{- if and $canCreateComment $line.RightIdx -}} */}
					<button type="button" aria-label={String(i18n("repo.diff.comment.add_line_comment") ?? "")} className={`ui primary button add-code-comment add-code-comment-right${(!("$line.CanComment")) ? ` tw-invisible` : ""}`} data-side="right" data-idx={String("" ?? "")}>
						{/* TODO: {{- svg "octicon-plus" -}} */}
					</button>
				{/* TODO: {{- end -}} */}
				{/* TODO: {{- if $line.RightIdx -}} */}
					{/* TODO: {{- template "repo/diff/section_code" dict "diff" $inlineDiff -}} */}
				{/* TODO: {{- else -}} */}
					<code className="code-inner"></code>
				{/* TODO: {{- end -}} */}
			</td>
		</>)}
	</tr>
	{("$line.Comments") ? (<>
		<tr className="add-comment" data-line-type={String(props.getHTMLDiffLineType ?? "")}>
			<td className="add-comment-left" colspan="4">
				{("$line.GetCommentSide" === "previous") ? (<>
					{/* template: repo/diff/conversation */}
				</>) : null}
			</td>
			<td className="add-comment-right" colspan="4">
				{("$line.GetCommentSide" === "proposed") ? (<>
					{/* template: repo/diff/conversation */}
				</>) : null}
			</td>
		</tr>
	</>) : null}
	</React.Fragment>))}
</>) : (<>
	{((props.section?.lines) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	<tr className={`${String(props.getHTMLDiffLineType ?? "")}-code nl- ol- line-expanded`} data-line-type={String(props.getHTMLDiffLineType ?? "")}>
		{(item.getType === 4) ? (<>
			<td colspan="2" className="lines-num">{/* TODO: {{$line.RenderBlobExcerptButtons $.FileNameHash $diffBlobExcerptData}} */}</td>
		</>) : (<>
			<td className="lines-num lines-num-old" data-line-num={`${("$line.LeftIdx") ? `` : ""}`}><span rel={`${("$line.LeftIdx") ? `diff-${String(props.fileNameHash ?? "")}L` : ""}`}></span></td>
			<td className="lines-num lines-num-new" data-line-num={`${("$line.RightIdx") ? `` : ""}`}><span rel={`${("$line.RightIdx") ? `diff-${String(props.fileNameHash ?? "")}R` : ""}`}></span></td>
		</>)}
		{/* $inlineDiff */}
		<td className="lines-escape">{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $inlineDiff.EscapeStatus}} */}</td>
		<td className="lines-type-marker"><span className="tw-font-mono" data-type-marker={String("" ?? "")}></span></td>
		<td className={`lines-code${(!("$line.RightIdx")) ? ` lines-code-old` : ""}`}>
			{/* TODO: {{- if and $canCreateComment -}} */}
				<button type="button" aria-label={String(i18n("repo.diff.comment.add_line_comment") ?? "")} className={`ui primary button add-code-comment add-code-comment-${("$line.RightIdx") ? `right` : `left`}${(!("$line.CanComment")) ? ` tw-invisible` : ""}`} data-side={`${("$line.RightIdx") ? `right` : `left`}`} data-idx={`${("$line.RightIdx") ? `` : ``}`}>
					{/* TODO: {{- svg "octicon-plus" -}} */}
				</button>
			{/* TODO: {{- end -}} */}
			<code className={`code-inner ${("$inlineDiff.EscapeStatus.Escaped") ? `has-escaped` : ""}`}>{/* TODO: {{$inlineDiff.Content}} */}</code>
		</td>
	</tr>
	{("$line.Comments") ? (<>
		<tr className="add-comment" data-line-type={String(props.getHTMLDiffLineType ?? "")}>
			<td className="add-comment-left add-comment-right" colspan="5">
				{/* template: repo/diff/conversation */}
			</td>
		</tr>
	</>) : null}
	</React.Fragment>))}
</>)}

  </>)
}
