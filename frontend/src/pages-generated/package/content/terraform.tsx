// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Terraform(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "terraform") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-code"></span> {i18n("packages.terraform.install")}</label>
				<div className="markup"><pre className="code-block"><code>terraform {'{'}
	backend "http" {'{'}
		address = "{/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/terraform/state/{props.packageDescriptor?.package?.name as any}"
		lock_address = "{/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/terraform/state/{props.packageDescriptor?.package?.name as any}/lock"
		unlock_address = "{/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/terraform/state/{props.packageDescriptor?.package?.name as any}/lock"
		lock_method = "POST"
		unlock_method = "DELETE"
	{'}'}
{'}'}</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.terraform.install2")}</label>
				<div className="markup"><pre className="code-block"><code>terraform init -migrate-state</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>
</>) : null}

  </>)
}
