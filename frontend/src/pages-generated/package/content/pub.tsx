import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Pub(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "pub") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.pub.install")}</label>
				<div className="markup"><pre className="code-block"><code>dart pub add {props.packageDescriptor?.package?.name as any}:{props.packageDescriptor?.version?.version as any} --hosted-url={/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/pub/</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>
	{((props.packageDescriptor?.metadata?.description || props.packageDescriptor?.metadata?.readme)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		{(props.packageDescriptor?.metadata?.description) ? (<><div className="ui attached segment">{props.packageDescriptor?.metadata?.description as any}</div></>) : null}
		{(props.packageDescriptor?.metadata?.readme) ? (<><div className="ui attached segment">{/* TODO: {{ctx.RenderUtils.MarkdownToHtml .PackageDescriptor.Metadata.Readme}} */}</div></>) : null}
	</>) : null}
</>) : null}

  </>)
}
