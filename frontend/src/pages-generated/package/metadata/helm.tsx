import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Helm(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "helm") ? (<>
	{((props.packageDescriptor?.metadata?.maintainers) as any[] ?? []).map((item: any, _i: number) => (<React.Fragment key={_i}><div className="item" title={String(i18n("packages.details.author") ?? "")}><span className="svg-icon" aria-label="octicon-person"></span> {item.name as any}</div></React.Fragment>))}
	{(props.packageDescriptor?.metadata?.home) ? (<><div className="item"><span className="svg-icon" aria-label="octicon-link-external"></span> <a href={String(props.packageDescriptor?.metadata?.home ?? "")} target="_blank" rel="me">{i18n("packages.details.project_site")}</a></div></>) : null}
</>) : null}

  </>)
}
