import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Upload(props: Record<string, unknown>) {
  return (<>
<div
	className="ui dropzone"
	data-link-url={String(props.uploadLinkUrl ?? "")}
	data-upload-url={String(props.uploadUrl ?? "")}
	data-remove-url={String(props.uploadRemoveUrl ?? "")}
	data-accepts={String(props.uploadAccepts ?? "")}
	data-max-file={String(props.uploadMaxFiles ?? "")}
	data-max-size={String(props.uploadMaxSize ?? "")}
	data-default-message={String(i18n("dropzone.default_message") ?? "")}
	data-invalid-input-type={String(i18n("dropzone.invalid_input_type") ?? "")}
	data-file-too-big={String(i18n("dropzone.file_too_big") ?? "")}
	data-remove-file={String(i18n("dropzone.remove_file") ?? "")}
>
	<div className="files"></div>
</div>

  </>)
}
