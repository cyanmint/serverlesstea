// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Header(props: Record<string, unknown>) {
  return (<>
{((props.item?.attributes?.label && !(props.item?.attributes?.hide_label))) ? (<>
	<h3>{props.item?.attributes?.label as any}{(props.item?.validations?.required) ? (<><label className="required"></label></>) : null}</h3>
</>) : null}
{(props.item?.attributes?.description) ? (<>
	<span className="help">{/* TODO: {{ctx.RenderUtils.MarkdownToHtml .item.Attributes.description}} */}</span>
</>) : null}

  </>)
}
