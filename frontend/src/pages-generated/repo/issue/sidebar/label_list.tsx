// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function LabelList(props: Record<string, unknown>) {
  return (<>
{/* $pageMeta */}
{/* $data */}
{/* $listBaseLink */}
<div className="issue-sidebar-combo" data-selection-mode="multiple" data-update-algo="diff"
		{...(props.pageMeta?.issue ? {"data-update-url": `/issues/labels?issue_ids=`} : {})}
>
	<input className="combo-value" name="label_ids" type="hidden" value={String("" ?? "")} />
	<div className={`ui dropdown full-width ${(!(props.pageMeta?.canModifyIssueOrPull)) ? `disabled` : ""}`}>
		<a className="fixed-text muted">
			<strong>{i18n("repo.issues.new.labels")}</strong> {(props.pageMeta?.canModifyIssueOrPull) ? (<><span className="svg-icon" aria-label="octicon-gear"></span></>) : null}
		</a>
		<div className="menu">
			{(!(props.data?.allLabels)) ? (<>
				<div className="item disabled">{i18n("repo.issues.new.no_items")}</div>
			</>) : (<>
				<div className="ui icon search input">
					<i className="icon"><span className="svg-icon" aria-label="octicon-search"></span></i>
					<input type="text" placeholder={String(i18n("repo.issues.filter_labels") ?? "")} />
				</div>
				<div className="scrolling menu">
					<a className="item clear-selection" data-text="" href="#">{i18n("repo.issues.new.clear_labels")}</a>
					<div className="divider"></div>
					{/* $previousExclusiveScope */}
					{(($data.RepoLabels) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						{/* $exclusiveScope */}
						{((props.previousExclusiveScope !== "_no_scope" && props.previousExclusiveScope !== props.exclusiveScope)) ? (<>
							<div className="divider" data-scope={String(props.exclusiveScope ?? "")}></div>
						</>) : null}
						{/* TODO: {{$previousExclusiveScope = $exclusiveScope}} */}
						{/* template: repo/issue/sidebar/label_list_item */}
					</React.Fragment>))}
					{((props.data?.repoLabels && props.data?.orgLabels)) ? (<><div className="divider"></div></>) : null}
					{/* TODO: {{$previousExclusiveScope = "_no_scope"}} */}
					{(($data.OrgLabels) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
						{/* $exclusiveScope */}
						{((props.previousExclusiveScope !== "_no_scope" && props.previousExclusiveScope !== props.exclusiveScope)) ? (<>
							<div className="divider" data-scope={String(props.exclusiveScope ?? "")}></div>
						</>) : null}
						{/* TODO: {{$previousExclusiveScope = $exclusiveScope}} */}
						{/* template: repo/issue/sidebar/label_list_item */}
					</React.Fragment>))}
				</div>
			</>)}
		</div>
	</div>

	<div className="ui list labels-list">
		<span className={`item empty-list ${(props.data?.selectedLabelIDs) ? `tw-hidden` : ""}`}>{i18n("repo.issues.new.no_labels")}</span>
		{(($data.AllLabels) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
			{(item.isChecked) ? (<>
				<a className="item" href={`?labels=${String(props.iD ?? "")}`}>
					{/* TODO: {{ctx.RenderUtils.RenderLabel .}} */}
				</a>
			</>) : null}
		</React.Fragment>))}
	</div>
</div>

  </>)
}
