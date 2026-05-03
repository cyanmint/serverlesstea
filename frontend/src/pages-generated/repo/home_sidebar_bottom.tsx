// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function HomeSidebarBottom(props: Record<string, unknown>) {
  return (<>
<div className="repo-home-sidebar-bottom flex-relaxed-list">
	{(props.latestRelease) ? (<>
		<div className="divider"></div>
		<div className="repo-home-sidebar-header">
			<a className="item muted" href={`${String(props.repoLink ?? "")}/releases`}>
				{i18n("repo.releases")}
			</a>
			<span className="ui small label">{props.numReleases as any}</span>
		</div>
		<div className="flex-relaxed-list">
			<div className="flex-text-block">
				<div><span className="svg-icon" aria-label="octicon-tag"></span></div>
				<a className="gt-ellipsis muted" href={String(props.latestRelease?.link ?? "")} title={String(props.latestRelease?.title ?? "")}>{props.latestRelease?.title as any}</a>
				<div className="tw-shrink-0">
					{/* template: repo/release/label */}
				</div>
			</div>
			<div className="tw-ml-[24px]">{/* TODO: {{DateUtils.TimeSince .LatestRelease.CreatedUnix}} */}</div>
		</div>
	</>) : null}

	{((!(props.isEmptyRepo) && props.languageStats)) ? (<>
		<div className="divider"></div>
		<div className="repo-home-sidebar-header">
			{i18n("repo.repo_lang")}
		</div>

		<div>
			<div className="language-stats">
				{((props.languageStats) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="bar" style={`width: ${String(props.percentage ?? "")}%; background-color: ${String(props.color ?? "")}`} data-tooltip-placement="top" data-tooltip-content={String(props.language ?? "")} data-tooltip-follow-cursor="horizontal"></div>
				</React.Fragment>))}
			</div>
			<div className="language-stats-details">
				{((props.languageStats) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="item">
					<i className="color-icon" style={`background-color: ${String(props.color ?? "")}`}></i>
					<strong className="tw-font-semibold">
						{/* TODO: {{Iif (eq .Language "other") (ctx.Locale.Tr "repo.language_other") .Language}} */}
					</strong>
					{item.percentage as any}%
				</div>
				</React.Fragment>))}
			</div>
		</div>
	</>) : null}
</div>

  </>)
}
