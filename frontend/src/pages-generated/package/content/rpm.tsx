import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Rpm(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "rpm") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.rpm.registry")}</label>
				<div className="markup"><pre className="code-block"><code>{("len .Groups" > 1) ? (<>
# {i18n("packages.rpm.repository.multiple_groups")}

</>) : null}
# {i18n("packages.rpm.distros.redhat")}
{((props.groups) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	{(props.group) ? (<>{/* TODO: {{$group = print "/" $group}} */}</>) : null}
dnf config-manager --add-repo {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/rpm{props.group as any}.repo
</React.Fragment>))}

# Fedora 41+ (DNF5)
{((props.groups) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	{(props.group) ? (<>{/* TODO: {{$group = print "/" $group}} */}</>) : null}
dnf config-manager addrepo --from-repofile={/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/rpm{props.group as any}.repo
</React.Fragment>))}

# {i18n("packages.rpm.distros.suse")}
{((props.groups) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	{(props.group) ? (<>{/* TODO: {{$group = print "/" $group}} */}</>) : null}
zypper addrepo {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/rpm{props.group as any}.repo
</React.Fragment>))}</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.rpm.install")}</label>
				<div className="markup">
					<pre className="code-block"><code># {i18n("packages.rpm.distros.redhat")}
dnf install {props.packageDescriptor?.package?.name as any}

# {i18n("packages.rpm.distros.suse")}
zypper install {props.packageDescriptor?.package?.name as any}</code></pre>
				</div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>

	<h4 className="ui top attached header">{i18n("packages.rpm.repository")}</h4>
	<div className="ui attached segment">
		<table className="ui single line very basic table">
			<tbody>
				<tr>
					<td className="collapsing"><h5>{i18n("packages.rpm.repository.architectures")}</h5></td>
					<td>{/* TODO: {{StringUtils.Join .Architectures ", "}} */}</td>
				</tr>
			</tbody>
		</table>
	</div>

	{((props.packageDescriptor?.metadata?.summary || props.packageDescriptor?.metadata?.description)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		{(props.packageDescriptor?.metadata?.summary) ? (<><div className="ui attached segment">{props.packageDescriptor?.metadata?.summary as any}</div></>) : null}
		{(props.packageDescriptor?.metadata?.description) ? (<><div className="ui attached segment">{props.packageDescriptor?.metadata?.description as any}</div></>) : null}
	</>) : null}
</>) : null}

  </>)
}
