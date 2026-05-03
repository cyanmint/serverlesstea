import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Conda(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "conda") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-code"></span> {i18n("packages.conda.registry")}</label>
				<div className="markup"><pre className="code-block"><code>channel_alias: {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/conda
channels:
&#32;&#32;- {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/conda
default_channels:
&#32;&#32;- {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/conda</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.conda.install")}</label>
				{/* $channel */}
				<div className="markup"><pre className="code-block"><code>conda install{("$channel") ? (<> -c {/* $channel */}</>) : null} {props.packageDescriptor?.packageProperties?.getByName "conda?.name" as any}={props.packageDescriptor?.version?.version as any}</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>

	{((props.packageDescriptor?.metadata?.description || props.packageDescriptor?.metadata?.summary)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		<div className="ui attached segment">
			{(props.packageDescriptor?.metadata?.description) ? (<>{props.packageDescriptor?.metadata?.description as any}</>) : (<>{props.packageDescriptor?.metadata?.summary as any}</>)}
		</div>
	</>) : null}
</>) : null}

  </>)
}
