// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function WebauthnError(props: Record<string, unknown>) {
  return (<>
<div id="webauthn-error" className="ui negative message tw-hidden">
	<div className="header">{i18n("webauthn_error")}</div>
	<div id="webauthn-error-msg" className="tw-pt-2"></div>
	<div className="tw-hidden">
		<div data-webauthn-error-msg="browser">{i18n("webauthn_unsupported_browser")}</div>
		<div data-webauthn-error-msg="unknown">{i18n("webauthn_error_unknown")}</div>
		<div data-webauthn-error-msg="insecure">{i18n("webauthn_error_insecure")}</div>
		<div data-webauthn-error-msg="unable-to-process">{i18n("webauthn_error_unable_to_process")}</div>
		<div data-webauthn-error-msg="duplicated">{i18n("webauthn_error_duplicated")}</div>
		<div data-webauthn-error-msg="empty">{i18n("webauthn_error_empty")}</div>
		<div data-webauthn-error-msg="timeout">{i18n("webauthn_error_timeout")}</div>
	</div>
</div>

  </>)
}
