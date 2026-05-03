import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Rubygems(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "rubygems") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.rubygems.install")}:</label>
				<div className="markup"><pre className="code-block"><code>gem install {props.packageDescriptor?.package?.name as any} --version &quot;{props.packageDescriptor?.version?.version as any}&quot; --source &quot;{/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/rubygems&quot;</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-code"></span> {i18n("packages.rubygems.install2")}:</label>
				<div className="markup"><pre className="code-block"><code>source "{/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/rubygems" do
	gem "{props.packageDescriptor?.package?.name as any}", "{props.packageDescriptor?.version?.version as any}"
end</code></pre></div>
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
	{((props.packageDescriptor?.metadata?.requiredRubyVersion || props.packageDescriptor?.metadata?.requiredRubygemsVersion)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.requirements")}</h4>
		<div className="ui attached segment">
			{(props.packageDescriptor?.metadata?.requiredRubyVersion) ? (<><p>{i18n("packages.rubygems.required.ruby")}: {((props.packageDescriptor?.metadata?.requiredRubyVersion) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>{(i > 0) ? (<>, </>) : null}{/* TODO: {{$v.Restriction}} */}{/* TODO: {{$v.Version}} */}</React.Fragment>))}</p></>) : null}
			{(props.packageDescriptor?.metadata?.requiredRubygemsVersion) ? (<><p>{i18n("packages.rubygems.required.rubygems")}: {((props.packageDescriptor?.metadata?.requiredRubygemsVersion) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>{(i > 0) ? (<>, </>) : null}{/* TODO: {{$v.Restriction}} */}{/* TODO: {{$v.Version}} */}</React.Fragment>))}</p></>) : null}
		</div>
	</>) : null}
	{((props.packageDescriptor?.metadata?.runtimeDependencies || props.packageDescriptor?.metadata?.developmentDependencies)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.dependencies")}</h4>
		<div className="ui attached segment">
			<div className="ui list">
				{/* template: package/content/rubygems_dependencies */}
				{/* template: package/content/rubygems_dependencies */}
			</div>
		</div>
	</>) : null}
</>) : null}

  </>)
}
