// @ts-nocheck
import React from 'react'
import { i18n } from '../../lib/i18n'

export default function SearchName(props: Record<string, unknown>) {
  return (<>
<span className="username-display">{props.name as any} {(props.fullName) ? (<><span className="username-fullname gt-ellipsis">({props.fullName as any})</span></>) : null}</span>

  </>)
}
