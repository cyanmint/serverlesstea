import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function CommonBreadcrumb(props: Record<string, unknown>) {
  return (<>
<div className="breadcrumb">
	<a className="section" href={String(props.branchLink ?? "")}>{props.repository?.name as any}</a>
	{/* $n */}
	{/* $l */}
	{((props.treeNames) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}>
		<div className="breadcrumb-divider">/</div>
		{(i === l) ? (<>
			<input id="file-name" maxlength="255" value={String("" ?? "")} placeholder={String("" ?? "")} {/* TODO: {{Iif $.PageIsUpload "" "required"}} */} />
			<span data-tooltip-content={String(i18n("repo.editor.filename_help") ?? "")}><span className="svg-icon" aria-label="octicon-info"></span></span>
		</>) : (<>
			<span className="section"><a href={`${String(props.branchLink ?? "")}/`}>{/* $v */}</a></span>
		</>)}
	</React.Fragment>))}
	<span>{i18n("repo.editor.or")} <a href={String("" ?? "")}>{i18n("repo.editor.cancel_lower")}</a></span>
	<input type="hidden" id="tree_path" name="tree_path" value={String(props.treePath ?? "")} />
</div>

  </>)
}
