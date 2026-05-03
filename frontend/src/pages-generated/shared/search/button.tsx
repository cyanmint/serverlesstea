import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Button(props: Record<string, unknown>) {
  return (<>
{/* Disable (optional) - if search button has to be disabled */}
{/* Tooltip (optional) - a tooltip to be displayed on hover */}
<button className="ui small icon button" aria-label={String(i18n("search.search") ?? "")} {...(props.tooltip ? {"data-tooltip-content": String("" ?? "")} : {})}{...(props.disabled ? {"disabled": true} : {})}><span className="svg-icon" aria-label="octicon-search"></span></button>

  </>)
}
