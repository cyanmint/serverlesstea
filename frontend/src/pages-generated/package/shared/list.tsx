// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>
{/* alert */}
{(props.hasPackages) ? (<>
<form className="ui form ignore-dirty">
	<div className="ui small fluid action input">
		{/* template: shared/search/input */}
		<select className="ui small dropdown" name="type">
			<option value="">{i18n("packages.filter.type")}</option>
			<option value="all">{i18n("packages.filter.type.all")}</option>
			{((props.availableTypes) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<option{...(props.packageType === props.type ? {"selected": "selected"} : {})} value={String("" ?? "")}>{/* TODO: {{$type.Name}} */}</option>
			</React.Fragment>))}
		</select>
		{/* template: shared/search/button */}
	</div>
</form>
</>) : null}
<div>
	{((props.packageDescriptors) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	<div className="flex-divided-list items-with-main">
		<div className="item">
			<div className="item-main">
				<div className="item-title">
					<a href={String(props.versionWebLink ?? "")}>{item.package?.name as any}</a>
					<span className="ui label">{/* TODO: {{svg .Package.Type.SVGName 16}} */} {item.package?.type?.name as any}</span>
				</div>
				<div className="item-body">
					{/* $timeStr */}
					{/* $hasRepositoryAccess */}
					{(item.repository) ? (<>
						{/* TODO: {{$hasRepositoryAccess = index $.RepositoryAccessMap .Repository.ID}} */}
					</>) : null}
					{(props.hasRepositoryAccess) ? (<>
						{i18n("packages.published_by_in")}
					</>) : (<>
						{i18n("packages.published_by")}
					</>)}
				</div>
			</div>
		</div>
	</div>
	{/* else */}
		{(!(item.hasPackages)) ? (<>
			<div className="empty-placeholder">
				<span className="svg-icon" aria-label="octicon-package"></span>
				<h2>{i18n("packages.empty")}</h2>
				{((item.repository && item.canWritePackages)) ? (<>
					{/* $packagesUrl */}
					<p>{i18n("packages.empty.repo")}</p>
				</>) : null}
				<p>{i18n("packages.empty.documentation")}</p>
			</div>
		</>) : (<>
			<p className="tw-py-4">{i18n("packages.filter.no_result")}</p>
		</>)}
	</React.Fragment>))}
	{/* template: base/paginate */}
</div>

  </>)
}
