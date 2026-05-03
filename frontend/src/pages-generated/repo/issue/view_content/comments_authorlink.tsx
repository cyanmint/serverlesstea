import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function CommentsAuthorlink(props: Record<string, unknown>) {
  return (<>
{(props.comment?.originalAuthor) ? (<>
	<span className="tw-text-text">
		{/* TODO: {{svg (MigrationIcon .ctxData.Repository.GetOriginalURLHostname)}} */}
		{props.comment?.originalAuthor as any}
	</span>
	{(props.ctxData?.repository?.originalURL) ? (<>
		<span className="migrate">({i18n("repo.migrated_from")})</span>
	</>) : null}
</>) : (<>
	{/* template: shared/user/authorlink */}
</>)}

  </>)
}
