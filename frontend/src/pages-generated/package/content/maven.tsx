// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Maven(props: Record<string, unknown>) {
  return (<>
{((props.packageDescriptor?.package?.type === "maven" && !(props.packageDescriptor?.metadata))) ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">{i18n("packages.no_metadata")}</div>
</>) : null}
{((props.packageDescriptor?.package?.type === "maven" && props.packageDescriptor?.metadata)) ? (<>
	<h4 className="ui top attached header">{i18n("packages.installation")}</h4>
	<div className="ui attached segment">
		<div className="ui form">
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-code"></span> {i18n("packages.maven.registry")}</label>
				<div className="markup"><pre className="code-block"><code>&lt;repositories&gt;
	&lt;repository&gt;
		&lt;id&gt;gitea&lt;/id&gt;
		&lt;url&gt;{/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/maven&lt;/url&gt;
	&lt;/repository&gt;
&lt;/repositories&gt;

&lt;distributionManagement&gt;
	&lt;repository&gt;
		&lt;id&gt;gitea&lt;/id&gt;
		&lt;url&gt;{/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/maven&lt;/url&gt;
	&lt;/repository&gt;

	&lt;snapshotRepository&gt;
		&lt;id&gt;gitea&lt;/id&gt;
		&lt;url&gt;{/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/maven&lt;/url&gt;
	&lt;/snapshotRepository&gt;
&lt;/distributionManagement&gt;</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-code"></span> {i18n("packages.maven.install")}</label>
				<div className="markup"><pre className="code-block"><code>&lt;dependency&gt;
	&lt;groupId&gt;{props.packageDescriptor?.metadata?.groupID as any}&lt;/groupId&gt;
	&lt;artifactId&gt;{props.packageDescriptor?.metadata?.artifactID as any}&lt;/artifactId&gt;
	&lt;version&gt;{props.packageDescriptor?.version?.version as any}&lt;/version&gt;
&lt;/dependency&gt;</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.maven.install2")}</label>
				<div className="markup"><pre className="code-block"><code>mvn install</code></pre></div>
			</div>
			<div className="field">
				<label><span className="svg-icon" aria-label="octicon-terminal"></span> {i18n("packages.maven.download")}</label>
				<div className="markup"><pre className="code-block"><code>mvn dependency:get -DremoteRepositories={/* TODO: {{ctx.AppFullLink}} */}/api/packages/{props.packageDescriptor?.owner?.name as any}/maven -Dartifact={props.packageDescriptor?.metadata?.groupID as any}:{props.packageDescriptor?.metadata?.artifactID as any}:{props.packageDescriptor?.version?.version as any}</code></pre></div>
			</div>
			<div className="field">
				<label>{i18n("packages.registry.documentation")}</label>
			</div>
		</div>
	</div>

	{(props.packageDescriptor?.metadata?.description) ? (<>
		<h4 className="ui top attached header">{i18n("packages.about")}</h4>
		<div className="ui attached segment">
			{props.packageDescriptor?.metadata?.description as any}
		</div>
	</>) : null}

	{(props.packageDescriptor?.metadata?.dependencies) ? (<>
		<h4 className="ui top attached header">{i18n("packages.dependencies")}</h4>
		<div className="ui attached segment">
			<div className="ui list">
				{((props.packageDescriptor?.metadata?.dependencies) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<div className="item">
						<i className="icon"><span className="svg-icon" aria-label="octicon-package-dependencies"></span></i>
						<div className="content">
							<div className="header">{item.groupID as any}:{item.artifactID as any}</div>
							<div className="description tw-text-xs">{item.version as any}</div>
						</div>
					</div>
				</React.Fragment>))}
			</div>
		</div>
	</>) : null}
</>) : null}

  </>)
}
