// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function CommitStatus(props: Record<string, unknown>) {
  return (<>
{'{'}/* make sure this matches the color logic in web_src/js/components/DashboardRepoList.vue */{'}'}
{(props.state === "pending") ? (<>
	<span className="svg-icon" aria-label="octicon-dot-fill"></span>
</>) : null}
{(props.state === "success") ? (<>
	<span className="svg-icon" aria-label="octicon-check"></span>
</>) : null}
{(props.state === "error") ? (<>
	<span className="svg-icon" aria-label="gitea-exclamation"></span>
</>) : null}
{(props.state === "failure") ? (<>
	<span className="svg-icon" aria-label="octicon-x"></span>
</>) : null}
{(props.state === "warning") ? (<>
	<span className="svg-icon" aria-label="gitea-exclamation"></span>
</>) : null}
{(props.state === "skipped") ? (<>
	<span className="svg-icon" aria-label="octicon-skip"></span>
</>) : null}

  </>)
}
