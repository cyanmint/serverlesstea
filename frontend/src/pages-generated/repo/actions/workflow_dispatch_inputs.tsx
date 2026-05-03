// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function WorkflowDispatchInputs(props: Record<string, unknown>) {
  return (<>
<div id="runWorkflowDispatchModalInputs">
{(!(props.workflowDispatchConfig)) ? (<>
	<div className="ui error message tw-block">{/* using "ui message" in "ui form" needs to force to display */}
		{(!(props.curWorkflowExists)) ? (<>
			{i18n("actions.workflow.not_found")}
		</>) : (<>
			{i18n("actions.workflow.has_no_workflow_dispatch")}
		</>)}
	</div>
</>) : (<>
	{((props.workflowDispatchConfig?.inputs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<div className={`ui field ${(props.required) ? `required` : ""}`}>
			{(item.type === "choice") ? (<>
				<label>{/* TODO: {{or .Description .Name}} */}:</label>
				<select className="ui selection dropdown" name={String(props.name ?? "")}>
					{((item.options) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<option value={String("" ?? "")} {...(item.item?.default === "." ? {"selected": true} : {})}>{item as any}</option>
					</React.Fragment>))}
				</select>
			</>) : null} {(item.type === "boolean") ? (<>
				<label className="tw-flex flex-text-inline">
					<input type="checkbox" name={String(props.name ?? "")} {...(item.default === "true" ? {"checked": true} : {})} />
					{/* TODO: {{or .Description .Name}} */}
				</label>
			</>) : null} {(item.type === "number") ? (<>
				<label>{/* TODO: {{or .Description .Name}} */}:</label>
				<input name={String(props.name ?? "")} value={String(props.default ?? "")} {...(item.required ? {"required": true} : {})} />
			</>) : (<>
				<label>{/* TODO: {{or .Description .Name}} */}:</label>
				<input name={String(props.name ?? "")} value={String(props.default ?? "")} {...(item.required ? {"required": true} : {})} />
			</>)}
		</div>
	</React.Fragment>))}
	<div className="ui field">
		{/* use autofocus here to prevent the "branch selection" dropdown from getting focus, otherwise it will auto popup */}
		<button className="ui tiny primary button" autofocus type="submit">{i18n("actions.workflow.run")}</button>
	</div>
</>)}
{((props.workflows) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
	{((item.errMsg && item.entry?.name === props.curWorkflow)) ? (<>
		<div className="ui field">
			<div><span className="svg-icon" aria-label="octicon-alert"></span> {item.errMsg as any}</div>
		</div>
	</>) : null}
</React.Fragment>))}
</div>

  </>)
}
