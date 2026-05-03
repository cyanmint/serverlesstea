import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Container(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "container") ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.container.pull")}</label>
				{(props.packageDescriptor?.metadata?.type === "helm") ? (<>
				<div className="markup"><pre className="code-block"><code>helm pull oci://{props.packageRegistryHost as any}/{props.packageDescriptor?.owner?.lowerName as any}/{props.packageDescriptor?.package?.lowerName as any} --version {props.packageDescriptor?.version?.lowerVersion as any}</code></pre></div>
				</>) : (<>
					{/* $separator */}
					{(!(props.packageDescriptor?.metadata?.isTagged)) ? (<>
						{/* TODO: {{$separator = "@"}} */}
					</>) : null}
					<div className="markup"><pre className="code-block"><code>docker pull {props.packageRegistryHost as any}/{props.packageDescriptor?.owner?.lowerName as any}/{props.packageDescriptor?.package?.lowerName as any}{/* $separator */}{props.packageDescriptor?.version?.lowerVersion as any}</code></pre></div>
				</>)}
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-code"></span> {i18n("packages.container.digest")}</label>
				<div className="markup">
					<div className="code-block-container code-overflow-scroll">
						<pre className="code-block"><code>
							{/* TODO: {{- range .PackageDescriptor.Files -}} */}
								{/* TODO: {{- if eq .File.LowerName "manifest.json" -}} */}
									{/* TODO: {{- .Properties.GetByName "container.digest" -}} */}{/* TODO: {{"\n"}} */}
								{/* TODO: {{- end -}} */}
							{/* TODO: {{- end -}} */}
						</code></pre>
					</div>
				</div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>
	{(props.packageDescriptor?.metadata?.manifests) ? (<>
		<h4 className="ui top attached header">{i18n("packages.container.images")}</h4>
		<div className="ui attached segment">
			<table className="ui very basic compact table">
				<thead>
					<tr>
						<th>{i18n("packages.container.digest")}</th>
						<th>{i18n("packages.container.multi_arch")}</th>
						<th>{i18n("admin.packages.size")}</th>
					</tr>
				</thead>
				<tbody>
					{((props.packageDescriptor?.metadata?.manifests) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						{/* "unknown/unknown" is attestation-manifest, so we should skip it */}
						{(item.platform !== "unknown/unknown") ? (<>
						<tr>
							<td>
								<a className="tw-font-mono" href={`${String(props.packageDescriptor?.packageWebLink ?? "")}/${String(props.packageDescriptor?.version?.lowerVersion ?? "")}/`}>
									{/* TODO: {{StringUtils.TrimPrefix .Digest "sha256:" | ShortSha}} */}
								</a>
							</td>
							<td>{item.platform as any}</td>
							<td>{/* TODO: {{FileSize .Size}} */}</td>
						</tr>
						</>) : null}
					</React.Fragment>))}
				</tbody>
			</table>
		</div>
	</>) : null}
	{(props.packageDescriptor?.metadata?.description) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		<div className="ui attached segment">
			{props.packageDescriptor?.metadata?.description as any}
		</div>
	</>) : null}

	{/* a container manifest may contain sub manifests, so here we try to display some information of the sub manifest,
		not perfect, just better than before */}
	{/* $imageMetadata */}
	{("$imageMetadata.ImageLayers") ? (<>
		<h4 className="ui top attached header flex-text-block">
			{i18n("packages.container.layers")}
			{/* only show the platform if the image metadata is not the package's, which means that it is a sub manifest */}
			{(props.containerImageMetadata !== props.packageDescriptor?.metadata) ? (<>
				<span className="tw-text-base flex-text-inline" title={String(i18n("packages.container.details.platform") ?? "")}>
					(<span className="svg-icon" aria-label="octicon-cpu"></span> {props.containerImageMetadata?.platform as any})
				</span>
			</>) : null}
		</h4>
		<div className="ui attached segment tw-break-anywhere">
			<table className="ui very basic compact table tw-font-mono">
				<tbody>
					{(($imageMetadata.ImageLayers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td>{item as any}</td>
						</tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>
	</>) : null}
	{("$imageMetadata.Labels") ? (<>
		<h4 className="ui top attached header">{i18n("packages.container.labels")}</h4>
		<div className="ui attached segment">
			<table className="ui very basic compact table tw-font-mono">
				<thead>
					<tr>
						<th>{i18n("packages.container.labels.key")}</th>
						<th>{i18n("packages.container.labels.value")}</th>
					</tr>
				</thead>
				<tbody>
					{(($imageMetadata.Labels) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<tr>
							<td className="tw-align-top">{/* $key */}</td>
							<td className="tw-break-anywhere">{/* $value */}</td>
						</tr>
					</React.Fragment>))}
				</tbody>
			</table>
		</div>
	</>) : null}
</>) : null}

  </>)
}
