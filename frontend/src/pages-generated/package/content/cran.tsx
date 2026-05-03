import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Cran(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "cran") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-code"></span> {i18n("packages.cran.registry")}</label>
				<div className="markup"><pre className="code-block"><code>options("repos" = c(getOption("repos"), c(gitea={`/api/packages/${String(props.packageDescriptor?.owner?.name ?? "")}/cran`})))</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.cran.install")}</label>
				<div className="markup"><pre className="code-block"><code>install.packages("{props.packageDescriptor?.package?.name as any}")</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>

	{((props.packageDescriptor?.metadata?.description || props.packageDescriptor?.metadata?.title)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		<div className="ui attached segment">
			{(props.packageDescriptor?.metadata?.description) ? (<>{props.packageDescriptor?.metadata?.description as any}{props.packageDescriptor?.metadata?.title as any}</>) : (<></>)}
		</div>
	</>) : null}

	{((props.packageDescriptor?.metadata?.imports || props.packageDescriptor?.metadata?.depends || props.packageDescriptor?.metadata?.linkingTo || props.packageDescriptor?.metadata?.suggests)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.dependencies")}</h4>
		<div className="ui attached segment">
			<table className="ui single line very basic table">
				<tbody>
					{(props.packageDescriptor?.metadata?.imports) ? (<>
						<tr>
							<td>Imports</td>
							<td>{/* TODO: {{StringUtils.Join .PackageDescriptor.Metadata.Imports ", "}} */}</td>
						</tr>
					</>) : null}
					{(props.packageDescriptor?.metadata?.depends) ? (<>
						<tr>
							<td>Depends</td>
							<td>{/* TODO: {{StringUtils.Join .PackageDescriptor.Metadata.Depends ", "}} */}</td>
						</tr>
					</>) : null}
					{(props.packageDescriptor?.metadata?.linkingTo) ? (<>
						<tr>
							<td>LinkingTo</td>
							<td>{/* TODO: {{StringUtils.Join .PackageDescriptor.Metadata.LinkingTo ", "}} */}</td>
						</tr>
					</>) : null}
					{(props.packageDescriptor?.metadata?.suggests) ? (<>
						<tr>
							<td>Suggests</td>
							<td>{/* TODO: {{StringUtils.Join .PackageDescriptor.Metadata.Suggests ", "}} */}</td>
						</tr>
					</>) : null}
				</tbody>
			</table>
		</div>
	</>) : null}
</>) : null}

  </>)
}
