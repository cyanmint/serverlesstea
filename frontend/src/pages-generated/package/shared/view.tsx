// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function View(props: Record<string, unknown>) {
  return (<>
<div className="issue-title-header">
	{/* $packageVersionLink */}
	<h1>{props.packageDescriptor?.package?.name as any} ({props.packageDescriptor?.version?.version as any})</h1>
	<div>
		{/* $timeStr */}
		{(props.hasRepositoryAccess) ? (<>
		{i18n("packages.published_by_in")}
		</>) : (<>
		{i18n("packages.published_by")}
		</>)}
	</div>
</div>
<div className="packages-content">
	<div className="packages-content-left">
		{/* template: package/content/alpine */}
		{/* template: package/content/arch */}
		{/* template: package/content/cargo */}
		{/* template: package/content/chef */}
		{/* template: package/content/composer */}
		{/* template: package/content/conan */}
		{/* template: package/content/conda */}
		{/* template: package/content/container */}
		{/* template: package/content/cran */}
		{/* template: package/content/debian */}
		{/* template: package/content/generic */}
		{/* template: package/content/go */}
		{/* template: package/content/helm */}
		{/* template: package/content/maven */}
		{/* template: package/content/npm */}
		{/* template: package/content/nuget */}
		{/* template: package/content/pub */}
		{/* template: package/content/pypi */}
		{/* template: package/content/rpm */}
		{/* template: package/content/rubygems */}
		{/* template: package/content/swift */}
		{/* template: package/content/terraform */}
		{/* template: package/content/vagrant */}
	</div>
	<div className="ui segment packages-content-right">
		<strong>{i18n("packages.details")}</strong>
		<div className="ui relaxed list flex-items-block">
			<div className="item">{/* TODO: {{svg .PackageDescriptor.Package.Type.SVGName}} */} {props.packageDescriptor?.package?.type?.name as any}</div>
			{(props.hasRepositoryAccess) ? (<>
			<div className="item"><span className="svg-icon" aria-label="octicon-repo"></span> <a href={String(props.packageDescriptor?.repository?.link ?? "")}>{props.packageDescriptor?.repository?.fullName as any}</a></div>
			</>) : null}
			<div className="item"><span className="svg-icon" aria-label="octicon-calendar"></span> {/* TODO: {{DateUtils.TimeSince .PackageDescriptor.Version.CreatedUnix}} */}</div>
			<div className="item"><span className="svg-icon" aria-label="octicon-download"></span> {props.packageDescriptor?.version?.downloadCount as any}</div>
			{/* template: package/metadata/alpine */}
			{/* template: package/metadata/arch */}
			{/* template: package/metadata/cargo */}
			{/* template: package/metadata/chef */}
			{/* template: package/metadata/composer */}
			{/* template: package/metadata/conan */}
			{/* template: package/metadata/conda */}
			{/* template: package/metadata/container */}
			{/* template: package/metadata/cran */}
			{/* template: package/metadata/debian */}
			{/* template: package/metadata/generic */}
			{/* template: package/metadata/helm */}
			{/* template: package/metadata/maven */}
			{/* template: package/metadata/npm */}
			{/* template: package/metadata/nuget */}
			{/* template: package/metadata/pub */}
			{/* template: package/metadata/pypi */}
			{/* template: package/metadata/rpm */}
			{/* template: package/metadata/rubygems */}
			{/* template: package/metadata/swift */}
			{/* template: package/metadata/terraform */}
			{/* template: package/metadata/vagrant */}
			{(!((props.packageDescriptor?.package?.type === "container" && props.packageDescriptor?.metadata?.manifests))) ? (<>
			<div className="item"><span className="svg-icon" aria-label="octicon-database"></span> {/* TODO: {{FileSize .PackageDescriptor.CalculateBlobSize}} */}</div>
			</>) : null}
		</div>
		{(!(props.packageDescriptor?.package?.type === "container")) ? (<>
		<div className="divider"></div>
		<strong>{i18n("packages.assets")} ({/* TODO: {{len .PackageDescriptor.Files}} */})</strong>
		<div className="ui relaxed list">
			{((props.packageDescriptor?.files) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item">
				<a href={`/files/${String(props.file?.iD ?? "")}`}>{item.file?.name as any}</a>
				<span className="tw-text-xs tw-whitespace-nowrap">{/* TODO: {{FileSize .Blob.Size}} */}</span>
			</div>
			</React.Fragment>))}
		</div>
		</>) : null}
		<div className="divider"></div>
		<strong>{i18n("packages.versions")} ({props.totalVersionCount as any})</strong>
		<a className="tw-float-right" href={`${String(props.packageDescriptor?.packageWebLink ?? "")}/versions`}>{i18n("packages.versions.view_all")}</a>
		<div className="ui relaxed list">
			{((props.latestVersions) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item tw-flex">
				<a className="tw-flex-1 gt-ellipsis" title={String(props.version ?? "")} href={`${String(props.packageDescriptor?.packageWebLink ?? "")}/`}>{item.version as any}</a>
				<span className="tw-text-xs">{/* TODO: {{DateUtils.AbsoluteShort .CreatedUnix}} */}</span>
			</div>
			</React.Fragment>))}
		</div>
		{((props.canWritePackages || props.hasRepositoryAccess)) ? (<>
		<div className="divider"></div>
		<div className="ui relaxed list flex-items-block">
			{(props.hasRepositoryAccess) ? (<>
			<div className="item"><span className="svg-icon" aria-label="octicon-issue-opened"></span> <a href={`${String(props.packageDescriptor?.repository?.link ?? "")}/issues`}>{i18n("repo.issues")}</a></div>
			</>) : null}
			{(props.canWritePackages) ? (<>
			<div className="item"><span className="svg-icon" aria-label="octicon-tools"></span> <a href={String(props.packageDescriptor?.packageSettingsLink ?? "")}>{i18n("repo.settings")}</a></div>
			<div className="item">
				<span className="svg-icon" aria-label="octicon-trash"></span>
				<a className="show-modal" href data-modal="#delete-package-version-modal">{i18n("packages.settings.delete.version")}</a>
				<div className="ui tiny modal" id="delete-package-version-modal">
					<div className="header">
						{i18n("packages.settings.delete.version")}
					</div>
					<div className="content">
						<div className="ui warning message tw-break-anywhere">
							{i18n("packages.settings.delete.notice")}
						</div>
						<form className="ui form" action={String("" ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
							{/* template: base/modal_actions_confirm */}
						</form>
					</div>
				</div>
			</div>
			</>) : null}
		</div>
		</>) : null}
	</div>
</div>

  </>)
}
