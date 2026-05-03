import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Generic(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "generic") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.generic.download")}</label>
				<div className="markup"><pre className="code-block"><code>
{((props.packageDescriptor?.files) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
curl -OJ {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/generic/{props.packageDescriptor?.package?.name as any}/{props.packageDescriptor?.version?.version as any}/{item.file?.name as any}
</React.Fragment>))}
				</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>
</>) : null}

  </>)
}
