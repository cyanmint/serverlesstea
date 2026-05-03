import React from 'react'
import { i18n } from '../../lib/i18n'

export default function CommitsRefName(props: Record<string, unknown>) {
  return (<>
{/* TODO: {{- /* Template Argument: git.RefName * / -}} */}
{/* TODO: {{- $refName := . -}} */}
{/* TODO: {{- if $refName.IsBranch -}} */}
	<span className="svg-icon" aria-label="octicon-git-branch"></span> {/* TODO: {{$refName.ShortName}} */}
{/* TODO: {{- else if $refName.IsTag -}} */}
	<span className="svg-icon" aria-label="octicon-tag"></span> {/* TODO: {{$refName.ShortName}} */}
{/* TODO: {{- else -}} */}
	{/* TODO: {{ShortSha $refName.ShortName}} */}
{/* TODO: {{- end -}} */}

  </>)
}
