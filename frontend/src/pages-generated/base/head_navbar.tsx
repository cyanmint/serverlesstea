import React from 'react'
import { i18n } from '../../lib/i18n'

export default function HeadNavbar(props: Record<string, unknown>) {
  return (<>
<nav id="navbar" aria-label={String(i18n("aria.navbar") ?? "")}>
	<div className="navbar-left">
		{/* the logo */}
		<a className="item" id="navbar-logo" href={`/`} aria-label={`${(props.isSigned) ? `${i18n("dashboard")}` : `${i18n("home_title")}`}`}>
			<img width="30" height="30" src={`/img/logo.svg`} alt={String(i18n("logo") ?? "")} aria-hidden="true" />
		</a>

		{/* mobile right menu, it must be here because in mobile view, each item is a flex column, the first item is a full row column */}
		<div className="ui secondary menu navbar-mobile-right only-mobile">
			{/* template: base/head_navbar_icons */}
			<button className="item ui icon mini button tw-m-0" id="navbar-expand-toggle" aria-label={String(i18n("home.nav_menu") ?? "")}><span className="svg-icon" aria-label="octicon-three-bars"></span></button>
		</div>

		{/* navbar links non-mobile */}
		{((props.isSigned && props.mustChangePassword)) ? (<>
			{/* No links */}
		</>) : null} {(props.isSigned) ? (<>
			{(!("ctx.Consts.RepoUnitTypeIssues.UnitGlobalDisabled")) ? (<>
				<a className={`item${(props.pageIsIssues) ? ` active` : ""}`} href={`/issues`}>{i18n("issues")}</a>
			</>) : null}
			{(!("ctx.Consts.RepoUnitTypePullRequests.UnitGlobalDisabled")) ? (<>
				<a className={`item${(props.pageIsPulls) ? ` active` : ""}`} href={`/pulls`}>{i18n("pull_requests")}</a>
			</>) : null}
			{(!(("ctx.Consts.RepoUnitTypeIssues.UnitGlobalDisabled" && "ctx.Consts.RepoUnitTypePullRequests.UnitGlobalDisabled"))) ? (<>
				{(props.showMilestonesDashboardPage) ? (<>
					<a className={`item${(props.pageIsMilestonesDashboard) ? ` active` : ""}`} href={`/milestones`}>{i18n("milestones")}</a>
				</>) : null}
			</>) : null}
			<a className={`item${(props.pageIsExplore) ? ` active` : ""}`} href={`/explore/repos`}>{i18n("explore_title")}</a>
		</>) : null} {(props.isLandingPageOrganizations) ? (<>
			<a className={`item${(props.pageIsExplore) ? ` active` : ""}`} href={`/explore/organizations`}>{i18n("explore_title")}</a>
		</>) : (<>
			<a className={`item${(props.pageIsExplore) ? ` active` : ""}`} href={`/explore/repos`}>{i18n("explore_title")}</a>
		</>)}

		{/* template: custom/extra_links */}

		{(!(props.isSigned)) ? (<>
			<a className="item" target="_blank" href="https://docs.gitea.com">{i18n("help")}</a>
		</>) : null}
	</div>

	{/* the full dropdown menus */}
	<div className="navbar-right">
		{((props.isSigned && props.mustChangePassword)) ? (<>
			<div className="ui dropdown jump item" data-tooltip-content={String(i18n("user_profile_and_more") ?? "")}>
				<span className="text">
					{/* TODO: {{ctx.AvatarUtils.Avatar .SignedUser 24 "tw-mr-1"}} */}
					<span className="only-mobile">{props.signedUser?.name as any}</span>
					<span className="not-mobile flex-text-block"><span className="svg-icon" aria-label="octicon-triangle-down"></span></span>
				</span>
				<div className="menu user-menu">
					<div className="header">
						{i18n("signed_in_as")} <strong>{props.signedUser?.name as any}</strong>
					</div>

					<div className="divider"></div>
					<a className="item" href={`/user/logout`}>
						<span className="svg-icon" aria-label="octicon-sign-out"></span>
						{i18n("sign_out")}
					</a>
				</div>{/* end content avatar menu */}
			</div>{/* end dropdown avatar menu */}
		</>) : null} {(props.isSigned) ? (<>
			{/* template: base/head_navbar_icons */}
			<div className="ui dropdown jump item" data-tooltip-content={String(i18n("create_new") ?? "")}>
				<span className="flex-text-block">
					<span className="svg-icon" aria-label="octicon-plus"></span>
					<span className="not-mobile flex-text-block"><span className="svg-icon" aria-label="octicon-triangle-down"></span></span>
					<span className="only-mobile">{i18n("create_new")}</span>
				</span>
				<div className="menu">
					<a className="item" href={`/repo/create`}>
						<span className="svg-icon" aria-label="octicon-plus"></span> {i18n("new_repo")}
					</a>
					{(!(props.disableMigrations)) ? (<>
						<a className="item" href={`/repo/migrate`}>
							<span className="svg-icon" aria-label="octicon-repo-push"></span> {i18n("new_migrate")}
						</a>
					</>) : null}
					{(props.signedUser?.canCreateOrganization) ? (<>
					<a className="item" href={`/org/create`}>
						<span className="svg-icon" aria-label="octicon-organization"></span> {i18n("new_org")}
					</a>
					</>) : null}
				</div>{/* end content create new menu */}
			</div>{/* end dropdown menu create new */}

			<div className="ui dropdown jump item" data-tooltip-content={String(i18n("user_profile_and_more") ?? "")}>
				<span className="text tw-flex tw-items-center">
					<span className="navbar-avatar">
						{/* TODO: {{ctx.AvatarUtils.Avatar .SignedUser 24 "tw-mr-2"}} */}
						{(props.isAdmin) ? (<><span className="svg-icon" aria-label="octicon-shield-check"></span></>) : null}
					</span>
					<span className="only-mobile">{props.signedUser?.name as any}</span>
					<span className="not-mobile flex-text-block"><span className="svg-icon" aria-label="octicon-triangle-down"></span></span>
				</span>
				<div className="menu user-menu">
					<div className="header">
						{i18n("signed_in_as")} <strong>{props.signedUser?.name as any}</strong>
					</div>

					<div className="divider"></div>
					<a className="item" href={String(props.signedUser?.homeLink ?? "")}>
						<span className="svg-icon" aria-label="octicon-person"></span>
						{i18n("your_profile")}
					</a>
					{(!(props.disableStars)) ? (<>
						<a className="item" href={`${String(props.signedUser?.homeLink ?? "")}?tab=stars`}>
							<span className="svg-icon" aria-label="octicon-star"></span>
							{i18n("your_starred")}
						</a>
					</>) : null}
					<a className="item" href={`/notifications/subscriptions`}>
						<span className="svg-icon" aria-label="octicon-bell"></span>
						{i18n("notification.subscriptions")}
					</a>
					<a className={`${(props.pageIsUserSettings) ? `active ` : ""}item`} href={`/user/settings`}>
						<span className="svg-icon" aria-label="octicon-tools"></span>
						{i18n("your_settings")}
					</a>
					<a className="item" target="_blank" href="https://docs.gitea.com">
						<span className="svg-icon" aria-label="octicon-question"></span>
						{i18n("help")}
					</a>
					{(props.isAdmin) ? (<>
					<div className="divider"></div>
					<a className={`${(props.pageIsAdmin) ? `active ` : ""}item`} href={`/-/admin`}>
						<span className="svg-icon" aria-label="octicon-server"></span>
						{i18n("admin_panel")}
					</a>
					</>) : null}
					<div className="divider"></div>
					<a className="item" href={`/user/logout`}>
						<span className="svg-icon" aria-label="octicon-sign-out"></span>
						{i18n("sign_out")}
					</a>
				</div>{/* end content avatar menu */}
			</div>{/* end dropdown avatar menu */}
		</>) : (<>
			{(props.showRegistrationButton) ? (<>
				<a className={`item${(props.pageIsSignUp) ? ` active` : ""}`} href={`/user/sign_up`}>
					<span className="svg-icon" aria-label="octicon-person"></span>
					<span className="tw-ml-1">{i18n("register")}</span>
				</a>
			</>) : null}
			<a className={`item${(props.pageIsSignIn) ? ` active` : ""}`} rel="nofollow" href={`/user/login`}>
				<span className="svg-icon" aria-label="octicon-sign-in"></span>
				<span className="tw-ml-1">{i18n("sign_in")}</span>
			</a>
		</>)}
	</div>{/* end full right menu */}

	{/* $activeStopwatch */}
	{(props.activeStopwatch) ? (<>
		<div className="active-stopwatch-popup tippy-target">
			<div className="flex-text-block tw-p-3">
				<a className="stopwatch-link flex-text-block muted" href={String("" ?? "")}>
					<span className="svg-icon" aria-label="octicon-issue-opened"></span>
					<span className="stopwatch-issue">{/* TODO: {{$activeStopwatch.RepoSlug}} */}#{/* TODO: {{$activeStopwatch.IssueIndex}} */}</span>
				</a>
				<div className="tw-flex tw-gap-1">
					<form className="stopwatch-commit form-fetch-action" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`/times/stopwatch/stop`}>
						<button
							type="submit"
							className="ui button mini compact basic icon tw-mr-0"
							data-tooltip-content={String(i18n("repo.issues.stop_tracking") ?? "")}
						><span className="svg-icon" aria-label="octicon-square-fill"></span></button>
					</form>
					<form className="stopwatch-cancel form-fetch-action" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`/times/stopwatch/cancel`}>
						<button
							type="submit"
							className="ui button mini compact basic icon tw-mr-0"
							data-tooltip-content={String(i18n("repo.issues.cancel_tracking") ?? "")}
						><span className="svg-icon" aria-label="octicon-trash"></span></button>
					</form>
				</div>
			</div>
		</div>
	</>) : null}
</nav>
{/* template: base/head_banner */}

  </>)
}
