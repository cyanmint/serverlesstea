import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Navbar(props: Record<string, unknown>) {
  return (<>
{/* $canReadCode */}

<div className="ui fluid vertical menu">
	{/* the default activity page "pulse" could work with any permission: code, issue, pr, release */}
	<a className={`${(props.pageIsPulse) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/activity`}>
		{i18n("repo.activity.navbar.pulse")}
	</a>
	{("$canReadCode") ? (<>
		<a className={`${(props.pageIsContributors) ? `active ` : ""}item`} href={`${String(props.repoLink ?? "")}/activity/contributors`}>
			{i18n("repo.activity.navbar.contributors")}
		</a>
		<a className={`${(props.pageIsCodeFrequency) ? `active` : ""} item`} href={`${String(props.repoLink ?? "")}/activity/code-frequency`}>
			{i18n("repo.activity.navbar.code_frequency")}
		</a>
		<a className={`${(props.pageIsRecentCommits) ? `active` : ""} item`} href={`${String(props.repoLink ?? "")}/activity/recent-commits`}>
			{i18n("repo.activity.navbar.recent_commits")}
		</a>
	</>) : null}
</div>

  </>)
}
