import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function ReferenceLink(props: Record<string, unknown>) {
  return (<>
<div className="divider"></div>
{/* $issueReferenceLink */}
<div className="flex-text-block" data-tooltip-content={String("" ?? "")}>
	<span className="tw-flex-1 gt-ellipsis">{i18n("repo.issues.reference_link")}</span>
	<button className="ui compact tiny icon button" data-clipboard-text={String("" ?? "")}><span className="svg-icon" aria-label="octicon-copy"></span></button>
</div>

  </>)
}
