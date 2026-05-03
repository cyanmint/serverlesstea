import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Dropdown(props: Record<string, unknown>) {
  return (<>
<div className={`field ${(!(props.item?.visibleOnForm)) ? `tw-hidden` : ""}`}>
	{/* template: repo/issue/fields/header */}
	{/* FIXME: required validation */}
	<div className={`ui fluid selection dropdown ${(props.item?.attributes?.multiple) ? `multiple clearable` : ""}`}>
		<input type="hidden" name={`form-field-${String(props.item?.iD ?? "")}`} value={String(props.item?.attributes?.default ?? "")} />
		<span className="svg-icon" aria-label="octicon-triangle-down"></span>
		{(!(props.item?.validations?.required)) ? (<>
		<span className="svg-icon" aria-label="octicon-x"></span>
		</>) : null}
		<div className="default text"></div>
		<div className="menu">
			{((props.item?.attributes?.options) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<div className="item" data-value={String("" ?? "")}>{props.opt as any}</div>
			</React.Fragment>))}
		</div>
	</div>
</div>

  </>)
}
