// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function WhitespaceDropdown(props: Record<string, unknown>) {
  return (<>
<div className="ui dropdown tiny basic button" data-tooltip-content={String(i18n("repo.diff.whitespace_button") ?? "")}>
	<span className="svg-icon" aria-label="gitea-whitespace"></span>
	<div className="menu">
		<a className="item" href={`?style=${(props.isSplitStyle) ? `split` : `unified`}&whitespace=show-all&show-outdated=${String(props.showOutdatedComments ?? "")}`}>
			<label className="tw-pointer-events-none">
				<input className="tw-mr-2 tw-pointer-events-none" type="radio"{...(props.whitespaceBehavior === "show-all" ? {"checked": true} : {})} />
				{i18n("repo.diff.whitespace_show_everything")}
			</label>
		</a>
		<a className="item" href={`?style=${(props.isSplitStyle) ? `split` : `unified`}&whitespace=ignore-all&show-outdated=${String(props.showOutdatedComments ?? "")}`}>
			<label className="tw-pointer-events-none">
				<input className="tw-mr-2 tw-pointer-events-none" type="radio"{...(props.whitespaceBehavior === "ignore-all" ? {"checked": true} : {})} />
				{i18n("repo.diff.whitespace_ignore_all_whitespace")}
			</label>
		</a>
		<a className="item" href={`?style=${(props.isSplitStyle) ? `split` : `unified`}&whitespace=ignore-change&show-outdated=${String(props.showOutdatedComments ?? "")}`}>
			<label className="tw-pointer-events-none">
				<input className="tw-mr-2 tw-pointer-events-none" type="radio"{...(props.whitespaceBehavior === "ignore-change" ? {"checked": true} : {})} />
				{i18n("repo.diff.whitespace_ignore_amount_changes")}
			</label>
		</a>
		<a className="item" href={`?style=${(props.isSplitStyle) ? `split` : `unified`}&whitespace=ignore-eol&show-outdated=${String(props.showOutdatedComments ?? "")}`}>
			<label className="tw-pointer-events-none">
				<input className="tw-mr-2 tw-pointer-events-none" type="radio"{...(props.whitespaceBehavior === "ignore-eol" ? {"checked": true} : {})} />
				{i18n("repo.diff.whitespace_ignore_at_eol")}
			</label>
		</a>
	</div>
</div>
<a className="ui tiny basic button" href={`?style=${(props.isSplitStyle) ? `unified` : `split`}&whitespace=${String(props.whitespaceBehavior ?? "")}&show-outdated=${String(props.showOutdatedComments ?? "")}`} data-tooltip-content={`${(props.isSplitStyle) ? `${i18n("repo.diff.show_unified_view")}` : `${i18n("repo.diff.show_split_view")}`}`}>{/* TODO: {{svg (Iif .IsSplitStyle "gitea-join" "gitea-split")}} */}</a>

  </>)
}
