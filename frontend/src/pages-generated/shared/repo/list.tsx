// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function List(props: Record<string, unknown>) {
  return (<>
<div className="flex-divided-list items-with-main">
	{((props.repos) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<div className="item">
			<div className="item-leading">
				{(props.showRepoOwnerAvatar) ? (<>
					{/* TODO: {{ctx.AvatarUtils.Avatar .Owner 24}} */}
				</>) : (<>
					{/* template: repo/icon */}
				</>)}
			</div>
			<div className="item-main">
				<div className="item-header">
					<div className="item-title">
						{((props.showRepoOwnerOnList && item.owner)) ? (<>
						<a className="tw-text-primary name" href={String(props.owner?.homeLink ?? "")}>{item.owner?.name as any}</a>/
						</>) : null}
						<a className="tw-text-primary name" href={String(props.link ?? "")}>{item.name as any}</a>
						<span className="label-list">
							{(item.isArchived) ? (<>
								<span className="ui basic label">{i18n("repo.desc.archived")}</span>
							</>) : null}
							{(item.isPrivate) ? (<>
								<span className="ui basic label">{i18n("repo.desc.private")}</span>
							</>) : (<>
								{(item.owner?.visibility?.isPrivate) ? (<>
									<span className="ui basic label">{i18n("repo.desc.internal")}</span>
								</>) : null}
							</>)}
							{(item.isTemplate) ? (<>
								<span className="ui basic label">{i18n("repo.desc.template")}</span>
							</>) : null}
							{(item.objectFormatName === "sha256") ? (<>
								<span className="ui basic label">{i18n("repo.desc.sha256")}</span>
							</>) : null}
						</span>
					</div>
					<div className="item-trailing muted-links">
						{(item.primaryLanguage) ? (<>
							<a className="flex-text-inline" href={`?q=${String(props.keyword ?? "")}&sort=${String(props.sortType ?? "")}&language=${String(props.primaryLanguage?.language ?? "")}${(props.tabName) ? `&tab=${String(props.tabName ?? "")}` : ""}`}>
								<i className="color-icon tw-mr-2" style={`background-color: ${String(props.primaryLanguage?.color ?? "")}`}></i>
								{item.primaryLanguage?.language as any}
							</a>
						</>) : null}
						{(!(props.disableStars)) ? (<>
							<a className="flex-text-inline" href={`${String(props.link ?? "")}/stars`}>
								<span className="tw-contents" aria-label={String(i18n("repo.stars") ?? "")}><span className="svg-icon" aria-label="octicon-star"></span></span>
								<span {...(item.numStars >= 1000 ? {"data-tooltip-content": String(props.numStars ?? "")} : {})}>{/* TODO: {{CountFmt .NumStars}} */}</span>
							</a>
						</>) : null}
						<a className="flex-text-inline" href={`${String(props.link ?? "")}/forks`}>
							<span className="tw-contents" aria-label={String(i18n("repo.forks") ?? "")}><span className="svg-icon" aria-label="octicon-git-branch"></span></span>
							<span {...(item.numForks >= 1000 ? {"data-tooltip-content": String(props.numForks ?? "")} : {})}>{/* TODO: {{CountFmt .NumForks}} */}</span>
						</a>
					</div>
				</div>
				{/* $description */}
				{(props.description) ? (<>
					<div className="item-body">{props.description as any}</div>
				</>) : null}
				{(item.topics) ? (<>
					<div className="label-list">
					{((item.topics) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						{("." !== "") ? (<><a className="ui label" href={`/explore/repos?q=&topic=1`}>{item as any}</a></>) : null}
					</React.Fragment>))}
					</div>
				</>) : null}
				<div className="item-body">{i18n("org.repo_updated")} {/* TODO: {{DateUtils.TimeSince .UpdatedUnix}} */}</div>
			</div>
		</div>
	{/* else */}
	<div>
		{i18n("search.no_results")}
	</div>
	</React.Fragment>))}
</div>

  </>)
}
