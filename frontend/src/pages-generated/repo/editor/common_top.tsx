import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function CommonTop(props: Record<string, unknown>) {
  return (<>
{(props.commitFormOptions?.willSubmitToFork) ? (<>
<div className="ui blue message">
	{/* $repoLinkHTML */}
	{i18n("repo.editor.fork_edit_description")}
</div>
</>) : null}

  </>)
}
