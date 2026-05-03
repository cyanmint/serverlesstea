import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Search(props: Record<string, unknown>) {
  return (<>
<div className="ui small secondary filter menu">
	<form id="repo-search-form" className="ui form ignore-dirty tw-flex-1 tw-flex tw-items-center tw-gap-x-2">
		{(props.language) ? (<><input type="hidden" name="language" value={String(props.language ?? "")} /></>) : null}
		{(props.pageIsExploreRepositories) ? (<><input type="hidden" name="only_show_relevant" value={String(props.onlyShowRelevant ?? "")} /></>) : null}
		{(props.tabName) ? (<><input type="hidden" name="tab" value={String(props.tabName ?? "")} /></>) : null}
		{(props.topicOnly) ? (<><input type="hidden" name="topic" value={String(props.topicOnly ?? "")} /></>) : null}
		<div className="ui small fluid action input tw-flex-1">
			{/* template: shared/search/input */}
			{/* template: shared/search/button */}
		</div>
		{/* Filter */}
		<div className="item ui small dropdown jump">
			<span className="text">{i18n("filter_title")}</span>
			<span className="svg-icon" aria-label="octicon-triangle-down"></span>
			<div className="menu flex-items-menu">
				<label className="item"><input type="radio" name="clear-filter" /> {i18n("filter.clear")}</label>
				<div className="divider"></div>
				<label className="item"><input type="radio" name="archived" {...(props.isArchived?.value ? {"checked": true} : {})} value="1" /> {i18n("filter.is_archived")}</label>
				<label className="item"><input type="radio" name="archived" {...(!(props.isArchived?.valueOrDefault?.(true)) ? {"checked": true} : {})} value="0" /> {i18n("filter.not_archived")}</label>
				<div className="divider"></div>
				<label className="item"><input type="radio" name="fork" {...(props.isFork?.value ? {"checked": true} : {})} value="1" /> {i18n("filter.is_fork")}</label>
				<label className="item"><input type="radio" name="fork" {...(!(props.isFork?.valueOrDefault?.(true)) ? {"checked": true} : {})} value="0" /> {i18n("filter.not_fork")}</label>
				<div className="divider"></div>
				<label className="item"><input type="radio" name="mirror" {...(props.isMirror?.value ? {"checked": true} : {})} value="1" /> {i18n("filter.is_mirror")}</label>
				<label className="item"><input type="radio" name="mirror" {...(!(props.isMirror?.valueOrDefault?.(true)) ? {"checked": true} : {})} value="0" /> {i18n("filter.not_mirror")}</label>
				<div className="divider"></div>
				<label className="item"><input type="radio" name="template" {...(props.isTemplate?.value ? {"checked": true} : {})} value="1" /> {i18n("filter.is_template")}</label>
				<label className="item"><input type="radio" name="template" {...(!(props.isTemplate?.valueOrDefault?.(true)) ? {"checked": true} : {})} value="0" /> {i18n("filter.not_template")}</label>
				<div className="divider"></div>
				<label className="item"><input type="radio" name="private" {...(props.isPrivate?.value ? {"checked": true} : {})} value="1" /> {i18n("filter.private")}</label>
				<label className="item"><input type="radio" name="private" {...(!(props.isPrivate?.valueOrDefault?.(true)) ? {"checked": true} : {})} value="0" /> {i18n("filter.public")}</label>
			</div>
		</div>
		{/* Sort */}
		<div className="item ui small dropdown jump">
			<span className="text">{i18n("repo.issues.filter_sort")}</span>
			<span className="svg-icon" aria-label="octicon-triangle-down"></span>
			<div className="menu">
				<label className={`${(props.sortType === "newest") ? `active ` : ""}item`}><input hidden type="radio" name="sort" {...(props.sortType === "newest" ? {"checked": true} : {})} value="newest" /> {i18n("repo.issues.filter_sort.latest")}</label>
				<label className={`${(props.sortType === "oldest") ? `active ` : ""}item`}><input hidden type="radio" name="sort" {...(props.sortType === "oldest" ? {"checked": true} : {})} value="oldest" /> {i18n("repo.issues.filter_sort.oldest")}</label>
				<label className={`${(props.sortType === "alphabetically") ? `active ` : ""}item`}><input hidden type="radio" name="sort" {...(props.sortType === "alphabetically" ? {"checked": true} : {})} value="alphabetically" /> {i18n("repo.issues.label.filter_sort.alphabetically")}</label>
				<label className={`${(props.sortType === "reversealphabetically") ? `active ` : ""}item`}><input hidden type="radio" name="sort" {...(props.sortType === "reversealphabetically" ? {"checked": true} : {})} value="reversealphabetically" /> {i18n("repo.issues.label.filter_sort.reverse_alphabetically")}</label>
				<label className={`${(props.sortType === "recentupdate") ? `active ` : ""}item`}><input hidden type="radio" name="sort" {...(props.sortType === "recentupdate" ? {"checked": true} : {})} value="recentupdate" /> {i18n("repo.issues.filter_sort.recentupdate")}</label>
				<label className={`${(props.sortType === "leastupdate") ? `active ` : ""}item`}><input hidden type="radio" name="sort" {...(props.sortType === "leastupdate" ? {"checked": true} : {})} value="leastupdate" /> {i18n("repo.issues.filter_sort.leastupdate")}</label>
				{(!(props.disableStars)) ? (<>
					<label className={`${(props.sortType === "moststars") ? `active ` : ""}item`}><input hidden type="radio" name="sort" {...(props.sortType === "moststars" ? {"checked": true} : {})} value="moststars" /> {i18n("repo.issues.filter_sort.moststars")}</label>
					<label className={`${(props.sortType === "feweststars") ? `active ` : ""}item`}><input hidden type="radio" name="sort" {...(props.sortType === "feweststars" ? {"checked": true} : {})} value="feweststars" /> {i18n("repo.issues.filter_sort.feweststars")}</label>
				</>) : null}
				<label className={`${(props.sortType === "mostforks") ? `active ` : ""}item`}><input hidden type="radio" name="sort" {...(props.sortType === "mostforks" ? {"checked": true} : {})} value="mostforks" /> {i18n("repo.issues.filter_sort.mostforks")}</label>
				<label className={`${(props.sortType === "fewestforks") ? `active ` : ""}item`}><input hidden type="radio" name="sort" {...(props.sortType === "fewestforks" ? {"checked": true} : {})} value="fewestforks" /> {i18n("repo.issues.filter_sort.fewestforks")}</label>
				<label className={`${(props.sortType === "size") ? `active ` : ""}item`}><input hidden type="radio" name="sort" {...(props.sortType === "size" ? {"checked": true} : {})} value="size" /> {i18n("repo.issues.label.filter_sort.by_size")}</label>
				<label className={`${(props.sortType === "reversesize") ? `active ` : ""}item`}><input hidden type="radio" name="sort" {...(props.sortType === "reversesize" ? {"checked": true} : {})} value="reversesize" /> {i18n("repo.issues.label.filter_sort.reverse_by_size")}</label>
			</div>
		</div>
	</form>
</div>
{((props.pageIsExploreRepositories && props.onlyShowRelevant)) ? (<>
	<div className="ui message">
		<span data-tooltip-content={String(i18n("explore.relevant_repositories_tooltip") ?? "")}>
			{i18n("explore.relevant_repositories")}
		</span>
	</div>
</>) : null}
<div className="divider"></div>

  </>)
}
