import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function LabelArchived(props: Record<string, unknown>) {
  return (<>
{(props.isArchived) ? (<>
	<span className="ui label basic small" data-tooltip-content={String(i18n("repo.issues.label_archive_tooltip") ?? "")}>
		{i18n("archived")}
	</span>
</>) : null}

  </>)
}
