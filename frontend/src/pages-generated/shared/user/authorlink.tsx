import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Authorlink(props: Record<string, unknown>) {
  return (<>
<a className="muted tw-text-text tw-font-semibold"{...(props.iD > 0 ? {"href": String(props.homeLink ?? "")} : {})}>{props.getDisplayName as any}</a>{(props.isTypeBot) ? (<>&nbsp;<span className="ui basic label tw-p-1 tw-align-baseline">bot</span></>) : null}

  </>)
}
