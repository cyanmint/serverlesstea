// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Pypi(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "pypi") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.pypi.install")}</label>
				<div className="markup"><pre className="code-block"><code>pip install --index-url {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/pypi/simple/ --extra-index-url https://pypi.org/simple {props.packageDescriptor?.package?.name as any}</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>
	{((props.packageDescriptor?.metadata?.description || props.packageDescriptor?.metadata?.longDescription || props.packageDescriptor?.metadata?.summary)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		<div className="ui attached segment">
			<p>{(props.packageDescriptor?.metadata?.summary) ? (<>{props.packageDescriptor?.metadata?.summary as any}</>) : null}</p>
			{(props.packageDescriptor?.metadata?.longDescription) ? (<>
				{/* TODO: {{ctx.RenderUtils.MarkdownToHtml .PackageDescriptor.Metadata.LongDescription}} */}
			</>) : null} {(props.packageDescriptor?.metadata?.description) ? (<>
				{/* TODO: {{ctx.RenderUtils.MarkdownToHtml .PackageDescriptor.Metadata.Description}} */}
			</>) : null}
		</div>
	</>) : null}
	{(props.packageDescriptor?.metadata?.requiresPython) ? (<>
		<h4 className="ui top attached header">{i18n("packages.requirements")}</h4>
		<div className="ui attached segment">
			{i18n("packages.pypi.requires")}: {props.packageDescriptor?.metadata?.requiresPython as any}
		</div>
	</>) : null}
</>) : null}

  </>)
}
