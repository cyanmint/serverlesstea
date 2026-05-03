// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function PushMirrorSyncModal(props: Record<string, unknown>) {
  return (<>
<div className="ui small modal" id="push-mirror-edit-modal">
	<div className="header">
		{i18n("repo.settings.mirror_settings.push_mirror.edit_sync_time")}
	</div>
	<form className="content ui form ignore-dirty" method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<input type="hidden" name="action" value="push-mirror-update" />
		<input type="hidden" name="push_mirror_id" id="push-mirror-edit-id" />
		<div className="field">
			<label>{i18n("repo.settings.mirror_settings.mirrored_repository")}</label>
			<span id="push-mirror-edit-address"></span>
		</div>
		<div className="field">
			<label htmlFor="push-mirror-edit-interval">{i18n("repo.mirror_interval")}</label>
			<input id="push-mirror-edit-interval" name="push_mirror_interval" className="tw-w-auto" />
		</div>
		<div className="actions">
			<button className="ui small basic cancel button">
				<span className="svg-icon" aria-label="octicon-x"></span>
				{i18n("cancel")}
			</button>
			<button className="ui primary small approve button">
				<span className="svg-icon" aria-label="fontawesome-save"></span>
				{i18n("save")}
			</button>
		</div>
	</form>
</div>

  </>)
}
