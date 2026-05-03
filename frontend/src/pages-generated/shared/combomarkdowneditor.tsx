import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Combomarkdowneditor(props: Record<string, unknown>) {
  return (<>
{/* Template Attributes:
* CustomInit: do not initialize the editor automatically
* ContainerId: id attribute for the container element
* ContainerClasses: additional classes for the container element
* MarkdownEditorContext: the context data for the editor, see backend MarkdownEditorContext
* TextareaName: name attribute for the textarea
* TextareaContent: content for the textarea
* TextareaMaxLength: maxlength attribute for the textarea
* TextareaPlaceholder: placeholder attribute for the textarea
* TextareaAriaLabel: aria-label attribute for the textarea
* DropzoneParentContainer: container for file upload (leave it empty if no upload)
* DisableAutosize: whether to disable automatic height resizing */}
{/* $ariaLabel */}
{/* $editorContext */}
{/* $previewMode */}
{/* $previewContext */}
{/* $previewLink */}
{/* $mentionsLink */}
{/* $supportEasyMDE */}
<div {...(props.containerId ? {"id": String(props.containerId ?? "")} : {})} className={`combo-markdown-editor ${(props.customInit) ? `custom-init` : ""} ${String(props.containerClasses ?? "")}`}
		data-dropzone-parent-container={String(props.dropzoneParentContainer ?? "")}
		data-content-mode={String("" ?? "")}
		data-support-easy-mde={String("" ?? "")}
		data-preview-url={String("" ?? "")}
		data-preview-context={String("" ?? "")}
		{...(mentionsLink ? {"data-mentions-url": String("" ?? "")} : {})}
>
	{(previewMode !== "none") ? (<>
	<div className="ui top tabular menu">
		<a className="active item" data-tab-htmlFor="markdown-writer">{/* template: shared/misc/tabtitle */}</a>
		<a className="item" data-tab-htmlFor="markdown-previewer">{/* template: shared/misc/tabtitle */}</a>
	</div>
	</>) : null}
	<div className="ui tab active" data-tab-panel="markdown-writer">
		<markdown-toolbar>
			<div className="markdown-toolbar-group">
				<md-header className="markdown-toolbar-button" level="1" data-tooltip-content={String(i18n("editor.buttons.heading.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-heading"></span></md-header>
				<md-header className="markdown-toolbar-button" level="2" data-tooltip-content={String(i18n("editor.buttons.heading.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-heading"></span></md-header>
				<md-header className="markdown-toolbar-button" level="3" data-tooltip-content={String(i18n("editor.buttons.heading.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-heading"></span></md-header>
			</div>
			<div className="markdown-toolbar-group">
				<md-bold className="markdown-toolbar-button" data-tooltip-content={String(i18n("editor.buttons.bold.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-bold"></span></md-bold>
				<md-italic className="markdown-toolbar-button" data-tooltip-content={String(i18n("editor.buttons.italic.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-italic"></span></md-italic>
				<md-strikethrough className="markdown-toolbar-button" data-tooltip-content={String(i18n("editor.buttons.strikethrough.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-strikethrough"></span></md-strikethrough>
			</div>
			<div className="markdown-toolbar-group">
				<md-quote className="markdown-toolbar-button" data-tooltip-content={String(i18n("editor.buttons.quote.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-quote"></span></md-quote>
				<md-code className="markdown-toolbar-button" data-tooltip-content={String(i18n("editor.buttons.code.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-code"></span></md-code>
				<md-link className="markdown-toolbar-button" data-tooltip-content={String(i18n("editor.buttons.link.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-link"></span></md-link>
			</div>
			<div className="markdown-toolbar-group">
				<md-unordered-list className="markdown-toolbar-button" data-tooltip-content={String(i18n("editor.buttons.list.unordered.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-list-unordered"></span></md-unordered-list>
				<md-ordered-list className="markdown-toolbar-button" data-tooltip-content={String(i18n("editor.buttons.list.ordered.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-list-ordered"></span></md-ordered-list>
				<md-task-list className="markdown-toolbar-button" data-tooltip-content={String(i18n("editor.buttons.list.task.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-tasklist"></span></md-task-list>
				<button className="markdown-toolbar-button markdown-button-table-add" data-tooltip-content={String(i18n("editor.buttons.table.add.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-table"></span></button>
			</div>
			{(mentionsLink) ? (<>
			<div className="markdown-toolbar-group">
				<md-mention className="markdown-toolbar-button" data-tooltip-content={String(i18n("editor.buttons.mention.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-mention"></span></md-mention>
				<md-ref className="markdown-toolbar-button" data-tooltip-content={String(i18n("editor.buttons.ref.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-cross-reference"></span></md-ref>
			</div>
			</>) : null}
			<div className="markdown-toolbar-group">
				<button className="markdown-toolbar-button markdown-switch-monospace" role="switch" data-enable-text={String(i18n("editor.buttons.enable_monospace_font") ?? "")} data-disable-text={String(i18n("editor.buttons.disable_monospace_font") ?? "")}><span className="svg-icon" aria-label="octicon-typography"></span></button>
				{(supportEasyMDE) ? (<>
				<button className="markdown-toolbar-button markdown-switch-easymde" data-tooltip-content={String(i18n("editor.buttons.switch_to_legacy.tooltip") ?? "")}><span className="svg-icon" aria-label="octicon-arrow-switch"></span></button>
				</>) : null}
			</div>
		</markdown-toolbar>
		<text-expander keys=": @ #" multiword="#" suffix="">
			<textarea className="markdown-text-editor"
				{...(props.textareaName ? {"name": String(props.textareaName ?? "")} : {})} {...(props.textareaMaxLength ? {"maxlength": String(props.textareaMaxLength ?? "")} : {})}
				{...(props.textareaPlaceholder ? {"placeholder": String(props.textareaPlaceholder ?? "")} : {})} {...(ariaLabel ? {"aria-label": String("" ?? "")} : {})}
				{...(props.disableAutosize ? {"data-disable-autosize": String(props.disableAutosize ?? "")} : {})}
			>{props.textareaContent as any}</textarea>
		</text-expander>
		<script nonce={String("" ?? "")}>
			if (window.localUserSettings.getBoolean('markdown-editor-monospace')) {
				document.querySelector('.markdown-text-editor').classList.add('tw-font-mono');
			}
		</script>
	</div>
	<div className="ui tab" data-tab-panel="markdown-previewer">
		{i18n("loading")}
	</div>
	<div className="markdown-add-table-panel tippy-target">
		<div className="ui form tw-p-4 flex-text-block">
			<input type="number" min="1" value="3" size="3" className="add-table-rows tw-w-24" data-tooltip-content={String(i18n("editor.buttons.table.rows") ?? "")} />
			x
			<input type="number" min="1" value="3" size="3" className="add-table-cols tw-w-24" data-tooltip-content={String(i18n("editor.buttons.table.cols") ?? "")} />
			<button className="ui button primary" type="button">{i18n("editor.buttons.table.add.insert")}</button>
		</div>
	</div>
</div>

  </>)
}
