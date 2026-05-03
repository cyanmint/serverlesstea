import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function View(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository projects view-project">
	{/* template: repo/header */}
	<div className="ui container padded">
		<div className="flex-text-block tw-justify-end tw-mb-4">
			<a className="ui small button" href={`${String(props.repoLink ?? "")}/labels`}>{i18n("repo.labels")}</a>
			<a className="ui small button" href={`${String(props.repoLink ?? "")}/milestones`}>{i18n("repo.milestones")}</a>
			<a className="ui small primary button" href={`${String(props.repoLink ?? "")}/issues/new/choose?project=${String(props.project?.iD ?? "")}`}>{i18n("repo.issues.new")}</a>
		</div>
	</div>
	{/* template: projects/view */}
</div>



  </>)
}
