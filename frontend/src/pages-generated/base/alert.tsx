import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Alert(props: Record<string, unknown>) {
  return (<>
{/* TODO: {{- if .Flash.ErrorMsg}} */}{/* TODO: {{ctx.RenderUtils.RenderFlashMessage "error" .Flash.ErrorMsg}} */}{/* TODO: {{end -}} */}
{/* TODO: {{- if .Flash.WarningMsg}} */}{/* TODO: {{ctx.RenderUtils.RenderFlashMessage "warning" .Flash.WarningMsg}} */}{/* TODO: {{end -}} */}
{/* TODO: {{- if .Flash.InfoMsg}} */}{/* TODO: {{ctx.RenderUtils.RenderFlashMessage "info" .Flash.InfoMsg}} */}{/* TODO: {{end -}} */}
{/* TODO: {{- if .Flash.SuccessMsg}} */}{/* TODO: {{ctx.RenderUtils.RenderFlashMessage "success" .Flash.SuccessMsg}} */}{/* TODO: {{end -}} */}
{/* TODO: {{- if .ShowTwoFactorRequiredMessage -}} */}
<div className="ui error message flash-message flash-error">
	<a href={`/user/settings/security/two_factor/enroll`}>{i18n("auth.twofa_required")}</a>
</div>
{/* TODO: {{- end -}} */}

  </>)
}
