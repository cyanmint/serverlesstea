import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function ShowRole(props: Record<string, unknown>) {
  return (<>
{((props.showRole?.isPoster && !(props.ignorePoster))) ? (<>
	<div className="ui basic label role-label" data-tooltip-content={String(i18n("repo.issues.author_helper") ?? "")}>
		{i18n("repo.issues.author")}
	</div>
</>) : null}
{(props.showRole?.roleInRepo) ? (<>
	<div className="ui basic label role-label" data-tooltip-content={String(props.showRole?.roleInRepo?.localeHelper ctx?.locale ?? "")}>
		{props.showRole?.roleInRepo?.localeString ctx?.locale as any}
	</div>
</>) : null}

  </>)
}
