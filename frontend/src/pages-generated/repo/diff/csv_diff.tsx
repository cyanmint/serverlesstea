import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function CsvDiff(props: Record<string, unknown>) {
  return (<>
<tr>
	<td>
		{/* $result */}
		{("$result.Error") ? (<>
			<div className="ui center">{/* TODO: {{$result.Error}} */}</div>
		</>) : null} {("$result.Sections") ? (<>
			<table className="data-table">
			{(($result.Sections) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<tbody {("$i" > 0) ? (<>className="section"</>) : null}>
				{(($section.Rows) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<tr>
						{(("$i" === 0 && "$j" === 0)) ? (<>
							<th className="line-num">{item.rowIdx as any}</th>
							{(($row.Cells) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								{(!("$cell")) ? (<>
									<th></th>
								</>) : null} {("$cell.Type" === 2) ? (<>
									<th className="modified"><span className="removed-code">{item.leftCell as any}</span> <span className="added-code">{item.rightCell as any}</span></th>
								</>) : null} {("$cell.Type" === 3) ? (<>
									<th className="added"><span className="added-code">{item.rightCell as any}</span></th>
								</>) : null} {("$cell.Type" === 4) ? (<>
									<th className="removed"><span className="removed-code">{item.leftCell as any}</span></th>
								</>) : null} {("$cell.Type" === 5) ? (<>
									<th className="moved">{item.rightCell as any}</th>
								</>) : null} {("$cell.Type" === 6) ? (<>
									<th className="moved"><span className="removed-code">{item.leftCell as any}</span> <span className="added-code">{item.rightCell as any}</span></th>
								</>) : (<>
									<th>{item.rightCell as any}</th>
								</>)}
							</React.Fragment>))}
						</>) : (<>
							<td className="line-num">{(item.rowIdx) ? (<>{item.rowIdx as any}</>) : null}</td>
							{(($row.Cells) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								{(!("$cell")) ? (<>
									<td></td>
								</>) : null} {("$cell.Type" === 2) ? (<>
									<td className="modified"><span className="removed-code">{item.leftCell as any}</span> <span className="added-code">{item.rightCell as any}</span></td>
								</>) : null} {("$cell.Type" === 3) ? (<>
									<td className="added"><span className="added-code">{item.rightCell as any}</span></td>
								</>) : null} {("$cell.Type" === 4) ? (<>
									<td className="removed"><span className="removed-code">{item.leftCell as any}</span></td>
								</>) : null} {("$cell.Type" === 5) ? (<>
									<td className="moved">{item.rightCell as any}</td>
								</>) : null} {("$cell.Type" === 6) ? (<>
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
