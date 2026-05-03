// @ts-nocheck
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
			<td colSpan="7" className="lines-code lines-code-old">
				{/* $inlineDiff */}
				{/* template: repo/diff/section_code */}
			</td>
		</>) : (<>
			{/* $inlineDiff */}
			<td className="lines-num lines-num-old" data-line-num={`${(props.line?.leftIdx) ? `` : ""}`}><span rel={`${(props.line?.leftIdx) ? `diff-${String(props.fileNameHash ?? "")}L` : ""}`}></span></td>
			<td className="lines-escape lines-escape-old">{(item.line?.leftIdx) ? (<>{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $inlineDiff.EscapeStatus}} */}</>) : null}</td>
			<td className="lines-type-marker lines-type-marker-old">{(item.line?.leftIdx) ? (<><span className="tw-font-mono" data-type-marker=""></span></>) : null}</td>
			<td className="lines-code lines-code-old">
				{/* ATTENTION: BLOB-EXCERPT-COMMENT-RIGHT: here it intentionally use "right" side to comment, because the backend code depends on the assumption that the comment only happens on right side */}
				{((props.canCreateComment && item.line?.rightIdx)) ? (<>
					<button type="button" aria-label={String(i18n("repo.diff.comment.add_line_comment") ?? "")} className={`ui primary button add-code-comment add-code-comment-right${(!(props.line?.canComment)) ? ` tw-invisible` : ""}`} data-side="right" data-idx={String("" ?? "")}>
						<span className="svg-icon" aria-label="octicon-plus"></span>
					</button>
				</>) : null}
				{(item.line?.leftIdx) ? (<>
					{/* template: repo/diff/section_code */}
				</>) : (<>
					<code className="code-inner"></code>
				</>)}
			</td>
			<td className="lines-num lines-num-new" data-line-num={`${(props.line?.rightIdx) ? `` : ""}`}><span rel={`${(props.line?.rightIdx) ? `diff-${String(props.fileNameHash ?? "")}R` : ""}`}></span></td>
			<td className="lines-escape lines-escape-new">{((item.line?.rightIdx)) ? (<>{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $inlineDiff.EscapeStatus}} */}</>) : null}</td>
			<td className="lines-type-marker lines-type-marker-new">{(item.line?.rightIdx) ? (<><span className="tw-font-mono" data-type-marker=""></span></>) : null}</td>
			<td className="lines-code lines-code-new">
				{((props.canCreateComment && item.line?.rightIdx)) ? (<>
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
	{(item.line?.comments) ? (<>
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
	</React.Fragment>))}
</>) : (<>
	{((props.section?.lines) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	<tr className={`${String(props.getHTMLDiffLineType ?? "")}-code nl- ol- line-expanded`} data-line-type={String(props.getHTMLDiffLineType ?? "")}>
		{(item.getType === 4) ? (<>
			<td colSpan="2" className="lines-num">{/* TODO: {{$line.RenderBlobExcerptButtons $.FileNameHash $diffBlobExcerptData}} */}</td>
		</>) : (<>
			<td className="lines-num lines-num-old" data-line-num={`${(props.line?.leftIdx) ? `` : ""}`}><span rel={`${(props.line?.leftIdx) ? `diff-${String(props.fileNameHash ?? "")}L` : ""}`}></span></td>
			<td className="lines-num lines-num-new" data-line-num={`${(props.line?.rightIdx) ? `` : ""}`}><span rel={`${(props.line?.rightIdx) ? `diff-${String(props.fileNameHash ?? "")}R` : ""}`}></span></td>
		</>)}
		{/* $inlineDiff */}
		<td className="lines-escape">{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $inlineDiff.EscapeStatus}} */}</td>
		<td className="lines-type-marker"><span className="tw-font-mono" data-type-marker={String("" ?? "")}></span></td>
		<td className={`lines-code${(!(props.line?.rightIdx)) ? ` lines-code-old` : ""}`}>
			{((props.canCreateComment)) ? (<>
				<button type="button" aria-label={String(i18n("repo.diff.comment.add_line_comment") ?? "")} className={`ui primary button add-code-comment add-code-comment-${(props.line?.rightIdx) ? `right` : `left`}${(!(props.line?.canComment)) ? ` tw-invisible` : ""}`} data-side={`${(props.line?.rightIdx) ? `right` : `left`}`} data-idx={`${(props.line?.rightIdx) ? `` : ``}`}>
					<span className="svg-icon" aria-label="octicon-plus"></span>
				</button>
			</>) : null}
			<code className={`code-inner ${(props.inlineDiff?.escapeStatus?.escaped) ? `has-escaped` : ""}`}>{/* TODO: {{$inlineDiff.Content}} */}</code>
		</td>
	</tr>
	{(item.line?.comments) ? (<>
		<tr className="add-comment" data-line-type={String(props.getHTMLDiffLineType ?? "")}>
			<td className="add-comment-left add-comment-right" colSpan="5">
				{/* template: repo/diff/conversation */}
			</td>
		</tr>
	</>) : null}
	</React.Fragment>))}
</>)}

  </>)
}
