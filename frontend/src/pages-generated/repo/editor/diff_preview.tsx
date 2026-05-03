// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function DiffPreview(props: Record<string, unknown>) {
  return (<>
{(props.file) ? (<>
<div className="diff-file-box">
	<div className="ui attached table segment">
		<div className="file-body file-code code-diff code-diff-unified unicode-escaped">
			<table>
				<tbody>
					{/* template: repo/diff/section_unified */}
				</tbody>
			</table>
		</div>
	</div>
</div>
</>) : (<>
<div className="tw-p-6 tw-text-center">
	{i18n("repo.editor.no_changes_to_show")}
</div>
</>)}

  </>)
}
