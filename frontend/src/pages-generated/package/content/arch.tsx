// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Arch(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "arch") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-gear"></span> {i18n("packages.arch.registry")}</label>
				<div className="markup"><pre className="code-block"><code>{((props.repositories) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>{(props.i) ? (<>
</>) : null}[{props.repo as any}]
SigLevel = Optional TrustAll
Server = {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/arch/$repo/$arch
</React.Fragment>))}</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-sync"></span> {i18n("packages.arch.install")}</label>
				<div className="markup"><pre className="code-block"><code>pacman -Sy {props.packageDescriptor?.package?.lowerName as any}</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>

	<h4 className="ui top attached header">{i18n("packages.arch.repository")}</h4>
	<div className="ui attached segment">
		<table className="ui single line very basic table">
			<tbody>
				<tr>
					<td className="collapsing"><h5>{i18n("packages.arch.repository.repositories")}</h5></td>
					<td>{/* TODO: {{StringUtils.Join .Repositories ", "}} */}</td>
				</tr>
				<tr>
					<td className="collapsing"><h5>{i18n("packages.arch.repository.architectures")}</h5></td>
					<td>{/* TODO: {{StringUtils.Join .Architectures ", "}} */}</td>
				</tr>
			</tbody>
		</table>
	</div>

	{(props.packageDescriptor?.metadata?.description) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		<div className="ui attached segment">{props.packageDescriptor?.metadata?.description as any}</div>
	</>) : null}
</>) : null}

  </>)
}
