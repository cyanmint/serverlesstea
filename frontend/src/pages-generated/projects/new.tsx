import React from 'react'
import { i18n } from '../../lib/i18n'

export default function New(props: Record<string, unknown>) {
  return (<>
<h2 className="ui dividing header">
	{(props.pageIsEditProjects) ? (<>
		{i18n("repo.projects.edit")}
		<div className="sub header">{i18n("repo.projects.edit_subheader")}</div>
	</>) : (<>
		{i18n("repo.projects.new")}
		<div className="sub header">{i18n("repo.projects.new_subheader")}</div>
	</>)}
</h2>
{/* alert */}
<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
	<div>
		<input type="hidden" id="redirect" name="redirect" value={String(props.redirect ?? "")} />
		<div className={`field ${(props.err_Title) ? `error` : ""}`}>
			<label>{i18n("repo.projects.title")}</label>
			<input name="title" placeholder={String(i18n("repo.projects.title") ?? "")} value={String(props.title ?? "")} autofocus required />
		</div>
		<div className="field">
			<label>{i18n("repo.projects.description")}</label>
			{/* TODO: repo-level project and org-level project have different behaviors to render */}
			{/* "Repository" is nil when the project is owner-level, "Org" can be nil when owner is indivdual user */}
			{/* $markdownEditorContext */}
			{/* template: shared/combomarkdowneditor */}
		</div>

		{(!(props.pageIsEditProjects)) ? (<>
			<div className="field">
				<label>{i18n("repo.projects.template.desc")}</label>
				<div className="ui selection dropdown">
					<input type="hidden" name="template_type" value={String(props.type ?? "")} />
					<div className="default text">{i18n("repo.projects.template.desc_helper")}</div>
					<div className="menu">
						{((props.templateConfigs) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							<div className="item" data-id={String("" ?? "")} data-value={String("" ?? "")}>{/* TODO: {{ctx.Locale.Tr $element.Translation}} */}</div>
						</React.Fragment>))}
					</div>
				</div>
			</div>
		</>) : null}

		<div className="field">
			<label>{i18n("repo.projects.card_type.desc")}</label>
			<div className="ui selection dropdown">
				<span className="svg-icon" aria-label="octicon-triangle-down"></span>
				{((props.cardTypes) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					{((props.card_type === item.element?.cardType || (!(props.pageIsEditProjects) && item.element?.cardType === 1))) ? (<>
						<input type="hidden" name="card_type" value={String("" ?? "")} />
						<div className="default text">{/* TODO: {{ctx.Locale.Tr $element.Translation}} */}</div>
					</>) : null}
				</React.Fragment>))}
				<div className="menu">
					{((props.cardTypes) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<div className="item" data-id={String("" ?? "")} data-value={String("" ?? "")}>{/* TODO: {{ctx.Locale.Tr $element.Translation}} */}</div>
					</React.Fragment>))}
				</div>
			</div>
		</div>
	</div>
	<div className="divider"></div>
	<div className="flex-text-block tw-justify-end">
		<a className="ui cancel button" href={String(props.cancelLink ?? "")}>
			{i18n("repo.milestones.cancel")}
		</a>
		<button className="ui primary button">
			{(props.pageIsEditProjects) ? (<>{i18n("repo.projects.modify")}</>) : (<>{i18n("repo.projects.create")}</>)}
		</button>
	</div>
</form>

  </>)
}
