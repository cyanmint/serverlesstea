// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Guide(props: Record<string, unknown>) {
  return (<>
<div className="tw-text-center tw-p-8">
	<span className="svg-icon" aria-label="octicon-package"></span>
	<h3 className="tw-my-4">{i18n("home.guide_title")}</h3>
	<p className="tw-text-placeholder-text">{i18n("home.guide_desc")}</p>
	<div>
		<a href={`/explore/repos`}>{i18n("home.explore_repos")}</a>
		<span>·</span>
		<a href={`/explore/users`}>{i18n("home.explore_users")}</a>
	</div>
</div>

  </>)
}
