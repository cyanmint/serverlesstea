// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function NewForm(props: Record<string, unknown>) {
  return (<>
{/* alert */}
<form className="issue-content ui comment form form-fetch-action" id="new-issue" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
	<div className="issue-content-left">
		<div className="ui comments">
			<div className="comment">
				<div className=" tw-mr-4 not-mobile">{/* TODO: {{ctx.AvatarUtils.Avatar .SignedUser 40}} */}</div>
				<div className="ui segment content tw-my-0 avatar-content-left-arrow">
					<div className="field">
						<input name="title" data-global-init="autoFocusEnd" id="issue_title" required maxlength="255" autocomplete="off"
								placeholder={String(i18n("repo.milestones.title") ?? "")}
								value={`${(props.titleQuery) ? `${String(props.titleQuery ?? "")}${String(props.issueTemplateTitle ?? "")}` : `${String(props.title ?? "")}`}`}
						 />
						{(props.pageIsComparePull) ? (<>
							<div className="title_wip_desc" data-wip-prefixes={String("" ?? "")}>{i18n("repo.pulls.title_wip_desc")}</div>
						</>) : null}
					</div>
					{(props.fields) ? (<>
						<input type="hidden" name="template-file" value={String(props.templateFile ?? "")} />
						{((props.fields) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
							{(item.type === "input") ? (<>
								{/* template: repo/issue/fields/input */}
							</>) : null} {(item.type === "markdown") ? (<>
								{/* template: repo/issue/fields/markdown */}
							</>) : null} {(item.type === "textarea") ? (<>
								{/* template: repo/issue/fields/textarea */}
							</>) : null} {(item.type === "dropdown") ? (<>
								{/* template: repo/issue/fields/dropdown */}
							</>) : null} {(item.type === "checkboxes") ? (<>
								{/* template: repo/issue/fields/checkboxes */}
							</>) : null}
						</React.Fragment>))}
					</>) : (<>
						{/* template: repo/issue/comment_tab */}
					</>)}
					<div className="flex-text-block tw-justify-end">
						<button className="ui primary button">
							{(props.pageIsComparePull) ? (<>
								{i18n("repo.pulls.create")}
							</>) : (<>
								{i18n("repo.issues.create")}
							</>)}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div className="issue-content-right ui segment" data-global-init="initRepoIssueSidebar">
		{/* template: repo/issue/branch_selector_field */}{/* TODO: RemoveIssueRef: template "repo/issue/branch_selector_field" $ */}

		{(props.pageIsComparePull) ? (<>
			{/* template: repo/issue/sidebar/reviewer_list */}
			<div className="divider"></div>
		</>) : null}

		{/* template: repo/issue/sidebar/label_list */}
		{/* template: repo/issue/sidebar/milestone_list */}
		{(props.isProjectsEnabled) ? (<>
			{/* template: repo/issue/sidebar/project_list */}
		</>) : null}
		{/* template: repo/issue/sidebar/assignee_list */}

		{((props.pageIsComparePull && !(props.headRepo?.fullName === props.baseCompareRepo?.fullName) && props.canWriteToHeadRepo)) ? (<>
			<div className="divider"></div>
			<div className="ui checkbox">
				<label data-tooltip-content={String(i18n("repo.pulls.allow_edits_from_maintainers_desc") ?? "")}><strong>{i18n("repo.pulls.allow_edits_from_maintainers")}</strong></label>
				<input name="allow_maintainer_edit" type="checkbox" {...(props.allowMaintainerEdit ? {"checked": true} : {})} />
			</div>
		</>) : null}
	</div>
	<input type="hidden" name="redirect_after_creation" value={String(props.redirect_after_creation ?? "")} />
</form>

  </>)
}
