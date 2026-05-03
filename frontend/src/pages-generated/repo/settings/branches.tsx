import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Branches(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="repo-setting-content">
		{(props.repository?.isArchived) ? (<>
			<div className="ui warning message tw-text-center">
				{i18n("repo.settings.archive.branchsettings_unavailable")}
			</div>
		</>) : (<>
			<h4 className="ui top attached header">
				{i18n("repo.default_branch")}
			</h4>
			<div className="ui attached segment">
				<p>{i18n("repo.settings.default_branch_desc")}</p>
				<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
					<input type="hidden" name="action" value="default_branch" />
					<div className="flex-text-block">
						<div className="ui dropdown selection search tw-flex-1 tw-mr-2 tw-max-w-96">
							<span className="svg-icon" aria-label="octicon-triangle-down"></span>
							<input type="hidden" name="branch" value={String(props.repository?.defaultBranch ?? "")} />
							<div className="default text">{props.repository?.defaultBranch as any}</div>
							<div className="menu">
								{((props.branches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
									<div className="item" data-value={String("" ?? "")}>{item as any}</div>
								</React.Fragment>))}
							</div>
						</div>
						<button className="ui primary button"{(props.repository?.isEmpty) ? (<> disabled</>) : null}>{i18n("repo.settings.branches.update_default_branch")}</button>
					</div>
					<div className="help tw-mt-4 tw-p-0">{i18n("repo.settings.default_target_branch_desc")}</div>
				</form>
			</div>

			<h4 className="ui top attached header">
				{i18n("repo.settings.protected_branch")}
				<div className="ui right">
					<a className="ui primary tiny button" href={`${String(props.repository?.link ?? "")}/settings/branches/edit`}>{i18n("repo.settings.branches.add_new_rule")}</a>
				</div>
			</h4>

			<div className="ui attached segment">
				<div className="flex-divided-list items-with-main" id="protected-branches-list" data-update-priority-url={`${String(props.repository?.link ?? "")}/settings/branches/priority`}>
					{((props.protectedBranches) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						<div className="item tw-items-center" data-id={String(props.iD ?? "")} >
							<div className="drag-handle tw-cursor-grab">
								<span className="svg-icon" aria-label="octicon-grabber"></span>
							</div>
							<div className="item-main">
								<div className="item-title">
									<div className="ui basic primary label">{item.ruleName as any}</div>
								</div>
							</div>
							<div className="item-trailing">
								<a className="ui tiny button" href={`${String(props.repository?.link ?? "")}/settings/branches/edit?rule_name=${String(props.ruleName ?? "")}`}>{i18n("repo.settings.edit_protected_branch")}</a>
								<button className="ui red tiny button link-action" data-modal-confirm="#repo-branch-protection-delete-modal" data-url={`${String(props.repository?.link ?? "")}/settings/branches/${String(props.iD ?? "")}/delete?id=${String(props.iD ?? "")}`}>
									{i18n("repo.settings.protected_branch.delete_rule")}
								</button>
							</div>
						</div>
					{/* else */}
						<div className="item tw-text-center">
							{i18n("repo.settings.no_protected_branch")}
						</div>
					</React.Fragment>))}
				</div>
			</div>
		</>)}
	</div>

<div className="ui small modal" id="repo-branch-protection-delete-modal">
	<div className="header"><span className="svg-icon" aria-label="octicon-trash"></span> {i18n("repo.settings.protected_branch_deletion")}</div>
	<div className="content"><p>{i18n("repo.settings.protected_branch_deletion_desc")}</p></div>
	{/* template: base/modal_actions_confirm */}
</div>

{/* template: repo/settings/layout_footer */}

  </>)
}
