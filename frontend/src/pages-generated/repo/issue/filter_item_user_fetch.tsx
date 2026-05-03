import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function FilterItemUserFetch(props: Record<string, unknown>) {
  return (<>
{/* This is a user list for filter, the data is provided by a remote "fetch" request
* QueryParamKey: eg: "poster", "assignee"
* QueryLink
* UserSearchUrl
* SelectedUsername
* TextFilterTitle */}
{/* $queryLink */}
<div className="item ui dropdown custom user-remote-search" data-tooltip-content={String(i18n("repo.user_search_tooltip") ?? "")}
		data-search-url={String(props.userSearchUrl ?? "")}
		data-selected-username={String(props.selectedUsername ?? "")}
		data-action-jump-url={`&${String(props.queryParamKey ?? "")}={username}`}
>
	{props.textFilterTitle as any} <span className="svg-icon" aria-label="octicon-triangle-down"></span>
	<div className="menu">
		<div className="ui icon search input">
			<i className="icon"><span className="svg-icon" aria-label="octicon-search"></span></i>
			<input type="text" placeholder={String(i18n("repo.issues.filter_user_placeholder") ?? "")} />
		</div>
		<a className="item" data-value="">{i18n("repo.issues.filter_user_no_select")}</a>
		<a className="item item-from-input tw-hidden"></a>
	</div>
</div>

  </>)
}
