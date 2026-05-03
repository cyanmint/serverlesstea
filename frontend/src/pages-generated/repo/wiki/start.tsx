import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Start(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository wiki start">
	{/* template: repo/header */}
	<div className="ui container">
		<div className="ui center segment tw-py-8">
			<span className="svg-icon" aria-label="octicon-book"></span>
			<h2>{i18n("repo.wiki.welcome")}</h2>
			<p>{i18n("repo.wiki.welcome_desc")}</p>
			{((props.canWriteWiki && !(props.repository?.isMirror))) ? (<>
				<a className="ui primary button tw-mr-0" href={`${String(props.repoLink ?? "")}/wiki?action=_new`}>{i18n("repo.wiki.create_first_page")}</a>
			</>) : null}
		</div>
	</div>
</div>


  </>)
}
