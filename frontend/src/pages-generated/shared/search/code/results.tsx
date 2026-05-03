// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Results(props: Record<string, unknown>) {
  return (<>
<div className="flex-text-block tw-flex-wrap">
	{((props.searchResultLanguages) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	<a className={`ui ${(props.language === props.term?.language) ? `primary` : ""} basic label tw-m-0`}
		href={`?q=${String(props.keyword ?? "")}${(props.language !== props.term?.language) ? `&l=` : ""}&search_mode=${String(props.selectedSearchMode ?? "")}`}>
		<i className="color-icon tw-mr-2" style={`background-color: `}></i>
		{/* TODO: {{$term.Language}} */}
		<div className="detail">{/* TODO: {{$term.Count}} */}</div>
	</a>
	</React.Fragment>))}
</div>
<div className="repository search">
	{((props.searchResults) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		{/* $repo */}
		<div className="diff-file-box file-content non-diff-file-content repo-search-result">
			<h4 className="ui top attached header tw-font-normal flex-text-block tw-flex-wrap tw-py-2">
				{(!(props.repo)) ? (<>
					<span className="file tw-flex-1">
						<a rel="nofollow" href={String("" ?? "")}>{/* TODO: {{$repo.FullName}} */}</a>
						{(item.repo?.isArchived) ? (<>
							<span className="ui basic label">{i18n("repo.desc.archived")}</span>
						</>) : null}
						- {item.filename as any}
					</span>
				</>) : (<>
					<span className="file tw-flex-1">{item.filename as any}</span>
				</>)}
				<a role="button" className="ui basic tiny button" rel="nofollow" href={`/src/commit//${String(props.filename?.("|", "PathEscapeSegments") ?? "")}`}>{i18n("repo.diff.view_file")}</a>
			</h4>
			<div className="ui attached table segment">
				{/* template: shared/searchfile */}
			</div>
			{/* template: shared/searchbottom */}
		</div>
	</React.Fragment>))}
</div>
{/* template: base/paginate */}

  </>)
}
