import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository releases">
	{/* template: repo/header */}
	<div className="ui container">
		{/* alert */}
		{/* template: repo/release_tag_header */}
		<ul id="release-list">
			{((props.releases) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				{/* $release */}
				<li className="release-entry">
					<div className="meta">
						<a className="muted" href={`${(!((props.release?.sha1 && props.permission?.canRead?.("ctx.Consts.RepoUnitTypeCode")))) ? `#` : `${String(props.repoLink ?? "")}/src/tag/`}`} rel="nofollow"><span className="svg-icon" aria-label="octicon-tag"></span>{/* TODO: {{$release.TagName}} */}</a>
						{((item.release?.sha1 && props.permission?.canRead?.("ctx.Consts.RepoUnitTypeCode"))) ? (<>
							<a className="muted tw-font-mono" href={`${String(props.repoLink ?? "")}/src/commit/`} rel="nofollow"><span className="svg-icon" aria-label="octicon-git-commit"></span>{/* TODO: {{ShortSha $release.Sha1}} */}</a>
							{/* $compareTarget */}
							{(item.release?.isDraft) ? (<>
									{/* TODO: {{$compareTarget = $release.Target}} */}
							</>) : null} {(item.release?.tagName) ? (<>
									{/* TODO: {{$compareTarget = $release.TagName}} */}
							</>) : (<>
								{/* TODO: {{$compareTarget = $release.Sha1}} */}
							</>)}
							{/* template: repo/branch_dropdown */}
						</>) : null}
					</div>
					<div className="ui segment detail">
						<div className="flex-left-right tw-mb-2">
							<h4 className="release-list-title tw-break-anywhere">
								{(props.pageIsSingleTag) ? (<>{/* TODO: {{$release.Title}} */}</>) : (<><a className="muted" href={`${String(props.repoLink ?? "")}/releases/tag/`}>{/* TODO: {{$release.Title}} */}</a></>)}
								{/* template: repo/commit_statuses */}
								{/* template: repo/release/label */}
							</h4>
							<div>
								{((props.canCreateRelease && !(props.pageIsSingleTag))) ? (<>
									<a className="muted" data-tooltip-content={String(i18n("repo.release.edit") ?? "")} href={`${String(props.repoLink ?? "")}/releases/edit/`} rel="nofollow">
										<span className="svg-icon" aria-label="octicon-pencil"></span>
									</a>
								</>) : null}
							</div>
						</div>
						<p className="tw-text-text-light">
							<span className="author">
							{(item.release?.originalAuthor) ? (<>
								{/* TODO: {{svg (MigrationIcon $release.Repo.GetOriginalURLHostname) 20 "tw-mr-1"}} */}{/* TODO: {{$release.OriginalAuthor}} */}
							</>) : null} {(item.release?.publisher) ? (<>
								{/* TODO: {{ctx.AvatarUtils.Avatar $release.Publisher 20 "tw-mr-1"}} */}
								{(item.release?.publisherID > 0) ? (<>
									<a href={String("" ?? "")}>{/* TODO: {{$release.Publisher.GetDisplayName}} */}</a>
								</>) : (<>
									{/* TODO: {{$release.Publisher.GetDisplayName}} */}
								</>)}
							</>) : (<>
								Ghost
							</>)}
							</span>
							<span className="released">
								{i18n("repo.released_this")}
							</span>
							{(item.release?.createdUnix) ? (<>
								<span className="time">{/* TODO: {{DateUtils.TimeSince $release.CreatedUnix}} */}</span>
							</>) : null}
							{((item.release?.numCommits > 0 && !(item.release?.isDraft) && props.permission?.canRead?.("ctx.Consts.RepoUnitTypeCode"))) ? (<>
								| <span className="ahead"><a href={`${String(props.repoLink ?? "")}/compare/...`}>{i18n("repo.release.ahead.commits")}</a> {i18n("repo.release.ahead.target")}</span>
							</>) : null}
						</p>
						<div className="render-content markup">
							{/* TODO: {{$release.RenderedNote}} */}
						</div>
						<div className="divider"></div>
						<details className="download" {...(props.idx === 0 ? {"open": true} : {})}>
							<summary>
								{i18n("repo.release.downloads")}
							</summary>
							<ul className="ui divided list attachment-list">
								{(($release.Attachments) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									<li className="item">
										<a target="_blank" className="tw-flex-1 gt-ellipsis" rel="nofollow" download href={String("" ?? "")}>
											<strong className="flex-text-inline"><span className="svg-icon" aria-label="octicon-package"></span><span className="gt-ellipsis">{/* TODO: {{$att.Name}} */}</span></strong>
										</a>
										<div className="attachment-right-info flex-text-inline">
											<span className="tw-pl-5">{/* TODO: {{$att.Size | FileSize}} */}</span>
											<span className="flex-text-inline" data-tooltip-content={String(i18n("repo.release.download_count") ?? "")}>
												<span className="svg-icon" aria-label="octicon-info"></span>
											</span>
											<div className="tw-flex-1"></div>
											{/* TODO: {{DateUtils.TimeSince $att.CreatedUnix}} */}
										</div>
									</li>
								</React.Fragment>))}
								{((!(props.disableDownloadSourceArchives) && !(item.release?.isDraft) && props.permission?.canRead?.("ctx.Consts.RepoUnitTypeCode"))) ? (<>
									<li className="item">
										<a className="archive-link" download href={`${String(props.repoLink ?? "")}/archive/.zip`} rel="nofollow">
											<strong className="flex-text-inline"><span className="svg-icon" aria-label="octicon-file-zip"></span>{i18n("repo.release.source_code")} (ZIP)</strong>
										</a>
									</li>
									<li className="item">
										<a className="archive-link" download href={`${String(props.repoLink ?? "")}/archive/.tar.gz`} rel="nofollow">
											<strong className="flex-text-inline"><span className="svg-icon" aria-label="octicon-file-zip"></span>{i18n("repo.release.source_code")} (TAR.GZ)</strong>
										</a>
									</li>
								</>) : null}
							</ul>
						</details>
					</div>
				</li>
			</React.Fragment>))}
		</ul>

		{/* template: base/paginate */}
	</div>
</div>

{((props.permission?.canWrite?.("ctx.Consts.RepoUnitTypeCode") && props.pageIsTagList)) ? (<>
	<div className="ui g-modal-confirm delete modal">
		<div className="header">
			<span className="svg-icon" aria-label="octicon-trash"></span>
			{i18n("repo.release.delete_tag")}
		</div>
		<div className="content">
			<p>{i18n("repo.release.deletion_tag_desc")}</p>
		</div>
		{/* template: base/modal_actions_confirm */}
	</div>
</>) : null}



  </>)
}
