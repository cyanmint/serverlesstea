import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Keys(props: Record<string, unknown>) {
  return (<>
{/* template: user/settings/layout_head */}
	<div className="user-setting-content">
		{(!(props.userDisabledFeatures?.contains?.("manage_ssh_keys"))) ? (<>
			{/* template: user/settings/keys_ssh */}
		</>) : null}
		{/* template: user/settings/keys_principal */}
		{(!(props.userDisabledFeatures?.contains?.("manage_gpg_keys"))) ? (<>
		{/* template: user/settings/keys_gpg */}
		</>) : null}
	</div>
{/* template: user/settings/layout_footer */}

  </>)
}
