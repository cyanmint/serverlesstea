import React from 'react'
import { i18n } from '../../lib/i18n'

export default function CloneButtons(props: Record<string, unknown>) {
  return (<>
{/* there is always at least one button (guaranteed by context/repo.go) */}
<div className="ui action small input clone-buttons-combo">
	{(props.cloneButtonShowHTTPS) ? (<>
		<button className="ui small button repo-clone-https" data-link={String(props.cloneButtonOriginLink?.hTTPS ?? "")}>HTTPS</button>
	</>) : null}
	{(props.cloneButtonShowSSH) ? (<>
		<button className="ui small button repo-clone-ssh" data-link={String(props.cloneButtonOriginLink?.sSH ?? "")}>SSH</button>
	</>) : null}
	<input size="10" className="repo-clone-url js-clone-url" value={String(props.cloneButtonOriginLink?.hTTPS ?? "")} readonly />
	<button className="ui small icon button" data-clipboard-target=".repo-clone-url" data-tooltip-content={String(i18n("copy_url") ?? "")}>
		<span className="svg-icon" aria-label="octicon-copy"></span>
	</button>
</div>

  </>)
}
