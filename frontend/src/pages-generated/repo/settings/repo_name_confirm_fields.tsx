import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function RepoNameConfirmFields(props: Record<string, unknown>) {
  return (<>
<div className="field">
	<label>
		{i18n("repo.settings.enter_repo_name_to_confirm")}
		<span className="tw-text-red">{props.repoName as any}</span>
	</label>
</div>
<div className="required field">
	<label>{i18n("repo.repo_name")}</label>
	<input name="repo_name" required maxlength="100" />
</div>

  </>)
}
