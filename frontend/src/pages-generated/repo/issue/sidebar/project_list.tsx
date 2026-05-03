import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function ProjectList(props: Record<string, unknown>) {
  return (<>
{/* $pageMeta */}
{/* $data */}
<div className="divider"></div>

{/* project selector */}
<div className="issue-sidebar-combo sidebar-project-combo" data-selection-mode="multiple" data-update-algo="all"
		{...(props.pageMeta?.issue ? {"data-update-url": `/issues/projects?issue_ids=`} : {})}
>
	<input className="combo-value" name="project_ids" type="hidden" value={String("" ?? "")} />
	<div className={`ui dropdown full-width ${(!(props.pageMeta?.canModifyIssueOrPull)) ? `disabled` : ""}`}>
		<a className="fixed-text muted">
			<strong>{i18n("repo.issues.new.projects")}</strong> {(props.pageMeta?.canModifyIssueOrPull) ? (<><span className="svg-icon" aria-label="octicon-gear"></span></>) : null}
		</a>
		<div className="menu">
			{((props.data?.openProjects || props.data?.closedProjects)) ? (<>
			<div className="ui icon search input">
				<i className="icon"><span className="svg-icon" aria-label="octicon-search"></span></i>
				<input type="text" placeholder={String(i18n("repo.issues.filter_projects") ?? "")} />
			</div>
			</>) : null}
			<div className="scrolling menu flex-items-menu">
				<div className="item clear-selection" data-text="">{i18n("repo.issues.new.clear_projects")}</div>
				<div className="divider"></div>
				{(props.data?.openProjects) ? (<>
					<div className="header">{i18n("repo.issues.new.open_projects")}</div>
					{(($data.OpenProjects) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<a className="item muted" data-value={String(props.iD ?? "")} href={String(props.link?.(ctx) ?? "")}>
							<span className="item-check-mark"><span className="svg-icon" aria-label="octicon-check"></span></span>
							{/* TODO: {{svg .IconName 18}} */}<span className="tw-flex-1 gt-ellipsis">{item.title as any}</span>
						</a>
					</React.Fragment>))}
				</>) : null}
				{((props.data?.openProjects && props.data?.closedProjects)) ? (<><div className="divider"></div></>) : null}
				{(props.data?.closedProjects) ? (<>
					<div className="header">{i18n("repo.issues.new.closed_projects")}</div>
					{(($data.ClosedProjects) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<a className="item muted" data-value={String(props.iD ?? "")} href={String(props.link?.(ctx) ?? "")}>
							<span className="item-check-mark"><span className="svg-icon" aria-label="octicon-check"></span></span>
							{/* TODO: {{svg .IconName 18}} */}<span className="tw-flex-1 gt-ellipsis">{item.title as any}</span>
						</a>
					</React.Fragment>))}
				</>) : null}
			</div>
		</div>
	</div>

	{/* project cards (column selectors) */}
	<div className="ui list tw-my-2 flex-relaxed-list issue-sidebar-project-cards" data-combo-list-inited="true">
		<div className={`item empty-list ${(props.data?.projectCards) ? `tw-hidden` : ""}`}>{i18n("repo.issues.new.no_projects")}</div>
	{(($data.ProjectCards) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		{/* $selectedColumn */}
		{/* only show a "project column card" if the selected column exists, otherwise only show the project title */}
		<div className={`item ${(props.selectedColumn) ? `sidebar-project-card` : ""}`}>
			<a className="suppressed flex-text-block" href={String("" ?? "")}>
				{/* TODO: {{svg $card.Project.IconName 16}} */} <span className="gt-ellipsis">{/* TODO: {{$card.Project.Title}} */}</span>
			</a>
			{((props.selectedColumn && item.pageMeta?.canModifyIssueOrPull)) ? (<>
				<div className="issue-sidebar-combo sidebar-project-column-combo" data-selection-mode="single" data-update-algo="all"
					data-update-url={`/issues/projects/column?issue_id=`}
				>
					<input className="combo-value" name="column_id" type="hidden" value={`${(props.selectedColumn) ? `` : ""}`} />
					<div className="ui dropdown full-width">
						<div className="flex-text-block tw-ml-[16px]">{/* align with the "project" icon */}
							<div className="interact-bg tw-px-2 tw-py-1 tw-rounded flex-text-block fixed-text">
								{(props.selectedColumn) ? (<>
									{(item.card?.selectedColumn?.color) ? (<><span className="color-icon icon-size-8" style={`background-color: `}></span></>) : null}
									<div className="gt-ellipsis">{/* TODO: {{$card.SelectedColumn.Title}} */}</div>
								</>) : (<>
									<div className="gt-ellipsis">{i18n("repo.issues.new.no_column")}</div>
								</>)}
								<span className="svg-icon" aria-label="octicon-triangle-down"></span>
							</div>
						</div>
						<div className="menu flex-items-menu">
							{(($card.Columns) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<a className="item" data-value={String("" ?? "")}>
									<span className="item-check-mark"><span className="svg-icon" aria-label="octicon-check"></span></span>
									{(item.columnItem?.color) ? (<><span className="color-icon icon-size-8" style={`background-color: `}></span></>) : null}
									<div className="gt-ellipsis">{/* TODO: {{$columnItem.Title}} */}</div>
								</a>
							</React.Fragment>))}
						</div>
					</div>
				</div>
			</>) : null} {(props.selectedColumn) ? (<>
				<div className="flex-text-block tw-my-1 tw-ml-[22px]">{/* align with the "project" icon */}
					{(item.selectedColumn?.color) ? (<><span className="color-icon icon-size-8" style={`background-color: `}></span></>) : null}
					<div className="gt-ellipsis">{/* TODO: {{$selectedColumn.Title}} */}</div>
				</div>
			</>) : null}
		</div>
	</React.Fragment>))}
	</div>
</div>

  </>)
}
