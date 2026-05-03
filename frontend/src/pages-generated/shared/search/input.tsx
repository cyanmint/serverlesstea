import React from 'react'
import { i18n } from '../../../lib/i18n'

export default function Input(props: Record<string, unknown>) {
  return (<>
{/* Value - value of the search field (for search results page) */}
{/* Disabled (optional) - if search field has to be disabled */}
{/* Placeholder (optional) - placeholder text to be used */}
<input type="search" name="q"{...(props.value ? {"value": String("" ?? "")} : {})} maxlength="255" spellcheck="false" placeholder={`${i18n("search.search")}`}{...(props.disabled ? {"disabled": true} : {})} />

  </>)
}
