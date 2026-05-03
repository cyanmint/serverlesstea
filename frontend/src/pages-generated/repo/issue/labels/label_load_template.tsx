import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function LabelLoadTemplate(props: Record<string, unknown>) {
  return (<>
<div className="ui centered grid">
	<div className="twelve wide computer column">
		<p>{i18n("repo.issues.label_templates.info")}</p>
		<form className="ui form center" action={`${String(props.link ?? "")}/initialize`} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<div className="field">
				<div className="ui selection dropdown">
					<input type="hidden" name="template_name" value="Default" />
					<div className="default text">{i18n("repo.issues.label_templates.helper")}</div>
					<div className="menu">
						{((props.labelTemplateFiles) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<div className="item" data-value={String(props.displayName ?? "")}>{item.displayName as any}<br /><i>({item.description as any})</i></div>
						</React.Fragment>))}
					</div>
					<span className="svg-icon" aria-label="octicon-triangle-down"></span>
				</div>
			</div>
			<button type="submit" className="ui primary button">{i18n("repo.issues.label_templates.use")}</button>
		</form>
	</div>
</div>

  </>)
}
