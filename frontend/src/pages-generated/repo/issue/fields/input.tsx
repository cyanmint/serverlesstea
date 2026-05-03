import React from 'react'
import { i18n } from '../../../../lib/i18n'

export default function Input(props: Record<string, unknown>) {
  return (<>
<div className={`field ${(!(props.item?.visibleOnForm)) ? `tw-hidden` : ""}`}>
	{/* template: repo/issue/fields/header */}
	<input type={`${(props.item?.validations?.is_number) ? `number` : `text`}`} name={`form-field-${String(props.item?.iD ?? "")}`} placeholder={String(props.item?.attributes?.placeholder ?? "")} value={String(props.item?.attributes?.value ?? "")} {...(props.item?.validations?.required ? {"required": true} : {})} {...(props.item?.validations?.regex ? {"pattern": String(props.item?.validations?.regex ?? ""), "title": String(props.item?.validations?.regex ?? "")} : {})} />
</div>

  </>)
}
