import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Namelink(props: Record<string, unknown>) {
  return (<>
<a{(props.iD > 0) ? (<> href={String(props.homeLink ?? "")}</>) : null}>{props.getDisplayName as any}</a>

  </>)
}
