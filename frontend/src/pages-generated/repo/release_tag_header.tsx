// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function ReleaseTagHeader(props: Record<string, unknown>) {
  return (<>
{/* $canReadReleases */}
{/* $canReadCode */}

{(props.canReadReleases) ? (<>
	<div className="flex-text-block">
		<div className="tw-flex-1 tw-flex tw-items-center">
			<h2 className="ui compact small menu small-menu-items">
				<a className={`${((props.pageIsReleaseList && !(props.pageIsSingleTag))) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/releases`}>{/* TODO: {{ctx.Locale.PrettyNumber .NumReleases}} */} {/* TODO: {{ctx.Locale.TrN .NumReleases "repo.release" "repo.releases"}} */}</a>
				{(props.canReadCode) ? (<>
					<a className={`${((props.pageIsTagList || props.pageIsSingleTag)) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/tags`}>{/* TODO: {{ctx.Locale.PrettyNumber .NumTags}} */} {/* TODO: {{ctx.Locale.TrN .NumTags "repo.tag" "repo.tags"}} */}</a>
				</>) : null}
			</h2>
		</div>
		{(props.enableFeed) ? (<>
			<a className="ui small button" href={`${String(props.repoLink ?? "")}/${(props.pageIsTagList) ? `tags` : `releases`}.rss`}>
				<span className="svg-icon" aria-label="octicon-rss"></span> {i18n("rss_feed")}
			</a>
		</>) : null}
		{((!(props.pageIsTagList) && props.canCreateRelease)) ? (<>
			<a className="ui small primary button" href={`${String(props.repoLink ?? "")}/releases/new${(props.pageIsSingleTag) ? `?tag=${String(props.singleReleaseTagName ?? "")}` : ""}`}>
				{i18n("repo.release.new_release")}
			</a>
		</>) : null}
	</div>
	<div className="divider"></div>
</>) : null} {(props.canReadCode) ? (<>
	{/* if the "repo.releases" unit is disabled, only show the "commits / branches / tags" sub menu */}
	{/* template: repo/sub_menu */}
</>) : null}

  </>)
}
