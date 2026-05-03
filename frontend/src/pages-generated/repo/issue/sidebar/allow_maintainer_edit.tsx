import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function AllowMaintainerEdit(props: Record<string, unknown>) {
  return (<>
{/* $isHeadForkedRepo */}
{(props.isHeadForkedRepo) ? (<>
	{/* $isPullPoster */}
	{/* $isPullEditable */}
	{/* $allowToChange */}
	<div className="divider"></div>
	<div className={`ui checkbox ${(!(props.allowToChange)) ? `disabled` : ""} loading-icon-2px`}
			{(props.allowToChange) ? (<>
			id="allow-edits-from-maintainers"
			data-url={String(props.issue?.link ?? "")}
			data-tooltip-content={String(i18n("repo.pulls.allow_edits_from_maintainers_desc") ?? "")}
			data-prompt-error={String(i18n("repo.pulls.allow_edits_from_maintainers_err") ?? "")}
			</>) : null}
	>
		<label><strong>{i18n("repo.pulls.allow_edits_from_maintainers")}</strong></label>
		<input type="checkbox" {...(props.issue?.pullRequest?.allowMaintainerEdit ? {"checked": true} : {})} {...(!(props.allowToChange) ? {"disabled": true} : {})} />
	</div>
</>) : null}

  </>)
}
