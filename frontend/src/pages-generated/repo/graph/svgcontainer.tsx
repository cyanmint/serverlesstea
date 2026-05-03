import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Svgcontainer(props: Record<string, unknown>) {
  return (<>
<div id="rel-container">
	<svg viewbox={`   `} width={`px`}>
		{((props.graph?.flows) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<g id={`flow-`} className={`flow-group flow-color- flow-color-16-`} data-flow={String("" ?? "")} data-color={String("" ?? "")}>
				<path d={`
					
						M   v 12 
					
						M   l -10 12 
					
						M   l 10 12 
					
						M   h 5 
					
						M   h 10 
					
				`} stroke-width="1" fill="none" id={`flow--path`} stroke-linecap="round"></path>
				{(($flow.Commits) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<circle className="flow-commit" cx={String("" ?? "")} cy={String("" ?? "")} r="2.5" stroke="none" id={`flow-commit-${String(props.rev ?? "")}`} data-rev={String(props.rev ?? "")}></circle>
				</React.Fragment>))}
			</g>
		</React.Fragment>))}
	</svg>
</div>

  </>)
}
