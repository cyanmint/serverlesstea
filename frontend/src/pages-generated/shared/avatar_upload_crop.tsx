// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function AvatarUploadCrop(props: Record<string, unknown>) {
  return (<>
{/* we do not need to set for/id here, global aria init code will add them automatically */}
<label>{props.labelText as any}</label>
<input className="avatar-file-with-cropper" name="avatar" type="file" accept="image/png,image/jpeg,image/gif,image/webp" data-global-init="initAvatarUploader" />
{/* the cropper-panel must be next sibling of the input "avatar" */}
<div className="cropper-panel tw-hidden">
	<div className="tw-my-2">{i18n("settings.cropper_prompt")}</div>
	<div className="cropper-wrapper"><img className="cropper-source" src alt /></div>
</div>

  </>)
}
