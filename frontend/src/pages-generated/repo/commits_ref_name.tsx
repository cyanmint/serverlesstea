// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function CommitsRefName(props: Record<string, unknown>) {
  return (<>
{/* Template Argument: git.RefName */}
{/* $refName */}
{(props.refName?.isBranch) ? (<>
	<span className="svg-icon" aria-label="octicon-git-branch"></span> {/* TODO: {{$refName.ShortName}} */}
</>) : null} {(props.refName?.isTag) ? (<>
	<span className="svg-icon" aria-label="octicon-tag"></span> {/* TODO: {{$refName.ShortName}} */}
</>) : (<>
	{/* TODO: {{ShortSha $refName.ShortName}} */}
</>)}

  </>)
}
