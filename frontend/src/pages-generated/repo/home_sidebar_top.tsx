// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function HomeSidebarTop(props: Record<string, unknown>) {
  return (<>
<div className="repo-home-sidebar-top flex-relaxed-list">
	<form className="ignore-dirty tw-flex" action={`${String(props.repoLink ?? "")}/search`} method="get">
		<div className="ui small action input tw-flex tw-flex-1">
			<div className="ui input tw-flex tw-flex-1 global-shortcut-wrapper">
				<input name="q" size="10" placeholder={String(i18n("search.code_kind") ?? "")} />
				<kbd data-global-init="onGlobalShortcut" data-shortcut-keys="s">S</kbd>
			</div>
			{/* template: shared/search/button */}
		</div>
	</form>

	<div className="flex-relaxed-list">
		<div className="repo-home-sidebar-header">{i18n("repo.repo_desc")}</div>

		<div className="repo-description tw-break-anywhere tw-gap-2">
			{/* $description */}
			{(props.description) ? (<>{/* TODO: {{$description | RenderCodeBlock}} */}</>) : (<>{i18n("repo.repo_no_desc")}</>)}
		</div>

		{(props.repository?.website) ? (<>
			<a className="flex-text-block" href={String(props.repository?.website ?? "")}>
				<span className="svg-icon" aria-label="octicon-link"></span> <span className="tw-text-primary">{props.repository?.website as any}</span>
			</a>
		</>) : null}

		<div id="repo-topics" className="flex-text-block tw-flex-wrap tw-gap-1 tw-my-1 tw-text-text">
			{/* !!!! it SHOULD and MUST match the code in repo-home.ts */}
			{((props.topics) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}><a className="repo-topic ui large label gt-ellipsis" title={item.name as any} href={`/explore/repos?q=${String(props.name ?? "")}&topic=1`}>{item.name as any}</a></React.Fragment>))}
		</div>
		{((props.permission?.isAdmin && !(props.repository?.isArchived))) ? (<>
			<button id="manage_topic" className="btn interact-fg tw-mb-2 tw-text-12">{i18n("repo.topic.manage_topics")}</button>
			<div className="ui form tw-hidden tw-my-2" id="topic_edit">
				<div className="ui fluid multiple search selection dropdown tw-flex-wrap tw-flex-1">
					<input type="hidden" name="topics" value={`${String(props.name ?? "")}${((true /* TODO: Eval $i "+" 1 "<" (len $.Topics) */)) ? `,` : ""}`} />
					{((props.topics) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						{/* keep the same layout as Fomantic UI generated labels */}
						<a className="ui label transition visible tw-cursor-default tw-inline-block repo-topic" data-value={String(props.name ?? "")}>{item.name as any}<span className="svg-icon" aria-label="octicon-x"></span></a>
					</React.Fragment>))}
					<div className="text"></div>
				</div>
				<div className="tw-my-2">
					<button className="ui primary button" id="save_topic" data-link={`${String(props.repoLink ?? "")}/topics`}>{i18n("save")}</button>
					<button className="ui basic button" id="cancel_topic_edit">{i18n("cancel")}</button>
				</div>
			</div>
		</>) : null}

		{(props.readmeExist) ? (<>
			<a className="flex-text-block muted" href={`${String(props.repoLink ?? "")}/src/${String(props.refTypeNameSubURL ?? "")}/`}>
				<span className="svg-icon" aria-label="octicon-book"></span> {i18n("readme")}
			</a>
		</>) : null}

		{(props.detectedRepoLicenses) ? (<>
			<a className="flex-text-block muted" href={`${String(props.repoLink ?? "")}/src/${String(props.repository?.defaultBranch ?? "")}/`} title={String("" ?? "")}>
				<span className="svg-icon" aria-label="octicon-law"></span> {((true /* TODO: len .DetectedRepoLicenses */) === 1) ? (<>{/* TODO: {{index .DetectedRepoLicenses 0}} */}</>) : (<>{i18n("repo.multiple_licenses")}</>)}
			</a>
		</>) : null}

		{(props.citiationExist) ? (<>
			{/* template: repo/cite/cite_modal */}
			<a className="flex-text-block muted" id="cite-repo-button">
				<span className="svg-icon" aria-label="octicon-cross-reference"></span> {i18n("repo.cite_this_repo")}
			</a>
		</>) : null}
		<div className="flex-text-block muted" {...(!(props.repository?.size === 0) ? {"data-tooltip-placement": "top", "data-tooltip-content": String(props.repository?.sizeDetailsString ?? "")} : {})}>
			{/* $fileSizeFormatted */}{/* the formatted string is always "{val} {unit}" */}
			{/* $fileSizeFields */}
			<span className="svg-icon" aria-label="octicon-database"></span> <b>{/* TODO: {{ctx.Locale.PrettyNumber (index $fileSizeFields 0)}} */}</b> {/* TODO: {{index $fileSizeFields 1}} */}
		</div>
	</div>
</div>

  </>)
}
