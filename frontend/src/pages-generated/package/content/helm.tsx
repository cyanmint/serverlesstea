// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Helm(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "helm") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.helm.registry")}</label>
				<div className="markup"><pre className="code-block"><code>helm repo add {""} {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/helm
helm repo update</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.helm.install")}</label>
				<div className="markup"><pre className="code-block"><code>helm install {props.packageDescriptor?.package?.name as any} {""}/{props.packageDescriptor?.package?.name as any}</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>

	{(props.packageDescriptor?.metadata?.description) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		<div className="ui attached segment">
			{props.packageDescriptor?.metadata?.description as any}
		</div>
	</>) : null}

	{(props.packageDescriptor?.metadata?.dependencies) ? (<>
		<h4 className="ui top attached header">{i18n("packages.dependencies")}</h4>
		<div className="ui attached segment">
			<table className="ui single line very basic table">
				<thead>
					<tr>
						<th className="ten wide">{i18n("packages.dependency.id")}</th>
						<th className="six wide">{i18n("packages.dependency.version")}</th>
					</tr>
				</thead>
				<tbody>
					{((props.packageDescriptor?.metadata?.dependencies) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td>{item.name as any}</td>
							<td>{item.version as any}</td>
						</tr>
					</React.Fragment>))}
				</tbody>
			</table>
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
