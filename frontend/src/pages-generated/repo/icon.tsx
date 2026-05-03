import React from 'react'
import { i18n } from '../../lib/i18n'

export default function Icon(props: Record<string, unknown>) {
  return (<>
{/* $avatarLink */}
{(avatarLink) ? (<>
	<img className="ui avatar tw-align-middle" src={String("" ?? "")} width="24" height="24" alt aria-hidden="true" />
</>) : null} {(props.isMirror) ? (<>
	<span className="svg-icon" aria-label="octicon-mirror"></span>
</>) : null} {(props.isFork) ? (<>
	<span className="svg-icon" aria-label="octicon-repo-forked"></span>
</>) : (<>
	<span className="svg-icon" aria-label="octicon-repo"></span>
</>)}

  </>)
}
