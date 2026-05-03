import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Nuget(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "nuget") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.nuget.registry")}</label>
				<div className="markup"><pre className="code-block"><code>dotnet nuget add source --name {props.packageDescriptor?.owner?.name as any} --username your_username --password your_token {/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/nuget/index.json</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.nuget.install")}</label>
				<div className="markup"><pre className="code-block"><code>dotnet add package --source {props.packageDescriptor?.owner?.name as any} --version {props.packageDescriptor?.version?.version as any} {props.packageDescriptor?.package?.name as any}</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>

	{((props.packageDescriptor?.metadata?.description || props.packageDescriptor?.metadata?.releaseNotes || props.packageDescriptor?.metadata?.readme)) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		{(props.packageDescriptor?.metadata?.description) ? (<><div className="ui attached segment">{/* TODO: {{ctx.RenderUtils.MarkdownToHtml .PackageDescriptor.Metadata.Description}} */}</div></>) : null}
		{(props.packageDescriptor?.metadata?.readme) ? (<><div className="ui attached segment markup markdown">{/* TODO: {{ctx.RenderUtils.MarkdownToHtml .PackageDescriptor.Metadata.Readme}} */}</div></>) : null}
		{(props.packageDescriptor?.metadata?.releaseNotes) ? (<><div className="ui attached segment">{/* TODO: {{ctx.RenderUtils.MarkdownToHtml .PackageDescriptor.Metadata.ReleaseNotes}} */}</div></>) : null}
	</>) : null}

	{(props.packageDescriptor?.metadata?.dependencies) ? (<>
		<h4 className="ui top attached header">{i18n("packages.dependencies")}</h4>
		<div className="ui attached segment">
			<table className="ui single line very basic table">
				<thead>
					<tr>
						<th className="ten wide">{i18n("packages.dependency.id")}</th>
						<th className="three wide">{i18n("packages.dependency.version")}</th>
						<th className="three wide">{i18n("packages.nuget.dependency.framework")}</th>
					</tr>
				</thead>
				<tbody>
					{/* $tooltipSearchInNuget */}
					{((props.packageDescriptor?.metadata?.dependencies) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						{((props.dependencies) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td>{item.iD as any} <a target="_blank" href={`https://www.nuget.org/packages/${String(props.iD ?? "")}`} data-tooltip-content={String("" ?? "")}><span className="svg-icon" aria-label="octicon-link-external"></span></a></td>
							<td>{item.version as any} <a target="_blank" href={`https://www.nuget.org/packages/${String(props.iD ?? "")}/${String(props.version ?? "")}`} data-tooltip-content={String("" ?? "")}><span className="svg-icon" aria-label="octicon-link-external"></span></a></td>
							<td>{props.framework as any}</td>
						</tr>
						</React.Fragment>))}
					</React.Fragment>))}
				</tbody>
			</table>
		</div>
	</>) : null}
</>) : null}

  </>)
}
