import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Chef(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "chef") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-code"></span> {i18n("packages.chef.registry")}</label>
				<div className="markup"><pre className="code-block"><code>knife[:supermarket_site] = '{/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/chef'</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.chef.install")}</label>
				<div className="markup"><pre className="code-block"><code>knife supermarket install {props.packageDescriptor?.package?.name as any} {props.packageDescriptor?.version?.version as any}</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>

	{((props.packageDescriptor?.metadata?.description || props.packageDescriptor?.metadata?.longDescription)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		<div className="ui attached segment">
			{(props.packageDescriptor?.metadata?.description) ? (<><p>{props.packageDescriptor?.metadata?.description as any}</p></>) : null}
			{(props.packageDescriptor?.metadata?.longDescription) ? (<>{/* TODO: {{ctx.RenderUtils.MarkdownToHtml .PackageDescriptor.Metadata.LongDescription}} */}</>) : null}
		</div>
	</>) : null}

	{(props.packageDescriptor?.metadata?.dependencies) ? (<>
		<h4 className="ui top attached header">{i18n("packages.dependencies")}</h4>
		<div className="ui attached segment">
			<table className="ui single line very basic table">
				<thead>
					<tr>
						<th className="eleven wide">{i18n("packages.dependency.id")}</th>
						<th className="five wide">{i18n("packages.dependency.version")}</th>
					</tr>
				</thead>
				<tbody>
					{((props.packageDescriptor?.metadata?.dependencies) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<tr>
						<td>{props.dependency as any}</td>
						<td>{props.version as any}</td>
					</tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>
	</>) : null}
</>) : null}

  </>)
}
