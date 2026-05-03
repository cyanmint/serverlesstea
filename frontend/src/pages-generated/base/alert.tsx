import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Alert(props: Record<string, unknown>) {
  return (<>
{(props.flash?.errorMsg) ? (<>{/* TODO: {{ctx.RenderUtils.RenderFlashMessage "error" .Flash.ErrorMsg}} */}</>) : null}
{(props.flash?.warningMsg) ? (<>{/* TODO: {{ctx.RenderUtils.RenderFlashMessage "warning" .Flash.WarningMsg}} */}</>) : null}
{(props.flash?.infoMsg) ? (<>{/* TODO: {{ctx.RenderUtils.RenderFlashMessage "info" .Flash.InfoMsg}} */}</>) : null}
{(props.flash?.successMsg) ? (<>{/* TODO: {{ctx.RenderUtils.RenderFlashMessage "success" .Flash.SuccessMsg}} */}</>) : null}
{(props.showTwoFactorRequiredMessage) ? (<>
<div className="ui error message flash-message flash-error">
	<a href={`/user/settings/security/two_factor/enroll`}>{i18n("auth.twofa_required")}</a>
</div>
</>) : null}

  </>)
}
