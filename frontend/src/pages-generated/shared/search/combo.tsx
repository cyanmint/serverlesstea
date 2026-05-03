// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Combo(props: Record<string, unknown>) {
  return (<>
{/* Attributes:
* Value - value of the search field (for search results page)
* Disabled (optional) - if search field/button has to be disabled
* Placeholder (optional) - placeholder text to be used
* Tooltip (optional) - a tooltip to be displayed on button hover
* SearchModes - a list of search modes to be displayed in the dropdown
* SelectedSearchMode - the currently selected search mode */}
<div className="ui small fluid action input">
	{/* template: shared/search/input */}
	{(props.searchModes) ? (<>
		{/* $selected */}
		{((props.searchModes) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			{(item.mode?.modeValue === props.selectedSearchMode) ? (<>
				{/* TODO: {{$selected = $mode}} */}
			</>) : null}
		</React.Fragment>))}
		<div className={`ui small dropdown selection ${(props.disabled) ? `disabled` : ""}`} data-tooltip-content={String(i18n("search.type_tooltip") ?? "")}>
			<div className="text">{/* TODO: {{ctx.Locale.Tr $selected.TitleTrKey}} */}</div> <span className="svg-icon" aria-label="octicon-triangle-down"></span>
			<input name="search_mode" type="hidden" value={String("" ?? "")} />
			<div className="menu">
				{((props.searchModes) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<div className="item" data-value={String("" ?? "")} data-tooltip-content={String("" ?? "")}>{/* TODO: {{ctx.Locale.Tr $mode.TitleTrKey}} */}</div>
				</React.Fragment>))}
			</div>
		</div>
	</>) : null}
	{/* template: shared/search/button */}
</div>

  </>)
}
