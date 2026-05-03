import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function IssueDependencies(props: Record<string, unknown>) {
  return (<>
{(props.repository?.isDependenciesEnabled?.(ctx)) ? (<>
	<div className="divider"></div>

	<div className="ui depending">
		{((!(props.blockedByDependencies) && !(props.blockedByDependenciesNotPermitted) && !(props.blockingDependencies) && !(props.blockingDependenciesNotPermitted))) ? (<>
			<span className="text"><strong>{i18n("repo.issues.dependency.title")}</strong></span>
			<br />
			<p>
				{(props.issue?.isPull) ? (<>
					{i18n("repo.issues.dependency.pr_no_dependencies")}
				</>) : (<>
					{i18n("repo.issues.dependency.issue_no_dependencies")}
				</>)}
			</p>
		</>) : null}

		{((props.blockingDependencies || props.blockingDependenciesNotPermitted)) ? (<>
			<span className="text" data-tooltip-content={`${(props.issue?.isPull) ? `${i18n("repo.issues.dependency.pr_close_blocks")}` : `${i18n("repo.issues.dependency.issue_close_blocks")}`}`}>
				<strong>{i18n("repo.issues.dependency.blocks_short")}</strong>
			</span>
			<div className="ui divided list">
				{((props.blockingDependencies) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<div className={`item dependency${(props.issue?.isClosed) ? ` is-closed` : ""} flex-left-right`}>
						<div className="item-left tw-flex tw-justify-center tw-flex-col tw-flex-1 gt-ellipsis">
							<a className="muted issue-dependency-title gt-ellipsis" href={String(props.issue?.link ?? "")} data-tooltip-content={`#${String(props.issue?.index ?? "")} ${String(props.issue?.title?.("|", "ctx.RenderUtils.RenderEmoji") ?? "")}`}>
								#{item.issue?.index as any} {item.issue?.title?.("|", "ctx.RenderUtils.RenderEmoji") as any}
							</a>
							<div className="tw-text-xs gt-ellipsis" data-tooltip-content={`${String(props.repository?.ownerName ?? "")}/${String(props.repository?.name ?? "")}`}>
								{item.repository?.ownerName as any}/{item.repository?.name as any}
							</div>
						</div>
						<div className="item-right tw-flex tw-items-center tw-m-1">
							{((props.canCreateIssueDependencies && !(props.repository?.isArchived))) ? (<>
								<a className="muted show-modal" data-modal="#issue-remove-dependency-confirm"
									data-modal-remove-dependency-id={String(props.issue?.iD ?? "")} data-modal-dependency-type="blocking"
									data-tooltip-content={String(i18n("repo.issues.dependency.remove_info") ?? "")}>
									<span className="svg-icon" aria-label="octicon-trash"></span>
								</a>
							</>) : null}
						</div>
					</div>
				</React.Fragment>))}
				{(props.blockingDependenciesNotPermitted) ? (<>
					<div className="item gt-ellipsis">
						<span>{/* TODO: {{ctx.Locale.TrN (len .BlockingDependenciesNotPermitted) "repo.issues.dependency.no_permission_1" "repo.issues.dependency.no_permission_n" (len .BlockingDependenciesNotPermitted)}} */}</span>
					</div>
				</>) : null}
			</div>
		</>) : null}

		{((props.blockedByDependencies || props.blockedByDependenciesNotPermitted)) ? (<>
			<span className="text" data-tooltip-content={`${(props.issue?.isPull) ? `${i18n("repo.issues.dependency.pr_closing_blockedby")}` : `${i18n("repo.issues.dependency.issue_closing_blockedby")}`}`}>
				<strong>{i18n("repo.issues.dependency.blocked_by_short")}</strong>
			</span>
			<div className="ui divided list">
				{((props.blockedByDependencies) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
					<div className={`item dependency${(props.issue?.isClosed) ? ` is-closed` : ""} flex-left-right`}>
						<div className="item-left tw-flex tw-justify-center tw-flex-col tw-flex-1 gt-ellipsis">
							<a className="muted issue-dependency-title gt-ellipsis" href={String(props.issue?.link ?? "")} data-tooltip-content={`#${String(props.issue?.index ?? "")} ${String(props.issue?.title?.("|", "ctx.RenderUtils.RenderEmoji") ?? "")}`}>
								#{item.issue?.index as any} {item.issue?.title?.("|", "ctx.RenderUtils.RenderEmoji") as any}
							</a>
							<div className="tw-text-xs gt-ellipsis" data-tooltip-content={`${String(props.repository?.ownerName ?? "")}/${String(props.repository?.name ?? "")}`}>
								{item.repository?.ownerName as any}/{item.repository?.name as any}
							</div>
						</div>
						<div className="item-right tw-flex tw-items-center tw-m-1">
							{((props.canCreateIssueDependencies && !(props.repository?.isArchived))) ? (<>
								<a className="muted show-modal" data-modal="#issue-remove-dependency-confirm"
									data-modal-remove-dependency-id={String(props.issue?.iD ?? "")} data-modal-dependency-type="blockedBy"
									data-tooltip-content={String(i18n("repo.issues.dependency.remove_info") ?? "")}>
									<span className="svg-icon" aria-label="octicon-trash"></span>
								</a>
							</>) : null}
						</div>
					</div>
				</React.Fragment>))}
				{(props.canCreateIssueDependencies) ? (<>
					{((props.blockedByDependenciesNotPermitted) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<div className={`item dependency${(props.issue?.isClosed) ? ` is-closed` : ""} flex-left-right`}>
							<div className="item-left tw-flex tw-justify-center tw-flex-col tw-flex-1 gt-ellipsis">
								<div className="gt-ellipsis">
									<span data-tooltip-content={String(i18n("repo.issues.dependency.no_permission.can_remove") ?? "")}><span className="svg-icon" aria-label="octicon-lock"></span></span>
									<span className="gt-ellipsis issue-dependency-title" data-tooltip-content={`#${String(props.issue?.index ?? "")} ${String(props.issue?.title?.("|", "ctx.RenderUtils.RenderEmoji") ?? "")}`}>
										#{item.issue?.index as any} {item.issue?.title?.("|", "ctx.RenderUtils.RenderEmoji") as any}
									</span>
								</div>
								<div className="tw-text-xs gt-ellipsis" data-tooltip-content={`${String(props.repository?.ownerName ?? "")}/${String(props.repository?.name ?? "")}`}>
									{item.repository?.ownerName as any}/{item.repository?.name as any}
								</div>
							</div>
							<div className="item-right tw-flex tw-items-center tw-m-1">
								{((props.canCreateIssueDependencies && !(props.repository?.isArchived))) ? (<>
									<a className="muted show-modal" data-modal="#issue-remove-dependency-confirm"
										data-modal-remove-dependency-id={String(props.issue?.iD ?? "")} data-modal-dependency-type="blocking"
										data-tooltip-content={String(i18n("repo.issues.dependency.remove_info") ?? "")}>
										<span className="svg-icon" aria-label="octicon-trash"></span>
									</a>
								</>) : null}
							</div>
						</div>
					</React.Fragment>))}
				</>) : null} {(props.blockedByDependenciesNotPermitted) ? (<>
					<div className="item gt-ellipsis">
						<span>{/* TODO: {{ctx.Locale.TrN (len .BlockedByDependenciesNotPermitted) "repo.issues.dependency.no_permission_1" "repo.issues.dependency.no_permission_n" (len .BlockedByDependenciesNotPermitted)}} */}</span>
					</div>
				</>) : null}
			</div>
		</>) : null}

		{((props.canCreateIssueDependencies && !(props.repository?.isArchived))) ? (<>
			<div>
				<form method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`${String(props.issue?.link ?? "")}/dependency/add`} id="addDependencyForm">
					<div className="ui fluid action input">
						<div className="ui search selection dropdown" id="new-dependency-drop-list" data-issue-id={String(props.issue?.iD ?? "")} data-issue-cross-repo-search={String(props.allowCrossRepositoryDependencies ?? "")}>
							<input name="newDependency" type="hidden" />
							<span className="svg-icon" aria-label="octicon-triangle-down"></span>
							<input type="text" className="search" />
							<div className="default text">{i18n("repo.issues.dependency.add")}</div>
						</div>
						<button className="ui icon button">
							<span className="svg-icon" aria-label="octicon-plus"></span>
						</button>
					</div>
				</form>
			</div>
		</>) : null}
	</div>

	{((props.canCreateIssueDependencies && !(props.repository?.isArchived))) ? (<>
		<form id="issue-remove-dependency-confirm" className="ui g-modal-confirm modal" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`${String(props.issue?.link ?? "")}/dependency/delete`}>
			<div className="header"><span className="svg-icon" aria-label="octicon-trash"></span> {i18n("repo.issues.dependency.remove_header")}</div>
			<div className="content">
				<input type="hidden" value="" name="removeDependencyID" className="remove-dependency-id" />
				<input type="hidden" value="" name="dependencyType" className="dependency-type" />
				<p>
					{/* TODO: {{ctx.Locale.Tr (Iif .Issue.IsPull "repo.issues.dependency.pr_remove_text" "repo.issues.dependency.issue_remove_text")}} */}
				</p>
				{/* $ModalButtonCancelText */}
				{/* $ModalButtonOkText */}
				{/* template: base/modal_actions_confirm */}
			</div>
		</form>
	</>) : null}
</>) : null}

  </>)
}
