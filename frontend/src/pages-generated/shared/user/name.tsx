import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Name(props: Record<string, unknown>) {
  return (<>
<a className="text muted" href={String(props.homeLink ?? "")}>{props.name as any}{(props.fullName) ? (<> ({props.fullName as any})</>) : null}</a>

  </>)
}
