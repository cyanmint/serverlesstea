import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function View(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository wiki view">
	{/* template: repo/header */}
	{/* $title */}
	<div className="ui container">
		<div className="repo-button-row">
			<div className="flex-text-block tw-flex-1">
				<div className="ui floating filter dropdown" data-no-results={String(i18n("no_results_found") ?? "")}>
					<div className="ui basic small button">
						<span className="text">
							{i18n("repo.wiki.page")}:
							<strong>{/* $title */}</strong>
						</span>
						<span className="svg-icon" aria-label="octicon-triangle-down"></span>
					</div>
					<div className="menu">
						<div className="ui icon search input">
							<i className="icon"><span className="svg-icon" aria-label="octicon-filter"></span></i>
							<input name="search" placeholder={`${i18n("repo.wiki.filter_page")}...`} />
						</div>
						<div className="scrolling menu">
							<a className="item muted" href={`${String(props.repoLink ?? "")}/wiki/?action=_pages`}>{i18n("repo.wiki.pages")}</a>
							<div className="divider"></div>
							{((props.pages) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className={`item ${(props.title === props.name) ? `selected` : ""}`} href={`${String(props.repoLink ?? "")}/wiki/${String(props.subURL ?? "")}`}>{item.name as any}</a>
							</React.Fragment>))}
						</div>
					</div>
				</div>
			</div>
			{/* template: repo/clone_panel */}
		</div>
		<div className="ui dividing header">
			<div className="flex-text-block tw-flex-wrap tw-justify-end">
				<div className="flex-text-block tw-flex-1 tw-min-w-[300px]">
					<a className="ui basic button tw-px-3 tw-gap-3" title={String(i18n("repo.wiki.file_revision") ?? "")} href={`${String(props.repoLink ?? "")}/wiki/${String(props.pageURL ?? "")}?action=_revision`} >{(props.commitCount) ? (<><span>{props.commitCount as any}</span> </>) : null}<span className="svg-icon" aria-label="octicon-history"></span></a>
					<div className="tw-flex-1 gt-ellipsis">
						{/* $title */}
						<div className="ui sub header gt-ellipsis">
							{/* $timeSince */}
							{i18n("repo.wiki.last_commit_info")}
						</div>
					</div>
				</div>
				<div className="repo-button-row">
					{(props.escapeStatus?.escaped) ? (<>
						<a className="ui small button unescape-button tw-hidden" data-unicode-content-selector=".wiki-content-parts">{i18n("repo.unescape_control_characters")}</a>
						<a className="ui small button escape-button" data-unicode-content-selector=".wiki-content-parts">{i18n("repo.escape_control_characters")}</a>
					</>) : null}
					{((props.canWriteWiki && !(props.repository?.isMirror))) ? (<>
						<a className="ui small button" href={`${String(props.repoLink ?? "")}/wiki/${String(props.pageURL ?? "")}?action=_edit`}>{i18n("repo.wiki.edit_page_button")}</a>
						<a className="ui small primary button" href={`${String(props.repoLink ?? "")}/wiki?action=_new`}>{i18n("repo.wiki.new_page_button")}</a>
						<a className="ui small red button link-action" href data-modal-confirm="#repo-wiki-delete-page-modal" data-url={`${String(props.repoLink ?? "")}/wiki/${String(props.pageURL ?? "")}?action=_delete`}>{i18n("repo.wiki.delete_page_button")}</a>
					</>) : null}
				</div>
			</div>
		</div>
		{(props.formatWarning) ? (<>
			<div className="ui negative message">
				<p>{props.formatWarning as any}</p>
			</div>
		</>) : null}

		<div className="wiki-content-parts">
			{(props.wikiSidebarTocHTML) ? (<>
			<div className="render-content markup wiki-content-sidebar wiki-content-toc">
				{props.wikiSidebarTocHTML as any}
			</div>
			</>) : null}

			<div className={`render-content markup wiki-content-main ${((props.wikiSidebarTocHTML || props.wikiSidebarHTML)) ? `with-sidebar` : ""}`}>
				{/* template: repo/unicode_escape_prompt */}
				{props.wikiContentHTML as any}
			</div>

			{(props.wikiSidebarHTML) ? (<>
			<div className="render-content markup wiki-content-sidebar">
				{((props.canWriteWiki && !(props.repository?.isMirror))) ? (<>
					<a className="tw-float-right muted" href={`${String(props.repoLink ?? "")}/wiki/_Sidebar?action=_edit`} aria-label={String(i18n("repo.wiki.edit_page_button") ?? "")}><span className="svg-icon" aria-label="octicon-pencil"></span></a>
				</>) : null}
				{props.wikiSidebarHTML as any}
			</div>
			</>) : null}

			<div className="tw-clear-both"></div>

			{(props.wikiFooterHTML) ? (<>
			<div className="render-content markup wiki-content-footer">
				{((props.canWriteWiki && !(props.repository?.isMirror))) ? (<>
					<a className="tw-float-right muted" href={`${String(props.repoLink ?? "")}/wiki/_Footer?action=_edit`} aria-label={String(i18n("repo.wiki.edit_page_button") ?? "")}><span className="svg-icon" aria-label="octicon-pencil"></span></a>
				</>) : null}
				{props.wikiFooterHTML as any}
			</div>
			</>) : null}
		</div>
	</div>
</div>

<div className="ui small modal" id="repo-wiki-delete-page-modal">
	<div className="header"><span className="svg-icon" aria-label="octicon-trash"></span> {i18n("repo.wiki.delete_page_button")}</div>
	<div className="content"><p>{i18n("repo.wiki.delete_page_notice_1")}</p></div>
	{/* template: base/modal_actions_confirm */}
</div>



  </>)
}
