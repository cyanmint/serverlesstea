import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Alpine(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "alpine") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-code"></span> {i18n("packages.alpine.registry")}</label>
				<div className="markup"><pre className="code-block"><code>{/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/alpine/$branch/$repository</code></pre></div>
				<p>{i18n("packages.alpine.registry.info")}</p>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.alpine.registry.key")}</label>
				<div className="markup"><pre className="code-block"><code>curl -JO {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/alpine/key</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.alpine.install")}</label>
				<div className="markup">
					<pre className="code-block"><code>sudo apk add {props.packageDescriptor?.package?.name as any}={props.packageDescriptor?.version?.version as any}</code></pre>
				</div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>

	<h4 className="ui top attached header">{i18n("packages.alpine.repository")}</h4>
	<div className="ui attached segment">
		<table className="ui single line very basic table">
			<tbody>
				<tr>
					<td className="collapsing"><h5>{i18n("packages.alpine.repository.branches")}</h5></td>
					<td>{/* TODO: {{StringUtils.Join .Branches ", "}} */}</td>
				</tr>
				<tr>
					<td className="collapsing"><h5>{i18n("packages.alpine.repository.repositories")}</h5></td>
					<td>{/* TODO: {{StringUtils.Join .Repositories ", "}} */}</td>
				</tr>
				<tr>
					<td className="collapsing"><h5>{i18n("packages.alpine.repository.architectures")}</h5></td>
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
</>) : null}

  </>)
}
