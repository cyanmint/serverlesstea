import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Name(props: Record<string, unknown>) {
  return (<>
<a className={`ui basic label ${(props.isRelease) ? `primary` : ""} ${String(props.additionalClasses ?? "")}`} href={`${String(props.repoLink ?? "")}/src/tag/${String(props.tagName|PathEscape ?? "")}`}>
<span className="svg-icon" aria-label="octicon-tag"></span> {props.tagName as any}
</a>

  </>)
}
