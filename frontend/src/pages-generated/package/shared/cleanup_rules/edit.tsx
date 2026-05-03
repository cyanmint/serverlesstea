// @ts-nocheck
import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Edit(props: Record<string, unknown>) {
  return (<>
<h4 className="ui top attached header">{(props.isEditRule) ? (<>{i18n("packages.owner.settings.cleanuprules.edit")}</>) : (<>{i18n("packages.owner.settings.cleanuprules.add")}</>)}</h4>
<div className="ui attached segment">
	<form className="ui form" action={String(props.link ?? "")} method="post" onSubmit={(props.onSubmit as any) ?? ((e: React.FormEvent) => e.preventDefault())}>
		<input name="id" type="hidden" value={String(props.cleanupRule?.iD ?? "")} />
		<div className="field">
			<div className="ui checkbox">
				<label>{i18n("enabled")}</label>
				<input type="checkbox" name="enabled" {...(props.cleanupRule?.enabled ? {"checked": true} : {})} />
			</div>
		</div>
		<div className={`${(props.isEditRule) ? `disabled ` : ""}field ${(props.err_Type) ? `error` : ""}`}>
			<label>{i18n("packages.filter.type")}</label>
			<select className="ui selection dropdown" name="type">
				{((props.availableTypes) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
				<option{...(props.cleanupRule?.type === props.type ? {"selected": "selected"} : {})} value={String("" ?? "")}>{/* TODO: {{$type.Name}} */}</option>
				</React.Fragment>))}
			</select>
		</div>
		<div className="field">
			<div className="ui checkbox">
				<label>{i18n("packages.owner.settings.cleanuprules.pattern_full_match")}</label>
				<input type="checkbox" name="match_full_name" {...(props.cleanupRule?.matchFullName ? {"checked": true} : {})} />
			</div>
		</div>
		<div className="divider"></div>
		<p>{i18n("packages.owner.settings.cleanuprules.keep.title")}</p>
		<div className={`field ${(props.err_KeepCount) ? `error` : ""}`}>
			<label>{i18n("packages.owner.settings.cleanuprules.keep.count")}:</label>
			<select className="ui selection dropdown" name="keep_count">
				<option{...(props.cleanupRule?.keepCount === 0 ? {"selected": "selected"} : {})} value="0"></option>
				<option{...(props.cleanupRule?.keepCount === 1 ? {"selected": "selected"} : {})} value="1">{i18n("packages.owner.settings.cleanuprules.keep.count.1")}</option>
				<option{...(props.cleanupRule?.keepCount === 5 ? {"selected": "selected"} : {})} value="5">{i18n("packages.owner.settings.cleanuprules.keep.count.n")}</option>
				<option{...(props.cleanupRule?.keepCount === 10 ? {"selected": "selected"} : {})} value="10">{i18n("packages.owner.settings.cleanuprules.keep.count.n")}</option>
				<option{...(props.cleanupRule?.keepCount === 25 ? {"selected": "selected"} : {})} value="25">{i18n("packages.owner.settings.cleanuprules.keep.count.n")}</option>
				<option{...(props.cleanupRule?.keepCount === 50 ? {"selected": "selected"} : {})} value="50">{i18n("packages.owner.settings.cleanuprules.keep.count.n")}</option>
				<option{...(props.cleanupRule?.keepCount === 100 ? {"selected": "selected"} : {})} value="100">{i18n("packages.owner.settings.cleanuprules.keep.count.n")}</option>
			</select>
		</div>
		<div className={`field ${(props.err_KeepPattern) ? `error` : ""}`}>
			<label>{i18n("packages.owner.settings.cleanuprules.keep.pattern")}:</label>
			<input name="keep_pattern" type="text" value={String(props.cleanupRule?.keepPattern ?? "")} />
			<p>{i18n("packages.owner.settings.cleanuprules.keep.pattern.container")}</p>
		</div>
		<div className="divider"></div>
		<p>{i18n("packages.owner.settings.cleanuprules.remove.title")}</p>
		<div className={`field ${(props.err_RemoveDays) ? `error` : ""}`}>
			<label>{i18n("packages.owner.settings.cleanuprules.remove.days")}:</label>
			<select className="ui selection dropdown" name="remove_days">
				<option{...(props.cleanupRule?.removeDays === 0 ? {"selected": "selected"} : {})} value="0"></option>
				<option{...(props.cleanupRule?.removeDays === 7 ? {"selected": "selected"} : {})} value="7">{i18n("tool.days")}</option>
				<option{...(props.cleanupRule?.removeDays === 14 ? {"selected": "selected"} : {})} value="14">{i18n("tool.days")}</option>
				<option{...(props.cleanupRule?.removeDays === 30 ? {"selected": "selected"} : {})} value="30">{i18n("tool.days")}</option>
				<option{...(props.cleanupRule?.removeDays === 60 ? {"selected": "selected"} : {})} value="60">{i18n("tool.days")}</option>
				<option{...(props.cleanupRule?.removeDays === 90 ? {"selected": "selected"} : {})} value="90">{i18n("tool.days")}</option>
				<option{...(props.cleanupRule?.removeDays === 180 ? {"selected": "selected"} : {})} value="180">{i18n("tool.days")}</option>
			</select>
		</div>
		<div className={`field ${(props.err_RemovePattern) ? `error` : ""}`}>
			<label>{i18n("packages.owner.settings.cleanuprules.remove.pattern")}:</label>
			<input name="remove_pattern" type="text" value={String(props.cleanupRule?.removePattern ?? "")} />
		</div>
		<div className="field">
			{(props.isEditRule) ? (<>
			<button className="ui primary button" name="action" value="save">{i18n("save")}</button>
			<button className="ui red button" name="action" value="remove">{i18n("remove")}</button>
			<a className="ui button" href={`${String(props.link ?? "")}/preview`}>{i18n("packages.owner.settings.cleanuprules.preview")}</a>
			</>) : (<>
			<button className="ui primary button" name="action" value="save">{i18n("add")}</button>
			</>)}
		</div>
	</form>
</div>

  </>)
}
