import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository tags">
	{/* template: repo/header */}
	<div className="ui container">
		{/* alert */}
		{/* template: repo/release_tag_header */}
		<h4 className="ui top attached header">
			{props.tagCount as any} {i18n("repo.release.tags")}
		</h4>
		{/* $canReadReleases */}
		<div className="ui attached segment">
			<form className="ignore-dirty" method="get">
				{/* template: shared/search/combo */}
			</form>
		</div>
		<div className="ui attached segment tw-p-0">
			{(props.releases) ? (<>
				<div className="ui divided list" id="tags-table">
				{((props.releases) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<div className="item tag-list-row tw-p-4">
						<h3 className="tag-list-row-title tw-mb-2">
							{("$canReadReleases") ? (<>
								<a className="tag-list-row-link" href={`${String(props.repoLink ?? "")}/releases/tag/${String(props.tagName | PathEscapeSegments ?? "")}`} rel="nofollow">{item.tagName as any}</a>
							</>) : (<>
								<a className="tag-list-row-link" href={`${String(props.repoLink ?? "")}/src/tag/${String(props.tagName | PathEscapeSegments ?? "")}`} rel="nofollow">{item.tagName as any}</a>
							</>)}
						</h3>
						<div className="flex-text-block muted-links tw-gap-4 tw-flex-wrap">
							{(props.permission?.canRead ctx?.consts?.repoUnitTypeCode) ? (<>
								{(item.createdUnix) ? (<>
									<span className="flex-text-inline"><span className="svg-icon" aria-label="octicon-clock"></span>{/* TODO: {{DateUtils.TimeSince .CreatedUnix}} */}</span>
								</>) : null}

								<a className="flex-text-inline tw-font-mono" href={`${String(props.repoLink ?? "")}/src/commit/${String(props.sha1 ?? "")}`} rel="nofollow"><span className="svg-icon" aria-label="octicon-git-commit"></span>{/* TODO: {{ShortSha .Sha1}} */}</a>

								{(!(props.disableDownloadSourceArchives)) ? (<>
									<a className="archive-link flex-text-inline" href={`${String(props.repoLink ?? "")}/archive/${String(props.tagName | PathEscapeSegments ?? "")}.zip`} rel="nofollow"><span className="svg-icon" aria-label="octicon-file-zip"></span>ZIP</a>
									<a className="archive-link flex-text-inline" href={`${String(props.repoLink ?? "")}/archive/${String(props.tagName | PathEscapeSegments ?? "")}.tar.gz`} rel="nofollow"><span className="svg-icon" aria-label="octicon-file-zip"></span>TAR.GZ</a>
								</>) : null}

								{(("$canReadReleases" && props.canCreateRelease && "$release.IsTag")) ? (<>
									<a className="flex-text-inline" href={`${String(props.repoLink ?? "")}/releases/new?tag=${String(props.tagName ?? "")}`}><span className="svg-icon" aria-label="octicon-tag"></span>{i18n("repo.release.new_release")}</a>
								</>) : null}

								{((props.repository?.canContentChange && props.permission?.canWrite ctx?.consts?.repoUnitTypeCode && "$release.IsTag")) ? (<>
									<a className="flex-text-inline link-action" data-url={`${String(props.repoLink ?? "")}/tags/delete?id=${String(props.iD ?? "")}`} data-modal-confirm="#confirm-delete-tag-modal">
										<span className="svg-icon" aria-label="octicon-trash"></span>{i18n("repo.release.delete_tag")}
									</a>
								</>) : null}

								{(("$canReadReleases" && !("$release.IsTag"))) ? (<>
									<a className="flex-text-inline" href={`${String(props.repoLink ?? "")}/releases/tag/${String(props.tagName | PathEscapeSegments ?? "")}`}><span className="svg-icon" aria-label="octicon-tag"></span>{i18n("repo.release.detail")}</a>
								</>) : null}
							</>) : null}
						</div>
					</div>
				</React.Fragment>))}
				</div>
			</>) : (<>
				{(props.numTags) ? (<>
					<p className="tw-p-4">{i18n("no_results_found")}</p>
				</>) : null}
			</>)}
		</div>
		{/* template: base/paginate */}
	</div>
</div>

{(props.permission?.canWrite ctx?.consts?.repoUnitTypeCode) ? (<>
<div id="confirm-delete-tag-modal" className="ui small modal">
	<div className="header">
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
