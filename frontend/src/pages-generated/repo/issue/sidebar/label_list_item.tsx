// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function LabelListItem(props: Record<string, unknown>) {
  return (<>
{/* $label */}
{/* $labelLink */}
<a className={`item muted ${(props.label?.isChecked) ? `checkedtw-hidden` : ""}`} href={String("" ?? "")}
	data-scope={String("" ?? "")} data-value={String("" ?? "")} {...(props.label?.isArchived ? {"data-is-archived": true} : {})}
>
	<span className="item-check-mark">{/* TODO: {{svg (Iif $label.ExclusiveScope "octicon-dot-fill" "octicon-check")}} */}</span>
	{/* TODO: {{ctx.RenderUtils.RenderLabel $label}} */}
	<div className="item-secondary-info">
		{(props.label?.description) ? (<><div className="tw-pl-[20px]"><small>{/* TODO: {{$label.Description | ctx.RenderUtils.RenderEmoji}} */}</small></div></>) : null}
		<div className="archived-label-hint">{/* template: repo/issue/labels/label_archived */}</div>
	</div>
</a>

  </>)
}
