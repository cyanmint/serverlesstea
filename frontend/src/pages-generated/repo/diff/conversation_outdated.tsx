import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function ConversationOutdated(props: Record<string, unknown>) {
  return (<>
<div className="ui segment conversation-holder conversation-not-existing">
	{i18n("repo.issues.review.outdated_description")}
</div>

  </>)
}
