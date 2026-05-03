import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function SectionSplit(props: Record<string, unknown>) {
  return (<>
{/* $file */}
{/* $diffBlobExcerptData */}
<colgroup>
	<col width="50">
	<col width="10">
	<col width="10">
	<col>
	<col width="50">
	<col width="10">
	<col width="10">
	<col>
</colgroup>
{(($file.Sections) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	{(($section.Lines) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		{/* $hasmatch */}
		{((item.getType !== 2 || !("$hasmatch"))) ? (<>
			<tr className={`${String(props.getHTMLDiffLineType ?? "")}-code nl- ol-`} data-line-type={String(props.getHTMLDiffLineType ?? "")}>
				{(item.getType === 4) ? (<>
					{/* $inlineDiff */}
					<td className="lines-num lines-num-old">{/* TODO: {{$line.RenderBlobExcerptButtons $file.NameHash $diffBlobExcerptData}} */}</td>
					<td className="lines-escape lines-escape-old">{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $inlineDiff.EscapeStatus}} */}</td>
					<td colspan="6" className="lines-code lines-code-old">{/* template: repo/diff/section_code */}</td>
				</>) : null} {((item.getType === 3 && "$hasmatch")) ? (<>{/* DEL */}
					{/* $match */}
					{/* TODO: {{- $leftDiff := ""}} */}{("$line.LeftIdx") ? (<>{/* TODO: {{$leftDiff = $section.GetComputedInlineDiffFor $line ctx.Locale}} */}</>) : null}
					{/* TODO: {{- $rightDiff := ""}} */}{("$match.RightIdx") ? (<>{/* TODO: {{$rightDiff = $section.GetComputedInlineDiffFor $match ctx.Locale}} */}</>) : null}
					<td className="lines-num lines-num-old del-code" data-line-num={String("" ?? "")}><span rel={`diff-L`}></span></td>
					<td className="lines-escape del-code lines-escape-old">{("$line.LeftIdx") ? (<>{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $leftDiff.EscapeStatus}} */}</>) : null}</td>
					<td className="lines-type-marker lines-type-marker-old del-code"><span className="tw-font-mono" data-type-marker={String("" ?? "")}></span></td>
					<td className="lines-code lines-code-old del-code">
						{/* TODO: {{- if and $.root.SignedUserID $.root.PageIsPullFiles -}} */}
							<button type="button" aria-label={String(i18n("repo.diff.comment.add_line_comment") ?? "")} className={`ui primary button add-code-comment add-code-comment-left${(!("$line.CanComment")) ? ` tw-invisible` : ""}`} data-side="left" data-idx={String("" ?? "")}>
								{/* TODO: {{- svg "octicon-plus" -}} */}
							</button>
						{/* TODO: {{- end -}} */}
						{/* TODO: {{- if $line.LeftIdx -}} */}
							{/* TODO: {{- template "repo/diff/section_code" dict "diff" $leftDiff -}} */}
						{/* TODO: {{- else -}} */}
							<code className="code-inner"></code>
						{/* TODO: {{- end -}} */}
					</td>
					<td className="lines-num lines-num-new add-code" data-line-num={`${("$match.RightIdx") ? `` : ""}`}><span rel={`${("$match.RightIdx") ? `diff-R` : ""}`}></span></td>
					<td className="lines-escape add-code lines-escape-new">{("$match.RightIdx") ? (<>{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $rightDiff.EscapeStatus}} */}</>) : null}</td>
					<td className="lines-type-marker lines-type-marker-new add-code">{("$match.RightIdx") ? (<><span className="tw-font-mono" data-type-marker={String("" ?? "")}></span></>) : null}</td>
					<td className="lines-code lines-code-new add-code">
						{/* TODO: {{- if and $.root.SignedUserID $.root.PageIsPullFiles -}} */}
							<button type="button" aria-label={String(i18n("repo.diff.comment.add_line_comment") ?? "")} className={`ui primary button add-code-comment add-code-comment-right${(!("$match.CanComment")) ? ` tw-invisible` : ""}`} data-side="right" data-idx={String("" ?? "")}>
								{/* TODO: {{- svg "octicon-plus" -}} */}
							</button>
						{/* TODO: {{- end -}} */}
						{/* TODO: {{- if $match.RightIdx -}} */}
							{/* TODO: {{- template "repo/diff/section_code" dict "diff" $rightDiff -}} */}
						{/* TODO: {{- else -}} */}
							<code className="code-inner"></code>
						{/* TODO: {{- end -}} */}
					</td>
				</>) : (<>
					{/* $inlineDiff */}
					<td className="lines-num lines-num-old" data-line-num={`${("$line.LeftIdx") ? `` : ""}`}><span rel={`${("$line.LeftIdx") ? `diff-L` : ""}`}></span></td>
					<td className="lines-escape lines-escape-old">{("$line.LeftIdx") ? (<>{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $inlineDiff.EscapeStatus}} */}</>) : null}</td>
					<td className="lines-type-marker lines-type-marker-old">{("$line.LeftIdx") ? (<><span className="tw-font-mono" data-type-marker={String("" ?? "")}></span></>) : null}</td>
					<td className="lines-code lines-code-old">
						{/* TODO: {{- if and $.root.SignedUserID $.root.PageIsPullFiles (not (eq .GetType 2)) -}} */}
							<button type="button" aria-label={String(i18n("repo.diff.comment.add_line_comment") ?? "")} className={`ui primary button add-code-comment add-code-comment-left${(!("$line.CanComment")) ? ` tw-invisible` : ""}`} data-side="left" data-idx={String("" ?? "")}>
								{/* TODO: {{- svg "octicon-plus" -}} */}
							</button>
						{/* TODO: {{- end -}} */}
						{/* TODO: {{- if $line.LeftIdx -}} */}
							{/* TODO: {{- template "repo/diff/section_code" dict "diff" $inlineDiff -}} */}
						{/* TODO: {{- else -}} */}
							<code className="code-inner"></code>
						{/* TODO: {{- end -}} */}
					</td>
					<td className="lines-num lines-num-new" data-line-num={`${("$line.RightIdx") ? `` : ""}`}><span rel={`${("$line.RightIdx") ? `diff-R` : ""}`}></span></td>
					<td className="lines-escape lines-escape-new">{("$line.RightIdx") ? (<>{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $inlineDiff.EscapeStatus}} */}</>) : null}</td>
					<td className="lines-type-marker lines-type-marker-new">{("$line.RightIdx") ? (<><span className="tw-font-mono" data-type-marker={String("" ?? "")}></span></>) : null}</td>
					<td className="lines-code lines-code-new">
						{/* TODO: {{- if and $.root.SignedUserID $.root.PageIsPullFiles (not (eq .GetType 3)) -}} */}
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
			{((item.getType === 3 && "$hasmatch")) ? (<>
				{/* $match */}
				{(("$line.Comments" || "$match.Comments")) ? (<>
					<tr className="add-comment" data-line-type={String(props.getHTMLDiffLineType ?? "")}>
						<td className="add-comment-left" colspan="4">
							{("$line.Comments") ? (<>
								{("$line.GetCommentSide" === "previous") ? (<>
									{/* template: repo/diff/conversation */}
								</>) : null}
							</>) : null}
							{("$match.Comments") ? (<>
								{("$match.GetCommentSide" === "previous") ? (<>
									{/* template: repo/diff/conversation */}
								</>) : null}
							</>) : null}
						</td>
						<td className="add-comment-right" colspan="4">
							{("$line.Comments") ? (<>
								{("$line.GetCommentSide" === "proposed") ? (<>
									{/* template: repo/diff/conversation */}
								</>) : null}
							</>) : null}
							{("$match.Comments") ? (<>
								{("$match.GetCommentSide" === "proposed") ? (<>
									{/* template: repo/diff/conversation */}
								</>) : null}
							</>) : null}
						</td>
					</tr>
				</>) : null}
			</>) : null} {("$line.Comments") ? (<>
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
		</>) : null}
	</React.Fragment>))}
</React.Fragment>))}

  </>)
}
