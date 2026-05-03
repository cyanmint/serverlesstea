import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Versionlist(props: Record<string, unknown>) {
  return (<>
<p><a href={String(props.packageDescriptor?.packageWebLink ?? "")}>{props.packageDescriptor?.package?.name as any}</a> / <strong>{i18n("packages.versions")}</strong></p>
<form className="ui form ignore-dirty">
	<div className="ui small fluid action input">
		{/* template: shared/search/input */}
		<select className="ui small dropdown" name="sort">
			<option value="version_asc"{(props.sort === "version_asc") ? (<> selected="selected"</>) : null}>{i18n("filter.string.asc")}</option>
			<option value="version_desc"{(props.sort === "version_desc") ? (<> selected="selected"</>) : null}>{i18n("filter.string.desc")}</option>
			<option value="created_asc"{(props.sort === "created_asc") ? (<> selected="selected"</>) : null}>{i18n("repo.issues.filter_sort.oldest")}</option>
			<option value="created_desc"{((props.sort === "" || props.sort === "created_desc")) ? (<> selected="selected"</>) : null}>{i18n("repo.issues.filter_sort.latest")}</option>
		</select>
		{(props.packageDescriptor?.package?.type === "container") ? (<>
		<select className="ui small dropdown" name="tagged">
			{/* $isTagged */}
			<option value="tagged"{("$isTagged") ? (<> selected="selected"</>) : null}>{i18n("packages.filter.container.tagged")}</option>
			<option value="untagged"{(!("$isTagged")) ? (<> selected="selected"</>) : null}>{i18n("packages.filter.container.untagged")}</option>
		</select>
		</>) : null}
		{/* template: shared/search/button */}
	</div>
</form>
<div>
	{((props.packageDescriptors) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	<div className="flex-divided-list items-with-main">
		<div className="item">
			<div className="item-main">
				<a className="item-title" href={String(props.versionWebLink ?? "")}>{item.version?.lowerVersion as any}</a>
				<div className="item-body">
					{i18n("packages.published_by")}
				</div>
			</div>
		</div>
	</div>
	{/* else */}
		<p className="tw-py-4">{i18n("packages.filter.no_result")}</p>
	</React.Fragment>))}
	{/* template: base/paginate */}
</div>

  </>)
}
