// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Maven(props: Record<string, unknown>) {
  return (<>
{((props.packageDescriptor?.package?.type === "maven" && !(props.packageDescriptor?.metadata))) ? (<>
	<div className="item"><span className="svg-icon" aria-label="octicon-note"></span> {i18n("packages.no_metadata")}</div>
</>) : null}
{((props.packageDescriptor?.package?.type === "maven" && props.packageDescriptor?.metadata)) ? (<>
	{(props.packageDescriptor?.metadata?.name) ? (<><div className="item"><span className="svg-icon" aria-label="octicon-note"></span> {props.packageDescriptor?.metadata?.name as any}</div></>) : null}
	{(props.packageDescriptor?.metadata?.projectURL) ? (<><div className="item"><span className="svg-icon" aria-label="octicon-link-external"></span> <a href={String(props.packageDescriptor?.metadata?.projectURL ?? "")} target="_blank" rel="me">{i18n("packages.details.project_site")}</a></div></>) : null}
	{((props.packageDescriptor?.metadata?.licenses) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}><div className="item" title={String(i18n("packages.details.license") ?? "")}><span className="svg-icon" aria-label="octicon-law"></span> {item as any}</div></React.Fragment>))}
</>) : null}

  </>)
}
