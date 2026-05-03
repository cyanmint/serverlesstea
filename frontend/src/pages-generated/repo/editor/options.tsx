import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Options(props: Record<string, unknown>) {
  return (<>
{/* $indentStyle */}
{/* $indentSize */}
{/* $lineWrap */}
<div className="flex-text-block code-editor-options">
	<button type="button" className="js-code-find ui compact mini icon button" aria-label={String(i18n("editor.code_editor.find") ?? "")}><span className="svg-icon" aria-label="octicon-search"></span></button>
	<button type="button" className="js-code-command-palette ui compact mini icon button" aria-label={String(i18n("editor.code_editor.command_palette") ?? "")}><span className="svg-icon" aria-label="octicon-command-palette"></span></button>
	<div className="native-select">
		<select className="js-indent-style-select" aria-label={String(i18n("text_indent_style") ?? "")}>
			<optgroup label={String(i18n("text_indent_style") ?? "")}>
				<option{("$indentStyle" === "space") ? (<> selected</>) : null} value="space">{i18n("characters_spaces")}</option>
				<option{("$indentStyle" === "tab") ? (<> selected</>) : null} value="tab">{i18n("characters_tabs")}</option>
			</optgroup>
		</select>
	</div>
	<div className="native-select">
		<select className="js-indent-size-select" aria-label={String(i18n("text_indent_size") ?? "")}>
			<optgroup label={String(i18n("text_indent_size") ?? "")}>
				<option{("$indentSize" === 2) ? (<> selected</>) : null} value="2">2</option>
				<option{("$indentSize" === 4) ? (<> selected</>) : null} value="4">4</option>
				<option{("$indentSize" === 8) ? (<> selected</>) : null} value="8">8</option>
			</optgroup>
		</select>
	</div>
	<div className="native-select">
		<select className="js-line-wrap-select" aria-label={String(i18n("text_line_wrap_mode") ?? "")}>
			<optgroup label={String(i18n("text_line_wrap_mode") ?? "")}>
				<option{("$lineWrap") ? (<> selected</>) : null} value="on">{i18n("text_line_wrap")}</option>
				<option{(!("$lineWrap")) ? (<> selected</>) : null} value="off">{i18n("text_line_nowrap")}</option>
			</optgroup>
		</select>
	</div>
</div>

  </>)
}
