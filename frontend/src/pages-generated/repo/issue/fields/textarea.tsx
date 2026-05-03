import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Textarea(props: Record<string, unknown>) {
  return (<>
{/* $useMarkdownEditor */}
<div className={`field ${(!(props.item?.visibleOnForm)) ? `tw-hidden` : ""} ${("$useMarkdownEditor") ? `combo-editor-dropzone` : ""}`}>
	{/* template: repo/issue/fields/header */}

	{/* the real form element to provide the value */}
	<textarea className="form-field-real" name={`form-field-${String(props.item?.iD ?? "")}`} placeholder={String(props.item?.attributes?.placeholder ?? "")} {((props.item?.validations?.required)) ? (<>required</>) : null}>{props.item?.attributes?.value as any}</textarea>

	{("$useMarkdownEditor") ? (<>
		{/* template: shared/combomarkdowneditor */}

		{(props.root?.isAttachmentEnabled) ? (<>
		<div className="tw-mt-4 form-field-dropzone tw-hidden">
			{/* template: repo/upload */}
		</div>
		</>) : null}
	</>) : null}
</div>

  </>)
}
