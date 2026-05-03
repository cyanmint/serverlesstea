// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function View(props: Record<string, unknown>) {
  return (<>
{/* $canWriteProject */}

<div className="ui container fluid padded projects-view" data-global-init="initRepoProjectsView">
	<div className="ui container flex-text-block project-header">
		<h2>{props.project?.title as any}</h2>
		<div className="tw-flex-1"></div>
		<div className="list-header-filters ui secondary menu tw-m-0">
			{/* $queryLink */}
			{/* template: repo/issue/filter_item_label */}
			{/* template: repo/issue/filter_item_user_assign */}
			{/* template: repo/issue/filter_item_milestone */}
		</div>
		{(props.canWriteProject) ? (<>
			<div className="ui compact mini menu">
				<a className="item screen-full">
					<span className="svg-icon" aria-label="octicon-screen-full"></span>
					{i18n("projects.enter_fullscreen")}
				</a>
				<a className="item screen-normal tw-hidden">
					<span className="svg-icon" aria-label="octicon-screen-normal"></span>
					{i18n("projects.exit_fullscreen")}
				</a>
				<a className="item" href={`${String(props.link ?? "")}/edit?redirect=project`}>
					<span className="svg-icon" aria-label="octicon-pencil"></span>
					{i18n("repo.issues.label_edit")}
				</a>
				{(props.project?.isClosed) ? (<>
					<button className="item btn link-action" data-url={`${String(props.link ?? "")}/open`}>
						<span className="svg-icon" aria-label="octicon-check"></span>
						{i18n("repo.projects.open")}
					</button>
				</>) : (<>
					<button className="item btn link-action" data-url={`${String(props.link ?? "")}/close`}>
						<span className="svg-icon" aria-label="octicon-skip"></span>
						{i18n("repo.projects.close")}
					</button>
				</>)}
				<button className="item btn link-action" data-url={`${String(props.link ?? "")}/delete?id=${String(props.project?.iD ?? "")}`}
								data-modal-confirm-header={String(i18n("repo.projects.deletion") ?? "")}
								data-modal-confirm-content={String(i18n("repo.projects.deletion_desc") ?? "")}
				>
					<span className="svg-icon" aria-label="octicon-trash"></span>
					{i18n("repo.issues.label_delete")}
				</button>
				<button className="item btn show-modal show-project-column-modal-edit" data-modal="#project-column-modal-edit"
								data-modal-header={String(i18n("repo.projects.column.new") ?? "")}
								data-modal-project-column-title-label={String(i18n("repo.projects.column.new_title") ?? "")}
								data-modal-project-column-button-save={String(i18n("repo.projects.column.new_submit") ?? "")}
								data-modal-project-column-id=""
								data-modal-project-column-title-input=""
								data-modal-project-column-color-input=""
				>
					<span className="svg-icon" aria-label="octicon-plus"></span>
					{i18n("new_project_column")}
				</button>
			</div>
		</>) : null}
	</div>

	<div className="ui container project-description">
		<div className="render-content markup">
			{props.project?.renderedContent as any}
		</div>
		<div className="divider"></div>
	</div>

	<div id="project-board" className={`board ${(props.canWriteProject) ? `sortable` : ""}`} data-project-board-writable={String("" ?? "")} {...(props.canWriteProject ? {"data-url": `${String(props.link ?? "")}/move`} : {})}>
		{((props.columns) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<div className="project-column" {...(item.color ? {"style": `background: ${String(props.color ?? "")} !important; color:  !important`} : {})} data-id={String(props.iD ?? "")} data-sorting={String(props.sorting ?? "")} data-url={`${String(props.link ?? "")}/${String(props.iD ?? "")}`}>
				<div className={`project-column-header${(props.canWriteProject) ? ` tw-cursor-grab` : ""}`}>
					<div className="ui circular label project-column-issue-count">
						{item.numIssues as any}
					</div>
					<div className="project-column-title-text flex-text-inline gt-ellipsis" {...(item.default ? {"data-tooltip-content": String(i18n("repo.projects.column.default_column_hint") ?? "")} : {})}>
						{(item.default) ? (<><span className="svg-icon" aria-label="octicon-star"></span> </>) : null}{item.title as any}
					</div>
					{(props.canWriteProject) ? (<>
						<div className="ui dropdown tw-p-1">
							<span className="svg-icon" aria-label="octicon-kebab-horizontal"></span>
							<div className="menu">
								<a className="item button show-modal show-project-column-modal-edit" data-modal="#project-column-modal-edit"
									data-modal-header={String(i18n("repo.projects.column.edit") ?? "")}
									data-modal-project-column-title-label={String(i18n("repo.projects.column.edit_title") ?? "")}
									data-modal-project-column-button-save={String(i18n("repo.projects.column.edit") ?? "")}
									data-modal-project-column-id={String(props.iD ?? "")}
									data-modal-project-column-title-input={String(props.title ?? "")}
									data-modal-project-column-color-input={String(props.color ?? "")}
								>
									<span className="svg-icon" aria-label="octicon-pencil"></span> {i18n("repo.projects.column.edit")}
								</a>
								{(!(item.default)) ? (<>
									<a className="item button link-action" data-url={`${String(props.link ?? "")}/${String(props.iD ?? "")}/default`}
										data-modal-confirm-header={String(i18n("repo.projects.column.set_default") ?? "")}
										data-modal-confirm-content={String(i18n("repo.projects.column.set_default_desc") ?? "")}
									>
										<span className="svg-icon" aria-label="octicon-star"></span> {i18n("repo.projects.column.set_default")}
									</a>
									<a className="item button link-action" data-url={`${String(props.link ?? "")}/${String(props.iD ?? "")}`} data-fetch-method="DELETE"
										data-modal-confirm-header={String(i18n("repo.projects.column.delete") ?? "")}
										data-modal-confirm-content={String(i18n("repo.projects.column.deletion_desc") ?? "")}
									>
										<span className="svg-icon" aria-label="octicon-trash"></span> {i18n("repo.projects.column.delete")}
									</a>
								</>) : null}
							</div>
						</div>
					</>) : null}
				</div>
				<div className="divider"{...(item.color ? {"style": `color:  !important`} : {})}></div>
				<div className="ui cards" data-url={`${String(props.link ?? "")}/${String(props.iD ?? "")}`} data-project={String(props.project?.iD ?? "")} data-board={String(props.iD ?? "")} id={`board_${String(props.iD ?? "")}`}>
					{((props.issuesMap?.[item.iD]) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<div className={`issue-card tw-break-anywhere ${(props.canWriteProject) ? `tw-cursor-grab` : ""}`} data-issue={String(props.iD ?? "")}>
							{/* template: repo/issue/card */}
						</div>
					</React.Fragment>))}
				</div>
			</div>
		</React.Fragment>))}
	</div>
</div>

{(props.canWriteProject) ? (<>
<div className="ui small modal" id="project-column-modal-edit">
	<div className="header">edit</div>
	<div className="content">
		<form className="ui form ignore-dirty" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} data-action-base-link={String(props.link ?? "")}>
			<input className="project-column-id" type="hidden" name="id" />
			<div className="required field">
				<label className="project-column-title-label" htmlFor="project-column-title-input">title</label>
				<input id="project-column-title-input" name="title" required />
			</div>
			<div className="field">
				<label className="project-column-color-label" htmlFor="project-column-color-input">color</label>
				<div className="color-picker-combo" data-global-init="initColorPicker">
					<input maxlength="7" placeholder="#c320f6" id="project-column-color-input" name="color" />
					{/* template: repo/issue/label_precolors */}
				</div>
			</div>
			<div className="actions">
				<button className="ui cancel button">{i18n("settings.cancel")}</button>
				<button type="submit" className="ui primary button project-column-button-save">save</button>
			</div>
		</form>
	</div>
</div>
</>) : null}

  </>)
}
