import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Debian(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "debian") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.debian.registry")}</label>
				<div className="markup"><pre className="code-block"><code>sudo curl {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/debian/repository.key -o /etc/apt/keyrings/gitea-{props.packageDescriptor?.owner?.name as any}.asc
echo "deb [signed-by=/etc/apt/keyrings/gitea-{props.packageDescriptor?.owner?.name as any}.asc] {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/debian $distribution $component" | sudo tee -a /etc/apt/sources.list.d/gitea.list
sudo apt update</code></pre></div>
				<p>{i18n("packages.debian.registry.info")}</p>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.debian.install")}</label>
				<div className="markup">
					<pre className="code-block"><code>sudo apt install {props.packageDescriptor?.package?.name as any}={props.packageDescriptor?.version?.version as any}</code></pre>
				</div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>

	<h4 className="ui top attached header">{i18n("packages.debian.repository")}</h4>
	<div className="ui attached segment">
		<table className="ui single line very basic table">
			<tbody>
				<tr>
					<td className="collapsing"><h5>{i18n("packages.debian.repository.distributions")}</h5></td>
					<td>{/* TODO: {{StringUtils.Join .Distributions ", "}} */}</td>
				</tr>
				<tr>
					<td className="collapsing"><h5>{i18n("packages.debian.repository.components")}</h5></td>
					<td>{/* TODO: {{StringUtils.Join .Components ", "}} */}</td>
				</tr>
				<tr>
					<td className="collapsing"><h5>{i18n("packages.debian.repository.architectures")}</h5></td>
					<td>{/* TODO: {{StringUtils.Join .Architectures ", "}} */}</td>
				</tr>
			</tbody>
		</table>
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
				<tbody>
					{((props.packageDescriptor?.metadata?.dependencies) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td>{item as any}</td>
						</tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>
	</>) : null}
</>) : null}

  </>)
}
