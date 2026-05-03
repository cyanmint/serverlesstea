import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Swift(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "swift") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.swift.registry")}</label>
				<div className="markup"><pre className="code-block"><code>swift package-registry set {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/swift</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-code"></span> {i18n("packages.swift.install")}</label>
				<div className="markup"><pre className="code-block"><code>dependencies: [
	.package(id: "{props.packageDescriptor?.package?.name as any}", from:"{props.packageDescriptor?.version?.version as any}")
]</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.swift.install2")}</label>
				<div className="markup"><pre className="code-block"><code>swift package resolve</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>

	{(props.packageDescriptor?.metadata?.description) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		<div className="ui attached segment">
			{(props.packageDescriptor?.metadata?.description) ? (<>{props.packageDescriptor?.metadata?.description as any}</>) : null}
		</div>
	</>) : null}

	{(props.packageDescriptor?.metadata?.keywords) ? (<>
		<h4 className="ui top attached header">{i18n("packages.keywords")}</h4>
		<div className="ui attached segment">
			{((props.packageDescriptor?.metadata?.keywords) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				{item as any}
			</React.Fragment>))}
		</div>
	</>) : null}
</>) : null}

  </>)
}
