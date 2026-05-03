// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Delete(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository file editor delete">
	{/* template: repo/header */}
	<div className="ui container fluid padded">
		{/* alert */}
		<div className="repo-view-container">
			{/* template: repo/view_file_tree */}
			<div className="repo-view-content">
				<form className="ui form form-fetch-action" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={String(props.commitFormOptions?.targetFormAction ?? "")}>
					{/* template: repo/editor/common_top */}
					<div className="repo-editor-header">
						{/* although the UI isn't good enough, this header is necessary for the "left file tree view" toggle button, this button must exist */}
						{/* template: repo/view_file_tree_toggle_button */}
						{/* then, to make the page looks overall good, add the breadcrumb here to make the toggle button can be shown in a text row, but not a single button */}
						<div className="breadcrumb">
							<a className="section" href={String(props.branchLink ?? "")}>{props.repository?.name as any}</a>
							{((props.treeNames) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
								<div className="breadcrumb-divider">/</div>
								<span className="section"><a href={`${String(props.branchLink ?? "")}/`}>{props.v as any}</a></span>
							</React.Fragment>))}
						</div>
					</div>
					{/* template: repo/editor/commit_form */}
				</form>
			</div>
		</div>
	</div>
</div>


  </>)
}
