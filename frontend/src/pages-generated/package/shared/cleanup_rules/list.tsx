// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("packages.owner.settings.cleanuprules.title")}
	<div className="ui right">
		<a className="ui primary tiny button" href={`${String(props.link ?? "")}/rules/add`}>{i18n("packages.owner.settings.cleanuprules.add")}</a>
	</div>
</h4>
<div className="ui attached segment">
	<div className="flex-divided-list items-with-main">
		{((props.cleanupRules) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="item">
				<div className="item-leading">
					{/* TODO: {{svg .Type.SVGName 32}} */}
				</div>
				<div className="item-main">
					<div className="item-title">
						<a className="item" href={`${String(props.link ?? "")}/rules/${String(props.iD ?? "")}`}>{item.type?.name as any}</a>
					</div>
					<div className="item-body">
						<i>{(item.enabled) ? (<>{i18n("enabled")}</>) : (<>{i18n("disabled")}</>)}</i>
					</div>
					{(item.keepCount) ? (<>
					<div className="item-body">
						<i>{i18n("packages.owner.settings.cleanuprules.keep.count")}:</i> {(item.keepCount === 1) ? (<>{i18n("packages.owner.settings.cleanuprules.keep.count.1")}</>) : (<>{i18n("packages.owner.settings.cleanuprules.keep.count.n")}</>)}
					</div>
					</>) : null}
					{(item.keepPattern) ? (<>
					<div className="item-body">
						<i>{i18n("packages.owner.settings.cleanuprules.keep.pattern")}:</i> {/* TODO: {{StringUtils.EllipsisString .KeepPattern 100}} */}
					</div>
					</>) : null}
					{(item.removeDays) ? (<>
					<div className="item-body">
						<i>{i18n("packages.owner.settings.cleanuprules.remove.days")}:</i> {i18n("tool.days")}
					</div>
					</>) : null}
					{(item.removePattern) ? (<>
					<div className="item-body">
						<i>{i18n("packages.owner.settings.cleanuprules.remove.pattern")}:</i> {/* TODO: {{StringUtils.EllipsisString .RemovePattern 100}} */}
					</div>
					</>) : null}
				</div>
				<div className="item-trailing">
					<div className="ui dropdown tiny basic button">
						<span className="svg-icon" aria-label="octicon-kebab-horizontal"></span>
						<div className="menu">
							<a className="item" href={`${String(props.link ?? "")}/rules/${String(props.iD ?? "")}`}>{i18n("edit")}</a>
							<a className="item" href={`${String(props.link ?? "")}/rules/${String(props.iD ?? "")}/preview`}>{i18n("packages.owner.settings.cleanuprules.preview")}</a>
						</div>
					</div>
				</div>
			</div>
		{/* else */}
			<div className="item">{i18n("packages.owner.settings.cleanuprules.none")}</div>
		</React.Fragment>))}
	</div>
</div>

  </>)
}
