import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function SectionCode(props: Record<string, unknown>) {
  return (<>
<code className={`code-inner${(props.diff?.escapeStatus?.escaped) ? ` has-escaped` : ""}`}>{props.diff?.content as any}</code>

  </>)
}
