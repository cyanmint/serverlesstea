// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Vagrant(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "vagrant") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.vagrant.install")}</label>
				<div className="markup"><pre className="code-block"><code>vagrant box add --box-version {props.packageDescriptor?.version?.version as any} "{/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/vagrant/{props.packageDescriptor?.package?.name as any}"</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>
	{(props.packageDescriptor?.metadata?.description) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		<div className="ui attached segment">{props.packageDescriptor?.metadata?.description as any}</div>
	</>) : null}
</>) : null}

  </>)
}
