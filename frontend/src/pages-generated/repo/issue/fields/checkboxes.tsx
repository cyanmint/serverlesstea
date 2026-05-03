import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Checkboxes(props: Record<string, unknown>) {
  return (<>
<div className={`field ${(!(props.item?.visibleOnForm)) ? `tw-hidden` : ""}`}>
	{/* template: repo/issue/fields/header */}
	{((props.item?.attributes?.options) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<div className="field inline">
			<div className={`ui checkbox tw-mr-0 ${(("$opt.visible" && !("SliceUtils.Contains $opt.visible "form""))) ? `tw-hidden` : ""}`}>
				<input type="checkbox" name={`form-field-${String(props.item?.iD ?? "")}-`} {...("$opt.required" ? {"required": true} : {})} />
				<label>{/* TODO: {{ctx.RenderUtils.MarkdownToHtml $opt.label}} */}</label>
			</div>
			{("$opt.required") ? (<>
				<label className="required"></label>
			</>) : null}
		</div>
	</React.Fragment>))}
</div>

  </>)
}
