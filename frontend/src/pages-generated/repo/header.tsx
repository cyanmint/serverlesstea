import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Header(props: Record<string, unknown>) {
  return (<>
<div className="secondary-nav">
	{(props.repository) && (<>
	<div className="ui container">
		<div className="repo-header flex-left-right">
			{/* left part */}
			<div className="flex-text-block">
				{/* template: repo/icon */}
				<div className="flex-text-block tw-flex-wrap tw-text-18">
					<a className="muted tw-font-normal" href={String(props.owner?.homeLink ?? "")}>{props.owner?.name as any}</a>/<a className="muted" href={String(props.repoLink ?? "")}>{props.name as any}</a>
				</div>
				<div className="flex-text-block tw-flex-wrap">
					{(props.isArchived) ? (<>
						<span className="ui basic label not-mobile">{i18n("repo.desc.archived")}</span>
						<div className="repo-icon only-mobile" data-tooltip-content={String(i18n("repo.desc.archived") ?? "")}><span className="svg-icon" aria-label="octicon-archive"></span></div>
					</>) : null}
					{(props.isPrivate) ? (<>
						<span className="ui basic label not-mobile">{i18n("repo.desc.private")}</span>
						<div className="repo-icon only-mobile" data-tooltip-content={String(i18n("repo.desc.private") ?? "")}><span className="svg-icon" aria-label="octicon-lock"></span></div>
					</>) : (<>
						{(props.owner?.visibility?.isPrivate) ? (<>
							<span className="ui basic label not-mobile">{i18n("repo.desc.internal")}</span>
							<div className="repo-icon only-mobile" data-tooltip-content={String(i18n("repo.desc.internal") ?? "")}><span className="svg-icon" aria-label="octicon-shield-lock"></span></div>
						</>) : null}
					</>)}
					{(props.permission?.hasAnyUnitPublicAccess) ? (<>
						<span className="ui basic orange label">{i18n("repo.desc.public_access")}</span>
					</>) : null}
					{(props.isTemplate) ? (<>
						<span className="ui basic label not-mobile">{i18n("repo.desc.template")}</span>
						<div className="repo-icon only-mobile" data-tooltip-content={String(i18n("repo.desc.template") ?? "")}><span className="svg-icon" aria-label="octicon-repo-template"></span></div>
					</>) : null}
					{(props.objectFormatName === "sha256") ? (<>
						<span className="ui basic label">{i18n("repo.desc.sha256")}</span>
					</>) : null}
				</div>
			</div>
			{(!((props.isBeingCreated || props.isBroken))) ? (<>
				{/* right part */}
				<div className="flex-text-block tw-flex-wrap">
					{(props.canUserAcceptOrRejectTransfer) ? (<>
						<button type="button" className="ui compact small basic primary button link-action" data-url={`${String(props.repoLink ?? "")}/action/accept_transfer`}
							data-tooltip-content={String(i18n("repo.transfer.accept_desc") ?? "")}
						>{i18n("repo.transfer.accept")}</button>
						<button type="button" className="ui compact small basic red button link-action" data-url={`${String(props.repoLink ?? "")}/action/reject_transfer`}
							data-tooltip-content={String(i18n("repo.transfer.reject_desc") ?? "")}
						>{i18n("repo.transfer.reject")}</button>
					</>) : null} {(props.repoTransfer) ? (<>
						<div data-tooltip-content={String(i18n("repo.transfer.is_transferring_prompt") ?? "")}>
							<button className="ui compact small basic red button" disabled>{i18n("repo.transfer.is_transferring")}</button>
						</div>
					</>) : null}
					{(props.enableFeed) ? (<>
					{/* An extra div-element is not necessary here, as this button does not secretly contain two buttons. */}
					<a className="ui compact small basic button" href={`${String(props.repoLink ?? "")}.rss`} data-tooltip-content={String(i18n("rss_feed") ?? "")}>
						<span className="svg-icon" aria-label="octicon-rss"></span>
					</a>
					</>) : null}
					{/* template: repo/header/watch */}
					{(!(props.disableStars)) ? (<>
					{/* template: repo/header/star */}
					</>) : null}
					{((!(props.isEmpty) && props.permission?.canRead?.("ctx.Consts.RepoUnitTypeCode"))) ? (<>
						{/* template: repo/header/fork */}
					</>) : null}
				</div>
			</>) : null}
		</div>

		{/* next line, secondary info */}
		{(props.pullMirror) ? (<>
			<div className="secondary-info">
				{i18n("repo.mirror_from")}
				<a target="_blank" href={String(props.pullMirror?.remoteAddress ?? "")}>{props.pullMirror?.remoteAddress as any}</a>
				{(props.pullMirror?.updatedUnix) ? (<>{i18n("repo.mirror_sync")} {/* TODO: {{DateUtils.TimeSince $.PullMirror.UpdatedUnix}} */}</>) : null}
			</div>
		</>) : null}
		{(props.isFork) ? (<><div className="secondary-info">{i18n("repo.forked_from")} <a href={String(props.baseRepo?.link ?? "")}>{props.baseRepo?.fullName as any}</a></div></>) : null}
		{(props.isGenerated) ? (<><div className="secondary-info">{i18n("repo.generated_from")} <a href={String("" ?? "")}>{/* TODO: {{(.TemplateRepo ctx).FullName}} */}</a></div></>) : null}
	</div>
	</>) }

	<div className="ui container">
		<overflow-menu className="ui secondary pointing menu">
			{(!((props.repository?.isBeingCreated || props.repository?.isBroken))) ? (<>
				<div className="overflow-menu-items">
					{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeCode")) ? (<>
					<a className={`${(props.pageIsViewCode) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}${((props.branchName !== props.repository?.defaultBranch && !(props.pageIsWiki))) ? `/src/${String(props.refTypeNameSubURL ?? "")}` : ""}`}>
						<span className="svg-icon" aria-label="octicon-code"></span> {i18n("repo.code")}
					</a>
					</>) : null}

					{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeIssues")) ? (<>
						<a className={`${(props.pageIsIssueList) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/issues`}>
							<span className="svg-icon" aria-label="octicon-issue-opened"></span> {i18n("repo.issues")}
							{(props.repository?.numOpenIssues) ? (<>
								<span className="ui small label">{/* TODO: {{CountFmt .Repository.NumOpenIssues}} */}</span>
							</>) : null}
						</a>
					</>) : null}

					{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeExternalTracker")) ? (<>
						<a className={`${(props.pageIsIssueList) ? `active ` : ""}item`} href={String(props.repoExternalIssuesLink ?? "")} target="_blank">
							<span className="svg-icon" aria-label="octicon-link-external"></span> {i18n("repo.issues")}
						</a>
					</>) : null}

					{((props.repository?.canEnablePulls && props.permission?.canRead?.("ctx.Consts.RepoUnitTypePullRequests"))) ? (<>
						<a className={`${(props.pageIsPullList) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/pulls`}>
							<span className="svg-icon" aria-label="octicon-git-pull-request"></span> {i18n("repo.pulls")}
							{(props.repository?.numOpenPulls) ? (<>
								<span className="ui small label">{/* TODO: {{CountFmt .Repository.NumOpenPulls}} */}</span>
							</>) : null}
						</a>
					</>) : null}

					{((props.enableActions && props.permission?.canRead?.("ctx.Consts.RepoUnitTypeActions") && !(props.isEmptyRepo))) ? (<>
						<a className={`${(props.pageIsActions) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/actions`}>
							<span className="svg-icon" aria-label="octicon-play"></span> {i18n("actions.actions")}
							{(props.repository?.numOpenActionRuns) ? (<>
								<span className="ui small label">{/* TODO: {{CountFmt .Repository.NumOpenActionRuns}} */}</span>
							</>) : null}
						</a>
					</>) : null}

					{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypePackages")) ? (<>
						<a href={`${String(props.repoLink ?? "")}/packages`} className={`${(props.isPackagesPage) ? `active ` : ""}item`}>
							<span className="svg-icon" aria-label="octicon-package"></span> {i18n("packages.title")}
						</a>
					</>) : null}

					{/* $projectsUnit */}
					{((!("ctx.Consts.RepoUnitTypeProjects.UnitGlobalDisabled") && props.permission?.canRead?.("ctx.Consts.RepoUnitTypeProjects") && props.projectsUnit?.projectsConfig?.isProjectsAllowed?.("repo"))) ? (<>
						<a href={`${String(props.repoLink ?? "")}/projects`} className={`${(props.isProjectsPage) ? `active ` : ""}item`}>
							<span className="svg-icon" aria-label="octicon-project"></span> {i18n("repo.projects")}
							{(props.repository?.numOpenProjects) ? (<>
								<span className="ui small label">{/* TODO: {{CountFmt .Repository.NumOpenProjects}} */}</span>
							</>) : null}
						</a>
					</>) : null}

					{((props.permission?.canRead?.("ctx.Consts.RepoUnitTypeReleases") && !(props.isEmptyRepo))) ? (<>
					<a className={`${((props.pageIsReleaseList || props.pageIsTagList)) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/releases`}>
						<span className="svg-icon" aria-label="octicon-tag"></span> {i18n("repo.releases")}
						{(props.numReleases) ? (<>
							<span className="ui small label">{/* TODO: {{CountFmt .NumReleases}} */}</span>
						</>) : null}
					</a>
					</>) : null}

					{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeWiki")) ? (<>
						<a className={`${(props.pageIsWiki) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/wiki`}>
							<span className="svg-icon" aria-label="octicon-book"></span> {i18n("repo.wiki")}
						</a>
					</>) : null}

					{(props.permission?.canRead?.("ctx.Consts.RepoUnitTypeExternalWiki")) ? (<>
						<a className="item" href={String("" ?? "")} target="_blank">
							<span className="svg-icon" aria-label="octicon-link-external"></span> {i18n("repo.wiki")}
						</a>
					</>) : null}

					{((props.permission?.canReadAny?.("ctx.Consts.RepoUnitTypePullRequests", "ctx.Consts.RepoUnitTypeIssues", "ctx.Consts.RepoUnitTypeReleases", "ctx.Consts.RepoUnitTypeCode") && !(props.isEmptyRepo))) ? (<>
						<a className={`${(props.pageIsActivity) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/activity`}>
							<span className="svg-icon" aria-label="octicon-pulse"></span> {i18n("repo.activity")}
						</a>
					</>) : null}

					{/* template: custom/extra_tabs */}

					{(props.permission?.isAdmin) ? (<>
						<span className="item-flex-space"></span>
						<a className={`${(props.pageIsRepoSettings) ? `active ` : ""} item`} href={`${String(props.repoLink ?? "")}/settings`}>
							<span className="svg-icon" aria-label="octicon-tools"></span> {i18n("repo.settings")}
						</a>
					</>) : null}
				</div>
			</>) : (<>
				<div className="overflow-menu-items">
					{((props.repository?.isBeingCreated && props.permission?.canRead?.("ctx.Consts.RepoUnitTypeCode"))) ? (<>
					<a className={`${(!(props.pageIsRepoSettings)) ? `active ` : ""}item`} href={String(props.repoLink ?? "")}>
						<span className="svg-icon" aria-label="octicon-clock"></span> {i18n("repo.migration_status")}
					</a>
					</>) : null}

					{(props.permission?.isAdmin) ? (<>
					<a className={`${(props.pageIsRepoSettings) ? `active ` : ""} item`} href={`${String(props.repoLink ?? "")}/settings`}>
						<span className="svg-icon" aria-label="octicon-tools"></span> {i18n("repo.settings")}
					</a>
					</>) : null}
				</div>
			</>)}
		</overflow-menu>
	</div>
	<div className="ui tabs divider"></div>
</div>

  </>)
}
