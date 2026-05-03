// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function UnicodeEscapePrompt(props: Record<string, unknown>) {
  return (<>
{(props.escapeStatus) ? (<>
	{(props.escapeStatus?.hasInvisible) ? (<>
		<div className="ui warning message unicode-escape-prompt">
			<button className="btn close icon hide-panel" data-panel-closest=".message"><span className="svg-icon" aria-label="octicon-x"></span></button>
			<div className="header">
				{i18n("repo.invisible_runes_header")}
			</div>
			<div>{i18n("repo.invisible_runes_description")}</div>
			{(props.escapeStatus?.hasAmbiguous) ? (<>
				<div>{i18n("repo.ambiguous_runes_description")}</div>
			</>) : null}
		</div>
	</>) : null} {(props.escapeStatus?.hasAmbiguous) ? (<>
		<div className="ui warning message unicode-escape-prompt">
			<button className="btn close icon hide-panel" data-panel-closest=".message"><span className="svg-icon" aria-label="octicon-x"></span></button>
			<div className="header">
				{i18n("repo.ambiguous_runes_header")}
			</div>
			<div>{i18n("repo.ambiguous_runes_description")}</div>
		</div>
	</>) : null}
</>) : null}

  </>)
}
