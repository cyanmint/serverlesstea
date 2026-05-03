import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Tabtitle(props: Record<string, unknown>) {
  return (<>
<span className="resize-for-semibold" data-text={String("" ?? "")}>{props as any}</span>

  </>)
}
