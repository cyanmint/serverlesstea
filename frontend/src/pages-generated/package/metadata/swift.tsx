import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Swift(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "swift") ? (<>
	{(props.packageDescriptor?.metadata?.author?.string) ? (<><div className="item" title={String(i18n("packages.details.author") ?? "")}><span className="svg-icon" aria-label="octicon-person"></span> {props.packageDescriptor?.metadata?.author as any}</div></>) : null}
	{(props.packageDescriptor?.metadata?.repositoryURL) ? (<><div className="item"><span className="svg-icon" aria-label="octicon-link-external"></span> <a href={String(props.packageDescriptor?.metadata?.repositoryURL ?? "")} target="_blank" rel="me">{i18n("packages.details.repository_site")}</a></div></>) : null}
</>) : null}

  </>)
}
