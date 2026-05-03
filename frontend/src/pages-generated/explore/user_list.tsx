// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function UserList(props: Record<string, unknown>) {
  return (<>
<div className="flex-divided-list items-with-main">
	{((props.users) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<div className="item tw-items-center">
			<div className="item-leading">
				{/* TODO: {{ctx.AvatarUtils.Avatar . 48}} */}
			</div>
			<div className="item-main">
				<div className="item-title">
					{/* template: shared/user/name */}
					{(item.visibility?.isPrivate) ? (<>
						<span className="ui basic tiny label">{i18n("repo.desc.private")}</span>
					</>) : null}
				</div>
				<div className="item-body">
					{(item.location) ? (<>
						<span className="flex-text-inline"><span className="svg-icon" aria-label="octicon-location"></span>{item.location as any}</span>
					</>) : null}
					{((item.email && ((props.showUserEmail && props.isSigned && !(item.keepEmailPrivate)) || props.pageIsAdminUsers))) ? (<>
						<span className="flex-text-inline">
							<span className="svg-icon" aria-label="octicon-mail"></span>
							<a href={`mailto:${String(props.email ?? "")}`}>{item.email as any}</a>
						</span>
					</>) : null}
					<span className="flex-text-inline"><span className="svg-icon" aria-label="octicon-calendar"></span>{i18n("user.joined_on")}</span>
				</div>
			</div>
		</div>
	{/* else */}
		<div className="item">
			{i18n("search.no_results")}
		</div>
	</React.Fragment>))}
</div>

  </>)
}
