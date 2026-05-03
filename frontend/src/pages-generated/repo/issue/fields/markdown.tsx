import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Markdown(props: Record<string, unknown>) {
  return (<>
<div className={`field ${(!(props.item?.visibleOnForm)) ? `tw-hidden` : ""}`}>
	<div className="render-content markup">{/* TODO: {{ctx.RenderUtils.MarkdownToHtml .item.Attributes.value}} */}</div>
</div>

  </>)
}
