import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Composer(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "composer") ? (<>
	{((props.packageDescriptor?.metadata?.authors) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}><div className="item" title={String(i18n("packages.details.author") ?? "")}><span className="svg-icon" aria-label="octicon-person"></span> {item.name as any}</div></React.Fragment>))}
	{(props.packageDescriptor?.metadata?.homepage) ? (<><div className="item"><span className="svg-icon" aria-label="octicon-link-external"></span> <a href={String(props.packageDescriptor?.metadata?.homepage ?? "")} target="_blank" rel="me">{i18n("packages.details.project_site")}</a></div></>) : null}
	{((props.packageDescriptor?.metadata?.license) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}><div className="item" title={String(i18n("packages.details.license") ?? "")}><span className="svg-icon" aria-label="octicon-law"></span> {item as any}</div></React.Fragment>))}
</>) : null}

  </>)
}
