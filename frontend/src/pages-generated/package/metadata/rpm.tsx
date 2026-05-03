// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Rpm(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "rpm") ? (<>
	{(props.packageDescriptor?.metadata?.projectURL) ? (<><div className="item"><span className="svg-icon" aria-label="octicon-link-external"></span> <a href={String(props.packageDescriptor?.metadata?.projectURL ?? "")} target="_blank" rel="me">{i18n("packages.details.project_site")}</a></div></>) : null}
	{(props.packageDescriptor?.metadata?.license) ? (<><div className="item" title={String(i18n("packages.details.license") ?? "")}><span className="svg-icon" aria-label="octicon-law"></span> {props.packageDescriptor?.metadata?.license as any}</div></>) : null}
</>) : null}

  </>)
}
