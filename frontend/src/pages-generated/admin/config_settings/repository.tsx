import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Repository(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">
	{i18n("repository")}
</h4>
<div className="ui attached segment">
	<form className="ui form system-config-form" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())} action={`/-/admin/config`}>
		{/* $cfg */}
		<div className="field">
			<details>
				<summary>{i18n("admin.config.open_with_editor_app_help")}</summary>
				<pre className="tw-px-4">{/* TODO: {{$cfg.DefaultValue.ToTextareaString}} */}</pre>
			</details>
		</div>
		<div className="field">
			{/* TODO: OPEN-WITH-EDITOR-APP-JSON: use a simple textarea */}
			<textarea name={String("" ?? "")}>{(props.cfg?.hasValue?.(ctx)) ? (<>{/* TODO: {{($cfg.Value ctx).ToTextareaString}} */}</>) : null}</textarea>
		</div>

		{/* TODO: {{$cfg = .SystemConfig.Repository.GitGuideRemoteName}} */}
		<div className="field">
			<label>{i18n("admin.config.git_guide_remote_name")}</label>
			<input name={String("" ?? "")} value={String("" ?? "")} placeholder={String("" ?? "")} maxlength="100" dir="auto" required pattern="^[A-Za-z0-9][\-_A-Za-z0-9]*$" />
		</div>
		<div className="field">
			<button className="ui primary button">{i18n("save")}</button>
		</div>
	</form>
</div>

  </>)
}
