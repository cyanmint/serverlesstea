// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Navbar(props: Record<string, unknown>) {
  return (<>
<div className="secondary-nav tw-border-b tw-border-b-secondary">
	<div className="ui secondary stackable menu">
		<div className="item">
			<div className="ui floating dropdown jump">
				<span className="text">
					{/* TODO: {{ctx.AvatarUtils.Avatar .ContextUser 24 "tw-mr-1"}} */}
					<span className="gt-ellipsis">{props.contextUser?.shortName?.(40) as any}</span>
					<span className="org-visibility">
						{(props.contextUser?.visibility?.isLimited) ? (<><div className="ui basic tiny horizontal label">{i18n("org.settings.visibility.limited_shortname")}</div></>) : null}
						{(props.contextUser?.visibility?.isPrivate) ? (<><div className="ui basic tiny horizontal label">{i18n("org.settings.visibility.private_shortname")}</div></>) : null}
					</span>
					<span className="svg-icon" aria-label="octicon-triangle-down"></span>
				</span>
				<div className="menu context-user-switch">
					<div className="header">
						{i18n("home.switch_dashboard_context")}
					</div>
					<div className="scrolling menu">
						<a className={`${(props.contextUser?.iD === props.signedUser?.iD) ? `active selected` : ""} item`} href={`/${(props.pageIsIssues) ? `issuespullsmilestones` : ""}`}>
							{/* TODO: {{ctx.AvatarUtils.Avatar .SignedUser}} */}
							<span className="gt-ellipsis">{props.signedUser?.shortName?.(40) as any}</span>
							<span className="org-visibility">
								{(props.signedUser?.visibility?.isLimited) ? (<><div className="ui basic tiny horizontal label">{i18n("org.settings.visibility.limited_shortname")}</div></>) : null}
								{(props.signedUser?.visibility?.isPrivate) ? (<><div className="ui basic tiny horizontal label">{i18n("org.settings.visibility.private_shortname")}</div></>) : null}
							</span>
						</a>
						{((props.orgs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<a className={`${(props.contextUser?.iD === props.iD) ? `active selected` : ""} item`} title={String(props.name ?? "")} href={`${String(props.organisationLink ?? "")}/${(props.pageIsIssues) ? `issuespullsmilestones` : `dashboard`}`}>
								{/* TODO: {{ctx.AvatarUtils.Avatar .}} */}
								<span className="gt-ellipsis">{item.shortName?.(40) as any}</span>
								<span className="org-visibility">
									{(item.visibility?.isLimited) ? (<><div className="ui basic tiny horizontal label">{i18n("org.settings.visibility.limited_shortname")}</div></>) : null}
									{(item.visibility?.isPrivate) ? (<><div className="ui basic tiny horizontal label">{i18n("org.settings.visibility.private_shortname")}</div></>) : null}
								</span>
							</a>
						</React.Fragment>))}
					</div>
					{(props.signedUser?.canCreateOrganization) ? (<>
					<a className="item" href={`/org/create`}>
						<span className="svg-icon" aria-label="octicon-plus"></span>{i18n("new_org")}
					</a>
					</>) : null}
				</div>
			</div>
		</div>
		{(props.contextUser?.isOrganization) ? (<>
			<div className="item">
				<div className="ui floating dropdown jump">
					<span className="text">
						<span className="svg-icon" aria-label="octicon-people"></span>
						{(props.team) ? (<>
							{props.team?.name as any}
						</>) : (<>
							{i18n("org.teams")}
						</>)}
					</span>
					<span className="svg-icon" aria-label="octicon-triangle-down"></span>
					<div className="context user overflow menu">
						<div className="header">
							{i18n("home.filter_by_team_repositories")}
						</div>
						<div className="scrolling menu items">
							<a className={`${(!(props.team)) ? `active selected` : ""} item`} title={String(i18n("all") ?? "")} href={`${String(props.org?.organisationLink ?? "")}/${(props.pageIsIssues) ? `issuespullsmilestones` : `dashboard`}`}>
								{i18n("all")}
							</a>
							{((props.teams) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								{(!(item.includesAllRepositories)) ? (<>
									<a className={`${(props.team) ? `${(props.team?.iD === props.iD) ? `active selected` : ""}` : ""} item`} title={String(props.name ?? "")} href={`${String(props.org?.organisationLink ?? "")}/${(props.pageIsIssues) ? `issuespullsmilestones` : `dashboard`}/${String(props.name ?? "")}`}>
										{item.name as any}
									</a>
								</>) : null}
							</React.Fragment>))}
						</div>
					</div>
				</div>
			</div>
		</>) : null}

	{(props.contextUser?.isOrganization) ? (<>
		<div className="right menu tw-flex-wrap tw-justify-end">
			<a className={`${(props.pageIsNews) ? `active ` : ""}item tw-ml-auto`} href={`${String(props.contextUser?.dashboardLink ?? "")}${(props.team) ? `/` : ""}`}>
				<span className="svg-icon" aria-label="octicon-rss"></span>&nbsp;{i18n("activities")}
			</a>
			{(!("ctx.Consts.RepoUnitTypeIssues.UnitGlobalDisabled")) ? (<>
			<a className={`${(props.pageIsIssues) ? `active ` : ""}item`} href={`${String(props.contextUser?.organisationLink ?? "")}/issues${(props.team) ? `/` : ""}`}>
				<span className="svg-icon" aria-label="octicon-issue-opened"></span>&nbsp;{i18n("issues")}
			</a>
			</>) : null}
			{(!("ctx.Consts.RepoUnitTypePullRequests.UnitGlobalDisabled")) ? (<>
			<a className={`${(props.pageIsPulls) ? `active ` : ""}item`} href={`${String(props.contextUser?.organisationLink ?? "")}/pulls${(props.team) ? `/` : ""}`}>
				<span className="svg-icon" aria-label="octicon-git-pull-request"></span>&nbsp;{i18n("pull_requests")}
			</a>
			</>) : null}
			{((props.showMilestonesDashboardPage && !(("ctx.Consts.RepoUnitTypeIssues.UnitGlobalDisabled" && "ctx.Consts.RepoUnitTypePullRequests.UnitGlobalDisabled")))) ? (<>
			<a className={`${(props.pageIsMilestonesDashboard) ? `active ` : ""}item`} href={`${String(props.contextUser?.organisationLink ?? "")}/milestones${(props.team) ? `/` : ""}`}>
				<span className="svg-icon" aria-label="octicon-milestone"></span>&nbsp;{i18n("milestones")}
			</a>
			</>) : null}
			<div className="item">
				<a className="ui primary basic button" href={String(props.contextUser?.homeLink ?? "")} title={String(i18n("home.view_home") ?? "")}>
					{i18n("home.view_home")}
				</a>
			</div>
		</div>
	</>) : null}
	</div>
</div>

  </>)
}
