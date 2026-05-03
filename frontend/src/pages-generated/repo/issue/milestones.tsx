import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Milestones(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository milestones">
	{/* template: repo/header */}
	<div className="ui container">
		{/* alert */}

		<div className="list-header">
			{/* template: repo/issue/navbar */}
			{/* template: repo/issue/search */}
			{(((props.canWriteIssues || props.canWritePulls) && !(props.repository?.isArchived))) ? (<>
				<a className="ui small primary button" href={`${String(props.link ?? "")}/new`}>{i18n("repo.milestones.new")}</a>
			</>) : null}
		</div>

		{/* template: repo/issue/filters */}

		{/* milestone list */}
		<div className="milestone-list">
			{((props.milestones) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<li className="milestone-card">
					<div className="milestone-header">
						<h3 className="flex-text-block tw-m-0">
							<span className="svg-icon" aria-label="octicon-milestone"></span>
							<a className="muted" href={`${String(props.repoLink ?? "")}/milestone/${String(props.iD ?? "")}`}>{item.name as any}</a>
						</h3>
						<div className="tw-flex tw-items-center">
							<span className="tw-mr-2">{item.completeness as any}%</span>
							<progress value={String(props.completeness ?? "")} max="100"></progress>
						</div>
					</div>
					<div className="milestone-toolbar">
						<div className="group">
							<div className="flex-text-block">
								<span className="svg-icon" aria-label="octicon-issue-opened"></span>
								{/* TODO: {{ctx.Locale.PrettyNumber .NumOpenIssues}} */}&nbsp;{i18n("repo.issues.open_title")}
							</div>
							<div className="flex-text-block">
								<span className="svg-icon" aria-label="octicon-check"></span>
								{/* TODO: {{ctx.Locale.PrettyNumber .NumClosedIssues}} */}&nbsp;{i18n("repo.issues.closed_title")}
							</div>
							{(item.totalTrackedTime) ? (<>
								<div className="flex-text-block">
									<span className="svg-icon" aria-label="octicon-clock"></span>
									{item.totalTrackedTime|Sec2Hour as any}
								</div>
							</>) : null}
							{(item.updatedUnix) ? (<>
								<div className="flex-text-block">
									<span className="svg-icon" aria-label="octicon-clock"></span>
									{i18n("repo.milestones.update_ago")}
								</div>
							</>) : null}
							<div className="flex-text-block">
								{(item.isClosed) ? (<>
									{/* $closedDate */}
									<span className="svg-icon" aria-label="octicon-clock"></span>
									{i18n("repo.milestones.closed")}
								</>) : (<>
									{(item.deadlineString) ? (<>
										<span className={`flex-text-inline ${(props.isOverdue) ? `tw-text-red` : ""}`}>
											<span className="svg-icon" aria-label="octicon-calendar"></span>
											{/* TODO: {{DateUtils.AbsoluteShort (.DeadlineString|DateUtils.ParseLegacy)}} */}
										</span>
									</>) : (<>
										<span className="svg-icon" aria-label="octicon-calendar"></span>
										{i18n("repo.milestones.no_due_date")}
									</>)}
								</>)}
							</div>
						</div>
						{(((props.canWriteIssues || props.canWritePulls) && !(props.repository?.isArchived))) ? (<>
							<div className="group">
								<a className="flex-text-inline" href={`${String(props.link ?? "")}/${String(props.iD ?? "")}/edit`}><span className="svg-icon" aria-label="octicon-pencil"></span>{i18n("repo.issues.label_edit")}</a>
								{(item.isClosed) ? (<>
									<a className="link-action flex-text-inline" href data-url={`${String(props.link ?? "")}/${String(props.iD ?? "")}/open`}><span className="svg-icon" aria-label="octicon-check"></span>{i18n("repo.milestones.open")}</a>
								</>) : (<>
									<a className="link-action flex-text-inline" href data-url={`${String(props.link ?? "")}/${String(props.iD ?? "")}/close`}><span className="svg-icon" aria-label="octicon-x"></span>{i18n("repo.milestones.close")}</a>
								</>)}
								<a className="link-action flex-text-inline tw-text-red" href data-modal-confirm="#repo-milestone-delete-modal" data-url={`${String(props.repoLink ?? "")}/milestones/delete?id=${String(props.iD ?? "")}`}><span className="svg-icon" aria-label="octicon-trash"></span>{i18n("repo.issues.label_delete")}</a>
							</div>
						</>) : null}
					</div>
					{(item.content) ? (<>
						<div className="render-content markup">{item.renderedContent as any}</div>
					</>) : null}
				</li>
			</React.Fragment>))}

			{/* template: base/paginate */}
		</div>
	</div>
</div>

{((props.canWriteIssues || props.canWritePulls)) ? (<>
	<div className="ui small modal" id="repo-milestone-delete-modal">
		<div className="header"><span className="svg-icon" aria-label="octicon-trash"></span> {i18n("repo.milestones.deletion")}</div>
		<div className="content"><p>{i18n("repo.milestones.deletion_desc")}</p></div>
		{/* template: base/modal_actions_confirm */}
	</div>
</>) : null}



  </>)
}
