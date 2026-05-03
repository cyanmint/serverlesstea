// @ts-nocheck
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
		{((item.getType !== 2 || !(props.hasmatch))) ? (<>
			<tr className={`${String(props.getHTMLDiffLineType ?? "")}-code nl- ol-`} data-line-type={String(props.getHTMLDiffLineType ?? "")}>
				{(item.getType === 4) ? (<>
					{/* $inlineDiff */}
					<td className="lines-num lines-num-old">{/* TODO: {{$line.RenderBlobExcerptButtons $file.NameHash $diffBlobExcerptData}} */}</td>
					<td className="lines-escape lines-escape-old">{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $inlineDiff.EscapeStatus}} */}</td>
					<td colSpan="6" className="lines-code lines-code-old">{/* template: repo/diff/section_code */}</td>
				</>) : null} {((item.getType === 3 && props.hasmatch)) ? (<>{/* DEL */}
					{/* $match */}
					{/* $leftDiff */}{(item.line?.leftIdx) ? (<>{/* TODO: {{$leftDiff = $section.GetComputedInlineDiffFor $line ctx.Locale}} */}</>) : null}
					{/* $rightDiff */}{(item.match?.rightIdx) ? (<>{/* TODO: {{$rightDiff = $section.GetComputedInlineDiffFor $match ctx.Locale}} */}</>) : null}
					<td className="lines-num lines-num-old del-code" data-line-num={String("" ?? "")}><span rel={`diff-L`}></span></td>
					<td className="lines-escape del-code lines-escape-old">{(item.line?.leftIdx) ? (<>{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $leftDiff.EscapeStatus}} */}</>) : null}</td>
					<td className="lines-type-marker lines-type-marker-old del-code"><span className="tw-font-mono" data-type-marker={String("" ?? "")}></span></td>
					<td className="lines-code lines-code-old del-code">
						{((props.root?.signedUserID && props.root?.pageIsPullFiles)) ? (<>
							<button type="button" aria-label={String(i18n("repo.diff.comment.add_line_comment") ?? "")} className={`ui primary button add-code-comment add-code-comment-left${(!(props.line?.canComment)) ? ` tw-invisible` : ""}`} data-side="left" data-idx={String("" ?? "")}>
								<span className="svg-icon" aria-label="octicon-plus"></span>
							</button>
						</>) : null}
						{(item.line?.leftIdx) ? (<>
							{/* template: repo/diff/section_code */}
						</>) : (<>
							<code className="code-inner"></code>
						</>)}
					</td>
					<td className="lines-num lines-num-new add-code" data-line-num={`${(props.match?.rightIdx) ? `` : ""}`}><span rel={`${(props.match?.rightIdx) ? `diff-R` : ""}`}></span></td>
					<td className="lines-escape add-code lines-escape-new">{(item.match?.rightIdx) ? (<>{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $rightDiff.EscapeStatus}} */}</>) : null}</td>
					<td className="lines-type-marker lines-type-marker-new add-code">{(item.match?.rightIdx) ? (<><span className="tw-font-mono" data-type-marker={String("" ?? "")}></span></>) : null}</td>
					<td className="lines-code lines-code-new add-code">
						{((props.root?.signedUserID && props.root?.pageIsPullFiles)) ? (<>
							<button type="button" aria-label={String(i18n("repo.diff.comment.add_line_comment") ?? "")} className={`ui primary button add-code-comment add-code-comment-right${(!(props.match?.canComment)) ? ` tw-invisible` : ""}`} data-side="right" data-idx={String("" ?? "")}>
								<span className="svg-icon" aria-label="octicon-plus"></span>
							</button>
						</>) : null}
						{(item.match?.rightIdx) ? (<>
							{/* template: repo/diff/section_code */}
						</>) : (<>
							<code className="code-inner"></code>
						</>)}
					</td>
				</>) : (<>
					{/* $inlineDiff */}
					<td className="lines-num lines-num-old" data-line-num={`${(props.line?.leftIdx) ? `` : ""}`}><span rel={`${(props.line?.leftIdx) ? `diff-L` : ""}`}></span></td>
					<td className="lines-escape lines-escape-old">{(item.line?.leftIdx) ? (<>{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $inlineDiff.EscapeStatus}} */}</>) : null}</td>
					<td className="lines-type-marker lines-type-marker-old">{(item.line?.leftIdx) ? (<><span className="tw-font-mono" data-type-marker={String("" ?? "")}></span></>) : null}</td>
					<td className="lines-code lines-code-old">
						{((props.root?.signedUserID && props.root?.pageIsPullFiles && !(item.getType === 2))) ? (<>
							<button type="button" aria-label={String(i18n("repo.diff.comment.add_line_comment") ?? "")} className={`ui primary button add-code-comment add-code-comment-left${(!(props.line?.canComment)) ? ` tw-invisible` : ""}`} data-side="left" data-idx={String("" ?? "")}>
								<span className="svg-icon" aria-label="octicon-plus"></span>
							</button>
						</>) : null}
						{(item.line?.leftIdx) ? (<>
							{/* template: repo/diff/section_code */}
						</>) : (<>
							<code className="code-inner"></code>
						</>)}
					</td>
					<td className="lines-num lines-num-new" data-line-num={`${(props.line?.rightIdx) ? `` : ""}`}><span rel={`${(props.line?.rightIdx) ? `diff-R` : ""}`}></span></td>
					<td className="lines-escape lines-escape-new">{(item.line?.rightIdx) ? (<>{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $inlineDiff.EscapeStatus}} */}</>) : null}</td>
					<td className="lines-type-marker lines-type-marker-new">{(item.line?.rightIdx) ? (<><span className="tw-font-mono" data-type-marker={String("" ?? "")}></span></>) : null}</td>
					<td className="lines-code lines-code-new">
						{((props.root?.signedUserID && props.root?.pageIsPullFiles && !(item.getType === 3))) ? (<>
							<button type="button" aria-label={String(i18n("repo.diff.comment.add_line_comment") ?? "")} className={`ui primary button add-code-comment add-code-comment-right${(!(props.line?.canComment)) ? ` tw-invisible` : ""}`} data-side="right" data-idx={String("" ?? "")}>
								<span className="svg-icon" aria-label="octicon-plus"></span>
							</button>
						</>) : null}
						{(item.line?.rightIdx) ? (<>
							{/* template: repo/diff/section_code */}
						</>) : (<>
							<code className="code-inner"></code>
						</>)}
					</td>
				</>)}
			</tr>
			{((item.getType === 3 && props.hasmatch)) ? (<>
				{/* $match */}
				{((item.line?.comments || item.match?.comments)) ? (<>
					<tr className="add-comment" data-line-type={String(props.getHTMLDiffLineType ?? "")}>
						<td className="add-comment-left" colSpan="4">
							{(item.line?.comments) ? (<>
								{(item.line?.getCommentSide === "previous") ? (<>
									{/* template: repo/diff/conversation */}
								</>) : null}
							</>) : null}
							{(item.match?.comments) ? (<>
								{(item.match?.getCommentSide === "previous") ? (<>
									{/* template: repo/diff/conversation */}
								</>) : null}
							</>) : null}
						</td>
						<td className="add-comment-right" colSpan="4">
							{(item.line?.comments) ? (<>
								{(item.line?.getCommentSide === "proposed") ? (<>
									{/* template: repo/diff/conversation */}
								</>) : null}
							</>) : null}
							{(item.match?.comments) ? (<>
								{(item.match?.getCommentSide === "proposed") ? (<>
									{/* template: repo/diff/conversation */}
								</>) : null}
							</>) : null}
						</td>
					</tr>
				</>) : null}
			</>) : null} {(item.line?.comments) ? (<>
				<tr className="add-comment" data-line-type={String(props.getHTMLDiffLineType ?? "")}>
					<td className="add-comment-left" colSpan="4">
						{(item.line?.getCommentSide === "previous") ? (<>
							{/* template: repo/diff/conversation */}
						</>) : null}
					</td>
					<td className="add-comment-right" colSpan="4">
						{(item.line?.getCommentSide === "proposed") ? (<>
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
