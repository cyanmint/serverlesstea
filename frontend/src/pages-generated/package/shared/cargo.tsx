import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Cargo(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("packages.owner.settings.cargo.title")}
</h4>
<div className="ui attached segment">
	<div className="ui form">
		<div className="field">
			<label>{i18n("packages.owner.settings.cargo.initialize.description")}</label>
		</div>
		<form className="field" action={`${String(props.link ?? "")}/cargo/initialize`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<button className="ui primary button">{i18n("packages.owner.settings.cargo.initialize")}</button>
		</form>
		<div className="field">
			<label>{i18n("packages.owner.settings.cargo.rebuild.description")}</label>
		</div>
		<form className="field" action={`${String(props.link ?? "")}/cargo/rebuild`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<button className="ui primary button">{i18n("packages.owner.settings.cargo.rebuild")}</button>
		</form>
		<div className="field">
			<label>{i18n("packages.registry.documentation")}</label>
		</div>
	</div>
</div>

  </>)
}
