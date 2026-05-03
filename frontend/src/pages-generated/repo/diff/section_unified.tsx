// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function SectionUnified(props: Record<string, unknown>) {
  return (<>
{/* $file */}
{/* this tmpl is also used by the PR Conversation page, so "DiffBlobExcerptData" may not exist */}
{/* $diffBlobExcerptData */}
<colgroup>
	<col width="50" />
	<col width="50" />
	<col width="10" />
	<col width="10" />
	<col />
</colgroup>
{(($file.Sections) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	{(($section.Lines) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<tr className={`${String(props.getHTMLDiffLineType ?? "")}-code nl- ol-`} data-line-type={String(props.getHTMLDiffLineType ?? "")}>
			{(item.getType === 4) ? (<>
				{(props.diffBlobExcerptData) ? (<>
					<td colSpan="2" className="lines-num">{/* TODO: {{$line.RenderBlobExcerptButtons $file.NameHash $diffBlobExcerptData}} */}</td>
				</>) : (<>
					{/* when DiffBlobExcerptData is not available (code file preview, pull conversation diff comment), do not show the expansion arrows */}
					<td colSpan="2" className="lines-num"></td>
				</>)}
			</>) : (<>
				<td className="lines-num lines-num-old" data-line-num={`${(props.line?.leftIdx) ? `` : ""}`}><span rel={`${(props.line?.leftIdx) ? `diff-L` : ""}`}></span></td>
				<td className="lines-num lines-num-new" data-line-num={`${(props.line?.rightIdx) ? `` : ""}`}><span rel={`${(props.line?.rightIdx) ? `diff-R` : ""}`}></span></td>
			</>)}
			{/* $inlineDiff */}
			<td className="lines-escape">
				{/* TODO: {{ctx.RenderUtils.RenderUnicodeEscapeToggleButton $inlineDiff.EscapeStatus}} */}
			</td>
			<td className="lines-type-marker"><span className="tw-font-mono" data-type-marker={String("" ?? "")}></span></td>
			{(item.getType === 4) ? (<>
				<td className="chroma lines-code blob-hunk">{/* template: repo/diff/section_code */}</td>
			</>) : (<>
				<td className={`chroma lines-code${(!(props.line?.rightIdx)) ? ` lines-code-old` : ""}`}>
					{((props.root?.signedUserID && props.root?.pageIsPullFiles)) ? (<>
						<button type="button" aria-label={String(i18n("repo.diff.comment.add_line_comment") ?? "")} className={`ui primary button add-code-comment add-code-comment-${(props.line?.rightIdx) ? `right` : `left`}${(!(props.line?.canComment)) ? ` tw-invisible` : ""}`} data-side={`${(props.line?.rightIdx) ? `right` : `left`}`} data-idx={`${(props.line?.rightIdx) ? `` : ``}`}>
							<span className="svg-icon" aria-label="octicon-plus"></span>
						</button>
					</>) : null}
					{/* template: repo/diff/section_code */}
				</td>
			</>)}
		</tr>
		{(item.line?.comments) ? (<>
			<tr className="add-comment" data-line-type={String(props.getHTMLDiffLineType ?? "")}>
				<td className="add-comment-left add-comment-right" colSpan="5">
					{/* template: repo/diff/conversation */}
				</td>
			</tr>
		</>) : null}
	</React.Fragment>))}
</React.Fragment>))}

  </>)
}
