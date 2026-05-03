import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Stats(props: Record<string, unknown>) {
  return (<>
{/* Template Attributes:
* Addition: Number of additions
* Deletion: Number of deletions
* Classes: Additional classes for the root element */}
{((props.addition || props.deletion)) ? (<>
<div className={`flex-text-block tw-flex-shrink-0 tw-text-[13px] ${(props.classes) ? `${String(props.classes ?? "")}` : ""}`}>
	<span>
		{(props.addition) ? (<><span className="tw-text-diff-added-fg">+{props.addition as any}</span></>) : null}
		{(props.deletion) ? (<><span className="tw-text-diff-removed-fg">-{props.deletion as any}</span></>) : null}
	</span>
	<span className="diff-stats-bar" data-tooltip-content={String(i18n("repo.diff.stats_desc_file") ?? "")}>
		{/* if the denominator is zero, then the float result is "width: NaNpx", as before, it just works */}
		<div className="diff-stats-add-bar" style={`width: %`}></div>
	</span>
</div>
</>) : null}

  </>)
}
