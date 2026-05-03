import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function LabelList(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("repo.issues.label_count")}
	<div className="ui right">
		{/* Sort */}
		<div className="item ui jump dropdown tw-py-2">
			<span className="text">
				{i18n("repo.issues.filter_sort")}
			</span>
			<span className="svg-icon" aria-label="octicon-triangle-down"></span>
			<div className="menu">
				<a className={`${((props.sortType === "alphabetically" || !(props.sortType))) ? `active ` : ""}item`} href={`?sort=alphabetically&state=${String(props.state ?? "")}`}>{i18n("repo.issues.label.filter_sort.alphabetically")}</a>
				<a className={`${(props.sortType === "reversealphabetically") ? `active ` : ""}item`} href={`?sort=reversealphabetically&state=${String(props.state ?? "")}`}>{i18n("repo.issues.label.filter_sort.reverse_alphabetically")}</a>
				<a className={`${(props.sortType === "leastissues") ? `active ` : ""}item`} href={`?sort=leastissues&state=${String(props.state ?? "")}`}>{i18n("repo.milestones.filter_sort.least_issues")}</a>
				<a className={`${(props.sortType === "mostissues") ? `active ` : ""}item`} href={`?sort=mostissues&state=${String(props.state ?? "")}`}>{i18n("repo.milestones.filter_sort.most_issues")}</a>
			</div>
		</div>
	</div> {/* filter menu */}
</h4>

<div className="ui attached segment">
	{((!(props.pageIsOrgSettingsLabels) && (props.canWriteIssues || props.canWritePulls) && props.numLabels === 0 && !(props.repository?.isArchived))) ? (<>
		{/* template: repo/issue/labels/label_load_template */}
		<div className="divider"></div>
	</>) : null} {((props.pageIsOrgSettingsLabels && props.numLabels === 0)) ? (<>
		{/* template: repo/issue/labels/label_load_template */}
		<div className="divider"></div>
	</>) : null}

	<ul className="issue-label-list muted-links">
		{/* $canEditLabel */}
		{/* TODO: {{$canEditLabel = or $canEditLabel $.PageIsOrgSettingsLabels}} */}
		{((props.labels) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<li className="item">
			<div className="label-title">
				{/* TODO: {{ctx.RenderUtils.RenderLabel .}} */}
				{(item.description) ? (<><br /><small className="desc">{item.description?.("|", "ctx.RenderUtils.RenderEmoji") as any}</small></>) : null}
			</div>
			<div className="label-issues">
				{(props.pageIsOrgSettingsLabels) ? (<>
					<a className="open-issues" href={`/issues?labels=${String(props.iD ?? "")}`}><span className="svg-icon" aria-label="octicon-issue-opened"></span> {i18n("repo.issues.label_open_issues")}</a>
				</>) : (<>
					<a className="open-issues" href={`${String(props.repoLink ?? "")}/issues?labels=${String(props.iD ?? "")}`}><span className="svg-icon" aria-label="octicon-issue-opened"></span> {i18n("repo.issues.label_open_issues")}</a>
				</>)}
			</div>
			<div className="label-operation">
				{/* template: repo/issue/labels/label_archived */}
					{(props.canEditLabel) ? (<>
						<a className="edit-label-button" href="#"
							data-label-id={String(props.iD ?? "")} data-label-name={String(props.name ?? "")} data-label-color={String(props.color ?? "")}
							data-label-exclusive={String(props.exclusive ?? "")} data-label-is-archived={String("" ?? "")}
							data-label-num-issues={String(props.numIssues ?? "")} data-label-description={String(props.description ?? "")}
							data-label-exclusive-order={String(props.exclusiveOrder ?? "")}
						><span className="svg-icon" aria-label="octicon-pencil"></span> {i18n("repo.issues.label_edit")}</a>
						<a className="link-action" href="#" data-url={`${String(props.link ?? "")}/delete?id=${String(props.iD ?? "")}`}
							data-modal-confirm-header={String(i18n("repo.issues.label_deletion") ?? "")}
							data-modal-confirm-content={String(i18n("repo.issues.label_deletion_desc") ?? "")}
						><span className="svg-icon" aria-label="octicon-trash"></span> {i18n("repo.issues.label_delete")}</a>
					</>) : null}
			</div>
		</li>
		</React.Fragment>))}

		{((!(props.pageIsOrgSettingsLabels) && props.orgLabels)) ? (<>
			<li className="item">
				<div>{/* parent is flex, so use block here to keep sentence spaces */}
					{i18n("repo.org_labels_desc")}
					{(props.isOrganizationOwner) ? (<>
						<a href={`${String(props.organizationLink ?? "")}/settings/labels`}>({i18n("repo.org_labels_desc_manage")})</a>:
					</>) : null}
				</div>
			</li>

			{((props.orgLabels) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			<li className="item org-label">
				<div className="label-title">
					{/* TODO: {{ctx.RenderUtils.RenderLabel .}} */}
					{(item.description) ? (<><br /><small className="desc">{item.description?.("|", "ctx.RenderUtils.RenderEmoji") as any}</small></>) : null}
				</div>
				<div className="label-issues">
					<a className="open-issues" {...(item.isArchived ? {"data-is-archived": true} : {})} href={`${String(props.repoLink ?? "")}/issues?labels=${String(props.iD ?? "")}`}><span className="svg-icon" aria-label="octicon-issue-opened"></span> {i18n("repo.issues.label_open_issues")}</a>
				</div>
				<div className="label-operation">
					{/* template: repo/issue/labels/label_archived */}
				</div>
			</li>
			</React.Fragment>))}
		</>) : null}
	</ul>
</div>

  </>)
}
