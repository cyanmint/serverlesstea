// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function CsvDiff(props: Record<string, unknown>) {
  return (<>
<tr>
	<td>
		{/* $result */}
		{(props.result?.error) ? (<>
			<div className="ui center">{/* TODO: {{$result.Error}} */}</div>
		</>) : null} {(props.result?.sections) ? (<>
			<table className="data-table">
			{(($result.Sections) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<tbody {...(props.i > 0 ? {"className": "section"} : {})}>
				{(($section.Rows) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<tr>
						{((props.i === 0 && props.j === 0)) ? (<>
							<th className="line-num">{item.rowIdx as any}</th>
							{(($row.Cells) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								{(!(props.cell)) ? (<>
									<th></th>
								</>) : null} {(item.cell?.type === 2) ? (<>
									<th className="modified"><span className="removed-code">{item.leftCell as any}</span> <span className="added-code">{item.rightCell as any}</span></th>
								</>) : null} {(item.cell?.type === 3) ? (<>
									<th className="added"><span className="added-code">{item.rightCell as any}</span></th>
								</>) : null} {(item.cell?.type === 4) ? (<>
									<th className="removed"><span className="removed-code">{item.leftCell as any}</span></th>
								</>) : null} {(item.cell?.type === 5) ? (<>
									<th className="moved">{item.rightCell as any}</th>
								</>) : null} {(item.cell?.type === 6) ? (<>
									<th className="moved"><span className="removed-code">{item.leftCell as any}</span> <span className="added-code">{item.rightCell as any}</span></th>
								</>) : (<>
									<th>{item.rightCell as any}</th>
								</>)}
							</React.Fragment>))}
						</>) : (<>
							<td className="line-num">{(item.rowIdx) ? (<>{item.rowIdx as any}</>) : null}</td>
							{(($row.Cells) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								{(!(props.cell)) ? (<>
									<td></td>
								</>) : null} {(item.cell?.type === 2) ? (<>
									<td className="modified"><span className="removed-code">{item.leftCell as any}</span> <span className="added-code">{item.rightCell as any}</span></td>
								</>) : null} {(item.cell?.type === 3) ? (<>
									<td className="added"><span className="added-code">{item.rightCell as any}</span></td>
								</>) : null} {(item.cell?.type === 4) ? (<>
									<td className="removed"><span className="removed-code">{item.leftCell as any}</span></td>
								</>) : null} {(item.cell?.type === 5) ? (<>
									<td className="moved">{item.rightCell as any}</td>
								</>) : null} {(item.cell?.type === 6) ? (<>
									<td className="moved"><span className="removed-code">{item.leftCell as any}</span> <span className="added-code">{item.rightCell as any}</span></td>
								</>) : (<>
									<td>{item.rightCell as any}</td>
								</>)}
							</React.Fragment>))}
						</>)}
					</tr>
				</React.Fragment>))}
				</tbody>
			</React.Fragment>))}
			</table>
		</>) : null}
	</td>
</tr>

  </>)
}
