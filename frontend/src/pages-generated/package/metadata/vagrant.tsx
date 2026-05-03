// @ts-nocheck
import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Vagrant(props: Record<string, unknown>) {
  return (<>
{(props.packageDescriptor?.package?.type === "vagrant") ? (<>
	{(props.packageDescriptor?.metadata?.author) ? (<><div className="item" title={String(i18n("packages.details.author") ?? "")}><span className="svg-icon" aria-label="octicon-person"></span> {props.packageDescriptor?.metadata?.author as any}</div></>) : null}
	{(props.packageDescriptor?.metadata?.projectURL) ? (<><div className="item"><span className="svg-icon" aria-label="octicon-link-external"></span> <a href={String(props.packageDescriptor?.metadata?.projectURL ?? "")} target="_blank" rel="me">{i18n("packages.details.project_site")}</a></div></>) : null}
	{(props.packageDescriptor?.metadata?.repositoryURL) ? (<><div className="item"><span className="svg-icon" aria-label="octicon-link-external"></span> <a href={String(props.packageDescriptor?.metadata?.repositoryURL ?? "")} target="_blank" rel="me">{i18n("packages.details.repository_site")}</a></div></>) : null}
</>) : null}

  </>)
}
