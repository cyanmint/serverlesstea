import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function NpmDependencies(props: Record<string, unknown>) {
  return (<>
{(props.dependencies) ? (<>
<p><strong>{props.title as any}</strong></p>
<table className="ui single line very basic table">
	<thead>
		<tr>
			<th className="eleven wide">{i18n("packages.dependency.id")}</th>
			<th className="five wide">{i18n("packages.dependency.version")}</th>
		</tr>
	</thead>
	<tbody>
		{((props.dependencies) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<tr>
			<td>{/* $dependency */}</td>
			<td>{/* $version */}</td>
		</tr>
		</React.Fragment>))}
	</tbody>
</table>
</>) : null}

  </>)
}
