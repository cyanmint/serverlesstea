// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Options(props: Record<string, unknown>) {
  return (<>
{(!(props.disableNewPullMirrors)) ? (<>
<div className="inline field">
	<label>{i18n("repo.migrate_options")}</label>
	<div className="ui checkbox">
		<input id="mirror" name="mirror" type="checkbox" {...(props.mirror ? {"checked": true} : {})} />
		<label>{i18n("repo.migrate_options_mirror_helper")}</label>
	</div>
</div>
</>) : null}
{(props.lFSActive) ? (<>
<div className="inline field">
	<label></label>
	<div className="ui checkbox">
		<input id="lfs" name="lfs" type="checkbox" {...(props.lfs ? {"checked": true} : {})} />
		<label>{i18n("repo.migrate_options_lfs")}</label>
	</div>
	<span id="lfs_settings" className="tw-hidden">(<a id="lfs_settings_show" href="#">{i18n("repo.settings.advanced_settings")}</a>)</span>
</div>
<div id="lfs_endpoint" className="tw-hidden">
	<span className="help">{i18n("repo.migrate_options_lfs_endpoint.description")}{(props.contextUser?.canImportLocal) ? (<> {i18n("repo.migrate_options_lfs_endpoint.description.local")}</>) : null}</span>
	<div className={`inline field ${(props.err_LFSEndpoint) ? `error` : ""}`}>
		<label>{i18n("repo.migrate_options_lfs_endpoint.label")}</label>
		<input name="lfs_endpoint" value={String(props.lfs_endpoint ?? "")} placeholder={String(i18n("repo.migrate_options_lfs_endpoint.placeholder") ?? "")} />
	</div>
</div>
</>) : null}

  </>)
}
