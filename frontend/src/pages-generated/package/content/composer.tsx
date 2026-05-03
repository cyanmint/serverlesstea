// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Composer(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "composer") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-code"></span> {i18n("packages.composer.registry")}</label>
				<div className="markup"><pre className="code-block"><code>{'{'}
	"repositories": [{'{'}
			"type": "composer",
			"url": "{/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/composer"
		{'}'}
	]
{'}'}</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.composer.install")}</label>
				<div className="markup"><pre className="code-block"><code>composer require {props.packageDescriptor?.package?.name as any}:{props.packageDescriptor?.version?.version as any}</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>

	{((props.packageDescriptor?.metadata?.description || props.packageDescriptor?.metadata?.comments)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		{(props.packageDescriptor?.metadata?.description) ? (<><div className="ui attached segment">{props.packageDescriptor?.metadata?.description as any}</div></>) : null}
		{(props.packageDescriptor?.metadata?.readme) ? (<><div className="ui attached segment markup markdown">{/* TODO: {{ctx.RenderUtils.MarkdownToHtml .PackageDescriptor.Metadata.Readme}} */}</div></>) : null}
		{(props.packageDescriptor?.metadata?.comments) ? (<><div className="ui attached segment">{/* TODO: {{StringUtils.Join .PackageDescriptor.Metadata.Comments " "}} */}</div></>) : null}
	</>) : null}

	{((props.packageDescriptor?.metadata?.require || props.packageDescriptor?.metadata?.requireDev)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.dependencies")}</h4>
		<div className="ui attached segment">
			<div className="ui list">
				{/* template: package/content/composer_dependencies */}
				{/* template: package/content/composer_dependencies */}
			</div>
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
