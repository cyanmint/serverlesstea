// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Searchfile(props: Record<string, unknown>) {
  return (<>
<div className="file-body file-code code-view">
	<table>
		<tbody>
			{((props.searchResult?.lines) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<tr>
					<td className="lines-num">
						<a href={`${String(props.repoLink ?? "")}/src/commit//#L${String(props.num ?? "")}`}><span>{item.num as any}</span></a>
					</td>
					<td className="lines-code chroma"><code className="code-inner">{item.formattedContent as any}</code></td>
				</tr>
			</React.Fragment>))}
		</tbody>
	</table>
</div>

  </>)
}
