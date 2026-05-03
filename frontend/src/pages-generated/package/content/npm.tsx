import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Npm(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "npm") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-code"></span> {i18n("packages.npm.registry")}</label>
				<div className="markup"><pre className="code-block"><code>{(props.packageDescriptor?.metadata?.scope) ? (<>{props.packageDescriptor?.metadata?.scope as any}:</>) : null}registry={/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/npm/</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.npm.install")}</label>
				<div className="markup"><pre className="code-block"><code>npm install {props.packageDescriptor?.package?.name as any}@{props.packageDescriptor?.version?.version as any}</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-code"></span> {i18n("packages.npm.install2")}</label>
				<div className="markup"><pre className="code-block"><code>&quot;{props.packageDescriptor?.package?.name as any}&quot;: &quot;{props.packageDescriptor?.version?.version as any}&quot;</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>

	{((props.packageDescriptor?.metadata?.description || props.packageDescriptor?.metadata?.readme)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		<div className="ui attached segment">
			{(props.packageDescriptor?.metadata?.readme) ? (<>
			<div className="markup markdown">
				{/* TODO: {{ctx.RenderUtils.MarkdownToHtml .PackageDescriptor.Metadata.Readme}} */}
			</div>
			</>) : null} {(props.packageDescriptor?.metadata?.description) ? (<>
				{props.packageDescriptor?.metadata?.description as any}
			</>) : null}
		</div>
	</>) : null}

	{((props.packageDescriptor?.metadata?.dependencies || props.packageDescriptor?.metadata?.developmentDependencies || props.packageDescriptor?.metadata?.peerDependencies || props.packageDescriptor?.metadata?.optionalDependencies)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.dependencies")}</h4>
		<div className="ui attached segment">
			<div className="ui list">
				{/* template: package/content/npm_dependencies */}
				{/* template: package/content/npm_dependencies */}
				{/* template: package/content/npm_dependencies */}
				{/* template: package/content/npm_dependencies */}
			</div>
		</div>
	</>) : null}

	{(props.packageDescriptor?.metadata?.bundleDependencies) ? (<>
		<h4 className="ui top attached header">{i18n("packages.npm.dependencies.bundle")}</h4>
		<div className="ui attached segment">
			{((props.packageDescriptor?.metadata?.bundleDependencies) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				{item as any}
			</React.Fragment>))}
		</div>
	</>) : null}

	{(props.packageDescriptor?.metadata?.keywords) ? (<>
		<h4 className="ui top attached header">{i18n("packages.keywords")}</h4>
		<div className="ui attached segment">
			{((props.packageDescriptor?.metadata?.keywords) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				{item as any}
			</React.Fragment>))}
		</div>
	</>) : null}
</>) : null}

  </>)
}
