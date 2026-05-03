// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Debian(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "debian") ? (<>
	{(props.packageDescriptor?.metadata?.maintainer) ? (<><div className="item" title={String(i18n("packages.details.author") ?? "")}><span className="svg-icon" aria-label="octicon-person"></span> {props.packageDescriptor?.metadata?.maintainer as any}</div></>) : null}
	{(props.packageDescriptor?.metadata?.projectURL) ? (<><div className="item"><span className="svg-icon" aria-label="octicon-link-external"></span> <a href={String(props.packageDescriptor?.metadata?.projectURL ?? "")} target="_blank" rel="me">{i18n("packages.details.project_site")}</a></div></>) : null}
</>) : null}

  </>)
}
