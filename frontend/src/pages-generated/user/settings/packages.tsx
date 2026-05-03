import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Packages(props: Record<string, unknown>) {
  return (<>
{/* template: user/settings/layout_head */}
	<div className="user-setting-content">
		{/* template: package/shared/cleanup_rules/list */}
		{/* template: package/shared/cargo */}

		<h4 className="ui top attached header">
			{i18n("packages.owner.settings.chef.title")}
		</h4>
		<div className="ui attached segment">
			<div className="ui form">
				<div className="field">
					<label>{i18n("packages.owner.settings.chef.keypair.description")}</label>
				</div>
				<form className="field" action={`${String(props.link ?? "")}/chef/regenerate_keypair`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					<button className="ui primary button">{i18n("packages.owner.settings.chef.keypair")}</button>
				</form>
				<div className="field">
					<label>{i18n("packages.registry.documentation")}</label>
				</div>
			</div>
		</div>
	</div>
{/* template: user/settings/layout_footer */}

  </>)
}
