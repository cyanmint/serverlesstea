import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Status(props: Record<string, unknown>) {
  return (<>
{/* This template should be kept the same as web_src/js/components/ActionRunStatus.vue
	Please also update the vue file above if this template is modified.
	action status accepted: success, skipped, waiting, blocked, running, failure, cancelled, unknown */}
{/* $size */}
{/* $className */}
<span data-tooltip-content={String("" ?? "")}>
{(props.status === "success") ? (<>
	<span className="svg-icon" aria-label="octicon-check-circle-fill"></span>
</>) : null} {(props.status === "skipped") ? (<>
	<span className="svg-icon" aria-label="octicon-skip"></span>
</>) : null} {(props.status === "cancelled") ? (<>
	<span className="svg-icon" aria-label="octicon-stop"></span>
</>) : null} {(props.status === "waiting") ? (<>
	<span className="svg-icon" aria-label="octicon-circle"></span>
</>) : null} {(props.status === "blocked") ? (<>
	<span className="svg-icon" aria-label="octicon-blocked"></span>
</>) : null} {(props.status === "running") ? (<>
	<span className="svg-icon" aria-label="gitea-running"></span>
</>) : (<>{/* failure, unknown */}
	<span className="svg-icon" aria-label="octicon-x-circle-fill"></span>
</>)}
</span>

  </>)
}
