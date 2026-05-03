// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function GithookEdit(props: Record<string, unknown>) {
  return (<>
{/* template: repo/settings/layout_head */}
	<div className="repo-setting-content">
		<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
			<h4 className="ui top attached header flex-left-right">
				{props.hook?.name as any}
				<div className="tw-font-normal tw-font-sans tw-text-base">
					{/* template: repo/editor/options */}
				</div>
			</h4>
			<div className="ui attached segment">
				<p>{i18n("repo.settings.githook_edit_desc")}</p>
				{(props.hook) && (<>
					<div className="field">
						<textarea id="content" name="content" className="tw-hidden"
							data-code-editor-config={String("" ?? "")}
							placeholder={String(i18n("editor.code_editor.placeholder") ?? "")}>{(props.isActive) ? (<>{props.content as any}</>) : (<>{props.sample as any}</>)}</textarea>
						<div className="editor-loading is-loading"></div>
					</div>
					<div className="inline field">
						<button className="ui primary button">{i18n("repo.settings.update_githook")}</button>
					</div>
				</>) }
			</div>
		</form>
	</div>
{/* template: repo/settings/layout_footer */}

  </>)
}
