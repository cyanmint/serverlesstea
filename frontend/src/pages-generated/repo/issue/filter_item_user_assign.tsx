// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function FilterItemUserAssign(props: Record<string, unknown>) {
  return (<>
{/* This is a user list for filter, the data is provided by a local variable assignment
* QueryParamKey: eg: "poster", "assignee"
* QueryLink
* UserSearchList
* SelectedUserId: 0 or empty means default, -1 means "no user is set"
* TextFilterTitle
* TextFilterMatchNone: the text for "issues with no assignee"
* TextFilterMatchAny: the text for "issues with any assignee" */}
{/* $queryLink */}
<div className={`item ui dropdown jump ${(!(props.userSearchList)) ? `disabled` : ""}`}>
	{props.textFilterTitle as any} <span className="svg-icon" aria-label="octicon-triangle-down"></span>
	<div className="menu flex-items-menu">
		<div className="ui icon search input">
			<i className="icon"><span className="svg-icon" aria-label="octicon-search"></span></i>
			<input type="text" placeholder={String(i18n("repo.issues.filter_user_placeholder") ?? "")} />
		</div>
		{(props.textFilterMatchNone) ? (<>
			{/* $isSelected */}
			<a className="item" href={String("" ?? "")}>
				<span className="svg-icon" aria-label="octicon-check"></span> {props.textFilterMatchNone as any}
			</a>
		</>) : null}
		{(props.textFilterMatchAny) ? (<>
			{/* $isSelected */}
			<a className="item" href={String("" ?? "")}>
				<span className="svg-icon" aria-label="octicon-check"></span> {props.textFilterMatchAny as any}
			</a>
		</>) : null}
		<div className="divider"></div>
		{((props.userSearchList) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			{/* $isSelected */}
			<a className="item" href={String("" ?? "")}>
				<span className="svg-icon" aria-label="octicon-check"></span>
				{/* TODO: {{ctx.AvatarUtils.Avatar $user 20}} */}{/* template: repo/search_name */}
			</a>
		</React.Fragment>))}
	</div>
</div>

  </>)
}
