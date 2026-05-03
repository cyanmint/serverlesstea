// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Go(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "go") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.go.install")}</label>
				<div className="markup"><pre className="code-block"><code>GOPROXY={/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/go go install {props.packageDescriptor?.package?.name as any}@{props.packageDescriptor?.version?.version as any}</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>
</>) : null}

  </>)
}
