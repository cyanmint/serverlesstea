// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Preview(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">{i18n("packages.owner.settings.cleanuprules.preview")}</h4>
<div className="ui attached segment">
	<p>{i18n("packages.owner.settings.cleanuprules.preview.overview")}</p>
</div>
<div className="ui attached table segment">
	<table className="ui very basic table unstackable">
		<thead>
			<tr>
				<th>{i18n("admin.packages.type")}</th>
				<th>{i18n("admin.packages.name")}</th>
				<th>{i18n("admin.packages.version")}</th>
				<th>{i18n("admin.packages.creator")}</th>
				<th>{i18n("admin.packages.size")}</th>
				<th>{i18n("admin.packages.published")}</th>
			</tr>
		</thead>
		<tbody>
			{((props.versionsToRemove) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<tr>
					<td>{item.package?.type?.name as any}</td>
					<td>{item.package?.name as any}</td>
					<td><a href={String(props.versionWebLink ?? "")}>{item.version?.version as any}</a></td>
					<td><a href={String(props.creator?.homeLink ?? "")}>{item.creator?.name as any}</a></td>
					<td>{/* TODO: {{FileSize .CalculateBlobSize}} */}</td>
					<td>{/* TODO: {{DateUtils.AbsoluteShort .Version.CreatedUnix}} */}</td>
				</tr>
			{/* else */}
				<tr>
					<td colSpan="6">{i18n("packages.owner.settings.cleanuprules.preview.none")}</td>
				</tr>
			</React.Fragment>))}
		</tbody>
	</table>
</div>

  </>)
}
