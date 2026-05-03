// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function ClonePanel(props: Record<string, unknown>) {
  return (<>
<button className="ui compact primary button js-btn-clone-panel">
	<span className="svg-icon" aria-label="octicon-code"></span>
	<span>{i18n("repo.code")}</span>
	<span className="svg-icon" aria-label="octicon-triangle-down"></span>
</button>
<div className="clone-panel-popup tippy-target">
	<div className="flex-text-block clone-panel-field"><span className="svg-icon" aria-label="octicon-terminal"></span> Clone</div>

	<div className="clone-panel-tab">
		{/* there is always at least one button (guaranteed by context/repo.go) */}
		{(props.cloneButtonShowHTTPS) ? (<>
			<button className="item repo-clone-https" data-link={String(props.cloneButtonOriginLink?.hTTPS ?? "")}>HTTPS</button>
		</>) : null}
		{(props.cloneButtonShowSSH) ? (<>
			<button className="item repo-clone-ssh" data-link={String(props.cloneButtonOriginLink?.sSH ?? "")}>SSH</button>
		</>) : null}
		<button className="item repo-clone-tea" data-link={String(props.cloneButtonOriginLink?.tea ?? "")}>Tea CLI</button>
	</div>
	<div className="divider"></div>

	<div className="clone-panel-field">
		<div className="ui input tiny action">
			<input size="30" className="repo-clone-url js-clone-url" value={String(props.cloneButtonOriginLink?.hTTPS ?? "")} readonly />
			<div className="ui small compact icon button" data-clipboard-target=".js-clone-url" data-tooltip-content={String(i18n("copy_url") ?? "")}>
				<span className="svg-icon" aria-label="octicon-copy"></span>
			</div>
		</div>
	</div>

	{(!(props.pageIsWiki)) ? (<>
		<div className="flex-items-block clone-panel-list">
			{((props.openWithEditorApps) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<a className="item muted js-clone-url-editor" data-href-template={String(props.openURL ?? "")}>{item.iconHTML as any}{i18n("repo.open_with_editor")}</a>
			</React.Fragment>))}
		</div>

		{((!(props.disableDownloadSourceArchives) && props.refFullName)) ? (<>
		<div className="divider"></div>
		<div className="flex-items-block clone-panel-list">
				{/* FIXME: here it only uses the shortname in the ref to build the link, it can't distinguish the branch/tag/commit with the same name
					in the future, it's better to use something like "/archive/branch/the-name.zip", "/archive/tag/the-name.zip" */}
				<a className="item muted archive-link" href={`${String(props.repoLink ?? "")}/archive/.zip`} rel="nofollow"><span className="svg-icon" aria-label="octicon-file-zip"></span> {i18n("repo.download_zip")}</a>
				<a className="item muted archive-link" href={`${String(props.repoLink ?? "")}/archive/.tar.gz`} rel="nofollow"><span className="svg-icon" aria-label="octicon-file-zip"></span> {i18n("repo.download_tar")}</a>
				<a className="item muted archive-link" href={`${String(props.repoLink ?? "")}/archive/.bundle`} rel="nofollow"><span className="svg-icon" aria-label="octicon-package"></span> {i18n("repo.download_bundle")}</a>
		</div>
		</>) : null}
	</>) : null}
</div>

  </>)
}
