import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Edit(props: Record<string, unknown>) {
  return (<>

<div role="main" aria-label={String(props.title ?? "")} className="page-content repository file editor edit">
	{/* template: repo/header */}
	<div className="ui container fluid padded">
		{/* alert */}
		<div className="repo-view-container">
			{/* template: repo/view_file_tree */}
			<div className="repo-view-content">
				<form className="ui edit form form-fetch-action" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={String(props.commitFormOptions?.targetFormAction ?? "")}
					data-text-empty-confirm-header={String(i18n("repo.editor.commit_empty_file_header") ?? "")}
					data-text-empty-confirm-content={String(i18n("repo.editor.commit_empty_file_text") ?? "")}
				>
					{/* template: repo/editor/common_top */}
					<div className="repo-editor-header">
						{/* template: repo/view_file_tree_toggle_button */}
						{/* template: repo/editor/common_breadcrumb */}
					</div>
					{(!(props.notEditableReason)) ? (<>
						<div className="field">
							<div className="ui top attached header">
								<div className="flex-left-right">
									<div className="ui compact small menu small-menu-items repo-editor-menu" data-repo-link={String(props.repoLink ?? "")} data-ref-sub-url={String(props.refTypeNameSubURL ?? "")} data-branch-name={String(props.branchName ?? "")} data-global-init="initTabSwitcher">
										<a className="active item" data-tab="write"><span className="svg-icon" aria-label="octicon-code"></span> {(props.isNewFile) ? (<>{i18n("repo.editor.new_file")}</>) : (<>{i18n("repo.editor.edit_file")}</>)}</a>
										<a className={`item ${(!(props.codeEditorConfig?.previewable)) ? `tw-hidden` : ""}`} data-tab="preview"><span className="svg-icon" aria-label="octicon-eye"></span> {i18n("preview")}</a>
										{(!(props.isNewFile)) ? (<>
										<a className="item" data-tab="diff"><span className="svg-icon" aria-label="octicon-diff"></span> {i18n("repo.editor.preview_changes")}</a>
										</>) : null}
									</div>
									{/* template: repo/editor/options */}
								</div>
							</div>
							<div className="ui bottom attached segment tw-p-0">
								<div className="ui active tab tw-rounded-b" data-tab="write">
									<textarea id="edit_area" name="content" className="tw-hidden" data-id={`repo-${String(props.repository?.name ?? "")}-${String(props.treePath ?? "")}`}
										data-code-editor-config={String("" ?? "")}
										placeholder={String(i18n("editor.code_editor.placeholder") ?? "")}>{props.fileContent as any}</textarea>
									<div className="editor-loading is-loading"></div>
								</div>
								<div className="ui tab tw-px-4 tw-py-3" data-tab="preview">
									<div className="editor-loading is-loading"></div>
								</div>
								<div className="ui tab" data-tab="diff">
									<div className="editor-loading is-loading"></div>
								</div>
							</div>
						</div>
					</>) : (<>
						<div className="field">
							<div className="ui segment tw-text-center">
								<h4 className="tw-font-semibold tw-mb-2">{props.notEditableReason as any}</h4>
								<p>{i18n("repo.editor.file_not_editable_hint")}</p>
							</div>
						</div>
					</>)}
					{/* template: repo/editor/commit_form */}
				</form>
			</div>
		</div>
	</div>
</div>


  </>)
}
